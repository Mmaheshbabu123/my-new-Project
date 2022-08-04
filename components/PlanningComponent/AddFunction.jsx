import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare,FaEuroSign } from 'react-icons/fa';


const AddFunction = () => {
	const router = useRouter();
	const salaryref = useRef(null);
	const [ ischecked, setChecked ] = useState(false);
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	//functionid,salary
	const [ functionid, setFunctionId ] = useState();
	//employee id,employee type id
	const [ functionselected, setFunctionSelected ] = useState();
	const [ fulllist, setFulllist ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ employeeobject, setEmployeeObject ] = useState([]);
	const [ storeddata, setStoredData ] = useState([]);
	const [ errcount, seterrcount ] = useState(0);
	const [ dradio, setdradio ] = useState(true);

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
				.then(async (result) => {
					var data = result.data[0];
					var sdata = result.data[2];
					var employeetypes = result.data[3];
					var functionsdata = result.data[1];
					if (Data.length == 0) {
						setData(data);
						console.log(data);
						//if (sdata.length != 0) {
						//storedDataAssigning(sdata);
						createAllObjects(data, sdata);
						//    }else{
						// 	createAllObjects(data);
						//    }
					}

					if (employeetypes.length != 0) {
						setEmptypes(employeetypes);
					}

					if (functionsdata.length != 0) {
						setFunctions(functionsdata);
						getOptions(functionsdata);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	useEffect(
		() => {
			if (storeddata != undefined) {
				assignStoredtoEmployeeObject(storeddata);
			}
		},
		[ storeddata ]
	);

	function assignStoredtoEmployeeObject(storage) {
		var object = [ ...employeeobject ];
		if (object != undefined) {
			object.map((element, key) => {
				if (storage[key] != undefined) {
					if (element.employeeid == storage[key].emp_id) {
						object[key].functionid = storage[key].function_id;
						object[key].salary = storage[key].salary;
						object[key].functionsalary = storage[key].function_slary;
						object[key].employeetypeid = storage[key].emp_type;
					}
				}
			});
			if (object.length != 0) {
				setEmployeeObject(object);
			}
		}
	}

	function storedDataAssigning(sdata) {
		console.log(sdata);
		setStoredData(sdata);
		// if(sdata.length!=0){
		// 	assignStoredtoEmployeeObject(sdata);
		// }
	}

	function ercount(v) {
		if (v == '' || v == null || v == undefined) {
			seterrcount(1);
			return true;
		}
		return false;
	}

	function createAllObjects(result, storage) {
		var collapseOpen = false;
		if (result.length != 0 && employeeobject.length == 0) {
			console.log(employeeobject)
			console.log(result);
			result.forEach((element, val) => {

				if(val == 0){
					collapseOpen = true
				}else{
					collapseOpen = false
				}
				var obj = {
					employeeid: element[4],
					functionid: storage[val] != undefined ? storage[val].function_id : '',
					functionsalary: storage[val] != undefined ? storage[val].function_slary : '',
					salary: storage[val] != undefined ? storage[val].salary : '',
					radioactive: true,
					employeetypeid: storage[val] != undefined ? storage[val].emp_type : '',
					salaryerror: '',
					employeeiderror: '',
					functioniderror: '',
					default: false,
					collapseOpen:collapseOpen
				};
				if (element[4] != null) {
					setEmployeeObject((employeeobject) => [ ...employeeobject, obj ]);
				}
			});
			// if(sdata.length!=0){
			// 	assignStoredtoEmployeeObject(sdata);
			// }
		}
	}

	const setSelected = (V) => {
		setSelectedOption(employeTypeSelection(V));
	};

	function validateErrors() {
		let count = 0;
		const newstate = employeeobject.map((value,key) => {
			let func = '';
			let	sal = '';
			let	emp = '';
			if (
				value.functionid == '' ||
				value.functionid == null ||
				value.functionid == 'finaldrop'
			) {
				func = 'This field is required.';
				
				count++;
			}else{
				func = '';
				console.log(value);
				if(value.salary == ''||value.salary == null||value.salary == undefined){
					sal = "This field is required."
					count++;

				}else{

				}
			}

			// if(value.salary==''){
			// 	console.log('its empty sathish');
			// }
			// if (v == 0) {
				
				// if (
				// 	value.functionsalary == '' ||
				// 	value.functionsalary == null ||
				// 	value.functionsalary == 'This field is required.'
				// ) {
				// 	//sal= 'This field is required.';
				// 	func = 'Please select the function';
				// 	// v++;
				// } else {
				// 	if (value.salary < value.functionsalary) {
				// 		sal = 'This field is invalid.';
				// 		// v++;
				// 	}
				// }
			// }

			if (
				value.employeetypeid == '' ||
				value.employeetypeid == null 
			) {
				emp = 'This field is required.';
				count++;
			}
			var collapseOpen = true;
			if(func != '' && func != null && func != undefined){
				collapseOpen = true;
			}else{
				// if(key != 0){
				// collapseOpen = true;
				// }else{
				// 	collapseOpen = false;
				// }
			}
			if(func == '' && emp == '' && sal == ''){
				if(key == 0){
				collapseOpen = true;
				}else{
					collapseOpen = false;
				}
			}
			return { ...value, functioniderror: func, employeeiderror: emp, salaryerror: sal,collapseOpen:collapseOpen };
			
		});
		console.log(newstate)
		setEmployeeObject(newstate);
		return count;
	}

	const submit = (e) => {
		e.preventDefault();
		//return
		var p_unique_key = router.query.p_unique_key;
		//functionid, salary,employeetypeid,employeeid
		let errors = validateErrors();
		if (errors != 0) {
			console.log('errors are there');
		} else {
			if (errcount == 0) {
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/storeFunctionEmptypeSalary/' + p_unique_key,
					'POST',
					employeeobject
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

	function updatingObjectTypeid(empid, emptype) {
		console.log(emptype);
		var objects = [ ...employeeobject ];

		if (objects != undefined) {
			const newState = objects.map((element) => {
				if (element.employeeid == empid) {
					return { ...element, employeetypeid: emptype };
				}
				return element;
			});
			setEmployeeObject(newState);
		}
		console.log(employeeobject);
	}

	function updatingObjectradiobutton(empid = 0, status) {
		var object = [ ...employeeobject ];
		if (object != undefined) {
			object.map((element, key) => {
				if (empid != 0) {
					if (element.employeeid == empid) {
						object[key].radioactive = status;
					}
				} else {
					object[key].radioactive = status;
				}
			});

			setEmployeeObject(object);
		}
	}

	function updatingObjectfunctionSlary(empid = 0, salary) {
		var objects = employeeobject;
		if (objects != undefined) {
			objects.map((element, key) => {
				if (empid != 0) {
					if (element.employeeid == empid) {
						objects[key].functionsalary = Number(salary);
						objects[key].salary = objects[key].salary!= '' ?objects[key].salary:'';
					}
				} else {
					objects[key].functionsalary = Number(salary);
					objects[key].salary = objects[key].salary!= '' ?objects[key].salary:'';

				}
			});
			setEmployeeObject(objects);
		}
		console.log(employeeobject);
	}

	function updatingObjectSlary(empid, salary) {
		var objects = employeeobject;
		if (objects != undefined) {
			const newState = objects.map((element) => {
				if (empid != 0) {
					if (element.employeeid == empid) {
						return { ...element, salary: salary };
					}
				}
				return element;
			});
			setEmployeeObject(newState);
		}
		//console.log(employeeobject);
	}

	function updatingObjectFunction(empiD = 0, funcid) {
		//functionsalary
		var objects = [ ...employeeobject ];
		if (objects != undefined) {
			objects.map((element, key) => {
				if (empiD != 0) {
					if (element.employeeid == empiD) {
						objects[key].functionid = funcid;
					}
				} else {
					console.log('yes');
					objects[key].functionid = funcid;
				}
			});
			setEmployeeObject(objects);
		}
	}

	function setsaalary(empid, e) {
		let value = e.target.value;
		// setSalaries(value);
		updatingObjectSlary(empid, Number(value));
	}

	function updateValue(empid, value, level) {
		if (level == 1) {
			console.log(value);
			updatingObjectFunction(empid, value);
		} else if (level == 2) {
			updatingObjectTypeid(empid, value);
		} else if (level == 3) {
			//setFunctionId([ id.value, id.salary ]);
			updatingObjectSlary(empid, Number(value));
		} else {
		}
	}

	function checkbox() {
		setChecked(!ischecked);
		emptyemployeeData();
	}

	const prefill = (Value) => {
		storeddata.map((element) => {
			if (element.function_id == Value) {
				return Value;
			}
		});
	};

	let updateRes = (event, key) => {
		//setFuncChanged(true);
		var res1 = [ ...functions ];
		res1.map((val, k) => {
			if (k == key) {
				res1[k]['funct_checked'] = parseInt(event.target.value);
			} else {
				res1[k]['funct_checked'] = '';
			}
		});
		setFunctions(res1);
	};

	const backToDashboard = () => {
		var p_unique_key = router.query.p_unique_key;
		router.push('/planning/employees/' + p_unique_key);
	};

	const radioButn = (val) => {
		setdradio(val);
	};

	// function updateStoredfunction(empiD, functionid) {
	// 	var objects = [ ...storeddata ];
	// 	if (objects != undefined) {
	// 		objects.map((element, key) => {
	// 			if (element.emp_id == empiD) {
	// 				objects[key].function_id = functionid;
	// 			}
	// 		});
	// 		setStoredData(objects);
	// 	}
	// }

	function verifyfunctionid(val) {
		let v = 0;
		//console.log('reached here sathish');
		functions.slice(4, functions.length).map((key, value) => {
			//	console.log(key['id']);
			if (key['id'] == val) {
				//	console.log('reached');
				v++;
			}
		});
		if (v > 0) {
			return true;
		} else {
			return false;
		}
	}

	const empid = (parameter = 0, error = '', val = 0) => {
		console.log(employeeobject);
		if (error == '' && employeeobject[val] != undefined) {
			error = employeeobject[val].functioniderror;
		}
		var group = '';
		var func = (
			<div className="row ms-6">
				<ul className='ulitem'>
					{functions != null ? (
						functions.slice(0, 4).map((key, value) => (
							<div key={key['id']} className="row ms-5 position-relative accordi">
								<span className='firsrt-line'></span>
								<span className='second-line'> </span>
								<div style={{ display: 'none' }}>
									{value == 0 ? (group = !ischecked ? parameter + 'function' : 'function') : ''}
								</div>
								<div className="col-md-6">
									<div
										className="mt-2 mb-2 bg-light h-75 p-3 bg-4C4D550F"
										defaultValue={prefill(key['id'])}
										onChange={() => {
											value < 3
												? (updateValue(parameter, key['id'], 1),
													setSalaries(key['salary']),
													updatingObjectfunctionSlary(parameter, key['salary'])
													// ,
													// updatingObjectSlary(parameter, Number(key['salary']))
													)
												: '';
										}}
									>
										{value < 3 ? (
											<span className="custom-radio-input">
												<input
													type="radio"
													value={key['id']}
													name={group}
													className="p-3"
													onClick={() => {
														updatingObjectradiobutton(parameter, true);
														//	updateStoredfunction(parameter,key['id']);
														updateValue(parameter, key['id'], 1);
													}}
													checked={
														employeeobject[val] != undefined ? employeeobject[val]
															.functionid == key['id'] ? (
															true
														) : (
															false
														) : (
															''
														)
													}
													//(storeddata[val]!=undefined)?(key['id']==storeddata[val].function_id)?true:false:""}
													//	checked={key['funct_checked'] == key['id'] ? true : false}
													onChange={(e) => {
														updateRes(e, value);
													}}
												/>
											</span>
										) : (
											''
										)}
										{value < 3 ? <span className="ps-2">{key['name']}</span> : ''}
										{!ischecked && value == 3 ? (
											<div>
												<input
													type="radio"
													value={'finaldrop'}
													style={{ display: 'inline-block !important' }}
													name={group}
													checked={
														employeeobject[val] != undefined ? (
															verifyfunctionid(employeeobject[val].functionid)
														) : (
															''
														)
														// == key['id']||(employeeobject[val].functionid)
														//? true : false
													}
													onClick={() => {
														updatingObjectradiobutton(parameter, false);
														updateValue(parameter, key['id'], 1);
													}}
													className="p-3 d-inline"
												/>
												<div className="ps-2 w-75" style={{ display: 'inline-block' }}>
													{/* {console.log(verifyfunctionid(employeeobject[value].functionid)?dropfunctionupdate(employeeobject[val].functionid):'')} */}
													<Select
														placeholder={<div>Function</div>}
														isDisabled={
															employeeobject[val] != undefined ? employeeobject[val]
																.radioactive &&
															key['id'] == employeeobject[val].functionid ? (
																true
															) : (
																false
															) : (
																''
															)
														}
														//value='finaldrop'
														name="employefunctionsall"
														options={fulllist}
														defaultValue={
															//key['id'] == employeeobject[val].functionid ? (
															verifyfunctionid(employeeobject[val].functionid) ? (
																dropfunctionupdate(employeeobject[val].functionid)
															) : (
																''
															)
															//) : (
															//	''
															//)
														}
														//(storeddata[val]!=undefined)?((key['id']==storeddata[val].function_id)?dropfunctionupdate(storeddata[val].function_id):''):''
														onChange={setFunctionSelected}
														//updatingObjectfunctionSlary(parameter,Number(key['salary'])
														onInputChange={() => {
															if (functionselected != undefined) {
																updateValue(parameter, functionselected.value, 1);
																setSalaries(functionselected.salary);
																updatingObjectfunctionSlary(
																	parameter,
																	functionselected.salary
																);
															}
														}}
													/>
												</div>
											</div>
										) : value == 3 ? (
											<div>
												<input
													type="radio"
													style={{ display: 'inline-block' }}
													value="finaldrop"
													checked={verifyfunctionid(employeeobject[val].functionid)}
													onClick={() => {
														updatingObjectradiobutton(parameter, false);
														updateValue(parameter, key['id'], 1);
													}}
													name={group}
													className="p-3 "
												/>
												<div className="ps-2 w-75" style={{ display: 'inline-block' }}>
													{employeeobject[val] != undefined ? (
														console.log(employeeobject[val])
													) : (
														''
													)}
													<Select
														placeholder={<div>Function</div>}
														isDisabled={
															employeeobject[val] != undefined &&
															storeddata[val] != undefined ? employeeobject[val]
																.radioactive &&
															!(key['id'] == storeddata[val].function_id) ? (
																true
															) : (
																false
															) : (
																''
															)
														}
														//value='finaldrop'
														name="employefunctionsall"
														options={fulllist}
														defaultValue={
															//key['id'] == employeeobject[val].functionid ? (
															verifyfunctionid(employeeobject[val].functionid) ? (
																dropfunctionupdate(employeeobject[val].functionid)
															) : (
																''
															)
															//) : (
															//	''
															//)
														}
														//(storeddata[val]!=undefined)?((key['id']==storeddata[val].function_id)?dropfunctionupdate(storeddata[val].function_id):''):''
														onChange={setFunctionSelected}
														//updatingObjectfunctionSlary(parameter,Number(key['salary'])
														onInputChange={() => {
															if (functionselected != undefined) {
																updateValue(parameter, functionselected.value, 1);
																setSalaries(functionselected.salary);
																updatingObjectfunctionSlary(
																	parameter,
																	functionselected.salary
																);
															}
														}}
														// isDisabled={employeeobject[val].radioactive ? true : false}
														// placeholder={<div>Function</div>}
														// style={{ display: 'inline-block !important' }}
														// //value='finaldrop'
														// name="employefunctionsall"
														// options={fulllist}
														// defaultValue={
														// 		verifyfunctionid(employeeobject[val].functionid)?dropfunctionupdate(employeeobject[val].functionid):''
														// }
														// //defaultValue={employeTypeSelection(storeddata[value])}
														// onChange={setFunctionSelected}
														// onInputChange={() => {
														// 	if (functionselected != undefined) {
														// 		updateValue(parameter, functionselected.value, 1);
														// 		setSalaries(functionselected.salary);
														// 		updatingObjectfunctionSlary(
														// 			parameter,
														// 			functionselected.salary
														// 		);
														// 	}
														// }}
													/>
												</div>
											</div>
										) : (
											''
										)}
									</div>
								</div>
							</div>
						))
					) : (
						''
					)}
					<p style={{ color: 'red', paddingLeft: '77px' }}>{error}</p>
				</ul>
			</div>
		);

		return func;
	};

	const getOptions = (res) => {
		var options = [];
		if (res !== null) {
			let max = res.length;
			res.slice(3, max).map((value, key) => {
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
		setFulllist(options);
	};

	// const setit=(val)=>{
	// 	setSelectedOption(val);
	// }

	const employeTypeSelection = (val) => {
		var op = '';
		emptypes.forEach((element) => {
			if (val != undefined) {
				if (element['value'] == val) {
					op = element;
				}
			} else {
			}
		});
		// setit(op);
		return op;
	};

	const dropfunctionupdate = (val) => {
		var op = '';
		fulllist.forEach((element) => {
			if (element['value'] == val) {
				op = element;
			}
		});

		// var objects = [...storeddata];
		// if (objects != undefined) {
		// 	objects.map((element,key) => {
		// 			if (element.functionid == val) {
		// 				objects[key].radioactive=true;
		// 			}
		// 	});
		// 	setStoredData(objects);
		// }
		return op;
	};

	let emptyemployeeData = () => {
		var object = [ ...employeeobject ];
		if (object != undefined) {
			object.map((element, key) => {
				//if (element.employeeid == storage[key].emp_id) {
				object[key].functionid = '';
				object[key].salary = '';
				object[key].functionsalary = '';
				object[key].employeeiderror = '';
				object[key].functioniderror = '';
				object[key].salaryerror = '';
				//}
			});

			if (object.length != 0) {
				setEmployeeObject(object);
			}
		}
	};
	let updateCollapseState = (index, val) => {
		var object = [ ...employeeobject ];
		object[index].collapseOpen = !val;
		setEmployeeObject(object);

	}

	return (
		<div className="col-md-12" style={{}}>
			{console.log(employeeobject)}
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0">
					<div className="col-md-12 p-0">
						<p className="h1 mt-3 font-weight-bold  poppins-italic-24px">Add function</p>
					</div>
					{employeeobject.length>1 && <div className="form-check px-0 my-3 align-items-center d-flex">
						<input className='input-h-w' type="checkbox" checked={ischecked} onChange={() => checkbox()} />
						<label className="form-check-label p-1 " htmlFor="flexCheckChecked">
							Same functions for all employees
						</label>
					</div>
					}
				</div>
				<div className="row ">
					<ol type="1">
						{Data.map((key, value) => (
							<div key={value}>
								<div key={key} className="row bg-4C4D550F mb-2 p-3">
								<div className="col-md-1 d-flex align-items-center justify-content-start poppins-regular-18px">
									{ischecked?(value + 1): (employeeobject[value].collapseOpen == false?<FaRegPlusSquare onClick={() => updateCollapseState(value,employeeobject[value].collapseOpen)}/>:<FaRegMinusSquare onClick={() => updateCollapseState(value, employeeobject[value].collapseOpen)}/>)}															
									</div>
									<div className="col-md-3 p-1 d-flex align-items-center justify-content-start">
										 {key[1]}
									</div>
									{/* {console.log(storeddata[value])} */}
									<div className="col-md-3  border-0  align-items-center h-40 justify-content-start custom-drop-btn">
										{() => setSelected(storeddata[value])}
										{emptypes != null ? (
											<Select
												placeholder={<div className="hiii">Employee type</div>}
												defaultValue={employeTypeSelection(
													employeeobject[value].employeetypeid
												)}
												options={emptypes}
												name="functionss"
												onChange={setSelectedOption}
												onInputChange={(e) => {
													updateValue(key[4], selectedOption.value, 2);
												}}
											/>
										) : (
											''
										)}
										{
											<div style={{ color: 'red', paddingTop: '5px' }}>
												{employeeobject[value].employeeiderror}
											</div>
										}
									</div>
									<div className="col-md-2 border-0 h-40 d-flex align-items-center justify-content-center">
										{console.log(salaries)}
											{ischecked ? salaries != undefined && salaries != '' && salaries != null && employeeobject[value].functionsalary!=''? (
												
												<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-18px">
												{'€ ' + employeeobject[value].functionsalary}
												</span>

											) : (
												''
											) : employeeobject[value].functionid != '' ? (
												<span className="p-1 w-100 h-100 d-flex align-items-center justify-content-center poppins-regular-18px">
												{'€ ' + employeeobject[value].functionsalary}
												</span>
											) : (
												''
											)}
									</div>
									<div className="col-md-2 d-flex align-items-center justify-content-center h-40 ">
										{employeeobject[value].functionid != '' ? (
											<div>
												<div className="input-group">
												<span className="input-group-text border-0 poppins-regular-18px">€</span>
													<input
														ref={salaryref}
														type="textfield"
														name="salary"
														placeholder="salary"
														defaultValue={
															employeeobject[value] != undefined ? (
																employeeobject[value].salary
															) : (
																''
															)
														}
														className="form-control bg-white border-0 poppins-regular-18px"
														onChange={(e) => setsaalary(key[4], e)}
													/>
													
												</div>

												<p style={{ color: 'red' }}>{employeeobject[value].salaryerror}</p>
											</div>
										) : (
											''
										)}
									</div>
								</div>
								{!ischecked && employeeobject[value].collapseOpen ? empid(key[4], employeeobject[value].functioniderror, value) : ''}
							</div>
						))}
					</ol>
				</div>
				{ischecked ? empid() : ''}
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
