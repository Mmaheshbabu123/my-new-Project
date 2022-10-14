import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { red } from 'tailwindcss/colors';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import checkPinCode from '../../Services/ApiEndPoints';

const OTPInput = dynamic(
	() => {
		return import('otp-input-react');
	},
	{ ssr: false }
);

const ResendOTP = dynamic(
	() => {
		return import('otp-input-react').then((module) => module.ResendOTP);
	},
	{ ssr: false }
);

const Pincode = () => {
	const router = useRouter();
	const [ hasPin, setHasPin ] = useState(false);

	useEffect(
		() => {
			var uid = null;
			if (!router.isReady) return;

			if (localStorage.getItem('uid') != null) {
				uid = JSON.parse(localStorage.getItem('uid'));
			} else {
				window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
			}
			
			var p_unique_key = router.query.p_unique_key;
			if (uid != undefined && uid != null) {
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/forgot-pin/' + uid, 'GET')
					.then((result) => {
						console.log(true);
						if (result) {
							setHasPin(false);
						}else{
							setHasPin(true);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ router.query ]
	);

	useEffect(() => {
		console.log(window);
	}, []);
var res='';
  hasPin?
   res=<div className='border p-3  poppins-light-18px text-center'>Something went wrong please try again later</div>
  :
  res=<div className='container border'>
  <div className='row'>
     <h1 className='p-3  poppins-medium-22px text-center'> Email Sent</h1>
      </div>
  <div className='row p-3  poppins-light-18px text-center'>
     You will recieve an email to the registered email.
  </div>
  <div className='row p-3  poppins-light-18px text-center'>
     Please use the link to reset your pincode.
  </div>
  <div className='row p-3  poppins-light-18px text-center'>
     It will be expired in 30 minutes.
  </div>
</div>;
	return (
       res 
    );
};

export default Pincode;
