import React, { Component, useEffect, useState, useContext } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';
import { APICALL } from '../../Services/ApiServices';
import { getDraftPlanning, deletePlanningDetails } from '../../Services/ApiEndPoints';
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './ProjectArchivePopup';

function DraftPlanning(props) {
	const { contextState = {} } = useContext(UserAuthContext);
	const { t, company, location, costcenter, week } = props;
	// const { t } = props;

	const [ loading, setLoading ] = useState(true);
	const [ data, setData ] = useState([]);
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ deletePlanningId, setDeletePlanningId ] = useState('');
	const [ updateList, setUpdateList ] = useState(false);

	// useEffect(
	// 	() => {
	// 		if (contextState.uid) {
	// 			APICALL.service(getDraftPlanning + contextState.uid, 'GET')
	// 				.then((result) => {
	// 					if (result.status == 200) {
	//                         setData(result.data[0])
	// 					}
	// 					console.log(result);
	// 				})
	// 				.catch((error) => {
	// 					console.error(error);
	// 				});
	// 		}
	// 	},
	// 	[ contextState.uid,updateList ]
	// );

	useEffect(
		() => {
			if (contextState.uid && company != undefined && company != '') {
				var loc = props.location != '' ? props.location : 0;
                var cc = props.costcenter != '' ? props.costcenter : 0;
				APICALL.service(getDraftPlanning + contextState.uid+ '/'+ company + '/' + loc + '/' + cc , 'GET')
					.then((result) => {
						if (result.status == 200) {
							setData(result.data[0]);
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ contextState.uid, updateList, props ]
	);

	const deletePlanning = async () => {
		APICALL.service(deletePlanningDetails + deletePlanningId, 'GET')
			.then((result) => {
				if (result.status == 200) {
					setShowdeletepopup(false);
					setDeletePlanningId('');
					setUpdateList(!updateList);
				}
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

	return (
		<div className="draft-container">
			{company != undefined && company != '' ? (
				<div className="form-check p-0 tab-pane fade show min_height_table project_table_sticky ">
					<table className="table mb-3 pt-4 mt-4">
						<thead>
							<tr className="btn-bg-gray-medium table-sticky-bg-gray">
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4">
									{t('Start date')}
								</th>
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Company')}</th>
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Loction')}</th>
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Cost center')}</th>
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Project')}</th>
								<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
							</tr>
						</thead>
						{/* <hr className="table-header-space"/> */}
						<tbody>
							{data.length > 0 &&
								data.map((result) => (
									<tr className="border poppins-regular-18px p-2" key={result.id}>
										<td className="poppins-regular-18px p-2 ps-4">
											{result.start_date.split('-').reverse().join('-')}
										</td>
										<td className="poppins-regular-18px p-2">{result.company_name}</td>
										<td className="poppins-regular-18px p-2">{result.location_name}</td>
										<td className="poppins-regular-18px p-2">
											{result.cost_center_name ? (
												result.cost_center_name
											) : (
												<div className="">-</div>
											)}
										</td>
										<td className="poppins-regular-18px p-2">
											{result.project_name ? result.project_name : <div className="">-</div>}
										</td>
										{/*-------------------------Edit projects------------------------- */}

										<td className="p-2">
											<Link
												href={'/planning/add/' + result.p_unique_key + '?type=edit'}
												className=""
											>
												<a type="button">
													<MdEdit
														className="color-skyblue"
														data-toggle="tooltip"
														title={t("Edit project")}
													/>
												</a>
											</Link>
											{/*-------------------- Planning update----------------------- */}

											<span
												className="ms-3 "
												onClick={() => {
													setShowdeletepopup(true);
													setDeletePlanningId(result.id);
												}}
											>
												<MdDelete
													className="color-skyblue"
													data-toggle="tooltip"
													title={t("Archive project")}
												/>
											</span>
										</td>
									</tr>
								))}
							{/*----------------------------No records found-------------------------- */}
							{data.length == 0 && (
								<tr>
									<td colSpan={8} className="text-center border py-3 poppins-regular-18px">
										{t('No draft planning')}
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
			) : (
				<div
					className="mt-4 align-middle text-center poppins-light-18px border align-items-center d-flex justify-content-center"
					style={{ height: '4rem' }}
				>
					{t('Select company and location to view draft planning.')}
				</div>
			)}
		</div>
	);
}

export default React.memo(Translation(DraftPlanning, [ 'Select company and location to view draft planning.', 'No draft planning', 'Action', 'Project', 'Cost center', 'Loction', 'Company', 'Edit project', 'Archive project' ]));
