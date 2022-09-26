import React from 'react';

const style = { /* ADD IF ANY STYLES NEEDED*/  }

export default function InputTextfield({
  type = 'text',
  className = '' ,
  value='',
  isDisabled= false,
  placeholder='this is first',
  handleChange,name='input_name',
  customStyle = {boxShadow:'none',borderRadius:'0px'}
}) {
  return (
    <input
      style = {{...style, ...customStyle}}
      type={type}
      className={'atom-input-field-default ' + className}
      disabled={isDisabled}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      />
  );
}
