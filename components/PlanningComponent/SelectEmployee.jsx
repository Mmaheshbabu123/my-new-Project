import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Multiselect from 'multiselect-react-dropdown';
import { APICALL } from '../../Services/ApiServices';
import { Selectemployee } from '../../Services/ApiEndPoints';

const SelectEmployee = () => {
	return (
		<div className="container">
			<p className="h3 mt-3 p-3 text-left">Select Employee</p>
			<div className="row text-center">
				<div className="col-sm-6">
					<Multiselect
						className="mb-2 mt-3 p-2"
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
					/>
					<div className="text-right  ">
						<button type="submit" className="btn btn-secondary   btn-block ">
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SelectEmployee;
