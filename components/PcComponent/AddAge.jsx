import { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import ValidationService from '../../Services/ValidationService';
import { addAge, getAge, updateAge } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

const Addage = () => {
	const [ id, setId ] = useState('');
	const [ disableForm, setDisableForm ] = useState(false);
	const [ sec_width, setSec_width ] = useState('col-md-6');


	const [ showhideage, setShowhideage ] = useState('');
	const {
		pc_unique_key,
		setCurrent_sec,
		setSec_completed,
		sec_completed,
		setPc_unique_key,
		cat_subsec_type,
		setCat_subsec_type,
		setCat_subsec_id,
		setCat_fun_updated,
		setCat_rightsec,
		setCat_leftsec,
		pc_view_type
	} = useContext(PcContext);
	const [ data, setData ] = useState({
		id: '',
		pc_unique_key: '',
		age: '',
		min_sal_20: '',
		min_sal_19: '',
		min_sal_18: '',
		min_sal_17: '',
		min_sal_16: '',
		min_sal_15: ''
	});
	const [ error_age, setError_age ] = useState('');
	const [ error_min_sal_15, setError_min_sal_15 ] = useState('');
	const [ error_min_sal_16, setError_min_sal_16 ] = useState('');
	const [ error_min_sal_17, setError_min_sal_17 ] = useState('');
	const [ error_min_sal_18, setError_min_sal_18 ] = useState('');
	const [ error_min_sal_19, setError_min_sal_19 ] = useState('');
	const [ error_min_sal_20, setError_min_sal_20 ] = useState('');

	useEffect(
		() => {
			// console.log(getCat);
			if (pc_unique_key != '') {
				APICALL.service(getAge + pc_unique_key, 'GET')
					.then((result) => {
						console.log(result);
						if (result.data.length > 0) {
							var data1 = data;
							var count = result.data.length;

							data1.age = count == 3 ? '1' : count == 4 ? '2' : count == 5 ? '3' : count == 6 ? '4' : '';

							setShowhideage(data1.age);
							result.data.forEach(
								(val) => {
									if (val.type == '1') {
										data1.min_sal_15 = val.min_sal_percent;
									} else if (val.type == '2') {
										data1.min_sal_16 = val.min_sal_percent;
									} else if (val.type == '3') {
										data1.min_sal_17 = val.min_sal_percent;
									} else if (val.type == '4') {
										data1.min_sal_18 = val.min_sal_percent;
									} else if (val.type == '5') {
										data1.min_sal_19 = val.min_sal_percent;
									} else if (val.type == '6') {
										data1.min_sal_20 = val.min_sal_percent;
									}
									setId(val.pcid);
								}
								// foreach(data.result as ){
								// 	((val, key) => (
							);

							// 	// /console.log(val)

							// ));
							setData(data1);
							console.log(data);
							// setData(result.data[0])
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ pc_unique_key ]
	);

	useEffect(()=>{
		if(pc_view_type == 'viewpc'){
			setDisableForm(true)
			setSec_width('col-md-12')
		}
		if(pc_view_type == 'editpc'){
			setSec_width('col-md-12')
		}

	},[pc_view_type])

	const handleshowhide = (event) => {
		var data2 = data;
		data2.min_sal_15 = '';
		data2.min_sal_16 = '';
		data2.min_sal_17 = '';
		data2.min_sal_18 = '';
		data2.min_sal_19 = '';
		data2.min_sal_20 = '';
		setData(data2);
		console.log('aaaa');
		const getage = event.target.value;
		if (getage != '') {
			setError_age('');
		}
		setShowhideage(getage);
	};

	let next_redirection = () => {
		setCurrent_sec(4);
		var res1 = sec_completed;
		res1['age'] = true;
		setSec_completed(res1);
	};
	let postdata = async (e) => {
		if (id == '') {
			APICALL.service(addAge, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						if(cat_subsec_type == 4){
							setCat_fun_updated('age' + result.pcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');

						}else{
						setCurrent_sec(4);
						var res1 = sec_completed;
						res1['age'] = true;
						setSec_completed(res1);
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.log('update');
			APICALL.service(updateAge, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						if(cat_subsec_type == 4){
							setCat_fun_updated('age' + result.pcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');

						}else{
						next_redirection();
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	let submit = (e) => {
		e.preventDefault();
		if (validate(data)) {
			console.log(data);
			postdata();
		}
	};
	let validate = (res) => {
		var error2 = ValidationService.emptyValidationMethod(res.age);
		var error = [];
		var valid = true;
		error['min_sal_15'] = '';
		error['min_sal_16'] = '';
		error['min_sal_17'] = '';
		error['min_sal_18'] = '';
		error['min_sal_19'] = '';
		error['min_sal_20'] = '';
		setError_age(error2);

		if (error2 != '') {
			return false;
		}
		switch (res.age) {
			case '1': //< 16
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_15'] =
					error['min_sal_15'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_15)
						: error['min_sal_15'];
				error['min_sal_16'] =
					error['min_sal_16'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_16)
						: error['min_sal_16'];
				error['min_sal_17'] =
					error['min_sal_17'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_17)
						: error['min_sal_17'];
				valid =
					error['min_sal_15'] == '' && error['min_sal_16'] == '' && error['min_sal_17'] == '' ? true : false;
				break;
			case '2':
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_18'] = ValidationService.emptyValidationMethod(res.min_sal_18);
				error['min_sal_15'] =
					error['min_sal_15'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_15)
						: error['min_sal_15'];
				error['min_sal_16'] =
					error['min_sal_16'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_16)
						: error['min_sal_16'];
				error['min_sal_17'] =
					error['min_sal_17'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_17)
						: error['min_sal_17'];
				error['min_sal_18'] =
					error['min_sal_18'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_18)
						: error['min_sal_18'];
				valid =
					error['min_sal_15'] == '' &&
					error['min_sal_16'] == '' &&
					error['min_sal_17'] == '' &&
					error['min_sal_18'] == ''
						? true
						: false;

				break;
			case '3':
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_18'] = ValidationService.emptyValidationMethod(res.min_sal_18);
				error['min_sal_19'] = ValidationService.emptyValidationMethod(res.min_sal_19);
				error['min_sal_15'] =
					error['min_sal_15'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_15)
						: error['min_sal_15'];
				error['min_sal_16'] =
					error['min_sal_16'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_16)
						: error['min_sal_16'];
				error['min_sal_17'] =
					error['min_sal_17'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_17)
						: error['min_sal_17'];
				error['min_sal_18'] =
					error['min_sal_18'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_18)
						: error['min_sal_18'];
				error['min_sal_19'] =
					error['min_sal_19'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_19)
						: error['min_sal_19'];
				valid =
					error['min_sal_15'] == '' &&
					error['min_sal_16'] == '' &&
					error['min_sal_17'] == '' &&
					error['min_sal_18'] == '' &&
					error['min_sal_19'] == ''
						? true
						: false;

				break;
			case '4':
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15.replaceAll(' ',''));
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16.replaceAll(' ',''));
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17.replaceAll(' ',''));
				error['min_sal_18'] = ValidationService.emptyValidationMethod(res.min_sal_18.replaceAll(' ',''));
				error['min_sal_19'] = ValidationService.emptyValidationMethod(res.min_sal_19.replaceAll(' ',''));
				error['min_sal_20'] = ValidationService.emptyValidationMethod(res.min_sal_20.replaceAll(' ',''));
				error['min_sal_15'] =
					error['min_sal_15'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_15.replaceAll(' ',''))
						: error['min_sal_15'];
				error['min_sal_16'] =
					error['min_sal_16'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_16.replaceAll(' ',''))
						: error['min_sal_16'];
				error['min_sal_17'] =
					error['min_sal_17'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_17.replaceAll(' ',''))
						: error['min_sal_17'];
				error['min_sal_18'] =
					error['min_sal_18'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_18.replaceAll(' ',''))
						: error['min_sal_18'];
				error['min_sal_19'] =
					error['min_sal_19'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_19.replaceAll(' ',''))
						: error['min_sal_19'];
				error['min_sal_20'] =
					error['min_sal_20'] == ''
						? ValidationService.percentageValidationMethod(res.min_sal_20.replaceAll(' ',''))
						: error['min_sal_20'];
				valid =
					error['min_sal_15'] == '' &&
					error['min_sal_16'] == '' &&
					error['min_sal_17'] == '' &&
					error['min_sal_18'] == '' &&
					error['min_sal_19'] == '' &&
					error['min_sal_20'] == ''
						? true
						: false;

				break;
		}
		setError_min_sal_15(error['min_sal_15']);
		setError_min_sal_16(error['min_sal_16']);
		setError_min_sal_17(error['min_sal_17']);
		setError_min_sal_18(error['min_sal_18']);
		setError_min_sal_19(error['min_sal_19']);
		setError_min_sal_20(error['min_sal_20']);
		return valid;
	};
	return (
		<div className={pc_view_type == 'addpc'?"":pc_view_type == 'viewpc'?"mt-5 sectioncolor p-3":"sectioncolor p-3 my-3"}>
			<form onSubmit={(e) => submit(e)}>
				{pc_view_type == 'editpc' ? <h4 className={pc_view_type == 'addpc'?"h5 mt-3 ":"bitter_medium_italic_18px mb-4"}>Edit age</h4> : (pc_view_type == 'viewpc'?<h4 className="h5 mt-3 bitter_medium_italic_18px mb-4">Age</h4>:'')}

				<div className={pc_view_type == 'addpc'?"row p-5 border-form-sec m-0 pc-height3 scroll":"border-0"}>
					{/* <div className={sec_width}> */}
					<div className="col-md-12  m-0 ">
						{/* <h4 className="mt-4 mb-2">Edit age</h4> */}

						<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3 "}>
							<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>At which age full salary is paid?</label>
							<select
								disabled={disableForm}
								type="text"
								className={pc_view_type == 'addpc'?"form-select mt-2 mb-2 form-control mt-2 mb-2 input-border-lightgray poppins-medium-18px mh-50 hi-40 rounded-0 shadow-none":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px form-control mt-2 rounded-0 shadow-none bg-transparent px-0":'border-0   poppins-medium-18px form-control mt-2 rounded-0 shadow-none'}
								value={data.age}
								onChange={(e) => {
									handleshowhide(e);
									setData((prev) => ({ ...prev, age: e.target.value }));
								}}
							>


								<option value="">Select age</option>
								<option value="4">21 years</option>
								<option value="3">20 years</option>
								<option value="2">19 years</option>
								<option value="1">18 years</option>
							</select>
							<p className="error">{error_age}</p>
						</div>

						{/* IF AGE = 21 */}
						{showhideage === '4' && (
							<div className={pc_view_type == 'addpc'?"mb-4 col-md-6":pc_view_type == 'viewpc'?"col-md-12 my-3":'col-md-12 my-3'}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 20 years?</label>
								<div className="input-group">
									<input
										disabled={disableForm}
										type="text"
										className={pc_view_type == 'addpc'?" form-control mt-2 mb-2 input-border-lightgray  mh-50 rounded-0 border-end-0 hi-40  poppins-medium-18px shadow-none":pc_view_type == 'viewpc'?"border-0 poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_20}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_20: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":"input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_20}</p>
							</div>
						)}
						{/* IF AGE >= 20 */}
						{(showhideage === '3' || showhideage === '4') && (
							<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3"}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 19 years?</label>
								<div className="input-group">
									<input
									    disabled={disableForm}
										type="text"
										className= {pc_view_type == 'addpc'?" form-control mt-2 mb-2 input-border-lightgray  mh-50 rounded-0 border-end-0 hi-40  poppins-medium-18px shadow-none":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_19}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_19: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":"input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_19}</p>
							</div>
						)}
						{/* IF AGE >= 19 */}
						{(showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3"}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 18 years?</label>
								<div className="input-group">
									<input
										disabled={disableForm}
										type="text"
										className={pc_view_type == 'addpc'?"form-control mt-2 mb-2 input-border-lightgray  mh-50 rounded-0 border-end-0 hi-40  poppins-medium-18px shadow-none":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_18}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_18: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":"input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_18}</p>
							</div>
						)}

						{/* IF AGE >= 18 */}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3"}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 17 years?</label>
								<div className="input-group">
									<input
										disabled={disableForm}
										type="text"
										className={pc_view_type == 'addpc'?"form-control mt-2 mb-2 input-border-lightgray  mh-50 rounded-0 border-end-0 hi-40  poppins-medium-18px shadow-none ":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_17}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_17: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":" input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_17}</p>
							</div>
						)}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3"}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 16 years?</label>
								<div className="input-group">
									<input
										disabled={disableForm}
										type="text"
										className={pc_view_type == 'addpc'?"form-control mt-2 mb-2 input-border-lightgray  mh-50 rounded-0 border-end-0 hi-40 poppins-medium-18px shadow-none":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_16}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_16: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":"input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_16}</p>
							</div>
						)}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div  className={pc_view_type == 'addpc'?"mb-4 col-md-6":"col-md-12 my-3"}>
								<label className={pc_view_type == 'addpc'?"custom_astrick poppins-regular-18px":"poppins-regular-18px"}>Minimum salary for 15 years?</label>
								<div className="input-group">
									<input
										disabled={disableForm}
										type="text"
										className= {pc_view_type == 'addpc'? "form-control mt-2 mb-2 input-border-lightgray poppins-medium-18px mh-50 rounded-0 border-end-0 hi-40 shadow-none":pc_view_type == 'viewpc'?"border-0   poppins-medium-18px view_pc_form_width mt-2 rounded-0 shadow-none bg-transparent":"border-0 form-control mt-2  poppins-medium-18px rounded-0 shadow-none"}
										value={data.min_sal_15}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_15: e.target.value }));
										}}
									/>
									<span className={pc_view_type == 'addpc'?"input-group-text age-sec hi-40":pc_view_type == 'viewpc'?"input-group-text age-sec hi-40 border-0 bg-white rounded-0 bg-transparent px-0":"input-group-text age-sec hi-40 border-0 bg-white rounded-0"}>%</span>
								</div>
								<p className="error">{error_min_sal_15}</p>
							</div>
						)}
						{/* <div>
							<button className="btn btn-secondary btn-lg btn-block float-sm-right" type="submit">
								Save
							</button>
						</div> */}
					</div>
				</div>
				{pc_view_type == "editpc" ? (
					<div className={pc_view_type == 'addpc'?"row m-0 my-4 back_button_position":"row m-0 my-4"}>
						<div className="text-start col-md-6" />
						<div className="text-end col-md-6 px-0">
							<button
								type="sumit"
								className={pc_view_type == 'addpc'?"btn rounded-0 custom-btn px-4 btn-block float-end poppins-medium-18px":"btn rounded-0 custom-btn px-4 btn-block float-end poppins-medium-18px"}
								onClick={() => {
									setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key, id: id }));
								}}
							>
								SAVE
							</button>
						</div>
					</div>
				) : pc_view_type == 'addpc'? (
					<div className="row m-0 my-4">
						<div className="text-start col-md-6 p-0">
							<button
								type="button"
								className={pc_view_type == 'addpc'?"bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px ":"bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px"}
								onClick={() => {
									setCurrent_sec(2);
								}}
							>
								BACK
							</button>
						</div>
						<div className="text-end col-md-6 p-0">
							<button
								type="sumit"
								className={pc_view_type == 'addpc'?"btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px":"btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px"}
								onClick={() => {
									setData((prev) => ({ ...prev, pc_unique_key: pc_unique_key, id: id }));
								}}
							>
								NEXT
							</button>
						</div>
					</div>):''
				}
			</form>
		</div>
	);
};
export default Addage;
