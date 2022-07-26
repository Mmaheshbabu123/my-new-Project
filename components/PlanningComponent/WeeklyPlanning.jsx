import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';

function WeeklyPlanning(props) {
	const [ empr_id, setEmpr_id ] = useState(143);
	const [ showview, setShowview ] = useState(false);
	const [ planning, setPlanning ] = useState([]);
	const [activeWeek, setActiveWeek] = useState([
		'2022/07/24',
		'2022/07/25',
		'2022/07/26',
		'2022/07/27',
		'2022/07/28',
		'2022/07/29',
		'2022/07/30',
	]);
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
	const [ companylist, setCompanylist ] = useState([]);
	const [ locationlist, setLocationlist ] = useState([]);
	const [ costcenterlist, setCostcenterlist ] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('uid') != null) {
			setEmpr_id(localStorage.getItem('uid'));
			// } else {
			// 	window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
		}
	}, []);

	useEffect(
		() => {
			if (showview == true) {
				if (company != '') {
					APICALL.service(getWeeklyPlanning + company, 'GET')
						.then((result) => {
							if (result.status == 200) {
								setPlanning(result.data);
							}
							console.log(result);
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}
		},
		[ showview, company ]
	);

	useEffect(
		() => {
			if (empr_id) {
				APICALL.service(getEmployeerCompanylist + empr_id, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result);
							setCompanylist(result.data[0]);
							setLocationlist(result.data[1]);
							setCostcenterlist(result.data[2]);
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
		<div className="container-fluid p-0 m-0">
			<div className="row">
				<p className="  mt-1 mb-1 font-weight-bold   px-0  bitter-italic-normal-mediun-24">Weekly Planning</p>
				{showview && <p className="h6">For the week of Monday from 10/07/2022 to sunday 17/07/2022</p>}

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
				<div className=" mt-4 d-flex mb-3 ">
					<select
						className="form-select w-25 me-2 "
						onChange={(e) => {
							setCompany(e.target.value);
						}}
					>
						<option value=""> Select company</option>
						{companylist.map((value) => (
							<option key={value.nid} value={value.nid}>
								{value.title}
							</option>
						))}
					</select>

					<select className="form-select w-25 me-2 ">
						<option value="">Select Location</option>
						{locationlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))}
					</select>
					<select className="form-select w-25 me-2">
						<option value="">Cost center</option>
						{costcenterlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))}
					</select>
					{/* <select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select> */}
				</div>
				<div className="mt-2 ">
					{showview && (
						<table className="table border border-secondary ">
							<thead className="table-light">
								<tr className="border-bottom ">
									<th className="border-end table-right-border-white">
										Monday<br />10-07-2022
									</th>
									<th className="border-end table-right-border-white">
										Tuesday <br />11-07-2022
									</th>
									<th className="border-end table-right-border-white">
										Wednesday <br />12-07-2022
									</th>
									<th className="border-end table-right-border-white">
										Thursday <br />13-07-2022
									</th>
									<th className="border-end table-right-border-white">
										Friday<br />14-07-2022
									</th>
									<th className="border-end table-right-border-white">
										Saturday<br />15-07-2022
									</th>
									<th>
										Sunday<br />16-03-2022
									</th>
								</tr>
							</thead>
							<tbody>
								{console.log(planning)}
								{Object.keys(planning).map((value, key) => (
									<tr className="border-bottom border-secondary" key={value}>
										{planning[value].map((val1) => (
											<td key={val1.id} className="border-end border-secondary">
												<p>{val1.employee_name}</p>
												<p>{val1.employee_type_name}</p>
												<p>{val1.function_name}</p>
												<p>{"€ "+val1.salary}</p>
											</td>
											
										))}

										{/* 6 */}
									</tr>
								))}
							</tbody>
							{/* <tbody>
								<tr className="border-bottom border-secondary">
									{weeklyplanning.map((value) => (
										<td className="border-end border-secondary" key={value.id}>
											<a>
												<MdEdit className="float-right" />
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
							</tbody> */}
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
