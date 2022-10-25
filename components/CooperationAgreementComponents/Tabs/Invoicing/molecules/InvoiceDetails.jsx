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
import Translation from '@/Translation';
const InvoiceDetails = (props) => {
  const { t } = props;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  var { tab_6 ,element_status,tab_4} = state;
  let invoiceRow1Data = structuredClone(invoiceRow1);
  let invoiceRow2Data  = structuredClone(invoiceRow2);
  if(tab_6['56'] == 2) {
    delete invoiceRow2Data['5'];
  }
  let paymentList = state.defaultOptions['payment_condtion'] || [];
  const handleChange = (event) => {
    const { value, name } = event.target;
    if(name === '72' && value === '') { //Vat Rate should be % present
      value = '%';
    }
    if(name === '59') {
      tab_4['41'] = value;
    element_status['tab_4'].push('41');
    }

    tab_6[name] = value;
    element_status['tab_6'].push(name);
    updateStateChanges({ tab_6,element_status });
  }
  const handleRadioSelect = (id,type) => {
   tab_6[id] = type;
   element_status['tab_6'].push(id);
   updateStateChanges({tab_6,element_status});
  }
  const handleSelect = (obj,key) => {
    tab_6[key]  = obj.value;
    element_status['tab_6'].push(key);


    updateStateChanges({ tab_6 ,element_status});
  }

  const ConstructHtmlData = (ContactInvoiceRow) => {
    let fieldData = [];
     ContactInvoiceRow.filter(data=>{
       if(data.type === 1) {
       fieldData.push(
         <div className = {`col-md-12 ${styles['add-div-margings']} invoice${data.id}`}>
         <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'} /> {requiredFields['tab_6'][data.id] && <RequiredField />}
         <InputField
         id = {data.id}
           type = {'text'}
           className = {'col-md-12 poppins-regular-18px'}
           value={tab_6[data.id] }
           isDisabled= {false}
           placeholder={''}
           handleChange={handleChange}
           name={data.id}
           //{`tab_2_${data.id}`}
          />
          {tab_6['validations'][data.id] && tab_6['validations'][data.id]['validate'] &&
            <ValidateMessage text = {'This field is invalid'}/>
          }
          { tab_6['required'][data.id] !== undefined && !tab_6['required'][data.id] &&
           <ValidateMessage text = {'This field is required'}/>
         }
         </div>
       )
     }
     else if (data.type === 6) {
     fieldData.push(
       <div className = {`col-md-12 ${styles['add-div-margings']} invoice${data.id}`}>
           <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'}/> {requiredFields['tab_6'][data.id] && <RequiredField />}
           <div>
           <RadioField   name = {data.id} checked = {tab_6[data.id] === 1} handleChange = {(e)=>handleRadioSelect(data.id,1)} label= {data.option1} className={'poppins-regular-18px me-3'} />
           <RadioField  name = {data.id} checked = {tab_6[data.id] === 2} handleChange = {(e)=>handleRadioSelect(data.id,2)} label= {data.option2}  className={'poppins-regular-18px'}/>
          </div>
       </div>
     )
   } else if(data.type === 8) {
   fieldData.push(
     <div className={`invoice${data.id}`}>
     <LabelField title={data.key_name}  customStyle = {{display:''}} className={'poppins-regular-18px'}/>
     <MultiSelectField
         id={data.id}
         options={paymentList}
         standards={paymentList.filter(val => val.value === Number(tab_6[data.id]))}
         disabled={false}
         handleChange={(obj) => handleSelect(obj, data.id)}
         isMulti={false}
         className="col-md-12 payment_condition poppins-regular-18px align-self-center"
       />
       </div>
     )
   }
     })
     return fieldData;
  }
//  delete invoiceRow2Data['5']
return (
 <div className='invoicing mx-1 '>
   <div className='row'>
   <div className="col-md-12">
    <div className='row'>
    <div className = 'col-md-6'>
     {ConstructHtmlData(invoiceRow1Data)}
     </div>
     <div className = 'col-md-6'>
      {ConstructHtmlData(invoiceRow2Data)}

      </div>
    </div>
  </div>
   </div>
 </div>
)
}
export default React.memo(Translation(InvoiceDetails,[]));
