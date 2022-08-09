import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { fetchallproject, updateProject, fetchallarchivedprojects } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import Popup from './ProjectArchivePopup';
import ReactPaginate from 'react-paginate';
import Link from 'node_modules/next/link';

function ManageArchivedProject(props) {
	const [ updated, setUpdated ] = useState(0);
	const [ searchArchivedProjectname, setSearchArchivedProjectname ] = useState('');
	const [ searchArchivedlocation, setSearchArchivedlocation ] = useState('');
	const [ searchArchivedaddress, setSearchArchivedaddress ] = useState('');
	const [ archivedproject, setArchivedproject ] = useState([]);
	const [ archivedprojectTemp, setArchivedprojectTemp ] = useState([]);
	const [ archivedprojectTemp2, setarchivedprojectTemp2 ] = useState([]);

	const [ archivedprojectid, setArchivedprojectid ] = useState('');
	const [ itemsPerPage, setItemsPerPage ] = useState(8);
	/**
	 * FETCHING ARCHIVED PROJECT
	 */
	useEffect(
		() => {
			APICALL.service(fetchallarchivedprojects, 'GET')
				.then((result) => {
					console.log(result.data);

					setArchivedproject(result.data);
					setArchivedprojectTemp(result.data);
					setarchivedprojectTemp2(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ updated ]
	);
	//------------------- Pagination code -------------------------//
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);

	useEffect(
		() => {
			const endOffset = itemOffset + itemsPerPage;
			setarchivedprojectTemp2(archivedproject.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(archivedproject.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, archivedproject ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % archivedproject.length;
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	// ----------------------Search --------------------------------//
	function handleSearch() {
		var res = [];
		//-------------------------IF ALL THREE VALUES ARE GIVEN----------------------//
		if (searchArchivedProjectname != '' && searchArchivedlocation != '' && searchArchivedaddress != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.trim().toLowerCase()) &&
					(val['project_location'] != undefined &&
						val['project_location'] != '' &&
						val['project_location'] != null &&
						val['project_location']
							.trim()
							.toLowerCase()
							.includes(searchArchivedlocation.trim().toLowerCase())) &&
					val['address'].trim().toLowerCase().includes(searchArchivedaddress.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedProjectname != '' && searchArchivedlocation != '') {
			//--------------FOR WHEN TWO VALUES ARE GIVEN--------------------//
			archivedprojectTemp.map((val) => {
				if (
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.toLowerCase()) &&
					(val['project_location'] != undefined &&
						val['project_location'] != '' &&
						val['project_location'] != null &&
						val['project_location']
							.trim()
							.toLowerCase()
							.includes(searchArchivedlocation.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedlocation != '' && searchArchivedaddress != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['project_location'].trim().toLowerCase().includes(searchArchivedlocation.toLowerCase()) &&
					(val['address'] != undefined &&
						val['address'] != '' &&
						val['address'] != null &&
						val['address'].trim().toLowerCase().includes(searchArchivedaddress.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedProjectname != '' && searchArchivedaddress != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.toLowerCase()) &&
					(val['address'] != undefined &&
						val['address'] != '' &&
						val['address'] != null &&
						val['address'].trim().toLowerCase().includes(searchArchivedaddress.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedProjectname != '') {
			// ----------FOR SINGLE VALUES---------------//
			archivedprojectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedlocation != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['project_location'] != undefined &&
					val['project_location'] != '' &&
					val['project_location'] != null &&
					val['project_location'].trim().toLowerCase().includes(searchArchivedlocation.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		} else if (searchArchivedaddress != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['address'] != undefined &&
					val['address'] != '' &&
					val['address'] != null &&
					val['address'].trim().toLowerCase().includes(searchArchivedaddress.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setArchivedproject(res);
			setItemOffset(0);
		}
	}
	function handleReset() {
		setArchivedproject(archivedprojectTemp);
		setSearchArchivedProjectname('');
		setSearchArchivedlocation('');
		setSearchArchivedaddress('');
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
						<div className="row d-flex mt-3">
							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
									placeholder="Project name"
									value={searchArchivedProjectname}
									onChange={(e) => setSearchArchivedProjectname(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
									placeholder="Location"
									value={searchArchivedlocation}
									onChange={(e) => setSearchArchivedlocation(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 text-break input-border-lightgray poppins-regular-18px mh-50 rounded-0  "
									placeholder="Address"
									value={searchArchivedaddress}
									onChange={(e) => setSearchArchivedaddress(e.target.value)}
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

						<div className="form-check p-0 mt-2 text-center max-height-420 tab-pane fade show ">
							<table className="table   mt-3 mb-3 text-center">
								<thead>
									<tr className="btn-bg-gray-medium table-sticky-bg-gray">
										<th className="poppins-regular-18px justify-content-center d-flex align-items-center btn-bg-gray-medium">
											Project name
										</th>
										<th className="poppins-regular-18px btn-bg-gray-medium">Location</th>
										<th className="poppins-regular-18px btn-bg-gray-medium">Address</th>
									</tr>
								</thead>
								<tbody>
									{archivedprojectTemp2.length > 0 &&
										archivedprojectTemp2.map((result) => (
											<tr className="border poppinns-regular-thin p-2" key={result.id}>
												<td className="poppinns-regular-thin">{result.project_name}</td>
												<td className="poppinns-regular-thin">{result.project_location}</td>
												<td className="poppinns-regular-thin">{result.address}</td>
											</tr>
										))}

									{archivedproject.length == 0 && (
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
					{archivedproject.length >= itemsPerPage && (
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
				<div className="text-start col-md-6">
					<button
						type="button"
						className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 mb-5 "
						onClick={() => backToDashboard()}
					>
						BACK
					</button>
				</div>
			</form>
		</div>
	);
}
export default ManageArchivedProject;
