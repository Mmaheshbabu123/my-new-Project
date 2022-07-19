import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { addProject, fetchproject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';

// import './addproject.css';
function Addproject(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;
	// console.log(p_unique_key);
	/**
	 * FOR ASSIGNING COMPANY LOCATION VALUES
	 */
	const [ company, setCompany ] = useState([]);
	const [ countrylist, setCountrylist ] = useState([]);

	const [ error_project_name, setError_project_name ] = useState('');
	const [ error_project_location, setError_project_location ] = useState('');
	const [ error_hno, setError_hno ] = useState('');
	const [ error_city, setError_city ] = useState('');
	const [ error_extra, setError_extra ] = useState('');
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_street, setError_street ] = useState('');
	const [ error_postal_code, setError_postal_code ] = useState('');
	const [ error_countrylist, setError_countrylist ] = useState('');

	const [ data, setData ] = useState({
		id: '',
		project_name: '',
		project_location: '',
		hno: '',
		city: '',
		extra: '',
		comp_id: '',
		street: '',
		postal_code: '',
		country: '',
		address_id: ''
	});

	/**
	 * FETCHING COMPANY FROM DRUPAL
	 */
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

	useEffect(
		() => {
			if (data.comp_id == '') {
				var res = data;
				res.comp_id = props.company_id;
				setData(res);
			}
		},
		[ props ]
	);

	/**
	 * FETCHING PROJECT
	 */
	useEffect(() => {
		APICALL.service(fetchproject + p_unique_key, 'GET')
			.then((result) => {
				// console.log(result.data);
				if (result.data.length > 0) {
					var res = [];
					res.project_name = result.data.project_name;
					res.project_location = result.data.project_location;
					res.hno = result.data.hno;
					res.city = result.data.city;
					res.extra = result.data.extra;
					res.comp_id = result.data.comp_id;
					res.street = result.data.street;
					res.postal_code = result.data.postal_code;
					res.country = result.data.country;
					setData(res);
					console.log(data);
				}

				setCountrylist(result.data.countrylist);

				// setData(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	/**
	 * 
	 * @param {*} event 
	 * Submit function
	 */
	let submit = async (event) => {
		event.preventDefault();
		var valid_res = validate(data);
		if (valid_res) {
			console.log(data);
			APICALL.service(addProject, 'POST', data)
				.then((result) => {
					console.log(result);
					props.popupActionNo();
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	let validate = (res) => {
		var error1 = [];
		/**
		 * check if required fields are empty
		 */
		error1['project_name'] = ValidationService.emptyValidationMethod(res.project_name);
		error1['project_location'] = ValidationService.emptyValidationMethod(res.project_location);
		error1['hno'] = ValidationService.emptyValidationMethod(res.hno);
		error1['city'] = ValidationService.emptyValidationMethod(res.city);
		error1['comp_id'] = ValidationService.emptyValidationMethod(res.comp_id);
		error1['street'] = ValidationService.emptyValidationMethod(res.street);
		error1['postal_code'] = ValidationService.emptyValidationMethod(res.postal_code);
		error1['country'] = ValidationService.emptyValidationMethod(res.country);

		/**
		 * check if project name is valid
		 */
		error1['project_name'] =
			error1['project_name'] == ''
				? ValidationService.projectNameValidationMethod(res.project_name)
				: error1['project_name'];
		/**
		 * check if project location is valid 
		 */
		error1['project_location'] =
			error1['project_location'] == ''
				? ValidationService.projectNameValidationMethod(res.project_location)
				: error1['project_location'];
		/**
		 * check if hno is valid
		 */
		error1['hno'] = error1['hno'] == '' ? ValidationService.projectNameValidationMethod(res.hno) : error1['hno'];

		/**
		 * check if city is valid
		 */
		error1['city'] =
			error1['city'] == '' ? ValidationService.projectNameValidationMethod(res.city) : error1['city'];
		/**
		 * check if street field is valid
		 */

		error1['street'] =
			error1['street'] == '' ? ValidationService.projectNameValidationMethod(res.street) : error1['street'];

		/**
		 * POSTALCODE VALIDATION
		 */
		error1['postal_code'] =
			error1['postal_code'] == ''
				? ValidationService.postalCodeValidationMethod(res.postal_code)
				: error1['postal_code'];

		/**
		 * seterror messages
		 */
		setError_project_name(error1['project_name']);
		setError_project_location(error1['project_location']);
		setError_hno(error1['hno']);
		setError_city(error1['city']);
		setError_extra(error1['extra']);
		setError_comp_id(error1['comp_id']);
		setError_street(error1['street']);
		setError_postal_code(error1['postal_code']);
		setError_countrylist(error1['country']);

		// alert(error1);

		//return false if there is an error else return true
		if (
			error1['project_name'] == '' &&
			error1['project_location'] == '' &&
			error1['hno'] == '' &&
			error1['city'] == '' &&
			error1['comp_id'] == '' &&
			error1['street'] == '' &&
			error1['postal_code'] == '' &&
			error1['country'] == ''
		) {
			// alert('true');
			return true;
		} else {
			// alert('false');

			return false;
		}
	};

	return (
		<div>
			<form onSubmit={(e) => submit(e)}>
				<div
					className="modal"
					id="myModal"
					tabIndex="-1"
					style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
				>
					{/* <div className="modal-dialog custom-modal-width-90 modal-xl "> */}
					<div className="modal-dialog  modal-xl ">
						<div className="modal-content  ">
							<div className="modal-header">
								<p className="modal-title  mt-3 font-weight-bold  poppins-italic-24px">Add project</p>
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
										<div className=" ">
											{/* PROJECT NAME */}
											<div className='row col-md-12 m-0'>
												<div className='col-6'>
												<label className="font-weight-bold custom_astrick">Project name</label>
											<input
												type="text"
												className="form-control mt-2 mb-2 "
												value={data.project_name}
												onChange={(e) => {
													setData((prev) => ({ ...prev, project_name: e.target.value }));
												}}
											/>
											<p className="error mt-2">{error_project_name}</p>
												</div>
												<div className='col-6'>
												<label className="custom_astrick">Company</label>
											<select
												className="form-select mt-2 mb-2"
												value={data.comp_id}
												onChange={(e) => {
													setData((prev) => ({ ...prev, comp_id: e.target.value }));
													props.updatecompany(e.target.value);
												}}
											>
												<option value="">Select</option>
												{props.company.map((options) => (
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
												</div>

											</div>
											
											{/* COMPANY */}

											

											{/* LOCATION */}
											<div className='col-md-12 row m-0'>
											<div className="col-6">
													<label className="mt-2 custom_astrick">Location</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.project_location}
														onChange={(e) => {
															setData((prev) => ({
																...prev,
																project_location: e.target.value
															}));
														}}
													/>
													<p className="error mt-2">{error_project_location}</p>
												</div>
											</div>
											<div className="row col-md-12 m-0">
											
												<div className="col-6">
													<label className="custom_astrick mt-2">Street</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.street}
														onChange={(e) => {
															setData((prev) => ({ ...prev, street: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_street}</p>
												</div>

												{/* HOUSE NUMBER */}
												<div className="col-3">
													<label className="custom_astrick mt-2">House number</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.hno}
														onChange={(e) => {
															setData((prev) => ({ ...prev, hno: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_hno}</p>
												</div>
												<div className="col-3">
													<label className="custom_astrick mt-2">Bus number</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.hno}
														onChange={(e) => {
															setData((prev) => ({ ...prev, hno: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_hno}</p>
												</div>
											</div>
											{/* CITY */}
											<div className="row col-md-12 m-0">
											<div className="col-6">
													<label className="custom_astrick mt-2">Postalcode</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.postal_code}
														onChange={(e) => {
															setData((prev) => ({
																...prev,
																postal_code: e.target.value
															}));
														}}
													/>
													<p className="error mt-2">{error_postal_code}</p>
												</div>
												<div className="col-6">
													<label className="custom_astrick mt-2">City</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.city}
														onChange={(e) => {
															setData((prev) => ({ ...prev, city: e.target.value }));
														}}
													/>

													<p className="error mt-2">{error_city}</p>
												</div>
											
											</div>
											{/* EXTRA */}
											<div className="row col-md-12 m-0">
												<div className="col-6">
													<label className="custom_astrick mt-2">Country</label>
													<select
														className="form-select mt-2 mb-2 custom-select"
														value={data.country}
														onChange={(e) => {
															setData((prev) => ({ ...prev, country: e.target.value }));
														}}
													>
														<option value="">Select country</option>
														{countrylist.map((options) => (
															<option key={options.iso} value={options.iso}>
																{options.country}
															</option>
														))}
													</select>
													<p className="error mt-2">{error_countrylist}</p>
												</div>
												
											</div>
											<div className="row col-md-12 m-0">
											<div className="col-12">
													<label className=" mt-2">Extra</label>
													<input
														type="text"
														className="form-control mt-2 mb-2"
														value={data.extra}
														onChange={(e) => {
															setData((prev) => ({ ...prev, extra: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_extra}</p>
												</div>
												</div>
										</div>
									</div>
								</div>
								<div className="modal-footer border-0 col-md-12 ">
									<button
										type="submit"
										className="btn btn-lg btn-block float-right add-proj-btn custom-btn px-3 "
													// </div>data-bs-dismiss="modal"
										// onClick={() => props.popupActionNo()}
										onClick={(e) => {
											setData((prev) => ({ ...prev, p_unique_key: p_unique_key }));
											// ;
										}}
									>
										Save
									</button>
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
