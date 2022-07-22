import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { MdReviews } from 'react-icons/md';
import { AiFillEye, AiFillInfoCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { fetchemployeeplanning } from '../../Services/ApiEndPoints';

import {
	Scheduler,
	WeekView,
	MonthView,
	DayView,
	Toolbar,
	DateNavigator,
	TodayButton,
	Appointments
} from '@devexpress/dx-react-scheduler-material-ui';

function EmployeeMonthlyPlanning(props) {
	/**
	 * View more functionality
	 */
	const [ items, setItems ] = useState([]);
	const [ visible, setVisible ] = useState(3);

	const viewMoreItems = () => {
		setVisible((prevValue) => prevValue + 3);
	};
	////////////////////////////////////////////////////////////////
	// const [ data, setData ] = useState();
	/**
	 * FETCHING EMPLOYEE ID
	 */
	// useEffect(() => {
	// 	APICALL.service(fetchemployeeplanning + 105, 'GET')
	// 		.then((result) => {
	// 			console.log(result.data);

	// 			setData(result.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);
	const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
		<div
			className="row mb-5"
			aria-label="Views"
			style={{ flexDirection: 'row' }}
			name="views"
			value={currentViewName}
			onClick={onChange}
		>
			<button type="button" value="Day" className="btn btn-outline-info col-md-4 ">
				Day
			</button>
			<button value="Week" type="button" className="btn btn-outline-info col-md-4">
				Week
			</button>

			<button value="Month" type="button" className="btn btn-outline-info col-md-4  ">
				Month
			</button>
		</div>
	);

	const [ currentViewName, setCurrentViewName ] = React.useState('Month');
	const [ data, setData ] = React.useState([
		{
			title: 'Website Re-Design Plan',
			startDate: new Date(2018, 6, 23, 9, 30),
			endDate: new Date(2018, 6, 23, 11, 30),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018',
			company: 'Infanion'
		},
		{
			title: 'Book Flights to San Fran for Sales Trip',
			startDate: new Date(2018, 6, 23, 12, 0),
			endDate: new Date(2018, 6, 23, 13, 0),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018',
			company: 'Infanion'
		},
		{
			title: 'Install New Router in Dev Room',
			startDate: new Date(2018, 6, 23, 14, 30),
			endDate: new Date(2018, 6, 23, 15, 30),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018',
			company: 'Infanion'
		},
		{
			title: 'Approve Personal Computer Upgrade Plan',
			startDate: new Date(2018, 6, 24, 10, 0),
			endDate: new Date(2018, 6, 24, 11, 0),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			company: 'Infanion'
		},
		{
			title: 'Final Budget Review',
			startDate: new Date(2018, 6, 24, 12, 0),
			endDate: new Date(2018, 6, 24, 13, 35),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		},
		{
			title: 'Brochure Design Review',
			startDate: new Date(2018, 6, 26, 14, 0),
			endDate: new Date(2018, 6, 26, 15, 30),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		},
		{
			title: 'Create Icons for Website',
			startDate: new Date(2018, 6, 27, 10, 0),
			endDate: new Date(2018, 6, 27, 11, 30),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		},
		{
			title: 'Upgrade Server Hardware',
			startDate: new Date(2018, 6, 27, 14, 30),
			endDate: new Date(2018, 6, 27, 16, 0),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		},
		{
			title: 'Submit New Website Design',
			startDate: new Date(2018, 6, 27, 16, 30),
			endDate: new Date(2018, 6, 27, 18, 0),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		},
		{
			title: 'Launch New Website',
			startDate: new Date(2018, 6, 26, 12, 20),
			endDate: new Date(2018, 6, 26, 14, 0),
			startTime: '1 PM',
			endTime: '3PM',
			employer: 'Preeti',
			location: 'Bangalore',
			Date: '06 - 07 - 2018'
		}
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
	]);
	let currentViewNameChange = (e) => {
		setCurrentViewName(e.target.value);
	};

	return (
		<div className="container">
			<div className="row">
				<p className="h3">My planning</p>
				<div className="mt-3 ms-3">
					<p className="h6">My upcoming plannings</p>
				</div>
				<div className="form-check mt-2 text-center ">
					<table className="table border  border-info mt-3 mb-3">
						<thead>
							<tr className="table-info">
								<th className="border-end  border-info">Date</th>
								<th className="border-end  border-info">Start time</th>
								<th className="border-end  border-info">End time</th>
								<th className="border-end  border-info">Employer</th>
								<th className="border-end  border-info">Location</th>
								<th className="border-end  border-info">Company</th>
								<th className="border-end  border-info">Action</th>
							</tr>
						</thead>
						<tbody>
							{data.slice(0, visible).map((result) => (
								<tr className="border-bottom  border-info" key={result.title}>
									<td className="border-end  border-info">{result.Date}</td>
									<td className="border-end  border-info">{result.startTime}</td>
									<td className="border-end border-info">{result.endTime}</td>
									<td className="border-end  border-info">{result.employer}</td>
									<td className="border-end  border-info">{result.location}</td>
									<td className="border-end  border-info">{result.company}</td>
									<td className="d-flex justify-content-center">
										<AiFillEye className="mt-2 ms-3 " />

										<span>
											<MdReviews className="mt-2 ms-3 " />
										</span>
										<AiFillInfoCircle className="mt-2 ms-3" />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="text-end mb-3">
					<button type="button" className="btn btn-link text-decoration-none" onClick={viewMoreItems}>
						View more
						<AiOutlineArrowRight />
					</button>
				</div>
			</div>

			<React.Fragment>
				<ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />

				<Paper>
					<Scheduler data={data} height={660}>
						<ViewState defaultCurrentDate="2018-07-25" currentViewName={currentViewName} />

						<DayView startDayHour={10} endDayHour={19} />
						<WeekView startDayHour={10} endDayHour={19} />
						<WeekView name="Work Week" excludedDays={[ 0, 6 ]} startDayHour={9} endDayHour={19} />
						<MonthView />
						<Toolbar />
						<DateNavigator />
						<TodayButton />
						<Appointments />
					</Scheduler>
				</Paper>
			</React.Fragment>
		</div>
	);
}
export default EmployeeMonthlyPlanning;
