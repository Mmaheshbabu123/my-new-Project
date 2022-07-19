import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { addPlanning, fetchPlanning, getEmployeerCompanylist } from '../../Services/ApiEndPoints';
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
		if (localStorage.getItem('uid') != null) {
			setEmpr_id(localStorage.getItem('uid'));
		}
	}, []);

	// FETCHING COMPANY, LOCATION, COST-CENTER PER EMPLOYER
	useEffect(() => {
		APICALL.service(getEmployeerCompanylist + 102, 'GET')
			.then((result) => {
				console.log(result.data[0]);
				setCompany(result.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// FETCHING COMPANY FROM DRUPAL //
	// useEffect(() => {
	// 	APICALL.service(process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/managecompanies?_format=json', 'GET')
	// 		.then((result) => {
	// 			if (result.length > 0) {
	// 				setCompany(result);
	// 			} else {
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }, []);

	// //LOCATION FETCHING FROM DRUPAL
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
				if (result && result.data.length > 0) {
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
		error1['location_id'] = '';

		//check if required fields are empty
		error1['comp_id'] = ValidationService.emptyValidationMethod(res.comp_id);
		// error1['location_id'] = ValidationService.emptyValidationMethod(res.location_id);

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

	let updatcomp = (comp_id) => {
		var res = data;
		res.comp_id = comp_id;
		setData(res);
	};

	return (
		<div className="col-md-10 m-auto  ">
			<form onSubmit={(e) => submit(e)}>
				<div className="row   planning-container calc-height m-0 col-md-12">
					<div className='col-md-12'>
					<h1 className=" mt-3 font-weight-bold  poppins-italic-24px px-0 ">Add Planning</h1>
					</div>
					<div className='col-md-12 px-0 mt-3 mb-4'>
						<button
							onClick={showPopup}
							type="button"
							className=" btn mb-4 skyblue-bg-color border-0 poppins-regular-24px px-5 py-3  btn-block float-end mt-2 mb-2 ms-2"
						>
							<span className=''>+</span>  Add project
						</button>
					</div>
					<div className='form-sec border-form-sec p-5'>
						<div className='col-md-6'>
					<div className="form-group">
						<label className="form-label mb-2 custom_astrick poppins-regular-16px">Company</label>
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
									key={options.nid}
									value={options.nid}
								>
									{options.title}
								</option>
							))}
						</select>
						<p className="error mt-2">{error_comp_id}</p>
					</div>

					<div className="form-group">
						<label className="form-label mb-2 mt-2 custom_astrick poppins-regular-16px">Location</label>
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
						<label className="form-label mb-2 mt-2 poppins-regular-16px">Cost center</label>
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
					</div>
				</div>
				<div className="row mt-4 col-md-12">
					<div className="col-md-6">
						<button type="button" className="btn  btn-block ">
							<Link href={'/planning/options'}>
								<p className="bg-white border-bottom border-3 text-dark">BACK</p>
							</Link>
						</button>
					</div>
					<div className="col-md-6">
						<button
							type="submit"
							className="btn btn-secondary  custom-btn px-3  btn-block float-end"
							onClick={() => {
								setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
							}}
						>
							NEXT
						</button>
					</div>
				</div>
			</form>
			{show == true && (
				<div className="">
					<Addproject
						display={'block'}
						company={company}
						company_id={data.comp_id}
						popupActionNo={closePopup}
						popupActionYes={showPopup}
						updatecompany={updatcomp}
					/>
				</div>
			)}
		</div>
	);
}
export default Planning;
