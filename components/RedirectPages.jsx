import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { Uniquekey } from '../Services/GenetateUniqueKey';

const RedirectPages = (props) => {
	const router = useRouter();
	const unique_key = Uniquekey.generate_unique_key();
	useEffect(() => {
		// if (JSON.parse(localStorage.getItem('src'))) {
		// 	var src = JSON.parse(localStorage.getItem('src'));
		// 	window.localStorage.removeItem('src');
		// 	window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL + src + '&check_logged_in=1');
		// }
		if (props.hasOwnProperty('src')) {
			localStorage.setItem('src', JSON.stringify(props.src));
		}
		if (props.hasOwnProperty('type')) {
			localStorage.setItem('type', JSON.stringify(props.type));
		}
		if (props.hasOwnProperty('uid')) {
			localStorage.setItem('uid', JSON.stringify(props.uid));
		}
		if (props.hasOwnProperty('dest')) {
			localStorage.setItem('dest', JSON.stringify(props.dest));
			switch (props.dest) {
				case 'addpc':
					router.push('/addpc/' + unique_key);
					break;
				case 'manage-category':
					router.push('/manage-category');
					break;
				case 'my-planning':
					router.push('/employee-planning');
					break;
				case 'manage-project':
					router.push('/planning/manage-project');
					break;
				case 'planning':
					router.push('/planning/options');
					break;
				case 'pincode':
					router.push('/pincode/Loading');
					break;
				default:
					router.push('/');
					break;
			}
		} else {
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
		}
	}, []);
};

export default RedirectPages;
