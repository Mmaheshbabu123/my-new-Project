import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';
import { fetchEmpDetails, updateEmployeePlanning } from '../../Services/ApiEndPoints';
import Translation from '@/Translation';
import MultiSelectField from '@/atoms/MultiSelectField';

function EditEmployee(props) {
	const { t} = props;
	const router = useRouter();
	const { p_unique_key } = router.query;
	const [ company, setCompany ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);

	const [ time, setTime ] = useState('');
	const [ error_employee_name, setError_employee_name ] = useState('');
	const [ error_employee_type, setError_employee_type ] = useState('');
	const [ error_function, setError_function ] = useState('');
	const [ error_minimum_salary, setError_minimum_salary ] = useState('');
	const [ error_start_time, setError_start_time ] = useState('');
	const [ error_end_time, setError_end_time ] = useState('');

	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			console.log(props.data);
			setData(props.data);
		},
		[ props ]
	);

	useEffect(
		() => {
			if (data.length > 0 && data[0].pef_id != undefined && props) {
				APICALL.service(fetchEmpDetails + data[0].pef_id, 'GET')
					.then((result) => {
						console.log(data);
						console.log("check")
						console.log(result.data);
						setFunctions(result.data[0]);
						setEmptypes(result.data[1]);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ data ]
	);
	/**
	 * Submit function
	 * @param {*} res 
	 * @returns 
	 */
	let submit = async (event) => {
		event.preventDefault();
		var valid_res = validate(data);
		if (valid_res) {
			postdata();
		}
	};

	let postdata = () => {
		APICALL.service(updateEmployeePlanning, 'POST', data)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					props.childtoparent();
				} else if (result.status == 205) {
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	let validate = (res) => {
		// console.log(res);
		var error1 = [];
		/**
		 * check if required fields are empty
		 */
		error1['employee_name'] = ValidationService.emptyValidationMethod(res.employee_name);
		error1['employee_type'] = ValidationService.emptyValidationMethod(res.emp_type);
		error1['function'] = ValidationService.emptyValidationMethod(res.function_id);
		error1['minimum_salary'] = ValidationService.emptyValidationMethod(res.salary);
		error1['start_time'] = ValidationService.emptyValidationMethod(res.starttime);
		error1['end_time'] = ValidationService.emptyValidationMethod(res.endtime);

		/**
		 * check if employee name is valid
		 */
		error1['employee_name'] =
			error1['employee_name'] == ''
				? ValidationService.projectNameValidationMethod(res.employee_name)
				: error1['employee_name'];
		/**
		 * Check if minimum salary is valid
		 */
		error1['minimum_salary'] =
			error1['minimum_salary'] == ''
				? ValidationService.minSalaryValidationMethod(res.salary)
				: error1['minimum_salary'];
		/**
		 * seterror messages
		 */
		setError_employee_name(error1['employee_name']);
		setError_employee_type(error1['employee_type']);
		setError_function(error1['function']);
		setError_minimum_salary(error1['minimum_salary']);
		setError_start_time(error1['start_time']);
		setError_end_time(error1['end_time']);
		console.log(error1);
		if (
			error1['employee_name'] == '' &&
			error1['employee_type'] == '' &&
			error1['function'] == '' &&
			error1['minimum_salary'] == '' &&
			error1['start_time'] == '' &&
			error1['end_time'] == ''
		) {
			return true;
		} else {
			return false;
		}
	};

	let updatetime = (e, date, type) => {
		var data1 = data;
		if (type == 'starttime') {
			data1.starttime = moment(e).format('YYYY-MM-DD HH:mm:ss');
			setData(data1);
		} else {
			data1.endtime = moment(e).format('YYYY-MM-DD HH:mm:ss');
			setData(data1);
		}
	};

	return (
		<div className="container-fluid p-0">
			<form onSubmit={(e) => submit(e)}>
				<div className="row  m-0 ">
					<div className=" mb-1 text-center align-items-center justify-content-center text-white d-flex poppins-medium-18px skyblue-bg-color height-edit-employee py-3">
						<p>{t('Edit Employee')}</p>
					</div>
					<div className="table-border-gray p-3 edit_employee_table mb-3">
						<div className="form-group ">
							<label className="custom_astrick poppins-light-16px">{t('Employee name')}</label>
							<input
								type="text"
								disabled
								className="form-control mt-1 poppins-light-16px rounded-0 mb-4 shadow-none"
								value={data.length>0 ?data[0].employee_name:''}
								onChange={(e) => {
									setData((prev) => ({ ...prev, employee_name: e.target.value }));
								}}
							/>
						</div>
						<div className="form-group ">
							<label className="custom_astrick poppins-light-16px">{t('Employee type')}</label>
							<MultiSelectField
								placeholder={t('Select')}
								id={'select_id'}
								options={emptypes}
								disabled={false}
								standards={emptypes.filter(val => val.value === data[0].emp_type)}
								className="mt-1 poppins-light-16px mb-4 shadow-none custom-select"
								// handleChange={(obj) => updateEmployeeType(k1, obj, key)}
								isMulti={false}
							/>
							<p className="error  mt-2 mb-2">{error_employee_type}</p>
						</div>
						<div className="form-group ">
							<label className="custom_astrick poppins-light-16px">{t('Function')}</label>
						<MultiSelectField
								placeholder={t('Select')}
								id={'functions_id'}
								options={functions}
								disabled={false}
								standards={functions.filter(val => val.value === data[0].function_id)}

								// handleChange={(obj) => updateEmployeeType(k1, obj, key)}
								isMulti={false}
								className="mt-1 poppins-light-16px mb-4 shadow-none custom-select"
							/>
						</div>
						<div className="form-group ">
						<label className="custom_astrick poppins-light-16px">{t('Minimum salary')}</label>
						<div className="input-group mb-4 min-salary-form-control mt-1">
							<input
								type="text"
								className="form-control rounded-0 shadow-none "
								value={data.length>0?data[0].salary:''}
								onChange={(e) => {
									setData((prev) => ({ ...prev, salary: e.target.value }));
								}}
							/>
							<span className="input-group-text rounded-0 salary-edit-employee">€</span>
						</div>
						<p className="error mt-2 mb-2">{error_minimum_salary}</p>
						</div>

						<div className="d-flex col-md-12 row m-0 ">
							<div className=" col-md-6 ps-0  ">
								<div className="pb-1 custom_astrick poppins-light-16px rounded-0">
									{t('Start time')}
								</div>
								<TimePicker
									className="rounded-0"
									placeholder="Select Time"
									use12Hours
									showSecond={false}
									focusOnOpen={true}
									format="HH:mm"
									value={data.length>0 && data[0].starttime ? moment(data[0].starttime) : null}
									onChange={(e) => {
										updatetime(e, data.pdate, 'starttime');
									}}
								/>
								<p className="error mt-2 mb-2 ">{error_start_time}</p>
							</div>
							<div className="col-md-6  p-0">
								<div className="pb-1 custom_astrick poppins-light-16px">{t('End time')}</div>
								<TimePicker
									className="rounded-0"
									placeholder="Select Time"
									use12Hours
									showSecond={false}
									focusOnOpen={true}
									format="HH:mm"
									value={data.length>0 && data[0].endtime ? moment(data[0].endtime) : null}
									onChange={(e) => {
										updatetime(e, data.pdate, 'starttime');
									}}
								/>
								<p className="error mt-3">{error_end_time}</p>
							</div>
						</div>

						<div className="text-end">
							<button
								type="submit"
								className="btn rounded-0 custom-btn px-3 btn-block float-end poppins-medium-18px-next-button"
								onClick={() => {
									setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
								}}
							>
								{t('SAVE')}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default React.memo(
	Translation(EditEmployee, [
		'Edit Employee',
		'Employee name',
		'Employee type',
		'--Select--',
		'Function',
		'Minimum salary',
		'Start time',
		'End time',
		'SAVE'
	])
);
