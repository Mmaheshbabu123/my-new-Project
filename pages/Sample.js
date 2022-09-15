import Translation from './Translation';
import  Link  from 'next/link';
import { useRouter} from 'next/router';
import React, { useState, useEffect } from 'react';
const Sample = (props) =>{
    let router = useRouter();
    const { t } = props;
	console.log(router.locales);
    console.log(router.locale)
	
	const onSelectChange = (e) => {
        const locale = e.target.value;
		router.push(router.asPath, router.asPath, {
            locale
        })
    }
    
	return <div>
		<select name="languages" id="language-select" onChange={onSelectChange}>
            {router.locales.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
		 	  <ul>
		        <li>{t('Title')}</li>
				<li>{t('Username')}</li>
		        <li>{t('Password')}</li>
		        <li>{t('Email')}</li>
		        <li>{t('EmailPassword')}</li>
		 </ul>		 
		 </div>
}
export default Translation(Sample, ['Title', 'Username', 'Password', 'Email', 'EmailPassword'], 'nl-NL');
