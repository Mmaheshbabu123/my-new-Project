import React,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import RequiredField from '@/atoms/RequiredSpanField';
import { requiredFields} from '../../../RequiredFields';
import styles from '../Contactperson.module.css';
import {locationArray,contactArray,contactPersonsRow1,contactPersonsRow2} from '../ContactPersonsFields';
const BasicDetails= ({props,personId}) => {

  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_3 } = state;

  const handleChange = (event) => {
    const { value, name } = event.target;
    tab_3[personId][name] = value;
    //{...tab_3[personId],[name]:value};
    updateStateChanges({ tab_3 });
  }
  const handleSelect = (obj,key) => {
    tab_3[personId][key]  = obj.value;
    updateStateChanges({ tab_3 });
  }
  const handleRadioSelect = (key,type) => {
   tab_3[personId][key] = type;
   updateStateChanges({tab_3});
  }
  const ConstructHtmlData = (ContactPersonRow) => {
   let fieldData = [];
    ContactPersonRow.filter(data=>{
      if(data.type === 1) {
      fieldData.push(
        <div className = {`col-md-12 ${styles['add-div-margings']}`}>
        <LabelField title={data.key_name} customStyle = {{display:''}}/> {requiredFields['tab_3'][data.id] && <RequiredField />}
        <InputField
        id = {data.id}
          type = {'text'}
          className = {'col-md-8'}
          value={tab_3[personId][data.id] }
          isDisabled= {false}
          placeholder={'Enter...'}
          handleChange={handleChange}
          name={data.id}
          //{`tab_2_${data.id}`}
         />
        </div>
      )
    }
    else if (data.type === 6) {
    fieldData.push(
      <div className = {`col-md-12 ${styles['add-div-margings']}`}>
          <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
          <div>
          <RadioField   name = {data.id} checked = {tab_3[personId][data.id] === 1} handleChange = {(e)=>handleRadioSelect(data.id,1)} label= {data.option1} />
          <RadioField  name = {data.id} checked = {tab_3[personId][data.id] === 2} handleChange = {(e)=>handleRadioSelect(data.id,2)} label= {data.option2} />
          </div>
      </div>
    )
  } else if(data.type === 8) {
  fieldData.push(
    <div className=''>
    <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
    <MultiSelectField
        id={data.id}
        options={data.options}
        standards={data.options.filter(val => val.value === tab_3[personId][data.id])}
        disabled={false}
        handleChange={(obj) => handleSelect(obj, data.id)}
        isMulti={false}
        className="col-md-6"
      />
      </div>
    )
  }
    })
    return fieldData;
  }

  return (
    <div className="col-md-12 row">
      <div className = 'col-md-6'>
       {ConstructHtmlData(contactPersonsRow1)}
       </div>
       <div className = 'col-md-6'>
        {ConstructHtmlData(contactPersonsRow2)}

        </div>
    </div>
  )
}

export default React.memo(BasicDetails);
