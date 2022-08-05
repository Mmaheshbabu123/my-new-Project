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
import { MdStarRate } from 'react-icons/md';
import moment from "moment";


function Addtiming(props) {
	const count = 0;
	const router = useRouter();
	const [ value, setValue ] = useState([]);
	const [ selectedDate, setSelectedDate ] = useState([]);
	const [ commonDatetime, setCommonDatetime ] = useState([]);

	const [ checked, setChecked ] = useState(false);
	const [ time, setTime ] = useState('');
	const [ error_start_time, setError_start_time ] = useState('');
	const [ error_end_time, setError_end_time ] = useState('');

	const [ error_selected_date, setError_selected_date ] = useState('');

	const [ employee_planning, setEmployee_planning ] = useState([]);

	useEffect(
		() => {
			if (props.p_unique_key != undefined) {
				APICALL.service(fetchPlannedTimings + props.p_unique_key, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result.data);
							setEmployee_planning(result.data);
							result.data.map((obj, key) => {
								obj.date.map((obj1, key1) => {
									result.data[key].date[key1] = new Date(obj1);
									console.log(obj1);
								});
							});
						}
						console.log(result);
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
		console.log(value);
		var dateobj = {
			date: '',
			starttime: '',
			endtime: ''
		};
		setError_selected_date('');
		var selected = [];
		value.map((val) => {
			selected.push(val.format('DD/MM/YYYY'));
		});
		setSelectedDate(selected);
	};

	let handleChange2 = (value, key) => {
		var res = [ ...employee_planning ];
		if (res[key].timings.length > 0) {
			res[key].error_selected_date = '';
			value.map((obj, ky) => {
				const isFound = res[key].timings.some((element) => {
					if (element.date === obj.format()) {
						return true;
					}

					return false;
				});
				if (!isFound) {
					res[key].timings.push({
						date: obj.format('DD/MM/YYYY'),
						starttime: '',
						endtime: '',
						error_starttime: '',
						error_endtime: ''
					});
				} else {
					// res[key].timings[ky].starttime = '';
				}
			});
		} else {
			res[key].error_selected_date = '';
			res[key].timings.push({
				date: value[0].format('DD/MM/YYYY'),
				starttime: '',
				endtime: '',
				error_starttime: '',
				error_endtime: ''
			});
		}

		setEmployee_planning(res);
	};

	let postdata = () => {
		APICALL.service(storePlannedTimings, 'POST', employee_planning)
			.then((result) => {
				console.log(result);
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
		}
	};

	let validateTimings = () => {
		var count = 0;
		if (checked == true) {
			if (selectedDate.length == 0) {
				count++;
				setError_selected_date('Select atleast one date.');
			} else {
				console.log(selectedDate);
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
						if (o1.starttime == '') {
							count++;
							res[ky].timings[k1].error_starttime = 'This field is required.';
						}
						if (o1.endtime == '') {
							count++;
							res[ky].timings[k1].error_endtime = 'This field is required.';
						}
					});
				}
			});
			setEmployee_planning(res);
		}
		return count;
	};

	let updatetime = (type, index, e, key) => {
		alert(moment(e).format("HH:mm"));
		var res = [ ...employee_planning ];
		console.log(res);
		if(checked == true){

		}else{

		
		if (e != null && res[key].timings.length > 0) {
			if (type == 'starttime') {
				res[key].timings[index].error_starttime = '';
				res[key].timings[index].starttime = moment(e).format('HH:mm');
				setEmployee_planning(res);
			} else {
				res[key].timings[index].error_endtime = '';
				res[key].timings[index].endtime = moment(e).format('HH:mm');
				setEmployee_planning(res);
			}
		}
	}
	};

	return (
		<div className="container-fluid">
			<form onSubmit={(e) => submitPlanningTimings(e)}>
				<div className="row m-0 p-0">
					<h1 className="mt-3 mb-3 font-weight-bold   px-0  bitter-italic-normal-medium-24">Add timing</h1>
					{employee_planning.length > 1 && (
						<div className="form-check mt-2 ">
							<input
								className="form-check-input "
								type="checkbox"
								checked={checked}
								id="flexCheckChecked"
								onChange={() => {
									setChecked(!checked);
								}}
							/>
							<label className="form-check-label poppins-regular-18px pt-1 " htmlFor="flexCheckChecked ">
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
										<div className="col-md-1  poppins-regular-18px">{++count}.</div>
										<div className="col-md-3  poppins-regular-18px">{result.employee_name}</div>
										<div className="col-md-4  poppins-regular-18px">{result.employee_type_name}</div>
										<div className="col-md-3  poppins-regular-18px">{result.function_name}</div>
									</div>
								))}
							</div>
							<div className="mt-2 row">
								
								<div className="col-md-12 p-0">
									<Calendar
									 className='timepage-calander'
										value={value}
										multiple={true}
										format="DD/MM/YYYY"
										onChange={(date) => {
											handleChange(date);
										}}
										minDate={new Date()}
									/>
									<p className="error mt-2">{error_selected_date}</p>
								</div>
							</div>
							<div className="mt-3 pt-2">
								{selectedDate.map((value, index) => (
									<div className="row table-title-bg" key={index}>
										
										<div className="col-md-2 py-3 color-skyblue2">
											<div className="pb-2 color-skyblue2" />
											{value}
										</div>
										<div className="col-md-4 d-flex py-3">
											<div className="py-1 px-2  custom_astrick poppins-regular-20px">Start time</div>
											<TimePicker
												placeholder="Select Time"
												use12Hours={false}
												showSecond={false}
												focusOnOpen={true}
												format="hh:mm"
												onChange={(e) => updatetime('starttime', index, e, '')}
											/>
											<p className="error mt-2">{error_start_time}</p>
										</div>
										<div className="col-md-4 d-flex py-3">
											<div className="py-1 px-2  custom_astrick poppins-regular-20px">End time</div>
											<TimePicker
												placeholder="Select Time"
												use12Hours={false}
												showSecond={false}
												focusOnOpen={true}
												format="hh:mm"
												onChange={(e) => setTime(e.format('hh:mm'))}
											/>
											<p className="error mt-2">{error_end_time}</p>
										</div>
										<div className="col-md-2 py-3">
											<MdStarRate className='purple-color' />
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
												<div className="col-md-1 poppins-regular-18px">
												{employee_planning.length > 1 && <span>
													{result.collapseOpen == true ? (
														<FaRegMinusSquare onClick={() => updateCollapse(result.id)} />
													) : (
														<FaRegPlusSquare onClick={() => updateCollapse(result.id)} />
													)}
													</span>
}
												</div>
												<div className="col-md-3 poppins-regular-18px">{result.employee_name}</div>
												<div className="col-md-4 poppins-regular-18px">{result.employee_type_name}</div>
												<div className="col-md-3 poppins-regular-18px">{result.function_name}</div>
											</div>
											{result.collapseOpen == true && (
												<div>
													<div className="mt-2 row">
														
														
														<div className="col-md-12 p-0">
															<Calendar
															    className='timepage-calander '
																value={result.date}
																multiple={true}
																format="DD/MM/YYYY"
																onChange={(date) => {
																	handleChange2(date, key);
																}}
																minDate={new Date()}
															/>
															<p className="error mt-2">{result.error_selected_date}</p>
														</div>
													</div>
													{result.timings.length > 0 &&
														result.timings.map((value, index) => (
															<div className="row table-title-bg my-2" key={index}>
															
																<div className="col-md-2 py-3 color-skyblue2">
																	<div className="pb-2 color-skyblue2" />
																	{value.date}
																</div>
																<div className="col-md-4 py-3 ">
																	<div className='d-flex'>
																	<div className="py-1 px-2  custom_astrick poppins-regular-20px">
																		<span className='poppins-regular-16px'>Start time</span>
																	</div>
																	<TimePicker
																		placeholder="Select Time"
																		use12Hours={false}
																		showSecond={false}
																		focusOnOpen={true}
																		format="HH:mm"
																		onChange={(e) =>
																			updatetime('starttime', index, e, key)}
																	/>
																	</div>
																	<p className="error mt-2 px-2">
																		{value.error_starttime}
																	</p>
																</div>
																<div className="col-md-4 py-3">
																<div className='d-flex'>
																	<div className="py-1 px-2 custom_astrick poppins-regular-18px">
																	<span className='poppins-regular-16px'>End time</span></div>
																	<TimePicker
																		placeholder="Select Time"
																		use12Hours={false}
																		showSecond={false}
																		focusOnOpen={true}
																		format="HH:mm"
																		onChange={(e) =>
																			updatetime('endtime', index, e, key)}
																	/>
																	</div>
																	<p className="error mt-2 px-2">{value.error_endtime}</p>
																</div>
																<div className="col-md-2 py-3 d-flex align-items-center justify-content-center">
																	<MdStarRate  className='purple-color'/>
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
							<Link href={'/planning/functions/' + router.query.p_unique_key}>
								<p className='bg-white  back-btn-textbg-white  back-btn-text  border-0 poppins-regular-20px '>BACK</p>
							</Link>
						</button>
					</div>
					<div className="float-end ">
						<button type="submit" className="btn rounded-0  custom-btn px-3  btn-block float-end ">
							NEXT
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Addtiming;
