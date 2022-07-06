import {useState} from 'react';
import InputTextfield from '@/components/core-module/atoms/InputTextfield';
import LabelwithTextfield  from '@/components/core-module/molecule/LabelwithTextfield';
import CheckBox  from '@/components/core-module/atoms/RadioField';
import CheckBoxSample from '@/components/core-module/atoms/CheckBoxField';
import DateField from '@/components/core-module/atoms/DateField';
import  Button from '@/components/core-module/atoms/Button';
import MultiSelect from '@/components/core-module/atoms/MultiSelectField';
import { FormControl } from "react-bootstrap";
const Sampleinput = () => {
  const [state, setState] = useState({
   isRadio : true,
    phone:'',
   })

   const handleChange = (event) => {
     const { value, name } = event.target;
     var pattern = new  RegExp(/^[0-9\b\+\-\(\)]+$/);
                 if (!pattern.test(value)) {
                   console.log('not matched')
                 }else {
                   setState({
                     phone:value,
                   })
                    console.log('matched')
                 }



 }
  const  phoneValidation = ()  =>{
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!state.phone || regex.test(state.phone) === false);
  }
   const handleCheck = (event) =>{

     const { value, name } = event.target;

     setState({
       ...state,
       isRadio : value,
     })
   }
   let options = [
     {
       value:'1',
       label:'one',
     },
     {
     value:'2',
     label:'two',
   }
 ];
   return (
     <>
    <div>
    <div className="col-md-12 row">
      <div className = 'col-md-6'>

      <input
        type = 'text'
        onChange = {handleChange}
        placeholder={'this is first'}
        //value = {state.phone}
      />
      <input
        type = 'text'
        name = 'phone'
        onChange = {handleChange}
        placeholder={'this is next'}
        value = {state.phone}
      />
      </div>
    </div>

    {/* <LabelwithTextfield
         type = {'text'}
         className = {'form-control'}
         value={'sample'}
         isDisabled= {false}
         placeholder={'this is first'}
         handleChange = {handleChange}
         label= {'Fisrt Name molecule'}
         sameLine = {true}
        />
     <CheckBox
     name = {'mandatory'}
   checked = {state.isRadio}
   handleChange = {handleCheck}
   label= 'gagagaa'
      />
      <CheckBoxSample
      keyvalue = {'kk'}
      name = {'nsnsn'}
      value = {'true'}
      keyname = {'age'}
      tick = {true}
      onCheck = {handleChange}
      />
      <DateField
      type="date"
      name={'start_date'}
      className="form-control col-md-10 salary-date"
      id={'123'}
      onChange={handleChange}
      />
      <MultiSelect
       handleChange = {handleChange}
       standards = {[]}
       options = {options}
       disabled = {false}
      />
     <Button
      title = 'Cancel'
       handleChange = {handleChange}
     /> */}

       </div></>
  );
}
export default Sampleinput;
