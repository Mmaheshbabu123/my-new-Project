import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { storeCategoryDetails, getCat, catUpdate } from '../../Services/ApiEndPoints';
import styles from '../../styles/Pc.module.css';
import { PcContext } from '../../Contexts/PcContext';
import { useRouter } from 'next/router';

function AddCategory(props) {
	console.log("qwerty")
	const [id, setId] = useState('');
	const [ data, setData ] = useState({
		id: '',
		category_name: '',
		min_salary: '',
		pc_unique_key: ''
	});
	const router = useRouter();
	const [ error_category_name, setError_category_name ] = useState('');
	const [ error_min_salary, setError_min_salary ] = useState('');
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

	let resetErrors = () => {
		setError_category_name('');
		setError_min_salary('');
	}

	let postdata = async (e) => {
		if (id == '') {
			APICALL.service(storeCategoryDetails, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCat_fun_updated('cat' + result.ctid);
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
						setCat_subsec_id('');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(catUpdate, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						var cid = router.query.cid
						if(cid != null && cid != undefined && cid != ''){
							router.push("/manage-category");
						}else{
							setCat_fun_updated('catupdate' + result.ctid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');
						}
						
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	/**
   * 
   * @param {*} event 
   */

	useEffect(
		() => {
			console.log(getCat);
			if (id != '') {
				APICALL.service(getCat + id, 'GET')
					.then((result) => {
						console.log(result);
						if (result.data.length > 0) {
						setData(result.data[0])
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}else{
				
			}
		},
		[id]
	);


	useEffect(() =>{
		if(cat_subsec_type == 1){
			setId(cat_subsec_id);
			resetErrors();

		}
		if(cat_subsec_id == ''){  //create category data for add category flow
			var data1 =	data;
			data1.id = ''
			data1.category_name = ''
			data1.min_salary = '',
			setData(data1);
		}
	},[cat_subsec_id]
	)
	/**
   * 
   * @param {*} event
   * 
   * it will validates the data of each field 
   */
	let submit = async (event) => {
		event.preventDefault();
		if(validate()){
			postdata()
		}
	};

	let validate =() => {
		var error=[];
		error['error_category_name'] = ValidationService.emptyValidationMethod(data.category_name) == '' ? ValidationService.nameValidationMethod(data.category_name) ==''?'':ValidationService.nameValidationMethod(data.category_name):ValidationService.emptyValidationMethod(data.category_name);
		error['error_min_salary'] = ValidationService.emptyValidationMethod(data.min_salary) == '' ? ValidationService.minSalaryValidationMethod(data.min_salary) ==''?'':"This field is invalid.":ValidationService.emptyValidationMethod(data.min_salary);
		
		if(error['error_category_name'] == ''){
			props.categorylist.forEach(element => {
				console.log(element);
				if(element.type == '2' && element.id != id && data.category_name == element.category_name){
					error['error_category_name'] ="Category name already exist."

				}
				
			});
		}
		setError_category_name(error['error_category_name']);
		setError_min_salary(error['error_min_salary']);
		if(error['error_category_name'] == '' && error['error_min_salary'] == '' ){
			return true;
		}else{
			return false;
		}
	}

	return (
		<div className="mt-4">
			<form onSubmit={submit}>
				{id != '' ? <h4 className="h5 mb-3">Edit category</h4> : <h4 className="h5 mb-3">Add category</h4>}
				<label className="mb-2 custom_astrick">Category name</label>
				<div className="form-group mb-3">
					<input
						type="text"
						className=" form-control my-2 "
						value={data.category_name}
						name="name"
						id="name"
						onChange={(e) => {
							setData((prev) => ({ ...prev, category_name: e.target.value }));
						}}
					/>

					<p style={{ color: 'red' }}>{error_category_name}</p>
				</div>
				<label className="custom_astrick">Minimum salary</label>
				<div className="form-group mb-3">
					<input
						type="text"
						className="form-control my-2"
						value={data.min_salary}
						name="salary"
						id="salary"
						onChange={(e) => {
							setData((prev) => ({ ...prev, min_salary: e.target.value }));
						}}
					/>
					<p style={{ color: 'red' }}>{error_min_salary}</p>
				</div>

				<div className="text-end">
					<button
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key }));
						}}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddCategory;
