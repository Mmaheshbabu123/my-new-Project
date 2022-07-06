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
const CompanyDetails = (props) => {
const {state,updateStateChanges} = useContext(CooperationAgreementContext);
var { tab_2 } = state;

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
     <div className = ''>
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
   
   console.log(name);
  if(companyState['validations'].hasOwnProperty(name)) {
    validateFields(value);
  }
  else {
    updateStateChanges({ tab_2 });
  }
}

const validateFields = (text) => {
  console.log('kkkk')
}
const handleVatChange = (event) => {

  const { value, name } = event.target;
  console.log(value);
  tab_2[name] = value;
document.getElementById(Vat_Number).value = value;
  setCompanyState({
    ...companyState,
    vat_number:value,
  })
  updateStateChanges({ tab_2 });
}
let filterTimeout

const doCityFilter = event => {
  const { value, name } = event.target;

  clearTimeout(filterTimeout)
  if (!event) return setFilteredCities([])

  filterTimeout = setTimeout(() => {
    setCompanyState({
      ...companyState,
      vat_number:value,
    })
    console.log('====>', event)

  }, 500)
}
const optimizedFn = (event) => {
    // const { value, name } = event.target;
    //   tab_2[name] = value;
    //   updateStateChanges({ tab_2 },()=>{
         debounceFun(handleVatChange,100);
    //  });

}
console.log(companyState)
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
      onChange={(e) => doCityFilter (e) }
        //optimizedFn(e)}
     name={Vat_Number}
      //{`tab_2_${data.id}`}
     />
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
