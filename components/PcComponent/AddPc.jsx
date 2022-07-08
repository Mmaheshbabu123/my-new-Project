import React, { useState, useContext, useEffect } from 'react';
import ValidationService from '../../Services/ValidationService';
import { addPc, updatePc } from '../../Services/ApiEndPoints';
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
	const [ sec_width, setSec_width ] = useState('col-md-6');

	const {
		pc_unique_key,
		setCurrent_sec,
		setSec_completed,
		sec_completed,
		setPc_unique_key,
		cat_subsec_type,
		setCat_subsec_type,
		setCat_rightsec,
		setCat_leftsec,
		setCat_fun_updated,
		setCat_subsec_id,
		pc_view_type,
		cat_subsec_id,
		setUpdate_sec_completed
	} = useContext(PcContext);
	const [ error_pc_number, setError_pc_number ] = useState('');
	const [ error_pc_name, setError_pc_name ] = useState('');
	const [ error_pc_alias_name, setError_pc_alias_name ] = useState('');
	const [ disableSave, setDisableSave ] = useState(false);

	const [ data, setData ] = useState({
		id: '',
		pc_unique_key: '',
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});
	const [ id, setId ] = useState('');

	/**
	 * Prefill data if pc already exist
	 */
	useEffect(
		() => {
			if (!router.isReady) return;
			if (router.query.uid) {
				APICALL.service(getPcByUniquekey + router.query.uid, 'GET')
					.then((result) => {
						console.log(result);
						if (result.status === 200 && result.data.length > 0) {
							if (result.data[0].completed == 5) {
								setSec_completed((oldState) => {
									return {
										...oldState,
										cat: true,
										age: true,
										pc: true,
										emp_type: true,
										sal_benefit: true
									};
								});
							} else if (result.data[0].completed == 4) {
								setSec_completed((oldState) => {
									return {
										...oldState,
										cat: true,
										age: true,
										pc: true,
										emp_type: true,
									};
								});
							} else if (result.data[0].completed == 3) {
								setSec_completed((oldState) => {
									return {
										...oldState,
										cat: true,
										age: true,
										pc: true,
									};
								});
							} else if (result.data[0].completed == 2) {
								setSec_completed((oldState) => {
									return {
										...oldState,
										cat: true,
										pc: true,
									};
								});

							} else if (result.data[0].completed == 1) {
								setSec_completed((oldState) => {
									return {
										...oldState,
										pc: true,
									};
								});
							} // setSec_completed(res1); //updating that add pc data is filled so that next section can be enable
							var data1 = {};
							setId(result.data[0].id);
							data1['id'] = result.data[0].id;
							data1['pc_unique_key'] = result.data[0].pc_unique_key;
							data1['pc_number'] = result.data[0].pc_number;
							data1['pc_name'] = result.data[0].pc_name;
							data1['pc_alias_name'] =
								result.data[0].pc_alias_name != null ? result.data[0].pc_alias_name : '';
							// setUpdate_sec_completed(result.data[0].completed)
							setData(data1);
						}
					})
					.catch((error) => {
						console.error(error);
					});
				setPc_unique_key(router.query.uid); //updating pc_unique_key with the value from url
			}
		},
		[ router.isReady ]
	);

	useEffect(
		() => {
			if (pc_view_type == 'viewpc') {
				setDisableForm(true);
				setSec_width('col-md-12');
			}
			if (pc_view_type == 'editpc') {
				setSec_width('col-md-12');
			}
		},
		[ pc_view_type ]
	);

	useEffect(
		() => {
			if (cat_subsec_type == 3) {
				setId(cat_subsec_id);
			}
		},
		[ cat_subsec_id ]
	);

	/**
	 * it will post the committee data to the backend by using api's
	 * @param {*} e
	 */

	let postdata = async (e) => {
		setDisableSave(true);
		if (id == '') {
			APICALL.service(addPc, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						if (cat_subsec_type == 3) {
							setCat_fun_updated('pc' + result.pcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');
						} else {
							setId(result.pcid);
							setCurrent_sec(2);
							var res1 = sec_completed;
							res1['pc'] = true;
							setSec_completed(res1);
						}
					} else if (result.status == 205) {
						setDisableSave(false);
						checkduplicates(result.data);
					}
					setDisableSave(false);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(updatePc + id, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						if (cat_subsec_type == 3) {
							setCat_fun_updated('pc' + result.pcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');
						} else {
							setCurrent_sec(2);
							var res1 = sec_completed;
							res1['pc'] = true;
							setSec_completed(res1);
						}
					} else if (result.status == 205) {
						checkduplicates(result.data);
					} else {
						console.log(result);
					}
					setDisableSave(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	let checkduplicates = (res) => {
		res.forEach((element, key) => {
			if (
				element.pc_number.replaceAll(' ', '').toLowerCase() == data.pc_number.replaceAll(' ', '').toLowerCase()
			) {
				setError_pc_number('Paritair comite number already exists.');
			}
			if (
				element.pc_alias_name != null &&
				data.pc_alias_name != null &&
				element.pc_alias_name.replaceAll(' ', '').toLowerCase() ==
					data.pc_alias_name.replaceAll(' ', '').toLowerCase()
			) {
				setError_pc_alias_name('Paritair comite alias name already exists.');
			}
			if (
				element.pc_alias_name != null &&
				data.pc_name != null &&
				element.pc_alias_name.replaceAll(' ', '').toLowerCase() ==
					data.pc_name.replaceAll(' ', '').toLowerCase()
			) {
				setError_pc_name('Paritair comite name already exists.');
			}
			if (
				element.pc_name != null &&
				data.pc_alias_name != null &&
				element.pc_name.replaceAll(' ', '').toLowerCase() ==
					data.pc_alias_name.replaceAll(' ', '').toLowerCase()
			) {
				setError_pc_alias_name('Paritair comite alias name already exists.');
			}
			if (
				element.pc_name != null &&
				data.pc_name != null &&
				element.pc_name.replaceAll(' ', '').toLowerCase() == data.pc_name.replaceAll(' ', '').toLowerCase()
			) {
				setError_pc_name('Paritair comite name already exists.');
			}
		});
	};

	let submit = async (event) => {
		event.preventDefault();
		var valid_res = validate(data);
		if (valid_res) {
			postdata();
		}
	};

	let validate = (res) => {
		var error1 = [];
		//check if required fields are empty
		error1['pc_name'] = ValidationService.emptyValidationMethod(res.pc_name);
		error1['pc_number'] = ValidationService.emptyValidationMethod(res.pc_number);
		//check if fields are valid
		error1['pc_number'] =
			error1['pc_number'] == '' ? ValidationService.pcnumberValidationMethod(res.pc_number) : error1['pc_number'];
		// error1['pc_name'] =
		// 	error1['pc_name'] == '' ? ValidationService.nameValidationMethod(res.pc_name) : error1['pc_name'];
		// error1['pc_alias_name'] =
		// 	res.pc_alias_name != '' && res.pc_alias_name != undefined
		// 		? ValidationService.nameValidationMethod(res.pc_alias_name)
		// 		: '';
		error1['pc_alias_name'] =
			res.pc_alias_name != '' &&
			res.pc_alias_name != null &&
			res.pc_name.replaceAll(' ', '').toLowerCase() == res.pc_alias_name.replaceAll(' ', '').toLowerCase()
				? 'Alias name cannot be same as paritair committe name.'
				: '';
		//seterror messages
		setError_pc_number(error1['pc_number']);
		setError_pc_name(error1['pc_name']);
		setError_pc_alias_name(error1['pc_alias_name']);
		//return false if there is an error else return true
		if (error1['pc_number'] == '' && error1['pc_name'] == '' && error1['pc_alias_name'] == '') {
			return true;
		} else {
			return false;
		}
	};
	let backToDashboard = () => {
		var src = JSON.parse(localStorage.getItem('src'));
		var type = JSON.parse(localStorage.getItem('type'));
		if (src) {
			window.localStorage.removeItem('src');
			if (type == '1') {
				window.location.assign(src);
			} else {
				router.push('/' + src);
			}
		}
	};

	return (
		<div className="">
			<form onSubmit={(e) => submit(e)}>
				{cat_subsec_type == 3 ? <h4 className="h5 mt-3">Edit paritair comite</h4> : ''}
				<div className="row pt-4">
					<div className={sec_width}>
						<div className="form-group py-2">
							<label className="custom_astrick">Paritair comite number</label>
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
						<div className="form-group py-2">
							<label className="custom_astrick">Paritair comite name </label>
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
						<div className="form-group py-2">
							<label>Paritair comite alias name </label>
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
					{/* <div className="col-md-6" /> */}
				</div>
				{cat_subsec_type == 3 ? (
					<div className="row">
						<div className="text-start col-md-6" />
						<div className="text-end col-md-6">
							<button
								type="sumit"
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
				) : (
					<div className="row">
						<div className="text-start col-md-6">
							<button
								type="button"
								className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
								onClick={() => backToDashboard()}
							>
								Back
							</button>
						</div>
						<div className="text-end col-md-6">
							<button
								type="sumit"
								className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
								disabled={disableSave}
								onClick={() => {
									setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key, id: id }));
								}}
							>
								Next
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
}

export default AddPc;
