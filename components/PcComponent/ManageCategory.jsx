import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategory, updateCategory } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import { APICALL } from '../../Services/ApiServices';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Popup from './Popupcategory';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import Pagination from './Pagination';
import Translation from '@/Translation';
const ManageCategoryComponent = (props) => {
	const{t}=props;
	const [ categories, setCategories ] = useState([]);
	const [ categoriesTemp, setCategoriesTemp ] = useState([]);
	const [ categoriestemp2, setCategoriestemp2 ] = useState([]);
	const [ itemsPerPage, setItemsPerPage ] = useState(8);
	const [ search, setSearch ] = useState(false);

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
		setSearch(true);
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
		setSearch(false);
		setCategories(categoriesTemp);
		setSearchPc('');
		setSearchcat('');
		setSearchSal('');
	}

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
				<div className='minimun_height'>
				<div className="row m-0">
					<p className="pt-3 pb-3 font-weight-bold  bitter-italic-normal-medium-24 h4 p-0 position-sticky-pc mb-0">
						{t('Manage categories')}
					</p>
				<div className='col-md-12 manage_category_sticky_position pb-3'>
				<div className='row'>
					<div className='col-md-9'>
						<div className='row'>
						<div className="col-md-4 ps-0 field_height">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
							placeholder={t("PC number")}
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
						/>
					</div>

					<div className="col-md-4 field_height">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
							placeholder={t("Category Name")}
							value={searchCat}
							onChange={(e) => setSearchcat(e.target.value)}
						/>
					</div>

					<div className="col-md-4 field_height">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
							placeholder={t("Minimum salary")}
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
						/>
					</div>
						</div>
					</div>

					<div className="col-md-3 field_height pe-0 ">
					<div className='row'>
						<div className='col-md-6'>
						<button
							type="button"
							className="btn  btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right skyblue-bg-color py-2 px-4 w-100 shadow-none text-uppercase"
							onClick={() => handleSearch()}
						>
							{t('Search')}
						</button>
						</div>
						<div className='col-md-6'>
						{(searchPc.trim() != '' ||
							searchCat.trim() != '' ||
							searchSal.trim() != '' ||
							search === true) && (
							<button
								type="button"
								className="btn  btn-block float-right mt-2 mb-2 rounded-0 float-right py-2 px-4 w-100 shadow-none reset_skyblue"
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
							<thead className='manage_category_table'>
								<tr className="btn-bg-gray-medium table-sticky-bg-gray">
									<th className="poppins-medium-18px btn-bg-gray-medium hi-50 p-2 ps-4">
										{t('Paritair comite number')}
									</th>
									<th className="poppins-medium-18px btn-bg-gray-medium hi-50 p-2">{t('Category name')}</th>
									<th className="poppins-medium-18px btn-bg-gray-medium hi-50 p-2">{t('Minimum salary')}</th>
									<th className="poppins-medium-18px   btn-bg-gray-medium hi-50 p-2">{t('Action')}</th>
								</tr>
							</thead>
							<tbody className="">
								{categoriestemp2.length > 0 &&
									categoriestemp2.map((result) => (
										<tr className="border poppins-regular-18px p-2" key={result.cat_id}>
											<td className="poppins-regular-18px p-2 ps-4">{result.pc_number}</td>
											<td className="poppins-regular-18px p-2">{result.category_name}</td>
											<td className="poppins-regular-18px p-2">€ {result.min_salary}</td>
											<td className=" p-2">
												<Link
													href={'/editpc/' + result.pc_unique_key + '?cid=' + result.cat_id}
													className=""
												>
													<a>
														<MdEdit
															className="color-skyblue "
															data-toggle="tooltip"
															title="Edit category"
														/>
													</a>
												</Link>

												<span onClick={() => showPopup(result.cat_id)} type="button">
													<MdDelete
														className=" ms-3 color-skyblue delete_button"
														data-toggle="tooltip"
														title="Delete category"
													/>
												</span>
											</td>
										</tr>
									))}
								{categories.length == 0 && (
									<tr>
										<td colSpan={4} className="text-center poppins-regular-18px no-records">
											{t('No records')}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				<div className="row my-2">
					{categories.length > itemsPerPage && (
						<Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount}/>
						// <ReactPaginate
						// 	breakLabel="..."
						// 	nextLabel={itemOffset>0?<AiOutlineArrowRight />:<AiOutlineArrowRight />}
						// 	onPageChange={handlePageClick}
						// 	pageRangeDisplayed={5}
						// 	pageCount={pageCount}
						// 	previousLabel={itemOffset>0?<AiOutlineArrowLeft />:<AiOutlineArrowLeft />}
						// 	renderOnZeroPageCount={null}
						// 	containerClassName={'pagination justify-content-center project-pagination'}
						// 	itemClass="page-item"
						// 	linkClass="page-link"
						// 	subContainerClassName={'pages pagination'}
						// 	activeClassName={'active'}
						// />
					)}
				</div>
				</div>
				<div className="row my-2">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="bg-white border-0 poppins-regular-18px  float-sm-right mt-3 md-5 px-0 text-decoration-underline text-uppercase"
							onClick={() => router.push('/')}
						>
							{t('BACK')}
						</button>
					</div>
					<div className="text-end col-md-6">
					</div>
				</div>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletecat} />
			)}
		</div>
	);
};
export default React.memo(Translation(ManageCategoryComponent,['Manage categories',"PC number","Category Name","Minimum salary",'Search','RESET','Paritair comite number','Category name','Minimum salary','Action','No records','BACK']));
