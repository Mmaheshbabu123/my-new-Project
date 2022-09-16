import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {ReactDOM} from 'react-dom';
import { red } from 'tailwindcss/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { FaEye,FaEyeSlash } from "react-icons/fa";
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
	const [ hasPin, setHasPin ] = useState(false);
	const [ uid, setUid ] = useState('');
	const [ otp, setOTP ] = useState('');
	const [ otp1, setOTP1 ] = useState('');
	const [ err, setErr ] = useState('');
	const [ err1, setErr1 ] = useState('');
	const [ eyeicon,setEyeicon]=useState(FaEye);
	const [ eyeicon1,setEyeicon1]=useState(FaEye);
	const [ load, setLoad ] = useState(false);
	const [ hide,setHide ] = useState(false);
	const [ hide1,setHide1 ] = useState(false);

	useEffect(
		() => {
			if (!router.isReady) return;

			const { id = 0 } = router.query;
			
			var p_unique_key = router.query.p_unique_key;
			
				if (id != 0) {
					APICALL.service(
						process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/resetpincode/' + id,
						'GET'
					)
					.then((result) => {
							if (result) {
								setHasPin(true);
								setUid(result);
							}
						})
						.catch((error) => {
							console.error(error);
						});
				} else {
				    var userid=null;

					if (localStorage.getItem('uid') != null) {
						userid = JSON.parse(localStorage.getItem('uid'));
					} else {
						window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
					}

					if (userid != undefined && userid != null) {
					APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/hasPincode/' + userid, 'GET')
						.then((result) => {
							if (result != 999) {
								setLoad(true);
							}
						   	setUid(userid);
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}
		},
		[ router.query ]
	);

	useEffect(() => {
		console.log(window);
	}, []);

	const validate = (value, value1) => {
		var V = value.length;
		var V1 = value1.length;
        var e=0;
		if (V == 0 || V == undefined) {
			setErr('Please enter the pin');
			e++;
		} else if (V < 6) {
			setErr('The pin need to 6 digits length');
		} else {
			setErr('');
		}

		if (V1 == 0 || V1 == undefined) {
			setErr1('Please enter the pin');
			e++;
		} else if (V1 < 6) {
			setErr1('The pin need to 6 digits length');
		} else {
			setErr1('');
		}

		if ((err == '' && err1 == ''&&e==0) || err1 == 'Pincodes are not matching'&&e==0) {
			if (value != value1) {
				setErr1('Pincodes are not matching');
			} else {
				return true;
			}
		}
		return false;
	};

	const Submit = (event) => {
		event.preventDefault();
		
		if (validate(otp, otp1)&&!(load)||validate(otp, otp1)&&hasPin) {
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/pincodegeneration/' + uid + '?pincode=' + otp1, 'GET')
				.then((result) => {
					
					if (result == 200) {
						window.location.replace(homeScreen);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	const hideShow=()=>{
		setHide(!hide);
		(eyeicon==FaEyeSlash)?setEyeicon(FaEye):setEyeicon(FaEyeSlash);
	}

	const hideShow1=()=>{
		setHide1(!hide1);
		(eyeicon1==FaEyeSlash)?setEyeicon1(FaEye):setEyeicon1(FaEyeSlash);
	}
	var display;
	var veye=eyeicon;
	var veye1=eyeicon1;
	var fields=<form onSubmit={Submit} style={{ alignItems: 'center' }}>
	<div className="row mt-5">
		<div className="col-4" />
		<div className="mt-2 col-5">
			<div>
				<label>Pincode</label>
			</div>
			<OTPInput
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
				secure={hide}
			/>
			<button onClick={hideShow}>SH</button>
			<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
				{err}
			</p>
		</div>
	</div>
	<div className="row mt-5">
		<div className="col-4" />
		<div className="mt-2 col-5">
			<div>
				<label>Confirm pincode</label>
			</div>
			{/* <div> */}
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
				secure={hide}
			/>
			<button style={{ border:'none'}} onClick={hideShow1} className='bg-white'>
					<veye/>
			</button> 
			{/* {/* </div> */}
			<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
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
</form>;
	(uid!='')?
	(display=fields):
	(hasPin?
		(display=fields):
	(display=<div>
			Link is expired please try again later.
		</div>));
		return (display);
};

export default Pincode;
