import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import style from '../../styles/Planning.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';

function Addtiming(props) {
	const router = useRouter();
	const [ value, setValue ] = useState();
	const [ selectedDate, setSelectedDate ] = useState([]);
	const [ checked, setChecked ] = useState(false);
	const [ time, setTime ] = useState('');
	const [ employees, setEmployees ] = useState([
		{
			id: 1,
			name: 'Steve Jobs',
			employeetype: 'Flexworker',
			function: 'Productie',
			collapseOpen: true
		},
		{
			id: 2,
			name: 'Smith Jones',
			employeetype: 'Normal employee',
			function: 'Productie',
			collapseOpen: false
		},
		{
			id: 3,
			name: 'Mark Henry',
			employeetype: 'Freelancer',
			function: 'Productie',
			collapseOpen: false
		}
	]);
	/**
	 * Method to open and close collapsible section when user click on '+' or '-' icon
	 * @param {} id id of the collapsible element clicked
	 */
	const updateState = (id) => {
		const newState = employees.map((obj) => {
			if (obj.id === id) {
				return { ...obj, collapseOpen: !obj.collapseOpen };
			}
			return obj;
		});

		setEmployees(newState);
	};
	/**
	 * 
	 * @param {*} value 
	 */
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

	/**
	 * Store data
	 * @param {*} e 
	 */
	let submitPlanningTimings = (e) => {};

	return (
		<div className="container">
			<form onSubmit={(e) => submitPlanningTimings(e)}>
				<div className="row">
					<p className="my-4 h4">Add timing</p>
					<div className="form-check mt-2 ">
						<input
							className="form-check-input "
							type="checkbox"
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
							<div className=" mt-3">
								{employees.map((result) => (
									<div
										key={result.id}
										className={`row d-flex justify-content-start py-3 my-3 ${style.sec_background}`}
									>
										<div className="col-md-1 h5">{result.id}.</div>
										<div className="col-md-3 h6">{result.name}</div>
										<div className="col-md-3 h6">{result.employeetype}</div>
										<div className="col-md-3 h6">{result.function}</div>
									</div>
								))}
							</div>

							<div className="mt-3 pt-2">
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
							<div className="mt-3 pt-2">
							{selectedDate.map((value, index) => (
								<div className="row" key={index}>
									<div className="col-md-3 py-3">
									<div className='pb-2'></div>
										{value}</div>
									<div className="col-md-2 py-3">
										<div className='pb-2'>Start time</div>
										<TimePicker
											placeholder="Select Time"
											use12Hours
											showSecond={false}
											focusOnOpen={true}
											format="hh:mm A"
											onChange={(e) => setTime(e.format('LT'))}
										/>
									</div>
									<div className="col-md-2 py-3">
									<div className='pb-2'>End time</div>
										<TimePicker
											placeholder="Select Time"
											use12Hours
											showSecond={false}
											focusOnOpen={true}
											format="hh:mm A"
											onChange={(e) => setTime(e.format('LT'))}
										/>
									</div>
									<div className="col-md-2 py-3">
									<MdStarRate/>
									</div>

								</div>
							))}
							</div>
						</div>
					) : (
						<div>
							<div className=" mt-3">
								<div className="">
									{employees.map((result) => (
										<div key={result.id}>
											<div
												className={`row d-flex justify-content-start py-3 my-3 ${style.sec_background}`}
											>
												<div className="col-md-1 h5">
													{result.collapseOpen == true ? (
														<FaRegMinusSquare onClick={() => updateState(result.id)} />
													) : (
														<FaRegPlusSquare onClick={() => updateState(result.id)} />
													)}
												</div>
												<div className="col-md-3 h6">{result.name}</div>
												<div className="col-md-3 h6">{result.employeetype}</div>
												<div className="col-md-3 h6">{result.function}</div>
											</div>
											{result.collapseOpen == true && (
												<div className="mt-2 row">
													<div className="col-md-1" />
													<div className="col-md-11">
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
											)}
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
