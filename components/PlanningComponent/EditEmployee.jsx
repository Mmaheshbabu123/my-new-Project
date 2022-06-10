import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { Weeklyplanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';

const EditEmployee = () => {
	return (
		<div className="container">
			<div className="row">
				<p className="mt-5 mb-2 h4">Edit Employee</p>
				<div className="form-group ">
					<label className="mb-2">Employee name</label>
					<input type="text" className="form-control mb-2" defaultValue="" />
					<label className=" mb-2">Employee type</label>
					<input type="text" className="form-control mb-2" defaultValue="" />
					<label className=" mb-2">Function</label>
					<input type="text" className="form-control mb-2" defaultValue="" />
					<label className=" mb-2">Minimum Salary</label>
					<input type="text" className="form-control mb-2" defaultValue="" />
				</div>
				<div className="mt-4 d-flex ">
					<div className="d-inline">
						<label className="mt-4 mb-1">Start time</label>
						<input type="text" className="form-control mt-2   " defaultValue="" />
					</div>

					<div className="">
						<label className="mt-4 mb-1">End time</label>
						<input type="text" className="form-control mt-2 ml-3 " defaultValue="" />
					</div>
				</div>
			</div>
			<div className="text-end ">
				<button type="submit" className="btn btn-secondary   btn-block ">
					Save
				</button>
			</div>
		</div>
	);
};
export default EditEmployee;
