import React, { useState, useEffect } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { getFunctions, deleteFunction } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './Popupfunction';
import ReactPaginate from 'react-paginate';

import Link from 'next/link';

const ManageFunction = () => {
	const [ functions, setFunctions ] = useState([]);
	const [ functionsTemp, setFunctionsTemp ] = useState([]);
	const [ updated, setUpdated ] = useState(0);

	const [ searchPc, setSearchPc ] = useState('');
	const [ searchFunc, setSearchFunc ] = useState('');
	const [ searchCat, setSearchCat ] = useState('');
	const [ searchSal, setSearchSal ] = useState('');
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ funcnid, setFucnid ] = useState('');

	// const [ state, setState ] = useState({
	// 	searchTerm: '',
	// 	filterRows: rows,
	// 	searchKey: 'name',
	// 	currentItems: [],
	// 	pageCount: 0,
	// 	itemOffset: 0,
	// 	currentPage: 0
	// });

	// useEffect(
	// 	() => {
	// 		setState({ ...state, filterRows: rows });
	// 	},
	// 	[ rows.length ]
	// );

	useEffect(
		() => {
			APICALL.service(getFunctions, 'GET')
				.then((result) => {
					console.log(result);
					setFunctions(result.data);
					setFunctionsTemp(result.data);
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
		var res = [];

		// CONDITIONS WHEN ALL FOUR VALUES ARE GIVEN //

		if (searchPc != '' && searchFunc != '' && searchCat != '' && searchSal != '') {
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
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase())) &&
					val['min_salary'].toLowerCase().includes(searchSal)
				) {
					res.push(val);
				}
			});
			setFunctions(res);

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
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchFunc != '' && searchCat != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase())) &&
					val['min_salary'].trim().toLowerCase().includes(searchSal.toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchCat != '' && searchSal != '' && searchPc != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase()) &&
					val['min_salary'].trim().toLowerCase().includes(searchSal.toLowerCase()) &&
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.toLowerCase())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc)))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchSal != '' && searchPc != '' && searchFunc != '') {
			functionsTemp.map((val) => {
				if (
					val['min_salary'].trim().includes(searchSal) &&
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.toLowerCase())) ||
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
		} else if (searchFunc != '' && searchCat != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchCat != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase()) &&
					val['min_salary'].trim().includes(searchSal)
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchPc != '' && searchSal != '') {
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
					val['min_salary'].trim().includes(searchSal)
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchFunc != '' && searchSal != '') {
			functionsTemp.map((val) => {
				if (
					val['function_name'].trim().toLowerCase().includes(searchFunc.toLowerCase()) &&
					val['min_salary'].trim().includes(searchSal)
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchPc != '' && searchCat != '') {
			functionsTemp.map((val) => {
				if (
					((val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().toLowerCase().includes(searchPc.toLowerCase())) ||
						(val['pc_num'] != undefined &&
							val['pc_num'] != '' &&
							val['pc_num'] != null &&
							val['pc_num'].trim().includes(searchPc))) &&
					(val['cat_name'] != undefined &&
						val['cat_name'] != '' &&
						val['cat_name'] != null &&
						val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase()))
				) {
					res.push(val);
				}
			});
			setFunctions(res);

			// CONDITIONS WHEN ONLY ONE VALUE IS GIVEN //
		} else if (searchPc != '') {
			functionsTemp.map((val) => {
				if (
					(val['pc_number'] != undefined &&
						val['pc_number'] != '' &&
						val['pc_number'] != null &&
						val['pc_number'].trim().includes(searchPc)) ||
					(val['pc_num'] != undefined &&
						val['pc_num'] != '' &&
						val['pc_num'] != null &&
						val['pc_num'].trim().includes(searchPc))
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchCat != '') {
			functionsTemp.map((val) => {
				if (
					val['cat_name'] != undefined &&
					val['cat_name'] != '' &&
					val['cat_name'] != null &&
					val['cat_name'].trim().toLowerCase().includes(searchCat.toLowerCase())
				) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchSal != '') {
			functionsTemp.map((val) => {
				if (val['min_salary'].includes(searchSal)) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else if (searchFunc != '') {
			functionsTemp.map((val) => {
				if (val['function_name'].toLowerCase().includes(searchFunc.toLowerCase())) {
					res.push(val);
				}
			});
			setFunctions(res);
		} else {
			setFunctions(functionsTemp);
		}
	}

	// RESET FUNCTIONALITY //

	function handleReset() {
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
	// PAGINATION STARTS

	//------------------- Pagination code -------------------------//

	const [ currentItems, setCurrentItems ] = useState([]);
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);
	const itemsPerPage = 1;

	useEffect(
		() => {
			const endOffset = itemOffset + itemsPerPage;
			console.log(`Loading items from ${itemOffset} to ${endOffset}`);
			setCurrentItems(functions.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(functions.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, functions ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % functions.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	return (
		<div className="container">
			<form>
				<div className="row">
					<p className="mt-4 mb-2 h4">Manage functions</p>
					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
							className="form-control mt-2 mb-2"
							placeholder="Paritair comite number"
						/>
					</div>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							value={searchFunc}
							onChange={(e) => setSearchFunc(e.target.value)}
							className="form-control mt-2 mb-2 "
							placeholder="Function Name"
						/>
					</div>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							value={searchCat}
							onChange={(e) => setSearchCat(e.target.value)}
							className="form-control mt-2 mb-2"
							placeholder="Category name"
						/>
					</div>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
							className="form-control mt-2 mb-2"
							placeholder="Minimum salary"
						/>
					</div>

					<div className="col-sm-2">
						<button
							type="button"
							className="btn btn-secondary   btn-block float-right mt-2 mb-2 ms-2"
							onClick={() => handleReset()}
						>
							Reset
						</button>

						<button
							type="button"
							className="btn btn-secondary   btn-block float-right mt-2 mb-2"
							onClick={() => handleSearch()}
						>
							Search
						</button>
					</div>

					<div className="form-check mt-2 text-center ">
						<table className="table border border-secondary mt-3">
							<thead>
								<tr className="table-secondary">
									<th className="border-end border-secondary">Paritair comite number</th>
									<th className="border-end border-secondary">Function name</th>
									<th className="border-end border-secondary">Minimum salary</th>
									<th className="border-end border-secondary">Category</th>
									<th className="border-end border-secondary">Action</th>
								</tr>
							</thead>
							<tbody>
								{functions.length > 0 &&
									functions.map((result) => (
										<tr className="border-bottom border-secondary" key={result.funcn_id}>
											<td className="border-end border-secondary">
												{result.pc_number ? result.pc_number : result.pc_num}
											</td>
											<td className="border-end border-secondary">{result.function_name}</td>
											<td className="border-end border-secondary">€ {result.min_salary}</td>
											<td className="border-end border-secondary">{result.cat_name}</td>
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
														<MdEdit className="mt-2 ms-3" />
													</a>
												</Link>
												<span onClick={() => showPopup(result.funcn_id)} type="button">
													<MdDelete className="mt-2 ms-3" />
												</span>
											</td>
										</tr>
									))}
								{functions.length == 0 && (
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
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => backToDashboard()}
						>
							Back
						</button>
					</div>
					<div className="col-md-6">
						{/* <Link href={"/redirect-page?src=/manage-function&dest=addpc"}> 
					<a className="btn btn-secondary btn-lg btn-block float-right mt-5">Add Function</a>
				</Link> */}
					</div>
				</div>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletefuncn} />
			)}
			<div className="justify-content-center">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					containerClassName={'pagination'}
					itemClass="page-item"
					linkClass="page-link"
					subContainerClassName={'pages pagination'}
					activeClassName={'active'}
				/>
			</div>
		</div>
	);
};
export default ManageFunction;
