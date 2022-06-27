import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
// import { FormControl } from 'react-bootstrap';
// import { FormLabel } from 'react-bootstrap';
// import { Printer } from 'react-bootstrap-icons';

const AddFunction = () => {
	const companyid = 4567;
	const pc = 112233;
	const router = useRouter();
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);

	useEffect(() => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getfunctionsbypcnumbers/4567,112233', 'GET')
			.then(async (respons) => {
				respons = respons.data;
				await setFunctions(respons);
				console.log(functions);
			})
			.catch((error) => {
				console.error(error);
			});
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + companyid, 'GET')
			.then(async (result) => {
				var data = result.data;
				var employees = [];
				for (var i = 0; i < data.length; i++) {
					await APICALL.service(
						process.env.NEXT_PUBLIC_APP_URL_DRUPAL +
							'getemployeebycompany/?_format=json&emp_id=' +
							data[i][3],
						'GET'
					)
						.then((res) => {
							employees.push([ res[0]['Employee_id'], res[0]['Employee_name'] ]);
						})
						.catch((error) => {
							console.error(error);
						});
				}
				await setData(employees);
			})
			.catch((error) => {
				console.error(error);
			});
		//fetching employee types name,id
		var employeetypes = [];
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getemployeetypebypcnumber/' + pc, 'POST')
			.then(async (res) => {
				var result = res.employeetypes;
				for (let i = 0; i < result.length; i++) {
					var opt = {
						value: '',
						label: ''
					};
					opt.value = result[i]['id'];
					opt.label = result[i]['name'];
					employeetypes[i] = opt;
				}
				await setEmptypes(employeetypes);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const submit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="container" style={{ marginTop: '5%', marginBottom: '2%' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row">
						<h1 style={{ display: 'inherit', fontSize: '30px', fontWeight: 'bold' }}>Add function</h1>
					</div>
					<div className="row" style={{ marginBottom: '1%' }}>
						<div>
							<input type="checkbox" id="sameforall" name="sameforall" value="sameforall" />
							<label style={{ paddingLeft: '10px' }}>Same function for all employees</label>
						</div>
					</div>
				</div>
				<div className="row">
					<ol type="1">
						{Data.map((key, value) => (
							<div className="row" style={{ marginBottom: '1%', backgroundColor: 'gray' }}>
								<div className="col-md-3">
									{value + 1}. {key[1]}
								</div>
								<div className="col-md-4">
									<Select options={emptypes} name="employees" />
								</div>
							</div>
						))}
					</ol>
				</div>
				<div className='row'>
                      <ul>
					  {functions.map((key, value) => (
						  <div className='row'>
						  <div className='col-md-2'></div>
						  <div className='col-md-4'>
						  <div>
						        <input type="radio" value={key[0]} name="functions" /> {key[1]}
							</div>
							</div>
							</div>
						))}
					</ul>
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

export default AddFunction;
