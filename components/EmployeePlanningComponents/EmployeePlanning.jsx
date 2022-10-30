import React, { useEffect, useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { MdReviews } from 'react-icons/md';
import { AiFillEye, AiFillInfoCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { FcSynchronize } from 'react-icons/fc';
import { BsFillPrinterFill } from 'react-icons/bs';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { fetchemployeeplanning, getContract } from '../../Services/ApiEndPoints';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import moment from 'moment';
import Translation from '@/Translation';
import BackLink from '../BackLink';


import {
	Scheduler,
	WeekView,
	MonthView,
	DayView,
	Toolbar,
	DateNavigator,
	TodayButton,
	Appointments,
	AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

function EmployeeMonthlyPlanning(props) {
	const { t } = props;
	const { contextState = {} } = useContext(UserAuthContext);

	/**
	 * View more functionality
	 */
	const [items, setItems] = useState([]);
	const [contractid, setContractid] = useState([]);
	const [visible, setVisible] = useState(3);
	const router = useRouter();
	const viewMoreItems = () => {
		setVisible((prevValue) => prevValue + 3);
	};
	////////////////////////////////////////////////////////////////
	const [data, setData] = useState([]);

	useEffect(
		() => {

			if (contextState.uid != '') {
				APICALL.service(fetchemployeeplanning + contextState.uid, 'GET')
					.then((result) => {
						if (result.status == 200) {
							result.data.map((val, key) => {
								console.log(result.data);
								result.data[key].title = val.companyname + ', ' + val.location;
								// ', ' +
								// val.Employer_firstname +
								// val.Employer_lastname;
								result.data[key].startDate = new Date(val.starttime);
								result.data[key].endDate = new Date(val.endtime);
							});
						}

						setData(result.data);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		[props, contextState.uid]
	);
	const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
		<div
			className="row mb-5 m-0 planning_calender"
			aria-label="Views"
			style={{ flexDirection: 'row' }}
			name="views"
			value={currentViewName}
			onClick={onChange}
		>
			<div className='col-md-4 ps-0'>
				<button type="button" value="Day" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Day' ? 'custom-btn_highlight' : ''}`} >
					{t('Day')}
				</button>
			</div>
			<div className='col-md-4'>
				<button value="Week" type="button" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Week' ? 'custom-btn_highlight' : ''}`}>
					{('Week')}
				</button>
			</div>
			<div className='col-md-4 pe-0'>
				<button value="Month" type="button" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Month' ? 'custom-btn_highlight' : ''}`}>
					{t('Month')} 
				</button>
			</div>
		</div>
	);

	const [currentViewName, setCurrentViewName] = React.useState('Month');

	let currentViewNameChange = (e) => {
		setCurrentViewName(e.target.value);
	};

	// let downloadContract = (id) => {
	// 	APICALL.service(getContract + id, 'GET')
	// 		.then((result) => {
	// 			if (result.status == 200) {
	// 				console.log(result);
	// 			}

	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});

	// }

	return (
		<div className="container-fluid p-0">
			<div className='row position-sticky-pc'>
				<div className='col-md-12'>
					<p className="py-4 font-weight-bold bitter-italic-normal-medium-24">{t('My planning')}</p>
					<div className="mb-3 col-md-12 p-0">
						<p className="poppins-light-18px">{t('My upcoming plannings')}</p>
					</div>
				</div>
			</div>
			<div className="row m-0 p-0">
				{/* <div className=" d-flex flex-row-reverse  ">
					<div className="mt-3">
						<FcSynchronize className="color-skyblue" data-toggle="tooltip" title="Synchronise planning" />
					</div>
					<div className="mt-3 pe-3">
						<BsFillPrinterFill className="color-skyblue" data-toggle="tooltip" title="Print planning" />
					</div>
				</div> */}
				<div className=" mt-2 text-center col-md-12 p-0 ">
					<table className="table mt-3 mb-3">
						<thead>
							<tr className=" skyblue-bg-color">
								<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex  ">
									{t('Date')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center ">
									{t('Start time')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center  ">
								{t('End time')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center  ">
									{t('Employer')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center ">
									{t('Location')}
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center ">
									{t('Company')}
								</th>
								<th className=" text-center  align-items-center justify-content-center ">{t('Action')}</th>
							</tr>
						</thead>
						<tbody className='border_employee_planning_table'>
							{data.slice(0, visible).map((result) => (
								<tr className="" key={result.title}>
									<td className=" border_employee_planning poppins-light-18px">{result.pdate.split('-').reverse().join('/')}</td>
									<td className="border_employee_planning poppins-light-18px">
										{moment(result.starttime).format('HH:mm')}
									</td>
									<td className="border_employee_planning poppins-light-18px">
										{moment(result.endtime).format('HH:mm')}
									</td>
									<td className="border_employee_planning poppins-light-18px">
										<span>{result.Employer_firstname} </span>
										<span>{result.Employer_lastname} </span>
									</td>
									<td className="border_employee_planning poppins-light-18px">{result.location}</td>
									<td className="border_employee_planning poppins-light-18px">{result.companyname}</td>
									<td className="border_employee_planning">
										{/* { result.contract_id != '' &&
											<Link href={result.contract_id}>

												<AiFillEye
													// onClick = {()=>{downloadContract(result.contract_id)}}
													type="button"
													className="mt-2 ms-3 color-skyblue"
													data-toggle="tooltip"
													title="View details"

												/>
											</Link>
										} */}

										{/* <span>
											<MdReviews
												type="button"
												className="mt-2 ms-3 color-skyblue"
												data-toggle="tooltip"
												title="Remove the add to agenda"
											/>
										</span>
										<AiFillInfoCircle
											type="button"
											className="mt-2 ms-3 color-skyblue"
											data-toggle="tooltip"
											title="Remove the exclamation"
										/> */}
									</td>
								</tr>
							))}
							{/*----------------------------No records found-------------------------- */}
							{data.length == 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-3 border poppins-regular-18px">
                                            No records
                                        </td>
                                    </tr>
                                )}
						</tbody>
					</table>
				</div>
				<div className="text-end mb-3 p-0">
					{data.length > 3 &&
						<button
							type="button"
							className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
							onClick={viewMoreItems}
						>
							View more &nbsp;
							<AiOutlineArrowRight className="" />
						</button>
					}
				</div>
			</div>
			<div className='row'>
				<div className="planning-table col-md-12 mb-5">
					<React.Fragment>
						<ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />

						<Paper>
							{/* <Scheduler data={data} height={718}> */}
							<Scheduler data={data}>
								<ViewState defaultCurrentDate={new Date()} currentViewName={currentViewName} />

								<DayView />
								<WeekView />
								{/* <WeekView name="Work Week" /> */}
								<MonthView />
								<Toolbar />
								<DateNavigator />
								<TodayButton />
								<Appointments />
								<AppointmentTooltip />
							</Scheduler>
						</Paper>
					</React.Fragment>
				</div>
			</div>
			<div className="text-start col-md-6">
                <BackLink path={'/'} />
            </div>
		</div>
	);
}
export default React.memo(Translation(EmployeeMonthlyPlanning,['Day','Week','Month','My planning','My upcoming plannings','Date','Start time','End time','Employer','Location','Company','Action']));

