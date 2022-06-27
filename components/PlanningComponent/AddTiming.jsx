import Link from 'next/link';
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router';

// import { components } from 'react-select';
// import { Divider } from 'semantic-ui-react';
// import data from './data.json';
// import './addtiming.css';

import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

import TimeRange from 'react-time-range';
import moment from 'moment';

const Addtiming = () => {
	const [ visible, setVisible ] = useState(false);
const router = useRouter();
const p_unique_key = router.query.p_unique_key;
	// const handleCheckbox = (event) => {
	// console.log(event.target.value);
	// };
	return (
		<div className="container">
			<form>
				<div className="row">
					<p className="mt-4 mb-2 h4">Add timing</p>
					<div className="form-check mt-2 ">
						<input
							className="form-check-input "
							type="checkbox"
							checked
							// id="flexCheckDefault"
							value="1"
							// onChange={(e) => this.handleCheckbox()}
							onClick={(e) => setVisible(!visible)}
						/>
						<label className="form-check-label ">Same timing for all employees</label>
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
						<DatePicker
							format="MM/DD/YYYY HH:mm:ss"
							range
							plugins={[ <TimePicker position="right" />, <DatePanel markFocused /> ]}
						/>
						<TimeRange className="text-center" position="right"
                startMoment={this.state.startTime}
                endMoment={this.state.endTime}
                onChange={this.returnFunction}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Link href={"/planning/functions/"+ p_unique_key} >
						<a className="btn btn-secondary btn-lg btn-block mt-5">
							Back
						</a>
						</Link>
					</div>
					<div className="col-md-6">
						<a href="#" className="btn btn-secondary btn-lg btn-block float-end mt-5">
							Next
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Addtiming;
