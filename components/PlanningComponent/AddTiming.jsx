import React, { Component, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import DatePicker from 'react-multi-date-picker';
// import DatePicker, { DateObject } from 'react-multi-date-picker';
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Link from 'next/link';
import { useRouter } from 'next/router';

//import TimeRange from 'react-time-range';
import moment from 'moment';
function Addtiming(props) {
	// [ date, setDate ] = useState('');
	//  const date: new Date();
	const router = useRouter();
	const [ value, setValue ] = useState(new Date());
	const [ selectedDate, setSelectedDate ] = useState([]);
	const [ checked, setChecked ] = useState(true);

	// var t_unique_key = router.query.t_unique_key;
	// const [ values, setValues ] = useState();
	// [ 1, 2, 3 ].map((number) =>
	// 	new DateObject().set({
	// 		day: number,
	// 		hour: number,
	// 		minute: number,
	// 		second: number
	// 	})
	// );
	const [ data, setData ] = useState({});
	let employees = [
		{
			id: 1,
			name: 'Steve Jobs',
			employeetype: 'Flexworker',
			function: 'Productie'
		},
		{
			id: 2,
			name: 'Smith Jones',
			employeetype: 'Normal employee',
			function: 'Productie'
		},
		{
			id: 3,
			name: 'Mark Henry',
			employeetype: 'Freelancer',
			function: 'Productie'
		}
	];
	let handleChange = (value) => {
		var selected = [];
		value.map((val) => {
			console.log(val.format());
			selected.push(val.format());
		});
		setSelectedDate(selected);
		console.log(value);
		console.log(selectedDate);
	};

	return (
		<div className="container">
			<form>
				<div className="row">
					<p className="mt-4 mb-2 h4">Add timing</p>
					<div className="form-check mt-2 ">
						<input
							className="form-check-input "
							type="checkbox"
							value=""
							checked={checked}
							id="flexCheckChecked"
							onChange={() => {
								setChecked(!checked);
							}}
						/>
						<label className="form-check-label " htmlFor="flexCheckChecked">
							Same timing for all employees
						</label>
					</div>
					{checked ? (
						<div>
							<div className=" mt-5 ">
								<table className="table table-hover ">
									<tbody className="">
										{employees.map((result) => (
											<tr key={result.id} className="">
												<td className="">{result.id}.</td>
												<td>{result.name}</td>
												<td>{result.employeetype}</td>
												<td>{result.function}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="mt-2 ">
								<Calendar
									value={value}
									multiple={true}
									format="YYYY/MM/DD"
									onChange={(date) => {
										handleChange(date);
									}}
									minDate={new Date()}
								/>
							</div>
							<div className="" />
							{selectedDate.map((value, index) => (
								<div className="row" key={index}>
									<p className="bg-light">{value}</p>
								</div>
							))}
						</div>
					) : (
						<div>
							<div className=" mt-5 ">
								<div className="">
									{employees.map((result) => (
										<div key={result.id}>
										<div className='row d-flex justify-content-start bg-light py-2 my-2'>
											<div className="col-md-1">{result.id}.</div>
											<div className="col-md-3">{result.name}</div>
											<div className="col-md-3">{result.employeetype}</div>
											<div className="col-md-3">{result.function}</div>
										</div>
										<div className="mt-2 ">
										<Calendar
											value={value}
											multiple={true}
											format="YYYY/MM/DD"
											onChange={(date) => {
												handleChange(date);
											}}
											minDate={new Date()}
										/>
									</div>
									</div>

									))}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="col-md-12 mt-4 ">
					<div className="d-inline">
						<button
							type="button"
							className="btn btn-link text-dark btn-block "
							// onClick={() => {
							// 	setData((prev) => ({ ...prev, t_unique_key: router.query.t_unique_key }));
							// }}
						>
							<Link href={'/planning/functions/' + router.query.p_unique_key}>
								<p>Back</p>
							</Link>
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
							<Link href={'/planning/finalize/' + router.query.p_unique_key}>
								<p>Next</p>
							</Link>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Addtiming;
