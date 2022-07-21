import React,{useContext,useState,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { personsData } from '../ContactPersonsFields';
import styles from '../Contactperson.module.css';
import BasicDetails from './BasicDetails';
import {defaultFileds} from '../ContactPersonsFields';
const ContactPersonTabs = (props) => {
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_3 } = state;

  const [contactstate,setState] = useState({
    id:1,
      loaded:false,
  })
  const handleSelect  = (selectId)=> {
    setState({
      ...contactstate,
       id:selectId,
    })
    tab_3['selected_person_id'] = selectId;
    updateStateChanges({tab_3});
  }
const addDefaultValuestoPersons = (personObj) => {
  let tempObj ={};
 Object.keys(personObj).map((key)=>{
   tempObj[key] ={'25':1,'30':1,'31':2,'32':2,'38':2,'39':2};
 })
 return tempObj;
}
useEffect(()=>{
const personObj = addDefaultValuestoPersons({1:{},2:{},loaded:true});
personObj.loaded = true;

  tab_3 = {...{1:{},2:{},loaded:true},...tab_3 }
  updateStateChanges({tab_3});
  setState({
    ...contactstate,
    loaded:true,
  })
},[])
const LoadTabs = () => {
  let tabsData = [];
  personsData.map(data=>{
  tabsData.push(
    <React.Fragment>
       <div className={styles["contactperson-tab-parent"]}onClick={(e)=>handleSelect(data.id)} >
         <div className={styles["contactperson-tab-field-content"]}>
             <a className={styles["anchor-tag"]}>
               {/*<Image src={iconPath} alt={data.name} loading="lazy"  width="85%" height="75%"  />*/}
               <div title={data.name} className = {styles["tile-title-text"]} > {data.name} </div>
             </a>
         </div>
       </div>
    </React.Fragment>
  )
})
return tabsData;
}

  return (
    <div className =''>
    {/*LoadTabs()*/}
    {/*(tab_3.loaded === true) &&*/}
       { <BasicDetails  personId = {contactstate.id} />}
    </div>
  )
}

export default React.memo(ContactPersonTabs);
