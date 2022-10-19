import React, { Component, useEffect, useState, useContext } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { APICALL } from '../../Services/ApiServices';
import { getDraftPlanning,deletePlanningDetails } from '../../Services/ApiEndPoints';
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './ProjectArchivePopup';








function DraftPlanning(props) {

    const { contextState = {} } = useContext(UserAuthContext);
    const [ loading, setLoading ] = useState(true);
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);

    useEffect(
		() => {
			if (contextState.uid) {
				APICALL.service(getDraftPlanning + contextState.uid, 'GET')
					.then((result) => {
						if (result.status == 200) {
                            setData(result.data[0])
							// console.log(result);
							// setCompanylist(result.data[0]);
							// setLocationlist(result.data[1]);
							// setCostcenterlist(result.data[2]);
							// setShowview(true);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ contextState.uid ]
	);

	const deletePlanning = async () => {
		APICALL.service(deletePlanningDetails, 'POST', data)
			.then((result) => {
				console.log(result.status);
				setShowdeletepopup(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const showPopup = (p_unique_key) => {
		setShow(true);
	};

	const closeDeletePopup = () => {
		setShowdeletepopup(false);
	};

    const [ data, setData ] = useState([]);

	return (
		<div>
			<div className="form-check p-0 tab-pane fade show min_height_table project_table_sticky ">
				<table className="table mb-3 pt-4">
					<thead>
						<tr className="btn-bg-gray-medium table-sticky-bg-gray">
							<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4">
								Start date
							</th>
							<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Company</th>
							<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Loction</th>
                            <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Cost center</th>
                            <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Project</th>
							<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Action</th>
						</tr>
					</thead>
					{/* <hr className="table-header-space"/> */}
					<tbody>
						{data.length > 0 &&
							data.map((result) => (
								<tr className="border poppins-regular-18px p-2" key={result.id}>
									<td className="poppins-regular-18px p-2 ps-4">{result.start_date.split('-').reverse().join('-')}</td>
									<td className="poppins-regular-18px p-2">{result.company_name}</td>
									<td className="poppins-regular-18px p-2">
                                    {result.location_name}
									</td>
                                    <td className="poppins-regular-18px p-2">
									{result.cost_center_name?result.cost_center_name:<div className=''>-</div>}	
									</td>
                                    <td className="poppins-regular-18px p-2">
                                    {result.project_name?result.project_name:<div className=''>-</div>}	
									</td>
									{/*-------------------------Edit projects------------------------- */}

									<td className="p-2">
										<Link href={'/planning/add/' + result.p_unique_key+'?type=edit'} className="">
											<a type="button">
												<MdEdit
													className="color-skyblue"
													data-toggle="tooltip"
													title="Edit project"
												/>
											</a>
										</Link>
										{/*-------------------- Planning update----------------------- */}

										<span className="ms-3 " onClick={() => setShowdeletepopup(true)}>
												<MdDelete
													className="color-skyblue"
													data-toggle="tooltip"
													title="Edit project"
												/>
										</span>
									</td>
								</tr>
							))}
						{/*----------------------------No records found-------------------------- */}
						{data.length == 0 && (
							<tr >
								<td colSpan={4} className="text-center">
									No draft planning
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{showdeletepopup == true && (
						<Popup
							display={'block'}
							popupActionDeleteNo={closeDeletePopup}
							popupActionDeleteYes={deletePlanning}
							body={'Are you sure you want to delete this planning?'}
						/>
					)}
			</div>
		</div>
	);
}

export default DraftPlanning;
