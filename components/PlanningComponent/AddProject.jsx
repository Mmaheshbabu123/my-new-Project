import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
// import './addproject.css';

const Addproject = () => {
	const [ project, setProject ] = useState();
	const [ projectErr, setProjectErr ] = useState(false);

	// const [ location, setLocation ] = useState();
	// const [ locationErr, setLocationErr ] = useState(false);

	// const [ houseNum, setHouseNum ] = useState();
	// const [ houseNumErr, setHouseNumErr ] = useState();

	const projectHandler = (e) => {
		if (project.length == 0) {
			setProjectErr(true);
		} else if (location.length == 0) {
			setLocationErr(true);
		}
		if (project) {
			console.log(project);
			console.log(location);
		}
		e.preventDefault();
	};
	return (
		<div className="container">
			<form onSubmit={projectHandler}>
				<div className="row">
					<h4 className="mt-4 mb-2">Add project</h4>

					<div className="col-sm-6  ">
						{/* PROJECT NAME */}
						<label className="font-weight-bold">Project name</label>
						<input
							type="text"
							className="form-control mt-2 mb-2 "
							onChange={(e) => setProject(e.target.value)}
						/>
						<div>
							{projectErr && project.length <= 0 ? (
								<label className="text-danger">This field is required</label>
							) : (
								' '
							)}
						</div>

						{/* LOCATION */}
						<label className="mt-2">Location</label>
						<input
							type="text"
							className="form-control mt-2 mb-2"
							// onChange={(e) => setLocation(e.target.value)}
						/>
						<div>
							{/* {locationErr && location.length <= 0 ? (
								<label className="text-danger">This field is required</label>
							) : (
								' '
							)} */}
						</div>
						{/* HOUSE NUMBER */}
						<label>House number</label>
						<input type="text" className="form-control mt-2 mb-2" />

						<label>City</label>
						<input type="text" className="form-control mt-2 mb-2" />

						<label>Extra</label>
						<input type="text" className="form-control mt-2 mb-2" />
					</div>

					<div className="col-sm-6">
						<label>Company</label>
						<select className="form-select mt-2 mb-2">
							<option value="1">Select company</option>
							<option value="Infanion">Infanion</option>
							<option value="Wipro">Wipro</option>
						</select>
						<label>Street</label>
						<input type="text" className="form-control mt-2 mb-2" />

						<label>Postalcode</label>
						<input type="text" className="form-control mt-2 mb-2" />

						<label>Country</label>
						<select className="form-select mt-2 mb-2 custom-select">
							<option>Select country</option>
							<option>Belgium</option>
							<option value="Wipro">India</option>
						</select>
					</div>
				</div>
				<button className="btn btn-secondary btn-lg btn-block float-right" type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default Addproject;
