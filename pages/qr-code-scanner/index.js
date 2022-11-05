import React, { useState,useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';

const Qrscan = () => {

	const [userid,setUserid]=useState(0);
	const [resp,setResp]=useState('Scan the QR code here');
	const { contextState = {} } = useContext(UserAuthContext);

	useEffect(() => {
		if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != '') {
			setUserid(contextState.uid);
		}
	}, []);


	const previewStyle = {
		height: 240,
		width: 320,
	}
	
	return (
		<div className="container">
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
					APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/getPlanningActual?id='+contextState.uid+'&companyid='+companyid+'&locationid='+locationid, 'GET')
					.then((res) => {
						if(res!=null||res!=undefined){
						setResp(res.res);
						if(res.res=='Planning has been ended.'||res.res=='Planning has been started.'){
								//Api to check weather he signed the v1 document or not.
						APICALL.service(
							process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/singed-or-not?id='+contextState.uid+'&company='+companyid,
							'GET'
						)
							.then((result) => {
									if(result==999){
										router.push('/v1-document?entityid='+contextState.uid+'&entitytype=3&companyid='+companyid);
									}else{
										setTimeout(() => {
											router.push('/employee-planning');
										}, 2000);
									}
							})
							.catch((error) => {
								console.error(error);
							})
						}
						}
					})
					.catch((error) => {
						console.error(error);
					});
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
			<div className="" style={{color:'red'}}>{resp}</div>
			{/* <div> {decode}</div>		 */}
		</div>
	);
}

export default Qrscan;
