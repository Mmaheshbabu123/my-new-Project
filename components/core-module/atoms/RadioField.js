import React from 'react';

export default function Radio ({name = '', checked =1, handleChange, label, customStyle = {  }, id='' }) {
  return (
    <>
    <label style={{cursor: 'pointer'}}>
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
