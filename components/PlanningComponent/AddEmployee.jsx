import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { data } from 'autoprefixer';

const AddEmployee = () => {
	var companyid = 106;
	const [ Data, setData ] = useState([]);
	const [ LastName, setLastName ] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		APICALL.service('http://absoluteyou.com/getemployeebycompany?_format=json&nid=' + companyid, 'GET')
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

       console.log(selectedOption);

	}

	const valid=(e)=>{
       console.log()
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
