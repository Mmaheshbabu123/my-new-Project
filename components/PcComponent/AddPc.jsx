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
	const { pc_unique_key, setCurrent_sec, setSec_completed, sec_completed, setPc_unique_key } = useContext(PcContext);
	const [ error_pc_number, setError_pc_number ] = useState('');
	const [ error_pc_name, setError_pc_name ] = useState('');
	const [ error_pc_alias_name, setError_pc_alias_name ] = useState('');

	const [ data, setData ] = useState({
		id: '',
		pc_unique_key: '',
		pc_number: '',
		pc_name: '',
		pc_alias_name: ''
	});

	/**
	 * Prefill data if pc already exist
	 */
	useEffect(
		() => {
			console.log(router.query.uid);
				if (!router.isReady) return;
				if(router.query.uid && data.id ==''){
				APICALL.service(getPcByUniquekey + router.query.uid, 'GET')
						.then((result) => {
							console.log(result);
							if (result.status === 200 && result.data.length > 0) {
								var res1 = sec_completed;
								res1['pc'] = true;
								setSec_completed(res1);	//updating that add pc data is filled so that next section can be enable
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
					setPc_unique_key(router.query.uid);		 //updating pc_unique_key with the value from url			
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
			console.log("test")
			APICALL.service(addPc, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCurrent_sec(2);
						var res1 = sec_completed;
						res1['pc'] = true;
						setSec_completed(res1);
					} else if (result.status == 205) {
						checkduplicates(result.data);
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(updatePc + data.id, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCurrent_sec(2);
						var res1 = sec_completed;
						res1['pc'] = true;
						setSec_completed(res1);
					} else if (result.status == 205) {
						checkduplicates(result.data);
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	let checkduplicates = (res) => {
		res.forEach((element) => {
			if (element.pc_number == data.pc_number) {
				setError_pc_number('Paritair comite number already exists.');
			}
			if (element.pc_alias_name == data.pc_alias_name) {
				setError_pc_alias_name('Paritair comite alias name already exists.');
			} else if (element.pc_alias_name == data.pc_name) {
				setError_pc_name('Paritair comite name already exists.');
			}
			if (element.pc_name == data.pc_alias_name) {
				setError_pc_alias_name('Paritair comite alias name already exists.');
			} else if (element.pc_name == data.pc_name) {
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
		error1['pc_name'] =
			error1['pc_name'] == '' ? ValidationService.nameValidationMethod(res.pc_name) : error1['pc_name'];
		error1['pc_alias_name'] =
		res.pc_alias_name != '' && res.pc_alias_name != undefined ? ValidationService.nameValidationMethod(res.pc_alias_name) : '';
		error1['pc_alias_name'] = error1['pc_alias_name'] == '' && res.pc_name == res.pc_alias_name ? "Alias name cannot be same as paritair committe name.":error1['pc_alias_name'];
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
	let backToDashboard = () =>{
		var src =JSON.parse(localStorage.getItem("src"));
		if (src) { 
			window.localStorage.removeItem('src');
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL+src+"&check_logged_in=1")
		}
	  
	}

	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)}>
				<div className="row pt-4">
					<div className="col-md-6">
						<div className="form-group py-2">
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
						<div className="form-group py-2">
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
						<div className="form-group py-2">
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
					</div>
					<div className='row'>
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={()=>backToDashboard()}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key }));
							}}
						>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddPc;
