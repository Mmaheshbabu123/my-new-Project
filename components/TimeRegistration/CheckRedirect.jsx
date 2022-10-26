import React, { useState, useEffect, useContext } from 'react';

import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Translation from '@/Translation';

const CheckRedirect = (props) => {
	const{t} =props;
    const router = useRouter();
	const { contextState = {} } = useContext(UserAuthContext);
	
	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;
			
		
			//get the user id from the local storage.
			if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != '') {
				//sending the api to check weather the user have pincode or not.
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/hasPincode/' + contextState.uid, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						}else{
                            router.push('/pincode/options');
                        }
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
			}
		},
		[ router.query ]
	);

	return (
		<div>{t('loading.......')}</div>
	);
};

export default React.memo(Translation(CheckRedirect,['loading.......']));
