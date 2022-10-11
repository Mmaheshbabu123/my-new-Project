import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	addPlanning,
	fetchPlanning,
	getEmployeerCompanylist,
	addProject,
	fetchproject,
	updateProject
} from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import Addproject from './AddProject';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './ProjectArchivePopup';

function Planning(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;

	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ projectid, setProjectid ] = useState('');
	const [ addProject, setAddProject ] = useState(false);


	// For popup add project
	const [ show, setShow ] = useState(false);

	//FOR ASSIGNING COMPANY LOCATION VALUES
	const [ company, setCompany ] = useState([]);
	const [ location, setLocation ] = useState([]);
	const [ costcenter, setCostcenter ] = useState([]);
	const [ empr_id, setEmpr_id ] = useState('');
	const [ projectname, setProjectname ] = useState('');

	//FOR ASSIGNING ID VALUES TO LOCATION, COMPANY, COST-CENTER, ID,
	const [ companyid, setCompanyid ] = useState('');
	const [ locationid, setLocationid ] = useState('');
	const [ costcenterid, setCostcenterid ] = useState('');
	const [ pcid, setPcid ] = useState('');
	const [ id, setId ] = useState('');
	const [ uniquekey, setUniquekey ] = useState('');

	// Errormessage
	const [ error_comp_id, setError_comp_id ] = useState('');
	const [ error_location_id, setError_location_id ] = useState('');
	const [ error_pcid, setError_pcid ] = useState('');

	const [ countrylist, setCountrylist ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [deleteProject, setDeleteProject] = useState(false);

	const [ data, setData ] = useState({
		p_unique_key: '',
		id: '',
		comp_id: '',
		location_id: '',
		cost_center_id: '',
		pcid: '',
	});

	// PROJECT FIELD HIDE AND SHOW
	const [ showproject, setShowproject ] = useState(false);

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

	useEffect(() => {
		if (localStorage.getItem('uid') != null) {
			setEmpr_id(JSON.parse(localStorage.getItem('uid')));
		} else {
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
		}
	}, []);

	// FETCHING COMPANY, LOCATION, COST-CENTER PER EMPLOYER
	useEffect(
		() => {
			if (empr_id) {
				APICALL.service(getEmployeerCompanylist + empr_id, 'GET')
					.then((result) => {
						console.log(result.data[0])
						setCompany(result.data[0]);
						setLocation(result.data[1]);
						setCostcenter(result.data[2]);
						// setUniquekey(result.data[0].p_unique_key);

						if (id == '') {
							if (result.data[0].length == 1) {
								setCompanyid(result.data[0][0].nid);
								result.data[0][0].add_project === '1' && result.data[0][0].add_project!= undefined?	setShowproject(true):setShowproject(false)
								if (result.data[1].length == 1) {
									setLocationid(result.data[1][0].value);
									if (result.data[2].length == 1) {
										setCostcenterid(result.data[2][0].value);
									}
								}
							}
						}
						setLoading(false);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		[ empr_id ]
	);

	// FETCH PLANNING
	useEffect(
		() => {
			if (p_unique_key != undefined && show == false) {
				APICALL.service(fetchPlanning + p_unique_key, 'GET').then((result) => {
					if (result && result.data.length > 0) {
						setId(result.data[0].id);
						setUniquekey(result.data[0].p_unique_key);
						setCompanyid(result.data[0].comp_id);
						console.log(company);
						if (result.data[0].location_id != null && result.data[0].location_id != undefined) {
							setLocationid(result.data[0].location_id);
						}
						var cc_id = result.data[0].cost_center_id == null ? '' : result.data[0].cost_center_id;
						setCostcenterid(cc_id);
					}
				});
			}
		},
		[ p_unique_key, show ]
	);
	// FETCH PLANNING
	useEffect(
		() => {
			if(company.length > 0 && show == false){
				if(companyid != ''){
					var comp = [ ...company ];
					let obj = comp.find(o => o.id === companyid);
					if(obj != null){
					obj.add_project === "1" && obj.add_project!= undefined?	setShowproject(true):setShowproject(false)
					}					
					console.log(obj)
				}
			}
			
		},
		[ company, companyid, show ]
	);

	/**
	 * FETCHING PROJECT
	 */
	useEffect(
		() => {
			if (p_unique_key != undefined && show == false && showdeletepopup == false) {
				APICALL.service(fetchproject + p_unique_key, 'GET')
					.then((result) => {
						console.log(result);
						setCountrylist(result.data.countrylist);
						if (result.data) {
							var res = project;
							res.id = result.data.id;
							res.project_name = result.data.project_name;
							res.project_location = result.data.project_location;
							res.hno = result.data.hno;
							res.bno = result.data.bno;
							res.city = result.data.city;
							res.extra = result.data.extra;
							res.comp_id = result.data.comp_id;
							res.street = result.data.street;
							res.postal_code = result.data.postal_code;
							res.country = result.data.country;
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
		[ p_unique_key, show, showdeletepopup ]
	);

	// ON SUBMIT //
	let submit = (event) => {
		event.preventDefault();
		var valid_res = validate();
		if (valid_res) {
			postData();
		}
	};

	let postData = () => {
		var data = {};
		data.p_unique_key = uniquekey;
		data.id = id;
		data.comp_id = companyid;
		data.location_id = locationid;
		data.cost_center_id = costcenterid == null ? '' : costcenterid;
		APICALL.service(addPlanning, 'POST', [data,deleteProject])
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
	};

	//VALIDATE FORM //
	let validate = () => {
		var error1 = [];

		//check if required fields are empty
		error1['comp_id'] = ValidationService.emptyValidationMethod(companyid);
		error1['location_id'] = ValidationService.emptyValidationMethod(locationid);
		// error1['pcid'] = ValidationService.emptyValidationMethod(pcid);

		//seterror messages
		setError_comp_id(error1['comp_id']);
		setError_location_id(error1['location_id']);
		// setError_pcid(error1['pcid']);

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
		setShow(true);
	};
	error_location_id;

	let updatcomp = (comp_id) => {
		var res = data;
		res.comp_id = comp_id;
		setData(res);
	};

	let updateLocation = (comp_id) => {
		setCompanyid(comp_id);
		
		var compObj = company.find((obj) => {
			return obj.nid == comp_id ? obj : '';
		});
		compObj!='' && compObj.add_project === "1" && compObj.add_project != undefined?	setShowproject(true):setShowproject(false);

		if(compObj!='' && (compObj.add_project === "0" || compObj.add_project != undefined)){
			setProject({
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
			setDeleteProject(true);
		}else{
			setDeleteProject(false);

		}

		let counter = 0;
		location.map((loc) => {
			if (loc.comp_id == comp_id) counter++;
		});
		if (counter == 1) {
			var result = location.find((obj) => {
				return obj.comp_id == comp_id ? obj : '';
			});
			if (result != '') {
				setLocationid(result.value);
			}
			updateCostCenter(result.value);
		} else {
			setLocationid('');
		}
	};
	let updateCostCenter = (loc_id) => {
		let counter = 0;
		costcenter.map((loc) => {
			if (loc.location_id == loc_id) counter++;
		});
		if (counter == 1) {
			var result = costcenter.find((obj) => {
				return obj.location_id == loc_id ? obj : '';
			});
			if (result != '') {
				setCostcenterid(result.value);
			}
		} else {
			setCostcenterid('');
		}
	};
	// DELETE FUNCTIONALITY //
	const deleteproject = async () => {
		var data = {
			id: projectid,
			type: 'delete'
		};
		APICALL.service(updateProject, 'POST', data)
			.then((result) => {
				console.log(result.status);
				setShowdeletepopup(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const closeDeletePopup = () => {
		setShowdeletepopup(false);
	};
	const showDeletePopup = (id) => {
		setProjectid(id);
		setShowdeletepopup(true);
	};
	return (
		<div className="col-md-12">
			{loading == true ? (
				<p>Loading...</p>
			) : (
				<div>
					<form onSubmit={(e) => submit(e)}>
						<div className="row   planning-container calc-height  m-0 col-md-12">
							<div className="col-md-12 px-0 py-4 position-sticky-pc">
								<h1 className="font-weight-bold   px-0  bitter-italic-normal-medium-24">
									Add Planning
								</h1>
							</div>
							<div className="col-md-12 px-0 py-2 add_project_position">
								{(project.id == '' || project.id == undefined) && showproject == true ? (
									<button
										onClick={showPopup}
										type="button"
										className=" btn my-2 skyblue-bg-color border-0 poppins-medium-18px px-5 rounded-0  btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln shadow-none"
									>
										<span style={{ fontSize: '24px' }} className="">
											+
										</span>
										&nbsp; ADD PROJECT
									</button>
								):<button
								type="button"
								className=" btn my-2 skyblue-bg-color border-0 poppins-medium-19px px-5 rounded-0  btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln invisible shadow-none"
							>
								<span style={{ fontSize: '24px' }} className="">
									+
								</span>
								&nbsp; ADD PROJECT
							</button>}
							</div>
						<div className='planning-height px-0'>
						<div className="form-sec border-form-sec p-4 mb-5">
								<div className="col-md-6">
									<div className="form-group mb-3">
										<label className="form-label mt-2 custom_astrick poppins-regular-18px">
											Company
										</label>
										<select
											value={companyid}
											className="form-select mb-2 poppins-regular-16px rounded-0 shadow-none"
											placeholder="select company"
											onChange={(e) => {
												updateLocation(e.target.value);
											}}
										>
											<option value="">Select</option>
											{company.map((options) => (
												<option key={options.nid} value={options.nid} >
													{options.title}
												</option>
											))}
										</select>
										<p className="error mt-2">{error_comp_id}</p>
									</div>

									<div className="form-group mb-3">
										<label className="form-label mt-2 custom_astrick poppins-regular-18px ">
											Location
										</label>
										<select
											value={locationid}
											className="form-select mb-2 poppins-regular-16px rounded-0 shadow-none"
											onChange={(e) => {
												setLocationid(e.target.value);
												updateCostCenter(e.target.value);
											}}
										>
											<option value="">Select</option>
											{companyid != '' &&
												location.map(
													(options) =>
														options.comp_id == companyid && (
															<option key={options.value} value={options.value}>
																{options.title}
															</option>
														)
												)}
										</select>
										<p className="error mt-2">{error_location_id}</p>
									</div>

									<div className="form-group mb-3">
										<label className="form-label mt-2 poppins-regular-18px">Cost center</label>
										<select
											className="form-select mb-2 poppins-regular-16px rounded-0 shadow-none"
											value={costcenterid}
											onChange={(e) => {
												setCostcenterid(e.target.value);
											}}
										>
											<option value="">Select</option>
											{locationid != '' &&
												costcenter.length > 0 &&
												costcenter.map(
													(options) =>
														options.location_id == locationid && (
															<option key={options.value} value={options.value}>
																{options.title}
															</option>
														)
												)}
										</select>
									</div>
									{/* <div className="form-group mb-3">
								<label className="form-label mb-2 mt-2 poppins-regular-16px">Paritair comite</label>
								<select className="form-select mb-2 mt-2">
									<option value="">Select</option>
								</select>
							</div> */}

									{project.id != '' &&
									project.id != undefined && (
										<div className="form-group ">
											<label className="form-label mb-2 mt-2 poppins-regular-16px">Project</label>
											<div className=" d-flex col-md-12 d-inline position-relative">
												<input
													type="text mb-2 mt-2 "
													value={project.project_name}
													className="form-control poppins-regular-16px rounded-0"
													disabled
												/>
												<span className="edit-del-planning">
													<MdEdit
														type="button"
														className="mt-2 ms-3 size-edit color-skyblue"
														onClick={showPopup}
														data-toggle="tooltip"
														title="Edit project"
													/>
													<span onClick={() => showDeletePopup(project.id)} type="button">
														<MdDelete
															className="mt-2 ms-3 color-skyblue size-del "
															data-toggle="tooltip"
															title="Delete project"
														/>
													</span>
												</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						</div>
						<div className="row mt-4 mb-2 col-md-12 m-0">
							<div className="col-md-6 p-0">
								<button type="button" className="btn  btn-block px-0 shadow-none">
									<Link href={'/planning/options'}>
										{/* <p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px "> */}
										<p className="bg-white border-0 poppins-light-18px text-decoration-underline shadow-none ">
											BACK
										</p>
									</Link>
								</button>
							</div>
							<div className="col-md-6 p-0">
								<button
									type="submit"
									// className="btn rounded-0 custom-btn px-3 btn-block float-end"
									className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
									onClick={() => {
										setUniquekey(router.query.p_unique_key);
									}}
								>
									NEXT
								</button>
							</div>
						</div>
					</form>
					{show == true && (
						<div className="">
							{/* {(project.id == ''||project.id == undefined) && ( */}
							<Addproject
								data={project}
								display={'block'}
								company={company}
								company_id={companyid}
								popupActionNo={closePopup}
								popupActionYes={showPopup}
								updatecompany={updatcomp}
								countries={countrylist}
							/>
							{/* )} */}
						</div>
					)}
					{showdeletepopup == true && (
						<Popup
							display={'block'}
							popupActionDeleteNo={closeDeletePopup}
							popupActionDeleteYes={deleteproject}
							body={'Are you sure you want to delete this project?'}
						/>
					)}
				</div>
			)}
		</div>
	);
}
export default Planning;

// FETCHING COMPANY FROM DRUPAL //
// useEffect(() => {
// 	APICALL.service(process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'managecompanies?_format=json', 'GET')
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
// useEffect(
// 	() => {
// 		setLocation([]);
// 		if (data.comp_id != '') {
// 			APICALL.service(
// 				process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'managelocations?_format=json&comp_id=' + data.comp_id,
// 				'GET'
// 			)
// 				.then((result) => {
// 					if (result.length > 0) {
// 						setLocation(result);
// 					} else {
// 						setLocation([]);
// 					}
// 				})
// 				.catch((error) => {
// 					console.error(error);
// 				});
// 		}
// 	},
// 	[ data.comp_id ]
// );

//COST CENTER FETCHING FROM DRUPAL
// useEffect(
// 	() => {
// 		APICALL.service(
// 			process.env.NEXT_PUBLIC_APP_URL_DRUPAL +
// 				'manage-costcenter?_format=json&comp_id=' +
// 				data.comp_id +
// 				'&location_id=' +
// 				data.location_id,
// 			'GET'
// 		)
// 			.then((result) => {
// 				if (result.length > 0) {
// 					setCostcenter(result);
// 				} else {
// 					setCostcenter([]);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	},
// 	[ data.comp_id, data.location_id ]
// );
