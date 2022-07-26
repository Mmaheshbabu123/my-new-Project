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
	const [ itemsPerPage, setItemsPerPage ] = useState(10);

	useEffect(() => {
		APICALL.service(getPcOverviewDetails, 'GET')
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					setData(result.paritairecomitee);
					setTemp(result.paritairecomitee);
					setTemp2(result.paritairecomitee);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function handleReset() {
		setData(temp);
		setSearchPcnum('');
		setSearchPcname('');
	}

	let handleSearch = () => {
		var res = [];
		if (searchPcnum != '' && searchPcname != '') {
			temp.map((val) => {
				if (
					val['pc_alias_name'] != null &&
					val['pc_number'].trim().includes(searchPcnum) &&
					val['pc_alias_name'].trim().toLowerCase().includes(searchPcname.toLowerCase())
				) {
					res.push(val);
				} else if (
					val['pc_alias_name'] == null &&
					val['pc_name'] != null &&
					val['pc_number'].trim().includes(searchPcnum) &&
					val['pc_name'].trim().toLowerCase().includes(searchPcname.toLowerCase())
				) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		} else if (searchPcnum != '') {
			temp.map((val) => {
				if (val['pc_number'].trim().includes(searchPcnum)) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		} else if (searchPcname != '') {
			temp.map((val) => {
				if (
					val['pc_alias_name'] != null &&
					val['pc_alias_name'].trim().toLowerCase().includes(searchPcname.toLowerCase())
				) {
					res.push(val);
				} else if (
					val['pc_alias_name'] == null &&
					val['pc_name'] != null &&
					val['pc_name'].trim().toLowerCase().includes(searchPcname.toLowerCase())
				) {
					res.push(val);
				}
			});
			setData(res);
			setItemOffset(0);
		}
	};

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
		setItemOffset(newOffset);
	};
	//------------------- Pagination code -------------------------//

	return (
		<div className="container">
			<div className="row ps-3 ms-3">
				<p className="row mt-3 ms-5 text-bold h4">Manage paritair comite</p>
				<div className="col-md-9">
					<div className="row">
						<div className="col-sm-3">
							<input
								type="search"
								id="form12"
								className="form-control mt-2 mb-2"
								placeholder="Paritair comite number"
								value={searchPcnum}
								onChange={(e) => setSearchPcnum(e.target.value)}
							/>
						</div>

						<div className="col-sm-3">
							<input
								type="search"
								id="form12"
								className="form-control mt-2 mb-2 "
								placeholder="Paritair comite name"
								value={searchPcname}
								onChange={(e) => setSearchPcname(e.target.value)}
							/>
						</div>

						<div className="col-sm-1">
							<button
								type="button"
								className="btn btn-secondary btn-block float-right mt-2 mb-2 "
								onClick={() => handleSearch()}
							>
								Search
							</button>
						</div>
						<div className="col-sm-1">
							{(searchPcnum != '' || searchPcname != '') && (
								<button
									type="button"
									className="btn btn-secondary btn-block float-right mt-2 mb-2 ms-2"
									onClick={() => handleReset()}
								>
									Reset
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<span>
						<Link href={'/redirect-page?src=/manage-pc&dest=addpc'}>
							<a className={'ml-2 btn float-sm-right' + styles.addprojbtn + styles.btncolor}>
								Add paritair comite
							</a>
						</Link>
					</span>
				</div>
			</div>
			{temp2.map((val, key) => (
				<div className="row my-2 pt-2" key={key}>
					<div className={`col-md-10 d-flex`}>
						<span className={`py-2 ${styles.pcid} fw-bold`}>{key + 1}.</span>

						<div className={`row py-2 ms-4  ps-4 w-100 ${styles.sectioncolor}`}>
							<div className="col-md-2 py-2 ps- 4 fw-bold"> {val.pc_number}</div>
							<div className="col-md-9 py-2 fw-bold">
								{' '}
								{val.pc_alias_name ? val.pc_alias_name : val.pc_name}
							</div>
						</div>
					</div>
					<div className="col-md-2 pe-5 ps-3 ">
						<div className={`text-center ${styles.sectioncolor} mx-4 p-3`}>
							<span className="pe-2">
								<Link href={'/editpc/' + val.pc_unique_key}>
									<a className="text-dark h5">
										<MdEdit />
									</a>
								</Link>
							</span>
							<span className="py-2">
								<Link href={'/viewpc/' + val.pc_unique_key}>
									<a className="text-dark h5">
										<MdRemoveRedEye />
									</a>
								</Link>
							</span>
						</div>
					</div>
				</div>
			))}
			{data.length == 0 && (
				<div className="bg-light py-3 mt-3">
					<div className="text-center"> No paritair comitee </div>
				</div>
			)}
			{data.length >= itemsPerPage && (
				<div className="row">
					<ReactPaginate
						breakLabel="..."
						nextLabel={<AiOutlineArrowRight />}
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel={<AiOutlineArrowLeft />}
						renderOnZeroPageCount={null}
						containerClassName={'pagination justify-content-center'}
						itemClass="page-item"
						linkClass="page-link"
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				</div>
			)}
			<div className="row">
				<div className="col-md-6">
					<button
						type="button"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							window.location.assign(
								process.env.NEXT_PUBLIC_APP_URL_DRUPAL +
									'dashboard?access=administrator&check_logged_in=1'
							);
						}}
					>
						Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default ManagePc;
