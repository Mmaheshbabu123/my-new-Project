import React, { Component, useState } from 'react';
// import ReactDOM from 'react-dom';
// import './planning.css';
import Multiselect from 'multiselect-react-dropdown';

const Planning = () => {
	// const [ company, setCompany ] = useState('');
	// const [ companyErr, setCompanyErr ] = useState(false);

	// const [ location, setLocation ] = useState('');
	// const [ locationErr, setLocationErr ] = useState(false);

	// const [ employee, setEmployee ] = useState('');
	// const [ employeeErr, setEmployeeErr ] = useState(false);

	// // COMPANY VALIDATION //
	// function companyHandler(e) {
	// 	let item = e.target.value;
	// 	if (company) {
	// 		setCompanyErr(true);
	// 	} else {
	// 		setCompanyErr(false);
	// 	}
	// 	setCompany(item);
	// }
	// //LOCATION VALIDATION //
	// function locationHandler(e) {
	// 	let item = e.target.value;
	// 	if (location) {
	// 		setLocationErr(true);
	// 	} else {
	// 		setLocationErr(false);
	// 	}
	// 	setLocation(item);
	// }
	// //EMPLOYEE VALIDATION //
	// function employeeHandler(e) {
	// 	let item = e.target.value;
	// 	if (!employee) {
	// 		setEmployeeErr(true);
	// 	} else {
	// 		setEmployeeErr(false);
	// 	}
	// 	setEmployee(item);
	// }
	// function planningHandler(e) {
	// 	if (company || location || employee) {
	// 		alert('invalid');
	// 	} else {
	// 		alert('ok');
	// 	}
	// 	e.preventDefault();
	// }

	return (
		<div className="container calc-height ">
			<form
			// onSubmit={planningHandler}
			>
				<div className="row justify-content-center align-items-center planning-container">
					<h3 className="md-3 mt-3 font-weight-bold">Add Planning</h3>
					<div>
						<input
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							type="button"
							value="+ Add project"
						/>
					</div>
					<div className="form-group">
						<label className="form-label mb-2">Company</label>
						<select
							className="form-select mb-2 mt-2"
							placeholder="select company"
							// onChange={companyHandler}
						>
							<option value="Infanion">Infanion</option>
							<option value="Wipro">Wipro</option>
						</select>
						{/* {companyErr ? <span>This field is required.</span> : null} */}
					</div>

					<div className="form-group">
						<label className="form-label mb-2">Location</label>
						<select
							className="form-select mb-2 mt-2"
							defaultValue="Select Location"
							// onChange={locationHandler}
						>
							<option defaultValue>Select Location</option>
							<option value="Bangalore">Bangalore</option>
							<option value="Mysore">Mysore</option>
						</select>
						{/* {locationErr ? <span>This field is required.</span> : null} */}
					</div>

					<div className="form-group ">
						<label className="form-label mb-2  ">Employee</label>
						<Multiselect
							className="mb-2"
							displayValue="key"
							onKeyPressFn={function noRefCheck() {}}
							onRemove={function noRefCheck() {}}
							onSearch={function noRefCheck() {}}
							onSelect={function noRefCheck() {}}
							// onChange={employeeHandler}
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
						/>
						{/* {employeeErr ? <span>This field is required.</span> : null} */}
					</div>

					<div className="col-md-12 mt-4">
						<a
							href="#"
							className="btn  btn-lg btn-block float-right planning-next"
							// onClick={planningHandler}
						>
							Next
						</a>
						<a href="#" className="btn  btn-lg btn-block planning-back">
							Back
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Planning;
