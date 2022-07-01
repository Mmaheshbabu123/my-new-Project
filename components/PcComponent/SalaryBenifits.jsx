import React, { useState, useContext, useEffect } from 'react';
import { fetchSalaryBenefits } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import styles from '../../styles/Pc.module.css';

const SalaryBenifits = () => {
	
	const [ visible, setVisible ] = useState(false);
	const [ data, setData ] = useState([]);
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

	return (
		<div className="container">
			<div className="row">
				{data.map((val, key) => (
					<div className={`form-check mt-4 col-md-5 bg-light me-3`}>
						<div className="form-check mt-4">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id={"flexCheckDefault"+key}
								// onClick={(e) => setVisible(!visible)}
							/>
							<label calssName="form-check-label" htmlFor="flexCheckDefault">
								{val.name}
							</label>
						</div>
						<div>
								<div className="mt-3">
									<p className='fw-bold'>Is this mandatory?</p>
									<div className="d-flex mt-3">
										<div className="form-check  ">
											<input className="form-check-input d-flex" type="radio" value="option1" />
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
					</div>
				))}
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
		</div>
	);
};
export default SalaryBenifits;
