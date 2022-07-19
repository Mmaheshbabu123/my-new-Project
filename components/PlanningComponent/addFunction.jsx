import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { da, id } from 'date-fns/locale';
import { max } from 'date-fns';
import { data } from 'node_modules/autoprefixer/lib/autoprefixer';
import { validate } from 'uuid';

const AddFunction = () => {
	const router = useRouter();
	const salaryref = useRef(null);
	const [ ischecked, setChecked ] = useState(true);
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	//functionid,salary
	const [ functionid, setFunctionId ] = useState();
	//employee id,employee type id
	const [ functionselected, setFunctionSelected ] = useState();
	const [ fulllist, setFulllist ] = useState();
	const [ listtype, setListtype ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ employeeobject, setEmployeeObject ] = useState([]);
	const [ storeddata, setStoredData ] = useState([]);
	const [ funcChanged, setFuncChanged ] = useState(false);
	const [ salaryerror, setSalaryError ] = useState();
	const [ errcount, seterrcount ] = useState(0);
	const [ submitclick, setSubmitClick ] = useState(false);

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
				.then((result) => {
					var data = result.data[0];
					var sdata = result.data[2];
					var employeetypes = result.data[3];
					var functionsdata = result.data[1];
					if (Data.length == 0) {
						setData(data);
						createAllObjects(data);
					}
					if (sdata.length != 0) {
						storedDataAssigning(sdata);
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

	function storedDataAssigning(sdata) {
		setStoredData(sdata);
		console.log(sdata);
	}

	function ercount(v) {
		if (v == '' || v == null || v == undefined) {
			seterrcount(1);
			return true;
		}
		return false;
	}

	function createAllObjects(result) {
		if (result.length != 0 && employeeobject.length == 0) {
			result.forEach((element) => {
				var obj = {
					employeeid: element[4],
					functionid: '',
					salary: '',
					employeetypeid: '',
					salaryerror: '',
					employeeiderror: '',
					functioniderror: ''
				};
				if (element[4] != null) {
					setEmployeeObject((employeeobject) => [ ...employeeobject, obj ]);
				}
			});
		}
	}

	const setSelected = (V) => {
		setSelectedOption(employeTypeSelection(V));
	};

	function validateErrors() {
		let v = 0;
		const newstate = employeeobject.map((value) => {
			let func,
				sal,
				emp = '';
			if (value.functionid == '' || value.functionid == null || value.functionid == 'This field is required.') {
				func = 'This field is required.';
				v++;
			}

			if (value.salary == '' || value.salary == null || value.salary == 'This field is required.') {
				sal= 'This field is invalid.';
				v++;
			}else{
				if(value.salary<Number(salaries)){
					sal= 'This field is invalid.';
					v++;
				}
			}

			if (
				value.employeetypeid == '' ||
				value.employeetypeid == null ||
				value.salary == 'This field is required.'
			) {
				emp = 'This field is required.';
				v++;
			}
			return { ...value, functioniderror: func, employeeiderror: emp, salaryerror: sal };
		});

		setEmployeeObject(newstate);
		return v;
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
		console.log(emptype)
		var objects = [ ...employeeobject ];
		var data1 = [...storeddata];
		data1.map((val,key)=>{
			if(val.emp_id == empid){
				console.log(data1[key].emp_type);
				data1[key].emp_type = emptype;
			}
			
		});
		setStoredData(data1);
		

		// if (objects != undefined) {
		// 	const newState = objects.map((element) => {
		// 		if (element.employeeid == empid) {
		// 			return { ...element, employeetypeid: emptype };
		// 		}
		// 		return element;
		// 	});
		// 	setEmployeeObject(newState);
		// }

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
		console.log(employeeobject);
	}

	function updatingObjectFunction(empid, funcid) {
		var objects = employeeobject;
		if (objects != undefined) {
			const newState = objects.map((element) => {
				if (empid != 0) {
					if (element.employeeid == empid) {
						return { ...element, functionid: funcid };
					}
				} else {
					return { ...element, functionid: funcid };
				}
				return element;
			});
			setEmployeeObject(newState);
		}
		console.log(employeeobject);
	}

	function setsaalary(empid, e) {
		let value = e.target.value;
		// setSalaries(value);
		updatingObjectSlary(empid, Number(value));
	}

	function updateValue(empid, value, level) {
		if (level == 1) {
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
	}

	const prefill = (Value) => {
		storeddata.map((element) => {
			if (element.function_id == Value) {
				return Value;
			}
		});
	};

	let updateRes = (event, key) => {
		setFuncChanged(true);
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

	const empid = (parameter = 0, error = '') => {
		if (error == '' && employeeobject[0] != undefined) {
			error = employeeobject[0].functioniderror;
		}

		console.log((storeddata[0]!=undefined)?storeddata[0].functionid:'em rale');
		var func = (
			<div className="row ms-6">
				<ul>
					{functions != null ? (
						functions.slice(0, 4).map((key, value) => (
							<div key={key['id']} className="row ms-5">
								<div className="col-md-6">
									{/* {console.log(key)} */}
									<div
										className="mt-2 mb-2 bg-light h-75 p-3"
										defaultValue={prefill(key['id'])}
										onChange={() => {
											updateValue(parameter, key['id'], 1);
											console.log(key['id']);
											setSalaries(key['salary']);
										}}
									>
										{value < 3 ? (
											<input
												type="radio"
												value={key['id']}
												name={'functions'}
												className="p-3"
												checked={key['funct_checked'] == key['id'] ? true : false}
												onChange={(e) => {
													updateRes(e, value);
												}}
											/>
										) : (
											''
										)}
										{value < 3 ? <span className='ps-2'>{key['name']}</span> : ''}
										{!ischecked && value == 3 ? (
											<div>
												<input
													type="radio"
													value={'select a function from drop down'}
													style={{display:'inline-block !important'}}
													name={'functions'}
													className="p-3 d-inline"
												/>
												<div  className="ps-2 w-75" style={{display:'inline-block'}}>
												<Select
													placeholder={<div>Function</div>}
													
													//value={selectedOption}
													name="employefunctionsall"
													options={fulllist}
													onChange={setFunctionSelected}
													onInputChange={() => {
														if (functionselected != undefined) {
															updateValue(parameter, functionselected.value, 1);
														}
														if (functionselected != undefined) {
															setSalaries(functionselected.salary);
														}
													}}
												/>
												</div>
											</div>
										) : value == 3 ? (
											<div>
												<input
													type="radio"
													style={{display:'inline-block'}}
													value={key['id']}
													name="functions"
													className="p-3 "
												/>
												<div  className="ps-2 w-75" style={{display:'inline-block'}}>
												<Select
													placeholder={<div>Function</div>}
													style={{display:'inline-block !important'}}
													//value={selectedOption}
													name="employefunctionsall"
													options={fulllist}
													onChange={setFunctionSelected}
													onInputChange={() => {
														if (functionselected != undefined) {
															updateValue(parameter, functionselected.value, 1);
														}
														if (functionselected != undefined) {
															setSalaries(functionselected.salary);
														}
													}}
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
					<p  style={{ color: 'red',paddingLeft:'77px' }}>{error}</p>
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
			if (element['value'] == val.emp_type) {
				op = element;
			}
		});
		// setit(op);
		return op;
	};
	let updatestoredata = (key,val) => {

		console.log(val);
	};

	return (
		<div className="container" style={{ marginTop: '5%', marginBottom: '2%' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row">
						<p className="h1">Add function</p>
					</div>
					<div className="form-check">
						<input type="checkbox" checked={ischecked} onChange={() => checkbox()} />
						<label className="form-check-label p-1 " htmlFor="flexCheckChecked">
							Same functions for all employees
						</label>
					</div>
				</div>
				<div className="row ">
					<ol type="1">
						{Data.map((key, value) => (
							<div key={value}>
								<div key={key} className="row bg-light mb-2 p-3">
									<div className="col-md-3 p-1">
										{value + 1}. {key[1]}
									</div>
									{console.log(storeddata[value])}
									<div className="col-md-4 bg-light">
										{() => setSelected(storeddata[value])}
										{emptypes != null ? (
											<Select
												placeholder={<div>Employee type</div>}
												defaultValue={employeTypeSelection(storeddata[value])}
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
										{<p style={{ color: 'red',paddingTop: '5px' }}>{employeeobject[value].employeeiderror}</p>}
									</div>
									<div className="col-md-2 bg-light mb-2">
										<span className="p-1">
											{ischecked ? salaries != undefined && salaries != '' ? (
												'€' + salaries
											) : (
												''
											) : employeeobject[value].functionid != '' ? (
												'€' + salaries
											) : (
												''
											)}
										</span>
									</div>
									<div className="col-md-2">
										{employeeobject[value].functionid != '' ? (
											<div>
																		<div className="input-group">

												<input
													ref={salaryref}
													type="textfield"
													name="salary"
													placeholder="salary"
													className="form-control"
													onChange={(e) => setsaalary(key[4], e)}
												/>
												<span className="input-group-text">€</span>
												</div>

												<p style={{ color: 'red' }}>{employeeobject[value].salaryerror}</p>
											</div>
										) : (
											''
										)}
									</div>
								</div>
								{!ischecked ? empid(key[4], employeeobject[value].functioniderror) : ''}
							</div>
						))}
					</ol>
				</div>
				{ischecked ? empid() : ''}
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => router.push('/planning/employees/' + router.query.p_unique_key)}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => submit}
						>
							Next
						</button>
					</div>
				</div>
				{console.log(employeeobject)}
			</form>
		</div>
	);
};

export default AddFunction;
