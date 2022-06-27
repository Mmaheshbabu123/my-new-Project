// import Link from 'next/link';
// import React, { Component, useState } from 'react';
// import { useRouter } from 'next/router';

// import { components } from 'react-select';
// import { Divider } from 'semantic-ui-react';
// import data from './data.json';
// import './addtiming.css';

// import DatePicker from 'react-multi-date-picker';
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';

// import TimeRange from 'react-time-range';
// import moment from 'moment';

// const Addtiming = () => {
// 	const [ visible, setVisible ] = useState(false);
// 	const router = useRouter();
// 	const p_unique_key = router.query.p_unique_key;
// const handleCheckbox = (event) => {
// console.log(event.target.value);
// };
// return (
// 	<div className="container">
// 		<form>
// 			<div className="row">
// 				<p className="mt-4 mb-2 h4">Add timing</p>
// 				<div className="form-check mt-2 ">
// 					<input
// 						className="form-check-input "
// 						type="checkbox"
// 						checked
// 						// id="flexCheckDefault"
// 						value="1"
// 						// onChange={(e) => this.handleCheckbox()}
// 						onClick={(e) => setVisible(!visible)}
// 					/>
// 					<label className="form-check-label ">Same timing for all employees</label>
// 				</div>

// 				<div className="form-check mt-2 ">
// 					<table className="table table-hover mt-3">
// 						<tbody>
// 							{/* {data.map((data) => ( */}
// 							<tr>
// 								<td>{/* {data.id}. */}id</td>
// 								<td>{/* {data.fullName} */}Full name</td>
// 								<td>{/* {data.worktype} */}worktype</td>
// 								<td>{/* {data.Productie} */}Productie</td>
// 							</tr>
// 							{/* ))} */}
// 						</tbody>
// 					</table>
// 				</div>
// 				<div className="form-check mt-2 ">
{
	/* <DatePicker  multiple value={this.date}  onChange={this.setdate}  /> */
}
{
	/* <DatePicker
							format="MM/DD/YYYY HH:mm:ss"
							range
							plugins={[ <TimePicker position="right" />, <DatePanel markFocused /> ]}
						/> */
}
{
	/* <TimeRange className="text-center" position="right"
                startMoment={this.state.startTime}
                endMoment={this.state.endTime}
                onChange={this.returnFunction}/> */
}
// 					</div>
// 				</div>
// 				<div className="row">
// 					<div className="col-md-6">
// 						<Link href={'/planning/functions/' + p_unique_key}>
// 							<a className="btn btn-secondary btn-lg btn-block mt-5">Back</a>
// 						</Link>
// 					</div>
// 					<div className="col-md-6">
// 						<a href="#" className="btn btn-secondary btn-lg btn-block float-end mt-5">
// 							Next
// 						</a>
// 					</div>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default Addtiming;

import React, { Component, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Addtiming(props) {
	// [ date, setDate ] = useState('');
	//  const date: new Date();
	const router = useRouter();

	const [ values, setValues ] = useState(
		[ 1, 2, 3 ].map((number) =>
			new DateObject().set({
				day: number,
				hour: number,
				minute: number,
				second: number
			})
		)
	);
	const [ data, setData ] = useState({});
	let employees = [
		{
			id: 1,
			name: 'Tommy',
			age: 23,
			city: 'New York'
		}

		// {
		// 	id: 2,
		// 	name: 'Mike',
		// 	age: 27,
		// 	city: 'Detroit'
		// },

		// {
		// 	id: 3,
		// 	name: 'Lisa',
		// 	age: 25,
		// 	city: 'Chicago'
		// }
	];
	return (
		<div className="container">
			<form>
				<div className="row">
					<p className="mt-4 mb-2 h4">Add timing</p>
					<div className="form-check mt-2 ">
						<input className="form-check-input " type="checkbox" value="" id="flexCheckChecked" checked />
						<label className="form-check-label " for="flexCheckChecked">
							Same timing for all employees
						</label>
					</div>

					<div className="form-check mt-2 bg-light ">
						<table className="table table-hover mt-3" key={result}>
							<tbody>
								{employees.map((result) => (
									<tr>
										<td>{result.id}.</td>
										<td>{result.name}</td>
										<td>{result.age}</td>
										<td>{result.city}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="form-check mt-2 ">
						{/* <DatePicker multiple value={this.date} onChange={this.setdate} /> */}
						{/* <DatePicker
							format="MM/DD/YYYY HH:mm:ss"
							range
							plugins={[ <TimePicker position="right" />, <DatePanel markFocused /> ]}
						/> */}
						{/* <TimeRange
							className="text-center"
							position="right"
							startMoment={this.state.startTime}
							endMoment={this.state.endTime}
							onChange={this.returnFunction}
						/> */}
						<DatePicker
							value={values}
							onChange={setValues}
							format="MM/DD/YYYY HH:mm:ss"
							multiple
							plugins={[ <TimePicker position="bottom" />, <DatePanel markFocused /> ]}
						/>
					</div>
				</div>
				<div className="col-md-12 mt-4 ">
					<div className="d-inline">
						<button
							type="button"
							className="btn btn-link text-dark btn-block "
							onClick={() => {
								setData((prev) => ({ ...prev, data: router.query.data }));
							}}
						>
							Back
						</button>
					</div>
					<div className="float-end ">
						<button
							type="submit"
							className="btn btn-secondary   btn-block "
							// onClick={() => {
							// 	setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
							// }}
						>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Addtiming;
