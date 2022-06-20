import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { APICALL } from '../../Services/ApiServices';
import { getPcOverviewDetails, deletePcdetails } from '../../Services/ApiEndPoints';
import Link from 'next/link';
import styles from '../../styles/Pc.module.css';
import PcCommon from './PcCommon';
import Popup from './Popup';

/**
 * this will project all the partire committee's data.
 * @returns 
 */
const ManagePc = (props) => {
	console.log(props);
	const [ data, setData ] = useState([]); // PC details
	const [ showdeletePopup, setshowdeletePopup ] = useState(false); //To display popup on click on delete icon
	const [ deleteId, setDeleteId ] = useState(''); // pcid to be deleted
	const [ pcUpdated, setPcUpdated] = useState(false);

	useEffect(
		() => {
			getData();
		},
		[props]
	);

	/**
   * used to delete complete paritaire committee data at the backend through the api's.
   * @param {*} $id 
   */

	const deletePc = () => {
		if(pcUpdated == true){
		APICALL.service(deletePcdetails + deleteId, 'GET')
			.then((result) => {
				setshowdeletePopup(false);
				setPcUpdated(true);
			})
			.catch((error) => {
				console.error(error);
			});
		}
	};

	var t = [];

	var lenght = data.length;
	/**
   * used to get the data when we loads the page.
   */
	const getData = () => {
		var url = process.env.REACT_APP_BACKEND_URL;
		if (lenght == 0 || lenght == undefined) {
			APICALL.service(getPcOverviewDetails, 'GET')
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						var d = [];
						console.log(result.paritairecomitee);
						setData(result.paritairecomitee);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const showPopup = (id) => {
		setDeleteId(id);
		setshowdeletePopup(true);
	};

	const closePopup = () => {
		setshowdeletePopup(false);
	};

	return (
		<div className="container">
			<div className="row">
				<p className="row mt-3 ms-5 text-bold h4">Manage Paritaire Comitee</p>
				<div className="col-md-9" />
				<div className="col-md-3">
					<span>
						<Link href={'/redirect-page?src=/manage-pc&dest=addpc'}>
							<a className={'mt-5 ml-2 mb-4 btn float-sm-right' + styles.addprojbtn + styles.btncolor}>
								Add Paritaire Comitee
							</a>
						</Link>
					</span>
				</div>
			</div>

			{data.map((val, key) => (
				<div className="row" key={val.id}>
					<div className="col-md-10">
						{console.log(val)}
						{/* <PcOverview
							pcid={data[val][0]['id']}
							pc_number={data[val][0]['pc_number']}
							page_type={'manage'}
						/> */}
						{/* {data[val][0]['pc_unique_key']} */}
						<PcCommon pcid={val.pc_unique_key} type="managepc" />
					</div>
					<div className="col-md-2">
						<div className="pt-4 my-2 w-50">
							<div className={`d-flex pt-2 text-center ${styles.managepactions} ${styles.sectioncolor}`}>
								<span className="px-2">
									<Link href={'/editpc/' + val.pc_unique_key}>
										<a className="me-2 text-dark h5">
											<MdEdit />
										</a>
									</Link>
								</span>
								<span className="me-2 text-dark h5" onClick={() => showPopup(val.id)} type="button">
									<MdDelete />
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
			{showdeletePopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deletePc} />
			)}
		</div>
	);
};

export default ManagePc;
