import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
import { APICALL } from '../../Services/ApiServices';
import { addFunction, fetchFunction, updateFunction } from '../../Services/ApiEndPoints';
import { PcContext } from '../../Contexts/PcContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AddFunction(props) {
	const router = useRouter();
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
	const [ disableSave, setDisableSave ] = useState(false);

	let postdata = () => {
		setDisableSave(true);
		if (id == '') {
			var fid = router.query.fid ? router.query.fid : '';
			APICALL.service(addFunction, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						if (fid != null && fid != undefined && fid != '') {
							router.push('/manage-function');
						} else {
							setCat_fun_updated('fun' + result.fcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');
							// setId(result.fcid);
						}
						setDisableSave(false);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(updateFunction, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						if (fid != null && fid != undefined && fid != '') {
							router.push('/manage-function');
						} else {
							setCat_fun_updated('funupdate' + result.fcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');
						}
						setDisableSave(false);
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
	};
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
							res.min_salary_temp = result.data[0].min_salary;
							res.category_id = result.data[0].category_id == null? '':result.data[0].category_id;
							setData(res);
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
		event.preventDefault();
		if (validate()) {
			postdata();
		}
	};
	let validate = () => {
		var error = [];
		error['error_function_name'] = ValidationService.emptyValidationMethod(data.function_name.trim());
		error['error_min_salary'] =
			ValidationService.emptyValidationMethod(data.min_salary.trim()) == ''
				? ValidationService.minSalaryValidationMethod(data.min_salary.trim()) == '' ? '' : 'This field is invalid.'
				: 'This field is required.';

		if (error['error_function_name'] == '') {
			if(typeof props.categorylist == 'object'){
				Object.keys(props.categorylist).map((element) => {
				if (props.categorylist[element].type == '3' && props.categorylist[element].id != id && props.categorylist[element].function_name.replaceAll(' ','').toLowerCase() == data.function_name.replaceAll(' ','').toLowerCase()) {
					error['error_function_name'] = 'Function name already exist.';
				}
				if(props.categorylist[element].type == '2'){
					if(props.categorylist[element].childObj != undefined){
						Object.keys(props.categorylist[element].childObj).map((val)=>{
						if (props.categorylist[element].childObj[val].type == '3' && props.categorylist[element].childObj[val].id != id && props.categorylist[element].childObj[val].function_name.replaceAll(' ','').toLowerCase() == data.function_name.replaceAll(' ','').toLowerCase()) {
							error['error_function_name'] = 'Function name already exist.';
						}

					})
					}
				}
			});
		}else{
			props.categorylist.forEach((val1, key) => {
				if (val1.type == '3' && val1.id != id && val1.function_name.replaceAll(' ','').toLowerCase() == data.function_name.replaceAll(' ','').toLowerCase()) {
					error['error_function_name'] = 'Function name already exist.';
				}
				if(val1.type == '2'){
					if(val1.childObj != undefined){
					val1.childObj.forEach((v, k)=>{
						if (v.type == '3' && v.id != id && v.function_name.replaceAll(' ','').toLowerCase() == data.function_name.replaceAll(' ','').toLowerCase()) {
							error['error_function_name'] = 'Function name already exist.';
						}
					})
					}
				}
			});
		}
		}
		if (
			error['error_min_salary'] == '' &&
			data.min_salary != '' &&
			data.min_salary != null &&
			data.category_id != ''
		) {
			if(typeof props.categorylist == 'object'){
				Object.keys(props.categorylist).map((element) => {
					if (props.categorylist[element].type == '2' && props.categorylist[element].id == data.category_id) {
						error['error_min_salary'] =
							parseFloat(data.min_salary.replace(',', '.')) < parseFloat(props.categorylist[element].min_salary.replace(',', '.'))
								? 'Minimum salary cannot be lesser that ' + props.categorylist[element].min_salary + ' €'
								: '';
					}
				});
			}else
			props.categorylist.forEach((val, key) => {
				if (val.type == '2' && val.id == data.category_id) {
					error['error_min_salary'] =
						parseFloat(data.min_salary.replace(',', '.')) < parseFloat(val.min_salary.replace(',', '.'))
							? 'Minimum salary cannot be lesser that ' + val.min_salary + ' €'
							: '';
				}
			});
		}
		setError_function_name(error['error_function_name']);
		setError_min_salary(error['error_min_salary']);
		if (error['error_function_name'] == '' && error['error_min_salary'] == '') {
			return true;
		} else {
			return false;
		}
	};
	return (
		<div className="mt-3 table-title-bg p-3">
			<form className="Search__form" onSubmit={submit}>
				<div className="row">
					{id != '' ? <h4 className="h5 mb-3 bitter-italic biiter_medium_italic_20px">Edit function</h4> : <h4 className="h5 mb-3 bitter-italic biiter_medium_italic_20px">Add function</h4>}
					<div className="form-group mb-2">
						<label className="custom_astrick mt-2 poppins-regular-16px">Function name</label>
						<input
							type="text"
							className=" form-control my-2 border-0 poppins-medium-16px shadow-none rounded-0"
							value={data.function_name}
							onChange={(e) => {
								setData((prev) => ({ ...prev, function_name: e.target.value }));
							}}
						/>
						<p className='error_text' style={{ color: 'red' }}>{error_function_name}</p>
					</div>

					{Object.keys(props.categorylist).length > 0 && (
						<div className="form-group mb-2">
							<label className="mt-2 poppins-regular-16px">Category</label>
							<select
								className="form-select my-2 form-control border-0 rounded-0 poppins-medium-16px shadow-none"
								value={data.category_id}
								onChange={(e) => {
									if(e.target.value != ''){
										let sal = '';
										if(typeof props.categorylist == 'object'){

											Object.keys(props.categorylist).map((element) => {
												if(e.target.value == props.categorylist[element].id){
												sal = data.min_salary_temp != undefined && parseFloat(data.min_salary_temp.replace(',', '.'))>parseFloat(props.categorylist[element].min_salary.replace(',', '.'))?data.min_salary_temp:props.categorylist[element].min_salary;
												}
											});
											
										}else{
											let obj = props.categorylist.find(o => o.id == parseInt(e.target.value))
											sal = obj['min_salary'];

										}
									setData((prev) => ({ ...prev, category_id: e.target.value,min_salary: sal }));
								}else{
									setData((prev) => ({ ...prev, category_id: '',min_salary: ''}));
								}
								}}
							>
								<option value="">select</option>
								{Object.keys(props.categorylist).map(
									(val, key) =>
										props.categorylist[val]['type'] == '2' && (
											<option
												value={props.categorylist[val]['id']}
												key={val}
											>
												{props.categorylist[val]['category_name']}
											</option>
										)
								)}
							</select>
						</div>
					)}

					<div className="form-group mb-2">
						<label className="custom_astrick mt-2 poppins-regular-16px">Minimum salary</label>
						<div className="input-group">
						<span className="input-group-text bg-white rounded-0 border-0 category_currency_height poppins-medium-16px my-2">€</span>
							<input
								className=" form-control border-0 rounded-0 poppins-medium-16px shadow-none my-2"
								type="text"
								value={data.min_salary}
								onChange={(e) => {
									setData((prev) => ({ ...prev, min_salary: e.target.value }));
								}}
							/>
							
						</div>
						<p className="pb-1 error_text" style={{ color: 'red' }}>
							{error_min_salary}
						</p>
					</div>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						{/* {(router.query.fid ) && (
							<Link href={'/manage-function'}>
								<a className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px">
									BACK
								</a>
							</Link>
						)}
						{router.query.cid && (
							<Link href={'/manage-category'}>
								<a className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px">
									BACK
								</a>
							</Link>
						)} */}
					</div>
					<div className="text-end col-md-6">
						<button
							type="submit"
							className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
							disabled={disableSave}
							onClick={() => {
								setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key, id: id }));
							}}
						>
							SAVE
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddFunction;
