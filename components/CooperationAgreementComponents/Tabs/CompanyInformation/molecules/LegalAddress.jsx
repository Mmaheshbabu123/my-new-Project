import React, {useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { legalAdressRow1,legalAdressRow2} from '../ComapanyInformationFields';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import styles from '../companyInformation.module.css';
const LegalAddress = (props) => {
  var Language = 22;
  var Labour_regulations_share = 23;
  var Labour_regulations = 24;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var {tab_2} = state;
  const handleChange = (event) => {
    const {name,value} = event.target;
    tab_2[name] = value;
    updateStateChanges({tab_2});
  }
  const handleRadioSelect = (id,type) => {
   tab_2[id] = type;
   updateStateChanges({tab_2});
  }
 const LegalaAddressFieldData = (Rowdata) =>{
   let fieldsArray = [];
   Rowdata.map(data => {
     fieldsArray.push(
       <div className = {`col-md-12 ${styles['add-div-margings']}`}>
       <LabelField title={data.key_name} />
       <InputField
         id = {data.id}
         type = {'text'}
         className = {'col-md-8'}
         value={tab_2[data.id]}
         isDisabled= {false}
         placeholder={'Enter...'}
         handleChange={handleChange}
         name={data.id}
        />
       </div>
     )
   })
   return fieldsArray;
 }
  return (
    <div className ="col-md-12 row">
      <div className = 'col-md-6'>
        {LegalaAddressFieldData(legalAdressRow1)}
        <div className = {`col-md-12 ${styles['add-div-margings']}`}>
            <LabelField title="Language" />
            <RadioField   name = {Language} checked = {tab_2[Language] === 1} handleChange = {(e)=>handleRadioSelect(Language,1)} label= 'Dutch' />
            <RadioField  name = {Language} checked = {tab_2[Language] === 2} handleChange = {(e)=>handleRadioSelect(Language,2)} label= 'French' />
        </div>
         <div className = {`col-md-12 ${styles['add-div-margings']}`}>
            <LabelField title="Labour regulations (arbeidsreglement)" />
            <RadioField name = {Labour_regulations_share} checked = {tab_2[Labour_regulations_share] === 1} handleChange = {(e)=>handleRadioSelect(Labour_regulations_share,1)} label= 'Yes' />
            <RadioField name = {Labour_regulations_share} checked = {tab_2[Labour_regulations_share] === 2} handleChange = {(e)=>handleRadioSelect(Labour_regulations_share,2)} label= 'No' />
        </div>
      </div>
     <div className = "col-md-6">
       <div className = {`col-md-12 ${styles['add-div-margings']}`}>
         {LegalaAddressFieldData(legalAdressRow2)}
         <LabelField title="Labour regulations (arbeidsreglement) - sharing" />
         <RadioField name = {Labour_regulations} checked = {tab_2[Labour_regulations] === 1} handleChange = {(e)=>handleRadioSelect(Labour_regulations,1)} label= 'Yes' />
         <RadioField name = {Labour_regulations} checked = {tab_2[Labour_regulations] === 2} handleChange = {(e)=>handleRadioSelect(Labour_regulations,2)} label= 'No' />
      </div>
     </div>
    </div>
  )
}

export default React.memo(LegalAddress);
