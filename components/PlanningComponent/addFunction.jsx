import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { da, id } from 'date-fns/locale';
import { max } from 'date-fns';
// import { FormControl } from 'react-bootstrap';
// import { FormLabel } from 'react-bootstrap';
// import { Printer } from 'react-bootstrap-icons';

const AddFunction = () => {
	const router = useRouter();
	const [ ischecked, setChecked ] = useState(true);
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	//functionid,salary
	const [ functionid, setFunctionId ] = useState();
	//employee id,employee type id
	const [ emptypetoid, setEmptypeTOid ] = useState();
	const [ fulllist, setFulllist ] = useState();
	const [ listtype, setListtype ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ employeeobject, setEmployeeObject ] = useState([]);
    const [ storeddata,setStoredData ]=useState();
	useEffect(
		() => {
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getPlanningEmployeeFunction/' + p_unique_key, 'GET')
				.then((result) => {
					if(result.length!=0){
					setStoredData(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
				.then((result) => {
					var data = result.data;
					if (Data.length == 0) {
						setData(data);
						console.log('reached here');
						createAllObjects(data);
					}
					console.log(employeeobject);
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getallEmployeesTypes/' + p_unique_key, 'GET')
				.then((res) => {
					console.log(res);
					setEmptypes(res);
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getfunctionsbypcnumbers/' + p_unique_key,
				'GET'
			)
				.then(async (respons) => {
					setFunctions(respons);
					getOptions(functions);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	function createAllObjects(result) {
		if (result.length != 0 && employeeobject.length == 0) {
			result.forEach((element) => {
				var obj = {
					employeeid: element[4],
					functionid: '',
					salary: '',
					employeetypeid: ''
				};
				if (element[4] != null) {
					setEmployeeObject((employeeobject) => [ ...employeeobject, obj ]);
				}
			});
		}
	}

	const submit = (e) => {
		e.preventDefault();
		//return
		var p_unique_key = router.query.p_unique_key;
		//functionid, salary,employeetypeid,employeeid
		var data = [ ...functionid, ...emptypetoid ];

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
	};

	// const EmpSalary=(id,key)=>{
	// 	if(id.value!=''&&key!=''){
	// 		setEmptypeTOid([id.value,key]);
	// 	}
	// }

	async function updatingObjectTypeid(empid, emptype) {
		var objects = employeeobject;
		if (objects != undefined) {
			const newState = objects.map((element) => {
				if (element.employeeid == empid) {
					return { ...element, employeetypeid: emptype };
				}
				return element;
			});
			setEmployeeObject(newState);
		}
	}

	async function updatingObjectFunction(functionid, empid, salari) {
		var objects = employeeobject;
		if (objects != undefined) {
			const newState = objects.map((element) => {
				if (empid != 0) {
					if (element.employeeid == empid) {
						return { ...element, functionid: functionid, salary: salari };
					}
				}else{
					return { ...element, functionid: functionid, salary: salari };
				}
				return element;
			});
			setEmployeeObject(newState);
		}
	}

	function addsalary(id, empid, salary, level) {
		if (level == 1) {
			setFunctionId([ id, salary ]);
			setSalaries(salary);
			updatingObjectFunction(id, empid, salary);
		} else if (level == 2) {
			setEmptypeTOid([ id.value, salary ]);
			// to.forEach((element) => {});
			updatingObjectTypeid(empid, id.value);
		} else if (level == 3) {
				setFunctionId([ id.value, id.salary ]);
				setSalaries(id.salary);
				updatingObjectFunction(id.value, empid, Number(id.salary));
		} else {
		}
		//console.log(employeeobject);
	}

	function checkbox() {
		setChecked(!ischecked);
	}

	const backToDashboard = () => {
		var p_unique_key = router.query.p_unique_key;
		router.push('/planning/employees/' + p_unique_key);
	};

	const empid = (parameter = 0) => {
		var func = (
			<div className="row ms-5">
				<ul>
					{functions != null ? (
						functions.slice(0, 3).map((key, value) => (
							<div key={key['id']} className="row ms-5">
								<div className="col-md-6">
									<div
										className="mt-2 mb-2 bg-light h-75 p-3"
										onChange={() => addsalary(key['id'], parameter, Number(key['salary']), 1)}
									>
										<input type="radio" value={key['id']} name="functions" className="p-3 " />{' '}
										{key['name']}
									</div>
								</div>
							</div>
						))
					) : (
						''
					)}

					<Select
						//value={selectedOption}
						//isMulti
						name="employefunctionsall"
						options={fulllist}
						onChange={setListtype}
						onInputChange={() => {addsalary(listtype, parameter, 3, 3)}}
					/>
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

	const employeTypeSelection=(val)=>{
		var op='';
		emptypes.forEach(element => {
			if(element['value']==val.emp_type){
				
				op=element;
			}
		});
		return op;
	}

	const saveSalary = async () => {};
	return (
		<div className="container" style={{ marginTop: '5%', marginBottom: '2%' }}>
			{console.log(employeeobject)}
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
							<div>
								<div key={key} className="row bg-light mb-2 p-3">
									<div className="col-md-3 p-1">
										{value + 1}. {key[1]}
									</div>
									<div className="col-md-4 bg-light">
										{/* {console.log(storeddata[value])} */}
										{emptypes != null ? (
											<Select
											    value={employeTypeSelection(storeddata[value])}
												options={emptypes}
												name="functionss"
												onChange={setSelectedOption}
												onInputChange={() => addsalary(selectedOption, key[4], 2, 2)}
											/>
										) : (
											''
										)}
										{/* {selectedOption == ''?<span>this field is required</span>:''} */}
									</div>
									<div className="col-md-2 bg-light mb-2">
										<span className="p-1">{(ischecked)?(salaries != undefined ? '€' + salaries : ''):((employeeobject[value].salary!='')? '€' +employeeobject[value].salary:'')}</span>
									</div>
									<div className="col-md-2">
										<input
											type="textfield"
											name="salary"
											className="form-control"
											onChange={()=>addsalary(selectedOption, key[4], 2, 2)}
										/>
									</div>
								</div>
								{!ischecked ? empid(key[4]) : ''}
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
							onClick={() => backToDashboard()}
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
			</form>
		</div>
	);
};

export default AddFunction;
