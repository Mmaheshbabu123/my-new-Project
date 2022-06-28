import React from 'react';

export default function Label ( {title }) {
  console.log(title)
  return (
    <>
     <label style={{ padding: '8px', color: '#EC661C' }} id="basic-addon1">{title}</label>
    </>
  )
}
