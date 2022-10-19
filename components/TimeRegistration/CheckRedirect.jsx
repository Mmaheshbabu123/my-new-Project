import React, { useState, useEffect } from 'react';

import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';



const CheckRedirect = () => {

    const router = useRouter();

	useEffect(
		() => {
			var userid = null;
			if (!router.isReady) return;

			//get the user id from the local storage.
			if (localStorage.getItem('uid') != null) {
				userid = JSON.parse(localStorage.getItem('uid'));

				//sending the api to check weather the user have pincode or not.
				APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/hasPincode/' + userid, 'GET')
					.then((result) => {
						if (result == 999) {
							//if the user don't have the pincode redirecting him to the generate pincode page.
							router.push('/pincode/generate/Pin');
						}else{
                            router.push('/pincode/options');
                        }
						//setting the user id to the hook.
						setuid(userid);
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
		<div>loading.......</div>
	);
};

export default CheckRedirect;
