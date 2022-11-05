import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { fetchallproject, fetchallarchivedprojects } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Translation from '@/Translation';
import BackLink from '../BackLink';
function ManageArchivedProject(props) {
	/**
     * Initialise search filter 
     */
	const {t}=props;
	const [ searchArchivedProjectname, setSearchArchivedProjectname ] = useState('');
	const [ searchArchivedlocation, setSearchArchivedlocation ] = useState('');
	const [ searchArchivedaddress, setSearchArchivedaddress ] = useState('');

	/**
	 * Project data assigned variables
	 */
	const [ updated, setUpdated ] = useState(0);
	const [ archivedproject, setArchivedproject ] = useState([]);
	const [ archivedprojectTemp, setArchivedprojectTemp ] = useState([]);
	const [ archivedprojectTemp2, setarchivedprojectTemp2 ] = useState([]);

	/**
	 * Reset button hide and show depending on the search values
	 */
	const [ search, setSearch ] = useState(false);

	/**
	 * Pagination related variables
	 */
	const [ itemsPerPage, setItemsPerPage ] = useState(8);

	/**
	 * Fetch archived project using useEffect
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

	// ------------------------- Search functionality----------------------------//

	function handleSearch() {
		setSearch(true);
		var res = [];
		//-------------------------If all three values are given to filter----------------------//

		if (searchArchivedProjectname != '' && searchArchivedlocation != '' && searchArchivedaddress != '') {
			archivedprojectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
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
			//--------------------If two values are given to filter---------------------//

			archivedprojectTemp.map((val) => {
				if (
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.trim().toLowerCase()) &&
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
					val['project_location'] != undefined &&
					val['project_location'] != '' &&
					val['project_location'] != null &&
					val['project_location']
						.trim()
						.toLowerCase()
						.includes(searchArchivedlocation.trim().toLowerCase()) &&
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
					val['project_name'] != undefined &&
					val['project_name'] != '' &&
					val['project_name'] != null &&
					val['project_name'].trim().toLowerCase().includes(searchArchivedProjectname.trim().toLowerCase()) &&
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
			//------- ----------If single value is given to filter-------------------------//

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

	// ---------------------Search reset------------------- //

	function handleReset() {
		setArchivedproject(archivedprojectTemp);
		setSearch(false);
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
					<div className="form-check p-0">
						{/* ----------------Search functionality--------------------------------*/}

						<div className="row d-flex project_sticky">
							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
									placeholder={t("Project name")}
									value={searchArchivedProjectname}
									onChange={(e) => setSearchArchivedProjectname(e.target.value)}
								/>
							</div>

							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
									placeholder={t("Location")}
									value={searchArchivedlocation}
									onChange={(e) => setSearchArchivedlocation(e.target.value)}
								/>
							</div>

							<div className="col-sm-3 field_height">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 text-break input-border-lightgray poppins-regular-18px mh-50 rounded-0  shadow-none"
									placeholder={t("Address")}
									value={searchArchivedaddress}
									onChange={(e) => setSearchArchivedaddress(e.target.value)}
								/>
							</div>
							<div className="col-sm-3 field_height">
								<div className='row'>
									<div className='col-md-6'>
									<button
									type="button"
									className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 w-100 skyblue-bg-color shadow-none"
									onClick={() => handleSearch()}
								>
									{t('SEARCH')}
								</button>
									</div>
									<div className='col-md-6'>
								{/*---------------- Reset functionality---------------------- */}

								{(searchArchivedProjectname != '' ||
									searchArchivedlocation != '' ||
									searchArchivedaddress != '' ||
									search === true) && (
									<button
										type="button"
										className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_employee_widget w-100 shadow-none"
										onClick={() => handleReset()}
									>
										{t('RESET')}
									</button>
								)}
									</div>
								</div>
								
							</div>
						</div>

						<div className="form-check p-0 mt-2 tab-pane fade show min_height_table project_table_sticky ">
							{/* ---------------------Manage project table-------------------------*/}

							<table className="table mt-3 mb-3">
								<thead>
									<tr className="btn-bg-gray-medium table-sticky-bg-gray">
										<th className="poppins-medium-18px btn-bg-gray-medium p-2 ps-4">
											{t('Project name')}
										</th>
										<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Location')}</th>
										<th className="poppins-medium-18px btn-bg-gray-medium p-2">{t('Address')}</th>
									</tr>
								</thead>
								<tbody>
									{archivedprojectTemp2.length > 0 &&
										archivedprojectTemp2.map((result) => (
											<tr className="border p-2" key={result.id}>
												<td className="poppins-regular-18px p-2 ps-4 line_height_archieved_project">{result.project_name}</td>
												<td className="poppins-regular-18px p-2 line_height_archieved_project">{result.project_location}</td>
												<td className="poppins-regular-18px p-2 line_height_archieved_project">
													{result.address.replace(',', '').length > 7 ? result.address : '-'}
												</td>
											</tr>
										))}

									{/*----------------------------No records found-------------------------- */}
									{archivedproject.length == 0 && (
										<tr>
											<td colSpan={5} className="text-center py-3 poppins-regular-18px border">
												{t('No records')}
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
				{/*---------------Back to dashobard redirection------------------ */}
				<div className="text-start col-md-6">
				<BackLink path={'/'}/>
				</div>
			</form>
		</div>
	);
}
export default React.memo(Translation(ManageArchivedProject,['Address','Location',"Project name","Location","Address",'SEARCH','RESET','Project name','No records']));
