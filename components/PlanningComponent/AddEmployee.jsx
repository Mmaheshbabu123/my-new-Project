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
		<div className="col-md-12" style={{  }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0">
					<div className="row col-md-12" style={{ }}>
						<h1 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0' >Select employee</h1>
					</div>
				</div>
				<div className='col-md-12 selectemp-height'>
				<div className="row col-md-6 m-auto select-relative">
					<label className="custom_astrick form-label mb-3 custom_astrick poppins-regular-16px" style={{ }}>
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
				</div>
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn  btn-block px-0"
							onClick={() => backToDashboard()}
						>
							<p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px">BACK</p>
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary rounded-0  custom-btn px-3  btn-block float-end"
							onClick={() => submit}
						>
							NEXT
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEmployee;
