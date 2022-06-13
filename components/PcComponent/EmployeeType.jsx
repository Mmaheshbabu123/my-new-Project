import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import ValidationService from '../../Services/ValidationService';
import { fetchEmployeeTypes, getAllPc } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

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
	useEffect(
		() => {
			if (pc_unique_key != '') {
				APICALL.service(getAllPc, 'GET')
					.then((result) => {
						console.log(result);
				// 		if (result.data.length > 0) {
				// 			var data1 = data;
				// 			var count = result.data.length;

				// 			data1.age = count == 3 ? '1' : count == 4 ? '2' : count == 5 ? '3' : count == 6 ? '4' : '';

				// 			setShowhideage(data1.age);
				// 			result.data.forEach(
				// 				(val) => {
				// 					if (val.type == '1') {
				// 						data1.min_sal_15 = val.min_sal_percent;
				// 					} else if (val.type == '2') {
				// 						data1.min_sal_16 = val.min_sal_percent;
				// 					} else if (val.type == '3') {
				// 						data1.min_sal_17 = val.min_sal_percent;
				// 					} else if (val.type == '4') {
				// 						data1.min_sal_18 = val.min_sal_percent;
				// 					} else if (val.type == '5') {
				// 						data1.min_sal_19 = val.min_sal_percent;
				// 					} else if (val.type == '6') {
				// 						data1.min_sal_20 = val.min_sal_percent;
				// 					}
				// 					setId(val.pcid);
				// 				}
				// 				// foreach(data.result as ){
				// 				// 	((val, key) => (
				// 			);

				// 			// 	// /console.log(val)

				// 			// ));
				// 			setData(data1);
				// 			console.log(data);
				// 			// setData(result.data[0])
				// 		}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ pc_unique_key ]
	);

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
