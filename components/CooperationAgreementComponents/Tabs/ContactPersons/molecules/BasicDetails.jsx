import React,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import RequiredField from '@/atoms/RequiredSpanField';
import { requiredFields} from '../../../RequiredFields';
import styles from '../Contactperson.module.css';
import DateField from '@/atoms/DateField';
import {locationArray,contactArray,contactPersonsRow1,contactPersonsRow2,defaultFileds} from '../ContactPersonsFields';
const BasicDetails= ({props,personId}) => {
var Title_key = 25;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_3 } = state;

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value)
    console.log(name)
    console.log(personId);
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
  else if(data.type === 5) {
fieldData.push(
    <div className="">
          <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
          <DateField
             id={data.id}
             isDisabled= {false}
             placeholder={'date'}
             handleChange={handleChange}
             className="col-md-6"
             name = {data.id}
             value={tab_3[personId][data.id]}
            />
      </div>
    )
  }
    })
    return fieldData;
  }

  return (
    <div className="col-md-12 row">
    <div className = {`col-md-12 ${styles['add-div-margings']}`}>
        <LabelField title={'Title'} customStyle = {{display:''}}/>{requiredFields['tab_3'][Title_key] && <RequiredField />}
        <div>
        <RadioField   name = {Title_key} checked = {tab_3[personId][Title_key] === 1} handleChange = {(e)=>handleRadioSelect(Title_key,1)} label= {'Mr'} />
        <RadioField  name = {Title_key} checked = {tab_3[personId][Title_key] === 2} handleChange = {(e)=>handleRadioSelect(Title_key,2)} label= {'Mrs'} />
        </div>
    </div>
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
