
import React from "react";

/**
 * service for validation
 */
const ValidationService = {
  /**
   * validating an empty field.
   * @param {*} value 
   * @returns 
   */
  emptyValidationMethod: function(value) {
      if(value.length==0){
        return 'This field is required.';
      }
      return '';
  },
  /**
   * validating a number field.
   * @param {*} value 
   * @returns 
   */
  numberValidationMethod: function(value) {
    if(!value.match(/^[0-9]+$/)){
     return 'This field is invalid.';
    }
    return true;
  },
  /**
   * validating a name field.
   * @param {*} value 
   * @returns 
   */
  nameValidationMethod: function(value) {
    if(!value.match(/^[a-zA-Z\u0080-\uFFFF0-9 ]+$/)){
     return 'This field is invalid.';
    }
    return '';
  },
  /**
   * validating a salry field.
   * @param {*} value 
   * @returns 
   */
  salaryValidationMethod: function(value) {
    if(!value.match(/^[0-9]+$/)){
     return 'This field is invalid.';
    }
    return true;
  },
  /**
   * validating paritaire committee.
   * @param {*} value 
   * @returns 
   */
  pcnumberValidationMethod: function(value) {
    if(!value.match(/^([0-9]{3})+$/) && !value.match(/^([0-9]{3}[.][0-9]{2})+$/)){
     return 'This field is invalid.';
    }
    return '';
  },

};

export default ValidationService;