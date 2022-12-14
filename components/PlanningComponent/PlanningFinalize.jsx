import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { planningoverview, getweekly_planning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';

const PlanningFinalize = () => {
	const router = useRouter();
	console.log(router.query);
	const p_unique_key = router.query.p_unique_key;

	const weeklyplanning = [
		{
			id: 1,
			fullName: 'Steve Jobs',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		},
		{
			id: 2,
			fullName: 'Jessica warren',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		},
		{
			id: 3,
			fullName: 'Tony Frank',
			worktype: 'Flex-worker',
			Productie: 'productie',
			salary: '$9',
			time: '08 to 14.30',
			totalhours: '6h'
		}
	];

	useEffect(
		() => {
			APICALL.service(planningoverview + router.query.p_unique_key, 'GET')
				.then((result) => {
					console.log(result);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row">
				<p className=" mt-1 mb-1 font-weight-bold   bitter-italic-normal-medium-24">Weekly Planning</p>
				<p className=" poppins-regular-16px">For the week of Monday from 27/06/2022 to sunday 03/07/2022</p>

				<div className=" mt-4 d-flex justify-content-end">
					<div className="d-inline ">
						<button type="button" className="btn  btn my-2 skyblue-bg-color border-0 poppins-regular-24px  rounded-0 btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln   btn-block ">
							Planning view
						</button>
					</div>
					<div className=" ">
						<button type="submit" className="btn  my-2 border-0  btn-block btn-bg-gray-medium">
							Encodage view
						</button>
					</div>
				</div>
				<div className=" mt-4 d-flex mb-3  ">
					<select className="form-select w-25 me-2  border-0 select-bg-gray">
						<option> Select company</option>
						<option value="">Infanion</option>
						<option value="">Wipro</option>
					</select>
					<select className="form-select w-25 me-2 border-0 select-bg-gray">
						<option>Select Location</option>
						<option value="">Bangalore</option>
						<option value="">Mangalore</option>
					</select>
					{/* <select className="form-select w-25 me-2">
						<option>Select Project</option>
						<option value="">Project-1</option>
						<option value="">Project-2</option>
					</select> */}
				</div>
				<div className="mt-2 ">
				{/* <p className=' bitter-italic-normal-medium-22 col-md-12 text-center table-border-gray py-2'><span className='less-grather mx-4 '>&lt;</span> current week  <span className='less-grather mx-4'>&gt;</span></p>  */}
				<p className=' bitter-italic-normal-medium-22 col-md-12 text-center table-title-bg py-3'><FaLessThan className='less-grather mx-4'/> Current week <FaGreaterThan className='less-grather mx-4' /> </p> 
					<table className="table border table-border-gray ">
						
						<thead className="">
							
							<tr className="skyblue-bg-color">
								<th className=" table-right-border-white  text-center align-items-center justify-content-center ">
									Monday<br />27-06-2022
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center">
									Tuesday <br />28-06-2022
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center">
									Wednesday <br />29-06-2022
								</th>
								<th className=" table-right-border-white   text-center align-items-center justify-content-center">
									Thursday <br />30-06-2022
								</th>
								<th className=" table-right-border-white  text-center align-items-center justify-content-center">
									Friday<br />01-07-2022
								</th>
								<th className=" table-right-border-white  text-center  align-items-center justify-content-center">
									Saturday<br />02-07-2022
								</th>
								<th className="  text-center  align-items-center justify-content-center">
									Sunday<br />13-03-2022
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-bottom table-border-gray equal-width-calc">
								{weeklyplanning.map((value) => (
									<td className=" table-border-gray font-poppins-light" key={value.id}>
										
										<div className='text-right color-skyblue my-2 mt-1 text-end'><a>
											<MdEdit className="float-right" />
											{/* <i className="bi bi-pencil float-right" /> */}
										</a></div>
										<p className='color-skyblue'>{value.fullName}</p>
										<br />
										<p>{value.worktype}</p>
										<br />
										<p>{value.Productie}</p>
										<br />
										<p>{value.salary}</p> <br />
										<p>{value.time}</p> <br />
										<p>{value.totalhours}</p>
										<br />
									</td>
								))}
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
							</tr>
							<tr className="border-bottom table-border-gray">
								{weeklyplanning.map((value) => (
									<td className=" table-border-gray font-poppins-light" key={value.id}>
										<p>{value.fullName}</p>
										<br />
										<p>{value.worktype}</p>
										<br />
										<p>{value.Productie}</p>
										<br />
										<p>{value.salary}</p> <br />
										<p>{value.time}</p> <br />
										<p>{value.totalhours}</p>
										<br />
									</td>
								))}
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
								<td className=" table-border-gray" />
							</tr>
						</tbody>
					</table>
				</div>
				<div className="text-end ">
					<button type="submit" className="btn skyblue-bg-color border-0   btn-block ">
						Dashboard
					</button>
				</div>
				<div className='col-12 mb-4'>
					<p className="poppins-regular-20px mb-3">Is the planning final?</p>
					<div className='mb-2'>
						<input
							className="form-check-input"
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value=""
							aria-label="..."
						/>
						<labe className="ms-2 poppins-regular-16px">Yes</labe>
					</div>
					<div className="mb-2">
						<input
							className="form-check-input "
							type="radio"
							name="radioNoLabel"
							id="radioNoLabel1"
							value=""
							aria-label="..."
						/>
						<labe className="ms-2 poppins-regular-16px">No</labe>
					</div>
				</div>
				<div className="row mt-4 mb-4 col-md-12 m-0">
					<div className="col-md-6 p-0">
						<button type="button" className="btn  btn-block px-0 ">
							
								<p className="bg-white  back-btn-text ">BACK</p>
							
						</button>
					</div>
					<div className="col-md-6 p-0">
						<button type="submit" className="btn rounded-0  custom-btn px-3  btn-block float-end">
							SUBMIT
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlanningFinalize;
