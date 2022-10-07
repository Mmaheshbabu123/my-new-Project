import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdEdit } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { fetchallproject, updateProject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Link from 'node_modules/next/link';
import Image from 'next/image';
import UpdatePlanningIcon from '../images/Update-planning.svg';
import Pagination from '../PcComponent/Pagination';

function ManageProject(props) {
	const router = useRouter();
	/**
     * Initialise search filter 
     */
	const [ searchProjectname, setSearchProjectname ] = useState('');
	const [ searchlocation, setSearchlocation ] = useState('');
	const [ searchaddress, setSearchaddress ] = useState('');

	/**
	 * Project data assigned variables
	 */

	const [ project, setProject ] = useState([]);
	const [ projectTemp, setProjectTemp ] = useState([]);
	const [ projectTemp2, setProjectTemp2 ] = useState([]);
	const [ updated, setUpdated ] = useState(0);

	/**
	 * Reset button hide and show depending on the search values
	 */
	const [ search, setSearch ] = useState(false);

	/**
	 * Delete popup functionality assigned variables
	 */
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ projectid, setProjectid ] = useState('');

	/**
	 * Pagination related variables
	 */
	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	/**
	 * FETCHING PROJECT
	 */
	useEffect(
		() => {
			APICALL.service(fetchallproject, 'GET')
				.then((result) => {
					console.log(result.data);

					setProject(result.data);
					setProjectTemp(result.data);
					setProjectTemp2(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ updated ]
	);

	// ------------------------Delete functionality------------------------ //
	const deleteproject = async () => {
		var data = {
			id: projectid
		};
		APICALL.service(updateProject, 'POST', data)
			.then((result) => {
				console.log(result.status);
				setUpdated(updated + 1);
				setShowdeletepopup(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const closeDeletePopup = () => {
		setShowdeletepopup(false);
	};
	const showDeletePopup = (id) => {
		setProjectid(id);
		setShowdeletepopup(true);
	};
	//------------------- Pagination code -------------------------//
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);

	useEffect(
		() => {
			const endOffset = itemOffset + itemsPerPage;
			setProjectTemp2(project.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(project.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, project ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % project.length;
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	// ------------------------- Search functionality----------------------------//

	function handleSearch() {
		setSearch(true);
		var res = [];
		//-------------------------If all three values are given to filter----------------------//
		if (searchProjectname != '' && searchlocation != '' && searchaddress != '') {
			projectTemp.map((val) => {
				if (
					val['project_name'].trim().toLowerCase().includes(searchProjectname.trim().toLowerCase()) &&
					(val['project_location'] != undefined &&
						val['project_location'] != '' &&
						val['project_location'] != null &&
						val['project_location'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase())) &&
					val['address'].trim().toLowerCase().includes(searchaddress.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		} else if (searchProjectname != '' && searchlocation != '') {
			projectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchProjectname.trim().toLowerCase()) &&
					(val['project_location'] != undefined &&
						val['project_location'] != '' &&
						val['project_location'] != null &&
						val['project_location'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
			//--------------If two values are given to filter-------------------//
		} else if (searchlocation != '' && searchaddress != '') {
			projectTemp.map((val) => {
				if (
					val['project_location'].trim().toLowerCase().includes(searchlocation.toLowerCase()) &&
					(val['address'] != undefined &&
						val['address'] != '' &&
						val['address'] != null &&
						val['address'].trim().toLowerCase().includes(searchaddress.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		} else if (searchProjectname != '' && searchaddress != '') {
			projectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchProjectname.trim().toLowerCase()) &&
					(val['address'] != undefined &&
						val['address'] != '' &&
						val['address'] != null &&
						val['address'].trim().toLowerCase().includes(searchaddress.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		} else if (searchProjectname != '') {
			// ----------If single value is given to filter---------------//
			projectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchProjectname.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		} else if (searchlocation != '') {
			projectTemp.map((val) => {
				if (
					val['project_location'] != undefined &&
					val['project_location'] != '' &&
					val['project_location'] != null &&
					val['project_location'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		} else if (searchaddress != '') {
			projectTemp.map((val) => {
				if (
					val['address'] != undefined &&
					val['address'] != '' &&
					val['address'] != null &&
					val['address'].trim().toLowerCase().includes(searchaddress.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setProject(res);
			setItemOffset(0);
		}
	}
	// ---------------------Search reset------------------- //
	function handleReset() {
		setSearch(false);
		setProject(projectTemp);
		setSearchProjectname('');
		setSearchlocation('');
		setSearchaddress('');
	}

	return (
		<div className="container-fluid p-0">
			<form>
				<div className="row m-0 ">
					<div className="form-check p-0">
						{/* ----------------Search functionality--------------------------------*/}

						<div className="row d-flex project_sticky">
							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
									placeholder="Project name"
									value={searchProjectname}
									onChange={(e) => setSearchProjectname(e.target.value)}
								/>
							</div>

							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
									placeholder="Location"
									value={searchlocation}
									onChange={(e) => setSearchlocation(e.target.value)}
								/>
							</div>

							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 text-break input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none  "
									placeholder="Address"
									value={searchaddress}
									onChange={(e) => setSearchaddress(e.target.value)}
								/>
							</div>
							<div className="col-sm-3 field_height">
								<div className='row'>
								<div className="col-md-6">
									<button
										type="button"
										className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
										onClick={() => handleSearch()}
									>
										SEARCH
									</button>
								</div>
								{/*---------------- Reset functionality---------------------- */}

								<div className="col-md-6">
									{(searchProjectname != '' ||
										searchlocation != '' ||
										searchaddress != '' ||
										search === true) && (
										<button
											type="button"
											className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
											onClick={() => handleReset()}
										>
											RESET
										</button>
									)}
								</div>
								</div>
							</div>
						</div>
						{/* ---------------------Manage project table-------------------------*/}

						<div className="form-check p-0 mt-2 tab-pane fade show min_height_table project_table_sticky ">
							<table className="table mt-3 mb-3">
								<thead>
									<tr className="btn-bg-gray-medium table-sticky-bg-gray">
										<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4">
											Project name
										</th>
										<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Location</th>
										<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Address</th>
										<th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Action</th>
									</tr>
								</thead>
								{/* <hr className="table-header-space"/> */}
								<tbody>
									{projectTemp2.length > 0 &&
										projectTemp2.map((result) => (
											<tr className="border poppins-regular-18px p-2" key={result.id}>
												<td className="poppins-regular-18px p-2 ps-4">{result.project_name}</td>
												<td className="poppins-regular-18px p-2">{result.project_location}</td>
												<td className="poppins-regular-18px p-2">
													{result.address.replace(',', '').length > 7 ? result.address : '-'}
												</td>
												{/*-------------------------Edit projects------------------------- */}

												<td className="p-2">
													<Link href={'/editproject/' + result.id} className="">
														<a type="button">
															<MdEdit
																className="color-skyblue"
																data-toggle="tooltip"
																title="Edit project"
															/>
														</a>
													</Link>
													{/*-------------------- Planning update----------------------- */}

													<span className="ms-3 ">
														<a
															type="button"
															onClick={() =>
																router.push('/planning/add/' + result.p_unique_key)}
																className='mt-2 align-middle'
														>
															<Image
																src={UpdatePlanningIcon}
																// src={Updateplanning}

																alt="update planning"
																data-toggle="tooltip"
																title="Update planning"
																id="Update_p"
																width={20}
																height={20}
															/>

															{/* <GrUpdate
																className="mt-2 ms-3 color-skyblue "
																data-toggle="tooltip"
																title="Update planning"
															/> */}
														</a>
													</span>
												</td>
											</tr>
										))}
									{/*----------------------------No records found-------------------------- */}
									{project.length == 0 && (
										<tr>
											<td colSpan={4} className="text-center ">
												No records
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/*-------------------------- Pagination---------------------------*/}
				<div className="row my-4">
					{project.length > itemsPerPage && (
							<Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount}/>
						// <ReactPaginate
						// 	breakLabel="..."
						// 	nextLabel={<AiOutlineArrowRight />}
						// 	onPageChange={handlePageClick}
						// 	pageRangeDisplayed={5}
						// 	pageCount={pageCount}
						// 	previousLabel={<AiOutlineArrowLeft />}
						// 	renderOnZeroPageCount={null}
						// 	containerClassName={'pagination justify-content-center project-pagination'}
						// 	itemClass="page-item"
						// 	linkClass="page-link"
						// 	subContainerClassName={'pages pagination'}
						// 	activeClassName={'active'}
						// />
					)}
				</div>
				{/*---------------Back to dashobard redirection------------------ */}
				<div className="text-start col-md-6">
					<button
						type="button"
						className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"
						onClick={() => {
							window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
						}}
					>
						BACK
					</button>
				</div>
			</form>
			{/* Delete popup */}
			{/* {showdeletepopup == true && (
				<Popup
					display={'block'}
					popupActionDeleteNo={closeDeletePopup}
					popupActionDeleteYes={deleteproject}
					body={'Are you sure you want to delete this project?'}
				/>
			)} */}
		</div>
	);
}
export default ManageProject;
