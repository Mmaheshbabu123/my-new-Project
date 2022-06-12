import { useState, useContext } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import ValidationService from '../../Services/ValidationService';
import { addAge } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

const Addage = () => {
	const [ showhideage, setShowhideage ] = useState('');
	const { pc_unique_key, setCurrent_sec, setSec_completed, sec_completed, setPc_unique_key } = useContext(PcContext);
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

	const handleshowhide = (event) => {
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
		if (data.id == '') {
			console.log("test")
			APICALL.service(addAge, 'POST', data)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						// setCurrent_sec(2);
						// var res1 = sec_completed;
						// res1['pc'] = true;
						// setSec_completed(res1);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			// APICALL.service(updatePc + data.id, 'POST', data)
			// 	.then((result) => {
			// 		console.log(result);
			// 		if (result.status === 200) {
			// 			setCurrent_sec(2);
			// 			var res1 = sec_completed;
			// 			res1['pc'] = true;
			// 			setSec_completed(res1);
			// 		} else if (result.status == 205) {
			// 			checkduplicates(result.data);
			// 		} else {
			// 			console.log(result);
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
		}
	};
	let submit = (e) => {
		e.preventDefault();
		if(validate(data)){
		 console.log(data);
		 postdata();

		}
	};
	let validate = (res) => {
		setError_age(ValidationService.emptyValidationMethod(res.age));
		var error = [];
		var valid = true;
		error['min_sal_15']='';
				error['min_sal_16']='';
				error['min_sal_17']='';
				error['min_sal_18']='';
				error['min_sal_19']='';
				error['min_sal_20']='';
		switch (res.age) {
			case '1': //< 16
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_15'] =	error['min_sal_15'] == ''?ValidationService.percentageValidationMethod(res.min_sal_15):error['min_sal_15'];
				error['min_sal_16'] =	error['min_sal_16'] == ''?ValidationService.percentageValidationMethod(res.min_sal_16):error['min_sal_16'];
				error['min_sal_17'] =	error['min_sal_17'] == ''?ValidationService.percentageValidationMethod(res.min_sal_17):error['min_sal_17'];
				valid = error['min_sal_15'] == '' && error['min_sal_16'] == '' && error['min_sal_17'] == ''? true:false;
				break;
			case '2':
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_18'] = ValidationService.emptyValidationMethod(res.min_sal_18);
				error['min_sal_15'] =	error['min_sal_15'] == ''?ValidationService.percentageValidationMethod(res.min_sal_15):error['min_sal_15'];
				error['min_sal_16'] =	error['min_sal_16'] == ''?ValidationService.percentageValidationMethod(res.min_sal_16):error['min_sal_16'];
				error['min_sal_17'] =	error['min_sal_17'] == ''?ValidationService.percentageValidationMethod(res.min_sal_17):error['min_sal_17'];
				error['min_sal_18'] =	error['min_sal_18'] == ''?ValidationService.percentageValidationMethod(res.min_sal_18):error['min_sal_18'];
				valid = error['min_sal_15'] == '' && error['min_sal_16'] == '' && error['min_sal_17'] == '' && error['min_sal_18'] == ''? true:false;


				break;
			case '3':
				error['min_sal_15'] = ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16'] = ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17'] = ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_18'] = ValidationService.emptyValidationMethod(res.min_sal_18);
				error['min_sal_19'] = ValidationService.emptyValidationMethod(res.min_sal_19);
				error['min_sal_15'] =	error['min_sal_15'] == ''?ValidationService.percentageValidationMethod(res.min_sal_15):error['min_sal_15'];
				error['min_sal_16'] =	error['min_sal_16'] == ''?ValidationService.percentageValidationMethod(res.min_sal_16):error['min_sal_16'];
				error['min_sal_17'] =	error['min_sal_17'] == ''?ValidationService.percentageValidationMethod(res.min_sal_17):error['min_sal_17'];
				error['min_sal_18'] =	error['min_sal_18'] == ''?ValidationService.percentageValidationMethod(res.min_sal_18):error['min_sal_18'];
				error['min_sal_19'] =	error['min_sal_19'] == ''?ValidationService.percentageValidationMethod(res.min_sal_19):error['min_sal_19'];
				valid = error['min_sal_15'] == '' && error['min_sal_16'] == '' && error['min_sal_17'] == '' && error['min_sal_18'] == '' && error['min_sal_19'] == ''? true:false;


				


				break;
			case '4':
				error['min_sal_15']=ValidationService.emptyValidationMethod(res.min_sal_15);
				error['min_sal_16']=ValidationService.emptyValidationMethod(res.min_sal_16);
				error['min_sal_17']=ValidationService.emptyValidationMethod(res.min_sal_17);
				error['min_sal_18']=ValidationService.emptyValidationMethod(res.min_sal_18);
				error['min_sal_19']=ValidationService.emptyValidationMethod(res.min_sal_19);
				error['min_sal_20']=ValidationService.emptyValidationMethod(res.min_sal_20);
				error['min_sal_15'] =	error['min_sal_15'] == ''?ValidationService.percentageValidationMethod(res.min_sal_15):error['min_sal_15'];
				error['min_sal_16'] =	error['min_sal_16'] == ''?ValidationService.percentageValidationMethod(res.min_sal_16):error['min_sal_16'];
				error['min_sal_17'] =	error['min_sal_17'] == ''?ValidationService.percentageValidationMethod(res.min_sal_17):error['min_sal_17'];
				error['min_sal_18'] =	error['min_sal_18'] == ''?ValidationService.percentageValidationMethod(res.min_sal_18):error['min_sal_18'];
				error['min_sal_19'] =	error['min_sal_19'] == ''?ValidationService.percentageValidationMethod(res.min_sal_19):error['min_sal_19'];
				error['min_sal_20'] =	error['min_sal_20'] == ''?ValidationService.percentageValidationMethod(res.min_sal_20):error['min_sal_20'];
				valid = error['min_sal_15'] == '' && error['min_sal_16'] == '' && error['min_sal_17'] == '' && error['min_sal_18'] == '' && error['min_sal_19'] == '' && error['min_sal_20'] == ''? true:false;



				break;
		}
		setError_min_sal_15(error['min_sal_15']);
		setError_min_sal_16(error['min_sal_16']);
		setError_min_sal_17(error['min_sal_17']);
		setError_min_sal_18(error['min_sal_18']);
		setError_min_sal_19(error['min_sal_19']);
		setError_min_sal_20(error['min_sal_20']);
return valid;
	}
	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)}>
				<div className="row pt-4">
					<div className="col-md-6">
						{/* <h4 className="mt-4 mb-2">Edit age</h4> */}

						<div className="mb-3">
							<label className="custom_astrick mb-2">At which age full salary is paid?</label>
							<select
								type="text"
								className="form-select mt-2 mb-2"
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
							<p className="error mt-2">{error_age}</p>
						</div>

						{/* IF AGE = 21 */}
						{showhideage === '4' && (
							<div className="mb-3">
								<label className="custom_astrick mb-2">Minimum salary for 20 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_20}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_20: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_20}</p>
							</div>
						)}
						{/* IF AGE >= 20 */}
						{(showhideage === '3' || showhideage === '4') && (
							<div className="mb-3">
								<label className="custom_astrick  mb-2">Minimum salary for 19 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_19}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_19: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_19}</p>
							</div>
						)}
						{/* IF AGE >= 19 */}
						{(showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div className="mb-3">
								<label className="custom_astrick">Minimum salary for 18 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_18}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_18: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_18}</p>
							</div>
						)}

						{/* IF AGE >= 18 */}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div className="mb-3">
								<label className="custom_astrick">Minimum salary for 17 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_17}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_17: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_17}</p>
							</div>
						)}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div className="mb-3">
								<label className="custom_astrick">Minimum salary for 16 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_16}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_16: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_16}</p>
							</div>
						)}
						{(showhideage === '1' || showhideage === '2' || showhideage === '3' || showhideage === '4') && (
							<div className="mb-3">
								<label className="custom_astrick">Minimum salary for 15 years?</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={data.min_sal_15}
										onChange={(e) => {
											setData((prev) => ({ ...prev, min_sal_15: e.target.value }));
										}}
									/>
									<span className="input-group-text">%</span>
								</div>
								<p className="error mt-2">{error_min_sal_15}</p>
							</div>
						)}
						{/* <div>
							<button className="btn btn-secondary btn-lg btn-block float-sm-right" type="submit">
								Save
							</button>
						</div> */}
					</div>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								setCurrent_sec(2);
							}}
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
};
export default Addage;
