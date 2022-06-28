import React from 'react';

export default function DateField( {name,value,handleChange,minDate='2022-06-26',id = 'pcp_name',customStyle = { width: '30%' } }) {
  return (
    <>
     <input
     style={customStyle}
       type="date"
       name={name}
       min={minDate}
       value={value}
       className="form-control col-md-10 salary-date"
       id={id}
       onChange={handleChange}
     />
    </>
  )
}
