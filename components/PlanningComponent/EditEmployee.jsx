import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import ValidationService from '../../Services/ValidationService';

function EditEmployee(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;
	// console.log(p_unique_key);
	const [ company, setCompany ] = useState([]);
	const [ time, setTime ] = useState('');
	const [ error_employee_name, setError_employee_name ] = useState('');
	const [ error_employee_type, setError_employee_type ] = useState('');
	const [ error_function, setError_function ] = useState('');
	const [ error_minimum_salary, setError_minimum_salary ] = useState('');
	const [ error_start_time, setError_start_time ] = useState('');
	const [ error_end_time, setError_end_time ] = useState('');

	const [ data, setData ] = useState({
		employee_name: '',
		employee_type: '',
		function: '',
		minimum_salary: '',
		start_time: '',
		end_time: ''
	});
	/**
	 * Submit function
	 * @param {*} res 
	 * @returns 
	 */
	let submit = async (event) => {
		event.preventDefault();

		// console.log(data);
		// APICALL.service(addProject, 'POST', data).then((result) => {
		// 	console.log(result);
		// });
		var valid_res = validate(data);
		if (valid_res) {
		}
	};

	const employeetype = [
		{
			value: '01',
			label: 'employee type1',
			function: 'function1'
		},
		{
			value: '02',
			label: 'employee type2',
			function: 'function2'
		},
		{
			value: '03',
			label: 'employee type3',
			function: 'function3'
		},
		{
			value: '04',
			label: 'employee type4',
			function: 'function4'
		}
	];

	let validate = (res) => {
		// console.log(res);
		var error1 = [];
		/**
		 * check if required fields are empty
		 */
		error1['employee_name'] = ValidationService.emptyValidationMethod(res.employee_name);
		error1['employee_type'] = ValidationService.emptyValidationMethod(res.employee_type);
		error1['function'] = ValidationService.emptyValidationMethod(res.function);
		error1['minimum_salary'] = ValidationService.emptyValidationMethod(res.minimum_salary);
		error1['start_time'] = ValidationService.emptyValidationMethod(res.start_time);
		error1['end_time'] = ValidationService.emptyValidationMethod(res.end_time);

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
				? ValidationService.minSalaryValidationMethod(res.minimum_salary)
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
	};

	return (
		<div className="container-fluid p-0">
			<div className='empty-sec'></div>
			<form onSubmit={(e) => submit(e)}>
				<div className="row  m-0 ">
				
					<p className=" mb-2 h4 height-60 text-center align-items-center justify-content-center text-white d-flex">Edit Employee</p>
					<div className='table-border-gray p-4'>
					<div className="form-group ">
						<label className="mb-2 custom_astrick poppins-regular-16px">Employee name</label>
						<input
							type="text"
							className="form-control mb-2 poppins-regular-16px rounded-0 mb-4"
							defaultValue=""
							onChange={(e) => {
								setData((prev) => ({ ...prev, employee_name: e.target.value }));
							}}
						/>
						<p className="error  mt-2 mb-2">{error_employee_name}</p>

						<label className=" mb-2 custom_astrick poppins-regular-16px">Employee type</label>
						{/* <input
							type="text"
							className="form-select mb-2"
							defaultValue=""
							onChange={(e) => {
								setData((prev) => ({ ...prev, employee_type: e.target.value }));
							}}
						/> */}
						<select
							className="form-select mt-2 mb-2 custom-select poppins-regular-16px rounded-0 mb-4 "
							onChange={(e) => {
								setData((prev) => ({ ...prev, employee_type: e.target.value }));
							}}
						>
							<option>--Select--</option>
							{employeetype.map((options) => (
								<option key={options.value} value={options.value}>
									{options.label}
								</option>
							))}
						</select>
						<p className="error  mt-2 mb-2">{error_employee_type}</p>

						<label className=" mb-2 custom_astrick poppins-regular-16px">Function</label>
						{/* <input
							type="text"
							className="form-select mb-2"
							defaultValue=""
							onChange={(e) => {
								setData((prev) => ({ ...prev, function: e.target.value }));
							}}
						/> */}
						<select
							className="form-select mt-2 mb-2 custom-select poppins-regular-16px  rounded-0 mb-4"
							onChange={(e) => {
								setData((prev) => ({ ...prev, employee_type: e.target.value }));
							}}
						>
							<option>--Select--</option>
							{employeetype.map((options) => (
								<option key={options.value} value={options.function}>
									{options.function}
								</option>
							))}
						</select>
						<p className="error  mt-2 mb-2">{error_function}</p>

						<label className="mb-3 custom_astrick poppins-regular-16px">Minimum salary</label>
						<div className="input-group mb-4">
							<input
								type="text"
								className="form-control rounded-0"
								onChange={(e) => {
									setData((prev) => ({ ...prev, minimum_salary: e.target.value }));
								}}
							/>
							<span className="input-group-text rounded-0">€</span>
						</div>
						<p className="error mt-2 mb-2">{error_minimum_salary}</p>
					</div>
					<div className="d-flex col-md-12 row m-0 ">
						<div className=" col-md-6 ps-0  ">
							<div className="pb-2 custom_astrick poppins-regular-16px rounded-0">Start time</div>
							<TimePicker
								className='rounded-0'
								placeholder="Select Time"
								use12Hours
								showSecond={false}
								focusOnOpen={true}
								format="hh:mm A"
								// onChange={(e) => setTime(e.format('LT'))}
								onChange={(e) => {
									setData((prev) => ({ ...prev, start_time: e.target.value }));
								}}
							/>
							<p className="error mt-2 mb-2 ">{error_start_time}</p>
						</div>
						<div className="col-md-6  p-0">
							<div className="pb-2 custom_astrick">End time</div>
							<TimePicker
							    className='rounded-0'
								placeholder="Select Time"
								use12Hours
								showSecond={false}
								focusOnOpen={true}
								format="hh:mm A"
								// onChange={(e) => setTime(e.format('LT'))}
								onChange={(e) => {
									setData((prev) => ({ ...prev, end_time: e.target.value }));
								}}
							/>
							<p className="error mt-3">{error_end_time}</p>
						</div>
					
					</div>
					
				
				<div className="text-end  mt-2">
					<button
						type="submit"
						className="btn rounded-0  custom-btn px-3  btn-block float-end "
						onClick={() => {
							setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
						}}
					>
						SAVE
					</button>
				</div>
				</div>
				</div>
			</form>
		</div>
	);
}
export default EditEmployee;
