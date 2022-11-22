import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import { addIndexationOfSalary, getIndexationOfSalaryById, getCategoriesLinkedToPc } from '../../Services/ApiEndPoints';
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
import { ExitToApp } from 'node_modules/@material-ui/icons/index';
import BackLink from '../BackLink';

const Indexationofsalary = (props) => {
	const { t } = props;
	const router = useRouter();

	const [error_percentage, setError_percentage] = useState('');
	const [error_euro, setError_euro] = useState('');
	const [error_date, setError_date] = useState('');
	const [error_pc, setError_pc] = useState('');
	const [error_category, setError_category] = useState('');
	const [error_employeetype, setError_employeetype] = useState('');
	const [error_indexation, setError_indexation] = useState('');

	const [paritaircomites, setParitaircomites] = useState([]);
	const [indexation, setIndexation] = useState([]);
	const [indexationTemp, setIndexationTemp] = useState([]);

	const [itemsPerPage, setItemsPerPage] = useState(8);

	/**Show hide field based on radio button select */
	const [status, setStatus] = useState(0);

	// const radioHandler = (status) => {
	// 	setStatus(status);
	// };


	const [salary, setSalary] = useState({

		id: '',
		value_type: '',
		value_percentage: '',
		value_euro: '',
		date: '',
		pc: [],
		category: [],
		indexation_type: '',
		flex: ''
	})
	const [emptypes, setEmptypes] = useState([{ value: 0, label: 'Select' }, { value: 1, label: 'Flex' }]);
	const [indexationtype, setIndexationtype] = useState([
		{ value: 0, label: 'Select Indexation' },
		{ value: 1, label: 'Minimum salary' },
		{ value: 2, label: 'Actual salary' },
		{ value: 3, label: 'Actual salary and minimum salary' }]);
	const [pc, setPc] = useState([]);
	const [category, setCategory] = useState([]);

	// Get Indexation of salary
	useEffect(
		() => {
			if (props.id != undefined) {
				if (props.id != '') {
					APICALL.service(getIndexationOfSalaryById + props.id, 'GET')
						.then((result) => {
							if (result.status == 200) {
								console.log(result.data)
								updateObj(result.data[0]);
								// console.log(result.data[1])
								setPc(result.data[1]);
								// console.log(result.data[0]);
							}
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/getAllPartiairComites', 'GET')
						.then((result) => {
							if (result) {
								console.log(result);
								setPc(result[0]);
							}
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}

		},
		[props]
	);

	

	/**
	 * Fetching categories
	 */
	useEffect(
		() => {
			// alert("test")
			if (salary.pc.length > 0) {
				APICALL.service(getCategoriesLinkedToPc, 'POST', salary.pc)
					.then((result) => {
						if (result) {
							setCategory(result.data);
							// updateCategory(result.data);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				setSalary((prev) => ({
					...prev,
					category: []
				}));
			}
		}, [salary.pc]
	)
	

	let updateObj = (data) => {
		var value_euro1 = '';
		var value_percentage1 = '';
		var id = '';

		if (data[0].value_type === 1) {
			value_percentage1 = data[0].value

		} else {
			value_euro1 = data[0].value
		}
		id = data[0].id != null && data[0].id != undefined ? data[0].id : '';
		setSalary((prev) => ({
			...prev,
			id: id,
			indexation_type: data[0].indexation_type,
			date: data[0].date,
			value_type: data[0].value_type,
			value: data[0].value,
			flex: data[0].flex,
			value_euro: value_euro1,
			value_percentage: value_percentage1,
			pc: data[0].pc

		}));
		// updateCategory(data[0].category)

	}



	let validate = (res) => {
		var error1 = [];

		if (salary.value_type == 1) {
			error1['value_percentage'] = ValidationService.emptyValidationMethod(res.value_percentage);
			setError_percentage(error1['value_percentage']);
			setError_euro('');
		} else {
			error1['value_euro'] = ValidationService.emptyValidationMethod(res.value_euro);
			setError_euro(error1['value_euro']);
			setError_percentage('');
		}
		/**
		* check if required fields are empty
		*/
		error1['date'] = ValidationService.emptyValidationMethod(res.date);
		error1['pc'] = ValidationService.emptyValidationMethod(res.pc);
		// error1['category'] = ValidationService.emptyValidationMethod(res.category);
		error1['flex'] = ValidationService.emptyValidationMethod(res.flex);
		error1['indexation_type'] = ValidationService.emptyValidationMethod(res.indexation_type);

		/**
		 * seterror messages
		 */
		setError_date(error1['date']);
		setError_pc(error1['pc']);
		// setError_category(error1['category']);
		setError_employeetype(error1['flex']);
		setError_indexation(error1['indexation_type']);

		// return false if there is an error else return true
		if (
			error1['date'] == '' &&
			error1['pc'] == '' &&
			// error1['category'] == '' &&
			error1['flex'] == '' &&
			error1['indexation_type'] == '' &&
			error1['value_percentage'] == '' &&
			error1['value_euro'] == ''

		) {
			return true;
		} else {
			return false;
		}
	}


	/**
	 * 
	 * @param {*} event 
	 * Submit form
	 */
	let submit = async (event) => {
		event.preventDefault();
		// var valid_res = validate(salary);
		// if (valid_res) {
		APICALL.service(addIndexationOfSalary, 'POST', salary)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		// }

	}

	/**
	 * 
	 * @param {*} values 
	 * Update pc dropdown list
	 */
	let updatePc = (values) => {
		var pc1 = [];
		var category1 = [];

		values.map((val, key) => {
			pc1.push(val.value)
		})
		category.map((val, key) => {
			category1.push(val.value)
		})

		setSalary((prev) => ({
			...prev,
			pc: pc1,
			category: category1


		}));
	}

	/**
	 * Category list			
	 */
	let updateCategory = (values) => {
		var category1 = [];
		values.map((val, key) => {
			category1.push(val.value)
		})
		setSalary((prev) => ({
			...prev,
			category: category1
		}));
	}


	return (
		<div className="container-fluid p-0">
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0 ">
					<p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Indexation of salary')}</p>

					{/* Radio buttons */}

					<div className='row mt-3 ms-1 '>

						{/* Indexation in % */}
						<div className="form-check mt-2 mb-2">
							<input className="form-check-input" type="radio"
								checked={salary.value_type === 1}
								onClick={(e) => setSalary((prev) => ({
									...prev,
									value_type: 1
								}))}
							/>
							<label className="form-check-label" >
								{t('Indexation in')} %
							</label>
						</div>

						{/* Indexation in euro (value) */}
						<div className="form-check  mt-2 mb-2">
							<input className="form-check-input" type="radio"
								checked={salary.value_type === 2}
								onClick={(e) => setSalary((prev) => ({
									...prev,
									value_type: 2
								}))}
							/>
							<label className="form-check-label">
								{t('Indexation in euro (value)')}
							</label>
						</div>
					</div>

					{/* Percentage of indexation */}
					{salary.value_type === 1 &&

						<div className='col-md-6'>
							<div className="input-group mb-3">
								<label className='mb-2 input-group custom_astrick '>{t('Percentage of indexation')}</label>
								<input type="text" className="form-control"
									value={salary.value_percentage}
									onChange={(e) =>
										setSalary((prev) => ({
											...prev,
											value: e.target.value,
											value_percentage: e.target.value
										}))
									}
								/>
								<div className="input-group-append">
									<span className="input-group-text">%</span>
								</div>
							</div>
							<p className="error mt-2">{error_percentage}</p>
						</div>

					}

					{/* Amount of indexation */}
					{salary.value_type === 2 &&
						<div className='row'>
							<div className='col-md-6 '>
								<div className="input-group mb-3">
									<label className='mb-2 input-group custom_astrick '>{t('Amount of indexation')}</label>
									<input type="text" className="form-control"
										value={salary.value_euro}

										onChange={(e) =>
											setSalary((prev) => ({
												...prev,
												value: e.target.value,
												value_euro: e.target.value
											}))
										}
									/>
									<div className="input-group-append">
										<span className="input-group-text">€</span>
									</div>
								</div>
							</div>
							<p className="error mt-2">{error_euro}</p>
						</div>
					}

					{/* Calender */}
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

					{/* Select PC */}
					<div className='row'>
						<div className="mt-2 indexation-salary ">
							<label className='mb-2 custom_astrick '>{t('Paritair comite')}</label>
							<MultiSelectField
								placeholder={t('Select paritair comites')}
								name="partaircomites"
								id={'partaircomites'}
								instanceId={'pc'}
								options={pc}
								disabled={false}
								handleChange={(obj) =>
									updatePc(obj)}
								standards={pc.filter(val => salary.pc.includes(val.value))}
								isMulti={true}
								className="col-md-6 "
							/>
						</div>
						<p className="error mt-2">{error_pc}</p>

					</div>

					{/* Select category */}
					<div className='row'>
						<div className="mt-2 indexation-salary">
							<label className='mb-2 custom_astrick '>{t('Category')}</label>
							<MultiSelectField
								placeholder={t('Select category')}
								name="categoty"
								id={'category'}
								instanceId={'category'}
								// disabled={category.length > 0}
								isMulti={true}
								options={category}
								handleChange={(obj) =>
									updateCategory(obj)}
								standards={category.filter(val => salary.category.includes(val.value))}
								className="col-md-6"
							/>
							<p className="error mt-2">{error_category}</p>
						</div>

						{/* Select employee type */}
						<div className='row'>
							<div className="mt-2">
								<label className='mb-2 custom_astrick'>{t('Employee type (statuut)')}</label>
								<MultiSelectField
									placeholder={t('Select employee types')}
									name="employeetypes"
									id={'employeetypes'}
									options={emptypes}
									disabled={false}
									handleChange={(obj) =>
										setSalary((prev) => ({
											...prev,
											flex: obj.value
										}))}
									isMulti={false}
									standards={emptypes.filter(val => val.value == salary.flex)}
									className="col-md-6 "
								/>
							</div>
							<p className="error mt-2">{error_employeetype}</p>
						</div>


						{/* Select indexation */}
						<div className='row'>
							<div className="mt-2  ">
								<label className='mb-2 custom_astrick'>{t('Selection of indexation')}</label>
								<MultiSelectField
									placeholder={'Select indexation'}
									name="Selection of indexation"
									id={'indexation'}
									options={indexationtype}
									handleChange={(obj) =>
										setSalary((prev) => ({
											...prev,
											indexation_type: obj.value
										}))}
									standards={indexationtype.filter(val => val.value === salary.indexation_type)}
									disabled={false}
									isMulti={false}
									className="col-md-6"
								/>

							</div>
							<p className="error mt-2">{error_indexation}</p>
						</div>
					</div>
				</div>

				{/* Back and Save buttons */}
				<div className="row mt-4 mb-2 col-md-12 m-0">
					<div className="text-start col-md-6">
						<BackLink path={'/'} />
					</div>
					<div className="col-md-6 p-0">
						<button

							type="submit"
							className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
						>
							{/* <Link href={'/manage-salary-indexation'}>
							</Link> */}
							{t('Save')}

						</button>
					</div>
				</div>
			</form >
		</div >
	);
}
export default React.memo(Translation(Indexationofsalary, ['Indexation of salary', 'Indexation in', 'Indexation in euro (value)',
	'Percentage of indexation', 'Amount of indexation', 'Date as of which indexation takes place', 'Paritair comite', 'Select paritair comites',
	'Category', 'Select paritair comites', 'Employee type (statuut)', 'Select employee types', 'Selection of indexation', 'Select Indexation',
	'Minimum salary', 'Actual salary', 'Actual salary and minimum salary', 'BACK', 'Save']));
