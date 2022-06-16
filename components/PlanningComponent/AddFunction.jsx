import React, { Component, useState, useEffect } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { Addfunction } from '../../Services/ApiEndPoints';
import { AiFillPlusSquare } from 'react-icons/ai';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';

function AddFunction(props) {
	const [ visible, setVisible ] = useState(false);
	const [ hideandshow, setHideandshow ] = useState(false);
	const [ inputlist, setInputlist ] = useState([ { employeetype: '' } ]);

	const employeetype = [
		{
			value: '1',
			label: 'flex worker1 ',
			name: 'Steve Jobs',
			min_salary: '€5',
			function: 'Productie'
		},
		{
			value: '2',
			label: 'flex worker2',
			name: 'Smith jones',
			min_salary: '€7',
			function: 'Regional manager'
		},
		{
			value: '3',
			label: 'flex worker3',
			name: 'Mark Henry',
			min_salary: '€3',
			function: 'Waiter'
		},
		{
			value: '4',
			label: 'flex worker4',
			name: 'Steve Harry',
			min_salary: '€9',
			function: 'Waiter'
		}
	];
	const handleinputchange = (e, index) => {
		const { name, value } = e.target.value;
		const list = [ inputlist ];
		list[index][name] = value;
		setInputlist(list);
	};
	const handleonclick = () => {
		setInputlist([ inputlist, { employeetype: '' } ]);
	};
	// const handleremove = (index) => {
	// 	const list = [ inputlist ];
	// 	list.splice(index, 1);
	// 	setInputlist(list);
	// };

	return (
		<div className="container">
			<div className="row">
				<p className="h4 mt-2 p-4">Add function</p>
				<div className="col-sm-5 d-flex form-group  mt-3">
					<input type="checkbox" className="mx-2" value="0" onChange={() => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4"> Same function for all employees</label>
				</div>

				{visible && (
					<div className=" col-md-12   ">
						{employeetype.map((options) => (
							<ul
								className="list-group list-group-horizontal bg-light border-0  mb-3"
								key={options.value}
							>
								<li className=" mt-3 mb-3 ms-2  ">{options.value}.</li>
								<li className="mt-3 mb-3 ms-2 ">{options.name}</li>
								<li className="mt-3 mb-3 ms-2 ">
									<div className="">
										<select className="form-select" placeholder="">
											<option value="1">Employee type</option>
											{employeetype.map((options) => (
												<option value={options.value} key={options.value}>
													{options.label}
												</option>
											))}
										</select>
									</div>
									{employeetype.map((options) => (
										<ul className="list-group  border-0  mb-3 " key={options.value}>
											<li className=" mt-3 mb-3 ms-2 d-flex  ">
												<input type="radio" className="me-2 " />
												{options.function}
											</li>
										</ul>
									))}
									<li>
										<select
											className="form-select"
											placeholder=""
											name="employeetype"
											// onChange={(e) => handleinputchange(e, i)}
										>
											<option value="1">Employee type</option>
											{employeetype.map((options) => (
												<option value={options.value} key={options.value}>
													{options.label}
												</option>
											))}
										</select>
									</li>
								</li>
								<li className="mt-3 mb-3 ms-2">{options.min_salary}</li>
								<li className="mt-3 ms-3 mb-2">
									<input className="form-group mb-3 ms-2" placeholder="minimum salary" />
								</li>
							</ul>
						))}

						<div className="col-md-6">
							{employeetype.map((options) => (
								<ul
									className="list-group list-group-horizontal bg-light border-0 mb-3 "
									key={options.value}
								>
									<li className=" mt-3 mb-3 ms-2 d-flex  ">
										<input type="radio" className="me-2 " />
										{options.function}
									</li>
								</ul>
							))}
							<div>
								<ul className="list-group list-group-horizontal border-0 bg-light  mb-3">
									<li className="mt-3 mb-3 ms-2 ">
										{inputlist.map((x, i) => {
											return (
												<select 
													key={i}
													className="form-select"
													placeholder=""
													name="employeetype"
													onChange={(e) => handleinputchange(e, i)}
												>
													<option value="1">Employee type</option>
													{employeetype.map((options) => (
														<option value={options.value} key={options.value}>
															{options.label}
														</option>
													))}
												</select>
											);
										})}
									</li>
								</ul>
								{/* {inputlist.length !== 1 && (
									<button
										type="button"
										className="btn btn-danger btn-sm float-right"
										onClick={handleremove(i)}
									>
										-
									</button>
								)} */}
								{/* {inputlist.length - 1 === 1 && ( */}
								<button
									type="button"
									className="btn btn-danger btn-sm float-right"
									onClick={handleonclick}
								>
									+
								</button>
								{/* )} */}
							</div>
						</div>
					</div>
				)}

				<div className="col-md-12 mt-4 ">
					<div className="d-inline">
						<button type="button" className="btn btn-link text-dark   btn-block ">
							Back
						</button>
					</div>
					<div className="float-right ">
						<button type="submit" className="btn btn-secondary   btn-block ">
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AddFunction;
