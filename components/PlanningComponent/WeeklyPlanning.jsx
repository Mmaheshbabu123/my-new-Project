import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import Link from 'node_modules/next/link';
import moment from 'moment';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import EditEmployee from './EditEmployee';

function WeeklyPlanning(props) {
	const [ empr_id, setEmpr_id ] = useState(143);
	const [ showview, setShowview ] = useState(false);
	const [ planning, setPlanning ] = useState([]);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ location, setLocation ] = useState('');
	const [ company, setCompany ] = useState(253);
	const [ project, setProject ] = useState('');
	const [ costcenter, setCostcenter ] = useState('');
	const [ companylist, setCompanylist ] = useState([]);
	const [ locationlist, setLocationlist ] = useState([]);
	const [ costcenterlist, setCostcenterlist ] = useState([]);
	const [ edit, setEdit ] = useState(false);
	const [ editDate, setEditDate ] = useState([]);


	const [ styleEdit, setStyleEdit ] = useState('col-md-12');

	useEffect(() => {
		if (localStorage.getItem('uid') != null) {
			setEmpr_id(localStorage.getItem('uid'));
			// } else {
			// 	window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
		}
	}, []);

	useEffect(
		() => {
			if (showview == true) {
				if (company != '') {
					APICALL.service(getWeeklyPlanning + company, 'GET')
						.then((result) => {
							if (result.status == 200) {
								console.log(result.data[0][0]);
								setPlanning(result.data[1]);
								setActiveWeek(result.data[0][0]);
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
		[ showview, company ]
	);

	useEffect(
		() => {
			if (empr_id) {
				APICALL.service(getEmployeerCompanylist + empr_id, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result);
							setCompanylist(result.data[0]);
							setLocationlist(result.data[1]);
							setCostcenterlist(result.data[2]);
							console.log(result.data[0]);
							setShowview(true);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ empr_id ]
	);
	let editplanning = (data) => {
		setEdit(true);
		setStyleEdit('col-md-9');
		setEditDate(data);
		window.scrollTo(0, 0)
	};
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row">
				<p className=" mt-3 mb-1 font-weight-bold   bitter-italic-normal-medium-24">Weekly planning</p>
				{activeWeek &&
				activeWeek.length > 0 && (
					<p className=" poppins-regular-16px py-2">
						For the week of Monday from {activeWeek[0].split('-').reverse().join('-')} to sunday{' '}
						{activeWeek[6].split('-').reverse().join('-')}
					</p>
				)}

				<div className=" mt-4 d-flex justify-content-end">
					<div className="d-inline ">
						<button
							type="button"
							className="btn  btn my-2 skyblue-bg-color border-0 poppins-regular-16px  rounded-0 btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln   btn-block "
						>
							Planning view
						</button>
					</div>
					<div className=" ">
						<button
							type="submit"
							className="btn  my-2 border-0  btn-block btn-bg-gray-medium add-pln poppins-regular-16px"
						>
							Encodage view
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
				<div className=" mt-4 d-flex mb-3 ">
					<select
						className="form-select w-25 me-2 rounded-0"
						onChange={(e) => {
							setCompany(e.target.value);
						}}
					>
						<option value=""> Select company</option>
						{companylist.map((value) => (
							<option key={value.nid} value={value.nid}>
								{value.title}
							</option>
						))}
					</select>

					<select className="form-select w-25 me-2 rounded-0">
						<option value="">Select Location</option>
						{locationlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))}
					</select>
					<select className="form-select w-25 me-2 rounded-0">
						<option value="">Cost center</option>
						{costcenterlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))}
					</select>
					{/* <select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select> */}
				</div>
				<div className={'mt-2 '}>
					{planning && Object.keys(planning).length > 0 ? (
						<div className='row'>
						<div className={styleEdit}>
							<p className={' bitter-italic-normal-medium-22 text-center table-title-bg py-3 '}>
								<FaLessThan className="less-grather mx-4" /> Current week{' '}
								<FaGreaterThan className="less-grather mx-4" />{' '}
							</p>
							<table className="table border table-border-gray ">
								<thead className="">
									{console.log(activeWeek)}
									{activeWeek &&
									activeWeek.length > 0 && (
										<tr className="skyblue-bg-color">
											<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
												Monday<br />
												{activeWeek.length > 0 && activeWeek[0].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
												Tuesday <br />
												{activeWeek.length > 0 && activeWeek[1].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
												Wednesday <br />
												{activeWeek.length > 0 && activeWeek[2].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
												Thursday <br />
												{activeWeek.length > 0 && activeWeek[3].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
												Friday<br />
												{activeWeek.length > 0 && activeWeek[4].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
												Saturday<br />
												{activeWeek.length > 0 && activeWeek[5].split('-').reverse().join('-')}
											</th>
											<th className="  text-center  align-items-center justify-content-center lh-base">
												Sunday<br />
												{activeWeek.length > 0 && activeWeek[6].split('-').reverse().join('-')}
											</th>
										</tr>
									)}
								</thead>
								<tbody>
									{Object.keys(planning).map((value) => (
										<tr className="border-bottom table-border-gray equal-width-calc" key={value}>
											{console.log(planning)}
											{activeWeek.map((val, key) => (
												<td className=" table-border-gray font-poppins-light" key={key}>
													{planning[value].some((el) => el.pdate === val) ? (
														<div>
															{planning[value].map(
																(val1) =>
																	val1.pdate == val ? (
																		<div key={val1.id}>
																			<div className="text-right color-skyblue my-2 mt-1 text-end">
																				<a>
																					<MdEdit
																						className="float-right"
																						onClick={() => editplanning(val1)}
																					/>
																				</a>
																			</div>
																			<p className="color-skyblue pt-1">
																				{val1.employee_name}
																			</p>
																			<br />
																			<p className="poppins-regular-16px">
																				{val1.employee_type_name}
																			</p>
																			<br />
																			<p className="poppins-regular-16px">
																				{val1.function_name}
																			</p>
																			<br />
																			<p className="poppins-regular-16px">
																				{'€ ' + val1.salary}
																			</p>
																			<br />
																			<p className="poppins-regular-16px">
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
														<div />
													)}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						
						{edit && <div className='col-md-3'><EditEmployee data={editDate}/></div>}

						</div>
					) : (
						<div className="col-md-12 week-height align-items-center d-flex justify-content-center mb-4">
							Select company and location to view planning.
						</div>
					)}
				</div>
				<div className="text-end mb-4">
					<button type="submit" className="btn rounded-0  custom-btn px-3  btn-block float-end ">
						<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL} className="">
							<a className="btn rounded-0  custom-btn px-3  btn-block float-end ">DASHBOARD</a>
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default WeeklyPlanning;
