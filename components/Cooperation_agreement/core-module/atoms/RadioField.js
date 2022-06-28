import React from 'react';

export default function Radio ({name,checked =1,handleChange,label,customStyle = {  } }) {
  return (
    <>
   <input
   style = {customStyle}
    type = 'radio'
    name = {name}
    value = {label}
    checked = {label === checked}
    onChange = {handleChange}
   />
   {label}
   </>
  )
}
