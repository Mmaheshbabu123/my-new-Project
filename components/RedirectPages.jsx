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
		// if (props.hasOwnProperty('src')) {
		// 	localStorage.setItem('src', JSON.stringify(props.src));
		// }
		// if (props.hasOwnProperty('type')) {
		// 	localStorage.setItem('type', JSON.stringify(props.type));
		// }
		if (JSON.parse(localStorage.getItem("dest")) == null) {
			localStorage.setItem("dest", JSON.stringify(props.dest));
			switch (props.dest) {
				case 'addpc':
					router.push('/addpc/' + unique_key);
					break;
					case 'manage-category':
					router.push('/manage-category');
					break;
					case "planning":
					// localStorage.removeItem('dest');
					router.push('/planning/options');
					break;
				default:
					window.location.assign(process.env.NEXT_PUBLIC_APP_BACKEND_URL);
					break;
			}
		} else {
			if(JSON.parse(localStorage.getItem("dest")) == "planning"){
				localStorage.removeItem('dest');
				window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL+'dashboard?access=employeer&check_logged_in=1');

			}else{
			window.location.assign(process.env.NEXT_PUBLIC_APP_URL_DRUPAL);
			}
		}
	}, [props]);
};

export default RedirectPages;
