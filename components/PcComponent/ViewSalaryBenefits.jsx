import React, { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import DateField from '@/atoms/DateField';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '../../Services/ValidationService';
import { RadioGroup, Radio } from 'react-radio-input';
import MultiSelectField from '@/atoms/MultiSelectField';
import { PcContext } from '../../Contexts/PcContext';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear() - 1;

const ViewSalaryBenefits = (props) => {
	const { key, t } = props;
	
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
		pc_view_type,
		setPc_view_type
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
	const [ onlyview, setOnlyview ] = useState(true);

	useEffect(
		() => {
			const { k = '' } = router.query;

			if (contextState.uid != null && contextState.uid != undefined && contextState.uid != '') {
				setUid(contextState.uid);
			}

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/salary-benfits/' + k, 'GET')
				.then((result) => {
					if (result.data != undefined || result.data != null) {
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
		[ router.isReady ]
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

	const Submit = (e) => {};

	const rows = [];
	obj.forEach((element, index) => {
		rows.push(
			<div className="mt-3 view-salary-benefits pe-2">
				<div className="m-2">
				<div className='row'>
					<div className='col-md-12 d-flex ps-1'>
					<span>
					<input
								type="checkbox"
								checked={element.open == true}
								disabled={onlyview}
								className='me-2 rounded-0 form-check-input mt-4'
							/>
						</span>
						<div className="pe-2 col-md-12">
							<div className="accordion-item rounded-0 add_salary_benefits">
								<h2 className="accordion-header" id="flush-headingOne">
									<button
										className="accordion-button collapsed poppins-regular-18px rounded-0 shadow-none"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={'#flush-collapseOne' + index}
										aria-expanded="false"
										aria-controls="flush-collapseOne"
									>
										{t('Salary')} (verloning) - {element.name}
									</button>
								</h2>
								<div
									id={'flush-collapseOne' + index}
									className="accordion-collapse collapse"
									aria-labelledby="flush-headingOne"
								>
									<div className="accordion-body">
										<div>
											<div className="row">
												<div className={pc_view_type == 'addpc' ? "col-md-3" : pc_view_type == 'viewpc' ? "col-md-3" : "col-md-3"} >
													<input
														type="checkbox"
														disabled={onlyview}
														className={
															pc_view_type == 'addpc' ? (
																'form-check-input ms-1 me-2 rounded-0'
															) : (
																'form-check-input me-2 rounded-0'
															)
														}
														checked={element.mandatory === true}
													/>
													<label className="form-check-label" htmlFor="flexCheckDefault">
														<p
															className={
																pc_view_type == 'addpc' ? (
																	'poppins-medium-16px'
																) : (
																	'poppins-medium-14px'
																)
															}
														>
															{t('Is this mandatory?')}
														</p>
													</label>
												</div>
												<div className={pc_view_type == 'addpc' ? "col-md-9" : pc_view_type == 'viewpc' ? "col-md-9" : "col-md-9"}>
													<input
														type="checkbox"
														disabled={onlyview}
														className={
															pc_view_type == 'addpc' ? (
																'form-check-input ms-1 me-2 rounded-0'
															) : (
																'form-check-input rounded-0'
															)
														}
														value={agent}
														checked={element.sales_agent === true}
													/>
													<label
														className={
															pc_view_type == 'addpc' ? (
																'poppins-medium-16px'
															) : (
																'poppins-medium-14px'
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
												<div className={pc_view_type == 'addpc' ? "col-md-4" : pc_view_type == 'viewpc' ? "col-md-4" : "col-md-4"} >
													<div className="row" style={{marginBottom:'40px'}}>
														<label
															className={
																pc_view_type == 'addpc' ? (
																	'poppins-medium-16px'
																) : (
																	'poppins-medium-16px custom_astrick'
																)
															}
														>
															{t('Salary benefit value')}
														</label>

														<RadioGroup
															disabled={onlyview}
															name={'valuetype' + index}
															selectedValue={element.value_type}
														>
															<label
																htmlFor="valuetype1"
																className="mb-2 poppins-regular-16px"
															>
																<Radio id="valuetype1" value={1} />
																{t('value in')} €
															</label>
															<br />
															<label
																htmlFor="valuetype2"
																className="mb-3 poppins-regular-16px"
															>
																<Radio id="valuetype2" value={2} />
																{t('value in')} %
															</label>
														</RadioGroup>

														<p style={{ color: 'red' }}>{element.vt_err}</p>
														<div style={{display:'flex'}}>
														<input
															type="text"
															disabled={onlyview}
															value={element.value}
															name="valuetype"
															className='px-3'
														/>
														 <span className={"input-group-text border-0 bg-white rounded-0 bg-transparent px-0"} style={{ marginLeft: '-30px'}}>{element.value_type==2?'%':'€'}</span>
													</div>
														<p style={{ color: 'red' }}>{element.v_err}</p>
													</div>
													<div className="row">
														<label className="mb-2 poppins-medium-16px">
															{t(
																'Is the benefit granted in case of absence of the employee?'
															)}
														</label>
														<RadioGroup
															disabled={onlyview}
															name={'granted' + index}
															selectedValue={element.granted}
														>
															<label
																htmlFor="granted1"
																className="mb-2 poppins-regular-16px"
															>
																<Radio id="granted1" value={0} />
																{t('Yes')}
															</label>
															<br />
															<label
																htmlFor="granted2"
																className="mb-3 poppins-regular-16px"
															>
																<Radio id="granted2" value={1} />
																{t('No')}
															</label>
														</RadioGroup>
													</div>
												</div>
												<div className={pc_view_type == 'addpc' ? "col-md-4" : pc_view_type == 'viewpc' ? "col-md-4" : "col-md-4"} >
													<div className="row mb-2">
														<label className="mb-2 poppins-medium-16px custom_astrick">
															{t('Applicable coefficient')}
														</label>
														<RadioGroup
															disabled={onlyview}
															name={'coefficient' + index}
															selectedValue={element.coefficient_type}
														>
															<label
																htmlFor="coefficient1"
																className="mb-2 poppins-regular-16px"
															>
																<Radio id="coefficient1" value={1} />
																{t(
																	'Based on employee type in the cooperation agreement'
																)}
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
																disabled={onlyview}
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
														<label
															className={
																pc_view_type == 'addpc' ? (
																	'mb-3 poppins-regular-16px'
																) : (
																	'poppins-medium-16px custom_astrick'
																)
															}
														>
															{t('Start date')}
														</label>
														<DateField
															id={'date'}
															isDisabled={onlyview}
															placeholder={'date'}
															style={{ marginLeft: '0.8rem' }}
															className="col-md-11 date_field_salary_benefits"
															value={element.date}
														/>
														<p style={{ color: 'red' }}>{element.date_err}</p>
													</div>
												</div>
												<div className={pc_view_type == 'addpc' ? "col-md-4 occurence_col" : pc_view_type == 'viewpc' ? "col-md-4 occurence_col" : "col-md-4 occurence_col"} >
													<div className="row">
														<label
															className={
																pc_view_type == 'addpc' ? (
																	'mb-3 poppins-regular-16px'
																) : (
																	'poppins-medium-16px custom_astrick'
																)
															}
														>
															{t('Occurence')}
														</label>
														<MultiSelectField
															id={'select_id'}
															options={options}
															standards={getOptionObj(element.occurence)}
															disabled={onlyview}
															isMulti={false}
															className="col-md-11"
														/>
														<p style={{ color: 'red' }}>{element.o_err}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
						</div>
					</div>

		);
	});
	return (
		<div className="container-fluid p-0">
			<form onSubmit={Submit}>
					<div className='row position-sticky-pc pt-4 pb-2'>
						<div className='col-md-12'>
						<h4 className='h5 bitter-italic-normal-medium-24' >
					{t(' View salary benefits')}
					</h4>
						</div>
					</div>
				
				{rows}
				{pc_view_type == 'editpc' ? (
					<div className="row mt-4">
						<div className="text-start col-md-6" />
						<div className="text-end col-md-6">
							<button
								type="sumit"
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
								type="sumit"
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
	Translation(ViewSalaryBenefits, [
		'Salary',
		'Is this mandatory?',
		'Allow sales agent to update the value during creation of',
		'cooperation agreement?',
		'Salary benefit value',
		'value in',
		'Is the benefit granted in case of absence of the employee?',
		'Yes',
		'No',
		'Applicable coefficient',
		'Start date',
		'Occurence',
		'Salary benefits',
		'SAVE',
		'BACK',
		'SAVE'
	])
);
