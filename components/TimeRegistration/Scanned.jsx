import React, { useState,useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import PopUp from '@/components/TimeRegistration/PopUpWerkpostfishe';

const QrscanMessage = () => {

	// const [userid,setUserid]=useState(0);
	const [resp,setResp]=useState('');
	const { contextState = {} } = useContext(UserAuthContext);
	const router = useRouter();
	const [scanned,setScanned]=useState(true);
	// For popup stop planning
	const [ show, setShow ] = useState(false);
	const [ popupdata, setPopUpData ] = useState('');

    const { companyid,locationid  } = router.query;


	const updateResponse=(data)=>{
		setResp(data);
	}

    useEffect(
		() => {
			var uid = null;
			if (!router.isReady) return;
            let  companyId  =companyid;
            let  locationId =locationid;
			checkSignedDocuments(companyId,locationId);
		},
		[ router.query ]
	);

    const checkSignedDocuments=(companyid,locationid)=>{
        APICALL.service(
            process.env.NEXT_PUBLIC_APP_BACKEND_URL +
                '/api/check-employee-have-plannings?id=' +
                contextState.uid +
                '&company=' +
                companyid +
                '&location=' +
                locationid,
            'GET'
        )
            .then(async(result) => {
				if(result.status==201){
					(result.res==-998)?setResp('There is no plannings for you'):'';
				}else{
					setResp('');
                var t = 0;
                if (result.res[0] == 999) {
                    result.res[1] !== 999 ? (t = 1) : (t = 0);
                    router.push(
                        '/v1-document?entityid=' +
                            contextState.uid +
                            '&entitytype=3&companyid=' +
                            companyid +
                            '&to=' +
                            locationid
                    );
                } else if (result.res[1] != 999) {
                    setPopUpData(result.res[1]);
                    actionPopup();
                } else {
                 await startstop(companyid,locationid);
                }
            }
		})
            .catch((error) => {
                console.error(error);
            })
    }
	const startstop=async(companyid,locationid)=>{
		await APICALL.service(
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
					 if(res.res=='Planning has been ended.'||res.res=='Planning has been started.'){
						updateResponse(res.res);
						 setTimeout(() => {
							router.push('/employee-planning');
						}, 2000);
					}
					updateResponse(res.res);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

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
				 <div className='display-4'>{resp}</div>
				</div>
			</div>
			{show && <PopUp display={'block'} popupAction={actionPopup} data={popupdata} />}
			{/* <div className=" pt-2 text-center" style={{color:'red'}}>{resp}</div> */}
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
		</div>
	);
}

export default QrscanMessage;
