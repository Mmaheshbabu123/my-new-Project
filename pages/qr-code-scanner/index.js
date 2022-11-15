import React, { useState,useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import PopUp from '@/components/TimeRegistration/PopUpWerkpostfishe';

const Qrscan = () => {

	const [userid,setUserid]=useState(0);
	const [resp,setResp]=useState('Scan the QR code here');
	const { contextState = {} } = useContext(UserAuthContext);

	// For popup stop planning
	const [ show, setShow ] = useState(false);
	const [ popupdata, setPopUpData ] = useState('');

	useEffect(() => {
		if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != '') {
			setUserid(contextState.uid);
		}
	}, []);


	const previewStyle = {
		height: 240,
		width: 320,
	}
	// OPEN/CLOSE POPUP //
	const actionPopup = () => {
		setShow(!show);
	};

	return (
		<div className="container">
			<div className='row pt-5'>
				<div className='col-sm-12'>
				<QrReader
			delay={500}
			style={previewStyle}
            onResult={(result, error) => {
                if (!!result) {
					
                  if(result){
					let a=atob(result.text);
					let decoded=JSON.parse(a);
					let companyid=(decoded.company_id==null)?'':decoded.company_id;
					let locationid=(decoded.location_id==null)?'':decoded.location_id;
					APICALL.service(
						process.env.NEXT_PUBLIC_APP_BACKEND_URL +
							'/api/singed-or-not?id=' +
							contextState.uid +
							'&company=' +
							companyid +
							'&location=' +
							locationid,
						'GET'
					)
						.then((result) => {
							var t = 0;
							if (result.res[0] == 999) {
								result.res[1] !== 999 ? (t = 1) : (t = 0);
								router.push(
									'/v1-document?entityid=' +
										contextState.uid +
										'&entitytype=3&companyid=' +
										companyid +
										'&t=' +
										locationid
								);
							} else if (result.res[1] != 999) {
								setPopUpData(result.res[1]);
								actionPopup();
							} else {
								APICALL.service(
									process.env.NEXT_PUBLIC_APP_BACKEND_URL +
										'/api/getPlanningActual?id=' +
										contextState.uid +
										'&companyid=' +
										companyid +
										'&locationid=' +
										locationid +
										'&pincode=' +
										0,
									'GET'
								)
									.then((res) => {
										if (res != null || res != undefined) {
											setResp(res.res);
											if(res.res=='Planning has been ended.'||res.res=='Planning has been started.'){
											setTimeout(() => {
												router.push('/employee-planning');
											}, 2000);
											}
										}
									})
									.catch((error) => {
										console.error(error);
									});
							}
						})
						.catch((error) => {
							console.error(error);
						})
					// APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/getPlanningActual?id='+contextState.uid+'&companyid='+companyid+'&locationid='+locationid+'&pincode='+0, 'GET')
					// .then((res) => {
					// 	if(res!=null||res!=undefined){
					// 	setResp(res.res);
					// 	if(res.res=='Planning has been ended.'||res.res=='Planning has been started.'){
					// 			//Api to check weather he signed the v1 document or not.
					// 	APICALL.service(
					// 		process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/singed-or-not?id='+contextState.uid+'&company='+companyid,
					// 		'GET'
					// 	)
					// 		.then((result) => {
					// 				if(result==999){
					// 					router.push('/v1-document?entityid='+contextState.uid+'&entitytype=3&companyid='+companyid);
					// 				}else{
					// 					setTimeout(() => {
					// 						router.push('/employee-planning');
					// 					}, 2000);
					// 				}
					// 		})
					// 		.catch((error) => {
					// 			console.error(error);
					// 		})
					// 	}
					// 	}
					// })
					// .catch((error) => {
					// 	console.error(error);
					// });
				  }
                }
      
                if (!!error) {
                  console.info(error);
                }
              }}
            constraints = {{
                facingMode: { exact: "environment" }
              }}
			/>
				</div>
			</div>
			{show && <PopUp display={'block'} popupAction={actionPopup} data={popupdata} />}
			<div className=" pt-2 text-center" style={{color:'red'}}>{resp}</div>
			{/* <div> {decode}</div>		 */}
		</div>
	);
}

export default Qrscan;
