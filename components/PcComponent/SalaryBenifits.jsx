import React, { useState, useContext, useEffect } from 'react';
import { fetchSalaryBenefits, getPcSalaryBenefits } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import styles from '../../styles/Pc.module.css';

const SalaryBenifits = () => {
	const [ visible, setVisible ] = useState(false);
	const [ data, setData ] = useState([]);
	const [ res, setRes ] = useState([]);
	const [ error_sal_benifits, setError_sal_benifits ] = useState([]);

	const {
		pc_unique_key,
		setPc_unique_key,
		current_sec,
		cat_rightsec,
		setCat_rightsec,
		cat_leftsec,
		setCat_leftsec,
		cat_subsec_type,
		setCat_subsec_type,
		cat_fun_updated,
		setCat_fun_updated,
		sec_completed,
		setSec_completed,
		cat_subsec_id,
		setCat_subsec_id,
		setCurrent_sec
	} = useContext(PcContext);

	useEffect(() => {
		APICALL.service(fetchSalaryBenefits, 'GET')
			.then((result) => {
				console.log(result);
				if (result.data.length > 0) {
					setData(result.data);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		APICALL.service(getPcSalaryBenefits + pc_unique_key, 'GET')
			.then((result) => {
				console.log(result);
				if (result.data.length > 0) {
					setRes(result.data);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	let updateRes = (event, key) => {
		var res1 = [ ...data ];
		if (event.target.checked) {
			res1[key]['checked'] = true;
			console.log('✅ Checkbox is checked');
		} else {
			res1[key]['checked'] = false;

			console.log('⛔️ Checkbox is NOT checked');
		}
		setData(res1);
		console.log(data);
	};

	let submit = (event) => {
		event.preventDefault();
		var data1 = [];
		data1.push(pc_unique_key);
		data1.push(res);
		// data1.push(temp2);
		if (res.length != 0) {
			postdata(data1);
		} else {
			setError_sal_benifits('Select atleast one salary benifit.');
		}
		console.log(data1);
	};

	let postdata = (data1) => {
			APICALL.service(storeSalBenifits, 'POST', data1)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCurrent_sec(5);
						var res1 = sec_completed;
						res1['emp_type'] = true;
						setSec_completed(res1);
					}
				})
				.catch((error) => {
					console.error(error);
				});
	};

	return (
		<div className="container">
			<form onSubmit={submit}>
				<div className="row">
					{data.map((val, key) => (
						<div key={key} className={`form-check mt-4 col-md-5 bg-light me-3`}>
							<div className="form-check mt-4">
								<input
									className="form-check-input"
									type="checkbox"
									value={val.sb_id}
									id={'flexCheckDefault' + key}
									checked={res.includes(val.sb_id) ? true : false}
									onChange={(e) => {
										updateRes(e, key);
									}}
								/>
								<label calssName="form-check-label" htmlFor="flexCheckDefault">
									{val.name} {val.checked}
								</label>
							</div>
							{res.includes(val.sb_id) && (
								<div>
									<div className="mt-3">
										<p className="fw-bold">Is this mandatory?</p>
										<div className="d-flex mt-3">
											<div className="form-check  ">
												<input
													className="form-check-input d-flex"
													type="radio"
													value="option1"
												/>
												<label className="form-check-label ms-1" htmlFor="exampleRadios1">
													Yes
												</label>
											</div>

											<div className="form-check">
												<input className="form-check-input ms-2" type="radio" value="option2" />
												<label className="form-check-label ms-1" htmlFor="exampleRadios2">
													No
												</label>
											</div>
										</div>
									</div>
								</div>
							)}
						
						</div>
					))}
						<p className="mt-2" style={{ color: 'red' }}>
						{error_sal_benifits}
					</p>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								setCurrent_sec(4);
							}}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default SalaryBenifits;
