import React, { Component, useState } from 'react';
// import { components } from 'react-select';
// import { Divider } from 'semantic-ui-react';
// import data from './data.json';
// import './addtiming.css';

// import DatePicker from 'react-multi-date-picker';
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';

// import TimeRange from 'react-time-range';
// import moment from 'moment';

const Addtiming = () => {
	const [ visible, setVisible ] = useState(false);

	// const handleCheckbox = (event) => {
	// console.log(event.target.value);
	// };
	return (
		<div className="container">
			<form>
				<div className="row">
					<h4 className="mt-4 mb-2">Add timing</h4>
					<div className="form-check mt-2 ">
						<input
							className="form-check-input "
							type="checkbox"
							// id="flexCheckDefault"
							value="1"
							// onChange={(e) => this.handleCheckbox()}
							onClick={(e) => setVisible(!visible)}
						/>
						<label className="form-check-label ">Same timing for all employees</label>
						<div>Visible</div>
					</div>

					<div className="form-check mt-2 ">
						<table className="table table-hover mt-3">
							<tbody>
								{/* {data.map((data) => ( */}
								<tr>
									<td>{/* {data.id}. */}id</td>
									<td>{/* {data.fullName} */}Full name</td>
									<td>{/* {data.worktype} */}worktype</td>
									<td>{/* {data.Productie} */}Productie</td>
								</tr>
								{/* ))} */}
							</tbody>
						</table>
					</div>
					<div className="form-check mt-2 ">
						{/* <DatePicker  multiple value={this.date}  onChange={this.setdate}  /> */}
						{/* <DatePicker
							format="MM/DD/YYYY HH:mm:ss"
							range
							plugins={[ <TimePicker position="right" />, <DatePanel markFocused /> ]}
						/> */}
						{/* <TimeRange className="text-center" position="right"
                startMoment={this.state.startTime}
                endMoment={this.state.endTime}
                onChange={this.returnFunction}/> */}
					</div>
				</div>
				<a href="#" className="btn btn-secondary btn-lg btn-block float-right mt-5">
					Next
				</a>
				<a href="#" className="btn btn-secondary btn-lg btn-block mt-5">
					Back
				</a>
			</form>
		</div>
	);
};

export default Addtiming;
