import React from 'react';

export default function Radio ({name,checked =1,handleChange,label,customStyle = {  } }) {
  console.log(checked)
  return (
    <>
   <input
   style = {customStyle}
    type = 'radio'
    name = {name}
      style={{margin: '0 10px '}}
    checked = {checked}
    onChange = {handleChange}
   />
   {label}
   </>
  )
}
