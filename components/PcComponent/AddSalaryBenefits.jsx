import React, { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import DateField from '@/atoms/DateField';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '../../Services/ValidationService';
import { RadioGroup, Radio } from 'react-radio-input';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import MultiSelectField from '@/atoms/MultiSelectField';
import { PcContext } from '../../Contexts/PcContext';
import Translation from '@/Translation';
import Collapsible from 'react-collapsible';

// let dateObj = new Date();
// let month = dateObj.getUTCMonth() + 1; //months from 1-12
// let day = dateObj.getUTCDate() + 1;
// var year = dateObj.getUTCFullYear() - 1;

let newDate = new Date();
let day = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

// alert(year);
const AddSalaryBenefits = (props) => {
	const { t } = props;
	const {
		pc_unique_key,
		setPc_unique_key,
		current_sec,
		cat_rightsec,
		setCat_rightsec,
		cat_leftsec,
		setCat_leftsec,
		cat_subsec_type,
		setCat_subsec_type,
		cat_fun_updated,
		setCat_fun_updated,
		sec_completed,
		setSec_completed,
		cat_subsec_id,
		setCat_subsec_id,
		setCurrent_sec,
		pc_view_type
	} = useContext(PcContext);

	const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);
	const [ obj, setObj ] = useState([]);
	const inputRef = useRef({});
	const [ valuetype, setValueType ] = useState(0);
	const [ valuev, setValuev ] = useState();
	const [ agent, setAgent ] = useState();
	const [ startDate, setStartDate ] = useState(new Date());
	const [ granted, setGranted ] = useState();
	const [ mandatory, setMandatory ] = useState();
	const [ uid, setUid ] = useState(0);
	const [ key, setKey ] = useState(0);

	useEffect(
		() => {
			if (!router.isReady) return;

			const { k = '' } = router.query;

			var uniqkey = 0;
			k != undefined && k != '' ? (uniqkey = k) : pc_unique_key != undefined ? (uniqkey = pc_unique_key) : '';

			if (contextState.uid != null && contextState.uid != undefined && contextState.uid != '') {
				setUid(contextState.uid);
			}
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/salary-benfits/' + uniqkey, 'GET')
				.then((result) => {
					console.log(result.data);
					if (result.data != undefined || result.data != null) {
						setKey(uniqkey);
						console.log(result.data);
						if (typeof result.data == 'object') {
							var propertyValues = Object.values(result.data);
							setObj(propertyValues);
						} else {
							setObj(result.data);
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	//change the value type
	const changeValueType = (e) => {
		setValueType(e.target.value);
	};

	const options = [
		{ value: 'e', label: 'Select....' },
		{ value: 1, label: 'Hour' },
		{ value: 2, label: 'Day' },
		{ value: 3, label: 'Week' },
		{ value: 4, label: 'Contract' }
	];

	const getOptionObj = (val) => {
		var V = 'e';
		options.forEach((data) => {
			if (data.value == val) {
				V = data;
			}
		});
		return V;
	};

	const updateMandatory = (index, value) => {
		var object = [ ...obj ];
		object[index].mandatory = value;
		setObj(object);
	};

	const updateAgent = (index, value) => {
		var object = [ ...obj ];
		object[index].sales_agent = value;
		setObj(object);
	};

	const updateValuetype = (index, value) => {
		var object = [ ...obj ];
		object[index].value_type = value;
		object[index].value = '';
		setObj(object);
	};

	const updateValue = (index, value) => {
		var object = [ ...obj ];
		object[index].value = value;
		setObj(object);
	};

	const updateGranted = (index, value) => {
		var object = [ ...obj ];
		object[index].granted = value;
		setObj(object);
	};

	const updateCoefficientType = (index, value) => {
		var object = [ ...obj ];
		object[index].coefficient_type = value;
		setObj(object);
	};

	const updateCoefficientValue = (index, value) => {
		var object = [ ...obj ];
		object[index].coefficient_value = value;
		setObj(object);
	};

	const updateDate = (index, value) => {
		var object = [ ...obj ];
		object[index].date = value;
		setObj(object);
	};

	const updateOccurence = (index, value) => {
		var object = [ ...obj ];
		object[index].occurence = value;
		setObj(object);
	};

	const updateOpen = (index, value) => {
		var object = [ ...obj ];
		object[index].open = value;
		setObj(object);
	};

	const setError = (index, value) => {
		var object = [ ...obj ];
		object[index].error = value;
		setObj(object);
	};

	const setEmpty = (value) => {
		if (value == null || value == undefined) {
			value = '';
		}
		return value;
	};
	const validation = () => {
		var object = [ ...obj ];

		var i = 0,
			err = 0;
		object.forEach((data, index) => {
			if (data.open == true) {
				data.coefficient_type = setEmpty(data.coefficient_type);
				data.value_type = setEmpty(data.value_type);
				data.value = setEmpty(data.value);
				data.occurence = setEmpty(data.occurence);
				data.granted = setEmpty(data.granted);
				data.date = setEmpty(data.date);
				data.coefficient_value = setEmpty(data.coefficient_value);

				object[i].vt_err = ValidationService.emptyValidationMethod(data.value_type);
				object[i].v_err = ValidationService.emptyValidationMethod(data.value);
				object[i].o_err =
					data.occurence == 'e'
						? ValidationService.emptyValidationMethod('')
						: ValidationService.emptyValidationMethod(data.occurence);
				// object[i].g_err = ValidationService.emptyValidationMethod(data.granted);
				object[i].ct_err = ValidationService.emptyValidationMethod(data.coefficient_type);
				object[i].date_err = ValidationService.emptyValidationMethod(data.date);
				if (data.coefficient_type == 2) {
					object[i].c_err = ValidationService.emptyValidationMethod(data.coefficient_value);
					if (object[i].c_err == '' && object[i].ct_err == '') {
						object[i].c_err = ValidationService.percentageValidationMethod(data.coefficient_value);
					}
				} else {
					object[i].c_err = '';
				}

				if (object[i].v_err == '' && object[i].vt_err == '') {
					object[i].v_err =
						data.value_type == '2' ? ValidationService.percentageValidationMethod(data.value) : '';
					object[i].v_err =
						data.value_type == '1' ? ValidationService.minSalaryValidationMethod(data.value) : '';
				}
				object[i].date_err =
					data.date_err == '' ? ValidationService.onlyFutureDateValidationMethod(data.date) : '';
				if (
					data.v_err != '' ||
					data.vt_err != '' ||
					data.o_err != '' ||
					data.g_err != '' ||
					data.ct_err != '' ||
					data.c_err != '' ||
					data.date_err != ''
				) {
					err++;
					setError(index, true);
				} else {
					setError(index, false);
				}
			}
			i++;
		});

		setObj(object);

		if (err != 0) {
			return false;
		}
		return true;
	};

	const Submit = (e) => {
		e.preventDefault();
		const uniqkey = 0;
		key != 0 ? (uniqkey = key) : (uniqkey = pc_unique_key);
		validation()
			? APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/store-salary-benfits/' + uniqkey,
					'POST',
					[ obj, uid ]
				)
					.then((res) => {
						if (res == 200) {
							if (key != 0 || key != undefined) {
								router.push('/manage-pc');
							} else {
								var res1 = sec_completed;
								res1['emp_type'] = true;
								setSec_completed(res1);
								router.push('/manage-pc');
							}
						}
					})
					.catch((error) => {})
			: console.log('false validation');
	};

	const rows = [];
	obj.forEach((element, index) => {
		rows.push(
			<div className="mt-3">
				<div className="m-2">
					<div className="row">
						{/* <div
							className={pc_view_type == 'addpc' ? 'form-check d-inline-flex col-sm-3 ps-0' : 'mt-4 px-0'}
						>
							<input
								type="checkbox"
								checked={element.open == true}
								onChange={(e) => {
									updateOpen(index, e.target.checked);
								}}
								style={{ width: '18px', height: '18px' }}
							/>
						</div> */}
						<div
							className={
								pc_view_type == 'addpc' ? 'form-check d-inline-flex col-sm-12 px-1' : 'd-flex px-1'
							}
						>
							<span>
								<input
									type="checkbox"
									checked={element.open == true}
									onChange={(e) => {
										updateOpen(index, e.target.checked);
									}}
									style={{ width: '18px', height: '18px', marginTop: '1.3rem' }}
								/>
								{console.log(element.error)}
								<Collapsible
									trigger={t('Salary') + 'verloning - ' + element.name + '﹀'}
									triggerWhenOpen={t('Salary') + 'verloning - ' + element.name + '︿'}
									open={element.error}
								>
									{/* <div className="accordion-item rounded-0 add_salary_benefits w-100 ms-3">
								<h2 className="accordion-header" id="flush-headingOne">
									<button
										className="accordion-button collapsed poppins-regular-18px rounded-0 shadow-none"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={'#flush-collapseOne' + index}
										aria-expanded="true"
										aria-controls="flush-collapseOne"
									> */}

									{/* </button>
								</h2>
								<div
									id={'flush-collapseOne' + index}
									className="accordion-collapse collapse"
									aria-labelledby="flush-headingOne"
								>
									<div className="accordion-body"> */}
									<div>
										<div className="row">
											<div className={pc_view_type == 'addpc' ? 'col-md-3' : 'col-md-3'}>
												<input
													type="checkbox"
													className={
														pc_view_type == 'addpc' ? (
															'form-check-input ms-1 me-2 rounded-0'
														) : (
															'form-check-input me-2 rounded-0'
														)
													}
													checked={element.mandatory === true}
													// value={element.mandatory === true?true:false}
													onChange={(e) => {
														updateMandatory(index, e.target.checked);
													}}
												/>
												<label className="form-check-label" htmlFor="flexCheckDefault">
													<p
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px'
															) : (
																'poppins-medium-16px'
															)
														}
													>
														{t('Is this mandatory?')}
													</p>
												</label>
											</div>
											<div className={pc_view_type == 'addpc' ? 'col-md-9' : 'col-md-9 d-flex'}>
												<input
													type="checkbox"
													className={
														pc_view_type == 'addpc' ? (
															'form-check-input ms-1 me-2 rounded-0'
														) : (
															'form-check-input rounded-0'
														)
													}
													value={agent}
													checked={element.sales_agent === true}
													onChange={(e) => {
														updateAgent(index, e.target.checked);
													}}
												/>
												<label
													className={
														pc_view_type == 'addpc' ? (
															'poppins-medium-16px'
														) : (
															'poppins-medium-16px'
														)
													}
												>
													{t('Allow sales agent to update the value during creation of')}
													{t('cooperation agreement?')}
												</label>
											</div>
										</div>
										<br />
										<div className="row">
											<div className={pc_view_type == 'addpc' ? 'col-md-4' : 'col-md-4'}>
												<div className="row mb-4">
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px mb-2'
															) : (
																'poppins-medium-16px mb-2'
															)
														}
													>
														{t('Salary benefit value')}
													</label>

													<RadioGroup
														name={'valuetype' + index}
														onChange={(e) => {
															updateValuetype(index, e);
														}}
														selectedValue={element.value_type}
													>
														<label
															htmlFor="valuetype1"
															className="mb-2 poppins-regular-16px"
														>
															<Radio id="valuetype1" value={1} />
															{t('value in €')}
														</label>
														<br />
														<label
															htmlFor="valuetype2"
															className="mb-3 poppins-regular-16px"
														>
															<Radio id="valuetype2" value={2} />
															{t('value in %')}
														</label>
													</RadioGroup>

													<p style={{ color: 'red' }}>{element.vt_err}</p>
													<div className="col-md-11 me-auto d-flex pe-0  w-100">
														<input
															type="text"
															value={element.value}
															onChange={(e) => {
																updateValue(index, e.target.value);
															}}
															name="valuetype"
															className="w-100 ps-3"
														/>
														<span
															className={
																'input-group-text hi-40 border-0 bg-white rounded-0 bg-transparent px-0 pe-3'
															}
															style={{ marginLeft: '-25px' }}
														>
															{element.value_type == 2 ? '%' : '€'}
														</span>
													</div>
													<p style={{ color: 'red' }}>{element.v_err}</p>
												</div>
												<div className="row">
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px mb-2'
															) : (
																'poppins-medium-16px mb-2'
															)
														}
													>
														Is the benefit granted in case of absence of the employee?
													</label>
													<RadioGroup
														name={'granted' + index}
														onChange={(e) => {
															updateGranted(index, e);
														}}
														selectedValue={element.granted}
													>
														<label htmlFor="granted1" className="mb-2 poppins-regular-16px">
															<Radio id="granted1" value={1} />
															{t('Yes')}
														</label>
														<br />
														<label htmlFor="granted2" className="mb-3 poppins-regular-16px">
															<Radio id="granted2" value={0} />
															{t('No')}
														</label>
													</RadioGroup>
												</div>
											</div>
											<div className={pc_view_type == 'addpc' ? 'col-md-4' : 'col-md-4 ps-3'}>
												<div className="row mb-4">
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px mb-2'
															) : (
																'poppins-medium-16px mb-2'
															)
														}
													>
														{t('Applicable coefficient')}
													</label>
													<RadioGroup
														name={'coefficient' + index}
														onChange={(e) => {
															updateCoefficientType(index, e);
														}}
														selectedValue={element.coefficient_type}
													>
														<label
															htmlFor="coefficient1"
															className="mb-2 poppins-regular-16px"
														>
															<Radio id="coefficient1" value={1} />
															{t('Based on employee type in the cooperation agreement')}
														</label>
														<br />
														<label
															htmlFor="coefficient2"
															className="mb-3 poppins-regular-16px"
														>
															<Radio id="coefficient2" value={2} />
															{t('Other')}
														</label>
													</RadioGroup>
													<br />
													<p style={{ color: 'red' }}>{element.ct_err}</p>
													{element.coefficient_type == 2 && (
														<input
															type="text"
															onChange={(e) => {
																updateCoefficientValue(index, e.target.value);
															}}
															className="col-md-11"
															defaultValue={element.coefficient_value}
															name="coefficientother"
															style={{ marginLeft: '0.8rem' }}
														/>
													)}
													{element.coefficient_type == 2 && (
														<p style={{ color: 'red' }}>{element.c_err}</p>
													)}
												</div>
												<div className="row mb-3">
													{/* {console.log()} */}
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px mb-2'
															) : (
																'poppins-medium-16px mb-2'
															)
														}
													>
														{t('Start date')}
													</label>
													{/* {alert(year+'-'+month+'-'+day)} */}
													<DateField
														id={'date'}
														placeholder={'date'}
														handleChange={(e) => {
															updateDate(index, e.target.value);
														}}
														// minDate={element.open ? year + '-' + month + '-' + day : ''}
														style={{ marginLeft: '0.8rem' }}
														className="col-md-11 date_field_salary_benefits"
														value={element.date}
													/>
													<p style={{ color: 'red' }}>{element.date_err}</p>
												</div>
											</div>
											<div
												className={
													pc_view_type == 'addpc' ? (
														'col-md-4 occurence_col'
													) : (
														'col-md-4 occurence_col ps-3'
													)
												}
											>
												<div className="row">
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px mb-2'
															) : (
																'poppins-medium-16px mb-2'
															)
														}
													>
														{t('Occurence')}
													</label>
													<MultiSelectField
														id={'select_id'}
														options={options}
														standards={getOptionObj(element.occurence)}
														handleChange={(e) => {
															updateOccurence(index, e.value);
														}}
														isMulti={false}
														className="col-md-11"
													/>
													<p style={{ color: 'red' }}>{element.o_err}</p>
												</div>
											</div>
										</div>
									</div>
									{/* </div> */}
									{/* </div>
							</div> */}
								</Collapsible>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div
			className={
				// pc_view_type == 'addpc' ? (
				'container-fluid p-0'
				// ) : pc_view_type == 'viewpc' ? (
				// 	'mb-5 sectioncolor p-3'
				// ) : (
				// 	'sectioncolor p-3 my-3'
				// )
			}
		>
			<form onSubmit={Submit}>
				{key != 0 ? (
					pc_view_type != 'addpc' && (
						<div className="position-sticky-pc py-4">
							<h4
								className={
									pc_view_type == 'addpc' ? (
										'h5 mt-3'
									) : (
										'font-weight-bold px-0 bitter-italic-normal-medium-24 '
									)
								}
							>
								{t('Edit salary benefits')}
							</h4>
						</div>
					)
				) : pc_view_type == 'viewpc' ? (
					<h4 className="h5 bitter_medium_italic_18px mb-4">{t('Salary benefits')}</h4>
				) : (
					''
				)}
				{rows}
				{key != 0 ? (
					<div className="row mt-4">
						<div className="text-start col-md-6" />
						<div className="text-end col-md-6">
							<button
								// onClick={()=>Submit}
								type="submit"
								className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button  shadow-none"
							>
								{t('SAVE')}
							</button>
						</div>
					</div>
				) : pc_view_type == 'addpc' ? (
					<div className="row my-4">
						<div className="text-start col-md-6">
							<button
								type="button"
								className="bg-white border-0 poppins-regular-18px shadow-none px-0 text-decoration-underline"
								onClick={() => {
									setCurrent_sec(4);
								}}
							>
								{t('BACK')}
							</button>
						</div>
						<div className="text-end col-md-6">
							<button
								type="submit"
								className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button  shadow-none"
							>
								{t('SAVE')}
							</button>
						</div>
					</div>
				) : (
					''
				)}
			</form>
		</div>
	);
};
export default React.memo(
	Translation(AddSalaryBenefits, [
		'Salary',
		'Is this mandatory?',
		'Allow sales agent to update the value during creation of',
		'cooperation agreement?',
		'Salary benefit value',
		'value in €',
		'value in %',
		'Is the benefit granted in case of absence of the employee?',
		'Yes',
		'No',
		'Applicable coefficient',
		'Start date',
		'Occurence',
		'Edit salary benefits',
		'Salary benefits',
		'SAVE',
		'BACK',
		'SAVE'
	])
);
