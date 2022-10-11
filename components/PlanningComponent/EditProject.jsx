import React, { useState, useEffect } from 'react';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import {
	addProject,
	fetchproject,
	fetchallproject,
	fetchprojectbyid,
	updateEditproject
} from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

function EditProject(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;

	const [ countrylist, setCountrylist ] = useState([]);
	const [ company, setCompany ] = useState([]);

	const [ id, setId ] = useState('');
	// const [ project, setProject ] = useState([]);

	/**
     * VALIDATION
     */
	const [ error_project_name, setError_project_name ] = useState('');
	const [ error_project_location, setError_project_location ] = useState('');
	const [ error_hno, setError_hno ] = useState('');
	const [ error_city, setError_city ] = useState('');
	const [ error_extra, setError_extra ] = useState('');
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_street, setError_street ] = useState('');
	const [ error_postal_code, setError_postal_code ] = useState('');
	const [ error_countrylist, setError_countrylist ] = useState('');
	const [ error_bus_number, setError_bus_number ] = useState('');

	let validate = (res) => {
		console.log(res);
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
		error1['bno'] = ValidationService.emptyValidationMethod(res.bno);

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
		error1['bno'] = error1['bno'] == '' ? ValidationService.projectNameValidationMethod(res.bno) : error1['bno'];

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
		setError_bus_number(error1['bno']);

		//return false if there is an error else return true
		if (
			error1['project_name'] == '' &&
			error1['project_location'] == '' &&
			error1['hno'] == '' &&
			error1['city'] == '' &&
			error1['comp_id'] == '' &&
			error1['street'] == '' &&
			error1['postal_code'] == '' &&
			error1['country'] == '' &&
			error1['bno'] == ''
		) {
			return true;
		} else {
			return false;
		}
	};

	const [ project, setProject ] = useState({
		id: '',
		project_name: '',
		project_location: '',
		hno: '',
		bno: '',
		city: '',
		extra: '',
		comp_id: '',
		street: '',
		postal_code: '',
		country: '',
		address_id: ''
	});

	/**
	 *
	 * @param {*} event
	 * Submit function
	 */
	let submit = async (event) => {
		event.preventDefault();
		var valid_res = validate(project);
		// alert(valid_res);
		if (valid_res) {
			// alert('1111');
			console.log(project);
			APICALL.service(updateEditproject, 'POST', project)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						router.push('/planning/manage-project');
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	useEffect(
		() => {
			if (props.id != undefined) {
				APICALL.service(fetchprojectbyid + props.id, 'GET')
					.then((result) => {
						console.log(result.data[0]);
						setCountrylist(result.data.countrylist);
						console.log(result.data.countrylist);
						if (result.data) {
							var res = project;
							res.id = result.data[0].id;
							res.project_name = result.data[0].project_name;
							res.project_location = result.data[0].project_location;
							res.address_id = result.data[0].address_id;
							res.hno = result.data[0].hno;
							res.bno = result.data[0].bno;
							res.city = result.data[0].city;
							// console.log(res.city);
							res.extra = result.data[0].extra;
							res.comp_id = result.data[0].comp_id;
							res.company_name = result.data[0].company_name;
							// console.log(res.comp_id);
							res.street = result.data[0].street;
							// console.log(result.data[0].street);
							res.postal_code = result.data[0].postal_code;
							res.country = result.data[0].country;
							// res.countrylist = result.data[0].countrylist;
							// console.log(res.country);
							setProject((prev) => ({ ...prev, project: res }));

							// setProject(res);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		[ props.id ]
	);

	// useEffect(
	// 	() => {
	// 		console.log(props.data);
	// 		var data1 = props.data;
	// 	},
	// 	[ props.data ]
	// );

	return (
		<div>
			<form onSubmit={(e) => submit(e)}>
				<div>
					<div className="">
						<div className="  ">
							<div className=" col-md-12 m-auto px-0 py-4 position-sticky-pc">
								<div className="col-md-10">
									<p className="h1 font-weight-bold   px-0  bitter-italic-normal-medium-24">
										Edit project
									</p>
								</div>
							</div>

							<div
							// className="modal-body "
							>
								<div className="col-md-12 m-auto border_purple px-1 py-3">
									<div className="row">
										<div className="col-md-12 ">
											{/* PROJECT NAME */}
											<div className="row col-md-12 m-0">
												<div className="col-6">
													<label className="font-weight-bold custom_astrick">
														Project name
													</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.project_name}
														onChange={(e) => {
															setProject((prev) => ({
																...prev,
																project_name: e.target.value
															}));
														}}
													/>
													<p className="error mt-2">{error_project_name}</p>
												</div>

												{/* COMPANY */}
												<div className="col-6">
													<label className="custom_astrick">Company</label>
													<select
														value={project.comp_id}
														className="form-select mb-2 mt-2 rounded-0 shadow-none border"
														placeholder="select company"
														disabled={props.company_id != ''}
														onChange={(e) => {
															setProject((prev) => ({
																...prev,
																comp_id: e.target.value
															}));
															// updateLocation(e.target.value);
														}}
													>
														<option value="">Select</option>
														<option value={project.comp_id}>{project.company_name}</option>
													</select>
													<p className="error mt-2">{error_comp_id}</p>
												</div>
											</div>

											{/* LOCATION */}
											<div className="col-md-12 row m-0">
												<div className="col-6">
													<label className="mt-2 custom_astrick">Location</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.project_location}
														onChange={(e) => {
															setProject((prev) => ({
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
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.street}
														onChange={(e) => {
															setProject((prev) => ({ ...prev, street: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_street}</p>
												</div>

												{/* HOUSE NUMBER */}
												<div className="col-3">
													<label className="custom_astrick mt-2">House number</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.hno}
														onChange={(e) => {
															setProject((prev) => ({ ...prev, hno: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_hno}</p>
												</div>
												{/* BUS NUMBER */}
												<div className="col-3">
													<label className="custom_astrick mt-2">Bus number</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.bno}
														onChange={(e) => {
															setProject((prev) => ({ ...prev, bno: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_bus_number}</p>
												</div>
											</div>

											<div className="row col-md-12 m-0">
												<div className="col-6">
													<label className="custom_astrick mt-2">Postalcode</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.postal_code}
														onChange={(e) => {
															setProject((prev) => ({
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
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.city}
														onChange={(e) => {
															setProject((prev) => ({ ...prev, city: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_city}</p>
												</div>
											</div>
											{/* EXTRA */}
											<div className="row col-md-12 m-0">
												<div className="col-6">
													<label className="custom_astrick mt-2">
														Country
													</label>
													<select
														className="form-select mt-2 mb-2 custom-select rounded-0 shadow-none border"
														value={project.country}
														onChange={(e) => {
															setProject((prev) => ({
																...prev,
																country: e.target.value
															}));
														}}
													>
														<option value="">Select country</option>
														{countrylist.map((options) => (
															<option key={options.id} value={options.id}>
																{options.country}
															</option>
														))}
														{/* <option value={project.country}>{project.country}</option> */}
													</select>
													<p className="error mt-2">{error_countrylist}</p>
												</div>
											</div>
											<div className="row col-md-12 m-0">
												<div className="col-12">
													<label className=" mt-2">Extra</label>
													<input
														type="text"
														className="form-control mt-2 mb-2 rounded-0 shadow-none border"
														value={project.extra}
														onChange={(e) => {
															setProject((prev) => ({ ...prev, extra: e.target.value }));
														}}
													/>
													<p className="error mt-2">{error_extra}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer border-0 col-md-12 m-auto px-0">
									<button
										type="submit"
										className="btn btn-lg btn-block float-right add-proj-btn custom-btn rounded-0 m-0"
									>
										SAVE
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
export default EditProject;
