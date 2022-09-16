import Translation from './Translation';
import  Link  from 'next/link';
import { useRouter} from 'next/router';
import React, { useState, useEffect } from 'react';
import { APICALL } from '../Services/ApiServices';

const Sample = (props) =>{
    useState
    let router = useRouter();
    const { t } = props;
    const [state, setState] = useState({'languages': [], 'lang': 'en'});
    
    useEffect(()=>{
      let url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get_languages';
        APICALL.service(url, 'GET')
          .then((result) => {
	   if(result['status'] == 200){
	     setState({"languages": result['data']});  
	   }else{
	     alert('Failed');
	   }
	  })
    }, []);
	const onSelectChange = (e) => {
	  const locale = e.target.value;
          //localStorage.setItem("");
	  //router.push(router.asPath, router.asPath, {locale});
        }
      
	const handleLangChange = (e) =>{
	     localStorage.setItem('lang', e.target.value); 
//	     setState({});
	}
	return <div>
		<select name="languages" id="language-select" onChange={handleLangChange}>

                  {/*router.locales.map((language) => (
                     <option key={language} value={language}>
                       {language}
                     </option>
                  ))*/}
	         {
                   state['languages'].map(key=>{
		   return <option key = {key['code']} value={key['code']}>{key['language']}</option>
		   })
		 }
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
export default Translation(Sample, ['Title', 'Username', 'Password', 'Email', 'EmailPassword'], 'nl');
