import React from 'react';

export default function Radio ({name = '', checked =1, handleChange, label, customStyle = {  }, id='', className }) {
  return (
    <>
    <label style={{cursor: 'pointer'}} className={className || ''}>
   <input
     style = {{...customStyle, ...{margin: '0 10px'}}}
     type = 'radio'
     name = {name}
     checked = {checked}
     onChange = {handleChange}
     id={id}
   />
   {label}
   </label>
   </>
  )
}
