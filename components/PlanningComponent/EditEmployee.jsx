import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';
import { fetchEmpDetails,updateEmployeePlanning } from '../../Services/ApiEndPoints';


function EditEmployee(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;
	// console.log(p_unique_key);
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

	const [ data, setData ] = useState({});

	useEffect(() => {

		setData(props.data);
		console.log(props)
	}, [props]);


	useEffect(() => {
		
		if(data.id != undefined){
			APICALL.service(fetchEmpDetails + data.id, 'GET')
				.then((result) => {
					console.log(result.data)
					setFunctions(result.data[0]);
					setEmptypes(result.data[1])
				})
				.catch((error) => {
					console.error(error);
				});
		}
		// 
		// alert("check")
	}, [data]);
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
			postdata();
		}
	};

	let postdata = ()=>{
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

	}

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
		if(error1['employee_name'] =='' && error1['employee_type'] =='' && error1['function'] == '' && error1['minimum_salary'] =='' && error1['start_time'] == '' && error1['end_time'] ==''){
			return true;
		}else{
			return false;
		}
	};

	let updatetime = (e,date,type) => {
		var data1 = data;
		if(type == 'starttime'){
			data1.starttime = moment(e).format('YYYY-MM-DD HH:mm:ss');
			setData(data1);
		}else{
			data1.endtime = moment(e).format('YYYY-MM-DD HH:mm:ss');
			setData(data1);
		}

	}

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
							value={data.employee_name}
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
							value={data.emp_type}
							onChange={(e) => {
								setData((prev) => ({ ...prev, emp_type: e.target.value }));
							}}
						>
							<option>--Select--</option>
							{emptypes.map((options) => (
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
							value={data.function_id}
							onChange={(e) => {
								setData((prev) => ({ ...prev, function_id: e.target.value }));
							}}
						>
							<option>--Select--</option>
							{functions.map((options) => (
								<option key={options.id} value={options.id}>
									{options.name}
								</option>
							))}
						</select>
						<p className="error  mt-2 mb-2">{error_function}</p>

						<label className="mb-3 custom_astrick poppins-regular-16px">Minimum salary</label>
						<div className="input-group mb-4">
							<input
								type="text"
								className="form-control rounded-0"
								value={data.salary}
								onChange={(e) => {
									setData((prev) => ({ ...prev, salary: e.target.value }));
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
								format="HH:mm"
								value={data.starttime? moment(data.starttime):null}

								onChange={(e) => {
									updatetime(e,data.pdate,'starttime');
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
								format="HH:mm"
								value={data.endtime?moment(data.endtime):null}
								onChange={(e) => {
									updatetime(e,data.pdate,'starttime');
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
