import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategory, updateCategory } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { APICALL } from '../../Services/ApiServices';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Popup from './Popupcategory';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

const ManageCategoryComponent = () => {
	const [ categories, setCategories ] = useState([]);
	const [ categoriesTemp, setCategoriesTemp ] = useState([]);
	const [ categoriestemp2, setCategoriestemp2 ] = useState([]);
	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	const [ updated, setUpdated ] = useState(0);
	const [ searchPc, setSearchPc ] = useState('');
	const [ searchCat, setSearchcat ] = useState('');
	const [ searchSal, setSearchSal ] = useState('');
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ catid, setCatid ] = useState('');
	const router = useRouter();

	// const [ popup, setPopUp ] = useState('false');

	useEffect(
		() => {
			APICALL.service(getCategory, 'GET')
				.then((result) => {
					console.log(result.data);
					setCategories(result.data);
					setCategoriesTemp(result.data);
					setCategoriestemp2(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ updated ]
	);

	// DELETE FUNCTIONALITY //
	const deletecat = async () => {
		var data = {
			id: catid
		};
		APICALL.service(updateCategory, 'POST', data)
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
		setCatid(id);
		setShowdeletepopup(true);
	};

	// SEARCH FUNCTIONALITY //
	function handleSearch() {
		var res = [];

		// CONDITIONS WHEN ALL THREE VALUES ARE GIVEN //

		if (searchPc != '' && searchCat != '' && searchSal != '') {
			categoriesTemp.map((val) => {
				if (
					val['pc_number'].trim().includes(searchPc) &&
					val['category_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()) &&
					val['min_salary'].toLowerCase().includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);

			// CONDITIONS WHEN TWO VALUES ARE GIVEN //
		} else if (searchPc != '' && searchCat != '') {
			categoriesTemp.map((val) => {
				if (
					val['pc_number'].trim().includes(searchPc.trim()) &&
					val['category_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else if (searchCat != '' && searchSal != '') {
			categoriesTemp.map((val) => {
				if (
					val['category_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase()) &&
					val['min_salary'].includes(searchSal.trim())
				) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else if (searchPc != '' && searchSal != '') {
			categoriesTemp.map((val) => {
				if (val['pc_number'].trim().includes(searchPc) && val['min_salary'].includes(searchSal.trim())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);

			//  CONDITION WHEN ONLY ONE VALUES ARE GIVEN //
		} else if (searchPc != '') {
			categoriesTemp.map((val) => {
				if (val['pc_number'].trim().includes(searchPc.trim())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else if (searchCat != '') {
			categoriesTemp.map((val) => {
				if (val['category_name'].trim().toLowerCase().includes(searchCat.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else if (searchSal != '') {
			categoriesTemp.map((val) => {
				if (val['min_salary'].trim().includes(searchSal.trim())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else {
			setCategories(categoriesTemp);
		}
	}
	// RESET FUNCTIONALITY //

	function handleReset() {
		setCategories(categoriesTemp);
		setSearchPc('');
		setSearchcat('');
		setSearchSal('');
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
			setCategoriestemp2(categories.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(categories.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, categories ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % categories.length;
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	return (
		<div className="container-fluid p-0">
			<form>
				<div className="row m-0">
					<p className="mt-3 mb-3 font-weight-bold  bitter-italic-normal-medium-24 h4 p-0">
						Manage categories
					</p>
					<div className="col-md-2 ps-0">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Paritair comite number"
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
						/>
					</div>

					<div className="col-md-2">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 "
							placeholder="Category Name"
							value={searchCat}
							onChange={(e) => setSearchcat(e.target.value)}
						/>
					</div>

					<div className="col-md-2">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Minimum salary"
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
						/>
					</div>

					<div className="col-md-2">
						<button
							type="button"
							className="btn  btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color "
							onClick={() => handleSearch()}
						>
							FILTER
						</button>
						{(searchPc.trim() != '' || searchCat.trim() != '' || searchSal.trim() != '') && (
							<button
								type="button"
								className="btn  btn-block float-right mt-2 mb-2 ms-2 rounded-0 float-right mt-2 mb-2 ms-2 reset-btn"
								onClick={() => handleReset()}
							>
								RESET
							</button>
						)}
					</div>

					<div className="form-check p-0 mt-2 text-center max-height-420">
						<table className="table   mt-3 mb-3 text-center">
							<thead>
								<tr className="btn-bg-gray-medium table-sticky-bg-gray">
									<th className="poppins-regular-18px justify-content-center d-flex align-items-center  btn-bg-gray-medium">
										Paritair comite number
									</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Category name</th>
									<th className="poppins-regular-18px btn-bg-gray-medium">Minimum salary</th>
									<th className="poppins-regular-18px   btn-bg-gray-medium">Action</th>
								</tr>
							</thead>
							<tbody className="">
								{categoriestemp2.length > 0 &&
									categoriestemp2.map((result) => (
										<tr className="border poppinns-regular-thin p-2" key={result.cat_id}>
											<td className="poppinns-regular-thin">{result.pc_number}</td>
											<td className="poppinns-regular-thin">{result.category_name}</td>
											<td className="poppinns-regular-thin">€ {result.min_salary}</td>
											<td className="d-flex justify-content-center">
												<Link
													href={'/editpc/' + result.pc_unique_key + '?cid=' + result.cat_id}
													className=""
												>
													<a>
														<MdEdit className="mt-2 ms-3 color-skyblue " />
													</a>
												</Link>

												<span onClick={() => showPopup(result.cat_id)} type="button">
													<MdDelete className="mt-2 ms-3 color-skyblue " />
												</span>
											</td>
										</tr>
									))}
								{categories.length == 0 && (
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
				<div className="row my-4">
					{categories.length >= itemsPerPage && (
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
				<div className="row my-4">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 md-5"
							onClick={() => backToDashboard()}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						{/* <Link href={"/redirect-page?src=/manage-category&dest=addpc"}>
					<a className="btn btn-secondary btn-lg btn-block float-right mt-5">Add Category</a>
				</Link>  */}
						{/* <button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								router.push('/redirect-page?src=/manage-category&dest=addpc')
							}}
						>
							Add Category
						</button> */}
					</div>
				</div>
				{/* <Link href={"/redirect-page?src=/manage-category&dest=addpc"}>
					<a className="btn btn-secondary btn-lg btn-block float-right mt-5">Add Category</a>
				</Link>
				<Link href={"/redirect-page?src=/manage-category&dest=addpc"}>
					<a className="btn btn-secondary btn-lg btn-block float-right mt-5">Add Category</a>
				</Link> */}
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletecat} />
			)}
		</div>
	);
};
export default ManageCategoryComponent;
