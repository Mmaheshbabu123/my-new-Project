import React, { useState, useEffect } from 'react';
// import ValidationService from '../../ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { storeCategoryDetails, getCat, catUpdate } from '../../Services/ApiEndPoints';
import styles from '../../styles/Pc.module.css'


function AddCategory({ childToParent, id }) {
	// const [id, setId] = useState(props.secid);
	// const urlParam = useParams();
	// const navigate = useNavigate();

	const [ data, setdata ] = useState();
	const [ salary, setsalary ] = useState('');
	const [ name, setfrnch ] = useState('');
	const [ field, setfield ] = useState();
	const [ field1, setfield1 ] = useState();

	let postdata = async (e) => {
		if (id == '') {
			APICALL.service(storeCategoryDetails, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						// navigate("/pc/"+urlParam.id);
						childToParent(data);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.log('test');
			APICALL.service(catUpdate, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						// navigate("/pc/"+urlParam.id);
						childToParent(data);
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
						// setsalary()
						console.log(result.data);
						if (result.data.length > 0) {
							setsalary(result.data[0]['min_salary']);
							setfrnch(result.data[0]['category_name']);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ id ]
	);
	/**
   * 
   * @param {*} event
   * 
   * it will validates the data of each field 
   */
	let submit = async (event) => {
		event.preventDefault();

		var emptyValue = await ValidationService.emptyValidationMethod(name);
		var emptyValue1 = await ValidationService.emptyValidationMethod(salary);
		var validName = await ValidationService.nameValidationMethod(name);
		var validSalary = await ValidationService.salaryValidationMethod(salary);

		if (emptyValue != '0') {
			setfield(emptyValue);
		} else {
			await setfield(validName);
		}

		if (emptyValue1 != '0') {
			setfield1(emptyValue1);
		} else {
			await setfield1(validSalary);
		}

		if (validSalary == true && validName == true) {
			postdata();
		}
	};

	return (
		<div className="mt-4">
			<form onSubmit={submit}>
				{id != '' ? <h4>Edit category</h4> : <h4>Add category</h4>}
				<div className="form-group">
					<label className="mt-3 mb-4">
						Category name
						<input
							type="text"
							className=" form-control my-2"
							value={name}
							name="name"
							id="name"
							onChange={(e) => setfrnch(e.target.value)}
						/>
						<p style={{ color: 'red' }}>{field}</p>
					</label>
				</div>
				<div className="form-group">
					<label>
						Minimum salary
						<input
							type="text"
							className="form-control my-2"
							value={salary}
							name="salary"
							id="salary"
							onChange={(e) => setsalary(e.target.value)}
						/>
						<p style={{ color: 'red' }}>{field1}</p>
					</label>
				</div>

				<div>
					<button
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							setdata({
								id: id,
								category_name: name,
								min_salary: salary,
								// ref_id: props.pcid,
								weight: 1
							});
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
