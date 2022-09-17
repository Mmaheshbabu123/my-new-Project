import Translation from '@/Translation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { APICALL } from '../Services/ApiServices';
import dynamic from "next/dynamic";
// const Translation = dynamic(() => import('@/Translation'), { ssr: false })

const Sample = (props) => {
	let router = useRouter();
	const { t } = props;
	const [state, setState] = useState({ 'languages': [], 'lang': '' });
	useEffect(() => {
		let url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get_languages';
		APICALL.service(url, 'GET')
			.then((result) => {
				if (result['status'] == 200) {
					setState({ ...state, ...{ 'languages': result['data'], 'lang': localStorage['servername_' + 'lang'] !== undefined ? localStorage['servername_' + 'lang'] : 'en' } });
				} else {
					alert('Failed');
				}
			})
	}, []);

	const handleLangChange = (e) => {
		localStorage.setItem('servername_' + 'lang', e.target.value);
		router.reload();
		setState({ ...state, ...{ lang: e.target.value } });
	}
	console.log(t('Email'));
	return <div>
		<select name="languages" id="language-select" value={state['lang']} onChange={handleLangChange}>
			{
				state['languages'].map(key => {
					return <option key={key['code']} value={key['code']}>{key['language']}</option>
				})
			}
		</select>
		<ul>
			{/*<li>{t('Title')}</li>
		  <li>{t('Username')}</li>
		  <li>{t('Password')}</li>
		  <li>{t('EmailPassword')}</li>
		  <li>{t('Contact')}</li>*/}
			<li>{t('Email')}</li>
		</ul>
	</div>
}

function moviePropsAreEqual(prevValues, nextValues) {
	console.log({ prevValues, nextValues });
	return false;
}
export default React.memo(Translation(Sample, ['Title', 'Username', 'Password', 'Email', 'EmailPassword', 'Contact']), moviePropsAreEqual);
