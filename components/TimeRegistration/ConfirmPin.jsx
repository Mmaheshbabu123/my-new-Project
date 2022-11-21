import React, { useState,useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { FaEye,FaEyeSlash } from "react-icons/fa";
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
	const [ otp, setOTP ] = useState(0);
	const [ otp1, setOTP1 ] = useState(0);
	const [ err, setErr ] = useState('');
	const [ err1, setErr1 ] = useState('');
	const [ eyeicon,setEyeicon]=useState(FaEyeSlash);
	const [ eyeicon1,setEyeicon1]=useState(FaEyeSlash);
	const [ load, setLoad ] = useState(false);
	const [ hide,setHide ] = useState(true);
	const [ hide1,setHide1 ] = useState(true);

	useEffect(
		() => {
			if (!router.isReady) return;

			const { id = 0 } = router.query;
			var p_unique_key = router.query.p_unique_key;
			
				// if (id != 0) {
				// 	APICALL.service(
				// 		process.env.NEXT_PUBLIC_APP_BACKEND_URL+'/api/resetpincode/' + id,
				// 		'GET'
				// 	)
				// 	.then((result) => {
				// 			if (result) {
				// 				setHasPin(true);
				// 			}
				// 		})
				// 		.catch((error) => {
				// 			console.error(error);
				// 		});
				// } else {
				//     var userid=null;

					if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != '') 
					 {
						APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'/api/hasPincode/' + contextState.uid, 'GET')
						.then((result) => {
							if (result != 999) {
								setHasPin(true);
							}else{
								setLoad(true);
							}
						})
						.catch((error) => {
							console.error(error);
						});
			// 	}
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
			setErr('Please enter the Pincode.');
			e++;
		} else if (V < 6) {
			setErr('Please fill up all the cells.');
		} else {
			setErr('');
		}

		if (V1 == 0 || V1 == undefined) {
			setErr1('Please enter the confirm pincode.');
			e++;
		} else if (V1 < 6) {
			setErr1('Please fill up all the cells.');
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
		if (validate(otp, otp1)&&load||validate(otp, otp1)&&hasPin) {
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'/api/pincodegeneration/' + contextState.uid + '?pincode=' + otp1, 'GET')
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

	//to hide and show the pincode1.
	const hideShow=(e)=>{
		e.preventDefault();
		//setting the hide value of pin one.
		setHide(!hide);
		//chnaging the icon
		(hide)?setEyeicon(FaEye):setEyeicon(FaEyeSlash);
	}

	//to hide and show the pincode2.
	const hideShow1=(e)=>{
		e.preventDefault();
	//setting the hide value of pin two.
		setHide1(!hide1);
		//chnaging the icon
		(hide1)?setEyeicon1(FaEye):setEyeicon1(FaEyeSlash);
	}


	var display;

	var fields=<form onSubmit={(e)=>Submit(e)} style={{ alignItems: 'center' }}>
	<div className='min_height_pincode'>
	<div className="row">
		{/* <div className="col-4" /> */}
		<div className="mt-2 col-md-5 m-auto">
			<div>
				<label className='poppins-regular-18 mb-2'>Pincode</label>
			</div>
			<div className='d-flex'>
			<OTPInput
				value={otp}
				inputClassName={hide?"otp":""}
				onChange={setOTP}
				autoFocus
				inputStyles={(isMobile)?{width:'30px',height:'30px'}:{width:'60px',height:'60px'}}
				OTPLength={6}
				otpType="number"
				// disabled={false}
				// secure={hide}
			/>
			<button style={{ border:'none'}} onClick={hideShow} className='bg-white color-skyblue'>
					{eyeicon}
			</button> 
			</div>
			<p style={{ color: 'red' }} className="mt-2">
				{err}
			</p>
		</div>
	</div>
	<div className="row mt-3">
		{/* <div className="col-4" /> */}
		<div className="mt-2 col-md-5 m-auto">
			<div>
				<label className='poppins-regular-18 mb-2'>{t('Confirm pincode')}</label>
			</div>
			<div className='d-flex'>
			{/* <div> */}
			<OTPInput
				value={otp1}
				inputClassName={hide1?"otp":""}
				onChange={setOTP1}
				inputStyles={(isMobile)?{width:'30px',height:'30px'}:{width:'60px',height:'60px'}}
				OTPLength={6}
				otpType="number"
				// disabled={false}
				// secure={hide1}
			/>
			<button style={{ border:'none'}} onClick={hideShow1} className='bg-white color-skyblue'>
					{eyeicon1}
			</button> 
			</div>
			{/* {/* </div> */}
			<p style={{ color: 'red' }} className="mt-2">
				{err1}
			</p>
		</div>
	</div>
	</div>
	<div className="row mt-5">
		<div className='col-md-12'>
		<input
			type="button"
			className="btn rounded-0 shadow-none border-0 px-0 poppins-light-18px text-uppercase text-decoration-underline"
			value="Back"
			onClick={() => router.push('/pincode/options')}
			// style={{ width: '5%', marginLeft: '45%' }}
		/>
	
		
		<input
			type="submit"
			className="btn btn-secondary poppins-medium-18px-save-button rounded-0 shadow-none border-0 float-end"
			value="Submit"
			// onClick={(e)=>Submit(e)}
		/>
		</div>
	</div>
</form>;
	(contextState.uid!='')?
	(display=fields):
	(hasPin?
		(display=fields):
	(display=<div>
			{t('Link is expired please try again later.')}
		</div>));
		return (display);
};

export default React.memo(Translation(Pincode,['Confirm pincode','Link is expired please try again later.']));
