import React,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import RequiredField from '@/atoms/RequiredSpanField';
import { requiredFields} from '../../../RequiredFields';
import ValidateMessage from '@/atoms/validationError';
import styles from '../Contactperson.module.css';
import DateField from '@/atoms/DateField';
import {locationArray,contactArray,contactPersonsRow1,contactPersonsRow2,defaultFileds} from '../ContactPersonsFields';
const BasicDetails= ({props,personId}) => {
var Title_key = 25;
var Location_key = 36;
var Contack_key =  37;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_3 } = state;
  let defaultOptions = [];
   defaultOptions[Location_key] = state.defaultOptions['locationslist'] || [];
   defaultOptions[Contack_key]  =  [
     {value: '1', label: 'Contact1'},
     {value: '2', label: 'Contact2'},
   ];
  const handleChange = (event) => {
    const { value, name } = event.target;
    tab_3[name] = value;
    //{...tab_3,[name]:value};
    updateStateChanges({ tab_3 });
  }
  const handleSelect = (obj,key) => {
    tab_3[key]  = obj.value;
    updateStateChanges({ tab_3 });
  }
  const handleRadioSelect = (key,type) => {
   tab_3[key] = type;
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
          value={tab_3[data.id] }
          isDisabled= {false}
          placeholder={''}
          handleChange={handleChange}
          name={data.id}
          //{`tab_2_${data.id}`}
         />
         {tab_3['validations'][data.id] && tab_3['validations'][data.id]['validate'] &&
           <ValidateMessage text = {'This field is invalid'}/>
         }
         { tab_3['required'][data.id] !== undefined && !tab_3['required'][data.id] &&
          <ValidateMessage text = {'This field is required'}/>
        }
        </div>
      )
    }
    else if (data.type === 6) {
    fieldData.push(
      <div className = {`col-md-12 ${styles['add-div-margings']}`}>
          <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
          <div>
          <RadioField   name = {data.id} checked = {Number(tab_3[data.id]) === 1} handleChange = {(e)=>handleRadioSelect(data.id,1)} label= {data.option1} />
          <RadioField  name = {data.id} checked = {Number(tab_3[data.id]) === 2} handleChange = {(e)=>handleRadioSelect(data.id,2)} label= {data.option2} />
          </div>
      </div>
    )
  } else if(data.type === 8) {
  fieldData.push(
    <div className=''>
    <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
    <MultiSelectField
        id={data.id}
        options={defaultOptions[data.id]}
        standards={defaultOptions[data.id].filter(val => val.value === tab_3[data.id])}
        disabled={false}
        handleChange={(obj) => handleSelect(obj, data.id)}
        isMulti={false}
        className="col-md-6"
      />
      { tab_3['required'][data.id] !== undefined && !tab_3['required'][data.id] &&
       <ValidateMessage text = {'This field is required'}/>
     }
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
             value={tab_3[data.id]}
            />
            { tab_3['required'][data.id] !== undefined && !tab_3['required'][data.id] &&
             <ValidateMessage text = {'This field is required'}/>
           }
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
        <RadioField   name = {Title_key} checked = {Number(tab_3[Title_key]) === 1} handleChange = {(e)=>handleRadioSelect(Title_key,1)} label= {'Mr'} />
        <RadioField  name = {Title_key} checked = {Number(tab_3[Title_key]) === 2} handleChange = {(e)=>handleRadioSelect(Title_key,2)} label= {'Mrs'} />
        </div>
        { tab_3['required'][Title_key] !== undefined && !tab_3['required'][Title_key] &&
         <ValidateMessage text = {'This field is required'}/>
       }
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
