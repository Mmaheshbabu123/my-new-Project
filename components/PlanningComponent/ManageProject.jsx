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
					<div className="form-check p-0 mt-2  ">
						{/* ----------------Search functionality--------------------------------*/}

						<div className="row d-flex mt-3">
							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
									placeholder="Project name"
									value={searchProjectname}
									onChange={(e) => setSearchProjectname(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
									placeholder="Location"
									value={searchlocation}
									onChange={(e) => setSearchlocation(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 text-break input-border-lightgray poppins-regular-18px mh-50 rounded-0  "
									placeholder="Address"
									value={searchaddress}
									onChange={(e) => setSearchaddress(e.target.value)}
								/>
							</div>
							<div className="col-sm-3">
								<div className="col-md-1">
									<button
										type="button"
										className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color"
										onClick={() => handleSearch()}
									>
										SEARCH
									</button>
								</div>
								{/*---------------- Reset functionality---------------------- */}

								<div className="col-md-1">
									{(searchProjectname != '' ||
										searchlocation != '' ||
										searchaddress != '' ||
										search === true) && (
										<button
											type="button"
											className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 ms-2 reset-btn"
											onClick={() => handleReset()}
										>
											RESET
										</button>
									)}
								</div>
							</div>
						</div>
						{/* ---------------------Manage project table-------------------------*/}

						<div className="form-check p-0 mt-2 text-center max-height-420 tab-pane fade show ">
							<table className="table   mt-3 mb-3 text-center">
								<thead>
									<tr className="btn-bg-gray-medium table-sticky-bg-gray">
										<th className="poppins-regular-18px justify-content-center d-flex align-items-center btn-bg-gray-medium">
											Project name
										</th>
										<th className="poppins-regular-18px btn-bg-gray-medium">Location</th>
										<th className="poppins-regular-18px btn-bg-gray-medium">Address</th>
										<th className="poppins-regular-18px btn-bg-gray-medium">Action</th>
									</tr>
								</thead>
								<tbody>
									{projectTemp2.length > 0 &&
										projectTemp2.map((result) => (
											<tr className="border poppinns-regular-thin p-2" key={result.id}>
												<td className="poppinns-regular-thin">{result.project_name}</td>
												<td className="poppinns-regular-thin">{result.project_location}</td>
												<td className="poppinns-regular-thin">
													{result.address.replace(',', '').length > 7 ? result.address : '-'}
												</td>
												{/*-------------------------Edit projects------------------------- */}

												<td className="d-flex justify-content-center">
													<Link href={'/editproject/' + result.id} className="">
														<a type="button">
															<MdEdit
																className="mt-2 ms-3 color-skyblue"
																data-toggle="tooltip"
																title="Edit project"
															/>
														</a>
													</Link>
													{/*-------------------- Planning update----------------------- */}

													<span>
														<a
															type="button"
															onClick={() =>
																router.push('/planning/add/' + result.p_unique_key)}
														>
															<GrUpdate
																className="mt-2 ms-3 color-skyblue "
																data-toggle="tooltip"
																title="Update planning"
															/>
														</a>
													</span>
												</td>
											</tr>
										))}
									{/*----------------------------No records found-------------------------- */}
									{project.length == 0 && (
										<tr>
											<td colSpan={4} className="text-center">
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
					{project.length >= itemsPerPage && (
						<ReactPaginate
							breakLabel="..."
							nextLabel={<AiOutlineArrowRight />}
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel={<AiOutlineArrowLeft />}
							renderOnZeroPageCount={null}
							containerClassName={'pagination justify-content-center project-pagination'}
							itemClass="page-item"
							linkClass="page-link"
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					)}
				</div>
				{/*---------------Back to dashobard redirection------------------ */}
				<div className="text-start col-md-6">
					<button
						type="button"
						className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 mb-5 "
						onClick={() => {
							window.location.assign(
								process.env.NEXT_PUBLIC_APP_URL_DRUPAL +
									'dashboard?access=administrator&check_logged_in=1'
							);
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
