import React, { useState, useEffect } from 'react';
import { ExitToApp } from 'node_modules/@material-ui/icons/index';
import { APICALL } from '../Services/ApiServices';


const TranslationFunction = (input) => {
  const [hydration, setHydration] = useState(false);
  useEffect(() => { setHydration(true) }, [hydration])
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER && hydration) {
    let lang = localStorage['servername_' + 'lang'] !== undefined ? localStorage['servername_' + 'lang'] : 'en';
    let translations = localStorage['servername_' + 'translations'] !== undefined ? JSON.parse(localStorage['servername_' + 'translations']) : {};
    if (translations[lang] !== undefined) {
      return translations[lang][input] !== undefined ? translations[lang][input] : input;
    } else {
      return input;
    }
  } else {
    return input;
  }
}

const Translation = (Component, stringList) => {
  const TranslatedComponent = () => {
  const [hydration, setHydration] = useState(0);


  useEffect(() => {
    const  asyncFunc = async ()=>{
      await getTranslationData();
      setHydration(1);
    }
      const getTranslationData = async () => {
        //let url = process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/translate';
        let url = process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/api/get_translations';
        let lang = localStorage['servername_' + 'lang'] !== undefined ? localStorage['servername_' + 'lang'] : 'en';
        await APICALL.service(url, 'POST', { lang: lang, string_list: stringList })
          .then((result) => {
            if (result['status'] == 200) {
              if (localStorage['servername_' + 'translations'] === undefined) {
                localStorage.setItem('servername_' + 'translations', '{}');
              }
              let translations = JSON.parse(localStorage['servername_' + 'translations']);
              if (translations[lang] !== undefined) {
                translations[lang] = { ...translations[lang], ...result['data'] };
              } else {
                translations[lang] = result['data'];
              }
              localStorage.setItem('servername_' + 'translations', JSON.stringify(translations));
            }
          })
      };
      if (stringList.length > 0) {
       // getTranslationData();
       // setHydration(1);
         asyncFunc();
      }
       
    }, []);
    
   
    const t = (input) =>{
      if (hydration === 1) {
        let lang = localStorage['servername_' + 'lang'] !== undefined ? localStorage['servername_' + 'lang'] : 'en';
        let translations = localStorage['servername_' + 'translations'] !== undefined ? JSON.parse(localStorage['servername_' + 'translations']) : {};
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
