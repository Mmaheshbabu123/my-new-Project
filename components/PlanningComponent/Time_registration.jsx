import React, { Component, useState,useContext } from 'react';
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
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
		
			
function TimeRegistration(props) {
	const {t}=props;
	const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);
	const { entitytype, entityid } = router.query;
	
	//POPUP FOR QR CODE.
	const [showQR, setShowQR] = useState(false);
	
	// SHOW pincodePOPUP //
	const pinCode = () => {
		router.push('/pincode/planning/Verifypin');
	};

	const qrCode=()=>{
		router.push('/timeregistration');
	}

	const stopPlanning=()=>{
		router.push('/stop-planning-employeer?entityid='+contextState.uid);
	}
	
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
									<Image src="/images/PrintQRcode.svg" layout="fill" className="dasboard_image " onClick={qrCode} ></Image>

								</a>

							</Link>

						</div>
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={qrCode}>{t('QR code')}</a>
						</div>
					</div>

				{contextState.role=='employeer'&&
					<div className="col  bg-light mb-2 me-3 p-4 time-registartion-height">
						<div className="p-2 position_relative_dashboard">
							<Link href='' className="m-2">
								<a type="button">
									<Image src="/images/Addemployee.svg" layout="fill" className="dasboard_image " onClick={stopPlanning}></Image>

								</a>

							</Link>

						</div>
						
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={stopPlanning}> employer </a>
						</div>
					</div>
					
				}
					<div className="col  bg-light mb-2 me-3 p-4 time-registartion-height">
						<div className="p-2 position_relative_dashboard">
							<Link href='' className="m-2">
								<a type="button">
									<Image src="/images/Pincode.svg" layout="fill" className="dasboard_image " onClick={pinCode}></Image>

								</a>

							</Link>

						</div>
						
						<div className='text-center '>
							<a type="button" className='mt-1' onClick={pinCode}> pincode </a>
						</div>
					</div>
				</div>
			</form>
			
		</div>

	);
}
export default React.memo(Translation(TimeRegistration,['Time registration','QR code','Employer','pincode']));
