import React, { useState, useContext } from 'react';
import ValidationService from '../../Services/ValidationService';
import { addPc } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';

/**
 *
 * @param {*} props
 * @returns the added category data to the common.js component.
 */
function AddPc(props) {
	const { pcid, setPcid } = useContext(PcContext);
	const [ field, setfield ] = useState();
	const [ field1, setfield1 ] = useState();
	const [ data, setData ] = useState({
		pc_unique_key: '',
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});
	const [ error, setError ] = useState({
		error_pc_number: '',
		error_pc_name: '',
		error_pc_alias_name: ''
	});

	/**
	 * it will post the committee data to the backend by using api's
	 * @param {*} e
	 */

	let postdata = async (e) => {
		console.log(data);
		APICALL.service(addPc, 'POST', data)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					// var pid = result.pcid;
					// setPcid(pid);
					// setSec_cat_fun(!sec_cat_fun);
				} else if (result.status == 205) {
					setfield1('Paritair comite number already exists.');
				} else {
					console.log(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	let submit = async (event) => {
		event.preventDefault();

		var emptyValue = await ValidationService.emptyValidationMethod(data.pc_name);
		var emptyValue1 = await ValidationService.emptyValidationMethod(data.pc_number);
		var validName = await ValidationService.nameValidationMethod(data.pc_name);
		var validSalary = await ValidationService.pcnumberValidationMethod(data.pc_number);

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
		<div className="container">
			{pcid}
			<form onSubmit={(e) => submit(e)}>
				<div className="row pt-5">
					<div className="col-md-6">
						<div className="form-group mt-3 mb-4">
							<label className="custom_astrick">Paritair comitte number</label>
							<input
								type="text"
								value={data.pc_number}
								className=" form-control mt-2"
								onChange={(e) => {
									setData((prev) => ({ ...prev, pc_number: e.target.value }));
								}}
							/>
							<p className="error mt-2">{field1}</p>
						</div>
						<div className="form-group mt-3 mb-4">
							<label className="custom_astrick">Paritair comitte name </label>
							<input
								type="text"
								value={data.pc_name}
								className="form-control mt-2"
								onChange={(e) => {
									setData((prev) => ({ ...prev, pc_name: e.target.value }));
								}}
							/>
							<p className="error mt-2">{field}</p>
						</div>
						<div className="form-group mt-3 mb-4">
							<label>Paritair comitte alias name </label>
							<input
								type="text"
								value={data.pc_alias_name}
								className="form-control mt-2"
								onChange={(e) => {
									setData((prev) => ({ ...prev, pc_alias_name: e.target.value }));
								}}
							/>
							<p className="error mt-2" />
						</div>
					</div>
					<div className="col-md-6" />
					<div>
						<button className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn">
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddPc;
