import React from 'react';

export default function InputTextfield({ type = 'text',className = 'form-control' ,value='sample',isDisabled= false,placeholder='this is first',handleChange,name='jsjs',customStyle = { width: '30%' } }) {
  return (
    <input
      style = {customStyle}
      type={type}
      className={className}
      //id="inputDate4"
      disabled={isDisabled}
      placeholder={placeholder}
      name={name}
      value={value}
     onChange={handleChange}
      />
  );
};
