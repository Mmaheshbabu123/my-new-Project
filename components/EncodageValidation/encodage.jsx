import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker from 'react-multi-date-picker';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import { FaUndoAlt,FaSave, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import Reset from 'pages/pincode/update/[p_unique_key]';
// import Datetime from 'react-datetime';
import Translation from '@/Translation';

function EncodageValidation(props) {
	const {t} =props;
	const router = useRouter();
	const [ fcompany, setFcompany ] = useState('');
	const [ flocation, setFlocation ] = useState('');
	const [ fcostcenter, setFcostCenter ] = useState('');
	const [ fproject, setFproject ] = useState('');
	const [ data, setData ] = useState([]);
	const [ companies, setCompanies ] = useState([]);
	const [ locations, setLocations ] = useState([]);
	const [ costcenters, setConstCenters ] = useState([]);

	const {
		setCurrent_sec,
		setSec_completed,
		sec_completed,
		pc_unique_key,
		setPc_unique_key,
		setCat_rightsec,
		setCat_leftsec,
		setCat_fun_updated,
		cat_subsec_type,
		setCat_subsec_type,
		cat_subsec_id,
		setCat_subsec_id
	} = useContext(PcContext);

	useEffect(() => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-encodage-data', 'GET')
			.then((result) => {
				if (result[0] == 999) {
					setData(null);
				} else {
					setData(result[0]);
				}
				setCompanies(result[1]);
				setLocations(result[2]);
				setConstCenters(result[3]);
				console.log(result);
			})
			.catch((error) => console.error('Error occurred'));
	}, []);

	const enabledisbale = (index) => {
		var object = [ ...data ];
		object[index].disabled = false;
		setData(object);
	};

	const saveactualstart = (index, actualstart) => {
		console.log(actualstart);
		var object = [ ...data ];
		object[index].wstart = actualstart;
		setData(object);
	};

	const saveactualend = (index, actualend) => {
		var object = [ ...data ];
		object[index].wend = actualend;
		setData(object);
	};

	const reset = () => {
		window.location.reload();
	};

	const filter = () => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/filter-encodage-data', 'POST', 
			fcompany != '' ? fcompany.value : 0,
			flocation != '' ? flocation.value : 0,
			fcostcenter != '' ? fcostcenter.value : 0,
			fproject != '' ? fproject.value : 0
		)
			.then((result) => {
				setData(result);
			})
			.catch((error) => console.error('Error occurred'));
	};

	const updateValidation = (id) => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/validate-encodage/' + id, 'POST')
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.error('Error occurred'));
	};

	const updateTimes = () => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/filter-encodage-data', 'POST', [
			fcompany != '' ? fcompany.value : 0,
			flocation != '' ? flocation.value : 0,
			fcostcenter != '' ? fcostcenter.value : 0,
			fproject != '' ? fproject.value : 0
		])
			.then((result) => {
				setData(result);
			})
			.catch((error) => console.error('Error occurred'));
	};

	var display = '';
	var rows = [];
	data != null
		? data.forEach((element, index) => {
				console.log(element);
				rows.push(
					<tr className="border poppins-regular-18px p-2" >
                                        <td className="poppins-regular-18px p-2 ps-4 align-middle">
                                            <div className="">
                                                <input className="form-check-input rounded-0  align-self-center mt-2" name={index+1} checked={!element.disabled} type="checkbox" onChange={()=>enabledisbale(index)}  id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td className="poppins-regular-18px p-2 align-middle">{element.field_first_name_value+' '+element.field_last_name_value}</td>
                                        <td className="poppins-regular-18px p-2 align-middle">{ValidationService.timeFOrmating(element.starttime)}</td>
                                        <td className="poppins-regular-18px p-2 align-middle">{ValidationService.timeFOrmating(element.wstart)}</td>
										<td className="poppins-regular-18px p-2 align-middle ">{ValidationService.timeFOrmating(element.endtime)}</td>
										<td className="poppins-regular-18px p-2 align-middle ">{ValidationService.getDate(element.wend)}</td>
                                        <td className="poppins-regular-18px p-2 actual-end-time align-middle">
										<DatePicker
                                                        disableDayPicker
                                                        name="time" 
                                                        format="HH:mm"
                                                        value={new Date(element.wend)}
                                                        onChange={(e)=>saveactualend(index,e.format('YYYY-MM-DD HH:mm:00'))}
                                                        plugins={[
                                                            <TimePicker key={element.wend}  hideSeconds/>
                                                          ]} 
														  disabled={element.disabled}
                                                    />
											{/* <input
								type="text"
								name="name"
								style={{ width: '50%' }}
								value={element.wend}
								onChange={() => {
									(e) => saveactualend(e.target.value);
								}} */}
								
							</td>
                            <td style={{ width: '149px' }} className="align-middle p-2 poppins-light-16px"><button onClick={() => updateValidation(element.starttime,element.wend,element.wid)} className='border-0 bg-transparent color-skyblue'>
								{element.validated ? <FaShieldAlt /> : <FaCheckCircle />}
							</button>
							<button onClick={() => console.log('clicked')} className='border-0 bg-transparent color-skyblue'>
								{!element.disabled?<FaSave/>:<FaUndoAlt />}
							</button></td>

                                    {/* </tr> */}
					 {/* <tr>
					 	<th scope="row">
					 		<input type="checkbox" 
                             name={index+1}
                            checked={!element.disabled}
                             onChange={()=>enabledisbale(index)} />
					 	</th>
						<td>{element.pdate}</td>
						<td>{element.field_first_name_value}</td>
						<td>{element.field_last_name_value}</td>
						<td>{element.starttime}</td>
						<td style={{ width: '149px' }}> */}
					{/* <tr className='border'>
						<td scope="row" className='align-middle py-3 poppins-light-16px'>
							<input type="checkbox" 
										 className='form-check-input rounded-0'
                     name={index+1}
                     checked={!element.disabled}
                     onChange={()=>enabledisbale(index)} />
						</td>
						<td className='align-middle py-3 poppins-light-16px'>{element.pdate}</td>
						<td className='align-middle py-3 poppins-light-16px'>{element.field_first_name_value}</td>
						<td className='align-middle py-3 poppins-light-16px'>{element.field_last_name_value}</td>
						<td className='align-middle py-3 poppins-light-16px'>{element.starttime}</td>
						<td style={{ width: '149px' }} className='align-middle py-3 poppins-light-16px'> */}
						{/* <Datetime 	onChange={() => {
									(e) => saveactualstart(e.target.value)
								}}></Datetime>; */}
							{/* <input
								type="datetime-local"
								name="name"
								// format='YYYY-MM-DDTHH:mm'
								style={{ width: '50%' }}
								// value={element.wstart}
								onChange={() => {
									(e) => saveactualstart(e.target.value)
								}}
								disabled={element.disabled}
							/> */}
						{/* </td>
						<td>{element.endtime}</td>
						<td style={{ width: '149px' }}>
							<input
								type="text"
								className='border-0'
								name="name"
								style={{ width: '50%' }}
								value={element.wend}
								onChange={() => {
									(e) => saveactualend(e.target.value);
								}}
								disabled={element.disabled}
							/>
						</td>
						<td className='align-middle py-3 poppins-light-16px'> 
							<button onClick={() => updateValidation(element.wid)} className='border-0 bg-transparent color-skyblue me-2 px-0'>
								{element.validated ? <FaShieldAlt /> : <FaCheckCircle />}
							</button>
							<button onClick={() => console.log('clicked')} className='border-0 bg-transparent color-skyblue px-0'>
								{!element.disabled?<FaSave/>:<FaUndoAlt />}
							</button>
						</td> */}
					</tr>
				);
			})
		: (display = 'There is no plannngs for encodage validation.');

	console.log(fcompany);

	return (
		<div>
			<div className="row py-4 position-sticky-pc encodage-validation">
				<div className="col-md-2">
					<label className='mb-2 poppins-regular-18px'>{t('Company')}</label>
					<MultiSelectField
						// placeholder={''}
						id={'select_id'}
						options={companies}
						standards={fcompany}
						disabled={false}
						handleChange={(obj) => setFcompany(obj)}
						isMulti={false}
						className="col-md-12 "
					/>
				</div>
				<div className="col-md-2">
					<label className='mb-2 poppins-regular-18px'>{t('Location')}</label>
					<MultiSelectField
						// placeholder={'Select employee type'}
						id={'select_id'}
						options={locations}
						standards={flocation}
						disabled={false}
						handleChange={(obj) => setFlocation(obj)}
						isMulti={false}
						className="col-md-12 "
					/>
				</div>
				<div className="col-md-2">
					<label className='mb-2 poppins-regular-18px'>{t('Cost center')}</label>
					<MultiSelectField
						// placeholder={'Select employee type'}
						id={'select_id'}
						options={costcenters}
						// standards={key['emp_type'] == 0 ? '' : employeTypeSelection(key['emp_type'])}
						disabled={false}
						handleChange={(obj) => setFcostCenter(obj)}
						isMulti={false}
						className="col-md-12 "
					/>
				</div>
				<div className="col-md-2">
					<label className='mb-2 poppins-regular-18px'>{t('Project')}</label>
					<MultiSelectField
						// placeholder={'Select employee type'}
						id={'select_id'}
						// options={emptypes}
						// standards={key['emp_type'] == 0 ? '' : employeTypeSelection(key['emp_type'])}
						disabled={false}
						handleChange={(obj) => setFproject(obj)}
						// handleChange={(obj) => updateEmployeeType(value, obj.value)}
						isMulti={false}
						className="col-md-12 "
					/>
				</div>
				<div className="col-md-4 align-self-end">
					<div className='row'>
						<div className='col-md-6'>
						<button className="btn btn-block border-0 rounded-0 float-right skyblue-bg-color w-100 shadow-none" onClick={() => filter()}>{t('Filter')}</button>
						</div>
						<div className='col-md-6'>
						<button className='btn border-0 btn-block rounded-0 float-right reset_skyblue_button w-100 shadow-none' onClick={() => reset()}>{t('Reset')}</button>
						</div>
					</div>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4"></th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Name')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Planned start time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actual start time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Planned end time')}</th>
										<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actual end date')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actual end time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actions')}</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
}

export default React.memo(Translation(EncodageValidation,['Company','Location','Cost  center','Project','Filter','Reset','Date','Firstname','Lastname','Planned start time','Actual start time','Planned end time','Actual end time','Actions'] ));
