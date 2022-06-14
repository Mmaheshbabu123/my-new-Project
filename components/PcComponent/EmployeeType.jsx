import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import ValidationService from '../../Services/ValidationService';
import { fetchEmployeeTypes, storePcEmployeeTypes } from '../../Services/ApiEndPoints';
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
	const [ id, setId ] = useState('');

	const [ data, setData ] = useState([]);
	const [ res, setRes ] = useState([]);
	const [ error_emp_type, setError_emp_type ] = useState('');

	let next_redirection = () => {
		setCurrent_sec(5);
		var res1 = sec_completed;
		res1['emp_type'] = true;
		setSec_completed(res1);
	};
	useEffect(() => {
		if (pc_unique_key != '') {
			APICALL.service(fetchEmployeeTypes, 'GET')
				.then((result) => {
					console.log(result);
					if (result.data.length > 0) {
						setData(result.data);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);
	let updateRes = (event) => {
		var res1 = res;
		if (event.target.checked) {
			if (!res1.includes(event.target.value)) {
				res1.push(event.target.value);
			}
			console.log('✅ Checkbox is checked');
		} else {
			const index = res1.indexOf(event.target.value);
			if (index > -1) {
				res1.splice(index, 1); // 2nd parameter means remove one item only
			}
			console.log('⛔️ Checkbox is NOT checked');
		}
		setRes(res1);
		console.log(console.log(res1));
	};
	let postdata = (data1) => {
		console.log(data1);
		if (id == '') {
			APICALL.service(storePcEmployeeTypes, 'POST', data1)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						alert("success");
						setId(result.pcid);

						backToDashboard();
						// setCat_fun_updated('cat' + result.ctid);
						// setCat_rightsec('d-none');
						// setCat_leftsec('col-md-12');
						// setCat_subsec_type(0);
						// setCat_subsec_id('');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			APICALL.service(catUpdate, 'POST', data1)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setCat_fun_updated('catupdate' + result.ctid);
						setCat_rightsec('d-none');
						setCat_leftsec('col-md-12');
						setCat_subsec_type(0);
						setCat_subsec_id('');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	let submit = (event) => {
		event.preventDefault();
		var data1 = [];
		data1.push(pc_unique_key);
		data1.push(res);
		if (res.length != 0) {
			postdata(data1);
		} else {
			setError_emp_type('Select atleast one employee type.');
		}
		console.log(data1);
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
			<form onSubmit={submit}>
				<div className="row pt-4">
					{/* <p className="h3 text-center mt-2">Edit employee type</p> */}
					{data.map((val) => (
						<div className="col-sm-5 d-flex form-group bg-light mt-4" key={val.id}>
							<input
								type="checkbox"
								className=""
								value={val.id}
								onClick={(e) => {
									updateRes(e);
								}}
								// defaultChecked={true}
							/>
							<label className="p-3 ms-2 md-4"> {val.name}</label>
						</div>
					))}
					<p className="mt-2" style={{ color: 'red' }}>
						{error_emp_type}
					</p>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								setCurrent_sec(3);
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
export default EmployeeType;
