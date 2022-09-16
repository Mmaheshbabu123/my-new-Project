import React, { useState, useEffect } from 'react';
import { APICALL } from '../Services/ApiServices';
import { useRouter } from 'next/router';

const t = (input) =>{
	console.log('input', input);
   const ISSERVER = typeof window === "undefined";
    if(!ISSERVER) {
//	console.log('lang', (localStorage.getItem('servername_'+'lang') || '')); 
      let lang = localStorage['servername_'+'lang'] !== undefined ? localStorage['servername_'+'lang'] : 'en'; 
      let translations = localStorage['servername_'+'translations'] !== undefined ? JSON.parse(localStorage['servername_'+'translations']) : {};
      if(translations[lang] !== undefined){
       return translations[lang][input] !== undefined ? translations[lang][input] : input;
      }else{
       return input;
      }
    }else{
      return input;
    }
}

const Translation = (Component, stringList) => {
    const TranslatedComponent = () => {
        useEffect(() => {
         const getTranslationData = async () => {
         let url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/translate';
         let lang = localStorage['servername_'+'lang'] !== undefined ? localStorage['servername_'+'lang'] : 'en'; 
          APICALL.service(url, 'POST', {lang:lang, stringList: stringList})
            .then((result) => {
              if(result['status'] == 200){
                if(localStorage['servername_'+'translations'] === undefined){
                  localStorage.setItem('servername_'+'translations', '{}');
                }
                let translations = JSON.parse(localStorage['servername_'+'translations']);
                if(translations[lang] !== undefined){
                  translations[lang] = {...translations[lang], ...result['data']};
                }else{
                  translations[lang] = result['data'];
                }
                localStorage.setItem('servername_'+'translations', JSON.stringify(translations));
              }
            }) 
	      };
        if(stringList.length > 0){
		getTranslationData();
        }
        }, []);
        return <Component t={t}/> 
    };

    return TranslatedComponent;
};
export default Translation;

