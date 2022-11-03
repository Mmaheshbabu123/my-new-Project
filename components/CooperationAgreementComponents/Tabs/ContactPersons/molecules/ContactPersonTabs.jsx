import React,{useContext,useState,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { personsData } from '../ContactPersonsFields';
import styles from '../Contactperson.module.css';
import BasicDetails from './BasicDetails';
import SalaryDetails from '../../SalaryBenefits/molecules/SalaryDetails'
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import {defaultFileds} from '../ContactPersonsFields';
import { requiredFields } from '@/components/CooperationAgreementComponents/RequiredFields';
import { helpers } from '../../SalaryBenefits/SalaryBenefitHelper';
import { confirmAlert } from 'react-confirm-alert';
import Translation from '@/Translation';
const ContactPersonTabs = (props) => {
  const { t }  = props;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  const TAB_ID = 3;
  const requiredElements  = structuredClone(requiredFields);
  const stateKey = 'tab_3';
  var { tab_3: {  contactSelectedDetails },contactPersonsDetails,filledTabs,selectedTabId ,tab_3} = state;
let contactOptions = [];
let contactPersons = [];
contactOptions   = state.defaultOptions['contactList']  || [];
//[{'value':1,'person_id':1,'label':'person1'},{'value':2,'person_id':2,'label':'person2'},{'value':3,'person_id':3,'label':'person3'}];
//
contactPersons   = state.defaultOptions['contactsData'] || [];
  const [contactstate,setState] = useState({
    id:1,
    selectedId: 1,
    loaded:false,
  })
  const onSelect = (e) => {
    let personDetailsObj = [...contactSelectedDetails];
    let tab_3 = {...state[stateKey]};
    let newObj = {
      person_id: e.value,
      person_name: e.label,
      tab_id: TAB_ID,
    }
    personDetailsObj.push(newObj);
    tab_3['contactSelectedDetails'] = personDetailsObj;
    tab_3['contactPersonsDetails'][newObj.person_id] = insertDataObjects(newObj.person_id);
    updateStateChanges({tab_3})
  }
  const insertDataObjects = (pcId) => {
    let dataObject = {};
    let defaultObj = {'25':1,'30':1,'31':2,'32':2,'38':2,'39':2,required:requiredElements['tab_3'],validations:{'34':{'type':1,validate:false},'35':{'type':2,validate:false},
      29:{'type':7, validate:false}
    }};
    dataObject = {...defaultObj}
    dataObject = {...dataObject,...contactPersons[pcId]};
    return dataObject;
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
const deleteAndUpdateState = (personId, index) => {

  let salaryDetailsObj = [...contactSelectedDetails];
  let tab_3 = {...state[stateKey]};
  delete tab_3['contactPersonsDetails'][personId];
//  delete tab_5['cooperationBenefits'][pcId];
  salaryDetailsObj.splice(index, 1);

  tab_3['contactSelectedDetails'] = salaryDetailsObj;
  updateStateChanges({tab_3});
}
const onDelete = (personId, index) => {
  confirmAlert({
    message: 'Do you want to delete contact persons?',
    buttons: [
      { label: 'No' },
      { label: 'Yes', onClick: () => deleteAndUpdateState(personId, index) }
    ]
  });

}


  return (
    <div className='contact_person mx-1'>
      <div className='row '>
        <div className='col-md-12'>
        <div className={`${styles['salary-benefits-tab-parent']}`} disabled={!filledTabs.includes(selectedTabId)}>
      <div>
        {contactSelectedDetails.length > 0 ? <BasicDetails onDelete={onDelete}/> : null}
      </div>
      <div className='row'>
        <div className='col-md-11 m-auto px-2 select_contact_person'>
        <MultiSelectField
            options={helpers.getDifference(contactOptions, contactSelectedDetails, 'value', 'person_id', tab_3.alreadyLinked,2)}
            handleChange={onSelect}
            isMulti={false}
            standards={[]}
            className={`${styles['salary-benefits-multiselect']}`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}`}
            placeholder={t('Select contact person')}
        />
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Translation(ContactPersonTabs,['Select contact person']));
