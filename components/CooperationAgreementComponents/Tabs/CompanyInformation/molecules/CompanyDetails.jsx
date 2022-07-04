import React, {useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import styles from '../companyInformation.module.css';
import MultiSelectField from '@/atoms/MultiSelectField';
import { companyRow1,comapanyRow2,companyArray} from '../ComapanyInformationFields';
import { requiredFields} from '../../../RequiredFields';
import RequiredField from '@/atoms/RequiredSpanField';
const CompanyDetails = (props) => {
const {state,updateStateChanges} = useContext(CooperationAgreementContext);
var { tab_2 } = state;
var TypeOfCompany = 10;
const CompanyFieldData = (companyRow1) => {
  let  fieldsArray = [];
  companyRow1.map(data=>{
   fieldsArray.push(
     <div className = {`col-md-12 ${styles['add-div-margings']}`}>
     <LabelField title={data.key_name}  customStyle = {{display:''}}/> {requiredFields['tab_2'][data.id] && <RequiredField />}
     <InputField
     id = {data.id}
       type = {'text'}
       className = {'col-md-8'}
       value={tab_2[data.id]}
       isDisabled= {false}
       placeholder={'Enter...'}
       handleChange={handleChange}
       name={data.id}
       //{`tab_2_${data.id}`}
      />
     </div>
   )
  })
  return fieldsArray;
}

const handleChange = (event) => {
  const { value, name } = event.target;
  tab_2[name] = value;
  updateStateChanges({ tab_2 });
}
const handleSelect = (obj,key) => {
  tab_2[key]  = obj.value;
  updateStateChanges({ tab_2 });
}
return(
  <div className="col-md-12 row">
    <div className = 'col-md-6'>
     {CompanyFieldData(companyRow1)}
     </div>
     <div className = 'col-md-6'>
     {CompanyFieldData(comapanyRow2)}
     <LabelField title="Type of company" customStyle = {{display:''}}/> {requiredFields['tab_2'][TypeOfCompany] && <RequiredField />}
     <MultiSelectField
         id={TypeOfCompany}
         options={companyArray}
         standards={companyArray.filter(val => val.value === tab_2[TypeOfCompany])}
         disabled={false}
         handleChange={(obj) => handleSelect(obj, TypeOfCompany)}
         isMulti={false}
         className="col-md-6"
       />
      </div>
  </div>
);
}

export default React.memo(CompanyDetails);