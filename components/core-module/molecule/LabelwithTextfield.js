import React from 'react';
import * as reactbootstrap from 'react-bootstrap';
import LabelField from '../atoms/LabelField';

import InputTextfield from '../atoms/InputTextfield';

const  LabelwithTextfield  = ({ type = 'text',className = 'form-control' ,value='sample',isDisabled= false,placeholder='this is first',handleChange,name='jsjs',label = 'First name',sameLine=true})  => {
  return (
    <div className={`${sameLine?'row':''}`}>
      <div className="col-md-4">
            {<LabelField title = {label}/>}

        </div>
    <div className="col-md-8 input-padd">
      {<InputTextfield
         type = {type}
         className = {className}
         value={value}
         isDisabled= {isDisabled}
         placeholder={placeholder}
         handleChange={handleChange}
         name={name}
        /> }
    </div>
    </div>
  );
};
export default LabelwithTextfield;
