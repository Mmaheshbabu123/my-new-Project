import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '../../Services/ApiServices';
import {
	addPlanning,
	fetchPlanning,
	getEmployeerCompanylist,
	updateEmployeePlanning,
	updateProject
} from '../../Services/ApiEndPoints';
import Translation from '@/Translation';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import ValidationService from '../../Services/ValidationService';
import Addproject from './AddProject';
import Link from 'next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './ProjectArchivePopup';


function Planning(props) {
	const { t } = props;
	const router = useRouter();
	const { p_unique_key } = router.query;
	const { contextState = {} } = useContext(UserAuthContext);
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ projectid, setProjectid ] = useState('');

	// For popup add project
	const [ show, setShow ] = useState(false);

	//FOR ASSIGNING COMPANY LOCATION VALUES
	const [ company, setCompany ] = useState([]);
	const [ location, setLocation ] = useState([]);
	const [ costcenter, setCostcenter ] = useState([]);

	//FOR ASSIGNING ID VALUES TO LOCATION, COMPANY, COST-CENTER, ID,
	const [ companyid, setCompanyid ] = useState('');
	const [ locationid, setLocationid ] = useState('');
	const [ costcenterid, setCostcenterid ] = useState('');
	const [ id, setId ] = useState('');
	const [ uniquekey, setUniquekey ] = useState('');

	// Error message
	const [ error_comp_id, setError_comp_id ] = useState('');

	const [ countrylist, setCountrylist ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const [ data, setData ] = useState({
		p_unique_key: '',
		id: '',
		comp_id: '',
		location_id: '',
		cost_center_id: '',
		pcid: ''
	});

	// PROJECT FIELD HIDE AND SHOW
	const [ showproject, setShowproject ] = useState(false);

	const [projectDetails, setProjectDetails] = useState({
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

	// FETCHING COMPANY, LOCATION, COST-CENTER PER EMPLOYER
	useEffect(
		() => {
			if (contextState.uid) {
				APICALL.service(getEmployeerCompanylist + contextState.uid + '/' + contextState.roleType, 'GET')
					.then((result) => {
						console.log(result.data);
						setCompany(result.data[0]);
						setLocation(result.data[1]);
						setCostcenter(result.data[2]);
					    setCountrylist(result.data[4]);


						if (id == '') {
							if (result.data[0].length == 1) {
								setCompanyid(result.data[0][0].nid);
								result.data[0][0].add_project === '1' && result.data[0][0].add_project != undefined
									? setShowproject(true)
									: setShowproject(false);
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
		[ contextState.uid ]
	);

	// FETCH PLANNING and Project Details
	useEffect(
		() => {
			if (p_unique_key != undefined) {
				APICALL.service(fetchPlanning + p_unique_key, 'GET').then((result) => {
					if (result && result.data[0].length > 0) {
						console.log(result.data);
						updatePlanningObj(result.data[0]);
					    setCountrylist(result.data[1]);
						setProjectDetails(result.data[2]);

						
					}
				});
			}
		},
		[ p_unique_key ]
	);
	useEffect(
		() => {
			if (company.length > 0 && show == false) {
				if (companyid != '') {
					var comp = [ ...company ];
					let obj = comp.find((o) => o.id === companyid);
					if (obj != null) {
						obj.add_project === '1' && obj.add_project != undefined
							? setShowproject(true)
							: setShowproject(false);
					}
					console.log(obj);
				}
			}
		},
		[ company, companyid, show ]
	);

	let updatePlanningObj = (res)=>{
		setId(res[0].id);
		setUniquekey(res[0].p_unique_key);
		setCompanyid(res[0].comp_id);
		console.log(company);
		if (res[0].location_id != null && res[0].location_id != undefined) {
			setLocationid(res[0].location_id);
		}
		var cc_id = res[0].cost_center_id == null ? '' : res[0].cost_center_id;
		setCostcenterid(cc_id);
	}

	// /**
	//  * FETCHING PROJECT
	//  */
	// useEffect(
	// 	() => {
	// 		if (p_unique_key != undefined && show == false && showdeletepopup == false) {
	// 			APICALL.service(fetchproject + p_unique_key, 'GET')
	// 				.then((result) => {
	// 					console.log(result);
	// 					setCountrylist(result.data.countrylist);
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		}
	// 	},
	// 	[ p_unique_key, show, showdeletepopup ]
	// );

	// ON SUBMIT //
	let submit = (event) => {
		event.preventDefault();
		var valid_res = validate();
		if (valid_res) {
			postData();
		}
	};

	//STORE DATA IN DATABASE
	let postData = () => {
		var data = {};
		data.p_unique_key = uniquekey;
		data.id = id;
		data.comp_id = companyid;
		data.location_id = locationid == '' ? null : locationid;
		data.cost_center_id = costcenterid == null ? '' : costcenterid;
		APICALL.service(addPlanning, 'POST', [ data, projectDetails ])
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

		//seterror messages
		setError_comp_id(error1['comp_id']);

		//return false if there is an error else return true
		if (error1['comp_id'] == '') {
			return true;
		} else {
			return false;
		}
	};

	// CLOSE POPUP
	const closePopup = () => {
		setShow(false);
	};

	//PROJECT DETAILS
	const updateProjectDetails = (res1) => {
		setProjectDetails(res1);
		setShow(false);
	};

	// SHOW POPUP
	const showPopup = (id) => {
		setShow(true);
	};

	let updatcomp = (comp_id) => {
		var res = data;
		res.comp_id = comp_id;
		setData(res);
	};

	//UPDATE LOCATION DROP DOWN
	let updateLocation = (comp_id) => {
		setCompanyid(comp_id);

		var compObj = company.find((obj) => {
			return obj.nid == comp_id ? obj : '';
		});
		if (comp_id != '') {
			compObj != '' && compObj.add_project === '1' && compObj.add_project != undefined
				? setShowproject(true)
				: setShowproject(false);
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
	//UPDATE COSTCENTER DROP DOWN LIST
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

	let updateProject = (comp_id) => {
		setProjectDetails({});
	}
	// DELETE FUNCTIONALITY //
	const deleteproject = async () => {
		if(projectDetails.id != ''){
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
		}else{
			setProjectDetails({});
			setShowdeletepopup(false);
		}
	};
	//CLOSE DELETE POPUP FOR PROJECT
	const closeDeletePopup = () => {
		setShowdeletepopup(false);
	};
	//SHOW DELETE POPUP FOR PROJECT
	const showDeletePopup = (id) => {
		setProjectid(id);
		setShowdeletepopup(true);
	};
	return (
		<div className="col-md-12">
			{loading == true ? (
				<p>{t('Loading...')}</p>
			) : (
				<div>
					<form onSubmit={(e) => submit(e)}>
						<div className="row   planning-container calc-height  m-0 col-md-12">
							<div className="col-md-12 py-4 position-sticky-pc px-0">
								<h1 className="font-weight-bold bitter-italic-normal-medium-24">{t('Add Planning')}</h1>
							</div>
							<div className="col-md-12 px-0 py-2 add_project_position border-bottom-purple">
									<button
										onClick={showPopup}
										type="button"
										className={`btn my-2 skyblue-bg-color border-0 poppins-medium-18px px-5 rounded-0  btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln shadow-none ${((projectDetails.project_name == ''||projectDetails.project_name == undefined) && showproject== true)?'visible':'invisible'}`}
									>
										<span style={{ fontSize: '24px' }} className="">
											+
										</span>
										&nbsp; {t('ADD PROJECT')}
									</button>
							</div>
							<div className="planning-height px-0">
								<div className="form-sec border-form-sec p-4 mb-5 border-top-0">
									<div className="col-md-6">
										<div className="form-group mb-3">
											<label className="form-label mt-2 custom_astrick poppins-regular-18px">
												{t('Company')}
											</label>
											<select
												value={companyid}
												className="form-select mb-2 poppins-regular-16px rounded-0 shadow-none"
												placeholder={t('select company')}
												onChange={(e) => {
													updateLocation(e.target.value);
													updateProject(companyid);
												}}
											>
												<option value="">{t('Select')}</option>
												{company.map((options) => (
													<option key={options.nid} value={options.nid}>
														{options.title}
													</option>
												))}
											</select>
											<p className="error mt-2">{error_comp_id}</p>
										</div>

										<div className="form-group mb-3">
											<label className="form-label mt-2 poppins-regular-18px ">
												{t('Location')}
											</label>
											<select
												value={locationid}
												className="form-select mb-2 poppins-regular-16px rounded-0 shadow-none"
												onChange={(e) => {
													setLocationid(e.target.value);
													updateCostCenter(e.target.value);
												}}
											>
												<option value="">{t('Select')}</option>
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
												<option value="">{t('Select')}</option>
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
										{(projectDetails.project_name != '' && projectDetails.project_name != undefined) &&(
											<div className="form-group ">
												<label className="form-label mb-2 mt-2 poppins-regular-16px">
													{t('Project')}
												</label>
												<div className=" d-flex col-md-12 d-inline position-relative">
													<input
														type="text mb-2 mt-2 "
														value={projectDetails.project_name}
														className="form-control poppins-regular-16px rounded-0"
														disabled
													/>
													<span className="edit-del-planning">
														<MdEdit
															type="button"
															className="mt-2 ms-3 size-edit color-skyblue"
															onClick={showPopup}
															data-toggle="tooltip"
															title={t('Edit project')}
														/>
														<span onClick={() => showDeletePopup(projectDetails.id)} type="button">
															<MdDelete
																className="mt-2 ms-3 color-skyblue size-del "
																data-toggle="tooltip"
																title={t('Delete project')}
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
									<Link
										href={
											router.query.type != undefined && router.query.type == 'edit' ? (
												'/manage-planning/weekly?type=draft'
											) : router.query.type == 'project' ? (
												'/planning/manage-project'
											) : (
												'/planning/options'
											)
										}
									>
										<p className="bg-white border-0 poppins-light-18px text-decoration-underline shadow-none ">
											{t('BACK')}
										</p>
									</Link>
								</button>
							</div>
							<div className="col-md-6 p-0">
								<button
									type="submit"
									className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
									onClick={() => {
										setUniquekey(router.query.p_unique_key);
									}}
								>
									{t('NEXT')}
								</button>
							</div>
						</div>
					</form>
					{show == true && (
						<div className="">
							<Addproject
								data={projectDetails}
								display={'block'}
								companyList={company}
								company_id={companyid}
								popupActionNo={closePopup}
								save={updateProjectDetails}
								popupActionYes={showPopup}
								updatecompany={updatcomp}
								countries={countrylist}
							/>
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
export default React.memo(
	Translation(Planning, [
		'Loading...',
		'Add Planning',
		'ADD PROJECT',
		'Company',
		'select company',
		'Location',
		'Select',
		'Projects',
		'BACK',
		'NEXT',
		'Edit project',
		'Delete project'
	])
);
