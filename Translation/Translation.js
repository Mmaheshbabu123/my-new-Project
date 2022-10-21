//import { ExitToApp } from 'node_modules/@material-ui/icons/index';
import React, { useState, useEffect } from 'react';
import { APICALL } from '../Services/ApiServices';


const Translation = (Component, stringList) => {
  const TranslatedComponent = () => {
  const [hydration, setHydration] = useState(0);

  useEffect(() => {
    const  asyncFunc = async ()=>{
      await getTranslationData();
      setHydration(1);
    }
    
  const getTranslationData = async () => {
      let url = process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/api/get_translations';
      let lang = localStorage['lang'] !== undefined ? localStorage['lang'] : 'en';
      await APICALL.service(url, 'POST', { lang: lang, string_list: stringList })
        .then((result) => {
          if (result['status'] == 200) {
            if (localStorage['translations'] === undefined) {
              localStorage.setItem('translations', '{}');
            }
            let translations = JSON.parse(localStorage['translations']);
            if (translations[lang] !== undefined) {
              translations[lang] = { ...translations[lang], ...result['data'] };
            } else {
              translations[lang] = result['data'];
            }
            localStorage.setItem('translations', JSON.stringify(translations));
          }
        })
    };
    if (stringList.length > 0) {
       asyncFunc();
    }
    }, []);
    
   
    const t = (input) =>{
      if (hydration === 1) {
        let lang = localStorage['lang'] !== undefined ? localStorage['lang'] : 'en';
        let translations = localStorage['translations'] !== undefined ? JSON.parse(localStorage['translations']) : {};
      if (translations[lang] !== undefined) {
        return translations[lang][input] !== undefined ? translations[lang][input] : input;
      } else {
        return input;
      }
      } else {
        return input;
      }
    }

    return <Component t={t} />
  };

  return TranslatedComponent;
};
export default Translation;
