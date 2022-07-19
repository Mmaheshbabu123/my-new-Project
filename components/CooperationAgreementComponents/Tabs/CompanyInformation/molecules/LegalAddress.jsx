import React, {useContext,useState} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { legalAdressRow1,legalAdressRow2} from '../ComapanyInformationFields';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import numericValidate  from '@/atoms/phoneNumberValidate';
import styles from '../companyInformation.module.css';
import { requiredFields} from '../../../RequiredFields';
import RequiredField from '@/atoms/RequiredSpanField';
import ValidateMessage from '@/atoms/validationError';

import emailValidate from '@/atoms/emailValidate';
const LegalAddress = (props) => {
  var Language = 22;
  var Labour_regulations_share = 23;
  var Labour_regulations = 24;
//  '19':{'type':2,validate:false}
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  const [legalState,setLegalState] = useState({

    validations:{'17':{'type':1,validate:false,'text':'Only numbers will accept' },'14':{'type':1,validate:false,'text':'Only numbers will accept'},'18':{'type':1,validate:false,'text':'Only numbers will accept'}}
  })
  var { tab_2,element_status } = state;
  console.log(tab_2);
  const handleChange = (event) => {
    const {name,value} = event.target;
    tab_2[name] = value;
    element_status['tab_2'].push(name);
    // if(legalState['validations'].hasOwnProperty(name) && value) {
    //   validateFields(name,value);
    // }
    // else {

      updateStateChanges({ tab_2 ,element_status});
    //}

  }


  const validateFields = (key,value) => {
     let type = legalState['validations'][key]['type'];
     const {validations} = legalState;
     if(type === 1 && numericValidate(value)) {
       tab_2[key] = value;
       validations[key]['validate'] = false;
      updateStateChanges({ tab_2 });
    }
    // else if(type === 2 && emailValidate(value)) {
    //   tab_2[key] = value;
    //   validations[key]['validate'] = false;
    //   updateStateChanges({ tab_2 });
    //  }
     else {
        validations[key]['validate'] = true;

     }
    setLegalState({
      ...legalState,
      validations
    })

  }
  const handleRadioSelect = (id,type) => {
   tab_2[id] = type;
     element_status['tab_2'].push(id);
   updateStateChanges({tab_2,element_status});
  }
 const LegalaAddressFieldData = (Rowdata) =>{
   let fieldsArray = [];
   Rowdata.map(data => {
     fieldsArray.push(
       <div className = {`col-md-12 ${styles['add-div-margings']}`}>
       <LabelField title={data.key_name} customStyle = {{display:''}} /> {requiredFields['tab_2'][data.id] && <RequiredField />}
       <InputField
         id = {data.id}
         type = {'text'}
         className = {'col-md-8'}
         value={tab_2[data.id]}
         isDisabled= {false}
         placeholder={''}
         handleChange={(e)=>handleChange(e)}
         name={data.id}

        />
        {tab_2['validations'][data.id] && tab_2['validations'][data.id]['validate'] &&
          <ValidateMessage text = {'This field is invalid'}/>
        }
         { tab_2['required'][data.id] !== undefined && !tab_2['required'][data.id] &&
          <ValidateMessage text = {'This field is required'}/>
        }
       </div>
     )
   })
   return fieldsArray;
 }

  return (
    <div className ="col-md-12 row">
      <div className = 'col-md-6'>
        {LegalaAddressFieldData(legalAdressRow1)}
        <div className = 'row'>
        <div className = {`col-md-12 ${styles['add-div-margings']}` }>
            <LabelField title="Language"  customStyle = {{display:''}}/>{requiredFields['tab_2'][Language] && <RequiredField />}
            <div>
            <RadioField   name = {Language} checked = {tab_2[Language] === 1} handleChange = {(e)=>handleRadioSelect(Language,1)} label= 'Dutch' />
            <RadioField  name = {Language} checked = {tab_2[Language] === 2} handleChange = {(e)=>handleRadioSelect(Language,2)} label= 'French' />
           </div>
        </div>
         <div className = {`col-md-12 ${styles['add-div-margings']}`}>
            <LabelField title="Labour regulations (arbeidsreglement)" customStyle = {{display:''}}/>{requiredFields['tab_2'][Labour_regulations_share] && <RequiredField />}
             <div>
            <RadioField name = {Labour_regulations_share} checked = {tab_2[Labour_regulations_share] === 1} handleChange = {(e)=>handleRadioSelect(Labour_regulations_share,1)} label= 'Yes' />
            <RadioField name = {Labour_regulations_share} checked = {tab_2[Labour_regulations_share] === 2} handleChange = {(e)=>handleRadioSelect(Labour_regulations_share,2)} label= 'No' />
             </div>
        </div>
        </div>
      </div>
     <div className = "col-md-6">
       <div className = {`col-md-12 ${styles['add-div-margings']}`}>
         {LegalaAddressFieldData(legalAdressRow2)}
         <LabelField title="Labour regulations (arbeidsreglement) - sharing" customStyle = {{display:''}}/>{requiredFields['tab_2'][Labour_regulations] && <RequiredField />}
         <div>
         <RadioField name = {Labour_regulations} checked = {tab_2[Labour_regulations] === 1} handleChange = {(e)=>handleRadioSelect(Labour_regulations,1)} label= 'Yes' />
         <RadioField name = {Labour_regulations} checked = {tab_2[Labour_regulations] === 2} handleChange = {(e)=>handleRadioSelect(Labour_regulations,2)} label= 'No' />
         </div>
      </div>
     </div>
    </div>
  )
}

export default React.memo(LegalAddress);
