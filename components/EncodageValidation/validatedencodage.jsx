import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ReactPaginate from '../PcComponent/Pagination';
import { FaUndoAlt, FaSave, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
// import Datetime from 'react-datetime';
import Translation from '@/Translation';

function EncodageValidation(props) {
	const { t, trigger = 0 } = props;

	const { contextState = {} } = useContext(UserAuthContext);
	const router = useRouter();
	const [ editrow, setEditrow ] = useState(-999);
	const [ fcompany, setFcompany ] = useState('');
	const [ flocation, setFlocation ] = useState('');
	const [ fcostcenter, setFcostCenter ] = useState('');
	const [ fproject, setFproject ] = useState('');
	const [ data, setData ] = useState([]);
	const [ companies, setCompanies ] = useState([]);
	const [ locations, setLocations ] = useState([]);
	const [ costcenters, setConstCenters ] = useState([]);
	const [ dummydata, setDummydata ] = useState([]);

	/**
	 * Pagination related variables
	 */
	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	//------------------- Pagination code -------------------------//

	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);

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
		var url = '';
		var pdata = {
			company: 0,
			location: 0,
			costcenter: 0,
			project: 0
		};

		if (contextState.role == 'administrator' || contextState.role == 'absolute_you_admin_config_user') {
			url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-encodage-data/admin/1';
		}
		if (contextState.role == 'employeer') {
			url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-encodage-data/' + contextState.uid + '/1';
		}
		APICALL.service(url, 'POST', pdata)
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
		// }
	}, []);

	useEffect(
		() => {
			var dummy = data;
			const endOffset = itemOffset + itemsPerPage;
			dummy != null ? setDummydata(dummy.slice(itemOffset, endOffset)) : '';
			dummy != null ? setPageCount(Math.ceil(dummy.length / itemsPerPage)) : '';
		},
		[ itemOffset, itemsPerPage, data ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	const reset = () => {
		window.location.reload();
	};

	const filter = () => {
		let url = '';
		var pdata = {
			company: fcompany != '' ? fcompany.value : 0,
			location: flocation != '' ? flocation.value : 0,
			costcenter: fcostcenter != '' ? fcostcenter.value : 0,
			project: fproject != '' ? fproject.value : 0
		};
		if (contextState.role == 'administrator' || contextState.role == 'absolute_you_admin_config_user') {
			url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-encodage-data/admin/1';
		}
		if (contextState.role == 'employeer') {
			url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-encodage-data/' + contextState.uid + '/1';
		}
		APICALL.service(url, 'POST', pdata)
			.then((result) => {
				if (result[0] == 999) {
					setData(null);
				} else {
					setData(result[0]);
				}
			})
			.catch((error) => console.error('Error occurred'));
	};

	var display = '';
	var rows = [];
	data != null
		? data.forEach((element, index) => {
				rows.push(
					<tr className="border poppins-regular-18px p-2">
						{/* <td className="poppins-regular-18px p-2 ps-4 align-middle">
							<div className="">
								<input
									className="form-check-input rounded-0  align-self-center mt-2"
									name={index + 1}
									checked={!element.disabled}
									type="checkbox"
									onChange={() => enabledisbale(index)}
									id="flexCheckDefault"
								/>
							</div>
						</td> */}
						<td className="poppins-regular-18px p-2 align-middle">
							{ValidationService.getDate(element.starttime)}
						</td>
						<td className="poppins-regular-18px p-2 align-middle">
							{element.field_first_name_value + ' ' + element.field_last_name_value}
						</td>
						<td className="poppins-regular-18px p-2 align-middle">
							{ValidationService.getTime(element.starttime)}
						</td>
						<td className="poppins-regular-18px p-2 align-middle actual-end-time">
							{/* <DatePicker
								disableDayPicker
								name="time"
								format="HH:mm"
								value={new Date(element.wstart)}
								onChange={(e) => saveactualstart(index, e.format('YYYY-MM-DD HH:mm'))}
								plugins={[ <TimePicker key={element.wstart} hideSeconds /> ]}
								disabled={(editrow!=index)?true:false}
							/> */}
							{ValidationService.getTime(element.wstart)}
						</td>
						<td className="poppins-regular-18px p-2 align-middle">
							{ValidationService.getTime(element.endtime)}
						</td>
						<td className="poppins-regular-18px p-2 align-middle">
							{ValidationService.getDate(element.wend)}
						</td>
						<td className="poppins-regular-18px p-2 align-middle actual-end-time">
							{/* <DatePicker
								disableDayPicker
								name="time"
								format="HH:mm"
								value={new Date(element.wend)}
								onChange={(e) => saveactualend(index, e.format('YYYY-MM-DD HH:mm'))}
								plugins={[ <TimePicker key={element.wend} hideSeconds /> ]}
								disabled={(editrow!=index)?true:false}
							/> */}
							{ValidationService.getTime(element.wend)}
						</td>
						<td style={{ width: '149px' }} className="align-middle p-2 poppins-light-16px">
							<button // onClick={()=>updateValidation(element.wid, element.wstart, element.wend,index)}
							className="border-0 bg-transparent color-skyblue">
								{
									<span>
										{ValidationService.getDate(element.validated)}
										<FaShieldAlt />
									</span>
								}
							</button>
							{/* <button
								onClick={() => {editrow==index?updateValidation(element.wid, element.wstart, element.wend,index):'';updateEdit(index);}}
								className="border-0 bg-transparent color-skyblue"
							>
								{editrow==index ? <FaSave /> : <FaUndoAlt />}
							</button> */}
						</td>
					</tr>
				);
			})
		: (display = 'There is no plannngs for encodage validation.');

	return (
		<div>
			<div className="row py-4 position-sticky-pc encodage-validation">
				<div className="col-md-2">
					<label className="mb-2 poppins-regular-18px">{t('Company')}</label>
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
					<label className="mb-2 poppins-regular-18px">{t('Location')}</label>
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
					<label className="mb-2 poppins-regular-18px">{t('Cost center')}</label>
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
					<label className="mb-2 poppins-regular-18px">{t('Project')}</label>
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
					<div className="row">
						<div className="col-md-6">
							<button
								className="btn btn-block border-0 rounded-0 float-right skyblue-bg-color w-100 shadow-none text-uppercase"
								onClick={() => filter()}
							>
								{t('Filter')}
							</button>
						</div>
						<div className="col-md-6">
							<button
								className="btn border-0 btn-block rounded-0 float-right reset_skyblue_button w-100 shadow-none text-uppercase"
								onClick={() => reset()}
							>
								{t('Reset')}
							</button>
						</div>
					</div>
				</div>
			</div>
			{display==''?<div><table className="table">
				<thead>
					<tr className="btn-bg-gray-medium table-sticky-bg-gray">
						{/* <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4" /> */}
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Date')}</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Name')}</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">
							{t('Planned start time')}
						</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">
							{t('Actual start time')}
						</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">
							{t('Planned end time')}
						</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">
							{t('Actual end date')}
						</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">
							{t('Actual end time')}
						</th>
						<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actions')}</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
			<div>
				{data.length>8&&
			<ReactPaginate
			itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount}
			/>
				}
			</div>
			</div>
			:display}
			<div className="row">
				<div className="col-10">
					<input
						type="button"
						className="btn rounded-0 shadow-none border-0 px-0 poppins-light-18px text-uppercase text-decoration-underline"
						value="Back"
						onClick={() => router.push('/')}
					/>
				</div>
				<div className="col-2" />
			</div>
		</div>
	);
}

export default React.memo(
	Translation(EncodageValidation, [
		'Company',
		'Location',
		'Cost  center',
		'Project',
		'Filter',
		'Reset',
		'Date',
		'Firstname',
		'Lastname',
		'Planned start time',
		'Actual start time',
		'Planned end time',
		'Actual end time',
		'Actions'
	])
);
