import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { Weeklyplanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';

function WeeklyPlanning(props) {
	const weeklyplanning = [
		{
			id: 1,
			fullName: 'Steve Jobs',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		},
		{
			id: 2,
			fullName: 'Jessica warren',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		},
		{
			id: 3,
			fullName: 'Tony Frank',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		}
	];
	return (
		<div className="container">
			<div className="row">
				<p className="mt-2 mb-2 h3">Weekly Planning</p>
				<p className="h6">For the Week of monday from 24-04-2022 to sunday 30-04-2022</p>

				<div className=" mt-4 d-flex justify-content-end">
					<div className="d-inline ">
						<button type="button" className="btn btn-dark   btn-block ">
							Planning view
						</button>
					</div>
					<div className=" ">
						<button type="submit" className="btn btn-outline-dark ms-2   btn-block ">
							Encodage view
						</button>
					</div>
				</div>
				<div className=" mt-4 d-flex mb-3  ">
					<select className="form-select w-25 me-2 ">
						<option> Select company</option>
						<option value="">Infanion</option>
						<option value="">Wipro</option>
					</select>
					<select className="form-select w-25 me-2 ">
						<option>Select Location</option>
						<option value="">Bangalore</option>
						<option value="">Mangalore</option>
					</select>
					<select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select>
				</div>
				<div className="mt-2 ">
					<table className="table border border-secondary ">
						<thead className="">
							<tr className="">
								<th className="border-end border-secondary">
									Monday<br />07-03-2022
								</th>
								<th className="border-end border-secondary">
									Tuesday <br />08-03-2022
								</th>
								<th className="border-end border-secondary">
									Wednesday <br />09-03-2022
								</th>
								<th className="border-end border-secondary">
									Thursday <br />10-03-2022
								</th>
								<th className="border-end border-secondary">
									Friday<br />11-03-2022
								</th>
								<th className="border-end border-secondary">
									Saturday<br />12-03-2022
								</th>
								<th>
									Sunday<br />13-03-2022
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-bottom border-secondary">
								{weeklyplanning.map((value) => (
									<td className="border-end border-secondary" key={value.id}>
										<a>
											<MdEdit className="float-right" />
											{/* <i className="bi bi-pencil float-right" /> */}
										</a>
										{value.fullName}
										<br />
										{value.worktype}
										<br />
										{value.Productie}
										<br />
										{value.salary} <br />
										{value.time} <br />
										{value.totalhours}
										<br />
									</td>
								))}
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
							</tr>
							<tr className="border-bottom border-secondary">
								{weeklyplanning.map((value) => (
									<td className="border-end border-secondary" key={value.id}>
										{value.fullName}
										<br />
										{value.worktype}
										<br />
										{value.Productie}
										<br />
										{value.salary}
										<br />
										{value.time}
										<br />
										{value.totalhours}
										<br />
									</td>
								))}
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
								<td className="border-end border-secondary" />
							</tr>
						</tbody>
					</table>
				</div>
				<div className="text-end ">
					<button type="submit" className="btn btn-secondary   btn-block ">
						Dashboard
					</button>
				</div>
			</div>
		</div>
	);
}
export default WeeklyPlanning;
