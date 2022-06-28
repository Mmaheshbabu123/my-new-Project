import React from 'react';

const style =  { /* ADD IF ANY STYLES NEEDED*/  }

export default function DateField({
    name,
    value,
    handleChange,
    minDate='2022-06-26',
    id,
    customStyle = {},
    className = 'col-md-5'
  }) {
  return (
    <>
     <input
     style={{...style, ...customStyle}}
       type="date"
       name={name}
       min={minDate}
       value={value}
       className={'atom-input-field-default ' + className}
       id={id}
       onChange={handleChange}
     />
    </>
  )
}
