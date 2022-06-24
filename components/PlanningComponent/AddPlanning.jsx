import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { addPlanning, fetchPlanning } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import Addproject from './AddProject';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';

function Planning(props) {
	const router = useRouter();

	// For popup
	const [ show, setShow ] = useState(false);

	//FOR ASSIGNING COMPANY LOCATION VALUES
	const [ companyLocation, setCompanyLocation ] = useState([]);
	const [ company_name, setCompany_name ] = useState([]);

	// Errormessage
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_location_id, setError_location_id ] = useState('');
	const [ error_cost_center_id, setError_cost_center_id ] = useState('');

	const [ data, setData ] = useState({
		p_unique_key: '',
		comp_id: '',
		location_id: '',
		cost_center_id: ''
	});

	// FETCHING DATA FROM DRUPAL //
	useEffect(() => {
		APICALL.service(fetchPlanning, 'GET')
			.then((result) => {
				var data = JSON.parse(result.getcompanylocation);
				console.log(data);
				if (result.status === 200) {
					setCompanyLocation(data);
				} else {
					console.log(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

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
		error1['cost_center_id'] = ValidationService.emptyValidationMethod(res.cost_center_id);

		//seterror messages
		setError_comp_id(error1['comp_id']);
		setError_location_id(error1['location_id']);
		setError_cost_center_id(error1['cost_center_id']);
		//return false if there is an error else return true
		if (error1['comp_id'] == '' && error1['location_id'] == '' && error1['cost_center_id'] == '') {
			return true;
		} else {
			return false;
		}
	};
	const companyname = [
		{
			value: '10',
			label: 'Infanion1'
		},
		{
			value: '11',
			label: 'Infanion2'
		},
		{
			value: '12',
			label: 'Infanion3'
		},
		{
			value: '13',
			label: 'Infanion4'
		}
	];

	// CLOSE POPUP
	const closePopup = () => {
		setShow(false);
	};

	// SHOW POPUP //
	const showPopup = (id) => {
		setShow(true);
	};

	return (
		<div className="container calc-height ">
			<form onSubmit={(e) => submit(e)}>
				<div className="row   planning-container ">
					<p className="md-3 mt-3 font-weight-bold h3">Add Planning</p>
					{/* <div>
						<button
							type="button"
							onClick={showPopup}
							className="btn btn-secondary   btn-block float-right mt-2 mb-2 ms-2"
						>
							+Add project
						</button>
					</div> */}
					<div className="form-group">
						<label className="form-label mb-2 custom_astrick">Company</label>
						<select
							className="form-select mb-2 mt-2"
							placeholder="select company"
							onChange={(e) => {
								setData((prev) => ({ ...prev, comp_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{companyLocation.map(
								(options) =>
									options.type == 'Company' && (
										<option
											onClick={(e) => {
												setCompany_name(options.title);
											}}
											key={options.nid}
											value={options.nid}
										>
											{options.title}
										</option>
									)
							)}
						</select>
						<p className="error mt-2">{error_comp_id}</p>
					</div>

					<div className="form-group">
						<label className="form-label mb-2 mt-2 custom_astrick">Location</label>
						<select
							className="form-select mb-2 mt-2"
							defaultValue="Select Location"
							onChange={(e) => {
								setData((prev) => ({ ...prev, location_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{companyLocation.map(
								(options) =>
									options.type == 'Location' &&
									options.field_compa == company_name && (
										<option key={options.nid} value={options.nid}>
											{options.field_lo}
										</option>
									)
							)}
						</select>
						<p className="error mt-2">{error_location_id}</p>
					</div>

					<div className="form-group ">
						<label className="form-label mb-2 mt-2">Cost center</label>
						<select
							className="form-select mb-2 mt-2"
							defaultValue="Select cost center"
							onChange={(e) => {
								setData((prev) => ({ ...prev, cost_center_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{companyname.map((options) => (
								<option key={options.value} value={options.value}>
									{options.label}
								</option>
							))}
						</select>
						<p className="error mt-2">{error_cost_center_id}</p>
					</div>

					<div className="col-md-12 mt-4 ">
						<div className="d-inline">
							<button type="button" className="btn btn-secondary   btn-block ">
								Back
							</button>
						</div>
						<div className="float-right ">
							<button
								type="submit"
								className="btn btn-secondary   btn-block "
								onClick={() => {
									setData((prev) => ({ ...prev, p_unique_key: router.query.pid }));
								}}
							>
								Next
							</button>
						</div>
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
