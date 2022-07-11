import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { NextResponse, NextRequest } from 'next/server';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { Printer } from 'react-bootstrap-icons';

const AddEmployee = () => {
	const [ Data, setData ] = useState([]);
	const [ Error, setError ] = useState();
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	const [ defaultvalue, setDefaultValue ] = useState(null);
	const [ selectedOption, setSelectedOption ] = useState([]);

	useEffect(
		() => {
			var p_unique_key = router.query.p_unique_key;
			console.log(p_unique_key);
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getEmployeeByUsingCompanyId/' + p_unique_key,
				'GET'
			)
				.then((result) => {
					 getOptions(result,1);
				})
				.catch((error) => {
					console.error(error);
				});

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/selectedEmployees/' + p_unique_key, 'GET')
				.then((result) => {
					getOptions(result,2);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	const getOptions = (res,c) => {
		var options = [];
		if (res !== null) {
			res.map((val, key) => {
				var opt = {
					value: '',
					label: ''
				};
				opt.value = val.Employee_id;
				opt.label = val.Employee_name;

				options[key] = opt;
			});
			if(c==1){
			  setData(options);
			}else{
				setSelectedOption(options);
			}
		}
	};

	const submit = (e) => {
		e.preventDefault();
		
		var err = ValidationService.emptyValidationMethod(selectedOption);

		if (err != '') {
			setError(err);
		} else {
			setError(err);
			if(selectedOption.length!=0){
			let data = [ selectedOption, p_unique_key ];

			APICALL.service(addplanningemployee, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						router.push('/planning/functions/' + p_unique_key);
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
			}else{
				router.push('/planning/functions/' + p_unique_key);
			}
		}
	};

	const backToDashboard = () => {
		router.push('/planning/add/' + p_unique_key);
	};
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
					{console.log(Data)}
					{console.log(selectedOption)}

					<Select
					    value={selectedOption}
						isMulti
						name="employees"
						options={Data}
						onChange={setSelectedOption}
					/>
					<span style={{ color: 'red' }}>{Error}</span>
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
							onClick={() => submit}
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
