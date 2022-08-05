// import React, { useState, useEffect } from 'react';
// import ValidationService from '../../Services/ValidationService';
// import { useRouter } from 'next/router';
// import { addProject, fetchproject, fetchallproject } from '../../Services/ApiEndPoints';

// function EdtiProject(props) {
// 	const router = useRouter();
// 	const { p_unique_key } = router.query;

// 	const [ countrylist, setCountrylist ] = useState([]);

// 	/**
//      * VALIDATION
//      */
// 	const [ error_project_name, setError_project_name ] = useState('');
// 	const [ error_project_location, setError_project_location ] = useState('');
// 	const [ error_hno, setError_hno ] = useState('');
// 	const [ error_city, setError_city ] = useState('');
// 	const [ error_extra, setError_extra ] = useState('');
// 	const [ error_comp_id, setError_comp_id ] = useState('');
// 	const [ error_street, setError_street ] = useState('');
// 	const [ error_postal_code, setError_postal_code ] = useState('');
// 	const [ error_countrylist, setError_countrylist ] = useState('');
// 	const [ error_bus_number, setError_bus_number ] = useState('');

// 	let validate = (res) => {
// 		var error1 = [];
// 		/**
// 		 * check if required fields are empty
// 		 */
// 		error1['project_name'] = ValidationService.emptyValidationMethod(res.project_name);
// 		error1['project_location'] = ValidationService.emptyValidationMethod(res.project_location);
// 		error1['hno'] = ValidationService.emptyValidationMethod(res.hno);
// 		error1['city'] = ValidationService.emptyValidationMethod(res.city);
// 		error1['comp_id'] = ValidationService.emptyValidationMethod(res.comp_id);
// 		error1['street'] = ValidationService.emptyValidationMethod(res.street);
// 		error1['postal_code'] = ValidationService.emptyValidationMethod(res.postal_code);
// 		error1['country'] = ValidationService.emptyValidationMethod(res.country);
// 		error1['bno'] = ValidationService.emptyValidationMethod(res.bno);

// 		/**
// 		 * check if project name is valid
// 		 */
// 		error1['project_name'] =
// 			error1['project_name'] == ''
// 				? ValidationService.projectNameValidationMethod(res.project_name)
// 				: error1['project_name'];
// 		/**
// 		 * check if project location is valid
// 		 */
// 		error1['project_location'] =
// 			error1['project_location'] == ''
// 				? ValidationService.projectNameValidationMethod(res.project_location)
// 				: error1['project_location'];
// 		/**
// 		 * check if hno is valid
// 		 */
// 		error1['hno'] = error1['hno'] == '' ? ValidationService.projectNameValidationMethod(res.hno) : error1['hno'];
// 		error1['bno'] = error1['bno'] == '' ? ValidationService.projectNameValidationMethod(res.bno) : error1['bno'];

// 		/**
// 		 * check if city is valid
// 		 */
// 		error1['city'] =
// 			error1['city'] == '' ? ValidationService.projectNameValidationMethod(res.city) : error1['city'];
// 		/**
// 		 * check if street field is valid
// 		 */

// 		error1['street'] =
// 			error1['street'] == '' ? ValidationService.projectNameValidationMethod(res.street) : error1['street'];

// 		/**
// 		 * POSTALCODE VALIDATION
// 		 */
// 		error1['postal_code'] =
// 			error1['postal_code'] == ''
// 				? ValidationService.postalCodeValidationMethod(res.postal_code)
// 				: error1['postal_code'];

// 		/**
// 		 * seterror messages
// 		 */
// 		setError_project_name(error1['project_name']);
// 		setError_project_location(error1['project_location']);
// 		setError_hno(error1['hno']);
// 		setError_city(error1['city']);
// 		setError_extra(error1['extra']);
// 		setError_comp_id(error1['comp_id']);
// 		setError_street(error1['street']);
// 		setError_postal_code(error1['postal_code']);
// 		setError_countrylist(error1['country']);
// 		setError_bus_number(error1['bno']);

// 		//return false if there is an error else return true
// 		if (
// 			error1['project_name'] == '' &&
// 			error1['project_location'] == '' &&
// 			error1['hno'] == '' &&
// 			error1['city'] == '' &&
// 			error1['comp_id'] == '' &&
// 			error1['street'] == '' &&
// 			error1['postal_code'] == '' &&
// 			error1['country'] == '' &&
// 			error1['bno'] == ''
// 		) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	};

// 	const [ data, setData ] = useState({
// 		id: '',
// 		project_name: '',
// 		project_location: '',
// 		hno: '',
// 		bno: '',
// 		city: '',
// 		extra: '',
// 		comp_id: '',
// 		street: '',
// 		postal_code: '',
// 		country: '',
// 		address_id: ''
// 	});

// 	useEffect(
// 		() => {
// 			if (props.countries) {
// 				setCountrylist(props.countries);
// 			}
// 			if (data.comp_id == '') {
// 				var res = data;
// 				res.comp_id = props.company_id;
// 				setData(res);
// 			}
// 		},
// 		[ props ]
// 	);

// 	useEffect(
// 		() => {
// 			console.log(props.data);
// 			var data1 = props.data;
// 			if (data1) {
// 				setData((prev) => ({
// 					...prev,
// 					id: data1.id,
// 					project_name: data1.project_name,
// 					project_location: data1.project_location,
// 					hno: data1.hno,
// 					street: data1.street,
// 					bno: data1.bno,
// 					postal_code: data1.postal_code,
// 					city: data1.city,
// 					country: data1.country,
// 					extra: data1.extra
// 				}));
// 				// setData(props.data);
// 				// console.log(data);
// 			}
// 		},
// 		[ props.data ]
// 	);

// 	/**
// 	 *
// 	 * @param {*} event
// 	 * Submit function
// 	 */
// 	let submit = async (event) => {
// 		event.preventDefault();
// 		var valid_res = validate(data);
// 		if (valid_res) {
// 			console.log(data);
// 			APICALL.service(addProject, 'POST', data)
// 				.then((result) => {
// 					console.log(result);
// 					// props.popupActionNo();
// 				})
// 				.catch((error) => {
// 					console.error(error);
// 				});
// 		}
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={(e) => submit(e)}>
// 				<div>
// 					<div className="">
// 						<div className="  ">
// 							<div className=" col-md-11 m-auto px-0">
// 								<div className="col-md-10">
// 									<p className="h1 mt-1 mb-2 ms-2 font-weight-bold   px-0  bitter-italic-normal-medium-24">
// 										Edit project
// 									</p>
// 								</div>
// 							</div>

// 							<div
// 							// className="modal-body "
// 							>
// 								<div className="col-md-11 m-auto">
// 									<div className="row">
// 										<div className=" ">
// 											{/* PROJECT NAME */}
// 											<div className="row col-md-12 m-0">
// 												<div className="col-6">
// 													<label className="font-weight-bold custom_astrick">
// 														Project name
// 													</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2 "
// 														value={data.project_name}
// 														onChange={(e) => {
// 															setData((prev) => ({
// 																...prev,
// 																project_name: e.target.value
// 															}));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_project_name}</p>
// 												</div>

// 												{/* COMPANY */}
// 												<div className="col-6">
// 													<label className="custom_astrick">Company</label>
// 													<select
// 														value={data.comp_id}
// 														className="form-select mb-2 mt-2"
// 														placeholder="select company"
// 														disabled={props.company_id != ''}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, comp_id: e.target.value }));
// 															// updateLocation(e.target.value);
// 														}}
// 													>
// 														<option value="">Select</option>
// 													</select>
// 													<p className="error mt-2">{error_comp_id}</p>
// 												</div>
// 											</div>

// 											{/* LOCATION */}
// 											<div className="col-md-12 row m-0">
// 												<div className="col-6">
// 													<label className="mt-2 custom_astrick">Location</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.project_location}
// 														onChange={(e) => {
// 															setData((prev) => ({
// 																...prev,
// 																project_location: e.target.value
// 															}));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_project_location}</p>
// 												</div>
// 											</div>
// 											<div className="row col-md-12 m-0">
// 												<div className="col-6">
// 													<label className="custom_astrick mt-2">Street</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.street}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, street: e.target.value }));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_street}</p>
// 												</div>

// 												{/* HOUSE NUMBER */}
// 												<div className="col-3">
// 													<label className="custom_astrick mt-2">House number</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.hno}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, hno: e.target.value }));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_hno}</p>
// 												</div>
// 												{/* BUS NUMBER */}
// 												<div className="col-3">
// 													<label className="custom_astrick mt-2">Bus number</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.bno}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, bno: e.target.value }));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_bus_number}</p>
// 												</div>
// 											</div>

// 											<div className="row col-md-12 m-0">
// 												<div className="col-6">
// 													<label className="custom_astrick mt-2">Postalcode</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.postal_code}
// 														onChange={(e) => {
// 															setData((prev) => ({
// 																...prev,
// 																postal_code: e.target.value
// 															}));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_postal_code}</p>
// 												</div>
// 												<div className="col-6">
// 													<label className="custom_astrick mt-2">City</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.city}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, city: e.target.value }));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_city}</p>
// 												</div>
// 											</div>
// 											{/* EXTRA */}
// 											<div className="row col-md-12 m-0">
// 												<div className="col-6">
// 													<label className="custom_astrick mt-2">Country</label>
// 													<select
// 														className="form-select mt-2 mb-2 custom-select"
// 														value={data.country}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, country: e.target.value }));
// 														}}
// 													>
// 														<option value="">Select country</option>
// 														{countrylist.map((options) => (
// 															<option key={options.id} value={options.id}>
// 																{options.country}
// 															</option>
// 														))}
// 													</select>
// 													{/* <p className="error mt-2">{error_countrylist}</p> */}
// 												</div>
// 											</div>
// 											<div className="row col-md-12 m-0">
// 												<div className="col-12">
// 													<label className=" mt-2">Extra</label>
// 													<input
// 														type="text"
// 														className="form-control mt-2 mb-2"
// 														value={data.extra}
// 														onChange={(e) => {
// 															setData((prev) => ({ ...prev, extra: e.target.value }));
// 														}}
// 													/>
// 													<p className="error mt-2">{error_extra}</p>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 								<div className="modal-footer border-0 col-md-11 m-auto px-2 ">
// 									<button
// 										type="submit"
// 										className="btn btn-lg btn-block float-right add-proj-btn custom-btn px-3 rounded-0 "
// 										onClick={(e) => {
// 											setData((prev) => ({ ...prev, p_unique_key: p_unique_key }));
// 											// handletable(0);
// 										}}
// 									>
// 										SAVE
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</form>
// 		</div>
// 	);
// }
// export default EdtiProject;
