import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { addProject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

// import './addproject.css';

const Addproject = () => {
	const [ data, setData ] = useState({
		project_name: '',
		project_location: '',
		hno: '',
		city: '',
		extra: '',
		comp_id: '',
		street: '',
		postal_code: '',
		country: ''
	});
	let submit = async (event) => {
		event.preventDefault();
		console.log(data);
		APICALL.service(addProject, 'POST', data).then((result) => {
			console.log(result);
			// if (result.status === 200) {

			// }
			// else {
			// 	console.log(result);
			// }
		});
	};
	const companyname = [
		{
			value: '10',
			label: 'Infanion1'
		},
		{
			value: '11',
			label: 'Infanion2'
		},
		{
			value: '12',
			label: 'Infanion3'
		},
		{
			value: '13',
			label: 'Infanion4'
		}
	];
	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<p className="mt-4 mb-2 h3">Add project</p>

					<div className="col-sm-6  ">
						{/* PROJECT NAME */}
						<label className="font-weight-bold">Project name</label>
						<input
							type="text"
							className="form-control mt-2 mb-2 "
							onChange={(e) => {
								setData((prev) => ({ ...prev, project_name: e.target.value }));
							}}
						/>
						<div />

						{/* LOCATION */}
						<label className="mt-2">Location</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, project_location: e.target.value }));
							}}
						/>
						<div />
						{/* HOUSE NUMBER */}
						<label>House number</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, hno: e.target.value }));
							}}
						/>

						<label>City</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, city: e.target.value }));
							}}
						/>

						<label>Extra</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, extra: e.target.value }));
							}}
						/>
					</div>

					<div className="col-sm-6">
						<label>Company</label>
						<select
							className="form-select mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, comp_id: e.target.value }));
							}}
						>
							<option value="1">Select company</option>
							{companyname.map((options) => (
								<option key={options.value} value={options.value}>
									{options.label}
								</option>
							))}
						</select>
						<label>Street</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, street: e.target.value }));
							}}
						/>

						<label>Postalcode</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							onChange={(e) => {
								setData((prev) => ({ ...prev, postal_code: e.target.value }));
							}}
						/>

						<label>Country</label>
						<select
							className="form-select mt-2 mb-2 custom-select"
							onChange={(e) => {
								setData((prev) => ({ ...prev, country: e.target.value }));
							}}
						>
							<option>Select country</option>
							{companyname.map((options) => (
								<option key={options.value} value={options.value}>
									{options.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<button type="submit" className="btn btn-secondary btn-lg btn-block float-right">
					Save
				</button>
			</form>
		</div>
	);
};

export default Addproject;
