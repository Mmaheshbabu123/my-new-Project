import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
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
			endDate: new Date(2018, 6, 23, 11, 30)
		},
		{
			title: 'Book Flights to San Fran for Sales Trip',
			startDate: new Date(2018, 6, 23, 12, 0),
			endDate: new Date(2018, 6, 23, 13, 0)
		},
		{
			title: 'Install New Router in Dev Room',
			startDate: new Date(2018, 6, 23, 14, 30),
			endDate: new Date(2018, 6, 23, 15, 30)
		},
		{
			title: 'Approve Personal Computer Upgrade Plan',
			startDate: new Date(2018, 6, 24, 10, 0),
			endDate: new Date(2018, 6, 24, 11, 0)
		},
		{
			title: 'Final Budget Review',
			startDate: new Date(2018, 6, 24, 12, 0),
			endDate: new Date(2018, 6, 24, 13, 35)
		},
		{
			title: 'New Brochures',
			startDate: new Date(2018, 6, 24, 14, 30),
			endDate: new Date(2018, 6, 24, 15, 45)
		},
		{
			title: 'Install New Database',
			startDate: new Date(2018, 6, 25, 9, 45),
			endDate: new Date(2018, 6, 25, 11, 15)
		},
		{
			title: 'Approve New Online Marketing Strategy',
			startDate: new Date(2018, 6, 25, 12, 0),
			endDate: new Date(2018, 6, 25, 14, 0)
		},
		{
			title: 'Upgrade Personal Computers',
			startDate: new Date(2018, 6, 25, 15, 15),
			endDate: new Date(2018, 6, 25, 16, 30)
		},
		{
			title: 'Customer Workshop',
			startDate: new Date(2018, 6, 26, 11, 0),
			endDate: new Date(2018, 6, 26, 12, 0)
		},
		{
			title: 'Prepare 2015 Marketing Plan',
			startDate: new Date(2018, 6, 26, 11, 0),
			endDate: new Date(2018, 6, 26, 13, 30)
		},
		{
			title: 'Brochure Design Review',
			startDate: new Date(2018, 6, 26, 14, 0),
			endDate: new Date(2018, 6, 26, 15, 30)
		},
		{
			title: 'Create Icons for Website',
			startDate: new Date(2018, 6, 27, 10, 0),
			endDate: new Date(2018, 6, 27, 11, 30)
		},
		{
			title: 'Upgrade Server Hardware',
			startDate: new Date(2018, 6, 27, 14, 30),
			endDate: new Date(2018, 6, 27, 16, 0)
		},
		{
			title: 'Submit New Website Design',
			startDate: new Date(2018, 6, 27, 16, 30),
			endDate: new Date(2018, 6, 27, 18, 0)
		},
		{
			title: 'Launch New Website',
			startDate: new Date(2018, 6, 26, 12, 20),
			endDate: new Date(2018, 6, 26, 14, 0)
		},
		{
			title: 'Website Re-Design Plan',
			startDate: new Date(2018, 6, 16, 9, 30),
			endDate: new Date(2018, 6, 16, 15, 30)
		},
		{
			title: 'Book Flights to San Fran for Sales Trip',
			startDate: new Date(2018, 6, 16, 12, 0),
			endDate: new Date(2018, 6, 16, 13, 0)
		},
		{
			title: 'Install New Database',
			startDate: new Date(2018, 6, 17, 15, 45),
			endDate: new Date(2018, 6, 18, 12, 15)
		},
		{
			title: 'Approve New Online Marketing Strategy',
			startDate: new Date(2018, 6, 18, 12, 35),
			endDate: new Date(2018, 6, 18, 14, 15)
		},
		{
			title: 'Upgrade Personal Computers',
			startDate: new Date(2018, 6, 19, 15, 15),
			endDate: new Date(2018, 6, 20, 20, 30)
		},
		{
			title: 'Prepare 2015 Marketing Plan',
			startDate: new Date(2018, 6, 20, 20, 0),
			endDate: new Date(2018, 6, 20, 13, 30)
		},
		{
			title: 'Brochure Design Review',
			startDate: new Date(2018, 6, 20, 14, 10),
			endDate: new Date(2018, 6, 20, 15, 30)
		},
		{
			title: 'Vacation',
			startDate: new Date(2018, 5, 22),
			endDate: new Date(2018, 6, 1)
		},
		{
			title: 'Vacation',
			startDate: new Date(2018, 6, 28),
			endDate: new Date(2018, 7, 7)
		}
	]);
	let currentViewNameChange = (e) => {
		setCurrentViewName(e.target.value);
	};

	return (
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
	);
}
export default EmployeeMonthlyPlanning;
