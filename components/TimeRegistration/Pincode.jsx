import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { homeScreen } from '../../Services/ApiEndPoints';
import checkPinCode from '../../Services/ApiEndPoints';

//to make the otp dynamic
const OTPInput = dynamic(
	() => {
		return import('otp-input-react');
	},
	{ ssr: false }
);
//to make the resend otp dynamic
const ResendOTP = dynamic(
	() => {
		return import('otp-input-react').then((module) => module.ResendOTP);
	},
	{ ssr: false }
);

const Pincode = () => {
	//for router
	const router = useRouter();
	//get the otp
	const [ otp, setOTP ] = useState('');
	//to catch the error
	const [ err, setErr ] = useState('');
	//to get the user id
	const [ uid, setuid ] = useState(null);
	//
	const [ response, SetResponse ] = useState('');

	const [ hide, setHide ] = useState(true);

	const [ eyeicon, setEyeicon ] = useState(FaEye);

	//if any paremeters there in the url we can get by it
	const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;

	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;

			//get the user id from the local storage.
			if (localStorage.getItem('uid') != null) {
				userid = JSON.parse(localStorage.getItem('uid'));

				//sending the api to check weather the user have pincode or not.
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/hasPincode/' + userid, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						}
						//setting the user id to the hook.
						setuid(userid);
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
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
			return false;
		} else if (valuelength < 6) {
			setErr('Please fill up all the cells.');
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
		hide ? setEyeicon(FaEyeSlash) : setEyeicon(FaEye);
	};

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
						} else if (result == 3) {
							//planning ended.
							SetResponse('Planning has been ended.');
						} else if (result == 4) {
							SetResponse('There is no plannings for the day.');
						} else if(result==6){
							SetResponse('No plannings created for you.');
						} else {
							SetResponse('Something went wrong please try again later');
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
			<div className="row mt-5">
				<div className="col-4" />
				<div className="col-5">
					<div className="d-flex">
						<OTPInput
							value={otp}
							onChange={setOTP}
							inputStyles={{
								width: '60px',
								height: '60px'
							}}
							OTPLength={6}
							otpType="number"
							disabled={false}
							secure={hide}
						/>
						<button style={{ border: 'none' }} onClick={hideShow} className="bg-white">
							{eyeicon}
						</button>
					</div>
					<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
						{err}
					</p>
					<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
						{response}
					</p>
					<div>
						<button style={{ border: 'none', background: 'white', color: 'blue' }} onClick={forgotPassword}>
							Forgot password?
						</button>
					</div>
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
