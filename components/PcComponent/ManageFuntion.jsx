import React, { useState, useEffect } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { getFunctions, deleteFunction } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Popup from './Popupfunction';
import ReactPaginate from 'react-paginate';

import Link from 'next/link';

const ManageFunction = () => {
	const [ functions, setFunctions ] = useState([]);
	const [ functionsTemp, setFunctionsTemp ] = useState([]);
	const [ functionsTemp2, setFunctionsTemp2 ] = useState([]);
	const [ updated, setUpdated ] = useState(0);
	const [ searchPc, setSearchPc ] = useState('');
	const [ searchFunc, setSearchFunc ] = useState('');
	const [ searchCat, setSearchCat ] = useState('');
	const [ searchSal, setSearchSal ] = useState('');
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ funcnid, setFucnid ] = useState('');
	const [ itemsPerPage, setItemsPerPage ] = useState(8);
	const [ search, setSearch ] = useState(false);

	useEffect(
		() => {
			APICALL.service(getFunctions, 'GET')
				.then((result) => {
					setFunctions(result.data);
					setFunctionsTemp(result.data);
					setFunctionsTemp2(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ updated ]
	);

	const deletefuncn = async () => {
		var url = process.env.REACT_APP_BACKEND_URL;
		var data = {
			id: funcnid
		};

		APICALL.service(deleteFunction, 'POST', data)
			.then((result) => {
				console.log(result.status);
				setUpdated(updated + 1);
				setShowdeletepopup(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const closePopup = () => {
		setShowdeletepopup(false);
	};
	const showPopup = (id) => {
		setFucnid(id);
		setShowdeletepopup(true);
	};
	// SEARCH FUNCTIONALITY //

	function handleSearch() {
		setSearch(true);
		var res = [];

		// CONDITIONS WHEN ALL FOUR VALUES ARE GIVEN //

		if (searchPc != '' && searchFunc != '' && searchCat != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc.trim())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc.trim()))) &&
					val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase())) &&
					val['min_salary'].trim().toLowerCase().includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);

			// CONDITIONS WHEN ALL THREE VALUES ARE GIVEN //
		} else if (searchPc != '' && searchFunc != '' && searchCat != '') {
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc)) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc))) &&
					val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchFunc != '' && searchCat != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase())) &&
					val['min_salary'].trim().toLowerCase().includes(searchSal.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchCat != '' && searchSal != '' && searchPc != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()) &&
					val['min_salary'].trim().toLowerCase().includes(searchSal.trim().toLowerCase()) &&
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc.trim())))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchSal != '' && searchPc != '' && searchFunc != '') {
			functionsTemp.map((val) => {
				if (
					val['min_salary'].trim().includes(searchSal.trim()) &&
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc.trim()))) &&
					val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchPc != '' && searchFunc != '') {
			// CONDITIONS WHEN TWO VALUES ARE GIVEN //
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc)) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc))) &&
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchFunc != '' && searchCat != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchCat != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()) &&
					val['min_salary'].trim().includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchPc != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc.trim())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc.trim()))) &&
					val['min_salary'].trim().includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchFunc != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase()) &&
					val['min_salary'].trim().includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchPc != '' && searchCat != '') {
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc.trim()))) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
			// CONDITIONS WHEN ONLY ONE VALUE IS GIVEN //
		} else if (searchPc != '') {
			functionsTemp.map((val) => {
				if (
					(val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc.trim())) ||
					(val['pc_num'] != undefined &&
						val['pc_num'] != '' &&
						val['pc_num'] != null &&
						val['pc_num'].trim().includes(searchPc.trim()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
			// setFunctionsTemp2(res);
		} else if (searchCat != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchSal != '') {
			functionsTemp.map((val) => {
				if (val['min_salary'].trim().includes(searchSal.trim())) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else if (searchFunc != '') {
			functionsTemp.map((val) => {
				if (val['function_name'].trim().toLowerCase().includes(searchFunc.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setFunctions(res);
			setItemOffset(0);
		} else {
			setFunctions(functionsTemp);
		}
	}

	// RESET FUNCTIONALITY //

	function handleReset() {
		setSearch(false);
		setFunctions(functionsTemp);
		setSearchPc('');
		setSearchCat('');
		setSearchSal('');
		setSearchFunc('');
	}
	let backToDashboard = () => {
		window.location.assign(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'dashboard?access=administrator&check_logged_in=1'
		);
	};

	//------------------- Pagination code -------------------------//
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);

	useEffect(
		() => {
			const endOffset = itemOffset + itemsPerPage;
			setFunctionsTemp2(functions.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(functions.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, functions ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % functions.length;
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	return (
		<div className="container-fluid">
			<form>
				<div className="row">
					<p className="pt-3 pb-3 font-weight-bold  bitter-italic-normal-medium-24 h4 p-0 manage-sticky">
						Manage functions
					</p>
					<div className="col-md-2 ps-0">
						<input
							type="search"
							id="form12"
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Paritair comite number"
						/>
					</div>

					<div className="col-md-2">
						<input
							type="search"
							id="form12"
							value={searchFunc}
							onChange={(e) => setSearchFunc(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 "
							placeholder="Function Name"
						/>
					</div>

					<div className="col-md-2">
						<input
							type="search"
							id="form12"
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Minimum salary"
						/>
					</div>
					<div className="col-md-2">
						<input
							type="search"
							id="form12"
							value={searchCat}
							onChange={(e) => setSearchCat(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Category name"
						/>
					</div>

					<div className="col-md-4">
						<button
							type="button"
							className="btn  btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right py-2 px-4 ms-2 skyblue-bg-color"
							onClick={() => handleSearch()}
						>
							FILTER
						</button>
						{(searchPc.trim() != '' ||
							searchFunc.trim() != '' ||
							searchCat.trim() != '' ||
							searchSal.trim() != '' ||
							search === true) && (
							<button
								type="button"
								className="btn  btn-block float-right mt-2 mb-2 ms-2 rounded-0 float-right font-16 py-2 px-4 ms-2 reset-btn"
								onClick={() => handleReset()}
							>
								RESET
							</button>
						)}
					</div>

					<div className="form-check p-0 mt-2 text-center ">
						<table className="table   mt-3 mb-3 text-center">
							<thead>
								<tr className="btn-bg-gray-medium table-sticky-bg-gray h-50-mf">
									<th className="poppins-regular-18px justify-content-center d-flex align-items-center  btn-bg-gray-medium">
										Paritair comite number
									</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Function name</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Minimum salary</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Category</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Action</th>
								</tr>
							</thead>
							<tbody>
								{functionsTemp2.length > 0 &&
									functionsTemp2.map((result) => (
										<tr className="border poppinns-regular-thin p-2" key={result.funcn_id}>
											<td className="poppinns-regular-thin">
												{result.pc_number ? result.pc_number : result.pc_num}
											</td>
											<td className="poppinns-regular-thin">{result.function_name}</td>
											<td className="poppinns-regular-thin">€ {result.min_salary}</td>
											<td className="poppinns-regular-thin">{result.cat_name}</td>
											<td className="d-flex justify-content-center ">
												<Link
													href={
														result.pc_unique_key ? (
															'/editpc/' +
															result.pc_unique_key +
															'?fid=' +
															result.funcn_id
														) : (
															'/editpc/' + result.unique_key + '?fid=' + result.funcn_id
														)
													}
													className=""
												>
													<a className="">
														<MdEdit
															className="mt-2 ms-3 color-skyblue"
															data-toggle="tooltip"
															title="Edit function"
														/>
													</a>
												</Link>
												<span onClick={() => showPopup(result.funcn_id)} type="button">
													<MdDelete
														className="mt-2 ms-3 color-skyblue"
														data-toggle="tooltip"
														title="Delete function"
													/>
												</span>
											</td>
										</tr>
									))}
								{functions.length == 0 && (
									<tr>
										<td colSpan={4} className="text-center poppins-regular-18px">
											No records
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				{functions.length >= itemsPerPage && (
					<div className="row mt-1 mb-2">
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
					</div>
				)}
				<div className="row">
					<div className="text-start col-md-6 mb-4">
						<button
							type="button"
							className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right  md-5 px-0"
							onClick={() => backToDashboard()}
						>
							BACK
						</button>
					</div>
					<div className="col-md-6" />
				</div>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletefuncn} />
			)}
		</div>
	);
};
export default ManageFunction;
