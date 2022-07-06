import React, { useState, useContext, useEffect } from 'react';
import { fetchSalaryBenefits, getPcSalaryBenefits, storePcSalBenifits } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import styles from '../../styles/Pc.module.css';
import { useRouter } from 'next/router';

const SalaryBenifits = () => {
	const router = useRouter();
	const [ disableForm, setDisableForm ] = useState(false);
	const [ sec_width, setSec_width ] = useState('col-md-5');



	const [ visible, setVisible ] = useState(false);
	const [ data, setData ] = useState([]);
	const [ res, setRes ] = useState([]);
	const [ error_sal_benifits, setError_sal_benifits ] = useState([]);
	const [ count, setCount ] = useState(0);

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
		setCurrent_sec,
		pc_view_type
	} = useContext(PcContext);

	// useEffect(() => {
	// 	APICALL.service(fetchSalaryBenefits, 'GET')
	// 		.then((result) => {
	// 			console.log(result);
	// 			if (result.data.length > 0) {
	// 				setData(result.data);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }, []);

	useEffect(() => {
		APICALL.service(getPcSalaryBenefits + pc_unique_key, 'GET')
			.then((result) => {
				console.log(result);
				if (result.data[0].length > 0) {
					setData(result.data[0]);
					setCount(result.data[1]);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	useEffect(()=>{
		if(pc_view_type == 'viewpc'){
			setDisableForm(true)
			setSec_width('col-md-12')
		}
		if(pc_view_type == 'editpc'){
			setSec_width('col-md-12')
		}

	},[pc_view_type])

	let updateRes = (event, key) => {
		var res1 = [ ...data ];
		if (event.target.checked) {
			setCount(count + 1);
			res1[key]['checked'] = true;
			res1[key]['mandatory'] = '';
			console.log('✅ Checkbox is checked');
		} else {
			res1[key]['checked'] = false;
			res1[key]['mandatory'] = '';

			setCount(count - 1);

			console.log('⛔️ Checkbox is NOT checked');
		}
		setData(res1);
		console.log(data);
	};

	let submit = (event) => {
		event.preventDefault();
		var data1 = [];

		data1.push(pc_unique_key);
		data1.push(data);
		// data1.push(temp2);
		if (count > 0) {
			setError_sal_benifits('');
			postdata(data1);
		} else {
			setError_sal_benifits('Select atleast one salary benifit.');
		}
		console.log(data1);
	};

	let postdata = (data1) => {
		APICALL.service(storePcSalBenifits, 'POST', data1)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					if(cat_subsec_type == 6){
						setCat_fun_updated('salbenifits' + result.pcid);
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
						setCat_subsec_id('');

					}else{
					// setCurrent_sec(6);
					var res1 = sec_completed;
					res1['emp_type'] = true;
					setSec_completed(res1);
					router.push('/manage-pc');
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	let handleRadio = (e, key) => {
		var data1 = [ ...data ];
		var isPublished = e.target.value === 'true' ? true : false;
		data1[key]['mandatory'] = isPublished;
		setData(data1);
		console.log(data)
	};

	return (
		<div className="container">
			<form onSubmit={submit}>
			{pc_view_type == 'editpc' ? <h4 className="h5 mt-3">Edit salary benifits</h4> : (pc_view_type == 'viewpc' ? <h4 className="h5 mt-3">Salary benifits</h4> : '')}
				<div className="row">
					{data.map((val, key) => (
						<div key={key} className={`form-check mt-4 bg-light me-3 ${sec_width}`}>
							<div className="form-check mt-4">
								<input
									disabled={disableForm}
									className="form-check-input"
									type="checkbox"
									value={val.sb_id}
									id={'flexCheckDefault' + key}
									checked={val.checked == true ? true : false}
									onChange={(e) => {
										updateRes(e, key);
									}}
								/>
								<label className="form-check-label" htmlFor="flexCheckDefault">
									{val.name}
								</label>
							</div>
							{val.checked && (
								<div>
									<div className="mt-3">
										<p className="fw-bold">Is this mandatory?</p>

										<div className="d-flex mt-3">
											<div className="form-check  ">
												<input
												    disabled={disableForm}
													className="form-check-input d-flex"
													type="radio"
													value="true"
													name={"yes"+val.sb_id}
													checked={val.mandatory === true}
													onChange={(e) => handleRadio(e, key)}
												/>
												<label className="form-check-label ms-1" htmlFor="exampleRadios1">
													Yes
												</label>
											</div>

											<div className="form-check">
												<input
												    disabled={disableForm}
													className="form-check-input ms-2"
													type="radio"
													name={"yes"+val.sb_id}
													checked={val.mandatory === false}
													onChange={(e) => handleRadio(e, key)}
												/>
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
				{pc_view_type == 'editpc' ? (
					<div className="row">
						<div className="text-start col-md-6" />
						<div className="text-end col-md-6">
							<button
								type="sumit"
								className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							>
								Save
							</button>
						</div>
					</div>
				) :pc_view_type == 'addpc'?
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
				</div>:''
}
			</form>
		</div>
	);
};
export default SalaryBenifits;
