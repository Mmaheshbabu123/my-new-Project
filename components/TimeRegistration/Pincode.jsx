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
import { isMobile } from 'react-device-detect';
import PopUp from './PopUpWerkpostfishe';

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
	const { contextState = {} } = useContext(UserAuthContext);

	// For popup stop planning
	const [ show, setShow ] = useState(false);
	const [ popupdata, setPopUpData ] = useState('');
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
	const [ companies, setCompanies ] = useState([]);
	const [ locations, setLocations ] = useState([]);

	//company,location validation
	const [ compay_error, setCompanyError ] = useState(false);
	const [ location_error, setLocationError ] = useState(false);

	//if any paremeters there in the url we can get by it
	const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;

	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;
			//get the user id from the local storage.
			if (contextState.uid) {
				//sending the api to check weather the user have pincode or not.
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/hasPincode/' + contextState.uid, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						} else {
							//if the user already generated the pincode get the options.
							APICALL.service(
								process.env.NEXT_PUBLIC_APP_BACKEND_URL +
									'/api/get-employee-companies/' +
									contextState.uid,
								'GET'
							)
								.then((result) => {
									setCompanies(result.companies); //company options
									if (result.companies != null) {
										if (result.companies.length == 1) {
											setCompany(result.companies[0]);
											// console.log(companies[0].value);
										}
									}
								})
								.catch((error) => {
									console.error(error);
								});
						}
						//setting the user id to the hook.
						setuid(contextState.uid);
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

	// if(isMobile){
	// 	setBoxSize({
	// 		width: '30px',
	// 		height: '30px'
	// 	});
	// }else{
	// 	setBoxSize(
	// 		{
	// 			width: '60px',
	// 			height: '60px'
	// 		}
	// 	);
	// }

	//function to validate the pincode and drop downs.
	const validate = (value) => {
		company == null ? setCompanyError(true) : setCompanyError(false);
		location == null ? setLocationError(true) : setLocationError(false);
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
			if (compay_error == false && location_error == false) {
				return true;
			} else {
				return false;
			}
		}
	};

	//fucntion to call sendmail page.
	const forgotPassword = (e) => {
		e.preventDefault();
		router.push('/pincode/forgotpin/Resetpin');
	};

	// OPEN/CLOSE POPUP //
	const actionPopup = () => {
		setShow(!show);
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

	const getLocations = (companyid) => {
		setLocation(null);
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/get-location-by-company/' + companyid, 'GET')
			.then((result) => {
				if (result.res != null) {
					if (result.res.length == 1) {
						setLocation(result.res[0]);
					} else {
						setLocations(result.res);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	//fucntion to submit.
	const Submit = (event) => {
		event.preventDefault();
		validate(otp)
			? APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL +
						'/api/check-employee-have-plannings?id=' +
						contextState.uid +
						'&companyid=' +
						company.value +
						'&locationid=' +
						location.value+
						'&pincode=' +
						otp,
					'GET'
				)
					.then((result) => {

						if(result.status==201){
							(result.res==-999)?SetResponse('Pincode is invalid.'):'';
							(result.res==-998)?SetResponse('There is no plannings for you'):'';
						}else{
							SetResponse('');
							var t = 0;
						if (result.res[0] == 999) {
							router.push(
								'/v1-document?entityid=' +
									contextState.uid +
									'&entitytype=3&companyid=' +
									company.value +
									'&to=' +
									location.value
							);
						} else if (result.res[1] != 999 && result.res[1]!=-998) {
							setPopUpData(result.res[1]);
							actionPopup();
						} else {
							APICALL.service(
								process.env.NEXT_PUBLIC_APP_BACKEND_URL +
									'/api/getPlanningActual?id=' +
									contextState.uid +
									'&companyid=' +
									company.value +
									'&locationid=' +
									location.value +
									'&pincode=' +
									otp,
								'GET'
							)
								.then((res) => {
									if (res != null || res != undefined) {
										SetResponse(res.res);
									}
								})
								.catch((error) => {
									console.error(error);
								});
						}
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
				{show && <PopUp display={'block'} popupAction={actionPopup} data={popupdata} info={[company.value,location.value]} />}
				<div className="col-md-12">
					<div className="row position-sticky-pincode-verify hide-position-sticky-pincode-verify">
						<div className="col-md-6">
							<label className="mb-2 poppins-regular-18px">Company</label>
							<MultiSelectField
								placeholder={t('--Select---')}
								id={'company'}
								options={companies}
								standards={company}
								handleChange={(obj) => {
									setCompany(obj);
									getLocations(obj.value);
								}}
								isMulti={false}
							/>

							{compay_error && (
								<p style={{ color: 'red' }} className="mt-2">
									This field is required.
								</p>
							)}
						</div>
						<div className="col-md-6">
							<label className="mb-2 poppins-regular-18px">Location</label>
							<MultiSelectField
								placeholder={t('--Select---')}
								id={'location'}
								options={locations}
								standards={location}
								handleChange={(obj) => setLocation(obj)}
								isMulti={false}
							/>

							{location_error && (
								<p style={{ color: 'red' }} className="mt-2">
									This field is required.
								</p>
							)}
						</div>
					</div>
				</div>
				{/* <div className="col-4" /> */}
				<div className="col-sm-7 col-md-5 mx-auto mt-1 current-pincode">
					<div className="d-flex justify-content-center ">
						<OTPInput
							inputClassName={hide ? 'otp border' : 'border otp-visible'}
							className="otp-container "
							value={otp}
							onChange={setOTP}
							inputStyles={(isMobile)?{width:'30px',height:'30px',marginRight:'15px'}:{width:'60px',height:'60px'}}
							OTPLength={6}
							otpType="number"
							//secure
						/>

						<button style={{ border: 'none' }} onClick={hideShow} className="bg-white color-skyblue">
							{eyeicon}
						</button>
					</div>
					<p style={{ color: 'red', marginLeft: '-11px' }} className="mt-2 current-pincode-error">
						{err}
					</p>
					<p style={{ color: 'red' }} className="mt-2">
						{response}
					</p>
					<div className="row mt-3">
						<div className="col-md-12 pe-2">
							<div className='row'>
								<div className='col-md-6 ms-auto reset-pincode'>
								<button
								style={{ border: 'none', background: 'white', color: 'blue' }}
								onClick={(e) => forgotPassword(e)}
								className="forgot_password_pincode float-end pe-0"
							>
								{t('Reset pincode?')}
							</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-1 back-btn-mobile">
					<input
						type="button"
						className="btn rounded-0 shadow-none border-0 px-0 poppins-light-18px text-uppercase text-decoration-underline"
						value="Back"
						onClick={() => router.push('/pincode/options')}
					/>
				</div>
				<div className="col-md-11 back-btn-mobile">
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
