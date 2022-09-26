import React from 'react';

const style =  { /* ADD IF ANY STYLES NEEDED*/  }

export default function DateField({
    name,
    value,
    handleChange,
    minDate='1947-08-15',
    maxDate='2222-08-15',
    id,
    customStyle = {boxShadow:'none',borderRadius:'0px'},
    className = 'col-md-5',
    isDisabled = false,
  }) {
  return (
    <>
     <input
     style={{...style, ...customStyle}}
       type="date"
       name={name}
       min={minDate}
       max={maxDate}
       value={value}
       className={'atom-input-field-default ' + className}
       disabled={isDisabled}
       id={id}
       onChange={handleChange}
     />
    </>
  )
}
