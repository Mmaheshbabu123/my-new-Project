import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { APICALL } from '../../Services/ApiServices';
import { getPcOverviewDetails, deletePcdetails } from '../../Services/ApiEndPoints';
import Link from 'next/link';
import styles from '../../styles/Pc.module.css';
import PcCommon from './PcCommon';
import Popup from './Popup';
import ReactPaginate from 'react-paginate';

/**
 * this will project all the partire committee's data.
 * @returns 
 */

const ManagePc = (props) => {
	const [ data, setData ] = useState([]);
	const [ temp, setTemp ] = useState([]);
	const [ temp2, setTemp2 ] = useState([]);

	const [ searchPcnum, setSearchPcnum ] = useState('');
	const [ searchPcname, setSearchPcname ] = useState('');
	const [ itemsPerPage, setItemsPerPage ] = useState(8);
	const [ count, setCount ] = useState(0);
	const [ search, setSearch ] = useState(false);
	const [loading,setLoading] = useState(true)


	useEffect(() => {
		APICALL.service(getPcOverviewDetails, 'GET')
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					setData(result.paritairecomitee);
					setTemp(result.paritairecomitee);
					setTemp2(result.paritairecomitee);
					setLoading(false)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let handleSearch = () => {
		setSearch(true);
		var res = [];
		if (searchPcnum != '' && searchPcname != '') {
			temp.map((val) => {
				if (
					val['pc_alias_name'] != null &&
					val['pc_number'].trim().includes(searchPcnum.trim()) &&
					val['pc_alias_name'].trim().toLowerCase().includes(searchPcname.trim().toLowerCase())
				) {
					res.push(val);
				} else if (
					val['pc_alias_name'] == null &&
					val['pc_name'] != null &&
					val['pc_number'].trim().includes(searchPcnum.trim()) &&
					val['pc_name'].trim().toLowerCase().includes(searchPcname.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		} else if (searchPcnum != '') {
			temp.map((val) => {
				if (val['pc_number'].trim().includes(searchPcnum.trim())) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		} else if (searchPcname != '') {
			temp.map((val) => {
				if (
					val['pc_alias_name'] != null &&
					val['pc_alias_name'].trim().toLowerCase().includes(searchPcname.trim().toLowerCase())
				) {
					res.push(val);
				} else if (
					val['pc_alias_name'] == null &&
					val['pc_name'] != null &&
					val['pc_name'].trim().toLowerCase().includes(searchPcname.trim().toLowerCase())
				) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		}
	};
	function handleReset() {
		setData(temp);
		setSearchPcnum('');
		setSearchPcname('');
		setSearch(false);
	}

	//------------------- Pagination code -------------------------//
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);

	useEffect(
		() => {
			const endOffset = itemOffset + itemsPerPage;
			setTemp2(data.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(data.length / itemsPerPage));
		},
		[ itemOffset, itemsPerPage, data ]
	);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setCount(newOffset);
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	return (
		<div className="container-fluid p-0">
			{loading == true?<p>Loading...</p>:
		<div>
			<div className="row m-0">
				{/* <h1 className="mt-3 mb-3 font-weight-bold   px-0  bitter-italic-normal-medium-24 hover-white">Manage paritair comite</h1> */}
				<h1 className="mt-3 mb-3 font-weight-bold   px-0  bitter-italic-normal-medium-24">
					Manage paritair comite
				</h1>
				<div className="col-md-12 p-0">
					<span className="btn my-2 skyblue-bg-color border-0 poppins-regular-24px px-5 rounded-0  btn-block float-end mt-2 mb-2 ms-2 d-flex align-items-center add-pln">
						<Link className="hover-white" href={'/redirect-page?src=/manage-pc&dest=addpc'}>
							<span
								className={
									'ml-2 poppins-regular-18x float-sm-right color-white py-2 font-l hover-white' +
									styles.addprojbtn +
									styles.btncolor
								}
							>
								+ ADD PARITAIR COMMITE
							</span>
						</Link>
					</span>
				</div>
				<div className="col-md-12 row m-0 p-0">
					<div className="col-md-3 ps-0">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
							placeholder="Paritair comite number"
							value={searchPcnum}
							onChange={(e) => setSearchPcnum(e.target.value)}
						/>
					</div>

					<div className="col-md-3">
						<input
							type="search"
							id="form12"
							className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 "
							placeholder="Paritair comite name"
							value={searchPcname}
							onChange={(e) => setSearchPcname(e.target.value)}
						/>
					</div>

					<div className="col-md-1">
						<button
							type="button"
							className="btn w-100 btn-block float-right mt-2 mb-2 border-0 poppins-regular-18px rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color font-l"
							onClick={() => handleSearch()}
						>
							FILTER
						</button>
					</div>
					<div className="col-md-1">
						{(searchPcnum != '' || searchPcname != '' || search === true) && (
							<button
								type="button"
								className="btn w-100 btn-block float-right mt-2 mb-2 ms-2 poppins-regular-18px  border-0 rounded-0 float-right mt-2 mb-2 ms-2 reset-btn font-l hover-white"
								onClick={() => handleReset()}
							>
								RESET
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="row my-2 pt-2 m-0">
					<div className={`col-md-10 d-flex`}>
						<div className={`row py-2   ps-4 w-100 poppins-regular-16px ${styles.sectioncolor}`}>
							<div className="col-md-1 align-items-center d-flex poppins-regular-16px">
								<span className={`py-2 poppins-regular-16px ${styles.pcid} fw-bold`}>Serial number.</span>
							</div>

							<div className="row col-md-10 poppins-regular-16px">
								<div className="col-md-2 py-2 ps- 4 fw-bold align-items-center d-flex poppins-regular-16px">
									PC number
								</div>
								<div className="col-md-9 py-2 fw-bold align-items-center d-flex poppins-regular-16px">
									PC name
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2  ps-3 pe-0 ">
						<div className={`text-center ${styles.sectioncolor}  p-3 pe-0`}>
							Actions
						</div>
					</div>
				</div>
			{temp2.map((val, key) => (
				<div className="row my-2 pt-2 m-0" key={key}>
					<div className={`col-md-10 d-flex`}>
						<div className={`row py-2   ps-4 w-100 poppins-regular-16px ${styles.sectioncolor}`}>
							<div className="col-md-1 align-items-center d-flex poppins-regular-16px">
								<span className={`py-2 poppins-regular-16px ${styles.pcid} fw-bold`}>{count+key+1}.</span>
							</div>

							<div className="row col-md-10 poppins-regular-16px">
								<div className="col-md-2 py-2 ps- 4 fw-bold align-items-center d-flex poppins-regular-16px">
									{val.pc_number}
								</div>
								<div className="col-md-9 py-2 fw-bold align-items-center d-flex poppins-regular-16px">
									{val.pc_alias_name ? val.pc_alias_name : val.pc_name}
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2  ps-3 pe-0 ">
						<div className={`text-center ${styles.sectioncolor}  p-3 pe-0`}>
							<span className="pe-2">
								<Link href={'/editpc/' + val.pc_unique_key}>
									<a className="text-dark h5">
										<MdEdit
											className="mx-2 color-skyblue "
											data-toggle="tooltip"
											title="Edit paritair comite"
										/>
									</a>
								</Link>
							</span>
							<span className="py-2">
								<Link href={'/viewpc/' + val.pc_unique_key}>
									<a className="text-dark h5">
										<MdRemoveRedEye
											className="mx-2 color-skyblue"
											data-toggle="tooltip"
											title="View paritair comite"
										/>
									</a>
								</Link>
							</span>
						</div>
					</div>
				</div>
			))}
			{data.length == 0 && (
				<div className="bg-light py-3 mt-3">
					<div className="text-center poppins-regular-16px"> No paritair comitee </div>
				</div>
			)}
			{data.length > itemsPerPage && (
				<div className="row">
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
			<div className="row m-0 my-4">
				<div className="col-md-6 p-0">
					<button
						type="button"
						className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px"
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
			</div>
		</div>
}
		</div>
	);
};

export default ManagePc;
