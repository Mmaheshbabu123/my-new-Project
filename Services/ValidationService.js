
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
  emptyValidationMethod: function (value) {
    if (value.length == 0) {
      return 'This field is required.';
    }
    return '';
  },
  /**
   * validating a number field.
   * @param {*} value 
   * @returns 
   */
  numberValidationMethod: function (value) {
    if (!value.match(/^[0-9]+$/)) {
      return 'This field is invalid.';
    }
    return '';
  },
  /**
   * validating a name field.
   * @param {*} value 
   * @returns 
   */
  nameValidationMethod: function (value) {
    if (!value.match(/^[a-zA-Z\u0080-\uFFFF0-9 ]+$/)) {
      return 'This field is invalid.';
    }
    return '';
  },
  /**
   * validating a salry field.
   * @param {*} value 
   * @returns 
   */
  salaryValidationMethod: function (value) {
    if (!value.match(/^[0-9]+$/)) {
      return 'This field is invalid.';
    }
    return true;
  },
  /**
   * validating paritaire committee.
   * @param {*} value 
   * @returns 
   */
  pcnumberValidationMethod: function (value) {
    if (!value.match(/^([0-9]{3})+$/) && !value.match(/^([0-9]{3}[.][0-9]{2})+$/)) {
      return 'This field is invalid.';
    }
    return '';
  },
  /**
    * percentage validation.
    * @param {*} value 
    * @returns 
    */
  percentageValidationMethod: function (value) {
    // if(value.match(/^(100([.][0]{1,2})?)$/))
    if (value.match(/(^(100([.][0]{1,2})?)$)|(^[1-9][0-9]{0,1}([.]\d{1,2})?)$/) || value.match(/(^(100([,][0]{1,2})?)$)|(^[1-9][0-9]{0,1}([,]\d{1,2})?)$/)) {
      return ''
    } else {
      return 'This field is invalid.';
    }
  },
  /**
   * Accepts salary values less than 1000 with decimal values up to 2 places 
   * @param {*} value 
   * @returns 
   */
  minSalaryValidationMethod: function (value) {
    if (value.match(/(^[1-9][0-9]{0,2}(([.]|[,])\d{1,4})?)$/)) {
      return '';
    } else {
      return 'This field is invalid.';
    }
  },

  hoursperdayValidationMethod: function(value){
    if (value.match(/(^[0]?\d{1})$/)||value.match(/(^[1]{1}\d{1})$/)||value.match(/(^[2]{1}[0-3]{1})$/)||value.match(/(^([2][4]){1})$/)) {
    // if (value.match(/(^[0]?\d{1}(([.]|[,])\d{1,2})?)$/)||value.match(/(^[1]{1}\d{1}(([.]|[,])\d{1,2})?)$/)||value.match(/(^[2]{1}[0-3]{1}(([.]|[,])\d{1,2})?)$/)||value.match(/(^([2][4]){1}(([.]|[,])[0]{1,2})?)$/)) {
      return '';
    } else {
      return 'This field is invalid.';
    }

  },
  /**
   * Postal code validation 
   * @param {*} value 
   * @returns 
   */
  postalCodeValidationMethod: function (value) {
    if ((value.length) > 6 || (value.length) < 4) {
      return 'This field is invalid'
    }
    else if (!value.match(/^[a-zA-Z\u0080-\uFFFF0-9 ]+$/)) {
      return 'This field is invalid';
    } else {
      return '';
    }
  },
  /**
   * Project name validation 
   * @param {*} value 
   * @returns 
   */
  projectNameValidationMethod: function (value) {
    if (value.replace(' ', '').match(/^[a-zA-Z\u0080-\uFFFF0-9 .,'\- ]+$/)) {
      return '';
    } else {
      return 'This field is invalid.';
    }
  },

  onlyFutureDateValidationMethod:function (value) {
    let dateObj = new Date();
    var yesterdaydate=new Date(dateObj.valueOf() - 86400000);
    var currentdate=new Date(value);
    if (yesterdaydate<currentdate) {
      return '';
    } else {
      return 'Date is invalid.';
    }
  },

  /**
   * Email validation
   * @param {*} value
   * @returns 
   */
  emailValidationMethod: function (value) {
    if(value.replace(' ', '').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)){
      return '';
    }else {
      return 'This field is invalid';
    }
  },

   /**
   * Password validation
   * @param {*} value
   * @returns 
   */
    // passwordValidationMethod: function (value) {
    //   if(value.replace(' ', '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
    //     return '';
    //   }else {
    //     return 'This field is invalid';
    //   }
    // }

}
export default ValidationService;



