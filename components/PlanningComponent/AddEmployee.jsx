import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { NextResponse, NextRequest } from 'next/server'
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { Printer } from 'react-bootstrap-icons';


const AddEmployee = () => {
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	//var companyid = 82;
	const [ Data, setData ] = useState([]);
	const [Error,setError]  = useState();
	//const [companyid,setCompanyid]=useState();
	const [selectedOption, setSelectedOption] = useState([]);

	useEffect(() => {
        var companyid='';
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/getcompanyidbyuniqkey/'+p_unique_key, 'GET')
			.then(async(result) => {
				 companyid=result;
			})
			.catch((error) => {
				console.error(error);
			});
		APICALL.service(process.env.NEXT_PUBLIC_APP_URL_DRUPAL+'getemployeebycompany?_format=json&nid='+companyid, 'GET')
			.then((result) => {
				if (result.length > 0) {
					getOptions(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const getOptions = (res) => {
		var options = [];
		res.map((val, key) => {
			var opt = {
				value: '',
				label: ''
			};
			opt.value = val.Employee_id;
			opt.label = val.Employee_name;

			options[key] = opt;
		});
		setData(options);
	};

	const submit=(e)=>{

		e.preventDefault();
		console.log(router.query.p_unique_key)

		var err = ValidationService.emptyValidationMethod(selectedOption);

		if(err!=''){
			setError(err);
		}else{
			setError(err);
		const unique_key =4567 ;
		//Router.query.P_unique_key
        let data=[selectedOption,p_unique_key];
		APICALL.service(addplanningemployee, 'POST',data)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
				   console.log(result.status);
				   router.push('/planning/functions/'+p_unique_key);
				} else {
					console.log(result);
				}

			})
			.catch((error) => {
				console.error(error);
			});
		}
	}

  const backToDashboard=()=>{
	router.push(process.env.NEXT_PUBLIC_APP_URL+"planning/add/11");
  }
	return (
		<div className="container" style={{ marginTop: '15%', marginBottom: '2%', fontWeight: 'bold' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row" style={{ marginBottom: '5%' }}>
						<h1 style={{ display: 'inherit', fontSize: '30px' }}>Select employee</h1>
					</div>
				</div>
				<div className="row">
					<label className="custom_astrick" style={{ paddingBottom: '0.5%' }}>
						Employee
					</label>
					<Select options={Data} name='employees' onChange={setSelectedOption} isMulti  />
					<span style={{color:'red'}}>{Error}</span>
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => backToDashboard()}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						    onClick={()=>submit} 
						>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEmployee;
