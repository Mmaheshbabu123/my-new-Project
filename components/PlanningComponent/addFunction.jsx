import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { Printer } from 'react-bootstrap-icons';

const AddFunction = () => {
	const companyid = 4567;
	const pc = 112233;
	const router = useRouter();
	const [ Data, setData ] = useState([]);

	useEffect(() => {
		APICALL.service('http://absoluteyou-backend.local/api/get-planningemployee/' + companyid, 'GET')
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
							console.log(res);
							employees.push([ res[0]['Employee_id'], res[0]['Employee_name'] ]);
						})
						.catch((error) => {
							console.error(error);
						});
				}
				await setData(employees);
				console.log(Data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const submit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="container" style={{ marginTop: '15%', marginBottom: '2%' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row">
						<h1 style={{ display: 'inherit', fontSize: '30px', fontWeight: 'bold' }}>Add function</h1>
					</div>
					<div className="row">
						<div>
							<input type="checkbox" id="sameforall" name="sameforall" value="sameforall" />
							<label>Same function for all employees</label>
						</div>
					</div>
				</div>
				<div className="row">
					<ol type="1">
						{Data.map((key, value) => (
							<div key={key}>
								{value + 1}. {key[1]}
								<Select options={Data} name="employees" />{' '}
							</div>
						))}
					</ol>
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
