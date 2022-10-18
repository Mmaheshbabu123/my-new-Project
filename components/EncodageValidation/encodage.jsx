import React, { useState, useEffect, useContext } from 'react';
import ValidationService from './../../Services/ValidationService';
// import { useParams, useNavigate } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import { PcContext } from '../../Contexts/PcContext';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import { FaUndoAlt,FaSave, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import Reset from 'pages/pincode/update/[p_unique_key]';

function encodageValidation(props) {
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
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-encodage-data', 'GET')
			.then((result) => {
				if (result[0] == 999) {
					setData(null);
				} else {
					setData(result[0]);
				}
				setCompanies(result[1]);
				setLocations(result[2]);
				setConstCenters(result[3]);
			})
			.catch((error) => console.error('Error occurred'));
	}, []);

	const enabledisbale = (index) => {
		var object = [ ...data ];
		object[index].disabled = false;
		setData(object);
	};

	const saveactualstart = (index, actualstart) => {
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
		window.location.reload(true);
	};

	const filter = () => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/filter-encodage-data', 'POST', [
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

	const updateValidation = (id) => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/validate-encodage/' + id, 'POST')
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.error('Error occurred'));
	};

	const updateTimes = () => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/filter-encodage-data', 'POST', [
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
					<tr>
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
						<td style={{ width: '149px' }}>
							<input
								type="text"
								name="name"
								style={{ width: '50%' }}
								value={element.wstart}
								onChange={() => {
									(e) => saveactualstart(e.target.value);
								}}
								disabled={element.disabled}
							/>
						</td>
						<td>{element.endtime}</td>
						<td style={{ width: '149px' }}>
							<input
								type="text"
								name="name"
								style={{ width: '50%' }}
								value={element.wend}
								onChange={() => {
									(e) => saveactualend(e.target.value);
								}}
								disabled={element.disabled}
							/>
						</td>
						<td>
							<button onClick={() => updateValidation(element.wid)}>
								{element.validated ? <FaShieldAlt /> : <FaCheckCircle />}
							</button>
							<button onClick={() => console.log('clicked')}>
								{!element.disabled?<FaSave/>:<FaUndoAlt />}
							</button>
						</td>
					</tr>
				);
			})
		: (display = 'There is no plannngs for encodage validation.');

	console.log(fcompany);

	return (
		<div>
			<div className="row">
				<div className="col-md-2">
					<label>Company</label>
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
					<label>Location</label>
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
					<label>Cost center</label>
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
					<label>Project</label>
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
				<div className="col-md-2">
					<button onClick={() => filter()}>Filter</button>
					<button onClick={() => reset()}>Reset</button>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Date</th>
						<th scope="col">Firstname</th>
						<th scope="col">Lastname</th>
						<th scope="col">Planned start time</th>
						<th scope="col">Actual start time</th>
						<th scope="col">Planned end time</th>
						<th scope="col">Actual end time</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
}

export default encodageValidation;
