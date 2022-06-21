import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { Addcostcenter } from '../../Services/ApiEndPoints';

function AddCostcenter(props) {
	const [ data, setData ] = useState({
		cc_name: '',
		cc_number: '',
		comp_id: '',
		location_id: ''
	});
	let submit = async (event) => {
		event.preventDefault();
		console.log(data);
		APICALL.service(Addcostcenter, 'POST', data)
			.then((result) => {
				console.log(result);
				// if (result.status === 200) {
				// }
				// else {
				// 	console.log(result);
				// }
			})
			.catch((error) => {
				console.error(error);
			});
		// var valid_res = validate(data);
		// if (valid_res) {
		// }
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
					<p className="h3 p-2 mt-2">Add cost center</p>
					<div className="col-md-5">
						<div className="form-group">
							<label className="form-label mb-2 custom_astrick p-1">Cost center name</label>
							<input
								type="text"
								className="form-control p-2"
								onChange={(e) => {
									setData((prev) => ({ ...prev, cc_name: e.target.value }));
								}}
							/>
						</div>
						<div className="form-group">
							<label className="form-label mb-2 custom_astrick p-1 mt-2">
								Unique number for cost center
							</label>
							<input
								type="text"
								className="form-control p-2"
								onChange={(e) => {
									setData((prev) => ({ ...prev, cc_number: e.target.value }));
								}}
							/>
						</div>
						<div>
							<label className="form-label mb-2 custom_astrick mt-2">Company</label>
							<select
								className="form-select mb-2 mt-2"
								placeholder="select company"
								onChange={(e) => {
									setData((prev) => ({ ...prev, comp_id: e.target.value }));
								}}
							>
								<option>Select</option>
								{companyname.map((options) => (
									<option key={options.value} value={options.value}>
										{options.label}
									</option>
								))}
							</select>
							{/* <p className="error mt-2">{error_comp_id}</p> */}
						</div>
						<div>
							<label className="form-label mb-2 custom_astrick mt-2">Location</label>
							<select
								className="form-select mb-2 mt-2"
								placeholder="select company"
								onChange={(e) => {
									setData((prev) => ({ ...prev, location_id: e.target.value }));
								}}
							>
								<option className="">Select</option>
								{companyname.map((options) => (
									<option key={options.value} value={options.value}>
										{options.label}
									</option>
								))}
							</select>
							{/* <p className="error mt-2">{error_comp_id}</p> */}
						</div>
					</div>
					<div className="col-md-12 mt-4 ">
						<div className="d-inline">
							<button type="button" className="btn text-dark btn-link    ">
								Back
							</button>
						</div>
						<div className="float-right ">
							<button type="submit" className="btn btn-light   btn-block ">
								Save
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default AddCostcenter;
