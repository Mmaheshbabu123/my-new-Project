import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { addPlanning, fetchPlanning } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import Addproject from './AddProject';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Planning(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;

	console.log(p_unique_key);

	// For popup
	const [ show, setShow ] = useState(false);

	//FOR ASSIGNING COMPANY LOCATION VALUES
	const [ company, setCompany ] = useState([]);
	const [ location, setLocation ] = useState([]);
	const [ costcenter, setCostcenter ] = useState([]);
	const [ company_name, setCompany_name ] = useState([]);
	const [ empr_id, setEmpr_id ] = useState('');


	// Errormessage
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_location_id, setError_location_id ] = useState('');

	const [ data, setData ] = useState({
		p_unique_key: '',
		comp_id: '',
		location_id: '',
		cost_center_id: ''
	});


	useEffect(() => {
		if(localStorage.getItem("uid")!= null){
			setEmpr_id(localStorage.getItem("uid"));
		}
	}, []);

	// FETCHING COMPANY FROM DRUPAL //
	useEffect(() => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/managecompanies?_format=json', 'GET')
			.then((result) => {
				if (result.length > 0) {
					setCompany(result);
				} else {
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	//LOCATION FETCHING FROM DRUPAL
	useEffect(
		() => {
			setLocation([]);
			if (data.comp_id != '') {
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/managelocations?_format=json&comp_id=' + data.comp_id,
					'GET'
				)
					.then((result) => {
						if (result.length > 0) {
							setLocation(result);
						} else {
							setLocation([]);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ data.comp_id ]
	);

	//COST CENTER FETCHING FROM DRUPAL
	useEffect(
		() => {
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_URL_DRUPAL +
					'manage-costcenter?_format=json&comp_id=' +
					data.comp_id +
					'&location_id=' +
					data.location_id,
				'GET'
			)
				.then((result) => {
					if (result.length > 0) {
						setCostcenter(result);
					} else {
						setCostcenter([]);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ data.comp_id, data.location_id ]
	);

	// FETCH PLANNING
	useEffect(
		() => {
			APICALL.service(fetchPlanning + p_unique_key, 'GET').then((result) => {
				if (result.data.length > 0) {
					var res = result.data[0];
					res.p_unique_key = result.data[0].p_unique_key;
					res.comp_id = result.data[0].comp_id;
					res.location_id = result.data[0].location_id;
					res.cost_center_id = result.data[0].cost_center_id == null ? '' : result.data[0].cost_center_id;
					setData(res);
					console.log(data);
				}
			});
		},
		[ p_unique_key ]
	);

	// ON SUBMIT //
	let submit = (event) => {
		event.preventDefault();
		console.log(data);
		var valid_res = validate(data);
		if (valid_res) {
			APICALL.service(addPlanning, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						router.push('/planning/employees/' + router.query.p_unique_key);
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	//VALIDATE FORM //
	let validate = (res) => {
		console.log(res);
		var error1 = [];

		//check if required fields are empty
		error1['comp_id'] = ValidationService.emptyValidationMethod(res.comp_id);
		error1['location_id'] = ValidationService.emptyValidationMethod(res.location_id);

		//seterror messages
		setError_comp_id(error1['comp_id']);
		setError_location_id(error1['location_id']);

		//return false if there is an error else return true
		if (error1['comp_id'] == '' && error1['location_id'] == '') {
			return true;
		} else {
			return false;
		}
	};

	// CLOSE POPUP
	const closePopup = () => {
		setShow(false);
	};

	// SHOW POPUP //
	const showPopup = (id) => {
		alert(empr_id);
		setShow(true);
	};

	return (
		<div className="container calc-height ">
			<form onSubmit={(e) => submit(e)}>
				<div className="row   planning-container ">
					<p className="mb-4 mt-3 font-weight-bold h3">Add Planning</p>
					<div>
						<button
							onClick={showPopup}
							type="button"
							className="btn btn-secondary   btn-block float-end mt-2 mb-2 ms-2"
						>
							+Add project
						</button>
					</div>
					<div className="form-group">
						<label className="form-label mb-2 custom_astrick">Company</label>
						<select
							value={data.comp_id}
							className="form-select mb-2 mt-2"
							placeholder="select company"
							onChange={(e) => {
								setData((prev) => ({ ...prev, comp_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{company.map((options) => (
								<option
									onClick={(e) => {
										setCompany_name(options.comp_name);
									}}
									key={options.comp_id}
									value={options.comp_id}
								>
									{options.comp_name}
								</option>
							))}
						</select>
						<p className="error mt-2">{error_comp_id}</p>
					</div>

					<div className="form-group">
						<label className="form-label mb-2 mt-2 custom_astrick">Location</label>
						<select
							value={data.location_id}
							className="form-select mb-2 mt-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, location_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{location.map((options) => (
								<option key={options.location_id} value={options.location_id}>
									{options.location_name}
								</option>
							))}
						</select>
						<p className="error mt-2">{error_location_id}</p>
					</div>

					<div className="form-group ">
						<label className="form-label mb-2 mt-2">Cost center</label>
						<select
							className="form-select mb-2 mt-2"
							value={data.cost_center_id}
							onChange={(e) => {
								setData((prev) => ({ ...prev, cost_center_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{costcenter.map((options) => (
								<option key={options.cost_center_id} value={options.cost_center_id}>
									{options.cost_center_name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<button type="button" className="btn btn-secondary btn-block ">
							<Link href={'/planning/options'}>
								<p className="">Back</p>
							</Link>
						</button>
					</div>
					<div className="col-md-6">
						<button
							type="submit"
							className="btn btn-secondary   btn-block float-end"
							onClick={() => {
								setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
							}}
						>
							Next
						</button>
					</div>
				</div>
			</form>
			{show == true && (
				<div className="">
					<Addproject display={'block'} popupActionNo={closePopup} popupActionYes={showPopup} />
				</div>
			)}
		</div>
	);
}
export default Planning;
