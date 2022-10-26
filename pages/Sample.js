import React, { useState, useEffect } from 'react';
import Translation from '@/Translation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { APICALL } from '../Services/ApiServices';
import dynamic from "next/dynamic";
// const Translation = dynamic(() => import('@/Translation'), { ssr: false })

const Sample = (props) => {
	let router = useRouter();
	const { t } = props;

	const [state, setState] = useState({ 'languages': [], 'lang': '' });
	useEffect(() => {
	  let url = process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/api/get_languages';
	    APICALL.service(url, 'GET')
	      .then((result) => {
	        if (result['status'] == 200) {
		  setState({ ...state, ...{ 'languages': result['data'], 'lang': localStorage['lang'] !== undefined ? localStorage['lang'] : 'en' } });
		} else {
		  alert('Failed');
		}
	    })
	}, []);

	const handleLangChange = (e) => {
	  localStorage.setItem('lang', e.target.value);
	  router.reload();
//		setState({ ...state, ...{ lang: e.target.value } });
	}
	return <div>
		<select name="languages" id="language-select" value={state['lang']} onChange={handleLangChange}>
			{
				state['languages'].map(key => {
					return <option key={key['code']} value={key['code']}>{key['language']}</option>
				})
			}
		</select>
		<ul>
		  <li>{t('Title')}</li>
		  <li>{t('Username')}</li>
		  <li>{t('Password')}</li>
		  <li>{t('EmailPassword')}</li>
		  <li>{t('Contact')}</li>
		  <li>{t('Email')}</li>
		</ul>
	</div>
}

export default Translation(Sample, ['Title', 'Username', 'Password', 'Email', 'EmailPassword', 'Contact']);
