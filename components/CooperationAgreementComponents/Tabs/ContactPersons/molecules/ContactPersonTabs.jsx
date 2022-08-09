import React,{useContext,useState,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { personsData } from '../ContactPersonsFields';
import styles from '../Contactperson.module.css';
import BasicDetails from './BasicDetails';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import {defaultFileds} from '../ContactPersonsFields';
const ContactPersonTabs = (props) => {
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_3 } = state;
let contactOptions = [];
let contactPersons = [];
contactOptions   = state.defaultOptions['contactList']  || [];
contactPersons   = state.defaultOptions['contactsData'] || [];
  const [contactstate,setState] = useState({
    id:1,
    selectedId: 1,
    loaded:false,
  })
  const handleSelect  = (obj)=> {
    setState({
      ...contactstate,
       id:1,
       selectedId:obj.value,
    })

    let personObj =  contactPersons[obj.value];

    tab_3['selected_person_id'] = obj.value;
    emptyFilledDetails(tab_3);
    tab_3 = {...tab_3,...personObj}
    updateStateChanges({tab_3});
  }
const addDefaultValuestoPersons = (personObj) => {
  let tempObj ={};
 Object.keys(personObj).map((key)=>{
   tempObj[key] ={'25':1,'30':1,'31':2,'32':2,'38':2,'39':2};
 })
 return tempObj;
}

const emptyFilledDetails = (tab_3) => {
  let defaultKeys = ['36','27','37','34'];
  defaultKeys.forEach((item)=>{
    tab_3[item] = '' ;
  })
}

const LoadTabs = () => {
  let tabsData = [];
  tabsData.push(
    <div className = 'col-md-6'>
    <LabelField title="Select contact person" customStyle = {{display:''}}/>
    <MultiSelectField
        id={'selected_person_id'}
        options={contactOptions}
        standards={contactOptions.filter(val => val.value == tab_3['selected_person_id'])}
        disabled={false}
        handleChange={(obj) => handleSelect(obj, 'selected_person_id')}
        isMulti={false}
        className="col-md-6"
      />
     </div>
  )
return tabsData;
}

  return (
    <div className =''>
    {LoadTabs()}
    {/*(tab_3.loaded === true) &&*/}
       {<BasicDetails  personId = {'persons'}  selectedId = {contactstate.selectedId}/> }
    </div>
  )
}

export default React.memo(ContactPersonTabs);
