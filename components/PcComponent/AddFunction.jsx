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
					console.log(result);
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
					console.log(result);
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
		event.preventDefault();
		if (validate()) {
			postdata();
		}
	};
	let validate = () => {
		var error = [];
		error['error_function_name'] =
			ValidationService.emptyValidationMethod(data.function_name) == ''
				? ValidationService.nameValidationMethod(data.function_name) == '' ? '' : 'This field is invalid.'
				: 'This field is required.';
		error['error_min_salary'] =
			ValidationService.emptyValidationMethod(data.min_salary) == ''
				? ValidationService.minSalaryValidationMethod(data.min_salary) == '' ? '' : 'This field is invalid.'
				: 'This field is required.';

		if (error['error_function_name'] == '') {
			props.categorylist.forEach((val1, key) => {
				if (val1.type == '3' && val1.id != id && val1.function_name == data.function_name) {
					error['error_function_name'] = 'Function name already exist.';
				}
			});
		}
		if (
			error['error_min_salary'] == '' &&
			data.min_salary != '' &&
			data.min_salary != null &&
			data.category_id != ''
		) {
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
		<div className="mt-4">
			<form className="Search__form" onSubmit={submit}>
				<div className="row">
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

					{Object.keys(props.categorylist).length > 0 && (
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
											<option
												value={props.categorylist[val]['id']}
												key={val}
												onClick={() => {
													setData((prev) => ({
														...prev,
														min_salary: props.categorylist[val]['min_salary']
													}));
												}}
											>
												{props.categorylist[val]['category_name']}
											</option>
										)
								)}
							</select>
						</div>
					)}

					<div className="form-group mb-3">
						<label className="custom_astrick mb-2">Minimum salary</label>
						<div className="input-group">
							<input
								className=" form-control"
								type="text"
								value={data.min_salary}
								onChange={(e) => {
									setData((prev) => ({ ...prev, min_salary: e.target.value }));
								}}
							/>
							<span className="input-group-text">€</span>
						</div>
						<p className="pb-1" style={{ color: 'red' }}>
							{error_min_salary}
						</p>
					</div>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						{(router.query.fid || router.query.cid) && (
							<Link href={'/manage-function'}>
								<a className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn">
									Back
								</a>
							</Link>
						)}
					</div>
					<div className="text-end col-md-6">
						<button
							type="submit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							disabled={disableSave}
							onClick={() => {
								setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key, id: id }));
							}}
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddFunction;
