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

function TimeRegistration(props) {
	const router = useRouter();
	//POPUP FOR QR CODE.
	const [ showQR, setShowQR ] = useState(false);
	// CLOSE QRPOPUP
	const closeQRPopup = () => {
		setShowQR(false);
	};
	// SHOW QRPOPUP //
	const showQRPopup = (id) => {
		setShowQR(true);
	};

	//POPUP FOR PINCODE.
	const [ showpincode, setShowPincode ] = useState(false);
	// CLOSE pincodePOPUP
	const closePincodePopup = () => {
		setShowPincode(false);
	};
	// SHOW pincodePOPUP //
	const showPincodePopup = (id) => {
		router.push('/pincode/Loading');
	};

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
		<div className="container   ">
			<form onSubmit={(e) => submit(e)}>
				<div className="row text-center">
					<div className="">
						<p className="h2">Time Registration</p>
					</div>
					<div className=" col-sm-6 ">
						<span className="text-center">
							<button className="btn btn-large">
								<MdQrCode className="m-auto" onClick={showQRPopup} />
							</button>
						</span>
						<p className="h3 mt-3">QR code</p>
					</div>
					<div className="col-sm-6 ">
						<button className="btn btn-large">
							<FaLaptopCode className=" m-auto " onClick={showPincodePopup} />
						</button>
						<p className="h3 mt-3">Pin code</p>
					</div>
					{/* <div className="col">
						<button className="btn btn-large">
							<BsPersonFill className="w-100 h-20 m-auto" onClick={showEmployerPopup} />
						</button>
						<p className="h3  mt-3">Employer</p>
					</div> */}
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
export default TimeRegistration;
