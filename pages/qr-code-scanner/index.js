import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react';

const Qrscan = () => {

	const [userid,setUserid]=useState(0);
	const [resp,setResp]=useState('Scan the QR code here');

	useEffect(() => {
		if (localStorage.getItem('uid') != null) {
			setUserid(JSON.parse(localStorage.getItem('uid')));
		} 
		else {
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
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
					console.log(userid+'->'+decoded.company_id+'->'+decoded.location_id);
					APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getPlanningActual?id='+userid+'&companyid='+decoded.company_id+'&locationid='+decoded.location_id, 'GET')
					.then((res) => {
						if(res!=null||res!=undefined){
						setResp(res);
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