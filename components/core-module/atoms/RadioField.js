import React from 'react';

export default function Radio ({name,checked =1,handleChange,label,customStyle = {  } }) {
  console.log(checked)
  return (
    <>
   <input
     style = {{...customStyle, ...{margin: '0 10px '}}}
     type = 'radio'
     name = {name}
     checked = {checked}
     onChange = {handleChange}
   />
   {label}
   </>
  )
}
