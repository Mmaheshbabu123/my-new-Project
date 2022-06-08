import React, { Component, useState } from 'react';
// import ReactDOM from 'react-dom';
// import './planning.css';
import Multiselect from 'multiselect-react-dropdown';
import { addPlanning } from '../../Services/ApiEndPoints';

import { APICALL } from '../../Services/ApiServices';

function Planning(props) {
	const [ data, setData ] = useState({
		comp_id: '',
		location_id: '',
		cost_center_id: ''
	});
	let submit = async (event) => {
		event.preventDefault();
		console.log(data);
		APICALL.service(addPlanning, 'POST', data).then((result) => {
			console.log(result);
			// if (result.status === 200) {

			// }
			// else {
			// 	console.log(result);
			// }
		});
	};
	// var company_name = {
	// 	12: 'infanion1',
	// 	13: 'infanion2',
	// 	14: 'infanion3',
	// 	15: 'infanion4'
	// };
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
		<div className="container calc-height ">
			<form onSubmit={(e) => submit(e)}>
				<div className="row   planning-container">
					<p className="md-3 mt-3 font-weight-bold h3">Add Planning</p>
					<div>
						<button type="button" className="btn btn-secondary   btn-block float-right mt-2 mb-2 ms-2">
							+Add project
						</button>
					</div>
					<div className="form-group">
						<label className="form-label mb-2 custom_astrick">Company</label>
						<select
							className="form-select mb-2 mt-2"
							placeholder="select company"
							onChange={(e) => {
								setData((prev) => ({ ...prev, comp_id: e.target.value }));
							}}
						>
							<option>Select</option>
							{companyname.map((options) => <option key={options.value} value={options.value}>{options.label}</option>)}
						</select>
					</div>

					<div className="form-group">
						<label className="form-label mb-2 custom_astrick">Location</label>
						<select
							className="form-select mb-2 mt-2"
							defaultValue="Select Location"
							onChange={(e) => {
								setData((prev) => ({ ...prev, location_id: e.target.value }));
							}}
						>
							<option>Select</option>
							{companyname.map((options) => <option key={options.value} value={options.value}>{options.label}</option>)}
						</select>
					</div>

					<div className="form-group ">
						<label className="form-label mb-2">Cost center</label>
						<select
							className="form-select mb-2 mt-2"
							defaultValue="Select cost center"
							onChange={(e) => {
								setData((prev) => ({ ...prev, cost_center_id: e.target.value }));
							}}
						>
							<option>Select</option>
							{companyname.map((options) => <option key={options.value} value={options.value}>{options.label}</option>)}
						</select>
						{/* <Multiselect
							className="mb-2"
							displayValue="key"
							onKeyPressFn={function noRefCheck() {}}
							onRemove={function noRefCheck() {}}
							onSearch={function noRefCheck() {}}
							onSelect={function noRefCheck() {}}
							options={[
								{
									planning: 'Group 1',
									key: 'Employee 1'
								},
								{
									planning: 'Group 1',
									key: 'Employee 2'
								}
							]}
							placeholder="Select Employee"
						/> */}
					</div>

					<div className="col-md-12 mt-4 ">
						<div className="d-inline">
							<button type="button" className="btn btn-secondary   btn-block ">
								Back
							</button>
						</div>
						<div className="float-right ">
							<button type="submit" className="btn btn-secondary   btn-block ">
								Next
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Planning;
