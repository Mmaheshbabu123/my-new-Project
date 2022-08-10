import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee, updateSalaryBenefits } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare, FaEuroSign } from 'react-icons/fa';
import { CodeSlash } from 'node_modules/react-bootstrap-icons/dist/index';

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
	var hidefiled = '';
	var selectnchecked=false;
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
			if (value.funid == '' || value.funid == null||value.funid=='drop') {
				func = 'This field is required.';
				count++;
			} else {
				func = '';
				if (value.salary == '' || value.salary == null || value.salary == undefined) {
					value.salary = value.function_salary;
				} else {
					if (value.salary < value.function_salary) {
						sal = 'This field is invalid.';
						count++;
					}
				}
			}

			if (value.employeetypeid == '' || value.employeetypeid == null) {
				emp = 'This field is required.';
				count++;
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
			object[index].function_salary = Number(salary);
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].function_salary = salary != null ? Number(salary) : salary;
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
				object[key].salary = salary != null ? Number(salary) : salary;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectFunction(index = null, funcid) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].funid = funcid;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].funid = (index != null) ? Number(funcid) : funcid;
			});
			setEmployeeObject(object);
		}
	}

	function setsaalary(index, e) {
		let value = e.target.value;
		updatingObjectSlary(index, Number(value));
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
				object[key].emp_type = 0;
				object[key].employeetypeid = 0;
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
			object[index].function_salary = Number(salary);
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, function_salary: Number(salary) };
			});
			setEmployeeObject(newState);
		}
	};

	let updateEmployeeType = (index = null, val) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[index].employeetypeid = val;
			object[index].emp_type = val;
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, employeetypeid: val, emp_type: val };
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
				return { ...element, employeetypeid: val };
			});
			setEmployeeObject(newState);
		}
	};

	function updatingCommonObjectfunctionSlary(funcid, salary) {
		var object = [ ...employeeobject ];
		object.map((element, key) => {
			var temp = '';
			object[key].functionslist.map((element1)=>{
				element1.max != undefined ? (element1.id == funcid ? (temp = element1.max) : '') : '';
			});
			object[key].function_salary = temp != '' ? temp : salary;
		});
		setEmployeeObject(object);
	}

	function isThere(index=0,functionid){
		var object = [ ...employeeobject ];
		var temp=false;
		if(functionid=='drop'){
			return true
		}
		object[index].functionslist.slice(4,object[index].functionslist.length).map((element)=>{
			(element.id==functionid)?temp=true:'';
		})
		return temp;
	}

	function defultFunction(index=null,funcid){
		var object = [ ...employeeobject ];
		var options=[];
		var opt = {
			value: '',
			label: ''
		};
		object[index].functionslist.slice(3,object[index].functionslist.length).map((value)=>{
			if(value.id==funcid){
			opt.value = value.id;
			opt.label = value.name;
			opt.salary = value.salary;}
		})
		options[index] = opt;

		return options;
	}

	return (
		<div className="col-md-12" style={{}}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0">
					<div className="col-md-12 p-0">
						<p className="h1 mt-3 font-weight-bold  poppins-italic-24px">Add function</p>
					</div>
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
				</div>
				<div className="row ">
					<ol type="1">
						{employeeobject != undefined &&
							employeeobject.map((key, value) => (
								<div key={value}>
									<div key={key} className="row bg-4C4D550F mb-2 p-3">
										<div className="col-md-1 d-flex align-items-center justify-content-start poppins-regular-18px">
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
										<div className="col-md-3 p-1 d-flex align-items-center justify-content-start">
											{key['employeename']}
										</div>
										<div className="col-md-3  border-0  align-items-center h-40 justify-content-start custom-drop-btn">
											{emptypes != null ? (
												<Select
													placeholder={<div className="hiii">Employee type</div>}
													defaultValue={
														key['emp_type'] == 0 ? (
															''
														) : (
															employeTypeSelection(key['emp_type'])
														)
													}
													options={emptypes}
													name="functionss"
													onChange={setSelectedOption}
													onInputChange={(e) => {
														updateEmployeeType(value, selectedOption.value);
													}}
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
										<div className="col-md-2 border-0 h-40 d-flex align-items-center justify-content-center">
											{key['function_salary'] != null ? (
												<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-18px">
													{'€ ' + key['function_salary']}
												</span>
											) : (
												<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-18px d-none">
													{'€ ' + key['function_salary']}
												</span>
											)}
										</div>
										<div className="col-md-2 d-flex align-items-center justify-content-center h-40 ">
											<div>
												{key['function_salary'] != null && (
													<div className="input-group">
														<span className="input-group-text border-0 poppins-regular-18px">
															€
														</span>
														<input
															ref={salaryref}
															type="textfield"
															name="salary"
															placeholder="salary"
															defaultValue={key['salary']}
															className="form-control bg-white border-0 poppins-regular-18px"
															onChange={(e) => setsaalary(value, e)}
														/>
													</div>
												)}

												<p style={{ color: 'red' }}>{key['salaryerror']}</p>
											</div>
										</div>
										{!ischecked &&
											key['functionslist'].map((deta, ind) => {
												{
													var group = 'function';
												}
												{
													!ischecked ? (group = key['emp_id'] + 'function') : '';
												}
												return	key['collapseOpen'] && (ind <= 2 ? (
													<div class="mt-2 mb-2 bg-light h-75 p-3 bg-4C4D550F z-999">
														<span className="custom-radio-input">
														<input
															type="radio"
															value={deta['name']}
															name={group}
															className="p-3"
															onClick={() => {
																updatingObjectradiobutton(value, false);
																updatingObjectFunction(value, deta['id']);
																updateSalary(
																	value,
																	deta['max'] != undefined
																		? deta['max']
																		: deta['salary']
																);
															}}
															checked={key['funid'] == deta['id'] ? (true,selectnchecked=true):(false)}
															onChange={(e) => {
																updateRes(e, value);
															}}
														/>
														
													</span>
													<span className='ps-2'>{deta['name']}</span>
													</div>
												) : (
													
													ind == 3 && (
														
														<div>
															<input
																type="radio"
																value={'finaldrop'}
																style={{ display: 'inline-block !important' }}
																name={group}
																checked={(key['funid']=='drop')&&true||isThere(value,key['funid'])}
																onClick={() => {
																	updatingObjectradiobutton(value, true);
																	updatingObjectFunction(value,'drop');
																}}
																className="p-3 d-inline"
															/>
															<div
																className="ps-2 w-75"
																style={{ display: 'inline-block' }}
															>
																<Select
																	placeholder={<div>Function</div>}
																	isDisabled={!isThere(value,key['funid'])}
																	name="employefunctionsall"
																	options={getOptions(
																		key['functionslist'].slice(
																			3,
																			key['functionslist'].length
																		)
																	)}
																	defaultValue={
																		 defultFunction(value,key['funid'])
																	}
																	onChange={setFunctionSelected}
																	onInputChange={() => {
																		if (functionselected != undefined) {
																			updatingObjectFunction(
																				value,
																				functionselected.value
																			);
																			setSalaries(functionselected.salary);
																			updatingObjectfunctionSlary(
																				value,
																				functionselected.salary
																			);
																		}
																		blur()
																	}}
																/>
															</div>
															<div style={{ color: 'red' }}>{key['functioniderror']}</div>
														</div>
													)
												));
												})}
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
							<div class="mt-2 mb-2 bg-light h-75 p-3 bg-4C4D550F z-999">
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
							<span className='ps-2'>	{deta['name']}</span>
							</div>
						) : (
							ind == 3 && (
								<div>
									<input
										type="radio"
										value='drop'
										style={{ display: 'inline-block !important' }}
										name={group}
										checked={isThere(0,employeeobject[0]['funid'])}
										onClick={() => {
											updatingObjectradiobutton(null, true);
											updatingObjectFunction(null, 'drop');
										}}
										className="p-3 d-inline"
									/>
									<div className="ps-2 w-75" style={{ display: 'inline-block' }}>
										<Select
											placeholder={<div>Function</div>}
											isDisabled={!isThere(0,employeeobject[0]['funid'])}
											name="employefunctionsall"
											options={getOptions(functions.slice(3, functions.length))}
											defaultValue={
												defultFunction(0,employeeobject[0]['funid'])
											}
											onChange={setFunctionSelected}
											onInputChange={() => { 
												if (functionselected != undefined) {
													updatingObjectFunction(null, functionselected.value);
													updatingCommonObjectfunctionSlary(
														functionselected.value,
														functionselected.salary
													);
												}
											}}
										/>
									</div>
									<div style={{ color: 'red' }}>{employeeobject[0]['functioniderror']}</div>
								</div>
							)
						);
					})}
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
