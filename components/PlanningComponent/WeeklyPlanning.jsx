import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import Link from 'node_modules/next/link';

function WeeklyPlanning(props) {
	const [ empr_id, setEmpr_id ] = useState(143);
	const [ showview, setShowview ] = useState(false);
	const [ planning, setPlanning ] = useState([]);
	const [ activeWeek, setActiveWeek ] = useState([]);
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
								setPlanning(result.data[1]);
								setActiveWeek(result.data[0][0]);
							}
						})
						.catch((error) => {
							console.error(error);
						});
				}else{
					setPlanning([]);
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
				<p className=" mt-3 mb-1 font-weight-bold   bitter-italic-normal-medium-24">Weekly planning</p>
				<p className=" poppins-regular-16px py-2">For the week of Monday from 01/08/2022 to sunday 06/08/2022</p>

				<div className=" mt-4 d-flex justify-content-end">
					<div className="d-inline ">
						<button
							type="button"
							className="btn  btn my-2 skyblue-bg-color border-0 poppins-regular-16px  rounded-0 btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln   btn-block "
						>
							Planning view
						</button>
					</div>
					<div className=" ">
						<button type="submit" className="btn  my-2 border-0  btn-block btn-bg-gray-medium add-pln poppins-regular-16px">
							Encodage view
						</button>
					</div>
				</div>
				{/* {showview && <p className="h6">For the week of Monday from 10/07/2022 to sunday 17/07/2022</p>}

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
				)} */}
				<div className=" mt-4 d-flex mb-3 ">
					<select
						className="form-select w-25 me-2 rounded-0"
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

					<select className="form-select w-25 me-2 rounded-0">
						<option value="">Select Location</option>
						{locationlist.map((value) => (
							<option key={value.value} value={value.value}>
								{value.title}
							</option>
						))}
					</select>
					<select className="form-select w-25 me-2 rounded-0">
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
					{planning && Object.keys(planning).length > 0  ? (
						<table className="table border table-border-gray ">
							<thead className="">
								{console.log(activeWeek)}
								{activeWeek &&
								activeWeek.length > 0 && (
									<tr className="skyblue-bg-color">
										<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex ">
											Monday<br />
											{activeWeek.length > 0 && activeWeek[0].split('-').reverse().join('-')}
										</th>
										<th className=" table-right-border-white   text-center align-items-center justify-content-center">
											Tuesday <br />
											{activeWeek.length > 0 && activeWeek[1].split('-').reverse().join('-')}
										</th>
										<th className=" table-right-border-white  text-center align-items-center justify-content-center">
											Wednesday <br />
											{activeWeek.length > 0 && activeWeek[2].split('-').reverse().join('-')}
										</th>
										<th className=" table-right-border-white   text-center align-items-center justify-content-center">
											Thursday <br />
											{activeWeek.length > 0 && activeWeek[3].split('-').reverse().join('-')}
										</th>
										<th className=" table-right-border-white  text-center align-items-center justify-content-center">
											Friday<br />
											{activeWeek.length > 0 && activeWeek[4].split('-').reverse().join('-')}
										</th>
										<th className=" table-right-border-white  text-center  align-items-center justify-content-center">
											Saturday<br />
											{activeWeek.length > 0 && activeWeek[5].split('-').reverse().join('-')}
										</th>
										<th className="  text-center  align-items-center justify-content-center">
											Sunday<br />
											{activeWeek.length > 0 && activeWeek[6].split('-').reverse().join('-')}
										</th>
									</tr>
								)}
							</thead>
							{/* <table className="table border border-secondary ">
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
							</thead> */}
							<tbody>
								{ Object.keys(planning).length > 0 &&
									Object.keys(planning).map((value) => (
										<tr className="border-bottom table-border-gray equal-width-calc" key={value}>
											{console.log(planning[value])}
											{planning[value].map((val1, key) => (
												<td className=" table-border-gray font-poppins-light" key={value.id}>
													{console.log(val1.pdate)}
													{console.log('-----------')}
													{console.log(activeWeek[0])}

													{activeWeek.length > 0 && val1.pdate == activeWeek[0] ? (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													) : (
														<div></div>
													)}
													{val1.pdate == activeWeek[1] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
													{val1.pdate == activeWeek[2] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
													{val1.pdate == activeWeek[3] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
													{val1.pdate == activeWeek[4] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
													{val1.pdate == activeWeek[5] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
													{val1.pdate == activeWeek[6] && (
														<div>
															<div className="text-right color-skyblue my-2 mt-1 text-end">
																<a>
																<MdEdit className="float-right" />
															</a>
															</div>
															<p className="color-skyblue">{val1.employee_name}</p>
															<br />
															<p>{val1.employee_type_name}</p>
															<br />
															<p>{val1.function_name}</p>
															<br />
															<p>{'€ ' + val1.salary}</p> <br />
															<br />
														</div>
													)}
												</td>
											))}
											{[ ...Array(7 - planning[value].length) ].map((e, i) => (
												<td className=" table-border-gray font-poppins-light" key={i} />
											))}
										</tr>
									))}
								{/* {console.log(planning)}
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

									</tr>
								))} */}
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
					): <div className='col-md-12 week-height align-items-center d-flex justify-content-center mb-4'>Select company and location to view planning.</div>}
				</div>
				<div className="text-end mb-4">
					<button type="submit" className="btn rounded-0  custom-btn px-3  btn-block float-end ">
					<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL} className="">
										<a className='btn rounded-0  custom-btn px-3  btn-block float-end '>DASHBOARD</a>
									</Link>
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
						<label className="ms-2">Yes</label>
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
						<label className="ms-2">No</label>
					</div>
				</div> */}
			</div>
		</div>
	);
}
export default WeeklyPlanning;
