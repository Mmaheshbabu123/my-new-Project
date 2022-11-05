import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { fetchPlanningFunction } from '../../Services/ApiEndPoints';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import Image from 'next/image';
import Age15 from '../../public/images/Age_15.svg';
import Age16 from '../../public/images/Age_16.svg';
import Age17 from '../../public/images/Age_17.svg';
import Age18 from '../../public/images/Age_18.svg';
import Age19 from '../../public/images/Age_19.svg';
import Age20 from '../../public/images/Age_20.svg';
import MultiSelectField from '@/atoms/MultiSelectField';
import ValidationService from '../../Services/ValidationService';
import { ExclamationTriangle } from 'node_modules/react-bootstrap-icons/dist/index';
import Translation from '@/Translation';

const AddFunctions = (props) => {
	const { t } = props;
	const router = useRouter();
	const salaryref = useRef(null);
	const [ loading, setLoading ] = useState(true);
	const [ ischecked, setIsChecked ] = useState(false);
	const [ employeeobject, setEmployeeObject ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ flexSalary, setFlexSalary ] = useState('');

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(fetchPlanningFunction + p_unique_key, 'GET')
				.then((result) => {
					if (result.status == 200) {
						console.log(result.data);
						updateEmployeeObject(result.data[0]);
						setIsChecked(result.data[1]);
						setFlexSalary(result.data[2]);
					}
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	const updateEmployeeObject = (data) => {
		data.map((val, key) => {
			val.employee_list.map((val2, key2) => {
				if (val2.function_salary != null && val2.age < val.pc_min_age) {
					val.pcAge.map((val3, key3) => {
						if (val2.age == val3.type + 14) {
							var sal_percent = parseFloat(val3.min_sal_percent);
							var sal = sal_percent / 100 * val2.function_salary;
							if (sal - Math.floor(sal) !== 0) {
								sal = parseFloat(sal).toFixed(4);
							}
							data[key].employee_list[key2].function_salary = parseFloat(sal);
							if (parseFloat(val2.salary) == parseFloat(sal)) {
								data[key].employee_list[key2].salary = null;
							}
						}
					});
				}
			});
		});

		setEmployeeObject(data);
	};

	const submit = (e) => {
		e.preventDefault();
		var p_unique_key = router.query.p_unique_key;

		let errors = validateErrors();

		if (errors != 0) {
			console.log('errors are there');
		} else {
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/storeFunctionEmptypeSalary/' + p_unique_key,
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

	const employeTypeSelection = (val, employee_types) => {
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

	let updateEmployeeType = (index = null, obj, parent_index) => {
		var object = [ ...employeeobject ];
		console.log(object[parent_index]);
		if (index !== null) {
			object[parent_index].employee_list[index].emp_type = obj.value;
			if (object[parent_index].flexEmpTypes.includes(obj.value)) {
				object[parent_index].employee_list[index].function_salary = object[parent_index].flexSalary;
			} else if(object[parent_index].employee_list[index].funid == '')
			{
				object[parent_index].employee_list[index].function_salary = '';
			}
			setEmployeeObject(object);
		}
	};

	function isThere(index = 0, functionid, parent_index) {
		var object = [ ...employeeobject ];
		var temp = false;
		if (functionid == 'drop') {
			return true;
		}
		object[parent_index].employee_list[index].functionslist
			.slice(3, object[parent_index].employee_list[index].functionslist.length)
			.map((element) => {
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

	function defultFunction(index = null, funcid, parent_index) {
		var object = [ ...employeeobject ];
		var options = [];
		var opt = {
			value: '',
			label: ''
		};
		object[parent_index].employee_list[index].functionslist
			.slice(3, object[parent_index].employee_list[index].functionslist.length)
			.map((value) => {
				if (value.id == funcid) {
					opt.value = value.id;
					opt.label = value.name;
					opt.salary = value.salary;
				}
			});
		options[index] = opt;

		return options;
	}

	let updateCollapseState = (index = null, val, parent_index) => {
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

	async function updatingObjectradiobutton(index = null, status, parent_index) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].radioactive = status;
			setEmployeeObject(object);
		} else {
			object[parent_index].employee_list.map((element, key) => {
				object[parent_index].employee_list[key].radioactive = status;
			});
			setEmployeeObject(object);
		}
	}

	function updatingObjectFunction(index = null, funcid, parent_index) {
		var object = [ ...employeeobject ];
		if (index !== null) {
			object[parent_index].employee_list[index].funid = funcid;
			object[parent_index].employee_list[index].salary = null;
			object[parent_index].employee_list[index].warning = '';
			object[parent_index].employee_list[index].salaryerror = '';
			funcid == 'drop' ? (object[parent_index].employee_list[index].function_salary = null) : '';
			setEmployeeObject(object);
		} else {
			object[parent_index].employee_list.map((element, key) => {
				object[parent_index].employee_list[key].funid = index != null ? Number(funcid) : funcid;
				object[parent_index].employee_list[key].salary = null;
				object[parent_index].employee_list[key].warning = '';
				object[parent_index].employee_list[key].salaryerror = '';
				funcid == 'drop' ? (object[parent_index].employee_list[key].function_salary = null) : '';
			});
			setEmployeeObject(object);
		}
	}

	let updateSalary = (index = null, maxsal, salary, parent_index, pc_min_age) => {
		salary = parseFloat(salary.replace(',', '.').replace(/\s/g, ''));
		maxsal = maxsal != undefined ? parseFloat(maxsal.replace(',', '.').replace(/\s/g, '')) : maxsal;
		var object = [ ...employeeobject ];
		var sal_percent = 100;
		var sal = '';
		if (index !== null) {
			if (object[parent_index].employee_list[index].age < pc_min_age) {
				object[parent_index].pcAge.map((val, key) => {
					if (object[parent_index].employee_list[index].age == val.type + 14) {
						sal_percent = parseFloat(val.min_sal_percent.replace(',', '.').replace(/\s/g, ''));
						sal = sal_percent / 100 * salary;
						if (sal - Math.floor(sal) !== 0) {
							sal = parseFloat(sal).toFixed(4);
						}
						object[parent_index].employee_list[index].function_salary =
							maxsal != undefined ? (maxsal > sal ? maxsal : sal) : sal;
					}
				});
			} else {
				object[parent_index].employee_list[index].function_salary =
					maxsal != undefined && maxsal > salary ? maxsal : salary;
			}

			setEmployeeObject(object);
		} else {
			const newState = object.map((element) => {
				return { ...element, function_salary: parseFloat(salary.replace(',', '.').replace(/\s/g, '')) };
			});
			setEmployeeObject(newState);
		}
	};

	let updateRes = (event, key) => {
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

	function updatingObjectfunctionSlary(index = null, maxsal, salary, parent_index, pc_min_age) {
		salary = parseFloat(salary.replace(',', '.').replace(/\s/g, ''));
		var object = [ ...employeeobject ];
		if (index != null) {
			if (object[parent_index].employee_list[index].age < pc_min_age) {
				object[parent_index].pcAge.map((val, key) => {
					if (object[parent_index].employee_list[index].age == val.type + 14) {
						var sal_percent = parseFloat(val.min_sal_percent);
						var sal = sal_percent / 100 * salary;
						if (sal - Math.floor(sal) !== 0) {
							sal = parseFloat(sal).toFixed(4);
						}
						object[parent_index].employee_list[index].function_salary =
							maxsal != undefined
								? parseFloat(maxsal) > parseFloat(sal) ? parseFloat(maxsal) : parseFloat(sal)
								: parseFloat(sal);
					}
				});
			} else {
				object[parent_index].employee_list[index].function_salary = salary;
				setEmployeeObject(object);
			}
		} else {
			object.map((element, key) => {
				object[key].function_salary = salary != null ? salary : salary;
			});
			setEmployeeObject(object);
		}
	}

	function validateErrors() {
		let count = 0;
		const newstate = [ ...employeeobject ];
		newstate.map((v1, k1) => {
			v1.employee_list.map((value, key) => {
				let func = '';
				let sal = '';
				let sal1 = '';
				let emp = '';

				if (value.emp_type == '' || value.emp_type == null) {
					emp = t('This field is required.');
					count++;
				}

				if (value.funid == '' || value.funid == null || value.funid == 'drop') {
					func = t('This field is required.');
					count++;
				} else {
					func = '';
					if (value.salary == '' || value.salary == null || value.salary == undefined) {
						// if (count == 0) {
						// 	value.salary = value.function_salary;
						// }
					} else {
						sal1 = ValidationService.minSalaryValidationMethod(value.salary.toString().replace(/\s/g, ''));
						if (sal1 != '') {
							count++;
						}
						let rsalary = String(value.salary).replace(',', '.').replace(/\s/g, '');
						let rfsalary = String(value.function_salary).replace(',', '.').replace(/\s/g, '');
						if (sal1 == '' && parseFloat(rsalary) < parseFloat(rfsalary)) {
							sal =
								t(
									'The new salary cannot be lesser than the minimum salary. The minimum salary for the selected function is '
								) +
								value.function_salary +
								t(' Euro.');
							count++;
						}
					}
				}

				var collapseOpen = true;
				if (func != '' && func != null && func != undefined) {
					collapseOpen = true;
				}
				if (func == '' && emp == '' && sal == '' && sal1 == '') {
					if (key == 0) {
						collapseOpen = true;
					} else {
						collapseOpen = false;
					}
				}

				newstate[k1].employee_list[key].functioniderror = func;
				newstate[k1].employee_list[key].employeeiderror = emp;
				newstate[k1].employee_list[key].salaryinvalid = sal1;
				newstate[k1].employee_list[key].salaryerror = sal;
				newstate[k1].employee_list[key].collapseOpen = collapseOpen;
			});
		});
		setEmployeeObject(newstate);
		return count;
	}

	function setsaalary(index, e, parent_index) {
		var object = [ ...employeeobject ];
		let value = e.target.value;
		if (value != '') {
			let rsalary = String(value).replace(',', '.').replace(/\s/g, '');
			let rfsalary = String(object[parent_index].employee_list[index].function_salary).replace(/\s/g, '');
			let err = ValidationService.minSalaryValidationMethod(value.replace(/\s/g, ''));
			if (err == '') {
				if (parseFloat(rsalary) > parseFloat(rfsalary)) {
					object[parent_index].employee_list[index].warning = t(
						'We notice that you have added a salary which is higher than the minimum salary and therefore this new salary will be considered as the minimum salary for all the future planning for this employee for the selected function. You can click on next to proceed further.'
					);
					object[parent_index].employee_list[index].salaryerror = '';
				} else {
					object[parent_index].employee_list[index].warning = '';
				}
			} else {
				object[parent_index].employee_list[index].warning = '';
			}
			updatingObjectSlary(index, value, parent_index);
		} else {
			updatingObjectSlary(index, value, parent_index);
		}
	}

	function updatingObjectSlary(index = null, salary, parent_index) {
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

		object.map((ele1, key1) => {
			if (object != undefined) {
				ele1.employee_list.map((element, key) => {
					object[key1].employee_list[key].emp_type = null;
					object[key1].employee_list[key].funid = null;
					object[key1].employee_list[key].salary = null;
					object[key1].employee_list[key].function_salary = null;
					object[key1].employee_list[key].employeeiderror = '';
					object[key1].employee_list[key].functioniderror = '';
					object[key1].employee_list[key].salaryerror = '';
					object[key1].employee_list[key].salaryinvalid = '';
					object[key1].employee_list[key].radioactive = false;
				});
				if (object.length != 0) {
					setEmployeeObject(object);
					setSelectedOption({ value: 0, label: '-Select-' });
				}
			}
		});
	};

	function updatingCommonObjectfunctionSlary(funcid, salary, parent_index, pc_min_age) {
		salary = parseFloat(salary.replace(',', '.').replace(/\s/g, ''));
		var object = [ ...employeeobject ];

		var sal_percent = 100;
		var sal = '';
		object[parent_index].employee_list.map((element, key) => {
			if (object[parent_index].employee_list[key].age < pc_min_age) {
				object[parent_index].pcAge.map((val) => {
					if (object[parent_index].employee_list[key].age == val.type + 14) {
						sal_percent = parseFloat(val.min_sal_percent);
						sal = sal_percent / 100 * salary;
						if (sal - Math.floor(sal) !== 0) {
							sal = parseFloat(sal).toFixed(4);
						}
						var temp2 = '';
						object[parent_index].employee_list[key].functionslist.map((element1) => {
							element1.max != undefined ? (element1.id == funcid ? (temp2 = element1.max) : '') : '';
						});
						object[parent_index].employee_list[key].function_salary =
							temp2 != ''
								? parseFloat(temp2) > parseFloat(sal) ? parseFloat(temp2) : parseFloat(sal)
								: parseFloat(sal);
					}
				});
			} else {
				var temp = '';
				object[parent_index].employee_list[key].functionslist.map((element1) => {
					element1.max != undefined ? (element1.id == funcid ? (temp = element1.max) : '') : '';
				});
				object[parent_index].employee_list[key].function_salary = temp != '' ? temp : salary;
			}
		});
		setEmployeeObject(object);
	}

	let showCheckbox = () => {
		var data = [ ...employeeobject ];
		var count = 0;
		data.map((val, key) => {
			if (val.employee_list.length > 1) {
				count++;
				return true;
			}
		});
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	};

	var selectnchecked = false;

	return (
		<div className="col-md-12">
			<form onSubmit={(e) => submit(e)}>
				<div />
				<div className="col-md-12 p-0 position-sticky-pc py-4">
					<p className="pb-3 font-weight-bold px-0 bitter-italic-normal-medium-24">{t('Add function')}</p>
				</div>

				{loading == true ? (
					<div>{t('Loading...')}</div>
				) : (
					<div>
						<div className="row">
							<div className="col-md-12">
								<div className="min-hei-addfun add_function">
									{showCheckbox() && (
										<div className="form-check rounded-0 mb-3 align-items-center d-flex">
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
												{t('Same functions for all employees')}
											</label>
										</div>
									)}
									<div className="row">
										{employeeobject != undefined &&
											employeeobject.map((emplist, key) => (
												<div type="1" className="pt-2 col-md-12" key={key}>
													<div className="py-2 poppins-medium-18px text-capitalize">
														{emplist.pc}
													</div>
													<div className="border-secondary mb-2 p-1">
														{emplist.employee_list.map((v1, k1) => (
															<div key={v1.emp_id}>
																<div className="row mb-2">
																	<div className="col-md-12 px-2">
																		<div className="bg-4C4D550F">
																			<div className="row">
																				<div className="col-md-1 poppins-light-18px align-self-center text-center">
																					{ischecked ? (
																						k1 + 1
																					) : v1['collapseOpen'] == false ? (
																						<FaRegPlusSquare
																							onClick={() =>
																								updateCollapseState(
																									k1,
																									v1['collapseOpen'],
																									key
																								)}
																						/>
																					) : (
																						<FaRegMinusSquare
																							onClick={() =>
																								updateCollapseState(
																									k1,
																									v1['collapseOpen'],
																									key
																								)}
																						/>
																					)}
																				</div>
																				<div className="col-md-3 p-1 poppins-light-18px align-self-center">
																					<div>
																						{v1['employeename']}{' '}
																						<span
																							className="ageicon"
																							data-toggle="tooltip"
																							title="Age"
																						>
																							{v1['age'] != 0 &&
																								v1['age'] <
																									emplist.pc_min_age &&
																								{
																									'15': (
																										<Image
																											src={Age15}
																											width={25}
																											height={25}
																										/>
																									),
																									'16': (
																										<Image
																											src={Age16}
																											width={25}
																											height={25}
																										/>
																									),
																									'17': (
																										<Image
																											src={Age17}
																											width={25}
																											height={25}
																										/>
																									),
																									'18': (
																										<Image
																											src={Age18}
																											width={25}
																											height={25}
																										/>
																									),
																									'19': (
																										<Image
																											src={Age19}
																											width={25}
																											height={25}
																										/>
																									),
																									'20': (
																										<Image
																											src={Age20}
																											width={25}
																											height={25}
																										/>
																									)
																								}[v1['age']]}
																						</span>
																					</div>
																				</div>

																				<div className="col-md-8">
																					<div className="row">
																						<div className="col-md-6  pt-2 border-0 custom-drop-btn add_function_dropdown">
																							{emplist.employee_types !=
																							null ? (
																								<MultiSelectField
																									placeholder={t(
																										'Select employee type'
																									)}
																									id={'select_id'}
																									options={
																										emplist.employee_types
																									}
																									standards={
																										v1[
																											'emp_type'
																										] == 0 ? (
																											''
																										) : (
																											employeTypeSelection(
																												v1[
																													'emp_type'
																												],
																												emplist.employee_types
																											)
																										)
																									}
																									disabled={false}
																									handleChange={(
																										obj
																									) =>
																										updateEmployeeType(
																											k1,
																											obj,
																											key
																										)}
																									isMulti={false}
																									className="col-md-12 "
																								/>
																							) : (
																								''
																							)}{' '}
																							{
																								<div
																									style={{
																										color: 'red'
																									}}
																									className="error_text mt-2"
																								>
																									{
																										v1[
																											'employeeiderror'
																										]
																									}
																								</div>
																							}
																						</div>
																						<div className="col-md-3 pt-2 border-0">
																							{v1['function_salary'] !=
																							null ? (
																								<div className="poppins-medium-18px bg-white function_salary_height d-flex align-items-center">
																									<span
																										className="input-group-text border-0 poppins-medium-18px rounded-0 shadow-none me-2"
																										style={{
																											width:
																												'38px'
																										}}
																									>
																										{'€ '}
																									</span>
																									{
																										v1[
																											'function_salary'
																										]
																									}
																								</div>
																							) : (
																								<div className="poppins-medium-18px bg-white d-none">
																									<span className="input-group-text border-0 poppins-medium-18px rounded-0 shadow-none">{'€ '}</span>{' '}
																									{v1['function_salary']}
																								</div>
																							)}
																						</div>
																						<div className="col-md-3 pt-2 add_function_salary pe-4">
																							<div>
																								{v1[
																									'function_salary'
																								] != null && (
																									<div className="input-group">
																										<span className="input-group-text border-0 poppins-medium-18px rounded-0 shadow-none">
																											€
																										</span>
																										<input
																											ref={
																												salaryref
																											}
																											type="textfield"
																											name="salary"
																											placeholder={t(
																												'salary'
																											)}
																											//((v1['salary'] !=v1['function_salary'])||(salChanged == true))?
																											value={
																												v1[
																													'salary'
																												] !=
																												null ? (
																													v1[
																														'salary'
																													]
																												) : (
																													''
																												)
																											}
																											className="form-control bg-white border-0 poppins-medium-18px rounded-0 shadow-none"
																											onChange={(
																												e
																											) => {
																												setsaalary(
																													k1,
																													e,
																													key
																												);
																												// setSalChanged(true);
																											}}
																										/>
																									</div>
																								)}

																								<p
																									style={{
																										color: 'red'
																									}}
																									className="error_text mt-2"
																								>
																									{
																										v1[
																											'salaryinvalid'
																										]
																									}
																								</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				{!ischecked &&
																					v1['functionslist'] != undefined &&
																					v1[
																						'functionslist'
																					].map((deta, ind) => {
																						{
																							var group =
																								'function' + ind;
																						}
																						{
																							!ischecked
																								? (group =
																										v1['emp_id'] +
																										'function' +
																										ind)
																								: '';
																						}
																						return (
																							v1['collapseOpen'] &&
																							(ind <= 2 ? (
																								<div className="col-md-11 mx-auto row mt-3 position-relative pe-0">
																									<div
																										className="mt-2 mb-2 bg-light h-75 py-2 bg-4C4D550F z-999 px-0 fun-line col ms-5"
																										style={{
																											height:
																												'44px'
																										}}
																									>
																										<span className="custom-radio-input">
																											<input
																												type="radio"
																												value={
																													deta[
																														'name'
																													]
																												}
																												name={
																													group
																												}
																												className="p-3"
																												onClick={() => {
																													updatingObjectradiobutton(
																														k1,
																														false,
																														key
																													);
																													updatingObjectFunction(
																														k1,
																														deta[
																															'id'
																														],
																														key
																													);
																													updateSalary(
																														k1,
																														deta[
																															'max'
																														],
																														deta[
																															'salary'
																														],
																														key,
																														emplist.pc_min_age
																													);
																												}}
																												checked={
																													v1[
																														'funid'
																													] ==
																													deta[
																														'id'
																													] ? (
																														(true,
																														(selectnchecked = true))
																													) : (
																														false
																													)
																												}
																												onChange={(
																													e
																												) => {
																													updateRes(
																														e,
																														k1
																													);
																												}}
																											/>
																										</span>
																										<span className="ps-2 poppins-light-18px">
																											{
																												deta[
																													'name'
																												]
																											}
																										</span>
																									</div>
																								</div>
																							) : (
																								ind == 3 && (
																									<div className="col-md-11 mx-auto row m-0 mt-2 position-relative pe-0">
																										<div
																											className="col ms-5 fun-line2 mt-2 mb-2 bg-light py-1 bg-4C4D550F z-999  d-flex align-items-center px-0"
																											style={{
																												height:
																													'44px'
																											}}
																										>
																											<span
																												className="custom-radio-input d-inline-block p-3 "
																												style={{
																													height:
																														'44px'
																												}}
																											>
																												<input
																													type="radio"
																													value={
																														'finaldrop'
																													}
																													style={{
																														display:
																															'inline-block !important'
																													}}
																													name={
																														group
																													}
																													checked={
																														(v1[
																															'funid'
																														] ==
																															'drop' &&
																															true) ||
																														isThere(
																															k1,
																															v1[
																																'funid'
																															],
																															key
																														)
																													}
																													onChange={() => {
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
																												style={{
																													display:
																														'inline-block'
																												}}
																											>
																												<MultiSelectField
																													placeholder={t(
																														'Select function'
																													)}
																													name="employefunctionsall"
																													id={
																														'select_id'
																													}
																													options={getOptions(
																														v1[
																															'functionslist'
																														].slice(
																															3,
																															v1[
																																'functionslist'
																															]
																																.length
																														)
																													)}
																													standards={defultFunction(
																														k1,
																														v1[
																															'funid'
																														],
																														key
																													)}
																													disabled={
																														!isThere(
																															k1,
																															v1[
																																'funid'
																															],
																															key
																														)
																													}
																													handleChange={(
																														obj
																													) => {
																														//if (functionselected != undefined) {
																														updatingObjectFunction(
																															k1,
																															obj.value,
																															key
																														);
																														setSalaries(
																															obj.salary
																														);
																														updatingObjectfunctionSlary(
																															k1,
																															deta[
																																'max'
																															],
																															obj.salary,
																															key,
																															emplist.pc_min_age
																														);
																														//	}
																													}}
																													isMulti={
																														false
																													}
																													className="col-md-6 select_option_height add_function_height"
																												/>
																											</div>
																										</div>
																										<div
																											className="error error_text 2 ps-5 ms-5 my-2"
																											style={{
																												color:
																													'red'
																											}}
																										>
																											{
																												v1[
																													'functioniderror'
																												]
																											}
																										</div>
																									</div>
																								)
																							))
																						);
																					})}
																				{(v1['warning'] != '' ||
																					v1['salaryerror'] != '') && (
																					<div
																						className="py-2 error_text"
																						style={{
																							color: 'red',
																							paddingLeft: '130px'
																						}}
																					>
																						{v1['warning'] != '' ? v1[
																							'warning'
																						] != '' ? (
																							<span>
																								<ExclamationTriangle />{' '}
																								{v1['warning']}
																							</span>
																						) : (
																							''
																						) : (
																							v1['salaryerror']
																						)}
																					</div>
																				)}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														))}
														{ischecked &&
															emplist.functions.map((deta, ind) => {
																{
																	var group = 'function';
																}
																{
																	ischecked ? 'function' : '';
																}
																return ind <= 2 ? (
																	<div className="col-md-11	pe-2 ms-auto row position-relative">
																		<div className="mt-2 mb-2 bg-light py-2 bg-4C4D550F z-999 px-0">
																			<span className="custom-radio-input">
																				<input
																					type="radio"
																					value={deta['name']}
																					name={group + ind + deta['id']}
																					className="p-3"
																					onClick={() => {
																						updatingObjectradiobutton(
																							null,
																							false,
																							key
																						);
																						updatingObjectFunction(
																							null,
																							deta['id'],
																							key
																						);
																						updatingCommonObjectfunctionSlary(
																							deta['id'],
																							deta['salary'],
																							key,
																							emplist.pc_min_age
																						);
																						//updateSalary(null, deta['max'] != undefined ? deta['max'] : deta['salary']);
																					}}
																					checked={
																						employeeobject[key]
																							.employee_list[0][
																							'funid'
																						] == deta['id'] ? (
																							true
																						) : (
																							false
																						)
																					}
																					onChange={(e) => {
																						updateRes(e, null);
																					}}
																				/>
																			</span>
																			<span className="ps-2 poppins-light-18px">
																				{' '}
																				{deta['name']}
																			</span>
																		</div>
																	</div>
																) : (
																	ind == 3 && (
																		<div className="col-md-11 ms-auto pe-2 row position-relative">
																			<div
																				className="col fun-line33 mt-2 mb-2 bg-light py-1 bg-4C4D550F z-999 d-flex align-items-center ps-0"
																				style={{ height: '48px' }}
																			>
																				<span
																					className="custom-radio-input d-inline-block p-3 "
																					style={{ height: '48px' }}
																				>
																					<input
																						type="radio"
																						value="drop"
																						style={{
																							display:
																								'inline-block !important'
																						}}
																						name={group + ind + deta['id']}
																						checked={isThere(
																							0,
																							employeeobject[key]
																								.employee_list[0][
																								'funid'
																							],
																							key
																						)}
																						onChange={() => {
																							updatingObjectradiobutton(
																								null,
																								true,
																								key
																							);
																							updatingObjectFunction(
																								null,
																								'drop',
																								key
																							);
																						}}
																						className="p-3 d-inline align-middle"
																					/>
																				</span>
																				<div
																					className="ps-2 w-95per"
																					style={{ display: 'inline-block' }}
																				>
																					<MultiSelectField
																						placeholder={t(
																							'Select function'
																						)}
																						name="employefunctionsall"
																						// id={'select_id'}
																						options={getOptions(
																							emplist.functions.slice(
																								3,
																								emplist.functions.length
																							)
																						)}
																						standards={defultFunction(
																							0,
																							employeeobject[key]
																								.employee_list[0][
																								'funid'
																							],
																							key
																						)}
																						disabled={
																							!isThere(
																								0,
																								employeeobject[key]
																									.employee_list[0][
																									'funid'
																								],
																								key
																							)
																						}
																						handleChange={(obj) => {
																							updatingObjectFunction(
																								null,
																								obj.value,
																								key
																							);
																							updatingCommonObjectfunctionSlary(
																								null,
																								obj.salary,
																								key,
																								emplist.pc_min_age
																							);
																						}}
																						isMulti={false}
																						className="col-md-6 select_option_height add_function_height"
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
																			</div>
																			<div
																				style={{ color: 'red' }}
																				className="error_text mt-2"
																			>
																				{
																					employeeobject[key]
																						.employee_list[0][
																						'functioniderror'
																					]
																				}
																			</div>
																		</div>
																	)
																);
															})}
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className="row m-0 my-4">
							<div className="text-start col-md-6 p-0 align-items-center d-flex">
								<button
									type="button"
									className="bg-white border-0 poppins-light-19px btn-block float-sm-right  md-5 add-proj-btn text-decoration-underline poppins-light-18px text-decoration-underline shadow-none px-0"
									onClick={() => router.push('/planning/employees/' + router.query.p_unique_key)}
								>
									{t('BACK')}
								</button>
							</div>
							<div className="text-end col-md-6 p-0">
								<button
									type="sumit"
									className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
									onClick={() => submit}
								>
									{t('NEXT')}
								</button>
							</div>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default React.memo(
	Translation(AddFunctions, [
		'This field is required.',
		'The new salary cannot be lesser than the minimum salary. The minimum salary for the selected function is ',
		' Euro.',
		'We notice that you have added a salary which is higher than the minimum salary and therefore this new salary will be considered as the minimum salary for all the future planning for this employee for the selected function. You can click on next to proceed further.',
		'Add function',
		'Loading...',
		'Same functions for all employees',
		'Select employee type',
		'salary',
		'Select function',
		'BACK',
		'NEXT'
	])
);
