import React, { useState, useEffect, useContext } from 'react';

import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';


const checkDevice = () => {

    const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);
	
    var q=<h1>...loading...........</h1>
	if(isMobile){
        router.push('/qr-code-scanner');
    }else{
        router.push('/timeregistration/qrcode');
    }

	return (
		q
	);
};

export default checkDevice;
