import React, { useState } from 'react';
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


	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
		if(result){
			setResult(result)
		}
	}

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
					APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/getPlanningActual?id='+contextState.uid+'&companyid='+decoded.company_id+'&locationid='+decoded.location_id, 'GET')
					.then((res) => {
						if(res!=null||res!=undefined){
						setResp(res.res);
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