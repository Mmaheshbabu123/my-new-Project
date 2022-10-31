import React, { useEffect, useState, useContext } from 'react';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import Translation from '@/Translation';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import moment from 'moment';
import { MdEdit, MdDelete } from 'react-icons/md';
import EditEmployee from './EditEmployee';









const PlanningOverview = (props)=>{
	const { t ,company,location,costcenter,week} = props;
const [ planning, setPlanning ] = useState([]);
const [ styleEdit, setStyleEdit ] = useState('col-md-12');
const [ showview, setShowview ] = useState(false);
const [ weekCount, setWeekCount ] = useState(0);
const [ activeWeek, setActiveWeek ] = useState([]);
const [ edit, setEdit ] = useState(false);
const [ editDate, setEditDate ] = useState([]);





useEffect(
    () => {
        // if (showview == true) {
            if (company != '') {
                var loc = props.location != '' ? props.location : 0;
                var cc = props.costcenter != '' ? props.costcenter : 0;
                APICALL.service(getWeeklyPlanning + company + '/' + loc + '/' + cc + '/' + weekCount, 'GET')
                    .then((result) => {
                        if (result.status == 200) {
							console.log(result.data[1]);
                            setPlanning(result.data[1]);
                            setActiveWeek(result.data[0]);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                setPlanning([]);
            }
        // }
    },
    [ showview, props, weekCount ]
);


useEffect(
    () => {
      if(activeWeek.length == 0){
        setActiveWeek(props.week);
      }  
    },
    [ props.week ]
);

let editplanning = (data) => {
	setEdit(true);
	setStyleEdit('col-md-9');
	setEditDate(data);
	window.scrollTo(0, 0);
};
let updateParent = () => {
	setStyleEdit('col-md-12');
	setEditDate([]);
	setEdit(false);
};

let updateSec = (parent_key) =>{
	var planning1 = [...planning];
	planning1[parent_key].map((v2,k2) =>{
		planning1[parent_key][k2][0].section_open = !planning1[parent_key][k2][0].section_open;
	});
	
	setPlanning(planning1);

}







    return(
        <div>
            <div className={'mt-2 min-height-weekly-planning'}>
							{planning || company != '' ? (
								<div className="row">
									<div className={styleEdit}>
										<p
											className={
												' bitter-italic-normal-medium-22 text-center table-title-bg py-3 '
											}
										>
											{company != '' && <FaLessThan
												className="less-grather mx-4"
												onClick={() => {
													setWeekCount(weekCount - 1);
												}}
											/>}{' '}
											<span
												onClick={() => {
													setWeekCount(0);
												}}
											>
												{t('Current week')}
											</span>{' '}
											{company != '' && <FaGreaterThan
												className="less-grather mx-4"
												onClick={() => {
													setWeekCount(weekCount + 1);
												}}
											/>}{' '}
										</p>
										<table className="table">
											<thead className="">
												{console.log(activeWeek)}
												{activeWeek &&
												activeWeek.length > 0 && (
													<tr className="skyblue-bg-color">
														<th className=" table-right-border-white  text-center align-items-center justify-content-center d-flex lh-base">
															{t('Monday')}
															<br />
															{activeWeek.length > 0 &&
																activeWeek[0].split('-').reverse().join('-')}
														</th>
														<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
															{t('Tuesday')} <br />
															{activeWeek.length > 0 &&
																activeWeek[1].split('-').reverse().join('-')}
														</th>
														<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
															{t('Wednesday')} <br />
															{activeWeek.length > 0 &&
																activeWeek[2].split('-').reverse().join('-')}
														</th>
														<th className=" table-right-border-white   text-center align-items-center justify-content-center lh-base">
															{t('Thursday')} <br />
															{activeWeek.length > 0 &&
																activeWeek[3].split('-').reverse().join('-')}
														</th>
														<th className=" table-right-border-white  text-center align-items-center justify-content-center lh-base">
															{t('Friday')}
															<br />
															{activeWeek.length > 0 &&
																activeWeek[4].split('-').reverse().join('-')}
														</th>
														<th className=" table-right-border-white  text-center  align-items-center justify-content-center lh-base">
															{t('Saturday')}
															<br />
															{activeWeek.length > 0 &&
																activeWeek[5].split('-').reverse().join('-')}
														</th>
														<th className="  text-center  align-items-center justify-content-center lh-base">
															{t('Sunday')}
															<br />
															{activeWeek.length > 0 &&
																activeWeek[6].split('-').reverse().join('-')}
														</th>
													</tr>
												)}
											</thead>
											<tbody>
												{Object.keys(planning).length > 0 ? (
													Object.keys(planning).map((value) => (
														<tr
															className="border-bottom table-border-gray equal-width-calc"
															key={value}
														>
															{activeWeek.map((val, key) => (
																<td
																	className=" table-border-gray font-poppins-light"
																	key={key}
																>
																	{planning[value].map(
																		(v2, k2) =>
																			v2.some((el) => el.pdate === val) ? (
																				<div>
																					{v2.map(
																						(val1, key1) =>
																							val1.pdate == val ? (
																								<div key={val1.id} onClick={()=>{updateSec(value,k2)}}>
																									{key1 == 0 && (
																										<div>
																											<div className="row mb-1">
																												<div className="col-md-9 pe-0">
																													<p className="employee-weekly-planning">
																														{
																															val1.employee_name
																														}
																													</p>
																												</div>
																												<div className="color-skyblue my-2 mt-1 text-end col-md-3 ps-0">
																													{new Date(
																														val1.pdate
																													) >
																													new Date() ? (
																														<a
																														>
																															<MdEdit
																																className="float-right cursor-pointer"
																																data-toggle="tooltip"
																																title="Edit plannig"
																																onClick={() =>{
																																	editplanning(
																																		val1
																																	);}}
																															/>
																														</a>
																													) : (
																														<span className="invisible">
																															edit
																														</span>
																													)}
																												</div>
																											</div>

																											{val1.section_open == true && <p className="poppins-light-14px">
																												{
																													val1.employee_type_name
																												}
																											</p>}

																											{val1.section_open == true && <p className="poppins-light-14px">
																												{
																													val1.function_name
																												}
																											</p>}

																											 <p className="poppins-light-14px">
																												{'€ ' +
																													val1.salary}
																											</p>
																										</div>
																									)}
																									<p className="poppins-light-14px">
																										{moment(
																											val1.starttime
																										).format(
																											'HH:mm'
																										) +
																											' to ' +
																											moment(
																												val1.endtime
																											).format(
																												'HH:mm'
																											)}
																									</p>
																								</div>
																							) : (
																								''
																							)
																					)}
																				</div>
																			) : (
																				''
																			)
																	)}
																</td>
															))}
														</tr>
													))
												) : company != '' ? (
													<tr className="no-records">
														<td
															colSpan={7}
															className="align-middle text-center poppins-light-18px border"
															style={{ height: '4rem' }}
														>
															{t('No planning for this week.')}
														</td>
													</tr>
												) : (
													<tr>
														<td
															colSpan={7}
															className="align-middle text-center poppins-light-18px border"
															style={{ height: '4rem' }}
														>
															{t('Select company and location to view planning.')}
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>

									{edit && (
										<div className="col-md-3">
											<EditEmployee data={editDate} childtoparent={updateParent} />
										</div>
									)}
								</div>
							) : (
								<div className="col-md-12 week-height align-items-center d-flex justify-content-center mb-4">
									{t('Select company and location to view planning.')}
								</div>
							)}
						</div>
        </div>
    )

}
export default React.memo(
    Translation(PlanningOverview, [
		'Weekly planning',
		'For the week of Monday from',
		'to sunday',
		'Planning view',
		'Draft planning',
		'Select company',
		'Select Location',
		'Select cost center',
		'Current week',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thrusday',
		'Friday',
		'Saturday',
		'Sunday',
		'No planning for this week.',
		'Select company and location to view planning.',
		'DASHBOARD'
	])
);
