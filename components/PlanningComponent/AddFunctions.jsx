import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { fetchPlanningFunction } from '../../Services/ApiEndPoints';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import Image from 'next/image';
import Age16 from '../../public/images/Age_16.svg';
import Age17 from '../../public/images/Age_17.svg';
import Age18 from '../../public/images/Age_18.svg';
import Age19 from '../../public/images/Age_19.svg';
import Age20 from '../../public/images/Age_20.svg';
import Age21 from '../../public/images/Age_21.svg';
import MultiSelectField from '@/atoms/MultiSelectField';
import ValidationService from '../../Services/ValidationService';
import { ExclamationTriangle } from 'node_modules/react-bootstrap-icons/dist/index';





const AddFunctions = () => {
	const router = useRouter();
    const salaryref = useRef(null);
	const [ loading, setLoading ] = useState(true);
	const [ ischecked, setIsChecked ] = useState(false);
	const [ employeeobject, setEmployeeObject ] = useState([]);
    const [ salaries, setSalaries ] = useState();
    const [ selectedOption, setSelectedOption ] = useState([]);



	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(fetchPlanningFunction + p_unique_key, 'GET')
				.then((result) => {
					if (result.status == 200) {
						setEmployeeObject(result.data[0]);
					}
					console.log(result.data[0]);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	const submit = (e) => {
		e.preventDefault();
		var p_unique_key = router.query.p_unique_key;
		// console.log(employeeobject);return;

		let errors = validateErrors();

		if (errors != 0) {
			console.log('errors are there');
		} else {
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
	};

    const employeTypeSelection = (val,employee_types) => {
		var op = [];
		employee_types.forEach((element) => {
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


	let updateEmployeeType = (index = null, val, parent_index) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].emp_type = val;
			setEmployeeObject(object);
		} else {
		// 	const newState = object.map((element) => {
		// 		return { ...element, emp_type: val, emp_type: val };
			// });
		// 	setEmployeeObject(newState);
		}
	};

    function isThere(index = 0, functionid,parent_index) {
		var object = [ ...employeeobject ];
		var temp = false;
		if (functionid == 'drop') {
			return true;
		}
		object[parent_index].employee_list[index].functionslist.slice(3, object[parent_index].employee_list[index].functionslist.length).map((element) => {
			element.id == functionid ? (temp = true) : '';
		});
		return temp;
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

    function defultFunction(index = null, funcid,parent_index) {
		var object = [ ...employeeobject ];
		var options = [];
		var opt = {
			value: '',
			label: ''
		};
		object[parent_index].employee_list[index].functionslist.slice(3, object[parent_index].employee_list[index].functionslist.length).map((value) => {
			if (value.id == funcid) {
				opt.value = value.id;
				opt.label = value.name;
				opt.salary = value.salary;
			}
		});
		options[index] = opt;

		return options;
	}

    let updateCollapseState = (index = null, val,parent_index) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].collapseOpen = !val;
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, emp_type: val };
			});
			setEmployeeObject(newState);
		}
	};

    async function updatingObjectradiobutton(index = null, status,parent_index) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].radioactive = status;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].radioactive = status;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectFunction(index = null, funcid,parent_index) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].funid = funcid;
			object[parent_index].employee_list[index].salary = null;
			object[parent_index].employee_list[index].warning = '';
			object[parent_index].employee_list[index].salaryerror = '';
			funcid == 'drop' ? (object[parent_index].employee_list[index].function_salary = null) : '';
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

    let updateSalary = (index = null, salary,parent_index) => {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].function_salary = parseFloat(salary);
			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, function_salary: parseFloat(salary) };
			});
			setEmployeeObject(newState);
		}
	};

    let updateRes = (event, key) => {
		//setFuncChanged(true);
		// var res1 = [ ...functions ];
		// res1.map((val, k) => {
		// 	if (k == key) {
		// 		res1[k]['funct_checked'] = parseInt(event.target.value);
		// 	} else {
		// 		res1[k]['funct_checked'] = '';
		// 	}
		// 	setFunctions(res1);
		// });
	};

    function updatingObjectfunctionSlary(index = null, salary,parent_index) {
		var object = [ ...employeeobject ];
		if (index != null) {
			object[parent_index].employee_list[index].function_salary = salary;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].function_salary = salary != null ? salary : salary;
			});
			setEmployeeObject(object);
		}
	}

	function validateErrors() {
		let count = 0;
		const newstate = [...employeeobject];
		newstate.map((v1, k1) => {

		v1.employee_list.map((value, key) => {
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
					if (count == 0) {
						value.salary = value.function_salary;
					}
				} else {
					sal =
						emp == '' && value.salary != '' && value.salary != null && value.salary != undefined
							? ValidationService.minSalaryValidationMethod(value.salary.toString().replace(/\s/g, ''))
							: '';
					if (sal != '') {
						count++;
					}
					let rsalary = String(value.salary).replace(',', '.').replace(/\s/g, '');
					let rfsalary = String(value.function_salary).replace(',', '.').replace(/\s/g, '');
					if (sal == '' && parseFloat(rsalary) < parseFloat(rfsalary)) {
						sal =
							'The new salary cannot be lesser than the minimum salary. The minimum salary for the selected function is ' +
							value.function_salary +
							' Euro';
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

			newstate[k1].employee_list[key].functioniderror = func;
			newstate[k1].employee_list[key].employeeiderror = emp;
			newstate[k1].employee_list[key].salaryerror = sal;
			newstate[k1].employee_list[key].collapseOpen = collapseOpen;
			// return {
			// 	...value,
			// 	functioniderror: func,
			// 	employeeiderror: emp,
			// 	salaryerror: sal,
			// 	collapseOpen: collapseOpen
			// };
		});
	});
		setEmployeeObject(newstate);
		return count;
	}

    function setsaalary(index, e,parent_index) {
		var object = [ ...employeeobject ];
		let value = e.target.value;
		if (value != '') {
			let rsalary = String(value).replace(',', '.').replace(/\s/g, '');
			let rfsalary = String(object[parent_index].employee_list[index].function_salary).replace(/\s/g, '');
			let err = ValidationService.minSalaryValidationMethod(value.replace(/\s/g, ''));
			if (err == '') {
				if (parseFloat(rsalary) > parseFloat(rfsalary)) {
					object[parent_index].employee_list[index].warning =
						'We notice that you have added a salary which is higher than the minimum salary and therefore this new salary will be considered as the minimum salary for all the future planning for this employee for the selected function. You can click on next to proceed further.';
					object[parent_index].employee_list[index].salaryerror = '';
				} else {
					object[parent_index].employee_list[index].warning = '';
				}
			} else {
				object[parent_index].employee_list[index].warning = '';
			}
			updatingObjectSlary(index, value,parent_index);
		} else {
			updatingObjectSlary(index, value,parent_index);
		}
	}

    function updatingObjectSlary(index = null, salary,parent_index) {
		var object = [ ...employeeobject ];
		if (index != null) {
			object[parent_index].employee_list[index].salary = salary;
			setEmployeeObject(object);
		} else {
			object.map((element, key) => {
				object[key].salary = salary != null ? salary : salary;
			});
			setEmployeeObject(object);
		}
	}

    let emptyemployeeData = () => {
		var object = [ ...employeeobject ];

        object.map((ele1,key1) => {
		if (object != undefined) {
			ele1.employee_list.map((element, key) => {
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
				setEmployeeObject(object);
				setSelectedOption({ value: 0, label: '-Select-' });
				// setSelectedOption([]);
			}
		}
    })
	};

    
	var selectnchecked = false;

	return (
		<div className="col-md-12">
			<form onSubmit={(e) => submit(e)}>
				<div />
				{/* <div className="row m-0"> */}
				<div className="col-md-12 p-0 position-sticky-pc py-4">
					<p className="pb-3 font-weight-bold px-0 bitter-italic-normal-medium-24">Add function</p>
				</div>

				{loading == true ? (
					<div>Loading...</div>
				) : (
					<div>
						<div className="min-hei-addfun add_function">
							<div className="form-check rounded-0 my-3 align-items-center d-flex">
								<input
									className="form-check-input rounded-0 mb-1 "
									type="checkbox"
									checked={ischecked}
									onChange={() => {
										setIsChecked(!ischecked);
                                        emptyemployeeData();
									}}
								/>
								<label
									className="form-check-label px-1 poppins-regular-18px "
									htmlFor="flexCheckChecked"
								>
									Same functions for all employees
								</label>
							</div>
							<div className="row px-3">
                                {employeeobject!= undefined && employeeobject.map((emplist,key)=>(
                                    <div type="1" className='pt-2' key={key}>
                                        <div className='py-2 poppins-light-20px'>{emplist.pc}</div>
                                        <div className='border border-secondary mb-2 p-1'>
                                        {emplist.employee_list.map((v1,k1) => (
											<div key={v1.emp_id}>
                                            <div className="row bg-4C4D550F mb-2 p-2">
                                                <div className="col-md-1 poppins-light-20px">
                                                    {ischecked ? (
                                                        k1 + 1 
                                                    ) : v1['collapseOpen'] == false ? (
                                                        <FaRegPlusSquare
                                                            onClick={() =>
                                                                updateCollapseState(k1, v1['collapseOpen'],key)}
                                                        />
                                                    ) : (
                                                        <FaRegMinusSquare
                                                            onClick={() =>
                                                                updateCollapseState(k1, v1['collapseOpen'],key)}
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-4 p-1 poppins-light-20px">
                                                    <div>
                                                        {v1['employeename']}{' '}
                                                        <span className="ageicon">
                                                             {v1['age'] != 0 &&
                                                                v1['age'] <= emplist.pc_min_age &&
                                                                {
                                                                    '16': (
                                                                        <Image src={Age16} width={25} height={25} />
                                                                    ),
                                                                    '17': (
                                                                        <Image src={Age17} width={25} height={25} />
                                                                    ),
                                                                    '18': (
                                                                        <Image src={Age18} width={25} height={25} />
                                                                    ),
                                                                    '19': (
                                                                        <Image src={Age19} width={25} height={25} />
                                                                    ),
                                                                    '20': (
                                                                        <Image src={Age20} width={25} height={25} />
                                                                    ),
                                                                    '21': (
                                                                        <Image src={Age21} width={25} height={25} />
                                                                    )
                                                                }[v1['age']]}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3  border-0 custom-drop-btn">
                                                    {emplist.employee_types != null ? (
                                                        <MultiSelectField
                                                            placeholder={'Select employee type'}
                                                            id={'select_id'}
                                                            options={emplist.employee_types}
                                                            standards={
                                                                v1['emp_type'] == 0 ? (
                                                                    ''
                                                                ) : (
                                                                    employeTypeSelection(v1['emp_type'],emplist.employee_types)
                                                                )
                                                            }
                                                            disabled={false}
                                                            handleChange={(obj) =>
                                                                updateEmployeeType(k1, obj.value,key)}
                                                            isMulti={false}
                                                            className="col-md-12 "
                                                        />
                                                    ) : (
                                                        ''
                                                    )}{' '}
                                                    {
                                                        <div style={{ color: 'red', paddingTop: '5px' }}>
                                                            {v1['employeeiderror']}
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-2 border-0">
                                                    {v1['function_salary'] != null ? (
                                                        <span className="p-1 px-3 w-100 poppins-medium-20px bg-white">
                                                            {'€ ' + v1['function_salary']}
                                                        </span>
                                                    ) : (
                                                        <span className="p-1 w-100 poppins-medium-20px bg-white d-none">
                                                            {'€ ' + v1['function_salary']}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-md-2 py-1 add_function_salary">
                                                    <div>
                                                        {v1['function_salary'] != null && (
                                                            <div className="input-group">
                                                                <span className="input-group-text border-0 poppins-regular-16px">
                                                                    €
                                                                </span>
                                                                <input
                                                                    ref={salaryref}
                                                                    type="textfield"
                                                                    name="salary"
                                                                    placeholder="salary"
                                                                    //((v1['salary'] !=v1['function_salary'])||(salChanged == true))?
                                                                    value={
                                                                        v1['salary'] != null ? v1['salary'] : ''
                                                                    }
                                                                    className="form-control bg-white border-0 poppins-regular-16px"
                                                                    onChange={(e) => {
                                                                        setsaalary(k1, e,key);
                                                                        // setSalChanged(true);
                                                                    }}
                                                                />
                                                            </div>
                                                        )}

                                                        <p style={{ color: 'red' }}>{v1['salaryerror']}</p>
                                                    </div>
                                                </div>
                                                {!ischecked &&
                                                    v1['functionslist'] != undefined &&
                                                    v1['functionslist'].map((deta, ind) => {
                                                        {
                                                            var group = 'function';
                                                        }
                                                        {
                                                            !ischecked ? (group = v1['emp_id'] + 'function') : '';
                                                        }
                                                        return (
                                                            v1['collapseOpen'] &&
                                                            (ind <= 2 ? (
                                                                <div className="col-md-12 row mt-3 position-relative pe-0">
                                                                    <div
                                                                        className="mt-2 mb-2 bg-light h-75 py-2 bg-4C4D550F z-999 px-0 fun-line col ms-5"
                                                                        style={{ height: '48px' }}
                                                                    >
                                                                        <span className="custom-radio-input">
                                                                            <input
                                                                                type="radio"
                                                                                value={deta['name']}
                                                                                name={group}
                                                                                className="p-3"
                                                                                onClick={() => {
                                                                                    updatingObjectradiobutton(
                                                                                        k1,
                                                                                        false,
                                                                                        key
                                                                                    );
                                                                                    updatingObjectFunction(
                                                                                        k1,
                                                                                        deta['id'],
                                                                                        key
                                                                                    );
                                                                                    updateSalary(
                                                                                        k1,
                                                                                        deta['max'] != undefined
                                                                                            ? deta['max']
                                                                                            : deta['salary'],
                                                                                            key
                                                                                    );
                                                                                }}
                                                                                checked={
                                                                                    v1['funid'] == deta['id'] ? (
                                                                                        (true,
                                                                                        (selectnchecked = true))
                                                                                    ) : (
                                                                                        false
                                                                                    )
                                                                                }
                                                                                onChange={(e) => {
                                                                                    updateRes(e, k1);
                                                                                }}
                                                                            />
                                                                        </span>
                                                                        <span className="ps-2 poppins-light-20px">
                                                                            {deta['name']}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ind == 3 && (
                                                                    <div className="col-md-12 row m-0 position-relative pe-0">
                                                                        <div
                                                                            className="col ms-5 fun-line2 mt-2 mb-2 bg-light py-1 bg-4C4D550F z-999  d-flex align-items-center px-0"
                                                                            style={{ height: '49px' }}
                                                                        >
                                                                            <span
                                                                                className="custom-radio-input d-inline-block p-3 "
                                                                                style={{ height: '48px' }}
                                                                            >
                                                                                <input
                                                                                    type="radio"
                                                                                    value={'finaldrop'}
                                                                                    style={{
                                                                                        display:
                                                                                            'inline-block !important'
                                                                                    }}
                                                                                    name={group}
                                                                                    checked={
                                                                                        (v1['funid'] == 'drop' &&
                                                                                            true) ||
                                                                                        isThere(k1, v1['funid'],key)
                                                                                    }
                                                                                    onClick={() => {
                                                                                        updatingObjectradiobutton(
                                                                                            k1,
                                                                                            true,
                                                                                            key
                                                                                        );
                                                                                        updatingObjectFunction(
                                                                                            k1,
                                                                                            'drop',
                                                                                            key
                                                                                        );
                                                                                    }}
                                                                                    className="p-3 d-inline align-middle"
                                                                                />
                                                                            </span>
                                                                            <div
                                                                                className="ps-2 mx-1 w-95per"
                                                                                style={{ display: 'inline-block' }}
                                                                            >
                                                                                <MultiSelectField
                                                                                    placeholder={'Select function'}
                                                                                    name="employefunctionsall"
                                                                                    id={'select_id'}
                                                                                    options={getOptions(
                                                                                        v1['functionslist'].slice(
                                                                                            3,
                                                                                            v1['functionslist']
                                                                                                .length
                                                                                        )
                                                                                    )}
                                                                                    standards={defultFunction(
                                                                                        k1,
                                                                                        v1['funid'],
                                                                                        key
                                                                                    )}
                                                                                    disabled={
                                                                                        !isThere(
                                                                                            k1,
                                                                                            v1['funid'],
                                                                                            key
                                                                                        )
                                                                                    }
                                                                                    handleChange={(obj) => {
                                                                                        //if (functionselected != undefined) {
                                                                                        updatingObjectFunction(
                                                                                            k1,
                                                                                            obj.value,
                                                                                            key
                                                                                        );
                                                                                        setSalaries(obj.salary);
                                                                                        updatingObjectfunctionSlary(
                                                                                            k1,
                                                                                            obj.salary,
                                                                                            key
                                                                                        );
                                                                                        //	}
                                                                                    }}
                                                                                    isMulti={false}
                                                                                    className="col-md-6 select_option_height"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="error 2 ps-5 ms-5 my-2"
                                                                            style={{ color: 'red' }}
                                                                        >
                                                                            {v1['functioniderror']}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            ))
                                                        );
                                                    })}
                                                {v1['warning'] != '' && (
                                                    <div
                                                        className="py-2"
                                                        style={{ color: 'red', paddingLeft: '130px' }}
                                                    >
                                                        <ExclamationTriangle /> {v1['warning']}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                            
                                        ))}
                                        </div>
                                        </div>
                                )

                                )}
							</div>
						</div>
						<div className="row m-0 my-4">
							<div className="text-start col-md-6 p-0 align-items-center d-flex">
								<button
									type="button"
									className="bg-white border-0 poppins-light-19px btn-block float-sm-right  md-5 add-proj-btn text-decoration-underline"
									onClick={() => router.push('/planning/employees/' + router.query.p_unique_key)}
								>
									BACK
								</button>
							</div>
							<div className="text-end col-md-6 p-0">
								<button
									type="sumit"
									className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-light-19px-next-button"
									onClick={() => submit}
								>
									NEXT
								</button>
							</div>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default AddFunctions;