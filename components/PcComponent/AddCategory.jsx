import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { storeCategoryDetails, getCat, catUpdate } from '../../Services/ApiEndPoints';
import styles from '../../styles/Pc.module.css';
import { PcContext } from '../../Contexts/PcContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Translation from '@/Translation';

function AddCategory(props) {
	const {t}=props;
	const router = useRouter();
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
	const [ id, setId ] = useState('');
	const [ data, setData ] = useState({
		id: '',
		category_name: '',
		min_salary: '',
		pc_unique_key: ''
	});
	const [ error_category_name, setError_category_name ] = useState('');
	const [ error_min_salary, setError_min_salary ] = useState('');
	const [ disableSave, setDisableSave ] = useState(false);

	let resetErrors = () => {
		setError_category_name('');
		setError_min_salary('');
	};

	let postdata = async (e) => {
		if (id == '') {
			setDisableSave(true);
			var cid = router.query.cid ? router.query.cid : '';
			APICALL.service(storeCategoryDetails, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						if (cid != null && cid != undefined && cid != '') {
							router.push('/manage-category');
						} else {
							setCat_fun_updated('cat' + result.ctid);
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
		} else {
			setDisableSave(true);
			APICALL.service(catUpdate, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						if (cid != null && cid != undefined && cid != '') {
							router.push('/manage-category');
						} else {
							setCat_fun_updated('catupdate' + result.ctid);
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
	/**
   * 
   * @param {*} event 
   */

	useEffect(
		() => {
			if (id != '') {
				APICALL.service(getCat + id, 'GET')
					.then((result) => {
						if (result.data.length > 0) {
							setData(result.data[0]);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
			}
		},
		[ id ]
	);

	useEffect(
		() => {
			if (cat_subsec_type == 1) {
				setId(cat_subsec_id);
				resetErrors();
			}
			if (cat_subsec_id == '') {
				//create category data for add category flow
				var data1 = data;
				data1.id = '';
				data1.category_name = '';
				(data1.min_salary = ''), setData(data1);
			}
		},
		[ cat_subsec_id ]
	);
	/**
   * 
   * @param {*} event
   * 
   * it will validates the data of each field 
   */
	let submit = async (event) => {
		event.preventDefault();
		if (validate()) {
			postdata();
		}
	};

	let validate = () => {
		var error = [];
		error['error_category_name'] = ValidationService.emptyValidationMethod(data.category_name.trim());
			// ValidationService.emptyValidationMethod(data.category_name) == ''
			// 	? ValidationService.nameValidationMethod(data.category_name) == ''
			// 		? ''
			// 		: ValidationService.nameValidationMethod(data.category_name)
			// 	: ValidationService.emptyValidationMethod(data.category_name);
		error['error_min_salary'] =
			ValidationService.emptyValidationMethod(data.min_salary.trim()) == ''
				? ValidationService.minSalaryValidationMethod(data.min_salary.trim()) == '' ? '' : 'This field is invalid.'
				: ValidationService.emptyValidationMethod(data.min_salary.trim());

		if (error['error_category_name'] == '') {
			if(typeof props.categorylist == 'object'){
			Object.keys(props.categorylist).map((element) => {
				if (props.categorylist[element].type == '2' && props.categorylist[element].id != id && data.category_name.replaceAll(' ','').toLowerCase() == props.categorylist[element].category_name.replaceAll(' ','').toLowerCase()) {
					error['error_category_name'] = t('Category name already exist.');
				}
			});
		}else{
			props.categorylist.map((element) => {
				if (element.type == '2' && element.id != id && data.category_name.replaceAll(' ','').toLowerCase() == element.category_name.replaceAll(' ','').toLowerCase()) {
					error['error_category_name'] = t('Category name already exist.');
				}
			});
		}
		}

		if (error['error_min_salary'] == '') {
			if(typeof props.categorylist == 'object'){
				Object.keys(props.categorylist).map((element) => {
					if (props.categorylist[element].type == '2' && props.categorylist[element].id == id){
						props.categorylist[element].childObj && props.categorylist[element].childObj.map((value)=>{
							if(parseFloat(data.min_salary.replace(',', '.')) > parseFloat(value.min_salary.replace(',', '.'))){
								error['error_min_salary'] = t('Category minimum salary cannot be greater than function minimum salary.');
							}
						})
					}

				})
			}else{
			props.categorylist.map((element) => {
				if (element.type == '2' && element.id == id){
					element.childObj && element.childObj.map((value)=>{
						if(parseFloat(data.min_salary.replace(',', '.').trim()) > parseFloat(value.min_salary.replace(',', '.').trim())){
							error['error_min_salary'] = t('Category minimum salary cannot be greater than function minimum salary.');
						}
					})
				}
			// if(typeof props.categorylist == 'object'){
			// Object.keys(props.categorylist).map((element) => {
			// 	if (props.categorylist[element].type == '2' && props.categorylist[element].id != id && data.category_name.replaceAll(' ','').toLowerCase() == props.categorylist[element].category_name.replaceAll(' ','').toLowerCase()) {
			// 		error['error_category_name'] = 'Category name already exist.';
			// 	}
			// });
		})
	}
	}
		setError_category_name(error['error_category_name']);
		setError_min_salary(error['error_min_salary']);

		if (error['error_category_name'] == '' && error['error_min_salary'] == '') {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="mt-3 table-title-bg p-3">
			<form onSubmit={submit}>
				{id != '' ? <h4 className="h5 mb-3 bitter-italic biiter_medium_italic_20px">{t('Edit category')}</h4> : <h4 className="h5 mb-3 bitter-italic biiter_medium_italic_20px">{t('Add category')}</h4>}
				<div className="row">
					<label className=" custom_astrick mt-2 poppins-regular-16px">{t('Category name')}</label>
					<div className="form-group ">
						<input
							type="text"
							// className=" form-control mt-2 mb-3  input-border-lightgray poppins-regular-16px mh-50 rounded-0 border-0 shadow-none"
							className='form-control my-2 border-0 poppins-medium-16px shadow-none rounded-0 border-0'
							value={data.category_name}
							name="name"
							id="name"
							onChange={(e) => {
								setData((prev) => ({ ...prev, category_name: e.target.value }));
							}}
						/>

						<p  className='error_text' style={{ color: 'red' }}>{error_category_name}</p>
					</div>
					<label className="custom_astrick mt-2 poppins-regular-16px">{t('Minimum salary')}</label>
					<div className="form-group">
					<div className="input-group">
					<span className="input-group-text mh-50 rounded-0 mt-2 border-0 bg-white category_currency_height poppins-medium-16px" >€</span>
						<input
							type="text"
							// className=" form-control mt-2 mb-3 input-border-lightgray poppins-regular-16px mh-50 rounded-0 border-0 shadow-none"
								className=" form-control border-0 rounded-0 poppins-medium-16px shadow-none my-2"
							value={data.min_salary}
							name="salary"
							id="salary"
							onChange={(e) => {
								setData((prev) => ({ ...prev, min_salary: e.target.value }));
							}}
						/>
						
						</div>
						<p className='error_text' style={{ color: 'red' }}>{error_min_salary}</p>
					</div>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						{/* {(router.query.cid) && (
							<Link href={'/manage-category'}>
								<a className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px">
									BACK
								</a>
							</Link>
						)}

						{router.query.fid && (
							<Link href={'/manage-function'}>
								<a className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px">
									BACK
								</a>
							</Link>
						)} */}

					</div>
					<div className="text-end col-md-6">
						<button
							className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button  shadow-none"
							disabled={disableSave}
							onClick={() => {
								setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key }));
							}}
						>
							{t('SAVE')}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default React.memo(Translation(AddCategory,['Category name already exist.','Category minimum salary cannot be greater than function minimum salary.',
'Category minimum salary cannot be greater than function minimum salary.','Edit category','Add category','Category name','Minimum salary','SAVE']));
