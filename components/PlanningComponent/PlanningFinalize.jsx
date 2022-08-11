import React, { Component, useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { planningoverview, getweekly_planning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import Link from 'next/link';
import moment from 'moment';

const PlanningFinalize = () => {
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	const [ planning, setPlanning ] = useState([]);
	const [ enableEdit, setEnableEdit ] = useState(true);
	const [ week, setWeek ] = useState([]);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ finalized, setFinalized ] = useState('');
	const [ errorFinalize, setErrorFinalize ] = useState('');

	useEffect(
		() => {
			if (!router.isReady) return;
			APICALL.service(planningoverview + router.query.p_unique_key, 'GET')
				.then((result) => {
					console.log(result.data);
					if (result.data.length > 0) {
						setPlanning(result.data[1][0]);
						setWeek(result.data[0]);
						setActiveWeek(result.data[0][0]);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.isReady ]
	);
	let submit = () => {
		if (finalized == '') {
			setErrorFinalize('This field is required.');
		} else {
		}
	};
	let handleRadio = (e) => {
		setErrorFinalize('');
		var finalise = e.target.value === 'true' ? true : false;
		setFinalized(finalise);
	};
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row m-0">
				<p className="pt-3 pb-3 font-weight-bold bitter-italic-normal-medium-24 h4 p-0 manage-sticky">
					Planning finalize
				</p>
				{/* <p className=" poppins-regular-16px">For the week of Monday from 01/08/2022 to sunday 06/08/2022</p> */}
				<div className=" mt-4 d-flex mb-3  ">
					<select className="form-select w-25 me-2  border-0 select-bg-gray" disabled>
						{planning.company != '' && <option value="">{planning.company}</option>}
					</select>
					<select className="form-select w-25 me-2 border-0 select-bg-gray" disabled>
						{planning.location != '' && <option value="">{planning.location}</option>}
					</select>
					{planning.cost_center_id != null && (
						<select className="form-select w-25 me-2 border-0 select-bg-gray" disabled>
							<option value="">{planning.cost_center}</option>
						</select>
					)}
					{planning.project_name != null && (
						<select className="form-select w-25 me-2 border-0 select-bg-gray" disabled>
							<option value="">{planning.project_name}</option>
						</select>
					)}
				</div>
				<div className="mt-2 col-md-12">
					<p className=" bitter-italic-normal-medium-22 col-md-12 text-center table-title-bg py-3">
						<FaLessThan className="less-grather mx-4" /> Current week{' '}
						<FaGreaterThan className="less-grather mx-4" />{' '}
					</p>
					<table className="table border table-border-gray ">
						<thead className="">
							<tr className="skyblue-bg-color">
								<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
									Monday<br />
									{activeWeek.length > 0 && activeWeek[0].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
									Tuesday <br />
									{activeWeek.length > 0 && activeWeek[1].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
									Wednesday <br />
									{activeWeek.length > 0 && activeWeek[2].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
									Thursday <br />
									{activeWeek.length > 0 && activeWeek[3].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
									Friday<br />
									{activeWeek.length > 0 && activeWeek[4].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
									Saturday<br />
									{activeWeek.length > 0 && activeWeek[5].split('-').reverse().join('-')}
								</th>
								<th className="  text-center  align-items-center justify-content-center lh-base">
									Sunday<br />
									{activeWeek.length > 0 && activeWeek[6].split('-').reverse().join('-')}
								</th>
							</tr>
						</thead>
						<tbody>
							{planning.planning &&
								Object.keys(planning.planning).map((value) => (
									<tr className="border-bottom table-border-gray equal-width-calc" key={value}>
										{activeWeek.map((val,key) => (
											<td className=" table-border-gray font-poppins-light" key={key}>
												{planning.planning[value].some((el) => el.pdate === val) ? (
													<div>
														{planning.planning[value].map(
															(val1) =>
																val1.pdate == val ? (
																	<div key={val1.id}>
																		<p className="color-skyblue pt-1">{val1.employee_name}</p>
																		<br />
																		<p className="poppins-regular-16px">
																			{val1.employee_type_name}
																		</p>
																		<br />
																		<p className="poppins-regular-16px">
																			{val1.function_name}
																		</p>
																		<br />
																		<p className="poppins-regular-16px">
																			{'€ ' + val1.salary}
																		</p><br />
																		<p className="poppins-regular-16px">
																			{moment(val1.starttime).format('HH:mm')+' to '+ moment(val1.endtime).format('HH:mm')}
																			</p>
																		
																		<br />
																	</div>
																) : (
																	''
																)
														)}
													</div>
												) : (
													<div />
												)}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="col-12 mb-4">
					<p className="poppins-regular-20px mb-3 custom_astrick">Is the planning final?</p>
					<div className="mb-2">
						<input
							className="form-check-input"
							type="radio"
							name="radioYesLabel"
							id="radioNoLabel1"
							value="true"
							checked={finalized === true}
							onChange={(e) => handleRadio(e)}
							aria-label="..."
						/>
						<label className="ms-2 poppins-regular-16px">Yes</label>
					</div>
					<div className="mb-2">
						<input
							className="form-check-input "
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value="false"
							checked={finalized === false}
							onChange={(e) => handleRadio(e)}
							aria-label="..."
						/>
						<label className="ms-2 poppins-regular-16px">No</label>
					</div>
					<div className="error mt-2">{errorFinalize}</div>
				</div>
				<div className="row mt-4 mb-4 col-md-12 m-0">
					<div className="col-md-6 p-0">
						<button type="button" className="btn  btn-block px-0 ">
							<Link href={'/planning/timings/' + p_unique_key}>
								<a className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px ">
									BACK
								</a>
							</Link>
						</button>
					</div>
					<div className="col-md-6 p-0">
						<button
							type="button"
							className="btn rounded-0  custom-btn px-3  btn-block float-end"
							onClick={() => submit()}
						>
							SUBMIT
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlanningFinalize;
