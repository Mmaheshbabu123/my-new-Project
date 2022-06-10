import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { getCategory, updateCategory } from '../../Services/ApiEndPoints';
import { FaTrash, FaPen, FaAngleDown, FaAngleUp, FaEdit, FaRecycle, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

// import { useParams } from "react-router-dom";
import { APICALL } from '../../Services/ApiServices';
import Popup from './Popupcategory';

const ManageCategoryComponent = () => {
	// const urlParam = useParams();
	const [ categories, setCategories ] = useState([]);
	const [ categoriesTemp, setCategoriesTemp ] = useState([]);
	const [ updated, setUpdated ] = useState(0);
	const [ searchPc, setSearchPc ] = useState('');
	const [ searchCat, setSearchcat ] = useState('');
	const [ searchSal, setSearchSal ] = useState('');
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ catid, setCatid ] = useState('');

	// const [ popup, setPopUp ] = useState('false');

	useEffect(
		() => {
			console.log('test');
			console.log(getCategory);
			APICALL.service(getCategory, 'GET')
				.then((result) => {
					console.log(result.data);
					setCategories(result.data);
					setCategoriesTemp(result.data);
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
					val['category_name'].trim().toLowerCase().includes(searchCat.toLowerCase()) &&
					val['min_salary'].toLowerCase().includes(searchSal)
				) {
					res.push(val);
				}
			});
			setCategories(res);

			// CONDITIONS WHEN TWO VALUES ARE GIVEN //
		} else if (searchPc != '' && searchCat != '') {
			categoriesTemp.map((val) => {
				if (
					val['pc_number'].trim().includes(searchPc) &&
					val['category_name'].trim().toLowerCase().includes(searchCat.toLowerCase())
				) {
					res.push(val);
				}
			});
			setCategories(res);
		} else if (searchCat != '' && searchSal != '') {
			categoriesTemp.map((val) => {
				if (
					val['category_name'].trim().toLowerCase().includes(searchCat.toLowerCase()) &&
					val['min_salary'].includes(searchSal)
				) {
					res.push(val);
				}
			});
			setCategories(res);
		} else if (searchPc != '' && searchSal != '') {
			categoriesTemp.map((val) => {
				if (val['pc_number'].trim().includes(searchPc) && val['min_salary'].includes(searchSal)) {
					res.push(val);
				}
			});
			setCategories(res);

			//  CONDITION WHEN ONLY ONE VALUES ARE GIVEN //
		} else if (searchPc != '') {
			categoriesTemp.map((val) => {
				if (val['pc_number'].trim().includes(searchPc)) {
					res.push(val);
				}
			});
			setCategories(res);
		} else if (searchCat != '') {
			categoriesTemp.map((val) => {
				if (val['category_name'].trim().toLowerCase().includes(searchCat.toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
		} else if (searchSal != '') {
			categoriesTemp.map((val) => {
				if (val['min_salary'].includes(searchSal)) {
					res.push(val);
				}
			});
			setCategories(res);
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

	return (
		<div className="container">
			<form>
				<div className="row">
					<p className="mt-4 mb-2 h4">MANAGE CATEGORIES</p>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2"
							placeholder="Paritair comite number"
							value={searchPc}
							onChange={(e) => setSearchPc(e.target.value)}
						/>
					</div>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 "
							placeholder="Category Name"
							value={searchCat}
							onChange={(e) => setSearchcat(e.target.value)}
						/>
					</div>

					<div className="col-sm-2">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2"
							placeholder="Minimum salary"
							value={searchSal}
							onChange={(e) => setSearchSal(e.target.value)}
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
							className="btn btn-secondary   btn-block float-right mt-2 mb-2 "
							onClick={() => handleSearch()}
						>
							Search
						</button>
					</div>

					<div className="form-check mt-2 text-center ">
						<table className="table border border-secondary mt-3">
							<thead>
								<tr className="table-secondary">
									<th className="border-end border-secondary">Paritair Comite Number</th>
									<th className="border-end border-secondary">Category name</th>
									<th className="border-end border-secondary">Minimum Salary</th>
									<th className="border-end border-secondary">Action</th>
								</tr>
							</thead>
							<tbody className="">
								{categories.length > 0 &&
									categories.map((result) => (
										<tr className="border-bottom border-secondary" key={result.cat_id}>
											<td className="border-end border-secondary">{result.pc_number}</td>
											<td className="border-end border-secondary">{result.category_name}</td>
											<td className="border-end border-secondary">€ {result.min_salary}</td>
											<td className="d-flex justify-content-center">
												<Link href="/addpc" className="">
													<a>
														<MdEdit className="mt-2 ms-3 " />
													</a>
												</Link>

												<span onClick={() => showPopup(result.cat_id)} type="button">
													<MdDelete className="mt-2 ms-3 " />
												</span>
											</td>
										</tr>
									))}
								{categories.length == 0 && (
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
				<Link href="/addpc">
					<a className="btn btn-secondary btn-lg btn-block float-right mt-5">Add Category</a>
				</Link>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletecat} />
			)}
		</div>
	);
};
export default ManageCategoryComponent;
