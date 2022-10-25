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
import Translation from '@/Translation';
function EmployeeMonthlyPlanning(props) {
	const { t } = props;
	const { contextState = {} } = useContext(UserAuthContext);

	/**
	 * View more functionality
	 */
	const [ items, setItems ] = useState([]);
	const [contractid, setContractid ] = useState([]);
	const [ visible, setVisible ] = useState(3);
        const router = useRouter();
	const viewMoreItems = () => {
		setVisible((prevValue) => prevValue + 3);
	};
	////////////////////////////////////////////////////////////////
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			
			if(contextState.uid !=''){
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
		[ props, contextState.uid ]
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
			<button type="button" value="Day" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Day'?'custom-btn_highlight':''}`} >
				{t('Day')}
			</button>		
			</div>
			<div className='col-md-4'>
			<button value="Week" type="button" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Week'?'custom-btn_highlight':''}`}>
				{t('Week')}
			</button>
			</div>
			<div className='col-md-4 pe-0'>
			<button value="Month" type="button" className={`btn border w-100 poppins-medium-18px rounded-0 shadow-none ${currentViewName == 'Month'?'custom-btn_highlight':''}`}>
				{t('Month')}
			</button>
			</div>
		</div>
	);

	const [ currentViewName, setCurrentViewName ] = React.useState('Month');

	let currentViewNameChange = (e) => {
		setCurrentViewName(e.target.value);
	};

	let downloadContract = (id) => {
		APICALL.service(getContract + id, 'GET')
				.then((result) => {
					if (result.status == 200) {
						console.log(result);
					}
					
				})
				.catch((error) => {
					console.log(error);
				});

	}

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
										{/* <Link href={'/'+ result.contract_id}> */}
										<AiFillEye
											onClick = {()=>{downloadContract(result.contract_id)}}
											type="button"
											className="mt-2 ms-3 color-skyblue"
											data-toggle="tooltip"
											title="View details"
											
										/>
										{/* </Link> */}
										

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
						{t('View more')} &nbsp;
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
		</div>
	);
}
export default React.memo(Translation(EmployeeMonthlyPlanning,['Day','Week','Month','My planning','My upcoming plannings','Date','Start time','End time','Employer','Location','Company','Action','View more']));

// const [ data, setData ] = React.useState([
// {
// 	title: 'Website Re-Design Plan',
// 	startDate: new Date(2018, 6, 23, 9, 30),
// 	endDate: new Date(2018, 6, 23, 11, 30),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018',
// 	company: 'Infanion'
// },
// {
// 	title: 'Book Flights to San Fran for Sales Trip',
// 	startDate: new Date(2018, 6, 23, 12, 0),
// 	endDate: new Date(2018, 6, 23, 13, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018',
// 	company: 'Infanion'
// },
// {
// 	title: 'Install New Router in Dev Room',
// 	startDate: new Date(2018, 6, 23, 14, 30),
// 	endDate: new Date(2018, 6, 23, 15, 30),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018',
// 	company: 'Infanion'
// },
// {
// 	title: 'Approve Personal Computer Upgrade Plan',
// 	startDate: new Date(2018, 6, 24, 10, 0),
// 	endDate: new Date(2018, 6, 24, 11, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	company: 'Infanion'
// },
// {
// 	title: 'Final Budget Review',
// 	startDate: new Date(2018, 6, 24, 12, 0),
// 	endDate: new Date(2018, 6, 24, 13, 35),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// },
// {
// 	title: 'Brochure Design Review',
// 	startDate: new Date(2018, 6, 26, 14, 0),
// 	endDate: new Date(2018, 6, 26, 15, 30),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// },
// // {
// 	title: 'Create Icons for Website',
// 	startDate: new Date(2018, 6, 27, 10, 0),
// 	endDate: new Date(2018, 6, 27, 11, 30),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// },
// {
// 	title: 'Upgrade Server Hardware',
// 	startDate: new Date(2018, 6, 27, 14, 30),
// 	endDate: new Date(2018, 6, 27, 16, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// },
// {
// 	title: 'Submit New Website Design',
// 	startDate: new Date(2018, 6, 27, 16, 30),
// 	endDate: new Date(2018, 6, 27, 18, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// },
// {
// 	title: 'Launch New Website',
// 	startDate: new Date(2018, 6, 26, 12, 20),
// 	endDate: new Date(2018, 6, 26, 14, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM',
// 	employer: 'Preeti',
// 	location: 'Bangalore',
// 	Date: '06 - 07 - 2018'
// }
// {
// 	title: 'Website Re-Design Plan',
// 	startDate: new Date(2018, 6, 16, 9, 30),
// 	endDate: new Date(2018, 6, 16, 15, 30),
// 	startTime: '1 PM',
// 	endTime: '3PM'
// },
// {
// 	title: 'Book Flights to San Fran for Sales Trip',
// 	startDate: new Date(2018, 6, 16, 12, 0),
// 	endDate: new Date(2018, 6, 16, 13, 0),
// 	startTime: '1 PM',
// 	endTime: '3PM'
// },
// {
// 	title: 'Install New Database',
// 	startDate: new Date(2018, 6, 17, 15, 45),
// 	endDate: new Date(2018, 6, 18, 12, 15)
// },
// {
// 	title: 'Approve New Online Marketing Strategy',
// 	startDate: new Date(2018, 6, 18, 12, 35),
// 	endDate: new Date(2018, 6, 18, 14, 15)
// },
// {
// 	title: 'Upgrade Personal Computers',
// 	startDate: new Date(2018, 6, 19, 15, 15),
// 	endDate: new Date(2018, 6, 20, 20, 30)
// },
// {
// 	title: 'Prepare 2015 Marketing Plan',
// 	startDate: new Date(2018, 6, 20, 20, 0),
// 	endDate: new Date(2018, 6, 20, 13, 30)
// },
// {
// 	title: 'Brochure Design Review',
// 	startDate: new Date(2018, 6, 20, 14, 10),
// 	endDate: new Date(2018, 6, 20, 15, 30)
// },
// {
// 	title: 'Vacation',
// 	startDate: new Date(2018, 5, 22),
// 	endDate: new Date(2018, 6, 1)
// },
// {
// 	title: 'Vacation',
// 	startDate: new Date(2018, 6, 28),
// 	endDate: new Date(2018, 7, 7)
// }
// ]);
