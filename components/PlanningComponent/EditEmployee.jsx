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
import Close from '../../public/images/Close.svg';
import { MdStarRate } from 'react-icons/md';
import Image from 'next/image';




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
		// var valid_res = validate(data);
		// if (valid_res) {
			postdata();
		// }
	};

	let postdata = () => {
		console.log(data);
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
		return true;
		// console.log(res);
		var count =0;
		var error1 = [];
		res.map((val,key)=>{
			if(key == 0){
				res[0].emp_type_error = ValidationService.emptyValidationMethod(res[0].emp_type);
			// error1['function'] = ValidationService.emptyValidationMethod(res[0].function_id);
			// error1['minimum_salary'] = ValidationService.emptyValidationMethod(res[0].salary);
			// error1['start_time'] = ValidationService.emptyValidationMethod(res[0].starttime);
			// error1['end_time'] = ValidationService.emptyValidationMethod(res[0].endtime);
			}else{

			}
	
		})
		/**
		 * check if required fields are empty
		 */
		// error1['employee_name'] = ValidationService.emptyValidationMethod(res[0].employee_name);
		// error1['employee_type'] = ValidationService.emptyValidationMethod(res[0].emp_type);
		// error1['function'] = ValidationService.emptyValidationMethod(res[0].function_id);
		// error1['minimum_salary'] = ValidationService.emptyValidationMethod(res[0].salary);
		// error1['start_time'] = ValidationService.emptyValidationMethod(res[0].starttime);
		// error1['end_time'] = ValidationService.emptyValidationMethod(res[0].endtime);

		/**
		 * Check if minimum salary is valid
		 */
		// error1['minimum_salary'] =
		// 	error1['minimum_salary'] == ''
		// 		? ValidationService.minSalaryValidationMethod(res.salary)
		// 		: error1['minimum_salary'];
		 res.map((val,key)=>{
			 if(val.emp_type_error == ''){
				 count++;
			 }
		 })
		if (
			count > 0
		) {
			return true;
		} else {
			return false;
		}
	};

	let updatetime = (e, date, type,key) => {
		var data1 = [...data];
		if (type == 'starttime') {
			data1[key].starttime = date + ' ' + moment(e).format('HH:mm') + ':00';
			setData(data1);
		} else {
			data1[key].endtime = date + ' ' + moment(e).format('HH:mm') + ':00';
			setData(data1);
		}
	};

	let addServiceCoupe = () => {
		var res = [...data];
			res.push({
				starttime:'',
				endtime:'',
			});
		setData(res);
	};

	let removeServiceCoupe = () => {
		var res = [...data];
		
				res.splice(1,1);
				setData(res);
	};

	let updateData = (key,obj,type) =>{
		var res = [...data];
		if(key == ''){
		res.map((val,k)=>{
			if(type == 'emp_type'){
			res[k].emp_type = obj.value;
			}
			if(type == 'salary'){
				res[k].salary = obj.target.value;
			}
			if(type == 'function_id'){
				res[k].function_id = obj.value;
			}

		})
	}
	setData(res);

	}

	return (
		<div className="container-fluid p-0">
			<form onSubmit={(e) => submit(e)}>
				<div className="row  m-0 ">
					<div className=" mb-1 text-center align-items-center justify-content-center text-white d-flex poppins-medium-18px skyblue-bg-color height-edit-employee py-3">
						<p>{t('Edit Employee')}</p>
					</div>
					{data.length > 0 ?
					<div className="table-border-gray p-3 edit_employee_table mb-3">
						<div className="form-group ">
							<label className="custom_astrick poppins-light-16px">{t('Employee name')}</label>
							<input
								type="text"
								disabled
								className="form-control mt-1 poppins-light-16px rounded-0 mb-4 shadow-none"
								value={data.length>0 ?data[0].employee_name:''}
								// onChange={(e) => {
								// 	setData((prev) => ({ ...prev, employee_name: e.target.value }));
								// }}
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
								handleChange={(obj) => updateData('', obj,'emp_type')}
								isMulti={false}
							/>
							<p className="error  mt-2 mb-2">{data[0].emp_type_error}</p>
						</div>
						<div className="form-group ">
							<label className="custom_astrick poppins-light-16px">{t('Function')}</label>
						<MultiSelectField
								placeholder={t('Select')}
								id={'functions_id'}
								options={functions}
								disabled={false}
								standards={functions.filter(val => val.value === data[0].function_id)}
								handleChange={(obj) => updateData('', obj,'function_id')}
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
								onChange={(e) => updateData('', e,'salary')}
								// onChange={(e) => {
								// 	setData((prev) => ({ ...prev, salary: e.target.value }));
								// }}
							/>
							<span className="input-group-text rounded-0 salary-edit-employee">€</span>
						</div>
						<p className="error mt-2 mb-2">{error_minimum_salary}</p>
						</div>
						{data.map((val,key)=>(
						<div className="d-flex col-md-12 row m-0 " key={data.paid}>
							

							
							<div className=" col-md-5 ps-0  ">
								<div className="pb-1 custom_astrick poppins-light-16px rounded-0">
									{t('Start time')}
								</div>
								<TimePicker
									className="rounded-0"
									placeholder="Select Time"
									use12Hours={false}
									showSecond={false}
									focusOnOpen={true}
									format="HH:mm"
									value={data.length>0 && val.starttime ? moment(val.starttime) : null}
									onChange={(e) => {
										updatetime(e, val.pdate, 'starttime',key);
									}}
								/>
								<p className="error mt-2 mb-2 ">{error_start_time}</p>
							</div>
							<div className="col-md-5  p-0">
								<div className="pb-1 custom_astrick poppins-light-16px">{t('End time')}</div>
								<TimePicker
									className="rounded-0"
									placeholder="Select Time"
									use12Hours={false}
									showSecond={false}	
									focusOnOpen={true}
									format="HH:mm"
									value={data.length>0 && val.endtime ? moment(val.endtime) : null}
									onChange={(e) => {
										updatetime(e, val.pdate, 'starttime',key);
									}}
								/>
								<p className="error mt-3">{error_end_time}</p>
							</div>
							<div className="col-md-2 py-3 d-flex align-items-center justify-content-left star_icon_size" >
																{data.length == 1 && (

																	<MdStarRate
																		className="purple-color"
																		onClick={() => addServiceCoupe()}
																		data-toggle="tooltip"
																		title="Service coupe"
																	/>

																)}
																{key > 0 && (
																	<Image
																		src={Close}
																		width={15}
																		height={15}
																		onClick={() => removeServiceCoupe()}
																		data-toggle="tooltip"
																		title="Remove service coupe"
																	/>
																)}
															</div>
						</div>
						))}

						<div className="text-end">
							<button
								type="submit"
								className="btn rounded-0 custom-btn px-3 btn-block float-end poppins-medium-18px-next-button"
							>
								{t('SAVE')}
							</button>
						</div>
					</div>:<div>Loading...</div>}
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
