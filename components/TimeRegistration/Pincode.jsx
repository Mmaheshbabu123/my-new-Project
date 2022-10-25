import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { homeScreen } from '../../Services/ApiEndPoints';
import checkPinCode from '../../Services/ApiEndPoints';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';
//to make the otp dynamic
const OTPInput = dynamic(
       async () => {
		return await import('otp-input-react');
	},
	{ ssr: false }
);
//to make the resend otp dynamic
const ResendOTP = dynamic(
	async () => {
		return await import('otp-input-react').then((module) => module.ResendOTP);
	},
	{ ssr: false }
);

const Pincode = (props) => {
	//for router
	const {t} =props;
	const router = useRouter();
        const { contextState: { uid: loggedInUserId = 0 } } = useContext(UserAuthContext);

	//get the otp
	const [ otp, setOTP ] = useState(0);
	//to catch the error
	const [ err, setErr ] = useState('');
	//to get the user id
	const [ uid, setuid ] = useState(null);
	//
	const [ response, SetResponse ] = useState('');

	const [ hide, setHide ] = useState(true);

	const [ eyeicon, setEyeicon ] = useState(FaEyeSlash);


	//if any paremeters there in the url we can get by it
	const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;

	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;
			//get the user id from the local storage.
			if (loggedInUserId) {
				userid = Number(loggedInUserId);
				//sending the api to check weather the user have pincode or not.
				
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/hasPincode/' + loggedInUserId, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						}
						//setting the user id to the hook.
						setuid(loggedInUserId);
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
		            router.push('/');
			}
		},
		[ router.query ]
	);

	useEffect(() => {
		console.log(window);
	}, []);

	//function to validate the pincode.
	const validate = (value) => {
		var valuelength = value.length;
		if (valuelength == 0 || valuelength == undefined) {
			setErr('Please enter the pin.');
			SetResponse('');
			return false;
		} else if (valuelength < 6) {
			setErr('Please fill up all the cells.');
			SetResponse('');
			return false;
		} else {
			setErr('');
			return true;
		}
	};

	//fucntion to call sendmail page.
	const forgotPassword = () => {
		router.push('/pincode/forgotpin/Sendmail');
	};

	//to hide and show the pincode1.
	const hideShow = (e) => {
		e.preventDefault();
		//setting the hide value of pin one.
		setHide(!hide);
		//chnaging the icon
		hide ?  setEyeicon(FaEye):setEyeicon(FaEyeSlash);
	};

	const goHome=()=>{
		router.push(homeScreen);
	}

	//fucntion to submit.
	const Submit = (event) => {
		event.preventDefault();
		validate(otp)
			? //posting the pincode to the backend storing.
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/planing-by-pincode/' + uid + '?pincode=' + otp,
					'GET'
				)
					.then((result) => {
						if (result == 5) {
							SetResponse('Pincode is not valid');
						} else if (result == 2) {
							//planning started.
							SetResponse('Planning has been started.');
							router.push(homeScreen);
						} else if (result == 3) {
							//planning ended.
							SetResponse('Planning has been ended.');
							router.push(homeScreen);
						} else if (result == 4) {
							SetResponse('There is no plannings for the day.');
						} else if(result==6){
							SetResponse('No plannings created for you.');
						} else {
							SetResponse('No plannings are there.');
						}
					})
					.catch((error) => {
						console.error(error);
					})
			: '';
	};

	// : (Result = (
	// 		<div
	// 			className="modal"
	// 			id="myModal"
	// 			tabIndex="-1"
	// 			style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
	// 		>
	// 			<div className="modal-dialog modal-lg ">
	// 				<div className="modal-content  ">
	// 					<div className="modal-header">
	// 						<p className="modal-title h4">Generate pincode</p>
	// 						<button
	// 							type="button"
	// 							className="btn-close"
	// 							data-bs-dismiss="modal"
	// 							onClick={() => props.pincodepopupActionNo()}
	// 						/>
	// 					</div>

	// 					{/* <div className="modal-body ">
	// 						<div>
	// 							<div className="row mt-3 mx-auto">
	// 								<h3>We have noticed that you haven't generted your pincode yet.</h3>
	// 							</div>
	// 							<div className="row mt-3 mx-auto">
	// 								<h4>Do you want generate pincode ?</h4>
	// 							</div>
	// 							<div className="row mt-4 mb-4 mx-auto">
	// 								<div className="col-6">
	// 									<button className="btn btn-secondary" onClick={gneratePin}>
	// 										Yes
	// 									</button>
	// 								</div>
	// 								<div className="col-6">
	// 									<button onClick={goHomescreen} className="btn btn-secondary">No</button>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</div> */}
	// 				</div>
	// 			</div>
	// 		</div>

	return (
		<form onSubmit={Submit} style={{ alignItems: 'center' }}>
			<div className="row minheight-verifypin">
				{/* <div className="col-4" /> */}
				<div className="col-5 mx-auto mt-5">
					<div className="d-flex">
						
                           <OTPInput
						   inputClassName={hide?"otp":""}
						   className="otp-container"
						    value={otp}
							onChange={setOTP}
							inputStyles={{
								width: '60px',
								height: '60px'
							}}
							OTPLength={6}
							otpType="number"
							//secure
							
						/>
						
						<button style={{ border: 'none' }} onClick={hideShow} className="bg-white color-skyblue">
							{eyeicon}
						</button>
					</div>
					<p style={{ color: 'red'}} className="mt-2">
						{err}
					</p>
					<p style={{ color: 'red'}} className="mt-2">
						{response}
					</p>
					<div className='row mt-3'>
					<div className='col-md-11 pe-2'>
					<button style={{ border: 'none', background: 'white', color: 'blue' }} onClick={forgotPassword} className='forgot_password_pincode float-end pe-0'>
							{t('Reset pincode?')}
						</button>
					</div>
					</div>
				</div>
			</div>
			<div className="row">
			<div className='col-md-1'>
		<input
			type="submit"
			className="btn btn-secondary poppins-medium-18px-save-button rounded-0 shadow-none border-0 float-end"
			value="Back"
			onClick={()=>router.push('/pincode/options')}
		/>
		</div>
					<div className='col-md-11'>
					<input
					type="submit"
					className="btn poppins-medium-18px-next-button shadow-none rounded-0 float-end"
					value={t("Submit")}
					style={{  }}
				/>
					</div>
			</div>
		</form>
	);
};

export default React.memo(Translation(Pincode,['Reset pincode?',"Submit"]));
