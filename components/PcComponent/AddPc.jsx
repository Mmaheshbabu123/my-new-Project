import React, { useState, useContext, useEffect } from 'react';
import ValidationService from '../../Services/ValidationService';
import { addPc,updatePc } from '../../Services/ApiEndPoints';
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
	const { setCurrent_sec, setSec_completed, sec_completed, setPc_unique_key } = useContext(PcContext);
	// const [ pc_unique_key, setPc_unique_key ] = useState();
	const [ error_pc_number, setError_pc_number ] = useState('');
	const [ error_pc_name, setError_pc_name ] = useState('');
	const [ error_pc_alias_name, setError_pc_alias_name ] = useState('');

	const [ field1, setfield1 ] = useState();
	var unique_key = router.query.uid ? router.query.uid : '';
	const [ data, setData ] = useState({
		id: '',
		pc_unique_key: router.query.uid,
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});

	const [ error, setError ] = useState({
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});

	useEffect(
		() => {
			if (unique_key) {
				var res1 = sec_completed;
				res1['pc'] = true;
				setSec_completed(res1);
			}
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
						result.data.forEach(element => {
							if(element.pc_name == data.pc_name){
								setError_pc_name('Paritair comite name already exists.');
							}
							if(element.pc_number == data.pc_number){
								setError_pc_number('Paritair comite number already exists.');
							}
						});
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(updatePc+data.id, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCurrent_sec(2);
						var res1 = sec_completed;
						res1['pc'] = true;
						setSec_completed(res1);
					} else if (result.status == 205) {
						result.data.forEach(element => {
							if(element.pc_name == data.pc_name){
								setError_pc_name('Paritair comite name already exists.');
							}
							if(element.pc_number == data.pc_number){
								setError_pc_number('Paritair comite number already exists.');
							}
						});
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});			
		}
	};

	let submit = async (event) => {
		event.preventDefault();
		var valid_res = validate(data);
		if(valid_res){
			postdata();
		}
	};

	let validate = (res) => {
		var error1 = [];
		error1['pc_name'] = ValidationService.emptyValidationMethod(res.pc_name);
		error1['pc_number'] = ValidationService.emptyValidationMethod(res.pc_number);

		error1['pc_number'] =
			error1['pc_number'] == '' ? ValidationService.pcnumberValidationMethod(res.pc_number) : error1['pc_number'];
		error1['pc_name'] =
			error1['pc_name'] == '' ? ValidationService.nameValidationMethod(res.pc_name) : error1['pc_name'];
		error1['pc_alias_name'] =
			error1['pc_alias_name'] == '' ? ValidationService.nameValidationMethod(res.pc_alias_name) : '';
		setError_pc_number(error1['pc_number']);
		setError_pc_name(error1['pc_name']);
		setError_pc_alias_name(error1['pc_alias_name']);
		console.log(error1);
		if (error1['pc_number'] == '' && error1['pc_name'] == '' && error1['pc_alias_name'] == '') {
			return true;
		} else {
			return false;
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
							<p className="error mt-2">{error_pc_number}</p>
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
							<p className="error mt-2">{error_pc_name}</p>
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
							<p className="error mt-2">{error_pc_alias_name}</p>
						</div>
					</div>
					<div className="col-md-6" />
					<div className="text-end">
						<button className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddPc;
