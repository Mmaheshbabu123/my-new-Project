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
	const [ value, setValue ] = useState();
	const [ selectedDate, setSelectedDate ] = useState([]);
	const [ commonDatetime, setCommonDatetime ] = useState([]);

	const [ checked, setChecked ] = useState(false);
	const [ time, setTime ] = useState('');
	const [ error_start_time, setError_start_time ] = useState('');
	const [ error_selected_date, setError_selected_date ] = useState('');

	const [employee_planning,setEmployee_planning] = useState([]);
	const [ employees, setEmployees ] = useState([
		{
			id: 1,
			name: 'Steve Jobs',
			employeetype: 'Flexworker',
			function: 'Productie',
			collapseOpen: true,
			error: ''
		},
		{
			id: 2,
			name: 'Smith Jones',
			employeetype: 'Normal employee',
			function: 'Productie',
			collapseOpen: false,
			error: ''
		},
		{
			id: 3,
			name: 'Mark Henry',
			employeetype: 'Freelancer',
			function: 'Productie',
			collapseOpen: false,
			error: ''
		}
	]);

	useEffect(
		() => {
			if(props.p_unique_key != undefined){
				APICALL.service(fetchPlannedTimings + props.p_unique_key, 'GET')
					.then((result) => {
						if(result.status == 200){
							setEmployee_planning(result.data);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
				}
		},
		[props]
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
			data: '',
			starttime: '',
			endtime: ''
		};
		setError_selected_date('');
		var selected = [];
		value.map((val) => {
			selected.push(val.format());
		});
		setSelectedDate(selected);

	};

	let handleChange2 = (value,key) => {
		var res = [...employee_planning];
		if(res[key].timings.length > 0){
		res[key].error_selected_date = '';
		res[key].timings.map((obj,ky) => {
			console.log(obj);
		});
	}else{
		// var dateobj = {
		// 			data: data,
		// 			starttime: '',
		// 			endtime: ''
		// 		};
		res[key].error_selected_date = '';
			res[key].timings.push({
			data: value[0].format(),
			starttime: '',
			endtime: '',
			error_starttime: '',
			error_endtime: '',

		});
		alert("test")
		console.log(res)
	}

		setEmployee_planning(res);
	// 	var timings = [];
	// 	alert(key);
	// 	
	// 	console.log(employee_planning[key]);
	// 	if(employee_planning[key].timings.length == 0){
	// 		timings.push(dateobj)
	// 	}else{
	// 	employee_planning[key].timings.map((k,val)=>{
	// 		alert(k)
	// 	})
	// }
	// console.log()

	};

	let postdata = (data1) => {
		APICALL.service(storePlannedTimings, 'POST', data1)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {

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
		if(error == 0){
			postdata();
		}
	};

	let validateTimings = () => {
		var count = 0;
		if (checked == true) {
			if (selectedDate.length == 0) {
				count++;
				setError_selected_date('Select atleast one date.');
			}else{
				console.log(selectedDate);
			}
		}else{
			var res = [...employee_planning];
				res.map((obj,ky) => {
					if (res[ky].timings.length == 0) {
						count++;
						res[ky].error_selected_date = "Select atleast one date.";
						res[ky].collapseOpen = true;

					}else{
					res[ky].timings.map((o1,k1)=>{
						if(o1.starttime ==''){
							count++;
							res[ky].timings[k1].error_starttime = "This field is required.";

						}
						if(o1.endtime ==''){
							count++;
							res[ky].timings[k1].error_endtime = "This field is required.";

						}
					})
				}
				})
				setEmployee_planning(res);
		}
		return count;
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
										<div className="col-md-3 h6">{result.emp_type}</div>
										<div className="col-md-3 h6">{result.function_id}</div>
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
												onChange={(e) => setTime(e.format('LT'))}
											/>
											<p className="error mt-2">{error_start_time}</p>
										</div>
										<div className="col-md-2 py-3">
											<div className="pb-2">End time</div>
											<TimePicker
												placeholder="Select Time"
												use12Hours
												showSecond={false}
												focusOnOpen={true}
												format="hh:mm A"
												onChange={(e) => setTime(e.format('LT'))}
											/>
											<p className="error mt-2">This field is required.</p>
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
									{employee_planning.map((result,key) => (
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
												<div className="col-md-3 h6">{result.emp_type}</div>
												<div className="col-md-3 h6">{result.function_id}</div>
											</div>
											{result.collapseOpen == true && (
												<div>
													<div className="mt-2 row">
														<div className="col-md-1" />
														<div className="col-md-11">
															<Calendar
																value={value}
																multiple={true}
																format="YYYY/MM/DD"
																onChange={(date) => {
																	handleChange2(date,key);
																}}
																minDate={new Date()}
															/>
															<p className="error mt-2">{result.error_selected_date}</p>
														</div>
													</div>
													{result.timings.map((value, index) => (
														<div className="row" key={index}>
															<div className="col-md-1" />
															<div className="col-md-3 py-3">
																<div className="pb-2" />
																{value.data}
															</div>
															<div className="col-md-2 py-3">
																<div className="pb-2">Start time</div>
																<TimePicker
																	placeholder="Select Time"
																	use12Hours
																	showSecond={false}
																	focusOnOpen={true}
																	format="hh:mm A"
																	onChange={(e) => setTime(e.format('LT'))}
																/>
																<p className="error mt-2">{value.error_starttime}</p>
															</div>
															<div className="col-md-2 py-3">
																<div className="pb-2">End time</div>
																<TimePicker
																	placeholder="Select Time"
																	use12Hours
																	showSecond={false}
																	focusOnOpen={true}
																	format="hh:mm A"
																	onChange={(e) => setTime(e.format('LT'))}
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
