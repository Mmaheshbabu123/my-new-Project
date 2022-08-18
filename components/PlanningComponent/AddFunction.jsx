import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee, updateSalaryBenefits } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import MultiSelectField from '@/atoms/MultiSelectField';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import { FaRegPlusSquare, FaRegMinusSquare, FaEuroSign } from 'react-icons/fa';

import { CodeSlash, ExclamationTriangle } from 'node_modules/react-bootstrap-icons/dist/index';

const AddFunction = () => {
	const router = useRouter();
	const salaryref = useRef(null);
	const [ ischecked, setIsChecked ] = useState(false);
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	//employee id,employee type id
	const [ functionselected, setFunctionSelected ] = useState();
	const [ fulllist, setFulllist ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ employeeobject, setEmployeeObject ] = useState([]);
	const [ storeddata, setStoredData ] = useState([]);
	const [ errcount, seterrcount ] = useState(0);
	const [ dradio, setdradio ] = useState(true);
	const [ recentfuncitons, setrecentfunctions ] = useState();
	const [ salChanged, setSalChanged ] = useState(false);
	var hidefiled = '';
	var selectnchecked = false;
	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
				.then(async (result) => {
					var data = result.data;
					var checkbox = data[0];
					var actualdata = result.data[1];
					var functionsdata = result.data[2];
					var employeetypes = result.data[3];

					if (employeetypes.length != 0) {
						setEmptypes(employeetypes);
					}

					if (functionsdata.length != 0) {
						setFunctions(functionsdata);
						getOptions(functionsdata);
						if (checkbox) {
							defaultCheck(true);
						}
					}

					if (actualdata.length != 0 && employeeobject.length == 0) {
						setEmployeeObject(actualdata);
						//createAllObjects(actualdata);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	//set default checked
	function defaultCheck(value) {
		setIsChecked(value);
	}

	function checkbox() {
		setIsChecked(!ischecked);
		emptyemployeeData();
	}

	function validateErrors() {
		let count = 0;
		const newstate = employeeobject.map((value, key) => {
			let func = '';
			let sal = '';
			let emp = '';

			if (value.emp_type == '' || value.emp_type == null) {
				emp = 'This field is required.';
				count++;
			}

			if (value.funid == '' || value.funid == null || value.funid == 'drop') {
				func = 'This field is required.';
				count++;
			} else {
				func = '';
				if (value.salary == '' || value.salary == null || value.salary == undefined) {
					if(count==0){
					value.salary = value.function_salary;
					}
				} else {
					sal =
						emp == '' && value.salary != '' && value.salary != null && value.salary != undefined
							? ValidationService.minSalaryValidationMethod(value.salary.toString())
							: '';
					if (sal != '') {
						count++;
					}
					let rsalary = String(value.salary).replace(',', '.');
					let rfsalary = String(value.function_salary).replace(',', '.');
					if (sal == '' && parseFloat(rsalary) < parseFloat(rfsalary)) {
						sal = 'The new salary cannot be lesser than the minimum salary. The minimum salary for the selected function is '+value.function_salary+' Euro';
						count++;
					}
				}
			}

			var collapseOpen = true;
			if (func != '' && func != null && func != undefined) {
				collapseOpen = true;
			} else {
				// if(key != 0){
				// collapseOpen = true;
				// }else{
				// 	collapseOpen = false;
				// }
			}
			if (func == '' && emp == '' && sal == '') {
				if (key == 0) {
					collapseOpen = true;
				} else {
					collapseOpen = false;
				}
			}
			return {
				...value,
				functioniderror: func,
				employeeiderror: emp,
				salaryerror: sal,
				collapseOpen: collapseOpen
			};
		});
		setEmployeeObject(newstate);
		return count;
	}

	const submit = (e) => {
		e.preventDefault();
		var p_unique_key = router.query.p_unique_key;

		let errors = validateErrors();

		if (errors != 0) {
			console.log('errors are there');
		} else {
			if (errcount == 0) {
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/storeFunctionEmptypeSalary/' + p_unique_key,
					'POST',
					[ employeeobject, ischecked ]
				)
					.then((res) => {
						router.push('/planning/timings/' + router.query.p_unique_key);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		}
	};

	// 	function updatingObjectTypeid(empid, emptype) {
	// 		console.log(emptype);
	// 		var objects = [ ...employeeobject ];

	// 		if (objects != undefined) {
	// 			const newState = objects.map((element) => {
	// 				if (element.emp_id == empid) {
	// 					return { ...element, employeetypeid: emptype };
	// 				}
	// 				return element;
	// 			});
	// 			setEmployeeObject(newState);
	// 		}
	// 		console.log(employeeobject);
	// 	}

	async function updatingObjectradiobutton(index = null, status) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].radioactive = status;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].radioactive = status;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectfunctionSlary(index = null, salary) {
		var object = [ ...employeeobject ];
		if (index != null) {
			object[index].function_salary = salary;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].function_salary = salary != null ? salary : salary;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectSlary(index = null, salary) {
		var object = [ ...employeeobject ];
		if (index != null) {
			object[index].salary = salary;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].salary = salary != null ? salary : salary;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectFunction(index = null, funcid) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].funid = funcid;
			object[index].salary = null;
			object[index].warning = '';
			object[index].salaryerror = '';
			funcid == 'drop' ? (object[index].function_salary = null) : '';
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].funid = index != null ? Number(funcid) : funcid;
				object[key].salary = null;
				object[key].warning = '';
				object[key].salaryerror = '';
				funcid == 'drop' ? (object[key].function_salary = null) : '';
			});
			setEmployeeObject(object);
		}
	}

	function setsaalary(index, e) {
		var object = [ ...employeeobject ];
		let value = e.target.value;
		if (value != '') {
			let rsalary = String(value).replace(',', '.');
			let rfsalary = String(object[index].function_salary).replace(',', '.');
			let err=ValidationService.minSalaryValidationMethod(value.toString());
			if(err==''){
				if (parseFloat(rsalary) > parseFloat(rfsalary)) {
					object[index].warning =
					'We notice that you have added a salary which is higher than the minimum salary and therefore this new salary will be considered as the minimum salary for all the future planning for this employee. You can click on next to proceed further.';
					object[index].salaryerror ='';
				} else {
					object[index].warning = '';
					}
				}else{
					object[index].warning = '';
				}
			updatingObjectSlary(index, value);
		} else {
			updatingObjectSlary(index, value);
		}
	}

	let updateRes = (event, key) => {
		//setFuncChanged(true);
		var res1 = [ ...functions ];
		res1.map((val, k) => {
			if (k == key) {
				res1[k]['funct_checked'] = parseInt(event.target.value);
			} else {
				res1[k]['funct_checked'] = '';
			}
			setFunctions(res1);
		});
	};

	function verifyfunctionid(val) {
		let v = 0;
		functions.slice(4, functions.length).map((key, value) => {
			if (key['id'] == val) {
				v++;
			}
		});
		if (v > 0) {
			return true;
		} else {
			return false;
		}
	}

	const getOptions = (res) => {
		var options = [];
		if (res !== null) {
			res.map((value, key) => {
				if (value != undefined) {
					var opt = {
						value: '',
						label: ''
					};
					opt.value = value.id;
					opt.label = value.name;
					opt.salary = value.salary;

					options[key] = opt;
				}
			});
		}
		return options;
	};

	const employeTypeSelection = (val) => {
		var op = [];
		console.log(val);
		emptypes.forEach((element) => {
			if (val != null) {
				if (element['value'] == val) {
					op = element;
				}
			} else {
			}
		});
		if (val != null) {
			// setSelectedOption(op);
			return op;
		} else {
			return null;
		}
	};

	// 	const dropfunctionupdate = (val) => {
	// 		var op = '';
	// 		fulllist.forEach((element) => {
	// 			if (element['value'] == val) {
	// 				op = element;
	// 			}
	// 		});

	// var objects = [...storeddata];
	// if (objects != undefined) {
	// 	objects.map((element,key) => {
	// 			if (element.function_id == val) {
	// 				objects[key].radioactive=true;
	// 			}
	// 	});
	// 	setStoredData(objects);
	// }
	// 		return op;
	// 	};

	let emptyemployeeData = () => {
		var object = [ ...employeeobject ];
		console.log(object);
		if (object != undefined) {
			object.map((element, key) => {
				object[key].emp_type = null;
				//object[key].employeetypeid = 0;
				object[key].funid = null;
				object[key].salary = null;
				object[key].function_salary = null;
				object[key].employeeiderror = '';
				object[key].functioniderror = '';
				object[key].salaryerror = '';
				object[key].radioactive = false;
				// updateEmployeeType(key,0)
			});
			if (object.length != 0) {
				console.log(object);
				setEmployeeObject(object);
				setSelectedOption({ value: 0, label: '-Select-' });
				// setSelectedOption([]);
			}
		}
	};

	let updateSalary = (index = null, salary) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].function_salary = parseFloat(salary);
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, function_salary: parseFloat(salary) };
			});
			setEmployeeObject(newState);
		}
	};

	let updateEmployeeType = (index = null, val) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].emp_type = val;
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, emp_type: val, emp_type: val };
			});
			setEmployeeObject(newState);
		}
	};

	let updateCollapseState = (index = null, val) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].collapseOpen = !val;
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, emp_type: val };
			});
			setEmployeeObject(newState);
		}
	};

	function updatingCommonObjectfunctionSlary(funcid, salary) {
		var object = [ ...employeeobject ];
		object.map((element, key) => {
			var temp = '';
			object[key].functionslist.map((element1) => {
				element1.max != undefined ? (element1.id == funcid ? (temp = element1.max) : '') : '';
			});
			object[key].function_salary = temp != '' ? temp : salary;
		});
		setEmployeeObject(object);
	}

	function isThere(index = 0, functionid) {
		var object = [ ...employeeobject ];
		var temp = false;
		if (functionid == 'drop') {
			return true;
		}
		object[index].functionslist.slice(3, object[index].functionslist.length).map((element) => {
			element.id == functionid ? (temp = true) : '';
		});
		return temp;
	}

	function defultFunction(index = null, funcid) {
		var object = [ ...employeeobject ];
		var options = [];
		var opt = {
			value: '',
			label: ''
		};
		object[index].functionslist.slice(3, object[index].functionslist.length).map((value) => {
			if (value.id == funcid) {
				opt.value = value.id;
				opt.label = value.name;
				opt.salary = value.salary;
			}
		});
		options[index] = opt;

		return options;
	}

	return (
		<div className="col-md-12" style={{}}>
			<form onSubmit={(e) => submit(e)}>
				<div />
				{/* <div className="row m-0"> */}
				<div className="col-md-12 p-0 position-sticky-pc py-4">
					<p className="pb-3 font-weight-bold px-0 bitter-italic-normal-medium-24">Add function</p>
				</div>
				<div className="min-hei-addfun">
					{employeeobject.length > 1 && (
						<div className="form-check px-0 my-3 align-items-center d-flex">
							<input
								className="input-h-w"
								type="checkbox"
								checked={ischecked}
								onChange={() => {
									checkbox();
								}}
							/>
							<label className="form-check-label p-1 " htmlFor="flexCheckChecked">
								Same functions for all employees
							</label>
						</div>
					)}
					{/* </div> */}
					<div className="row ">
						<ol type="1">
							{employeeobject != undefined &&
								employeeobject.map((key, value) => (
									<div key={value}>
										<div key={key} className="row bg-4C4D550F mb-2 p-3">
											<div className="col-md-1 d-flex align-items-center justify-content-start poppins-regular-16px">
												{ischecked ? (
													value + 1
												) : key['collapseOpen'] == false ? (
													<FaRegPlusSquare
														onClick={() => updateCollapseState(value, key['collapseOpen'])}
													/>
												) : (
													<FaRegMinusSquare
														onClick={() => updateCollapseState(value, key['collapseOpen'])}
													/>
												)}
											</div>
											<div className="col-md-4 p-1 d-flex align-items-center poppins-regular-16px justify-content-start">
												{key['employeename']}
											</div>
											<div className="col-md-3  border-0  align-items-center pt-1 justify-content-start custom-drop-btn">
												{emptypes != null ? (
													<MultiSelectField
														id={'select_id'}
														options={emptypes}
														standards={
															key['emp_type'] == 0 ? (
																''
															) : (
																employeTypeSelection(key['emp_type'])
															)
														}
														disabled={false}
														handleChange={(obj) => updateEmployeeType(value, obj.value)}
														isMulti={false}
														className="col-md-6"
													/>
												) : (
													''
												)}{' '}
												{
													<div style={{ color: 'red', paddingTop: '5px' }}>
														{key['employeeiderror']}
													</div>
												}
											</div>
											<div className="col-md-2 border-0 d-flex align-items-center justify-content-center">
												{key['function_salary'] != null ? (
													<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-16px">
														{'€ ' + key['function_salary']}
													</span>
												) : (
													<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-16px d-none">
														{'€ ' + key['function_salary']}
													</span>
												)}
											</div>
											<div className="col-md-2 d-flex align-items-center justify-content-center py-1">
												<div>
													{key['function_salary'] != null && (
														<div className="input-group">
															<span className="input-group-text border-0 poppins-regular-16px">
																€
															</span>
															<input
																ref={salaryref}
																type="textfield"
																name="salary"
																placeholder="salary"
																//((key['salary'] !=key['function_salary'])||(salChanged == true))?
																value={key['salary'] != null ? key['salary'] : ''}
																className="form-control bg-white border-0 poppins-regular-16px"
																onChange={(e) => {
																	setsaalary(value, e);
																	setSalChanged(true);
																}}
															/>
														</div>
													)}

													<p style={{ color: 'red' }}>{key['salaryerror']}</p>
												</div>
											</div>
											{!ischecked &&
												key['functionslist']!=undefined&&key['functionslist'].map((deta, ind) => {
													{
														var group = 'function';
													}
													{
														!ischecked ? (group = key['emp_id'] + 'function') : '';
													}
													return (
														key['collapseOpen'] &&
														(ind <= 2 ? (
															<div className="col-md-12 row m-0 position-relative pe-0">
																<div className="mt-2 mb-2 bg-light h-75 p-3 bg-4C4D550F z-999 fun-line col ms-5">
																	<span className="custom-radio-input">
																		<input
																			type="radio"
																			value={deta['name']}
																			name={group}
																			className="p-3"
																			onClick={() => {
																				updatingObjectradiobutton(value, false);
																				updatingObjectFunction(
																					value,
																					deta['id']
																				);
																				updateSalary(
																					value,
																					deta['max'] != undefined
																						? deta['max']
																						: deta['salary']
																				);
																			}}
																			checked={
																				key['funid'] == deta['id'] ? (
																					(true, (selectnchecked = true))
																				) : (
																					false
																				)
																			}
																			onChange={(e) => {
																				updateRes(e, value);
																			}}
																		/>
																	</span>
																	<span className="ps-2">{deta['name']}</span>
																</div>
															</div>
														) : (
															ind == 3 && (
																<div className="col-md-12 row m-0 position-relative pe-0">
																	<div className="col ms-5 fun-line2 mt-2 mb-2 bg-light py-1 bg-4C4D550F z-999  d-flex align-items-center">
																		<span className="custom-radio-input d-inline-block mt-1">
																			<input
																				type="radio"
																				value={'finaldrop'}
																				style={{
																					display: 'inline-block !important'
																				}}
																				name={group}
																				checked={
																					(key['funid'] == 'drop' && true) ||
																					isThere(value, key['funid'])
																				}
																				onClick={() => {
																					updatingObjectradiobutton(
																						value,
																						true
																					);
																					updatingObjectFunction(
																						value,
																						'drop'
																					);
																				}}
																				className="p-3 d-inline"
																			/>
																		</span>
																		<div
																			className="ps-2 mx-1 w-95per"
																			style={{ display: 'inline-block' }}
																		>
																			<MultiSelectField
																				placeholder={<div>Function</div>}
																				name="employefunctionsall"
																				id={'select_id'}
																				options={getOptions(
																					key['functionslist'].slice(
																						3,
																						key['functionslist'].length
																					)
																				)}
																				standards={defultFunction(
																					value,
																					key['funid']
																				)}
																				disabled={!isThere(value, key['funid'])}
																				handleChange={(obj) => {
																					//if (functionselected != undefined) {
																					updatingObjectFunction(
																						value,
																						obj.value
																					);
																					setSalaries(obj.salary);
																					updatingObjectfunctionSlary(
																						value,
																						obj.salary
																					);
																					//	}
																				}}
																				isMulti={false}
																				className="col-md-6"
																			/>
																		</div>
																	</div>
																	<div
																		className="error 2 ps-5 ms-5 my-2"
																		style={{ color: 'red' }}
																	>
																		{key['functioniderror']}
																	</div>
																</div>
															)
														))
													);
												})}
											{key['warning'] != '' && (
												<div className="py-2" style={{ color: 'red', paddingLeft: '130px' }}>
													<ExclamationTriangle /> {key['warning']}
												</div>
											)}
										</div>
									</div>
								))}
						</ol>
					</div>
					{ischecked &&
						functions.map((deta, ind) => {
							{
								var group = 'function';
							}
							{
								ischecked ? 'function' : '';
							}
							return ind <= 2 ? (
								<div className="col-md-12 row m-0 position-relative">
									<div className="mt-2 mb-2 bg-light h-75 p-3 bg-4C4D550F z-999">
										<span className="custom-radio-input">
											<input
												type="radio"
												value={deta['name']}
												name={group}
												className="p-3"
												onClick={() => {
													updatingObjectradiobutton(null, false);
													updatingObjectFunction(null, deta['id']);
													updatingCommonObjectfunctionSlary(deta['id'], deta['salary']);
													//updateSalary(null, deta['max'] != undefined ? deta['max'] : deta['salary']);
												}}
												checked={employeeobject[0]['funid'] == deta['id'] ? true : false}
												onChange={(e) => {
													updateRes(e, null);
												}}
											/>
										</span>
										<span className="ps-2"> {deta['name']}</span>
									</div>
								</div>
							) : (
								ind == 3 && (
									<div className="col-md-12 row m-0 position-relative">
										<div className="col ms-5 fun-line33 mt-2 mb-2 bg-light py-1 bg-4C4D550F z-999  d-flex align-items-center">
											<span className="custom-radio-input d-inline-block mt-1">
												<input
													type="radio"
													value="drop"
													style={{ display: 'inline-block !important' }}
													name={group}
													checked={isThere(0, employeeobject[0]['funid'])}
													onClick={() => {
														updatingObjectradiobutton(null, true);
														updatingObjectFunction(null, 'drop');
													}}
													className="p-3 d-inline"
												/>
											</span>
											<div className="ps-2 w-95per" style={{ display: 'inline-block' }}>
												<MultiSelectField
													placeholder={<div>Function</div>}
													name="employefunctionsall"
													// id={'select_id'}
													options={getOptions(functions.slice(3, functions.length))}
													standards={defultFunction(0, employeeobject[0]['funid'])}
													disabled={!isThere(0, employeeobject[0]['funid'])}
													handleChange={(obj) => {
														updatingObjectFunction(null, obj.value);
														updatingCommonObjectfunctionSlary(null, obj.salary);
													}}
													isMulti={false}
													className="col-md-6"
												/>
												{/* <Select
													// name="employefunctionsall"
													// options={getOptions(functions.slice(3, functions.length))}
													// defaultValue={}
													onChange={setFunctionSelected}
													onInputChange={() => {
														if (functionselected != undefined) {
															
														}
													}}
												/> */}
											</div>
											<div style={{ color: 'red' }}>{employeeobject[0]['functioniderror']}</div>
										</div>
									</div>
								)
							);
						})}
				</div>
				<div className="row m-0 my-4">
					<div className="text-start col-md-6 p-0 align-items-center d-flex">
						<button
							type="button"
							className="bg-white  back-btn-text  border-0 poppins-regular-20px btn-block float-sm-right  md-5 add-proj-btn"
							onClick={() => router.push('/planning/employees/' + router.query.p_unique_key)}
						>
							BACK
						</button>
					</div>
					<div className="text-end col-md-6 p-0">
						<button
							type="sumit"
							className="btn rounded-0  custom-btn px-3  btn-block float-end"
							onClick={() => submit}
						>
							NEXT
						</button>
					</div>
				</div>
				{console.log(employeeobject)}
			</form>
		</div>
	);
};
export default AddFunction;
