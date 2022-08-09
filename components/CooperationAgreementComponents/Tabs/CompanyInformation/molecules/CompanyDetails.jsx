import React, {useContext,useCallback,useState} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import debounceFun from '@/atoms/debounceFun';
import styles from '../companyInformation.module.css';
import MultiSelectField from '@/atoms/MultiSelectField';
import { companyRow1,comapanyRow2,companyArray} from '../ComapanyInformationFields';
import { requiredFields} from '../../../RequiredFields';
import RequiredField from '@/atoms/RequiredSpanField';
import ValidateMessage from '@/atoms/validationError';
import debounceFunCall from '@/atoms/debounceFun';
import { fecthCompanyDetailsByVatNum } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';

var filterTimeout;
const CompanyDetails = (props) => {
const {state,updateStateChanges} = useContext(CooperationAgreementContext);
var { tab_2,element_status ,tab_4} = state;
const [companyState,setCompanyState] = useState({
  vat_number:0,
  validations:{'17':{'type':1,validate:false },'19':{'type':2,validate:true},'14':{'type':1,validate:true},'18':{'type':1,validate:true}}
})
var TypeOfCompany = 10;
var Vat_Number = 8;
const CompanyFieldData = (companyRow1) => {
  let  fieldsArray = [];
  companyRow1.map(data=>{
   fieldsArray.push(
     <div className = {data.id}>
     <LabelField title={data.key_name}  customStyle = {{display:''}}/> {requiredFields['tab_2'][data.id] && <RequiredField />}
     <InputField
     id = {data.id}
       type = {'text'}
       className = {'col-md-8'}
       value={tab_2[data.id]}
       isDisabled= {false}
       placeholder={''}
       handleChange={handleChange}
       name={data.id}
       //{`tab_2_${data.id}`}
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

const handleChange = (event) => {
  const { value, name } = event.target;
  tab_2[name] = value;
element_status['tab_2'].push(name);

    updateStateChanges({ tab_2,element_status });

}
const prefillFieldsDefault = (tab_4,tab_2) =>{
  let defaultKeys = ['40','41','42','45','46','47'];
  defaultKeys.forEach((item)=>{
    tab_4[item] =  tab_2['19'] ;
  })

}
const getCompanyDetailsByvat = async() => {
   let data = {};
   let vatNumber = tab_2['8'] !== "" ? tab_2['8']: '';
  await APICALL.service(`${fecthCompanyDetailsByVatNum}/${vatNumber}`, 'GET')
    .then((result) =>{
       data = result.data;
      data['8'] = tab_2['8'];
      data['10']   = '1';
      tab_2 = {...tab_2,...data,}
      prefillFieldsDefault(tab_4,tab_2);
      updateStateChanges({ tab_2,tab_4});
    } )
    .catch((error) => setIntialStateObj(tab_2) );

}
const setIntialStateObj = (tab_2) => {
    for (let i = 5; i < 22; i++) {
      if( i!== 8) {
      tab_2[i] =  '';
    }
    }
    for(let i = 22; i < 25;i ++) {
      tab_2[i]  = 1;
    }
    updateStateChanges({ tab_2});


}
const handleVatChange = (event) => {

  const { value, name } = event.target;
  tab_2[name] = value;
document.getElementById(Vat_Number).value = value;
  setCompanyState({
    ...companyState,
    vat_number:value,
  })
  updateStateChanges({ tab_2 });
}


const onVatnumber = event => {
  const { value, name } = event.target;
  tab_2[name] = value;
 updateStateChanges({ tab_2 ,element_status});
 debounceFunCall(getCompanyDetailsByvat,500)
}
const handleSelect = (obj,key) => {
  tab_2[key]  = obj.value;
  updateStateChanges({ tab_2 });
}
return(
  <div className="col-md-12 row">
    <div className = 'col-md-6'>
    <div className = {`col-md-12 ${styles['add-div-margings']}`}>
    <LabelField title={'VAT-number'}  customStyle = {{display:''}}/> {requiredFields['tab_2'][Vat_Number] && <RequiredField />}
    <input
    id = {Vat_Number}
      type = 'text'
      placeholder="Enter something here..."
      className = {'atom-input-field-default ' + 'col-md-8'}
       value={tab_2[Vat_Number]}
      onChange={(e) => onVatnumber (e) }
        //optimizedFn(e)}
     name={Vat_Number}
      //{`tab_2_${data.id}`}
     />
     {tab_2['validations'][Vat_Number] && tab_2['validations'][Vat_Number]['validate'] &&
       <ValidateMessage text = {'This field is invalid'}/>
     }
    </div>
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
