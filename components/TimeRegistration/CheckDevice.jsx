import React, { useState, useEffect, useContext } from 'react';

import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';


const CheckDevice = () => {

    const router = useRouter();

	const { contextState = {} } = useContext(UserAuthContext);
	
    var q=<h1>Loading...........</h1>
	if(isMobile){
        router.push('/qr-code-scanner');
    }else{
        router.push('/timeregistration/qrcode');
    }

	return (
		q
	);
};

export default CheckDevice;
