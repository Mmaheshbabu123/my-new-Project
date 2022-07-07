import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { addProject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '../../Services/ValidationService';

// import './addproject.css';
function Addproject(props) {
	//FOR ASSIGNING COMPANY LOCATION VALUES
	const [ company, setCompany ] = useState([]);

	const [ error_project_name, setError_project_name ] = useState('');
	const [ error_project_location, setError_project_location ] = useState('');
	const [ error_hno, setError_hno ] = useState('');
	const [ error_city, setError_city ] = useState('');
	const [ error_extra, setError_extra ] = useState('');
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_street, setError_street ] = useState('');
	const [ error_postal_code, setError_postal_code ] = useState('');
	const [ error_country, setError_country ] = useState('');

	const [ data, setData ] = useState({
		project_name: '',
		project_location: '',
		hno: '',
		city: '',
		extra: '',
		comp_id: '',
		street: '',
		postal_code: '',
		country: ''
	});

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

	let submit = async (event) => {
		event.preventDefault();

		console.log(data);
		// APICALL.service(addProject, 'POST', data).then((result) => {
		// 	console.log(result);
		// });
		var valid_res = validate(data);
		if (valid_res) {
		}
	};
	let validate = (res) => {
		var error1 = [];
		//check if required fields are empty
		error1['project_name'] = ValidationService.emptyValidationMethod(res.project_name);
		error1['project_location'] = ValidationService.emptyValidationMethod(res.project_location);
		error1['hno'] = ValidationService.emptyValidationMethod(res.hno);
		error1['city'] = ValidationService.emptyValidationMethod(res.city);
		error1['extra'] = ValidationService.emptyValidationMethod(res.extra);
		error1['comp_id'] = ValidationService.emptyValidationMethod(res.comp_id);
		error1['street'] = ValidationService.emptyValidationMethod(res.street);
		// error1['postal_code'] = ValidationService.emptyValidationMethod(res.postal_code);
		error1['country'] = ValidationService.emptyValidationMethod(res.country);

		//check if project name is valid
		error1['project_name'] =
			error1['project_name'] == ''
				? ValidationService.nameValidationMethod(res.project_name)
				: error1['project_name'];
		//check if project location is valid (varchar?)
		error1['project_location'] =
			error1['project_location'] == ''
				? ValidationService.nameValidationMethod(res.project_location)
				: error1['project_location'];
		//check if hno is valid
		error1['hno'] = error1['hno'] == '' ? ValidationService.nameValidationMethod(res.hno) : error1['hno'];

		//check if city is valid
		error1['city'] = error1['city'] == '' ? ValidationService.nameValidationMethod(res.city) : error1['city'];

		//check if extra field is valid
		error1['extra'] = error1['extra'] == '' ? ValidationService.nameValidationMethod(res.extra) : error1['extra'];

		// check if street field is valid
		error1['street'] =
			error1['street'] == '' ? ValidationService.nameValidationMethod(res.street) : error1['street'];

		/**
		 * POSTALCODE VALIDATION
		 */
		error1['postal_code'] =
			error1['postal_code'] == ''
				? ValidationService.postalCodeValidationMethod(res.postal_code)
				: error1['postal_code'];

		//seterror messages
		setError_project_name(error1['project_name']);
		setError_project_location(error1['project_location']);
		setError_hno(error1['hno']);
		setError_city(error1['city']);
		setError_extra(error1['extra']);
		setError_comp_id(error1['comp_id']);
		setError_street(error1['street']);
		setError_postal_code(error1['postal_code']);
		setError_country(error1['country']);
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
	return (
		<div>
			<form onSubmit={(e) => submit(e)}>
				<div
					className="modal"
					id="myModal"
					tabIndex="-1"
					style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
				>
					<div className="modal-dialog modal-lg ">
						<div className="modal-content  ">
							<div className="modal-header">
								<p className="modal-title h4">Add project</p>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									onClick={() => props.popupActionNo()}
								/>
							</div>

							<div className="modal-body ">
								<div className="container">
									<div className="row">
										<div className="col-sm-6  ">
											{/* PROJECT NAME */}
											<label className="font-weight-bold custom_astrick">Project name</label>
											<input
												type="text"
												className="form-control mt-2 mb-2 "
												onChange={(e) => {
													setData((prev) => ({ ...prev, project_name: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_project_name}</p>
											<div />

											{/* LOCATION */}
											<label className="mt-2 custom_astrick">Location</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, project_location: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_project_location}</p>
											<div />
											{/* HOUSE NUMBER */}
											<label className="custom_astrick mt-2">House number</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, hno: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_hno}</p>

											{/* CITY */}
											<label className="custom_astrick mt-2">City</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, city: e.target.value }));
												}}
											/>
											{/* EXTRA */}
											<p className="error mt-2">{error_city}</p>

											<label className="custom_astrick mt-2">Extra</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, extra: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_extra}</p>
										</div>
										{/* COMPANY */}
										<div className="col-sm-6">
											<label className=" custom_astrick">Company</label>
											<select
												className="form-select mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, comp_id: e.target.value }));
												}}
											>
												<option value="">Select</option>
												{company.map((options) => (
													<option
														onClick={(e) => {
															setCompany(options.comp_name);
														}}
														key={options.comp_id}
														value={options.comp_id}
													>
														{options.comp_name}
													</option>
												))}
											</select>
											<p className="error mt-2">{error_comp_id}</p>
											<label className="custom_astrick mt-2">Street</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, street: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_street}</p>

											<label className="custom_astrick mt-2">Postalcode</label>
											<input
												type="text"
												className="form-control mt-2 mb-2"
												onChange={(e) => {
													setData((prev) => ({ ...prev, postal_code: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_postal_code}</p>

											<label className="custom_astrick mt-2">Country</label>
											<select
												className="form-select mt-2 mb-2 custom-select"
												onChange={(e) => {
													setData((prev) => ({ ...prev, country: e.target.value }));
												}}
											>
												<option>Select country</option>
												{companyname.map((options) => (
													<option key={options.value} value={options.value}>
														{options.label}
													</option>
												))}
											</select>
											<p className="error mt-2">{error_country}</p>
										</div>
									</div>
									<div className="modal-footer">
										<button
											type="submit"
											className="btn btn-secondary btn-lg btn-block float-right"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Addproject;
