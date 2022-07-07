import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import { fetchEmployeeTypes, storePcEmployeeTypes, getPcEmployeeTypes } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';

const EmployeeType = () => {
	const router = useRouter();
	const [ disableForm, setDisableForm ] = useState(false);
	const [ sec_width, setSec_width ] = useState('col-md-5');


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
	const [ id, setId ] = useState('');

	const [ data, setData ] = useState([]);
	const [ temp, setTemp ] = useState([]);
	const [ temp2, setTemp2 ] = useState([]);

	const [ res, setRes ] = useState([]);
	const [ error_emp_type, setError_emp_type ] = useState('');

	useEffect(
		() => {
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


	useEffect(()=>{
		APICALL.service(getPcEmployeeTypes+pc_unique_key, 'GET')
					.then((result) => {
						console.log(result);
						if (result.data.length > 0) {
							setRes(result.data);
							setTemp(result.data);
						}
					})
					.catch((error) => {
						console.error(error);
					});
	},[pc_unique_key])

	let updateRes = (event) => {
		var res1 = [...res];
		var temp1 = [...temp2];
		var index2 = temp.indexOf(parseInt(event.target.value));

		if (event.target.checked) {
			if (!res1.includes(parseInt(event.target.value))) {
				res1.push(parseInt(event.target.value));
			}
			if( index2 > -1){
				temp1.splice(index2, 1);
				setTemp2(temp1);
			}
			console.log('✅ Checkbox is checked');
		} else {
			var index = res1.indexOf(parseInt(event.target.value));
			if (index > -1) {
				res1.splice(index, 1);
				
				// 2nd parameter means remove one item only
			}
			if( index2 > -1){
				temp1.push(parseInt(event.target.value)); 
				setTemp2(temp1);
			}
		// 	var index2 = temp.indexOf(parseInt(event.target.value));

		// 	if( index2 > -1){
		// 		temp1.push(parseInt(event.target.value));
		// }
			
			console.log('⛔️ Checkbox is NOT checked');
		}
		
		setRes(res1);
		
	};
	let postdata = (data1) => {
		if (id == '') {
			APICALL.service(storePcEmployeeTypes, 'POST', data1)
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						if(cat_subsec_type == 5){
							setCat_fun_updated('employeetype' + result.pcid);
							setCat_rightsec('d-none');
							setCat_leftsec('col-md-12');
							setCat_subsec_type(0);
							setCat_subsec_id('');

						}else{
						setCurrent_sec(5);
						var res1 = sec_completed;
						res1['emp_type'] = true;
						setSec_completed(res1);
						}
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
		data1.push(temp2);
		if (res.length != 0) {
			postdata(data1);
		} else {
			setError_emp_type('Select atleast one employee type.');
		}
		console.log(data1);
	};

	return (
		<div className="container">
			<form onSubmit={submit}>
			{pc_view_type == 'editpc' ? <h4 className="h5 mt-3">Edit employee type</h4> : (pc_view_type == 'viewpc'?<h4 className="h5 mt-3">Employee type</h4> :'')}

				<div className="row pt-4">
					{data.map((val) => (
						<div className={"form-check mt-4 "+sec_width} key={val.id}>
							<input
								disabled={disableForm}
								type="checkbox"
								className="form-check-input"
								value={val.id}
								checked = {res.includes(val.id)?true:false} 
								onChange={(e) => {
									updateRes(e);
								}}
							/>{console.log(res)}
							<label className="form-check-label"> {val.name}</label>
						</div>
					// 	<div className="form-check mt-4">
					// 	<input
					// 		disabled={disableForm}
					// 		className="form-check-input"
					// 		type="checkbox"
					// 		value={val.sb_id}
					// 		id={'flexCheckDefault' + key}
					// 		checked={val.checked == true ? true : false}
					// 		onChange={(e) => {
					// 			updateRes(e, key);
					// 		}}
					// 	/>
					// 	<label calssName="form-check-label" htmlFor="flexCheckDefault">
					// 		{val.name}
					// 	</label>
					// </div>
					))}
					<p className="mt-2" style={{ color: 'red' }}>
						{error_emp_type}
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
				) : pc_view_type == 'addpc'?
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
							Next
						</button>
					</div>
				</div>:''
}
			</form>
		</div>
	);
};
export default EmployeeType;
