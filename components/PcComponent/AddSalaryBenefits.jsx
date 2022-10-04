import React, { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDate } from 'date-fns';
import { Collapse } from 'react-collapse';
import DateField from '@/atoms/DateField';
import useCollapse from 'react-collapsed';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '../../Services/ValidationService';
import { RadioGroup, Radio } from 'react-radio-input';
import MultiSelectField from '@/atoms/MultiSelectField';
import { PcContext } from '../../Contexts/PcContext';

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear() - 1;

const AddSalaryBenefits = () => {
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
	const [obj, setObj] = useState([]);
	const inputRef = useRef({});
	const [valuetype, setValueType] = useState(0);
	const [valuev, setValuev] = useState();
	const [agent, setAgent] = useState();
	const [startDate, setStartDate] = useState(new Date());
	const [granted, setGranted] = useState();
	const [mandatory, setMandatory] = useState();
	const [uid, setUid] = useState(0);

	useEffect(() => {
		if (localStorage.getItem('uid') != null) {
			var userid = JSON.parse(localStorage.getItem('uid'));
			setUid(userid);
		} else {
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
		}

		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/salary-benfits/' + pc_unique_key, 'GET')
			.then((result) => {
				console.log(result.data);
				if (result.data != undefined || result.data != null) {
					if (typeof result.data == 'object') {
						var propertyValues = Object.values(result.data);
						console.log(propertyValues);
						setObj(propertyValues);
					} else {
						setObj(result.data);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

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
		var object = [...obj];
		object[index].mandatory = value;
		setObj(object);
	};

	const updateAgent = (index, value) => {
		var object = [...obj];
		object[index].sales_agent = value;
		setObj(object);
	};

	const updateValuetype = (index, value) => {
		var object = [...obj];
		object[index].value_type = value;
		setObj(object);
	};

	const updateValue = (index, value) => {
		var object = [...obj];
		object[index].value = value;
		setObj(object);
	};

	const updateGranted = (index, value) => {
		var object = [...obj];
		object[index].granted = value;
		setObj(object);
	};

	const updateCoefficientType = (index, value) => {
		var object = [...obj];
		object[index].coefficient_type = value;
		setObj(object);
	};

	const updateCoefficientValue = (index, value) => {
		var object = [...obj];
		object[index].coefficient_value = value;
		setObj(object);
	};

	const updateDate = (index, value) => {
		var object = [...obj];
		object[index].date = value;
		setObj(object);
	};

	const updateOccurence = (index, value) => {
		var object = [...obj];
		object[index].occurence = value;
		setObj(object);
	};

	const updateOpen = (index, value) => {
		var object = [...obj];
		object[index].open = value;
		setObj(object);
	};

	const validation = () => {
		var object = [...obj];
		var i = 0,
			err = 0;
		object.forEach((data) => {
			if (data.open == true) {
				object[i].vt_err = ValidationService.emptyValidationMethod(data.value_type);
				object[i].v_err = ValidationService.emptyValidationMethod(data.value);
				object[i].o_err =
					data.occurence == 'e'
						? ValidationService.emptyValidationMethod('')
						: ValidationService.emptyValidationMethod(data.occurence);
				object[i].g_err = ValidationService.emptyValidationMethod(data.granted);
				object[i].ct_err = ValidationService.emptyValidationMethod(data.coefficient_type);
				object[i].c_err = ValidationService.emptyValidationMethod(data.coefficient_value);
				object[i].date_err = ValidationService.emptyValidationMethod(data.date);
				if (object[i].c_err == '' && object[i].ct_err == '') {
					object[i].c_err = ValidationService.percentageValidationMethod(data.coefficient_value);
				}
				if (object[i].v_err == '' && object[i].vt_err == '') {
					object[i].v_err =
						data.value_type == '2' ? ValidationService.percentageValidationMethod(data.value) : '';
					data.value_type == '1'
						? (object[i].v_err = ValidationService.numberValidationMethod(data.value))
						: (object[i].v_err = '');
				}
				data.date_err == ''
					? (object[i].date_err = ValidationService.onlyFutureDateValidationMethod(data.date))
					: '';
				// alert(data.v_err)
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
		validation()
			? APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/store-salary-benfits/' + pc_unique_key,
				'POST',
				[obj, uid]
			)
				.then((res) => {
					if (res == 200) {
						var res1 = sec_completed;
						res1['emp_type'] = true;
						setSec_completed(res1);
						router.push('/manage-pc');
					}
				})
				.catch((error) => { })
			: console.log('false validation');
	};
	console.log(obj);
	const rows = [];
	obj.forEach((element, index) => {
		rows.push(
			<div className="border mt-5 ">
				
				<div className="m-2">
					<div className='row'>
						<div className='mt-3' style={{width:"2%"}}>
				<input
									type="checkbox"
									// value={true}
									checked={element.open == true}
									onChange={(e) => {
										updateOpen(index, e.target.checked);
									}}
								/>
								</div>
								<div className='' style={{width:"98%"}}>
					<div class="accordion-item">
					
						<h2 class="accordion-header" id="flush-headingOne">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+index} aria-expanded="false" aria-controls="flush-collapseOne">
								Salary (verloning) - {element.name}
							</button>
						</h2>
						<div id={"flush-collapseOne"+index} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" >
							<div class="accordion-body">
								<div 
								// className={element.open ? 'col-md-12 m-3' : 'col-md-12 m-3 d-none'}
								>
									<div className="row">
										<div className="col-md-3">
											<br />
											<input
												type="checkbox"
												value={mandatory}
												onChange={(e) => {
													updateMandatory(index, e.target.checked);
												}}
											/>
											<label>Is this mandatory?</label>
										</div>
										<div className="col-md-9">
											<br />
											<input
												type="checkbox"
												value={agent}
												onChange={(e) => {
													updateAgent(index, e.target.checked);
												}}
											/>
											<label>
												Allow sales agent to update the value during creation of cooperation agreement?
											</label>
										</div>
									</div>
									<br />
									<div className="row">
										<div className="col-md-4">
											<div className="row">
												<label>Salary benefit value</label>

												<RadioGroup
													name={'valuetype' + index}
													onChange={(e) => {
														updateValuetype(index, e);
													}}
													selectedValue={element.value_type}
												>
													<label htmlFor="valuetype1">
														<Radio id="valuetype1" value={1} />
														value in €
													</label>
													<br />
													<label htmlFor="valuetype2">
														<Radio id="valuetype2" value={2} />
														value in %
													</label>
												</RadioGroup>

												<p style={{ color: 'red' }}>{element.vt_err}</p>
												{/* </div> */}
												<input
													type="text"
													style={{ width: '78%' }}
													// value={valuev}
													defaultValue={element.value}
													onChange={(e) => {
														updateValue(index, e.target.value);
													}}
													name="valuetype"
												/>
												<p style={{ color: 'red' }}>{element.v_err}</p>
											</div>
											<div className="row">
												<label>Is the benefit granted in case of absence of the employee?</label>
												{/* onChange={this.onChangeValue} */}
												<RadioGroup
													name={'granted' + index}
													onChange={(e) => {
														updateGranted(index, e);
													}}
													selectedValue={element.granted}
												>
													<label htmlFor="granted1">
														<Radio id="granted1" value={0} />
														Yes
													</label>
													<br />
													<label htmlFor="granted2">
														<Radio id="granted2" value={1} />
														No
													</label>
												</RadioGroup>

												{/* <div onChange={setGranted}>
									<input  type="radio" value="0" name="granted" checked/> Yes<br />
									<input checked={element.granted==1} type="radio" value="1" name="granted" /> No
								</div> */}
											</div>
										</div>
										<div className="col-md-4">
											<div className="row">
												<label>Applicable coefficient</label>
												{/* onChange={this.onChangeValue} */}
												<RadioGroup
													name={'coefficient' + index}
													onChange={(e) => {
														updateCoefficientType(index, e);
													}}
													selectedValue={element.coefficient_type}
												>
													<label htmlFor="coefficient1">
														<Radio id="coefficient1" value={1} />
														Yes
													</label>
													<br />
													<label htmlFor="coefficient2">
														<Radio id="coefficient2" value={2} />
														No
													</label>
												</RadioGroup>
												<br />
												<p style={{ color: 'red' }}>{element.ct_err}</p>
												<input
													type="text"
													onChange={(e) => {
														updateCoefficientValue(index, e.target.value);
													}}
													className="col-md-11"
													defaultValue={element.coefficient_value}
													name="coefficientother"
												/>
												<p style={{ color: 'red' }}>{element.c_err}</p>
											</div>
											<div className="row">
												<label>Start date</label>
												<DateField
													id={'date'}
													isDisabled={false}
													placeholder={'date'}
													handleChange={(e) => {
														updateDate(index, e.target.value);
													}}
													className="col-md-11"
													value={element.date}
												/>
												{/* <input
									type="date"
									defaultValue={element.date}
									onChange={(e) => {
										updateDate(index, e.target.value);
									}}
								/> */}
												<p style={{ color: 'red' }}>{element.date_err}</p>
												{/* <DatePicker selected={date} name="startDate"  onChange={setDate}  dateFormat="MM/dd/yyyy"    locale="es"/> */}
											</div>
										</div>
										<div className="col-md-4">
											<div className="row">
												<label>Occurence</label>
												<MultiSelectField
													id={'select_id'}
													options={options}
													standards={getOptionObj(element.occurence)}
													disabled={false}
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
		<form onSubmit={Submit}>
			{rows}
			<button
				type="button"
				className={
					pc_view_type == 'addpc' ? (
						'bg-white border-0 poppins-regular-18px px-0 shadow-none text-decoration-underline'
					) : (
						'bg-white border-0 poppins-regular-18px px-0 shadow-none text-decoration-underline'
					)
				}
				onClick={() => {
					setCurrent_sec(4);
				}}
			>
				BACK
			</button>
			<button
				type="sumit"
				//  className="btn rounded-0  custom-btn px-3  btn-block "
				className="btn rounded-0 mt-1 custom-btn px-3  btn-block float-end poppins-light-19px-next-button"
				// onClick={() => submit}
			>
				Submit
			</button>
		</form>
	);
};
export default AddSalaryBenefits;
