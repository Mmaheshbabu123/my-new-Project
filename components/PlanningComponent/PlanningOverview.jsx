import React, { useEffect, useState, useContext } from 'react';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import Translation from '@/Translation';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import moment from 'moment';
import { MdEdit, MdDelete } from 'react-icons/md';
import EditEmployee from './EditEmployee';
import Link from 'node_modules/next/link';
import CancelContract from '../PwaComponent/CancelContract';

import PlanningCancelContract from '../PlanningComponent/PlanningCancelContract';

//---------Cancel icon Functionality file Import--------//

const PlanningOverview = (props) => {
	const { t, company, location, costcenter, week, editEmployee } = props;
	const [ planning, setPlanning ] = useState([]);
	const [ styleEdit, setStyleEdit ] = useState('col-md-12');
	const [ showview, setShowview ] = useState(false);
	const [ weekCount, setWeekCount ] = useState(0);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ edit, setEdit ] = useState(false);
	const [ editData, setEditData ] = useState([]);
	const [ cancel_con, setCancel_con ] = useState(false);
	const [ canceldata, setCancelData ] = useState(null);

	const handleClosePopup = () => {
		setCancel_con(false);
		// setCancelData(data);
		// console.log('data == ',data);
	};
	const cancel_contact = () => {
		console.log('kkk');
		setCancel_con(true);
	};

	useEffect(
		() => {
			// if (showview == true) {
			if (company != '') {
				var loc = location != '' ? location : 0;
				var cc = costcenter != '' ? costcenter : 0;
				APICALL.service(getWeeklyPlanning + company + '/' + loc + '/' + cc + '/' + weekCount, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result.data[1]);
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
			// }
		},
		[ showview, props, weekCount ]
	);

	useEffect(
		() => {
			if (activeWeek.length == 0) {
				setActiveWeek(week);
			}
		},
		[ week ]
	);

	useEffect(
		() => {
			if (edit === true && editEmployee === false) {
				setEdit(!edit);
			}
		},
		[ props ]
	);

	let editplanning = (data) => {
		setEdit(true);
		setEditData(data);
		window.scrollTo(0, 0);
	};
	let updateParent = () => {
		setEditData([]);
		setEdit(false);
	};

	let updateSec = (parent_key) => {
		var planning1 = [ ...planning ];
		// if(!edit){

		planning1[parent_key].map((v2, k2) => {
			planning1[parent_key][k2][0].section_open = !planning1[parent_key][k2][0].section_open;
		});
		setPlanning(planning1);
		// }else{
		// 	planning1.map((val,key)=>{
		// 		planning1[key].map((v2,k2) =>{
		// 			planning1[key][k2][0].section_open = false;
		// 		});
		// 	})
		// 	setPlanning(planning1);
		// }
	};

	return (
		<div>
			{cancel_con == true && (
				<div
					className="modal"
					id="myModal"
					tabIndex="-1"
					style={{ display: cancel_con ? 'block' : 'none', background: 'rgb(0,0,0,0.5)' }}
				>
					<PlanningCancelContract
						data={canceldata}
						handleClosePopup={handleClosePopup}
						title={'Cancel planning'}
					/>
				</div>
			)}

			<div className={'mt-2 min-height-weekly-planning'}>
				{planning || company != '' ? (
					<div className="row">
						<div className={styleEdit}>
							<p className={' bitter-italic-normal-medium-22 text-center table-title-bg py-3 '}>
								{company != '' && (
									<FaLessThan
										className="less-grather mx-4"
										onClick={() => {
											setWeekCount(weekCount - 1);
										}}
									/>
								)}{' '}
								<span
									onClick={() => {
										setWeekCount(0);
									}}
								>
									{t('Current week')}
								</span>{' '}
								{company != '' && (
									<FaGreaterThan
										className="less-grather mx-4"
										onClick={() => {
											setWeekCount(weekCount + 1);
										}}
									/>
								)}{' '}
							</p>
							<table className="table">
								<thead className="">
									{console.log(activeWeek)}
									{activeWeek &&
									activeWeek.length > 0 && (
										<tr className="skyblue-bg-color">
											<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
												{t('Monday')}
												<br />
												{activeWeek.length > 0 && activeWeek[0].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
												{t('Tuesday')} <br />
												{activeWeek.length > 0 && activeWeek[1].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
												{t('Wednesday')} <br />
												{activeWeek.length > 0 && activeWeek[2].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
												{t('Thursday')} <br />
												{activeWeek.length > 0 && activeWeek[3].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
												{t('Friday')}
												<br />
												{activeWeek.length > 0 && activeWeek[4].split('-').reverse().join('-')}
											</th>
											<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
												{t('Saturday')}
												<br />
												{activeWeek.length > 0 && activeWeek[5].split('-').reverse().join('-')}
											</th>
											<th className="  text-center  align-items-center justify-content-center lh-base">
												{t('Sunday')}
												<br />
												{activeWeek.length > 0 && activeWeek[6].split('-').reverse().join('-')}
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
												{activeWeek.map((val, key) => (
													<td className=" table-border-gray font-poppins-light" key={key}>
														{planning[value].map((v2, k2) => (
															<div key={k2}>
																{v2.some((el) => el.pdate === val) ? (
																	<div>
																		{v2.map(
																			(val1, key1) =>
																				val1.pdate == val ? (
																					<div key={val1.paid}>
																						{key1 == 0 && (
																							<div>
																								<div className="row mb-1">
																									<div
																										className="col-md-9 pe-0"
																										onClick={() => {
																											updateSec(
																												value,
																												k2
																											);
																										}}
																									>
																										<p className="employee-weekly-planning user-select-none pointer">
																											{val1.employee_name}{' '}
																											{console.log(value)}
																										</p>
																									</div>
																									<div className="color-skyblue text-end col-md-3 ps-0">
																										{new Date(
																											val1.pdate
																										) >
																										new Date() ? (
																											<div className="mb-2">
																												<a>
																													<MdEdit
																														className="float-right cursor-pointer w-100"
																														data-toggle="tooltip"
																														title="Edit plannig"
																														onClick={() => {
																															editplanning(
																																v2
																															);
																														}}
																													/>
																												</a>
																											</div>
																										) : (
																											<span className="d-none">
																												{t(
																													'edit'
																												)}
																											</span>
																										)}

																										<div className="cancel_icon">
																											<Link
																												href=""
																												className="m-2"
																											>
																												<a
																													type="button"
																													className="cross-icon-solid"
																													onClick={() => {
																														cancel_contact();
																														setCancelData(
																															val1
																														);
																													}}
																													data-toggle="tooltip"
																													title={t(
																														'Cancel Contract'
																													)}
																												/>
																											</Link>
																										</div>
																									</div>
																								</div>

																								{val1.section_open ==
																									true && (
																									<p className="poppins-light-14px mb-2">
																										{
																											val1.employee_type_name
																										}
																									</p>
																								)}

																								{val1.section_open ==
																									true && (
																									<p className="poppins-light-14px mb-2">
																										{
																											val1.function_name
																										}
																									</p>
																								)}

																								<p className="poppins-light-14px mb-2">
																									{'€ ' + val1.salary}
																								</p>
																							</div>
																						)}
																						<p className="poppins-light-14px">
																							{moment(
																								val1.starttime
																							).format('HH:mm') +
																								' to ' +
																								moment(
																									val1.endtime
																								).format('HH:mm')}
																						</p>
																					</div>
																				) : (
																					''
																				)
																		)}
																	</div>
																) : (
																	''
																)}
															</div>
														))}
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
												{t('No planning for this week.')}
											</td>
										</tr>
									) : (
										<tr>
											<td
												colSpan={7}
												className="align-middle text-center poppins-light-18px border"
												style={{ height: '4rem' }}
											>
												{t('Select company and location to view planning.')}
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{edit && (
							<div
								className="modal"
								id="myModal"
								tabIndex="-1"
								style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
							>
								<div className="modal-dialog w-50 modal-xl modal-dialog-centered">
									<div className="modal-content  ">
										<div className="modal-header col-md-11 m-auto px-0">
											<div className="col-md-10">
												<p className="modal-title  font-weight-bold  bitter-italic-normal-medium-24 pe-4">
													{t('Edit Employee')}
												</p>
											</div>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												onClick={() => setEdit(false)}
											/>
										</div>

										<div className="modal-body ">
											<div className="m-auto">
												<EditEmployee
													data={editData}
													childtoparent={updateParent}
													edit={edit}
												/>
												{/* <div className="row">
												<div className=" ">
													
												</div>
											</div> */}
											</div>
											{/* <div className="modal-footer border-0 col-md-11 m-auto px-2 add_project">
											<button
												type="submit"
												className="btn btn-lg btn-block float-right add-proj-btn  px-3 rounded-0 "
												onClick={(e) => {
													setData((prev) => ({ ...prev, p_unique_key: p_unique_key }));
												}}
											>
												{t('SAVE')}
											</button>
										</div> */}
										</div>
									</div>
								</div>
							</div>
							// <div className="col-md-3">
							// 	<EditEmployee data={editData} childtoparent={updateParent} edit={edit} />
							// </div>
						)}
					</div>
				) : (
					<div className="col-md-12 week-height align-items-center d-flex justify-content-center mb-4">
						{t('Select company and location to view planning.')}
					</div>
				)}
			</div>
		</div>
	);
};
export default React.memo(
	Translation(PlanningOverview, [
		'Weekly planning',
		'For the week of Monday from',
		'to sunday',
		'Planning view',
		'Draft planning',
		'Select company',
		'Select Location',
		'Select cost center',
		'Current week',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thrusday',
		'Friday',
		'Saturday',
		'Sunday',
		'Edit Employee',
		'No planning for this week.',
		'Select company and location to view planning.',
		'DASHBOARD',
		'edit',
		'Cancel Contract'
	])
);
