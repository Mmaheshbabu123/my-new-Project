import React, { useState, useContext, useEffect } from 'react';
import ValidationService from '../../Services/ValidationService';
import { addPc } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import { useRouter } from 'next/router';
import { getPcByUniquekey } from '../../Services/ApiEndPoints';

/**
 *
 * @param {*} props
 * @returns the added category data to the common.js component.
 */
function AddPc(props) {
	const router = useRouter();
	const {setCurrent_sec, setSec_completed, sec_completed, setPc_unique_key } = useContext(PcContext);
	// const [ pc_unique_key, setPc_unique_key ] = useState();
	const [ field, setfield ] = useState();
	const [ field1, setfield1 ] = useState();
	var unique_key = router.query.uid ? router.query.uid : '';
	;
	const [ data, setData ] = useState({
		id: '',
		pc_unique_key: router.query.uid,
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});

	const [ error, setError ] = useState({
		error_pc_number: '',
		error_pc_name: '',
		error_pc_alias_name: ''
	});

	useEffect(
		() => {
			if (!router.isReady) return;
			if (router.query.uid) {
				setPc_unique_key(router.query.uid);
				APICALL.service(getPcByUniquekey + unique_key, 'GET')
					.then((result) => {
						console.log(result);
						if (result.status === 200 && result.data.length > 0) {
							var res1 = sec_completed;
							res1['pc'] = true;
							setSec_completed(res1);
							var data1 = {};
							data1['id'] = result.data[0].id;
							data1['pc_unique_key'] = result.data[0].pc_unique_key;
							data1['pc_number'] = result.data[0].pc_number;
							data1['pc_name'] = result.data[0].pc_name;
							data1['pc_alias_name'] = result.data[0].pc_alias_name;
							setData(data1);
							
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ router.isReady ]
	);

	/**
	 * it will post the committee data to the backend by using api's
	 * @param {*} e
	 */

	let postdata = async (e) => {
		if (data.id == '') {
			APICALL.service(addPc, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCurrent_sec(2);
					} else if (result.status == 205) {
						setfield1('Paritair comite number already exists.');
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setCurrent_sec(2);
			var res1 = sec_completed;
			res1['pc'] = true;
			setSec_completed(res1);
		}
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
					<div className='text-end'>
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
