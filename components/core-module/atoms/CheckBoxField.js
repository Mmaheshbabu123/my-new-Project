import React from 'react';

export default function CheckBox({keyvalue, name, value, keyname ,tick,onCheck, id = "", disabled = "", customStyle = {}, className}) {


      let styles_id = {};

      return (
        <>

          <label style={{...styles_id, ...customStyle}} className = {className || "col-md-12 mt-2"} >
              <input
                  name={keyname}
                  type="checkbox"
                  value={value}
                  checked={tick || false}
                  onChange={onCheck}
                  key={keyvalue}
                  disabled = {disabled }
                  id = {id}
                  style={{marginRight: '10px', width: '15px', height:'15px'}}
              />
              <span> {name} </span>
              </label>
          </>


      );
  }
