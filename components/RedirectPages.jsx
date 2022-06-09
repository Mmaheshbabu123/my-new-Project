import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { Uniquekey } from '../Services/GenetateUniqueKey';

const RedirectPages = (props) => {
	const router = useRouter();
    const unique_key = Uniquekey.generate_unique_key();
	useEffect(
		() => {
			console.log('props');
			console.log(props);
			if (props.hasOwnProperty('src')) {
				localStorage.setItem("src", JSON.stringify(props.src+"&check_logged_in=1"));
			}
			if (props.hasOwnProperty('dest')) {
				switch (props.dest) {
					case 'addpc':
						router.push('/addpc/'+unique_key);
						break;
					default:
						router.push('/');
						break;
				}
			}else{
				window.location.assign(process.env.NEXT_PUBLIC_APP_BACKEND_URL)
            }
		},
		[ props ]
	);
};

export default RedirectPages;
