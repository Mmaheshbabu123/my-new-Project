import { APICALL } from '../Services/ApiServices';
import { DataTranslations } from '../Services/ApiEndPoints';

// statics handler

const lookupTranslations = (key, locale, lookup) =>{
  let translations = JSON.parse(localStorage.getItem('translations')) || false;
  //check first if the key exists in the json or not
  //return false so a DB lookup can be done from backend else return the pair of key
  try{
  if(lookup){
    return (translations) ? ((key in translations[locale]) ? true : false) : false;
  }else{
    //if lookup is not required then return the pair value of translations directly
    return (translations) ? translations[locale][key] || false : false;
  }}catch(e){
    // console.error(e);
  }
}

const updateTranslations = (key, translation) =>{
  let translations = JSON.parse(localStorage.getItem('translations')) || false;
  if(translations && translation!=null){
    let target_key = get_target_key(key);
    //updating the JSON object with new value if found in the DB
    try{
    Object.keys(translation).map(lang => {
       translations[lang][target_key] = translation[lang][target_key];
    });
    //set the new JSON in localstorage so everytime its not calling the DB search
    localStorage.setItem('translations', JSON.stringify(translations))
  }catch(e){
    console.error(e);
  }
  }
}

const get_target_key = (key) => {
  return (key.split(' ').join('_').toLowerCase());
}

export const t = (key) => {
  const LanguageState = localStorage.getItem('activeLanguage');
  let locale = LanguageState || 'en' ;

  let target_key = get_target_key(key);

  let translation = lookupTranslations(target_key, locale, true);
  //checking if the localstorage contains target_key or not
  //if not then need to check in DB if the string exists there or not.
  if (!translation){ 
    let postData = {
      "string" : key,
    }
    try {
    APICALL.service(DataTranslations,'POST', postData, 0, 0) // if string not exists, then store that in table
      .then(result => { 
        //set the result in the localstorage JSON
        updateTranslations(target_key, result);
        // translation = lookupTranslations(target_key, locale);
        })
      }catch(e){ 
        console.error(e);
      }
  }else{
    translation = lookupTranslations(target_key, locale);
  }
  //return the translations if exists or else return the development string itself
  return (translation) ? translation : key; 
}

export default {  
  t,
}  
