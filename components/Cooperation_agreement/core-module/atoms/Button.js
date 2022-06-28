import React from 'react';

export default function Button ( { title = 'Save',handleChange}) {
  return (
    <>
  <button
    type="button"
    className="btn btn-dark pcp_btn col-2"
    onClick={handleChange} >
     {title}
  </button>
  </>
)
}
