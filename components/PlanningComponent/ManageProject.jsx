import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { fetchallproject, updateProject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import Popup from './ProjectArchivePopup';
import ReactPaginate from 'react-paginate';
import Link from 'node_modules/next/link';

function ManageProject(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;
	/**
     * Initialise search filter 
     */
	const [ updated, setUpdated ] = useState(0);
	const [ searchProjectname, setSearchProjectname ] = useState('');
	const [ searchlocation, setSearchlocation ] = useState('');
	const [ searchaddress, setSearchaddress ] = useState('');
	const [ project, setProject ] = useState('');
	const [ projectTemp, setProjectTemp ] = useState([]);
	const [ projectTemp2, setProjectTemp2 ] = useState([]);

	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ projectid, setProjectid ] = useState('');
	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	/**
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
	// DELETE FUNCTIONALITY //
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

	/**
     *  SEARCH FUNCTIONALITY
     */
	function handleSearch() {
		var res = [];
		//-------------------------IF ALL THREE VALUES ARE GIVEN----------------------//
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
			//--------------FOR WHEN TWO VALUES ARE GIVEN--------------------//
			projectTemp.map((val) => {
				if (
					val['project_name'].trim().toLowerCase().includes(searchProjectname.toLowerCase()) &&
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
					val['project_name'].trim().toLowerCase().includes(searchProjectname.toLowerCase()) &&
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
			// ----------FOR SINGLE VALUES---------------//
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
	function handleReset() {
		setProject(projectTemp);
		setSearchProjectname('');
		setSearchlocation('');
		setSearchaddress('');
	}
	let backToDashboard = () => {
		window.location.assign(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'dashboard?access=administrator&check_logged_in=1'
		);
	};

	return (
		<div className="container-fluid p-0">
			<form>
				<div className="row m-0 ">
					<div className="form-check p-0 mt-2  ">
						<h1 className="mt-1 mb-1 font-weight-bold   px-0  bitter-italic-normal-medium-24">
							Manage project
						</h1>
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
							<div className="col-sm-2">
								<button
									type="button"
									className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color"
									onClick={() => handleSearch()}
								>
									SEARCH
								</button>
								<button
									type="button"
									className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 ms-2 reset-btn"
									onClick={() => handleReset()}
								>
									RESET
								</button>
							</div>
						</div>
						<div className="form-check p-0 mt-2 text-center max-height-420">
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
												<td className="poppinns-regular-thin">{result.address}</td>
												<td className="d-flex justify-content-center">
													<Link href="edit-project">
														<a type="button">
															<MdEdit className="mt-2 ms-3 color-skyblue " />
														</a>
													</Link>

													<span onClick={() => showDeletePopup(result.id)} type="button">
														<MdDelete className="mt-2 ms-3 color-skyblue " />
													</span>
												</td>
											</tr>
										))}
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
				<div className="row my-4">
					{project.length >= itemsPerPage && (
						<ReactPaginate
							breakLabel="..."
							nextLabel={<AiOutlineArrowRight className="rtarw" />}
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel={<AiOutlineArrowLeft className="ltarw" />}
							renderOnZeroPageCount={null}
							containerClassName={'pagination justify-content-center project-pagination'}
							itemClass="page-item"
							linkClass="page-link"
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					)}
				</div>
				<div className="text-start col-md-6">
					<button
						type="button"
						className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 md-5 "
						onClick={() => backToDashboard()}
					>
						BACK
					</button>
				</div>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionDeleteNo={closeDeletePopup} popupActionDeleteYes={deleteproject} />
			)}
		</div>
	);
}
export default ManageProject;
