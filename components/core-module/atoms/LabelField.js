import React from 'react';

const style = {
  display: 'block',
  padding: '0.5rem 0.2rem',
  fontSize: '1rem',
  fontWeight: '400',
  color: '#212529',
}

export default function Label ( { title, customStyle, mandotory, className }) {
  return (
    <>
     <label style={{...style, ...customStyle}} className={`${mandotory ? 'custom_astrick ' + className : className}`} >{title}</label>
    </>
  )
}
