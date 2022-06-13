import React, { useState, useContext } from 'react';
import { PcContext } from '../../Contexts/PcContext';

// import { useSearchParams } from 'react-router-dom';

const EmployeeType = () => {
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

	let next_redirection = () =>{
		setCurrent_sec(5);
		var res1 = sec_completed;
		res1['emp_type'] = true;
		setSec_completed(res1);
	}

	return (
		<div className="container">
			<div className="row pt-4">
				{/* <p className="h3 text-center mt-2">Edit employee type</p> */}
				<div className="col-sm-5 d-flex form-group bg-light mt-4">
					<input type="checkbox" className="" value="1" />
					<label className="p-3 ms-2 md-4"> Worker</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4  ms-4">
					<input type="checkbox" className="" value="2" />
					<label className="p-3 ms-2 md-4"> Seasonal worker</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4">
					<input type="checkbox" className="" value="3" />
					<label className="p-3 ms-2 md-4"> Occasional worker catering (extra)</label>
				</div>

				<div className="col-sm-5 form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="4" />
					<label className="p-3 ms-2 md-4 ">Working student worker (we dont use)</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4 ">
					<input type="checkbox" className="" value="5" />
					<label className="p-3 ms-2 md-4 ">Clerk Job student</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="6" />
					<label className="p-3 ms-2 md-4 ">Flexijob Clerk</label>
				</div>
			</div>
			<div className="row">
				<div className="text-start col-md-6">
					<button
						type="button"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={()=>{setCurrent_sec(3)}}
					>
						Back
					</button>
				</div>
				<div className="text-end col-md-6">
					<button
						type="sumit"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							next_redirection();
							
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};
export default EmployeeType;
