import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import Button from '../core-module/atoms/Button';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { homeScreen } from '../../Services/ApiEndPoints';
import checkPinCode from '../../Services/ApiEndPoints';
import MultiSelectField from '@/atoms/MultiSelectField';
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
	const { t } = props;
	const router = useRouter();
	const { contextState: { uid: loggedInUserId = 0 } } = useContext(UserAuthContext);

	//get the otp
	const [ otp, setOTP ] = useState(0);
	//to catch the error
	const [ err, setErr ] = useState('');
	//to get the user id
	const [ uid, setuid ] = useState(null);
	//api response
	const [ response, SetResponse ] = useState('');
	//password hide/show
	const [ hide, setHide ] = useState(true);
	const [ eyeicon, setEyeicon ] = useState(FaEyeSlash);

	//company and location selected id's
	const [ company, setCompany ] = useState(null);
	const [ location, setLocation ] = useState(null);

	//options of companies and locations
	const [ companies, setCompanies ] = useState(null);
	const [ locations, setLocations ] = useState(null);

	//company,location validation
	const [compay_error,setCompanyError]=useState(false);
	const [location_error,setLocationError]=useState(false);

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
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/hasPincode/' + loggedInUserId, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						} else {
							//if the user already generated the pincode get the options.
							APICALL.service(
								process.env.NEXT_PUBLIC_APP_BACKEND_URL +
									'/api/getCompaniesLocations/' +
									loggedInUserId,
								'GET'
							)
								.then((result) => {
									setCompanies(result.companies);//company options
									setLocations(result.locations);//location options
								})
								.catch((error) => {
									console.error(error);
								});
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

	//function to validate the pincode and drop downs.
	const validate = (value) => {
		var valuelength = value.length;
		(company==null)?setCompanyError(true):setCompanyError(false);
		(location==null)?setLocationError(true):setLocationError(false);
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
		hide ? setEyeicon(FaEye) : setEyeicon(FaEyeSlash);
	};

	const goHome = () => {
		router.push(homeScreen);
	};

	//fucntion to submit.
	const Submit = (event) => {
		event.preventDefault();
		validate(otp)
			? //posting the pincode to the backend storing.
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/getPlanningActual?id='+ uid +'&companyid='+company+'&locationid='+location,
					'GET'
				)
					.then((result) => {
							SetResponse(result.res);
						if(result.res=='Planning has been ended.'||result.res=='Planning has been started.'){
							setTimeout(() => {
								router.push('/employee-planning');
							}, 3000);
						}
					})
					.catch((error) => {
						console.error(error);
					})
			: '';
	};

	return (
		<form onSubmit={Submit} style={{ alignItems: 'center' }}>
			<div className="row minheight-verifypin">
				<div className="row">
					<div className="col-md-6">
						<label style={{ width: '100%' }}>
							Company
							<MultiSelectField
								placeholder={t('--Select---')}
								id={'company'}
								options={companies}
								handleChange={(obj) => setCompany(obj.value)}
								isMulti={false}
							/>
						</label>
						{compay_error&&<p style={{color:'red'}}>This field is required.</p>}
					</div>
					<div className="col-md-6">
						<label style={{ width: '100%' }}>
							Location
							<MultiSelectField
								placeholder={t('--Select---')}
								id={'location'}
								options={locations}
								handleChange={(obj) => setLocation(obj.value)}
								isMulti={false}
							/>
						</label>
						{location_error&&<p style={{color:'red'}}>This field is required.</p>}
					</div>
				</div>
				{/* <div className="col-4" /> */}
				<div className="col-5 mx-auto mt-1">
					<div className="d-flex">
						<OTPInput
							inputClassName={hide ? 'otp' : ''}
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
					<p style={{ color: 'red' }} className="mt-2">
						{err}
					</p>
					<p style={{ color: 'red' }} className="mt-2">
						{response}
					</p>
					<div className="row mt-3">
						<div className="col-md-11 pe-2">
							<button
								style={{ border: 'none', background: 'white', color: 'blue' }}
								onClick={forgotPassword}
								className="forgot_password_pincode float-end pe-0"
							>
								{t('Reset pincode?')}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-1">
					<input
						type="button"
						className="btn rounded-0 shadow-none border-0 px-0 poppins-light-18px text-uppercase text-decoration-underline"
						value="Back"
						onClick={() => router.push('/pincode/options')}
					/>
				</div>
				<div className="col-md-11">
					<input
						type="submit"
						className="btn poppins-medium-18px-next-button shadow-none rounded-0 float-end"
						value={t('Submit')}
						style={{}}
					/>
				</div>
			</div>
		</form>
	);
};

export default React.memo(Translation(Pincode, [ 'Reset pincode?', 'Submit' ]));
