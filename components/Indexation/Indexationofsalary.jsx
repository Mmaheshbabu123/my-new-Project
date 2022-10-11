import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import { fetchEmployeeTypes, storePcEmployeeTypes, getPcEmployeeTypes, addIndexationOfSalary } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import DatePicker from 'react-multi-date-picker';
import Link from 'next/link';
import get from 'node_modules/lodash/get';
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';
import Select from 'react-select';

const Indexationofsalary = () => {
	const router = useRouter();

	// const [error_radio, setError_radio] = useState('');
	// const [error_indexation_percentage, setError_indexation_percentage] = useState('');
	// const [error_indexation_euro, setError_indexation_euro] = useState('');
	const [error_date, setError_date] = useState('');
	const [error_pc, setError_pc] = useState('');
	const [error_category, setError_category] = useState('');
	const [error_employeetype, setError_employeetype] = useState('');
	const [error_indexation, setError_indexation] = useState('');

	const [paritaircomites, setParitaircomites] = useState([]);

	/**Show hide field based on radio button select */
	const [status, setStatus] = useState(0);

	const radioHandler = (status) => {
		setStatus(status);
	};



	const [data, setData] = useState({
		// radio: '',
		// percentage_of_indexation: '',
		// amount_indexation_euro: '',
		// date: '',
		id: '',
		pc: '',
		category: '',
		employee_type: '',
		selection_index: '',
		value_type: '',
		value: '',
		date: '',
		indexation_type: '',
		// pc
		// entity_type: '',
		// entity_id: '',
		// indexation_id: '',
	})

	let validate = (res) => {
		var error1 = [];

		/**
		* check if required fields are empty
		*/
		// error1['radio'] = ValidationService.emptyValidationMethod(res.radio);
		// error1['percentage_of_indexation'] = ValidationService.emptyValidationMethod(res.percentage_of_indexation);
		// error1['amount_indexation_euro'] = ValidationService.emptyValidationMethod(res.amount_indexation_euro);
		error1['date'] = ValidationService.emptyValidationMethod(res.date);
		error1['pc'] = ValidationService.emptyValidationMethod(res.pc);
		error1['category'] = ValidationService.emptyValidationMethod(res.category);
		error1['employee_type'] = ValidationService.emptyValidationMethod(res.employee_type);
		error1['selection_index'] = ValidationService.emptyValidationMethod(res.selection_index);

		/**
		 * seterror messages
		 */
		// setError_radio(error1['radio']);
		// setError_indexation_percentage(error1['percentage_of_indexation']);
		// setError_indexation_euro(error1['amount_indexation_euro']);
		setError_date(error1['date']);
		setError_pc(error1['pc']);
		setError_category(error1['category']);
		setError_employeetype(error1['employee_type']);
		setError_indexation(error1['selection_index']);

		//return false if there is an error else return true
		if (
			// error1['radio'] == '' &&
			// error1['percentage_of_indexation'] == '' &&
			// error1['amount_indexation_euro'] == '' &&
			error1['date'] == '' &&
			error1['pc'] == '' &&
			error1['category'] == '' &&
			error1['employee_type'] == '' &&
			error1['selection_index'] == '' 

		) {
			return true;
		} else {
			return false;
		}
	}


	useEffect(
		() => {
			if (!router.isReady) return;
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getAllPartiairComites', 'GET')
				.then((result) => {
					if (result) {
						// console.log(data);
						setParitaircomites(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[router.query]
	);

	// const updateradio = (value) => { };

	let submit = async (event) => {paritaircomites
		event.preventDefault();

		console.log(data);
		var valid_res = validate(data);
		if (valid_res) {
			APICALL.service(addIndexationOfSalary, 'POST', data)
			.then((result) => {
				console.log(result);
			})
		}

	}
	let handleinputchange = (type,value)=>{
		console.log(value);

	}


	return (
		<div className="container-fluid p-0">
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0 ">
					<p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Indexation of salary</p>
					<div className='row mt-3 ms-1 '>
						<div className="form-check mt-2 mb-2">
							<input className="form-check-input" type="radio" checked={status === 1} onClick={(e) => radioHandler(1)}  />
							<label className="form-check-label" >
								Indexation in %
							</label>
						</div>
						<div className="form-check  mt-2 mb-2">
							<input className="form-check-input" type="radio" checked={status === 2} onClick={(e) => radioHandler(2)} />
							<label className="form-check-label">
								Indexation in euro (value)
							</label>
						</div>
					</div>
					{status === 1 &&

						<div className='col-md-6'>
							<div className="input-group mb-3">
								<label className='mb-2 input-group custom_astrick '>Percentage of indexation</label>
								<input type="text" className="form-control  " />
								<div className="input-group-append">
									<span className="input-group-text">%</span>
								</div>
							</div>

						</div>

					}
					{status === 2 &&
						<div className='row'>
							<div className='col-md-6 '>
								<div className="input-group mb-3">
									<label className='mb-2 input-group custom_astrick '>Amount of indexation</label>
									<input type="text" className="form-control " />
									<div className="input-group-append">
										<span className="input-group-text">€</span>
									</div>
								</div>
							</div>
						</div>
					}
					<div className='row'>
						<div className='col-md-6 '>
							<div className="input-group mb-3">
								<label className='mb-2 input-group custom_astrick'>Date as of which indexation takes place</label>
								<DatePicker size="lg"
									value={data.date}
									onChange={(e) => {
										setData((prev) => ({
											...prev,
											date: moment(e).format('YYYY-MM-DD')
										}));
									}}
								/>
							</div>
							<p className="error mt-2">{error_date}</p>

						</div>
					</div>
					<div className='row'>
						<div className="mt-2">
							<label className='mb-2 custom_astrick '>Paritair comite</label>
							<Select
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								instanceId={'pc'}
								options={paritaircomites[0]}
								disabled={false}
								onChange={(value) =>
									setData((prev) => ({
												...prev,
												pc: value
											}))
									// {handleinputchange('pc',value)}
								}
								isMulti={true}
								// className="col-md-6"
								className="col-md-6 "
								value={data.pc}
								// onChange={(e) => {
								// 	setData((prev) => ({
								// 		...prev,
								// 		pc: e.target.value
								// 	}));
								// }}
							/>
						</div>
						<p className="error mt-2">{error_pc}</p>

					</div>

					<div className='row'>
						<div className="mt-2">
							<label className='mb-2 custom_astrick '>Category</label>
							<Select
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								instanceId={'category'}
								options={paritaircomites[1]}
								disabled={false}
								isMulti={true}
								value={data.category}
								// className="col-md-6"
								onChange={(value) =>
									setData((prev) => ({
												...prev,
												category: value
											}))
								}
							

								className="col-md-6"
							/>
							<p className="error mt-2">{error_category}</p>

						</div>

						<div className='row'>
							<div className="mt-2">
								<label className='mb-2 custom_astrick'>Employee type (statuut)</label>
								<Select
									placeholder={'Select employee types'}
									name="employeetypes"
									id={'employeetypes'}
									// options={paritaircomites[2]}
									options={[{ value: 1, label: 'Flex' }]}
									disabled={false}
									value={data.employee_type}
									onChange={(value) =>
										setData((prev) => ({
													...prev,
													employee_type: value
												}))
									}
									// handleChange={(obj) =>
									// 	updateEmployeeType(value, obj.value)}
									isMulti={true}
									// className="col-md-6"
									className="col-md-6 "
								/>
							</div>
							<p className="error mt-2">{error_employeetype}</p>
						</div>

						<div className='row'>
							<div className="mt-2 col-md-6 ">
								<label className='mb-2 custom_astrick'>Selection of indexation</label>
								{/* <MultiSelectField
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								options={paritaircomites[2]}
								disabled={false}
								// handleChange={(obj) =>
								// 	updateEmployeeType(value, obj.value)}
								isMulti={true}
								// className="col-md-6"
								className="col-md-9 "
								/> */}
								<select className="form-select" value={data.selection_index}
									onChange={(e) => {alert(e.target.value);
										setData((prev) => ({
											...prev,
											selection_index: e.target.value
										}));
									}}
									>

									<option value="">Select Indexation</option>
									<option value="1">Minimum salary</option>
									<option value="2">Actual salary</option>
									<option value="3">Actual salary and minimum salary</option>
								</select>
							</div>
							<p className="error mt-2">{error_indexation}</p>
						</div>
					</div>
				</div>
				<div className="row mt-4 mb-2 col-md-12 m-0">
					<div className="col-md-6 p-0">
						<button type="button" className="btn  btn-block px-0 shadow-none">
							<Link href={'/planning/options'}>
								{/* <p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px "> */}
								<p className="bg-white border-0 poppins-light-18px text-decoration-underline shadow-none ">
									BACK
								</p>
							</Link>
						</button>
					</div>
					<div className="col-md-6 p-0">
						<button
							type="submit"
							// className="btn rounded-0 custom-btn px-3 btn-block float-end"
							className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"

						>
							Save
						</button>
					</div>
				</div>
			</form >
		</div >
	);
}
export default Indexationofsalary;
