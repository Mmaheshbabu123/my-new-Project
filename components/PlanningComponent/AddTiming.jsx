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

function Addtiming(props) {
	const count = 0;
	const router = useRouter();
	const [ value, setValue ] = useState(new Date("2022/07/25"));
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
							setEmployee_planning(result.data);
							result.data.map((obj,key)=>{
								obj.date.map((obj1,key1)=>{
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
	const updateState = (id) => {
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
					res[key].timings[ky].starttime = '';
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
					router.push('/planning/finalize/'+props.p_unique_key)
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
		var res = [ ...employee_planning ];
		console.log(res[key]);

		if (e != null && res[key].timings.length > 0) {
			if (type == 'starttime') {
				res[key].timings[index].error_starttime = '';
				res[key].timings[index].starttime = e.format('LT');
				setEmployee_planning(res);
			} else {
				res[key].timings[index].error_endtime = '';
				res[key].timings[index].endtime = e.format('LT');
				setEmployee_planning(res);
			}
		}
		console.log(employee_planning);
	};

	return (
		<div className="container">
			<form onSubmit={(e) => submitPlanningTimings(e)}>
				<div className="row">
					<p className="my-4 h4">Add timing</p>
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
						<label className="form-check-label " htmlFor="flexCheckChecked">
							Same timing for all employees
						</label>
					</div>
					{checked ? (
						<div>
							<div className=" mt-3">
								{employee_planning.map((result) => (
									<div
										key={result.id}
										className={`row d-flex justify-content-start py-3 my-3 ${style.sec_background}`}
									>
										<div className="col-md-1 h5">{++count}.</div>
										<div className="col-md-3 h6">{result.employee_name}</div>
										<div className="col-md-4 h6">
											{result.employee_type_name}
											</div>
										<div className="col-md-3 h6">
											{result.function_name}
											</div>
									</div>
								))}
							</div>
							<div className="mt-2 row">
								<div className="col-md-1" />
								<div className="col-md-11">
									<Calendar
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
									<div className="row" key={index}>
										<div className="col-md-1" />
										<div className="col-md-3 py-3">
											<div className="pb-2" />
											{value}
										</div>
										<div className="col-md-2 py-3">
											<div className="pb-2 custom_astrick">Start time</div>
											<TimePicker
												placeholder="Select Time"
												use12Hours
												showSecond={false}
												focusOnOpen={true}
												format="hh:mm A"
												onChange={(e) => updatetime('starttime', index, e, '')}
											/>
											<p className="error mt-2">{error_start_time}</p>
										</div>
										<div className="col-md-2 py-3">
											<div className="pb-2 custom_astrick">End time</div>
											<TimePicker
												placeholder="Select Time"
												use12Hours
												showSecond={false}
												focusOnOpen={true}
												format="hh:mm A"
												onChange={(e) => setTime(e.format('LT'))}
											/>
											<p className="error mt-2">{error_end_time}</p>
										</div>
										<div className="col-md-2 py-3">
											<MdStarRate />
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
												<div className="col-md-1 h5">
													{result.collapseOpen == true ? (
														<FaRegMinusSquare onClick={() => updateState(result.id)} />
													) : (
														<FaRegPlusSquare onClick={() => updateState(result.id)} />
													)}
												</div>
												<div className="col-md-3 h6">{result.employee_name}</div>
												<div className="col-md-4 h6">{result.employee_type_name}</div>
												<div className="col-md-3 h6">{result.function_name}</div>
											</div>
											{result.collapseOpen == true && (
												<div>
													<div className="mt-2 row">
														<div className="col-md-1" />
														<div className="col-md-11">
															<Calendar
																value={result.date}
																multiple={true}
																format="DD/MM/YYYY"
																onChange={(date) => {
																	handleChange2(date, key);
																}}
																// minDate={new Date()}
															/>
															<p className="error mt-2">{result.error_selected_date}</p>
														</div>
													</div>
													{result.timings.length>0 && result.timings.map((value, index) => (
														<div className="row" key={index}>
															<div className="col-md-1" />
															<div className="col-md-3 py-3">
																<div className="pb-2" />
																{value.date}
															</div>
															<div className="col-md-2 py-3">
																<div className="pb-2 custom_astrick">Start time</div>
																<TimePicker
																	placeholder="Select Time"
																	use12Hours={true}
																	showSecond={false}
																	focusOnOpen={true}
																	format="hh:mm A"
																	onChange={(e) =>
																		updatetime('starttime', index, e, key)}
																/>
																<p className="error mt-2">{value.error_starttime}</p>
															</div>
															<div className="col-md-2 py-3">
																<div className="pb-2 custom_astrick">End time</div>
																<TimePicker
																	placeholder="Select Time"
																	use12Hours={true}
																	showSecond={false}
																	focusOnOpen={true}
																	format="hh:mm A"
																	onChange={(e) =>
																		updatetime('endtime', index, e, key)}
																/>
																<p className="error mt-2">{value.error_endtime}</p>
															</div>
															<div className="col-md-2 py-3">
																<MdStarRate />
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

				<div className="col-md-12 mt-4 ">
					<div className="d-inline">
						<button type="button" className="btn btn-link text-dark btn-block ">
							<Link href={'/planning/functions/' + router.query.p_unique_key}>
								<p>Back</p>
							</Link>
						</button>
					</div>
					<div className="float-end ">
						<button type="submit" className="btn btn-secondary   btn-block ">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Addtiming;
