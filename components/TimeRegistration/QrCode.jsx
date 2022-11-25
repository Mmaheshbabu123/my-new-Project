import React, { useState, useEffect, useContext } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getCompnayLocationQrCode } from '../../Services/ApiEndPoints';
import { regenerateQrCode  } from '../../Services/ApiEndPoints';
import checkPinCode from '../../Services/ApiEndPoints';
import MultiSelectField from '@/atoms/MultiSelectField';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';

const QrCodeGeneration = (props) => {
	//for router
	const { t } = props;
	const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);

    const [filepath,setFilePath]=useState('');
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

	const [ fileerr,setFileErr ]=useState(false);
	//company,location validation
	const [ compay_error, setCompanyError ] = useState(false);
	const [ location_error, setLocationError ] = useState(false);

	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;
			//get the user id from the local storage.
			if (contextState.uid) {
				var url='';
				(contextState.role=='employee')?url='get-employee-companies':url='get-companies-by-employer';
				//if the user already generated the pincode get the options.
				APICALL.service(
					process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/'+url+'/' + contextState.uid,
					'GET'
				)
					.then((result) => {
						setCompanies(result.companies); //company options
						if (result.companies != null) {
							if (result.companies.length == 1) {
								setCompany(result.companies[0]);
                                				getLocations(result.companies[0].value);
							}
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[]
	);

	useEffect(() => {
		console.log(window);
	}, []);

	//function to validate the pincode and drop downs.
	const validate = () => {
        
		company == null ? setCompanyError(true) : setCompanyError(false);
		location == null ? setLocationError(true) : setLocationError(false);
		
		if (company == null && location == null|| company==null || location==null) {
			return false;
		} 
        return true;
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
		
		if(validate())
			{ //posting the pincode to the backend storing.
			//getCompnayLocationQrCode}/${company.value}/${location.value
			let postData={
				comp_id:company.value,
				location_id:location.value,
			};
				APICALL.service(`${regenerateQrCode}`, 'POST',postData)
					.then((result) => {
						console.log(result.data);

					let data = result.data || [];
					let qr_code_path=data.filter(val => Number(val.comp_id) === Number(company.value) && Number(val.location_id) === Number(location.value));
					qr_code_path = qr_code_path[0] || {};
					qr_code_path.url = qr_code_path.qr_path || '';
					setFilePath(qr_code_path.url);
					// if (result.status === 200 && result.data !== '') {
						// 	// qrUrl = result.data;
						// 	setFileErr(false);
                        //     setFilePath(result.data);
						// }else{
						// 	setFileErr(true);
						// 	setFilePath('');
						// }
					})
					.catch((error) => {
						console.error(error);
					})
				}
	};

	return (
		<form onSubmit={Submit} style={{ alignItems: 'center' }}>
			<div className="row min-height-view-qr-code">
			
				<div className="col-md-12">
					<div className='row  bitter-italic-normal-medium-24 py-4 position-sticky-pc'> 
					<div className='col-md-12'>
					View QR code
					</div>
					</div>
					<div className="row position-sticky-pincode-verify hide-position-sticky-pincode-verify">
						
						<div className="col-md-5">
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
						<div className="col-md-5">
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
                        <div className='col-md-2'>
                                <button onClick={Submit} className='btn btn-block border-0 rounded-0 float-right skyblue-bg-color w-100 shadow-none text-uppercase' style={{marginTop:'2.3rem'}}>Search</button>
                        </div>
					</div>
				</div>
				{(filepath!='')&&<div className="col-sm-6 col-md-5 mx-auto mt-4">
                    <img src={filepath} />
                    </div>}
				{fileerr&&<h1 style={{color:'red'}}> The company not generated qr-code. </h1>}
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
				</div>
		</form>
	);
};

export default React.memo(Translation(QrCodeGeneration, [ 'Reset pincode?', 'Submit' ]));
