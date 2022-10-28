import React, { useState, useEffect,useContext } from 'react';
import dynamic from 'next/dynamic';
import { red } from 'tailwindcss/colors';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import checkPinCode from '../../Services/ApiEndPoints';
import Translation from '@/Translation';
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

const Pincode = (props) => {
	const {t}=props;
	const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);

	const [ hasPin, setHasPin ] = useState(false);

	useEffect(
		() => {
			var uid = null;
			if (!router.isReady) return;

			var p_unique_key = router.query.p_unique_key;
			if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != ''){
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'/api/forgot-pin/' + contextState.uid, 'GET')
					.then((result) => {
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
   res=<div className='border p-3  poppins-light-18px text-center'>{t('Something went wrong please try again later')}</div>
  :
  res=<div className='container border'>
  <div className='row'>
     <h1 className='p-3  poppins-medium-22px text-center'> {t('Email Sent')}</h1>
      </div>
  <div className='row p-3  poppins-light-18px text-center'>
     {t('You will recieve an email to the registered email.')}
  </div>
  <div className='row p-3  poppins-light-18px text-center'>
     {t('Please use the link to reset your pincode.')}
  </div>
  <div className='row p-3  poppins-light-18px text-center'>
     {t('It will be expired in 30 minutes.')}
  </div>
</div>;
	return (
       res 
    );
};

export default React.memo(Translation(Pincode,['Something went wrong please try again later','Email Sent','You will recieve an email to the registered email.','Please use the link to reset your pincode.','It will be expired in 30 minutes.']));
