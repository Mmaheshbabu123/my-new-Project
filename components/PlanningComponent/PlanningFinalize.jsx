import React, { Component, useEffect, useState,useContext } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { planningoverview, getweekly_planning, planningfinalize } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import Link from 'next/link';
import moment from 'moment';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';
const PlanningFinalize = (props) => {
	const {t}=props;
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	const [ planning, setPlanning ] = useState([]);
	const [ enableEdit, setEnableEdit ] = useState(true);
	const [ week, setWeek ] = useState([]);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ finalized, setFinalized ] = useState('');
	const [ errorFinalize, setErrorFinalize ] = useState('');
	const [ weekCount, setWeekCount ] = useState(0);
	const { contextState = {} } = useContext(UserAuthContext);
	useEffect(
		() => {
			if (!router.isReady) return;
			APICALL.service(planningoverview + router.query.p_unique_key, 'GET')
				.then((result) => {
					if (result.data.length > 0) {
						console.log(result.data[1][0]);
						setPlanning(result.data[1][0]);
						console.log(result.data[1][0]																						)
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

	let updateActiveWeek = (type) => {
		var count = 0;

		if (weekCount >= 0 && weekCount < week.length - 1) {
			if (type == 'next') {
				count = weekCount + 1;
			} else {
				count = weekCount > 0 ? weekCount - 1 : weekCount;
			}
		}
		setWeekCount(count);
		setActiveWeek(week[count]);
	};
	let submit = () => {
		if (finalized === '') {
			setErrorFinalize('This field is required.');
		} else {
			APICALL.service(planningfinalize, 'POST', [ p_unique_key, finalized ])
				.then((result) => {
					if (result.status === 200) {
						router.push('/weekly-planning');
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'/api/sendemail_to_employee_planning/'+contextState.uid+'/'+p_unique_key, 'POST')
				.then((result) => {
					if (result.status === 200) {
						router.push('/weekly-planning');
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	let handleRadio = (e) => {
		setErrorFinalize('');
		var finalise = e.target.value === 'true' ? true : false;
		setFinalized(finalise);
	};
	let dateExist = (data) =>{
		var arr = [];
		data.map((v1, k1) => {

			v1.map((v2,k2)=>{
				if (activeWeek.indexOf(v2.pdate)>-1) {
					arr.push(v2.pdate);
				}

			})
		
					// const found = data.some(el => el.pdate == val);
					// if (found) arr.push(val);
		});

		if(arr.length > 0){
			return true
		}else{
			return false;
		}


	}
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row position-sticky-pc">
				<div className="col-md-12">
					<p className="py-4 font-weight-bold bitter-italic-normal-medium-24 h4 p-0 manage-sticky">
						{t('Planning finalize')}
					</p>
				</div>
			</div>
			<div className="row m-0">
				{/* <p className=" poppins-regular-16px">For the week of Monday from 01/08/2022 to sunday 06/08/2022</p> */}
				<div className="d-flex pb-3 px-0 planning_finalize_search">
					<select
						className="form-select w-25 me-3  border-0 select-bg-gray rounded-0 shadow-none poppins-light-18px"
						disabled
					>
						{planning.company != '' && <option value="">{planning.company}</option>}
					</select>
					<select
						className="form-select w-25 me-3 border-0 select-bg-gray rounded-0 shadow-none poppins-light-18px"
						disabled
					>
						{planning.location != '' && <option value="">{planning.location}</option>}
					</select>
					{planning.cost_center_id != null && (
						<select
							className="form-select w-25 me-3 border-0 select-bg-gray rounded-0 shadow-none poppins-light-18px"
							disabled
						>
							<option value="">{planning.cost_center}</option>
						</select>
					)}
					{planning.project_name != null && (
						<select
							className="form-select w-25 me-3 border-0 select-bg-gray rounded-0 shadow-none poppins-light-18px"
							disabled
						>
							<option value="">{planning.project_name}</option>
						</select>
					)}
				</div>
				<div className="mt-2 col-md-12 px-0">
					<p className=" bitter-italic-normal-medium-22 col-md-12 text-center table-title-bg py-3">
						<FaLessThan
							className="less-grather mx-4"
							onClick={() => {
								updateActiveWeek('previous');
							}}
						/>{' '}
						<span
							onClick={() => {
								setWeekCount(0);
								setActiveWeek(week[0]);
							}}
						>
							{t('Current week')}
						</span>{' '}
						<FaGreaterThan
							className="less-grather mx-4"
							onClick={() => {
								updateActiveWeek('next');
							}}
						/>{' '}
					</p>
					<table className="table">
						<thead className="">
							<tr className="skyblue-bg-color">
								<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
									{t('Monday')}<br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[0].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
									{t('Tuesday')} <br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[1].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
									{t('Wednesday')} <br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[2].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
									{t('Thursday')} <br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[3].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
									{t('Friday')}<br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[4].split('-').reverse().join('-')}
								</th>
								<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
									{t('Saturday')}<br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[5].split('-').reverse().join('-')}
								</th>
								<th className="  text-center  align-items-center justify-content-center lh-base">
									{t('Sunday')}<br />
									{activeWeek &&
										activeWeek.length > 0 &&
										activeWeek[6].split('-').reverse().join('-')}
								</th>
							</tr>
						</thead>
						<tbody>
							{/* {planning.planning &&
								Object.keys(planning.planning).map((value) => (
									<tr className="border-bottom table-border-gray equal-width-calc" key={value}>
										{activeWeek.map((val, key) => (
											<td className=" table-border-gray font-poppins-light" key={key}>
												{planning.planning[value].some((el) => el.pdate === val) ? (
													<div>
														{planning.planning[value].map(
															(val1) =>
																val1.pdate == val ? (
																	<div key={val1.id}>
																		<p className="color_skyblue pt-1 poppins-light-18px">
																			{val1.employee_name}
																		</p>
																		<br />
																		<p className="poppins-light-14px">
																			{val1.employee_type_name}
																		</p>
																		<br />
																		<p className="poppins-light-14px">
																			{val1.function_name}
																		</p>
																		<br />
																		<p className="poppins-light-14px">
																			{'€ ' + val1.salary}
																		</p>
																		<br />
																		<p className="poppins-light-14px">
																			{moment(val1.starttime).format('HH:mm') +
																				' to ' +
																				moment(val1.endtime).format('HH:mm')}
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
								))} */}
								
							{planning.planning &&
								Object.keys(planning.planning).map((value) => (
									dateExist(planning.planning[value]) && <tr className="border-bottom table-border-gray equal-width-calc" key={value}>
										{console.log(planning.planning[value])}
										{activeWeek.map((val, key) => (
											<td className=" table-border-gray font-poppins-light" key={key}>
												{planning.planning[value].map(
													(v2, k2) =>
														v2.some((el) => el.pdate === val) ? (
															<div>
																{v2.map(
																	(val1, key1) =>
																		val1.pdate == val ? (
																			<div key={val1.id}>
																				{key1 == 0 && (
																					<div>
																						<p className="color_skyblue pt-1 poppins-light-18px">
																							{val1.employee_name}
																						</p>
																					
																						<p className="poppins-light-14px">
																							{val1.employee_type_name}
																						</p>
																				
																						<p className="poppins-light-14px">
																							{val1.function_name}
																						</p>
																					
																						<p className="poppins-light-14px">
																							{'€ ' + val1.salary}
																						</p>
																					
																					</div>
																				)}
																				<p className="poppins-light-14px">
																					{moment(val1.starttime).format(
																						'HH:mm'
																					) +
																						' to ' +
																						moment(val1.endtime).format(
																							'HH:mm'
																						)}
																				</p>

																				<br />
																			</div>
																		) : (
																			''
																		)
																)}
															</div>
														) : (
															''
														)
												)}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="col-12 mb-4 px-0">
					<p className="poppins-regular-20px mb-3 custom_astrick">{t('Is the planning final?')}</p>
					<div className="mb-2">
						<input
							className="form-check-input shadow-none"
							type="radio"
							name="radioYesLabel"
							id="radioNoLabel1"
							value="true"
							checked={finalized === true}
							onChange={(e) => handleRadio(e)}
							aria-label="..."
						/>
						<label className="ms-2 poppins-regular-16px">{t('Yes')}</label>
					</div>
					<div className="mb-2">
						<input
							className="form-check-input shadow-none"
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value="false"
							checked={finalized === false}
							onChange={(e) => handleRadio(e)}
							aria-label="..."
						/>
						<label className="ms-2 poppins-regular-16px">{t('No')}</label>
					</div>
					<div className="error mt-2">{errorFinalize}</div>
				</div>
				<div className="row mt-4 col-md-12 m-0 px-0">
					<div className="col-md-6 p-0 align-self-center ">
						<button type="button" className="btn  btn-block px-0 shadow-none">
							<Link href={'/planning/timings/' + p_unique_key}>
								<a className="bg-white border-0 poppins-light-18px  text-decoration-underline text-uppercase shadow-none">
									{t('BACK')}
								</a>
							</Link>
						</button>
					</div>
					<div className="col-md-6 p-0">
						<button
							type="button"
							className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button text-uppercase shadow-none text-white"
							onClick={() => submit()}
						>
							{t('SUBMIT')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Translation(PlanningFinalize,['Planning finalize','Current week','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Is the planning final?','Yes','No','BACK','SUBMIT']));
