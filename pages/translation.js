import React, { useState, useEffect } from 'react';
import { APICALL } from '../Services/ApiServices';
import { useRouter } from 'next/router';

const t = (input) =>{
  return input;
}
const translation = (Component, stringList, lang) => {
    const translatedComponent = () => {
        useEffect(() => {
         const getTranslationData = async () => {
         let url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/translate';
          APICALL.service(url, 'POST', {lang:lang, stringList: stringList})
            .then((result) => {
              if(result['status'] == 200){
                if(localStorage.translations === undefined){
                  localStorage.setItem('translations', '{}');
                }
                let translations = JSON.parse(localStorage.translations);
                if(translations[lang] !== undefined){
                  translations[lang] = {...translations[lang], ...result['data']};
                }else{
                  translations[lang] = result['data'];
                }
                localStorage.setItem('translations', JSON.stringify(translations));
              }
            }) 
	      };
        if(stringList.length > 0){
          getTranslationData();
        }
        }, []);
        return <Component t={t}/> 
    };

    return translatedComponent;
};
export default translation;

