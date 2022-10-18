import React, { Component, useState } from 'react';
import { Timeregistration } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { MdQrCode } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import QRCode from './QRcode_popup';
import PincodePopup from './Pincode_popup';
import EmployerPopup from './Employer_popup';
import Link from 'node_modules/next/link';
import Image from "next/image";
import Translation from '@/Translation';
function TimeRegistration(props) {
	const {t}=props;
	const router = useRouter();
	const { entitytype, entityid } = router.query;
	console.log(router.query)
	//POPUP FOR QR CODE.
	const [showQR, setShowQR] = useState(false);
	// CLOSE QRPOPUP
	const closeQRPopup = () => {
		setShowQR(false);
	};
	// SHOW QRPOPUP //
	const showQRPopup = (id) => {
		setShowQR(true);
	};

	//POPUP FOR PINCODE.
	const [showpincode, setShowPincode] = useState(false);
	// CLOSE pincodePOPUP
	const closePincodePopup = () => {
		setShowPincode(false);
	};
	// SHOW pincodePOPUP //
	const showPincodePopup = (id) => {
		router.push('/pincode/Loading');
	};


	const showEmployerStopPlanning = () => {
		window.open(`stop-planning-employeer?entityid=${entityid}`, '_self');
	}
	//POPUP FOR EMPLOYER.
	// const [ showemployer, setShowEmployer ] = useState(false);
	//CLOSE EMPLOYER POPUP
	// const closeEmployerPopup = () => {
	// 	setShowEmployer(false);
	// };
	// SHOW EMPLOYER POPUP //
	// const showEmployerPopup = (id) => {
	// 	setShowEmployer(true);
	// };

	let submit = (event) => {
		event.preventDefault();
	};
	
	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)} >
				<p className="h3 px-0  bitter-italic-normal-medium-24 mt-5">{t('Time registration')}</p>
				<div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3 d-flex justify-content-center mt-5  p-5">
					<div className="col  bg-light mb-2 me-3 p-4 time-registartion-height ">
						<div className="p-2 position_relative_dashboard ">
							<Link href='' className="m-2" >
								<a type="button" >
									<Image src="/images/PrintQRcode.svg" layout="fill" className="dasboard_image " onClick={showQRPopup} ></Image>

								</a>

							</Link>

						</div>
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={showQRPopup}>{t('QR code')}</a>
						</div>
					</div>

					<div className="col  bg-light mb-2 me-3 p-4 time-registartion-height">
						<div className="p-2 position_relative_dashboard">
							<Link href='' className="m-2">
								<a type="button">
									<Image src="/images/Addemployee.svg" layout="fill" className="dasboard_image " onClick={showEmployerStopPlanning}></Image>

								</a>

							</Link>

						</div>
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={showEmployerStopPlanning}>{t('Employer')}</a>
						</div>
					</div>

					<div className="col  bg-light mb-2 me-3 p-4 time-registartion-height">
						<div className="p-2 position_relative_dashboard">
							<Link href='' className="m-2">
								<a type="button">
									<Image src="/images/Pincode.svg" layout="fill" className="dasboard_image " onClick={showPincodePopup}></Image>

								</a>

							</Link>

						</div>
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={showPincodePopup}> {t('pincode')} </a>
						</div>
					</div>
				</div>
			</form>
			{showQR == true && (
				<div className="">
					<QRCode display={'block'} popupActionNo={closeQRPopup} popupActionYes={showQRPopup} />
					{/* <PinCode display={'block'} popupActionNo={closePincodePopup} popupActionYes={showPincodePopup} /> */}
				</div>
			)}

			{showpincode == true && (
				<PincodePopup
					display={'block'}
					pincodepopupActionNo={closePincodePopup}
					pincodepopupActionYes={showPincodePopup}
				/>
			)}

			{/* {showemployer == true && (
				<EmployerPopup
					display={'block'}
					employerpopupActionNo={closeEmployerPopup}
					employerpopupActionYes={showEmployerPopup}
				/>
			)} */}
		</div>

	);
}
export default React.memo(Translation(TimeRegistration,['Time registration','QR code','Employer','pincode']));
