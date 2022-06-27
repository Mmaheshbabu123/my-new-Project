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
	const companyid = 82;
	const router = useRouter();
	var pc = 100;
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	const [ selectedOption, setSelectedOption ] = useState([]);

	useEffect(
		() => {
			var p_unique_key = router.query.p_unique_key;
			p_unique_key = router.query.p_unique_key;
			loadIt(p_unique_key);
		},
		[ router.query ]
	);

	const loadIt = (p_unique_key) => {
		APICALL.service(
			process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getfunctionsbypcnumbers/' + p_unique_key + ',100',
			'GET'
		)
			.then(async (respons) => {
				respons = respons.data;
				await setFunctions(respons);
			})
			.catch((error) => {
				console.error(error);
			});
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
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
	};

	const submit = (e) => {
		router.push('/planning/timings/' + router.query.p_unique_key);
		// e.preventDefault();
		// console.log(selectedOption);
	};

	const addsalary = async (e) => {
		await setSalaries(e.target.value);
	};

	const backToDashboard = () => {
		var p_unique_key = router.query.p_unique_key;
		router.push(process.env.NEXT_PUBLIC_APP_URL + 'planning/employees/' + p_unique_key);
	};
	const saveSalary = async () => {};
	return (
		<div className="container" style={{ marginTop: '5%', marginBottom: '2%' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row">
						<p className="h1">Add function</p>
					</div>
					<div className="form-check">
						<input className="form-check-input " type="checkbox" value="" id="flexCheckChecked" checked />
						<label className="form-check-label p-1 " htmlFor="flexCheckChecked">
							Same functions for all employees
						</label>
					</div>
				</div>
				<div className="row ">
					<ol type="1">
						{Data.map((key, value) => (
							<div key={key} className="row bg-light mb-2 p-3">
								<div className="col-md-3 p-1">
									{value + 1}. {key[1]}
								</div>
								<div className="col-md-4 bg-light">
									<Select
										options={emptypes}
										name="employees"
										onChange={() => {
											setSelectedOption;
										}}
									/>
									{/* {selectedOption == ''?<span>this field is required</span>:''} */}
								</div>
								<div className="col-md-2 bg-light mb-2">
									<span className="p-1">€{salaries}</span>
								</div>
								<div className="col-md-2">
									<input
										type="textfield"
										name="salary"
										className="form-control"
										onChange={{ saveSalary }}
									/>
								</div>
							</div>
						))}
					</ol>
				</div>
				<div className="row">
					<ul>
						{functions.map((key, value) => (
							<div key={key} className="row">
								<div className="col-md-2" />
								<div className="col-md-4">
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
