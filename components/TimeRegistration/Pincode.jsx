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
	const [ otp, setOTP ] = useState('');
	const [ err, setErr ] = useState('');
	const [uid, Setuid]= useState(null);
	const [ response,SetResponse]=useState('');
	const [ load, setLoad ] = useState(false);
	const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;

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
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/hasPincode/' + uid, 'GET')
					.then((result) => {
						if (result != 999) {
							setHasPin(true);
							Setuid(uid);
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

	const validate = (value) => {
		var valuelength = value.length;
		if (valuelength == 0 || valuelength == undefined) {
			setErr('Please enter the pin');
		} else if (valuelength < 6) {
			setErr('The pin need to 6 digits length');
		} else {
			setErr('');
		}
		if (err == '') {
			return true;
		}
		return false;
	};

	const gneratePin = () => {
		router.push('/pincode/generatepincod/Gpin');
	};

	const goHomescreen=()=>{
		window.location.replace(homeScreen);
	}

	const forgotPassword = () => {
		router.push('/pincode/generatepincod/Gpin');
	};

	const Submit = (event) => {
		event.preventDefault();
		validate(otp) ? 
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL+'api/planing-by-pincode/' + uid+'?pincode='+otp, 'GET')
					.then((result) => {
						if (result==5) {
							SetResponse('Pincode is not valid');
						}else if(result==2){
							//planning started.
							SetResponse('Planning has been started.');
						}else if(result==3){
							//planning ended.
							SetResponse('Planning has been ended.');
						}else if(result==4){
							SetResponse('There is no plannings for the day.');
						}else{
							SetResponse('Something went wrong please try again later');
						}
					})
					.catch((error) => {
						console.error(error);
					})
		: '';
	};
	var Result = '';
	hasPin
		? (Result = (
				<form onSubmit={Submit} style={{ alignItems: 'center' }}>
					<div className="row mt-5">
						<div className="col-4" />
						<div className="col-5">
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
								secure
							/>
							<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
								{err}
							</p>
							<p style={{ color: 'red', marginLeft: '5px' }} className="mt-2">
								{response}
							</p>
							<div>
								<button
									style={{ border: 'none', background: 'white', color: 'blue' }}
									onClick={forgotPassword}
								>
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
			))
		: (Result = (
				<div
					className="modal"
					id="myModal"
					tabIndex="-1"
					style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
				>
					<div className="modal-dialog modal-lg ">
						<div className="modal-content  ">
							<div className="modal-header">
								<p className="modal-title h4">Generate pincode</p>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									onClick={() => props.pincodepopupActionNo()}
								/>
							</div>

							<div className="modal-body ">
								<div>
									<div className="row mt-3 mx-auto">
										<h3>We have noticed that you haven&apos;t generted your pincode yet.</h3>
									</div>
									<div className="row mt-3 mx-auto">
										<h4>Do you want generate pincode ?</h4>
									</div>
									<div className="row mt-4 mb-4 mx-auto">
										<div className="col-6">
											<button className="btn btn-secondary" onClick={gneratePin}>
												Yes
											</button>
										</div>
										<div className="col-6">
											<button onClick={goHomescreen} className="btn btn-secondary">No</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			));

	return Result;
};

export default Pincode;
