import React, {useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import RequiredField from '@/atoms/RequiredSpanField';
import { requiredFields} from '../../../RequiredFields';
import styles from '../OnlineDetails.module.css';
import { onlineDetailsRow1,onlineDetailsRow2,onlineDetaillsRadioRow1,onlineDetaillsRadioRow2} from '../OnlineDetailsFields';

import ValidateMessage from '@/atoms/validationError';
const BasicDetails = (props) => {
  const disableFields  = {
    '40' : true,
    '41' : true,
  };

  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_4,element_status} = state;
  const OnlineFieldData = (onlineRow) => {
    let  fieldsArray = [];
    onlineRow.map(data=>{
     fieldsArray.push(
       <div className = {`col-md-12 ${styles['add-div-margings']}  online${data.id}`}>
       <LabelField title={data.key_name} customStyle = {{display:''}}/> {requiredFields['tab_4'][data.id] && <RequiredField />}
       <InputField
       id = {data.id}
         type = {'text'}
         className = {'col-md-8'}
         value={tab_4[data.id]}
         isDisabled= {disableFields[data.id] || false}
         placeholder={''}
         handleChange={handleChange}
         name={data.id}
         //{`tab_2_${data.id}`}
        />
        {tab_4['validations'][data.id] && tab_4['validations'][data.id]['validate'] &&
          <ValidateMessage text = {'This field is invalid'}/>
        }
        {!tab_4['required'][data.id] &&
          <ValidateMessage text = {'This field is required.'}/>
        }
       </div>
     )
    })
    return fieldsArray;
  }
 const OnlineRadioFieldData = (onlineRadioRow) => {
   let  fieldsArray = [];
   onlineRadioRow.map(data=>{
    fieldsArray.push(
      <div className = {`col-md-12 ${styles['add-div-margings']}`}>
          <LabelField title={data.key_name} customStyle = {{display:''}}/>{requiredFields['tab_4'][data.id] && <RequiredField />}
          <div>
          <RadioField   name = {data.id} checked = {tab_4[data.id] === 1} handleChange = {(e)=>handleRadioSelect(data.id,1)} label= {data.option1} />
          <RadioField  name = {data.id} checked = {tab_4[data.id] === 2} handleChange = {(e)=>handleRadioSelect(data.id,2)} label= {data.option2} />
          </div>
      </div>
    )
  })
  return fieldsArray;
 }
  const handleChange = (event) => {
    const { value, name } = event.target;
    tab_4[name] = value;
    element_status['tab_4'].push(name);
    updateStateChanges({ tab_4,element_status });
  }
  const handleRadioSelect = (id,type) => {
   tab_4[id] = type;
     element_status['tab_4'].push(id);
   updateStateChanges({tab_4,element_status});
  }
  return (
    <div className="col-md-12 row">
      <div className = 'col-md-6'>
       {OnlineFieldData(onlineDetailsRow1)}
       {OnlineRadioFieldData(onlineDetaillsRadioRow1)}
       </div>
       <div className = 'col-md-6'>
       {OnlineFieldData(onlineDetailsRow2)}
       {OnlineRadioFieldData(onlineDetaillsRadioRow2)}
       </div>
    </div>
  )
}

export default React.memo(BasicDetails);
