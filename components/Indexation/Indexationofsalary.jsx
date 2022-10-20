import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import { fetchEmployeeTypes, storePcEmployeeTypes, getPcEmployeeTypes, addIndexationOfSalary, getIndexationOfSalary } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import DatePicker from 'react-multi-date-picker';
import Link from 'next/link';
import get from 'node_modules/lodash/get';
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';
import Select from 'react-select';
import Translation from '@/Translation';
const Indexationofsalary = (props) => {
	const {t} =props;
	const router = useRouter();

	

	const [error_date, setError_date] = useState('');
	const [error_pc, setError_pc] = useState('');
	const [error_category, setError_category] = useState('');
	const [error_employeetype, setError_employeetype] = useState('');
	const [error_indexation, setError_indexation] = useState('');

	const [paritaircomites, setParitaircomites] = useState([]);
	const [indexation, setIndexation] = useState([]);
	const [indexationTemp, setIndexationTemp] = useState([]);

	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	/**Show hide field based on radio button select */
	const [status, setStatus] = useState(0);

	const radioHandler = (status) => {
		setStatus(status);
	};


	const [salary, setSalary] = useState({

		id: '',
		value_type: '1',
		value: '1',
		date: '',
		pc: '',
		category: '',
		employee_type: '',
		indexation_type: '',
		
	})

	let validate = (res) => {
		var error1 = [];

		/**
	* check if required fields are empty
		*/
		error1['date'] = ValidationService.emptyValidationMethod(res.date);
		error1['pc'] = ValidationService.emptyValidationMethod(res.pc);
		error1['category'] = ValidationService.emptyValidationMethod(res.category);
		error1['employee_type'] = ValidationService.emptyValidationMethod(res.employee_type);
		error1['indexation_type'] = ValidationService.emptyValidationMethod(res.indexation_type);

		/**
		 * seterror messages
		 */
		setError_date(error1['date']);
		setError_pc(error1['pc']);
		setError_category(error1['category']);
		setError_employeetype(error1['employee_type']);
		setError_indexation(error1['indexation_type']);

		//return false if there is an error else return true
		if (
			error1['date'] == '' &&
			error1['pc'] == '' &&
			error1['category'] == '' &&
			error1['employee_type'] == '' &&
			error1['indexation_type'] == ''

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
						// console.log(result);
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

	let submit = async (event) => {
		// paritaircomites
		event.preventDefault();

		// console.log(data);
		var valid_res = validate(salary);
		if (valid_res) {
			APICALL.service(addIndexationOfSalary, 'POST', salary)
				.then((result) => {
					console.log(result);
				})
				.catch((error) => {
					console.log(error);
				});
		}

	}

	let handleinputchange = (type, value) => {
		console.log(value);

	}

	// Get Indexation of salary
	useEffect(
		() => {
			APICALL.service(getIndexationOfSalary, 'GET')
				.then((result) => {
					
					if(result.status == 200){
						// var res = salary;
						// res.id = result.data.id;
						// console.log(res.id);
						console.log(result.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[]
	);
	
	

	return (
		<div className="container-fluid p-0">
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0 ">
					<p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Indexation of salary')}</p>
					<div className='row mt-3 ms-1 '>
						<div className="form-check mt-2 mb-2">
							<input className="form-check-input" type="radio" checked={status === 1} onClick={(e) => radioHandler(1)} />
							<label className="form-check-label" >
								{t('Indexation in')} %
							</label>
						</div>
						<div className="form-check  mt-2 mb-2">
							<input className="form-check-input" type="radio" checked={status === 2} onClick={(e) => radioHandler(2)} />
							<label className="form-check-label">
								{t('Indexation in euro (value)')}
							</label>
						</div>
					</div>
					{status === 1 &&

						<div className='col-md-6'>
							<div className="input-group mb-3">
								<label className='mb-2 input-group custom_astrick '>{t('Percentage of indexation')}</label>
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
									<label className='mb-2 input-group custom_astrick '>{t('Amount of indexation')}</label>
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
								<label className='mb-2 input-group custom_astrick'>{t('Date as of which indexation takes place')}</label>
								<DatePicker size="lg"
									value={salary.date}
									onChange={(e) => {
										setSalary((prev) => ({
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
							<label className='mb-2 custom_astrick '>{t('Paritair comite')}</label>
							<Select
								placeholder={t('Select paritair comites')}
								name="partaircomites"
								id={'partaircomites'}
								instanceId={'pc'}
								options={paritaircomites[0]}
								disabled={false}
								onChange={(value) =>
									setSalary((prev) => ({
										...prev,
										pc: value
									}))
									// {handleinputchange('pc',value)}
								}
								isMulti={true}
								// className="col-md-6"
								className="col-md-6 "
								value={salary.pc}
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
							<label className='mb-2 custom_astrick '>{t('Category')}</label>
							<Select
								placeholder={t('Select paritair comites')}
								name="partaircomites"
								id={'partaircomites'}
								instanceId={'category'}
								options={paritaircomites[1]}
								disabled={false}
								isMulti={true}
								value={salary.category}
								// className="col-md-6"
								onChange={(value) =>
									setSalary((prev) => ({
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
								<label className='mb-2 custom_astrick'>{t('Employee type (statuut)')}</label>
								<Select
									placeholder={t('Select employee types')}
									name="employeetypes"
									id={'employeetypes'}
									// options={paritaircomites[2]}
									options={[{ value: 1, label: 'Flex' }]}
									disabled={false}
									value={salary.employee_type}
									onChange={(value) =>
										setSalary((prev) => ({
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
								<label className='mb-2 custom_astrick'>{t('Selection of indexation')}</label>
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
								<select className="form-select" value={salary.indexation_type}
									onChange={(e) => {
										setSalary((prev) => ({
											...prev,
											indexation_type: e.target.value
										}));
									}}
								>

									<option value="">{t('Select Indexation')}</option>
									<option value="1">{t('Minimum salary')}</option>
									<option value="2">{t('Actual salary')}</option>
									<option value="3">{t('Actual salary and minimum salary')}</option>
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
									{t('BACK')}
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
							{t('Save')}
						</button>
					</div>
				</div>
			</form >
		</div >
	);
}
export default React.memo(Translation(Indexationofsalary,['Indexation of salary','Indexation in','Indexation in euro (value)',
'Percentage of indexation','Amount of indexation','Date as of which indexation takes place','Paritair comite','Select paritair comites',
'Category','Select paritair comites','Employee type (statuut)','Select employee types','Selection of indexation','Select Indexation',
'Minimum salary','Actual salary','Actual salary and minimum salary','BACK','Save']));
