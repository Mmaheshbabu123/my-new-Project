import React, { useState,useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { red } from 'tailwindcss/colors';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import checkPinCode, { homeScreen } from '../../Services/ApiEndPoints';

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
	const { contextState = {} } = useContext(UserAuthContext);

	const [ hasPin, setHasPin ] = useState(false);
	const [ uid, setUid] = useState(null);
	const [ otp, setOTP ] = useState('');
    const [ otp1, setOTP1 ] = useState('');
	const [ err , setErr ] = useState('');
    const [ err1, setErr1] = useState('');
	const [ load, setLoad ] = useState(false);

	useEffect(
		() => {
			if (!router.isReady) return;


            // if(id!=0){
            //     alert(id);
            // }
			var p_unique_key = router.query.p_unique_key;
			if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != '')
			 {
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/hasPincode/' + contextState.uid, 'GET')
					.then((result) => {
						setUid(contextState.uid);
						if (result != 999) {
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

	const validate = (value,value1) => {
		var V  = value.length;
        var V1 = value1.length;

		if (V == 0 || V == undefined) {
			setErr('Please enter the pin');
		} else if (V < 6) {
			setErr('The pin need to 6 digits length');
		} else {
			setErr('');
		}

        if (V1 == 0 || V1 == undefined) {
			setErr1('Please enter the pin');
		} else if (V1 < 6) {
			setErr1('The pin need to 6 digits length');
		} else {
			setErr1('');
		}

		if (err == '' && err1=='' ||err1=='Pincodes are not matching') 
		{
			if(value!=value1){
                setErr1('Pincodes are not matching');
            }else{
                return true;
            }
		}
		return false;
	};

	const Submit = (event) => {
		event.preventDefault();
		if(validate(otp,otp1)){
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/pincodegeneration/' + uid+'?pincode='+otp1, 'GET')
					.then((result) => {
						if (result == 200) {
							router.push('/pincode/options');
						}
					})
					.catch((error) => {
						console.error(error);
					});
		} 
	};

	return (
		<form onSubmit={Submit} style={{ alignItems: 'center' }}>
			<div className="row mt-5">
				<div className="col-4"></div>
				<div className="mt-2 col-5">
				<div><label>Pincode</label></div>
					<OTPInput
						className="otp"
						value={otp}
						onChange={setOTP}
						autoFocus
						inputStyles={{
							width: '60px',
							height: '60px'
						}}
						OTPLength={6}
						otpType="number"
						disabled={false}
					/>
					<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
						{err}
					</p>
				</div>
            </div>
			<div className="row mt-5">
			<div className="col-4"></div>
                <div className="mt-2 col-5">
				<div><label>Confirm pincode</label></div>
					<OTPInput
						value={otp1}
						onChange={setOTP1}
						autoFocus
						inputStyles={{
							width: '60px',
							height: '60px'
						}}
						OTPLength={6}
						otpType="number"
						disabled={false}
						secure
					/>
					<p style={{ color: 'red', }} className="mt-2">
						{err1}
					</p>
				</div>
			</div>
			<div className="row mt-5">
				<input
					type="submit"
					className="btn btn-secondary"
					value="Submit"
					style={{ width: '5%', marginLeft: '45%' }}
				/>
			</div>
		</form>
	);
};

export default Pincode;
