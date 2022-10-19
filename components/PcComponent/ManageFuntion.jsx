import React, { useState, useEffect } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { getFunctions, deleteFunction } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Popup from './Popupfunction';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';

import Link from 'next/link';
import Translation from '@/Translation';
const ManageFunction = (props) => {
	const{t}=props;
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
				<div className='minimun_height'>
					<div className="row">
					<p className="pt-3 pb-3 font-weight-bold  bitter-italic-normal-medium-24 h4 p-0 position-sticky-pc mb-0">
						{t('Manage functions')}
					</p>
				<div className='col-md-12 manage_category_sticky_position pb-3'>
					<div className='row'>
					<div className='col-md-9 ps-0'>
						<div className='row'>
						<div className="col-md-3 field_height">
						<input
							type="search"
							id="form12"
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
							placeholder={t("PC number")}
						/>
					</div>

					<div className="col-md-3 field_height">
						<input
							type="search"
							id="form12"
							value={searchFunc}
							onChange={(e) => setSearchFunc(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
							placeholder={t("Function Name")}
						/>
					</div>

					<div className="col-md-3 field_height">
						<input
							type="search"
							id="form12"
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
							placeholder={t("Minimum salary")}
						/>
					</div>
					<div className="col-md-3 field_height">
						<input
							type="search"
							id="form12"
							value={searchCat}
							onChange={(e) => setSearchCat(e.target.value)}
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
							placeholder={t("Category name")}
						/>
					</div>
						</div>
					</div>

					<div className='col-md-3 pe-0'>
						<div className='row'>
						<div className="col-md-6 field_height">
						<button
							type="button"
							className="btn  btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right py-2 px-4 skyblue-bg-color w-100 shadow-none text-uppercase"
							onClick={() => handleSearch()}
						>
							{t('search')}
						</button>
						</div>
						<div className="col-md-6 field_height">
						{(searchPc.trim() != '' ||
							searchFunc.trim() != '' ||
							searchCat.trim() != '' ||
							searchSal.trim() != '' ||
							search === true) && (
							<button
								type="button"
								className="btn  btn-block float-right mt-2 mb-2 rounded-0 float-right py-2 px-4 reset_skyblue w-100 shadow-none"
								onClick={() => handleReset()}
							>
								{t('RESET')}
							</button>
						)}
					</div>
						</div>
					</div>
					</div>
				</div>

					<div className="form-check p-0">
						<table className="table mb-3">
							<thead className='manage_category_table manage_fun_table'>
								<tr className="btn-bg-gray-medium table-sticky-bg-gray h-50-mf">
									<th className="poppins-medium-18px btn-bg-gray-medium p-2 ps-4">
										PC number
									</th>
									<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Function name')}</th>
									<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Minimum salary')}</th>
									<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Category')}</th>
									<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Action')}</th>
								</tr>
							</thead>
							<tbody>
								{functionsTemp2.length > 0 &&
									functionsTemp2.map((result) => (
										<tr className="border poppins-regular-18px p-2" key={result.funcn_id}>
											<td className="poppins-regular-18px p-2 ps-4">
												{result.pc_number ? result.pc_number : result.pc_num}
											</td>
											<td className="poppins-regular-18px p-2">{result.function_name}</td>
											<td className="poppins-regular-18px p-2">€ {result.min_salary}</td>
											<td className="poppins-regular-18px p-2">{result.cat_name}</td>
											<td className=" p-2 align-middle">
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
															className=" color-skyblue"
															data-toggle="tooltip"
															title="Edit function"
														/>
													</a>
												</Link>
												<span onClick={() => showPopup(result.funcn_id)} type="button">
													<MdDelete
														className=" ms-3 color-skyblue"
														data-toggle="tooltip"
														title="Delete function"
													/>
												</span>
											</td>
										</tr>
									))}
								{functions.length == 0 && (
									<tr>
										<td colSpan={5} className="text-center poppins-regular-18px no-records">
											{t('No records')}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				{functions.length >= itemsPerPage && (
					<div className="row mt-1 mb-2">
						<Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount}/>

						{/* <ReactPaginate
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
						/> */}
					</div>
				)}
				</div>
				<div className="row">
					<div className="text-start col-md-6 mb-2 ps-0">
						<button
							type="button"
							className="bg-white border-0 poppins-regular-18px float-sm-right md-5 px-0 text-decoration-underline"
							onClick={() => backToDashboard()}
						>
							{t('BACK')}
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
export default React.memo(Translation(ManageFunction,['Manage functions',"PC number","Function Name","Minimum salary",
"Category name",'search','RESET','Function name','Minimum salary','Category','Action','No records','BACK']));
