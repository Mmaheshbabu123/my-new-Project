import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';

function WeeklyPlanning(props) {
	const [ empr_id, setEmpr_id ] = useState(86);
	const [ showview, setShowview ] = useState(false);
	const [ weeklyplanning, setWeeklyPlanning ] = useState([
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
	]);
	const [ location, setLocation ] = useState('');
	const [ company, setCompany ] = useState(253);
	const [ project, setProject ] = useState('');
	const [ costcenter, setCostcenter ] = useState('');
	const [ companylist, setCompanylist ] = useState('');

	// useEffect(() => {
	// 	if (localStorage.getItem('uid') != null) {
	// 		setEmpr_id(localStorage.getItem('uid'));
	// 	} else {
	// 		window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
	// 	}
	// }, []);

	useEffect(
		() => {
			if (showview == true) {
				if(company != ''){
				APICALL.service(getWeeklyPlanning + company, 'GET')
					.then((result) => {
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
				}
			}
		},
		[ showview,company ]
	);

	useEffect(
		() => {
			if (empr_id) {
				APICALL.service(getEmployeerCompanylist + empr_id, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result);
							setCompanylist(result.data[0]);
							console.log(result.data[0]);
							setShowview(true);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ empr_id ]
	);
	return (
		<div className="container">
			<div className="row">
				<p className="mt-2 mb-2 h3">Weekly Planning</p>
				{showview && <p className="h6">For the week of Monday from 27/06/2022 to sunday 03/07/2022</p>}

				{showview && (
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
				)}
				<div className=" mt-4 d-flex mb-3  ">
					<select className="form-select w-25 me-2 ">
						<option> Select company</option>
						{Object.keys(companylist).map((value) => (
							<option key={value} value={companylist[value].nid}>
								{companylist[value].title}
							</option>
						))}
					</select>

					<select className="form-select w-25 me-2 ">
						<option>Select Location</option>
						<option value="">Bangalore</option>
						<option value="">Mangalore</option>
					</select>
					<select className="form-select w-25 me-2">
						<option>Cost center</option>
						<option value="">Cost center 1</option>
						<option value="">Cost center 2</option>
					</select>
					<select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select>
				</div>
				<div className="mt-2 ">
					{showview && (
						<table className="table border border-secondary ">
							<thead className="">
								<tr className="">
									<th className="border-end border-secondary">
										Monday<br />27-06-2022
									</th>
									<th className="border-end border-secondary">
										Tuesday <br />28-06-2022
									</th>
									<th className="border-end border-secondary">
										Wednesday <br />29-06-2022
									</th>
									<th className="border-end border-secondary">
										Thursday <br />30-06-2022
									</th>
									<th className="border-end border-secondary">
										Friday<br />01-07-2022
									</th>
									<th className="border-end border-secondary">
										Saturday<br />02-07-2022
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
					)}
				</div>
				<div className="text-end ">
					<button type="submit" className="btn btn-secondary   btn-block ">
						Dashboard
					</button>
				</div>
				{/* <div>
					<p className="h5">Is the planning final?</p>
					<div>
						<input
							className="form-check-input"
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value=""
							aria-label="..."
						/>
						<labe className="ms-2">Yes</labe>
					</div>
					<div className="">
						<input
							className="form-check-input "
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value=""
							aria-label="..."
						/>
						<labe className="ms-2">No</labe>
					</div>
				</div> */}
			</div>
		</div>
	);
}
export default WeeklyPlanning;
