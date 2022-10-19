import React, { Component, useEffect, useState,useContext } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import Link from 'node_modules/next/link';
import moment from 'moment';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import EditEmployee from './EditEmployee';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';


function WeeklyPlanning(props) {
	const { contextState = {} } = useContext(UserAuthContext);

	const [ showview, setShowview ] = useState(false);
	const [ planning, setPlanning ] = useState([]);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ location, setLocation ] = useState('');
	const [ company, setCompany ] = useState('');
	const [ project, setProject ] = useState('');
	const [ costcenter, setCostcenter ] = useState('');
	const [ companylist, setCompanylist ] = useState([]);
	const [ locationlist, setLocationlist ] = useState([]);
	const [ costcenterlist, setCostcenterlist ] = useState([]);
	const [ edit, setEdit ] = useState(false);
	const [ editDate, setEditDate ] = useState([]);
	const [ weekCount, setWeekCount ] = useState(0);

	const [ styleEdit, setStyleEdit ] = useState('col-md-12');

	// useEffect(() => {
	// 	if (localStorage.getItem('uid') != null) {
	// 		setEmpr_id(JSON.parse(localStorage.getItem('uid')));
	// 	} else {
	// 		window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
	// 	}
	// }, []);

	useEffect(
		() => {
			if (showview == true) {
				if (company != '') {
					var loc = location != '' ? location : 0;
					var cc = costcenter != '' ? costcenter : 0;
					APICALL.service(getWeeklyPlanning + company + '/' + loc + '/' + cc + '/' + weekCount, 'GET')
						.then((result) => {
							if (result.status == 200) {
								console.log(result.data[0]);
								setPlanning(result.data[1]);
								setActiveWeek(result.data[0]);
							}
						})
						.catch((error) => {
							console.error(error);
						});
				} else {
					setPlanning([]);
				}
			}
		},
		[ showview, company, location, costcenter, weekCount ]
	);

	useEffect(
		() => {
			if (contextState.uid) {
				APICALL.service(getEmployeerCompanylist + contextState.uid, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result);
							setCompanylist(result.data[0]);
							setLocationlist(result.data[1]);
							setCostcenterlist(result.data[2]);
							setShowview(true);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ contextState.uid ]
	);
	let editplanning = (data) => {
		setEdit(true);
		setStyleEdit('col-md-9');
		setEditDate(data);
		window.scrollTo(0, 0);
	};
	let updateParent = () => {
		setStyleEdit('col-md-12');
		setEditDate([]);
		setEdit(false);
	};

	let updateLocation = (comp_id) => {
		setCompany(comp_id);
		var compObj = companylist.find((obj) => {
			return obj.nid == comp_id ? obj : '';
		});

		let counter = 0;
		locationlist.map((loc) => {
			if (loc.comp_id == comp_id) counter++;
		});
		if (counter == 1) {
			var result = locationlist.find((obj) => {
				return obj.comp_id == comp_id ? obj : '';
			});
			if (result != '') {
				setLocation(result.value);
			}
			// updateCostCenter(result.value);
		} else {
			setLocation('');
		}
	};
	let updateCostCenter = (loc_id) => {
		let counter = 0;
		costcenterlist.map((loc) => {
			if (loc.location_id == loc_id) counter++;
		});
		if (counter == 1) {
			var result = costcenterlist.find((obj) => {
				return obj.location_id == loc_id ? obj : '';
			});
			if (result != '') {
				setCostcenter(result.value);
			}
		} else {
			setCostcenter('');
		}
	};
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row">
				<div className="row position-sticky-pc">
					<div className="col-md-12">
						<p className=" py-4 font-weight-bold   bitter-italic-normal-medium-24">Weekly planning</p>
						{activeWeek &&
						activeWeek.length > 0 && (
							<p className=" poppins-light-18px pb-3">
								For the week of Monday from {activeWeek[0].split('-').reverse().join('-')} to sunday{' '}
								{activeWeek[6].split('-').reverse().join('-')}
							</p>
						)}
					</div>
				</div>
				<div className=" pt-3 d-flex justify-content-end planning_encodage_position">
					<div className="d-inline ">
						<button
							type="button"
							className="btn  btn my-2 skyblue-bg-color border-0 poppins-medium-18px  rounded-0 btn-block float-end mt-2 mb-2 d-flex align-items-center add-pln  px-3 btn-block shadow-none rounded-0 "
						>
							Planning view
						</button>
					</div>
					<div className=" ">
						<button
							type="submit"
							className="btn  my-2 border-0 px-3  btn-block btn-bg-gray-medium add-pln poppins-medium-18px shadow-none rounded-0 "
						>
							Draft planning
						</button>
					</div>
				</div>
				{/* {showview && <p className="h6">For the week of Monday from 10/07/2022 to sunday 17/07/2022</p>}

				{showview && (
					<div className=" mt-4 d-flex justify-content-end">
						<div className="d-inline ">
							<button type="button" className="btn btn-dark   btn-block ">
								Planning view
							</button>
						</div>
						<div className=" ">
							<button type="submit" className="btn btn-outline-dark ms-2   btn-block ">
								Encodage view
							</button>
						</div>
					</div>
				)} */}
				<div className=" py-4 d-flex weekly_planning_search_position">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-3">
								<select
									value={company}
									className="form-select w-100 rounded-0 poppins-light-18px shadow-none rounded-0"
									onChange={(e) => {
										updateLocation(e.target.value);
									}}
								>
									<option value=""> Select company</option>
									{companylist.map((value) => (
										<option key={value.nid} value={value.nid}>
											{value.title}
										</option>
									))}
								</select>
							</div>
							<div className="col-md-3">
								<select
									className="form-select w-100 poppins-light-18px shadow-none rounded-0"
									onChange={(e) => {
										setLocation(e.target.value);
										updateCostCenter(e.target.value);
									}}
									value={location}
								>
									<option value="">Select Location</option>
									{company != '' &&
										locationlist.map(
											(options) =>
												options.comp_id == company && (
													<option key={options.value} value={options.value}>
														{options.title}
													</option>
												)
										)}
									{/* {locationlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))} */}
								</select>
							</div>
							<div className="col-md-3">
								<select
									className="form-select w-100 poppins-light-18px shadow-none rounded-0"
									value={costcenter}
									onChange={(e) => {
										setCostcenter(e.target.value);
									}}
								>
									<option value="">Select cost center</option>
									{costcenterlist.map((value) => (
										<option key={value.value} value={value.value}>
											{value.title}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					{/* <select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select> */}
				</div>
				<div className={'mt-2 min-height-weekly-planning'}>
					{planning || company != '' ? (
						<div className="row">
							<div className={styleEdit}>
								<p className={' bitter-italic-normal-medium-22 text-center table-title-bg py-3 '}>
									<FaLessThan
										className="less-grather mx-4"
										onClick={() => {
											setWeekCount(weekCount - 1);
										}}
									/>{' '}
									<span
										onClick={() => {
											setWeekCount(0);
										}}
									>
										Current week
									</span>{' '}
									<FaGreaterThan
										className="less-grather mx-4"
										onClick={() => {
											setWeekCount(weekCount + 1);
										}}
									/>{' '}
								</p>
								<table className="table">
									<thead className="">
										{console.log(activeWeek)}
										{activeWeek &&
										activeWeek.length > 0 && (
											<tr className="skyblue-bg-color">
												<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
													Monday<br />
													{activeWeek.length > 0 &&
														activeWeek[0].split('-').reverse().join('-')}
												</th>
												<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
													Tuesday <br />
													{activeWeek.length > 0 &&
														activeWeek[1].split('-').reverse().join('-')}
												</th>
												<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
													Wednesday <br />
													{activeWeek.length > 0 &&
														activeWeek[2].split('-').reverse().join('-')}
												</th>
												<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
													Thursday <br />
													{activeWeek.length > 0 &&
														activeWeek[3].split('-').reverse().join('-')}
												</th>
												<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
													Friday<br />
													{activeWeek.length > 0 &&
														activeWeek[4].split('-').reverse().join('-')}
												</th>
												<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
													Saturday<br />
													{activeWeek.length > 0 &&
														activeWeek[5].split('-').reverse().join('-')}
												</th>
												<th className="  text-center  align-items-center justify-content-center lh-base">
													Sunday<br />
													{activeWeek.length > 0 &&
														activeWeek[6].split('-').reverse().join('-')}
												</th>
											</tr>
										)}
									</thead>
									<tbody>
										{Object.keys(planning).length > 0 ? (
											Object.keys(planning).map((value) => (
												<tr
													className="border-bottom table-border-gray equal-width-calc"
													key={value}
												>
													{console.log(planning)}
													{activeWeek.map((val, key) => (
														<td className=" table-border-gray font-poppins-light" key={key}>
															{planning[value].map(
													(v2, k2) =>
														v2.some((el) => el.pdate === val) ? (
															<div>
																{v2.map(
																	(val1, key1) =>
																		val1.pdate == val ? (
																			<div key={val1.id}>
																				{key1 == 0 && (
																					<div>
																						<div className="row mb-1">
																						<div className="col-md-9 pe-0">
																							<p className="color-skyblue pt-1">
																								{val1.employee_name}
																							</p>
																						</div>
																						<div className="color-skyblue my-2 mt-1 text-end col-md-3">
																							{new Date(val1.pdate) >
																							new Date() ? (
																								<a>
																									<MdEdit
																										className="float-right"
																										data-toggle="tooltip"
																										title="Edit plannig"
																										onClick={() =>
																											editplanning(
																												val1
																											)}
																									/>
																								</a>
																							) : (
																								<span className="invisible">
																									edit
																								</span>
																							)}
																						</div>
																					</div>
																						<br />
																						<p className="poppins-light-14px">
																							{val1.employee_type_name}
																						</p>
																						<br />
																						<p className="poppins-light-14px">
																							{val1.function_name}
																						</p>
																						<br />
																						<p className="poppins-light-14px">
																							{'€ ' + val1.salary}
																						</p>
																						<br />
																					</div>
																				)}
																				<p className="poppins-light-14px">
																					{moment(val1.starttime).format(
																						'HH:mm'
																					) +
																						' to ' +
																						moment(val1.endtime).format(
																							'HH:mm'
																						)}
																				</p>

																				<br />
																			</div>
																		) : (
																			''
																		)
																)}
															</div>
														) : (
															''
														)
												)}
														</td>
													))}
												</tr>
											))
										) : company != '' ? (
											<tr className="no-records">
												<td
													colSpan={7}
													className="align-middle text-center poppins-light-18px border"
													style={{ height: '4rem' }}
												>
													No planning for this week.
												</td>
											</tr>
										) : (
											<tr>
												<td
													colSpan={7}
													className="align-middle text-center poppins-light-18px border"
													style={{ height: '4rem' }}
												>
													Select company and location to view planning.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{edit && (
								<div className="col-md-3">
									<EditEmployee data={editDate} childtoparent={updateParent} />
								</div>
							)}
						</div>
					) : (
						<div className="col-md-12 week-height align-items-center d-flex justify-content-center mb-4">
							Select company and location to view planning.
						</div>
					)}
				</div>
				<div className="text-end mb-3">
					<button type="submit" className="btn rounded-0  custom-btn px-3  btn-block float-end ">
						<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL} className="">
							<a className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none">
								DASHBOARD
							</a>
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default WeeklyPlanning;
