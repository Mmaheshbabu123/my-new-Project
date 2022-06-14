import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';



function AddFunction() {
	const [id, setId] = useState('');
	const [ data, setData ] = useState({
		id: '',
		function_name: '',
		min_salary: '',
		pc_unique_key: '',
		category_id: ''
	});
	const [ error_function_name, setError_function_name ] = useState('');
	const [ error_min_salary, setError_min_salary ] = useState('');


	let submit = async (event) => {
		event.preventDefault();
		console.log(data);
		if(validate()){
			console.log(valid)
		// 	postdata()
		}
	};
	let validate =() => {
		var error=[];
		error['error_function_name'] = ValidationService.emptyValidationMethod(data.function_name) == '' ? ValidationService.nameValidationMethod(data.function_name) ==''?'':ValidationService.nameValidationMethod(data.function_name):ValidationService.emptyValidationMethod(data.function_name);
		error['error_min_salary'] = ValidationService.emptyValidationMethod(data.min_salary) == '' ? ValidationService.minSalaryValidationMethod(data.min_salary) ==''?'':ValidationService.minSalaryValidationMethod(data.min_salary):ValidationService.emptyValidationMethod(data.min_salary);
		setError_function_name(error['error_function_name']);
		setError_min_salary(error['error_min_salary']);

		if(error['error_function_name'] == '' && error['error_min_salary'] == '' ){
			return true;
		}else{
			return false;
		}
	}
	return (
		<div className="mt-4">
		<form className="Search__form" onSubmit={submit}>
			<h4 className='h5 mb-3'>Add function</h4>
			<div className="form-group mb-3">
			<label className="custom_astrick mb-2">Function name</label>
				<input type="text" className=" form-control my-2"  onChange={(e) => {
							setData((prev) => ({ ...prev, function_name: e.target.value }));
						}}/>
				<p style={{ color: 'red' }}>{error_function_name}</p>
			</div>

			{/* <div className="form-group">
				<label className="mt-2 mb-1 custom_astrick ">Category</label>
				<select style={{width: '240px'}} className="form-select  mt-2 ">
         		<option value="select" selected="selected">select</option> 
			 </select>
			</div> */}

			<div className="form-group mb-3">
				<label className="custom_astrick mb-2">
				Minimum salary</label>
				<input className=" form-control my-2" type="text" onChange={(e) => {
							setData((prev) => ({ ...prev, min_salary: e.target.value }));
						}}/>
				<p style={{ color: 'red' }}>{error_min_salary}</p>
			</div>

			<div className='text-end'>
				<button className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn">
					Save
				</button>
			</div>
		</form>
		</div>
	);
}

export default AddFunction;
