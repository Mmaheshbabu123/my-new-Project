import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
import { APICALL } from '../../Services/ApiServices';
import { addFunction, fetchFunction, updateFunction } from '../../Services/ApiEndPoints';
import { PcContext } from '../../Contexts/PcContext';

function AddFunction(props) {
	console.log("test")
	const [ id, setId ] = useState('');
	const [ data, setData ] = useState({
		id: '',
		function_name: '',
		min_salary: '',
		pc_unique_key: '',
		category_id: ''
	});
	const {
		setCurrent_sec,
		setSec_completed,
		sec_completed,
		pc_unique_key,
		setPc_unique_key,
		setCat_rightsec,
		setCat_leftsec,
		setCat_fun_updated,
		cat_subsec_type,
		setCat_subsec_type,
		cat_subsec_id,
		setCat_subsec_id
	} = useContext(PcContext);
	const [ error_function_name, setError_function_name ] = useState('');
	const [ error_min_salary, setError_min_salary ] = useState('');
	let postdata = () => {
		if (id == '') {
			APICALL.service(addFunction, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCat_fun_updated('fun' + result.fcid);
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
						setCat_subsec_id('');
						// setId(result.fcid);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(updateFunction, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCat_fun_updated('funupdate' + result.fcid);
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
						setCat_subsec_id('');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	let resetErrors = () => {
		setError_function_name('');
		setError_min_salary('');
	}
	useEffect(
		() => {
			if (cat_subsec_type == 2) {
				setId(cat_subsec_id);
				resetErrors();
			}
			if (cat_subsec_id == '') {
				//create category data for add category flow
				var data1 = data;
				data1.id = '';
				data1.function_name = '';
				data1.min_salary = ''; 
				data1.category_id = '';
				setData(data1);
			}
		},
		[ cat_subsec_id ]
	);
	useEffect(
		() => {
			if (id != '') {
				APICALL.service(fetchFunction + id, 'GET')
					.then((result) => {
						if (result.data.length > 0) {
							var res = [];
							res.function_name = result.data[0].function_name;
							res.id = result.data[0].id;
							res.min_salary = result.data[0].min_salary;
							res.category_id = result.data[0].category_id;
							setData(res);
							console.log(result);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ id, cat_subsec_type ]
	);

	let submit = (event) => {
		console.log(data)
		event.preventDefault();
		// return;
		console.log('test');
		if (validate()) {
			console.log(data);
			postdata();
		}
	};
	let validate = () => {
		var error = [];
		error['error_function_name'] =
			ValidationService.emptyValidationMethod(data.function_name) == ''
				? ValidationService.nameValidationMethod(data.function_name) == ''
					? ''
					: 'This field is invalid.'
				: 'This field is required.';
		error['error_min_salary'] =
			ValidationService.emptyValidationMethod(data.min_salary) == ''
				? ValidationService.minSalaryValidationMethod(data.min_salary) == ''
					? ''
					: 'This field is invalid.'
				: 'This field is required.';

				if(error['error_function_name'] == '' && id == ''){
					props.categorylist.forEach(element => {
						if(element.type == '3' && Object.values(element).includes(data.function_name)){
							error['error_function_name'] ="Function name already exist."

						}
						
					});
				}
				if(error['error_min_salary'] == '' && data.category_id!= ''){
					props.categorylist.forEach(element => {
						if(element.type == '2' && element.id == data.category_id){
							console.log(parseFloat(data.min_salary));
					error['error_min_salary'] = parseFloat(data.min_salary.replace(',', '.')) > parseFloat(element.min_salary.replace(',', '.')) ? "Minimum salary cannot be greater that "+ element.min_salary+" €":'';
						}
				})
			}
		setError_function_name(error['error_function_name']);
		setError_min_salary(error['error_min_salary']);

		if (error['error_function_name'] == '' && error['error_min_salary'] == '') {
			console.log('valid');
			return true;
		} else {
			console.log('invalid');

			return false;
		}
	};
	return (
		<div className="mt-4">
			<form className="Search__form" onSubmit={submit}>
				{id != '' ? <h4 className="h5 mb-3">Edit function</h4> : <h4 className="h5 mb-3">Add function</h4>}
				<div className="form-group mb-3">
					<label className="custom_astrick mb-2">Function name</label>
					<input
						type="text"
						className=" form-control my-2"
						value={data.function_name}
						onChange={(e) => {
							setData((prev) => ({ ...prev, function_name: e.target.value }));
						}}
					/>
					<p style={{ color: 'red' }}>{error_function_name}</p>
				</div>

				{props.categorylist.length > 0 && (
					<div className="form-group mb-3">
						<label className="mt-2 mb-1">Category</label>
						<select
							className="form-select my-2 form-control"
							value={data.category_id}
							onChange={(e) => {
								setData((prev) => ({ ...prev, category_id: e.target.value }));
							}}
						>
							<option value="">select</option>
							{Object.keys(props.categorylist).map(
								(val, key) =>
									props.categorylist[val]['type'] == '2' && (
										<option value={props.categorylist[val]['id']} key={val}>
											{props.categorylist[val]['category_name']}
										</option>
									)
							)}
						</select>
					</div>
				)}

				<div className="form-group mb-3">
					<label className="custom_astrick mb-2">Minimum salary</label>
					<input
						className=" form-control my-2"
						type="text"
						value={data.min_salary}
						onChange={(e) => {
							setData((prev) => ({ ...prev, min_salary: e.target.value }));
						}}
					/>
					<p className="pb-1"style={{ color: 'red' }}>{error_min_salary}</p>
				</div>

				<div className="text-end">
					<button
						type="submit"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key , id:id}));
						}}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddFunction;
