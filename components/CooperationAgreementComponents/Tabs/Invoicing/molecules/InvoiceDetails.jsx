import React,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import RequiredField from '@/atoms/RequiredSpanField';
import ValidateMessage from '@/atoms/validationError';
import { invoiceRow1,invoiceRow2} from '../InvoiceFields';
import styles from '../Invoicing.module.css';
import { requiredFields} from '../../../RequiredFields';
const InvoiceDetails = (props) => {
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_6 } = state;

  const handleChange = (event) => {
    const { value, name } = event.target;
    tab_6[name] = value;
    updateStateChanges({ tab_6 });
  }
  const handleRadioSelect = (id,type) => {
   tab_6[id] = type;
   updateStateChanges({tab_6});
  }
  const handleSelect = (obj,key) => {
    tab_6[key]  = obj.value;
    updateStateChanges({ tab_6 });
  }

  const ConstructHtmlData = (ContactInvoiceRow) => {
    let fieldData = [];
     ContactInvoiceRow.filter(data=>{
       if(data.type === 1) {
       fieldData.push(
         <div className = {`col-md-12 ${styles['add-div-margings']}`}>
         <LabelField title={data.key_name} customStyle = {{display:''}} /> {requiredFields['tab_6'][data.id] && <RequiredField />}
         <InputField
         id = {data.id}
           type = {'text'}
           className = {'col-md-8'}
           value={tab_6[data.id] }
           isDisabled= {false}
           placeholder={'Enter...'}
           handleChange={handleChange}
           name={data.id}
           //{`tab_2_${data.id}`}
          />
          {tab_6['validations'][data.id] && tab_6['validations'][data.id]['validate'] &&
            <ValidateMessage text = {'This field is invalid'}/>
          }
         </div>
       )
     }
     else if (data.type === 6) {
     fieldData.push(
       <div className = {`col-md-12 ${styles['add-div-margings']}`}>
           <LabelField title={data.key_name} customStyle = {{display:''}} /> {requiredFields['tab_6'][data.id] && <RequiredField />}
           <div>
           <RadioField   name = {data.id} checked = {tab_6[data.id] === 1} handleChange = {(e)=>handleRadioSelect(data.id,1)} label= {data.option1} />
           <RadioField  name = {data.id} checked = {tab_6[data.id] === 2} handleChange = {(e)=>handleRadioSelect(data.id,2)} label= {data.option2} />
          </div>
       </div>
     )
   } else if(data.type === 8) {
   fieldData.push(
     <div className=''>
     <LabelField title={data.key_name}  customStyle = {{display:''}}/>
     <MultiSelectField
         id={data.id}
         options={data.options}
         standards={data.options.filter(val => val.value === tab_6[data.id])}
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
     {ConstructHtmlData(invoiceRow1)}
     </div>
     <div className = 'col-md-6'>
      {ConstructHtmlData(invoiceRow2)}

      </div>
  </div>
)
}
export default React.memo(InvoiceDetails);
