import React, { Component, useState, useContext } from 'react';
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
import BackLink from '../BackLink';

function TimeRegistration(props) {
	const { t } = props;
	const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);
	const { entitytype, entityid } = router.query;

	//POPUP FOR QR CODE.
	const [showQR, setShowQR] = useState(false);

	// SHOW pincodePOPUP //
	const pinCode = () => {
		router.push('/pincode/planning/Verifypin');
	};

	const qrCode = () => {
		router.push('/timeregistration');
	}

	const stopPlanning = () => {
		router.push('/stop-planning-employeer?entityid=' + contextState.uid);
	}

	let submit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)} >
				<div className='row py-4 position-sticky-pc'>
					<div className='col-md-12 px-0'>
					<p className="bitter-italic-normal-medium-24">{t('Time registration')}</p>
					</div>
				</div>
				<div className="row gx-5 align-items-center d-flex justify-content-center min-height-time-registration-dashboard" >
					
					<div className="col-md-3" onClick={qrCode}>
					<a className='cursor-pointer'>
					<div className="position_relative_time_registration bg-light time-registartion-height d-flex align-items-center justify-content-center" onClick={qrCode}>
						<div >
							<Link href='' className="m-2" >
								<a type="button" className='time-registration-img-div'>
									<Image src="/images/PrintQRcode.svg" layout="fill" className="time_registration_image " onClick={qrCode} ></Image>

								</a>

							</Link>

						</div>
						<div className='text-center time-registration-tile'>
							<a type="button" className='mt-1' onClick={qrCode}>{t('QR code')}</a>
						</div>
					</div>
					</a>
					</div>
					
					{contextState.role == 'employeer' &&
						<div className="col-md-3">
							<a className='cursor-pointer' onClick={stopPlanning}>
							<div className="position_relative_time_registration bg-light time-registartion-height d-flex align-items-center justify-content-center">
							<div >
								<Link href='' className="m-2">
									<a type="button" className='time-registration-img-div'>
										<Image src="/images/Addemployee.svg" layout="fill" className="dasboard_image " onClick={stopPlanning}></Image>
									</a>

								</Link>

							</div>

							<div className='text-center time-registration-tile'>
								<a type="button" className='mt-1' onClick={stopPlanning}>{t('Employer')}</a>
							</div>
								</div>
							</a>
						</div>

					}
					{
					contextState.role != 'employeer'&&
					<div className="col-md-3">
					<a className='cursor-pointer' onClick={pinCode}>
				<div className="position_relative_time_registration bg-light time-registartion-height d-flex align-items-center justify-content-center">
						<div>
							<Link href='' className="m-2">
								<a type="button" className='time-registration-img-div'>
									<Image src="/images/Pincode.svg" layout="fill" className="dasboard_image " onClick={pinCode}></Image>

								</a>

							</Link>

						</div>

						<div className='text-center time-registration-tile'>
							<a type="button" className='mt-1' onClick={pinCode}> {t('Pincode')} </a>
						</div>
						</div>
				</a>
					</div>
					}
				</div>
				<div className='row'>
				<div className="text-start col-md-6 px-0">
					<BackLink path="/"/>
				</div>
				</div>
			</form>

		</div>

	);
}
export default React.memo(Translation(TimeRegistration, ['Time registration', 'QR code', 'Employer', 'pincode']));
