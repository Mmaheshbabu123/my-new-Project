import React from 'react';

const style = {
   color: "red",
}

export default function SpanField ( {customStyle = {} }) {
  return (
    <>
     <span style={{...style, ...customStyle}} >*</span>
    </>
  )
}
