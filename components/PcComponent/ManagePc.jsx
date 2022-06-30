import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { APICALL } from '../../Services/ApiServices';
import { getPcOverviewDetails, deletePcdetails } from '../../Services/ApiEndPoints';
import Link from 'next/link';
import styles from '../../styles/Pc.module.css';
import PcCommon from './PcCommon';
import Popup from './Popup';
import { data } from 'node_modules/autoprefixer/lib/autoprefixer';

/**
 * this will project all the partire committee's data.
 * @returns 
 */

const ManagePc = (props) => {
	console.log(props);

	return (
		<div className="container">
			<div className="row">
				<p className="row mt-3 ms-5 text-bold h4">Manage Paritaire Comitee</p>
				<div className="col-md-9" />
				<div className="col-md-3">
					<span>
						<Link href={'/redirect-page?src=/manage-pc&dest=addpc'}>
							<a className={'ml-2 btn float-sm-right' + styles.addprojbtn + styles.btncolor}>
								Add Paritaire Comitee
							</a>
						</Link>
					</span>
				</div>
			</div>
			{props.data.map((val, key) => (
				<div className="row my-2 pt-2" key={key}>
					<div className={`col-md-10 d-flex`}>
						<span className={`py-2 ${styles.pcid} fw-bold`}>{key+1}.</span>
						
						<div className={`row py-2 ms-4  ps-4 w-100 ${styles.sectioncolor}`}>
							<div className="col-md-2 py-2 ps- 4 fw-bold"> {val.pc_number}</div>
							<div className="col-md-9 py-2 fw-bold"> {val.pc_alias_name? val.pc_alias_name:val.pc_name}</div>
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
								<Link href={'/editpc/' + val.pc_unique_key}>
										<a className="text-dark h5">
											<MdRemoveRedEye />
										</a>
									</Link>
								</span>
							</div>
					</div>
				</div>
			))}
			<div className="row">
				<div className="col-md-6">
				<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={()=>{window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL+"dashboard?access=administrator&check_logged_in=1")	 }}
						>
							Back
						</button>
				</div>
			</div>
		</div>
	);
};

export default ManagePc;
