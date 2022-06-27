import React, { Component, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import Link from 'next/link';
import { useRouter } from 'next/router';

//import TimeRange from 'react-time-range';
import moment from 'moment';
function Addtiming(props) {
	return <div />;
	// [ date, setDate ] = useState('');
	//  const date: new Date();
	// const router = useRouter();
	// var t_unique_key = router.query.t_unique_key;
	// const [ values, setValues ] = useState();
	// [ 1, 2, 3 ].map((number) =>
	// 	new DateObject().set({
	// 		day: number,
	// 		hour: number,
	// 		minute: number,
	// 		second: number
	// })
	// )
	// const [ data, setData ] = useState({});
	// let employees = [
	// 	{
	// 		id: 1,
	// 		name: 'Steve Jobs',
	// 		age: 'Flexworker',
	// 		city: 'Productie'
	// 	}
	// ];
	// return (
	// 	<div className="container">
	// 		<form>
	// 			<div className="row">
	// 				<p className="mt-4 mb-2 h4">Add timing</p>
	// 				<div className="form-check mt-2 ">
	// 					<input className="form-check-input " type="checkbox" value="" id="flexCheckChecked" checked />
	// 					<label className="form-check-label " htmlFor="flexCheckChecked">
	// 						Same timing for all employees
	// 					</label>
	// 				</div>

	// 				<div className="form-check mt-2 bg-light ">
	// 					<table className="table table-hover mt-3">
	// 						<tbody>
	// 							{employees.map((result) => (
	// 								<tr key={result.id}>
	// 									<td>{result.id}.</td>
	// 									<td>{result.name}</td>
	// 									<td>{result.age}</td>
	{
		/* <td>{result.city}</td> */
	}
	// 					</tr>
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</div>
	// 	<div className="form-check mt-2 ">
	// 		<DatePicker
	// 			value={values}
	// 			onChange={setValues}
	// 			format="MM/DD/YYYY HH:mm:ss"
	// 			multiple
	// 			plugins={[ <TimePicker position="bottom" />, <DatePanel markFocused /> ]}
	// 		/>
	// 	</div>
	// </div>
	// <div className="col-md-12 mt-4 ">
	// 	<div className="d-inline">
	// 		<button
	// 			type="button"
	// 			className="btn btn-link text-dark btn-block "
	// onClick={() => {
	// 	setData((prev) => ({ ...prev, t_unique_key: router.query.t_unique_key }));
	// }}
	// 	>
	// 		Back
	// 	</button>
	// </div>
	// <div className="float-end ">
	// 	<button
	// 		type="submit"
	// 		className="btn btn-secondary   btn-block "
	// onClick={() => {
	// 	setData((prev) => ({ ...prev, p_unique_key: router.query.p_unique_key }));
	// }}
	// 				>
	// 					Next
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</form>
	// </div>
	// );
}
export default Addtiming;
