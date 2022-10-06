import React, { useState, useContext, useEffect } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { fetchPlannedTimings, storePlannedTimings } from '../../Services/ApiEndPoints';
import { Calendar } from 'react-multi-date-picker';
import style from '../../styles/Planning.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { MdStarRate, MdClose } from 'react-icons/md';
import moment from 'moment';
import Image from 'next/image';
import Close from '../../public/images/Close.svg';
import { cloneDeep } from 'lodash';

function Addtiming(props) {
	var count1 = 0;
	const clearIcon1 = null;
	const router = useRouter();
	const [ value, setValue ] = useState([]);
	const [ selectedDate, setSelectedDate ] = useState([]);
	const [ commonDatetime, setCommonDatetime ] = useState([]);

	const [ checked, setChecked ] = useState(false);
	const [ error_selected_date, setError_selected_date ] = useState('');

	const [ employee_planning, setEmployee_planning ] = useState([]);

	useEffect(
		() => {
			if (props.p_unique_key != undefined) {
				APICALL.service(fetchPlannedTimings + props.p_unique_key, 'GET')
					.then((result) => {
						if (result.status == 200) {
							result.data[0].map((obj, key) => {
								obj.date.map((obj1, key1) => {
									result.data[0][key].date[key1] = new Date(obj1);
								});
								obj.timings.map((obj1, key1) => {
									obj1.time.map((obj2, key2) => {
										result.data[0][key].timings[key1].time[key2].starttimeObj = moment(
											obj2.starttime
										);
										result.data[0][key].timings[key1].time[key2].endtimeObj = moment(obj2.endtime);
									});
								});
								result.data[0][key].timings.sort((a, b) => {
									let da = new Date(a.pdate),
										db = new Date(b.pdate);
									return da - db;
								});
							});
							setChecked(result.data[1]);
							setEmployee_planning(cloneDeep(result.data[0]));
							if (result.data[1] == true) {
								setValue(result.data[0][0].date);
								setCommonDatetime(result.data[0][0].timings);
							}
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ props ]
	);

	/**
	 * Method to open and close collapsible section when user click on '+' or '-' icon
	 * @param {} id id of the collapsible element clicked
	 */
	const updateCollapse = (id) => {
		const newState = employee_planning.map((obj) => {
			if (obj.id === id) {
				return { ...obj, collapseOpen: !obj.collapseOpen };
			}
			return obj;
		});

		setEmployee_planning(newState);
	};
	/**
	 * 
	 * @param {*} value 
	 */
	let handleChange = (value) => {
		setError_selected_date('');
		var selected = [];
		value.map((val) => {
			selected.push(val.format('DD/MM/YYYY'));
		});
		setSelectedDate(selected);
	};

	// let handleChange2 = (value, key) => {
	// 	var res = [ ...employee_planning ];
	// 	if (res[key].timings.length > 0) {
	// 		res[key].error_selected_date = '';
	// 		value.map((obj, ky) => {
	// 			const isFound = res[key].timings.some((element) => {
	// 				if (element.date === obj.format()) {
	// 					return true;
	// 				}

	// 				return false;
	// 			});
	// 			if (!isFound) {
	// 				res[key].timings.push({
	// 					date: obj.format('DD/MM/YYYY'),
	// 					starttime: '',
	// 					endtime: '',
	// 					error_starttime: '',
	// 					error_endtime: '',
	// 					error: ''
	// 				});
	// 			} else {
	// 				// res[key].timings[ky].starttime = '';
	// 			}
	// 		});
	// 	} else {
	// 		res[key].error_selected_date = '';
	// 		res[key].timings.push({
	// 			date: value[0].format('DD/MM/YYYY'),
	// 			starttime: '',
	// 			endtime: '',
	// 			error_starttime: '',
	// 			error_endtime: '',
	// 			error: ''
	// 		});
	// 	}

	// 	setEmployee_planning(res);
	// };
	let calenderUpdate = (value, key) => {
		var dateObj = [];
		var temp = [];
		value.map((date1) => {
			dateObj.push(date1.format('YYYY-MM-DD'));
		});
		var res = [ ...employee_planning ];
		var commondate = [ ...commonDatetime ];

		if (checked) {
			if (commondate.length == 0) {
				commondate.push({
					pdate: value[0].format('YYYY-MM-DD'),
					time: [
						{
							starttime: '',
							endtime: '',
							error_starttime: '',
							error_endtime: '',
							error: ''
						}
					]
				});

				// commondate = _.sortBy( commondate, 'pdate' );
			} else {
				var commondate2 = commondate;
				commondate.map((data2, k2) => {
					if (dateObj.indexOf(data2.pdate) <= -1) {
						commondate2.splice(k2, 1);
					}
				});
				commondate = commondate2;
				value.map((date1) => {
					if (!dateExists(commondate, date1.format('YYYY-MM-DD'))) {
						commondate.push({
							pdate: date1.format('YYYY-MM-DD'),
							time: [
								{
									starttime: '',
									endtime: '',
									error_starttime: '',
									error_endtime: '',
									error: ''
								}
							]
						});
					}
				});
			}
			commondate.sort((a, b) => {
				let da = new Date(a.pdate),
					db = new Date(b.pdate);
				return da - db;
			});
			setCommonDatetime(commondate);
		} else {
			if (res[key].timings.length > 0) {
				res[key].removetimings = [];
				var res2 = res[key].timings;
				res[key].timings.map((val1, key1) => {
					if (dateObj.indexOf(val1.pdate) <= -1) {
						res2.splice(key1, 1);
					}
				});

				res[key].timings = res2;
				dateObj.map((value1) => {
					if (!dateExists(res[key].timings, value1)) {
						res[key].timings.push({
							pdate: value1,
							time: [
								{
									starttime: '',
									endtime: '',
									error_starttime: '',
									error_endtime: '',
									error: ''
								}
							]
						});
					}
				});
			} else {
				res[key].error_selected_date = '';
				res[key].timings.push({
					pdate: value[0].format('YYYY-MM-DD'),
					time: [
						{
							starttime: '',
							endtime: '',
							error_starttime: '',
							error_endtime: '',
							error: ''
						}
					]
				});
				setEmployee_planning(res);
			}
			res[key].timings.sort((a, b) => {
				let da = new Date(a.pdate),
					db = new Date(b.pdate);
				return da - db;
			});
			setEmployee_planning(res);
		}
	};

	let dateExists = (arr, data) => {
		return arr.some(function(el) {
			return el.pdate === data;
		});
	};

	let addServiceCoupe = (parent_index, index) => {
		const data = [ ...employee_planning ];
		const commondate = [ ...commonDatetime ];

		if (checked) {
			commondate[index].time.push({
				starttime: '',
				endtime: '',
				error_starttime: '',
				error_endtime: '',
				error: ''
			});
		} else {
			if (data[parent_index].timings[index].time.length == 1) {
				data[parent_index].timings[index].time.push({
					starttime: '',
					endtime: '',
					error_starttime: '',
					error_endtime: '',
					error: ''
				});
			}
		}
		setEmployee_planning(data);
	};

	let removeServiceCoupe = (parent_index, index, i) => {
		const data = [ ...employee_planning ];
		const commondate = [ ...commonDatetime ];
		if (checked) {
			if (commondate[index].time.length > 1) {
				commondate[index].time.splice(i, 1);
			}
		} else {
			if (data[parent_index].timings[index].time.length > 1) {
				data[parent_index].timings[index].time.splice(i, 1);
			}
		}
		setEmployee_planning(data);
	};

	let postdata = () => {
		var data1 = [];
		data1[0] = props.p_unique_key;
		data1[1] = checked;
		data1[2] = employee_planning;
		data1[3] = commonDatetime;
		APICALL.service(storePlannedTimings, 'POST', data1)
			.then((result) => {
				if (result.status === 200) {
					router.push('/planning/finalize/' + props.p_unique_key);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	/**
	 * Store data
	 * @param {*} e 
	 */
	let submitPlanningTimings = (e) => {
		e.preventDefault();
		var error = validateTimings();
		if (error == 0) {
			postdata();
		} else {
			window.scrollTo(0, 0);
		}
	};

	let validateTimings = () => {
		var count = 0;
		if (checked == true) {
			if (commonDatetime.length == 0) {
				count++;
				setError_selected_date('Select atleast one date.');
			} else {
				var datetime = [ ...commonDatetime ];
				commonDatetime.map((v1, k1) => {
					v1.time.map((v2, k2) => {
						if (v2.starttime == '') {
							count++;
							datetime[k1].time[k2].error_starttime = 'This field is required.';
						}
						if (v2.endtime == '') {
							count++;
							datetime[k1].time[k2].error_endtime = 'This field is required.';
						}
						if (v2.starttime != '' && v2.endtime != '' && v2.starttime == v2.endtime) {
							count++;
							datetime[k1].time[k2].error_starttime = 'Start time cannot be same as end time.';
						}
					});
				});
				setCommonDatetime(datetime);
			}
		} else {
			var res = [ ...employee_planning ];
			res.map((obj, ky) => {
				if (res[ky].timings.length == 0) {
					count++;
					res[ky].error_selected_date = 'Select atleast one date.';
					res[ky].collapseOpen = true;
				} else {
					res[ky].timings.map((o1, k1) => {
						o1.time.map((v2, k2) => {
							if (v2.starttime == '') {
								count++;
								res[ky].timings[k1].time[k2].error_starttime = 'This field is required.';
								res[ky].collapseOpen = true;
							}
							if (v2.endtime == '') {
								count++;
								res[ky].timings[k1].time[k2].error_endtime = 'This field is required.';
								res[ky].collapseOpen = true;
							}
							if (o1.pdate == moment(new Date()).format('YYYY-MM-DD')) {
								if (moment(v2.starttime) < moment(new Date())) {
									res[ky].timings[k1].time[k2].error = 'Employee cannot be planned for past time.';
									count++;
								}
							}

							if (v2.starttime != '' && v2.endtime != '' && v2.starttime == v2.endtime) {
								count++;
								res[ky].collapseOpen = true;
								res[ky].timings[k1].time[k2].error = 'Start time cannot be same as end time.';
							}
						});
					});
				}
			});
			setEmployee_planning(res);
		}
		return count;
	};

	let updatetime = (type, index, e, key, time_index) => {
		var res = [ ...employee_planning ];
		var common = [ ...commonDatetime ];
		if (checked == true) {
			if (type == 'starttime') {
				common[index].time[time_index].error = '';
				common[index].time[time_index].error_starttime = '';
				common[index].time[time_index].starttimeObj = moment(e.format('YYYY-MM-DD HH:mm:ss'));
				common[index].time[time_index].starttime = moment(e).format('YYYY-MM-DD HH:mm:ss');
				setCommonDatetime(common);
			} else {
				common[index].time[time_index].error = '';
				common[index].time[time_index].error_endtime = '';
				common[index].time[time_index].endtimeObj = moment(e.format('YYYY-MM-DD HH:mm:ss'));
				common[index].time[time_index].endtime = moment(e).format('YYYY-MM-DD HH:mm:ss');
				setCommonDatetime(common);
			}
		} else {
			if (e != null && res[key].timings.length > 0) {
				if (type == 'starttime') {
					res[key].timings[index].time[time_index].error = '';
					res[key].timings[index].time[time_index].error_starttime = '';
					res[key].timings[index].time[time_index].starttimeObj = moment(e.format('YYYY-MM-DD HH:mm:ss'));
					res[key].timings[index].time[time_index].starttime = moment(e).format('YYYY-MM-DD HH:mm:ss');

					setEmployee_planning(res);
				} else {
					res[key].timings[index].time[time_index].error = '';
					res[key].timings[index].time[time_index].error_endtime = '';
					res[key].timings[index].time[time_index].endtimeObj = moment(e.format('YYYY-MM-DD HH:mm:ss'));
					res[key].timings[index].time[time_index].endtime = moment(e).format('YYYY-MM-DD HH:mm:ss');

					setEmployee_planning(res);
				}
			}
		}
	};

	/**
	 * updateCheckbox 
	 * 
	 * 
	 */
	let updateCheckbox = () => {
		var res = [ ...employee_planning ];
		res.map((val, key) => {
			res[key].timings = [];
			res[key].date = [];
			res[key].error_selected_date = [];
		});
		setError_selected_date('');
		setEmployee_planning(res);
		setCommonDatetime([]);
		setValue([]);

		setChecked(!checked);
	};

	return (
		<div className="container-fluid px-0">
			<form onSubmit={(e) => submitPlanningTimings(e)}>
				<div className="row m-0 p-0">
					<h1 className="mt-3 mb-3 font-weight-bold   px-0  bitter-italic-normal-medium-24">Add timing</h1>
					{console.log(employee_planning)}
					{employee_planning.length > 1 && (
						<div className="form-check mt-2 ">
							<input
								className="form-check-input rounded-0 shadow-none "
								type="checkbox"
								style={{ marginTop: '0.35rem' }}
								checked={checked}
								id="flexCheckChecked"
								onChange={() => {
									updateCheckbox();
								}}
							/>
							<label className="form-check-label poppins-regular-18px" htmlFor="flexCheckChecked">
								Same timing for all employees
							</label>
						</div>
					)}
					{checked ? (
						<div>
							<div className=" mt-3">
								{employee_planning.map((result) => (
									<div
										key={result.id}
										className={`row d-flex justify-content-start py-3 my-3  ${style.sec_background}`}
									>
										<div className="col-md-1 poppins-light-20px">{++count1}.</div>
										<div className="col-md-3 poppins-light-20px">{result.employee_name}</div>
										<div className="col-md-4 poppins-light-20px">{result.employee_type_name}</div>
										<div className="col-md-3 poppins-light-20px">{result.function_name}</div>
									</div>
								))}
							</div>
							<div className="mt-2 row">
								<div className="col-md-12 p-0">
									<Calendar
										className="timepage-calander"
										value={value}
										multiple={true}
										format="DD/MM/YYYY"
										onChange={(date) => {
											handleChange(date);
											calenderUpdate(date);
										}}
										minDate={new Date()}
									/>
									<p className="error mt-2 ">{error_selected_date}</p>
								</div>
							</div>
							<div className="mt-3 pt-2">
								{commonDatetime.map((value, index) => (
									<div className="row table-title-bg my-2" key={index}>
										<div className="col-md-2 py-3  poppins-medium-22px-date-picker text-center">
											<div className="pb-2 poppins-medium-22px-date-picker" />
											{value.pdate.split('-').reverse().join('/')}
										</div>
										<div className=" col-md-10 py-3">
											{value.time.map((v1, k1) => (
												<div className="row">
													<div className="col-md-5 py-3">
														<div className="d-flex">
															<div className="py-1 px-2  custom_astrick poppins-regular-20px">
																Start time
															</div>
															<TimePicker
																placeholder="Select Time"
																use12Hours={false}
																showSecond={false}
																focusOnOpen={true}
																format="HH:mm"
																value={v1.starttimeObj ? v1.starttimeObj : null}
																onChange={(e) =>
																	updatetime('starttime', index, e, '', k1)}
															/>
														</div>
														<p className="error mt-2 px-2">{v1.error_starttime}</p>
													</div>
													<div className="col-md-5  py-3">
														<div className="d-flex">
															<div className="py-1 px-2  custom_astrick poppins-regular-20px">
																End time
															</div>
															<TimePicker
																placeholder="Select Time"
																use12Hours={false}
																showSecond={false}
																focusOnOpen={true}
																format="HH:mm"
																value={v1.endtimeObj ? v1.endtimeObj : null}
																onChange={(e) =>
																	updatetime('endtime', index, e, '', k1)}
															/>
														</div>
														<p className="error px-2 mt-2">{v1.error_endtime}</p>
													</div>
													<div className="col-md-2 py-3 d-flex align-items-center justify-content-left">
														{value.time.length == 1 && (
															<MdStarRate
																className="purple-color"
																onClick={() => addServiceCoupe(0, index)}
															/>
														)}
														{k1 > 0 && (
															<Image
																src={Close}
																width={15}
																height={15}
																onClick={() => removeServiceCoupe(0, index, k1)}
															/>
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div>
							<div className=" mt-3">
								<div className="">
									{employee_planning.map((result, key) => (
										<div key={result.id}>
											<div
												className={`row d-flex justify-content-start py-3 my-3 ${style.sec_background}`}
											>
												<div className="col-md-1 poppins-light-20px">
													{employee_planning.length > 1 && (
														<span>
															{result.collapseOpen == true ? (
																<FaRegMinusSquare
																	onClick={() => updateCollapse(result.id)}
																/>
															) : (
																<FaRegPlusSquare
																	onClick={() => updateCollapse(result.id)}
																/>
															)}
														</span>
													)}
												</div>
												<div className="col-md-3 poppins-light-20px">
													{result.employee_name}
												</div>
												<div className="col-md-4 poppins-light-20px">
													{result.employee_type_name}
												</div>
												<div className="col-md-3 poppins-light-20px">
													{result.function_name}
												</div>
											</div>
											{result.collapseOpen == true && (
												<div>
													<div className="mt-2 row">
														<div className="col-md-12 p-0">
															<Calendar
																className="timepage-calander"
																value={result.date}
																multiple={true}
																format="YYYY-MM-DD"
																onChange={(date) => {
																	calenderUpdate(date, key);
																}}
																minDate={new Date()}
															/>
															<p className="error mt-2">{result.error_selected_date}</p>
														</div>
													</div>
													{result.timings.length > 0 &&
														result.timings.map((value, index) => (
															<div className="row table-title-bg my-2" key={index}>
																<div className="col-md-2 py-3 poppins-medium-22px-date-picker text-center">
																	<div className="pb-2 poppins-medium-22px-date-picker" />
																	{value.pdate.split('-').reverse().join('/')}
																</div>
																<div className="col-md-10">
																	{value.time.map((v1, k1) => (
																		<div>
																			<div className="row">
																				<div className="col-md-5 py-3 d-flex align-items-center">
																					<div className="d-flex">
																						<div className="py-1 px-2  custom_astrick poppins-regular-20px">
																							<span className="poppins-medium-18px">
																								Start time
																							</span>
																						</div>
																						<div>
																							<TimePicker
																								placeholder="Select Time"
																								use12Hours={false}
																								showSecond={false}
																								focusOnOpen={true}
																								format="HH:mm"
																								value={
																									v1.starttimeObj ? (
																										v1.starttimeObj
																									) : null
																								}
																								onChange={(e) =>
																									updatetime(
																										'starttime',
																										index,
																										e,
																										key,
																										k1
																									)}
																							/>

																							<p className="error mt-2 px-2">
																								{v1.error_starttime}
																							</p>
																						</div>
																					</div>
																				</div>
																				<div className="col-md-5 py-3 d-flex align-items-center">
																					<div className="d-flex">
																						<div className="py-1 px-2 custom_astrick poppins-regular-18px">
																							<span className="poppins-medium-18px">
																								End time
																							</span>
																						</div>
																						<div>
																							<TimePicker
																								placeholder="Select Time"
																								use12Hours={false}
																								showSecond={false}
																								focusOnOpen={true}
																								format="HH:mm"
																								value={
																									v1.endtimeObj ? (
																										v1.endtimeObj
																									) : null
																								}
																								onChange={(e) =>
																									updatetime(
																										'endtime',
																										index,
																										e,
																										key,
																										k1
																									)}
																								clearIcon={clearIcon1}
																							/>

																							<p className="error mt-2 px-2">
																								{v1.error_endtime}
																							</p>
																						</div>
																					</div>
																				</div>
																				<div className="col-md-2 py-3 d-flex align-items-center justify-content-left">
																					{value.time.length == 1 && (
																						<MdStarRate
																							className="purple-color"
																							onClick={() =>
																								addServiceCoupe(
																									key,
																									index
																								)}
																						/>
																					)}
																					{k1 > 0 && (
																						<Image
																							src={Close}
																							width={15}
																							height={15}
																							onClick={() =>
																								removeServiceCoupe(
																									key,
																									index,
																									k1
																								)}
																						/>
																					)}
																				</div>
																			</div>
																			<p className="error mb-2">{v1.error}</p>
																		</div>
																	))}
																</div>
															</div>
														))}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="col-md-12 mt-4  mb-4">
					<div className="d-inline">
						<button type="button" className="btn btn-link text-dark btn-block ">
							<Link href={'/planning/functions/' + props.p_unique_key}>
								<p className="bg-white border-0 poppins-light-19px text-decoration-underline">BACK</p>
							</Link>
						</button>
					</div>
					<div className="float-end">
						<button
							type="submit"
							className="btn rounded-0 px-3  btn-block float-end poppins-light-19px-next-button"
						>
							NEXT
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Addtiming;
