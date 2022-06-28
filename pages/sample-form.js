import {useState} from 'react';
import InputTextfield from '@/components/Cooperation_agreement/core-module/atoms/InputTextfield';
import LabelwithTextfield  from '@/components/Cooperation_agreement/core-module/molecule/LabelwithTextfield';
import CheckBox  from '@/components/Cooperation_agreement/core-module/atoms/RadioField';
import CheckBoxSample from '@/components/Cooperation_agreement/core-module/atoms/CheckBoxField';
import DateField from '@/components/Cooperation_agreement/core-module/atoms/DateField';
import  Button from '@/components/Cooperation_agreement/core-module/atoms/Button';
import MultiSelect from '@/components/Cooperation_agreement/core-module/atoms/MultiSelectField';
const Sampleinput = () => {
  const [state, setState] = useState({
   isRadio : true,
   })
  console.log(LabelwithTextfield)
   const handleChange = (event) => {
     const { value, name } = event.target;
     console.log(value);
     console.log(name);

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
       <LabelwithTextfield
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
       />

       </div></>
  );
}
export default sampleinput;
