import React, { useState, useEffect, useContext } from 'react';


function AddFunction() {
	const [id, setId] = useState('');
	const [ data, setData ] = useState({
		id: '',
		function_name: '',
		min_salary: '',
		pc_unique_key: '',
		category: ''
	});
	const [ error_function_name, setError_function_name ] = useState('');
	const [ error_min_salary, setError_min_salary ] = useState('');
	return (
		<div className="mt-4">
		<form className="Search__form">
			<h4 className='h5 mb-3'>Add function</h4>
			<div className="mt-2 form-group  ">
			<label className="custom_astrick">Function name</label>
				<input type="text" className=" form-control mt-2 col-md-4" />
				<p style={{ color: 'red' }}>{error_function_name}</p>
			</div>

			<div className="form-group">
				<label className="mt-2 mb-1 custom_astrick ">Category</label>
				<select style={{width: '240px'}} className="form-select  mt-2 ">
         		<option value="select" selected="selected">select</option> 
			 </select>
			</div>

			<div className="form-group">
				<label className="mt-2 mb-2 custom_astrick" />
				Minimum salary
				<input className=" form-control mt-2" type="text" />
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
