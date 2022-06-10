import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { storeCategoryDetails, getCat, catUpdate } from '../../Services/ApiEndPoints';
import styles from '../../styles/Pc.module.css';
import { PcContext } from '../../Contexts/PcContext';

function AddCategory(props) {
	// const [id, setId] = useState(props.secid);
	// const urlParam = useParams();
	// const navigate = useNavigate();

	const [ data, setData ] = useState({
		id: '',
		category_name: '',
		min_salary: '',
		pc_unique_key: ''
	});

	const [ field1, setfield1 ] = useState();
	const {
		setCurrent_sec,
		setSec_completed,
		sec_completed,
		pc_unique_key,
		setPc_unique_key,
		setCat_rightsec,
		setCat_leftsec,
		setCat_fun_updated,
		setCat_subsec_type
	} = useContext(PcContext);

	let postdata = async (e) => {
		if (data.id == '') {
			APICALL.service(storeCategoryDetails, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCat_fun_updated("cat"+result.ctid)
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			// 	console.log('test');
			// 	APICALL.service(catUpdate, 'POST', data)
			// 		.then((result) => {
			// 			console.log(result);
			// 			if (result.status === 200) {
			// 				// navigate("/pc/"+urlParam.id);
			// 				childToParent(data);
			// 			}
			// 		})
			// 		.catch((error) => {
			// 			console.error(error);
			// 		});
		}
	};
	/**
   * 
   * @param {*} event 
   */

	useEffect(
		() => {
			console.log(getCat);
			if (data.id != '') {
				APICALL.service(getCat + id, 'GET')
					.then((result) => {
						// setsalary()
						// console.log(result.data);
						// if (result.data.length > 0) {
						// 	setsalary(result.data[0]['min_salary']);
						// 	setfrnch(result.data[0]['category_name']);
						// }
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ data.id ]
	);
	/**
   * 
   * @param {*} event
   * 
   * it will validates the data of each field 
   */
	let submit = async (event) => {
		event.preventDefault();

		// var emptyValue = await ValidationService.emptyValidationMethod(data.category_name);
		// var emptyValue1 = await ValidationService.emptyValidationMethod(data.min_salary);
		// var validName = await ValidationService.nameValidationMethod(data.category_name);
		// var validSalary = await ValidationService.salaryValidationMethod(data.min_salary);

		// if (emptyValue != '0') {
		// 	setfield(emptyValue);
		// } else {
		// 	await setfield(validName);
		// }

		// if (emptyValue1 != '0') {
		// 	setfield1(emptyValue1);
		// } else {
		// 	await setfield1(validSalary);
		// }

		// if (validSalary == true && validName == true) {
		postdata();
		// }
	};

	return (
		<div className="mt-4">
			<form onSubmit={submit}>
				{data.id != '' ? <h4 className="h5 mb-3">Edit category</h4> : <h4 className="h5 mb-3">Add category</h4>}
				<label className="mb-2 custom_astrick">Category name </label>
				<div className="form-group">
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

					<p style={{ color: 'red' }}>{field1}</p>
				</div>
				<label className="custom_astrick">Minimum salary</label>
				<div className="form-group">
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
					<p style={{ color: 'red' }}>{field1}</p>
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
