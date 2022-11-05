import React from 'react';

/**
 * service for validation
 */
const ValidationService = {
	
	/**
	 * get date from timestamp
	 * @param {*} value 
	 * @returns 
	 */
	getDate:function(value){
		let date=new Date(value);
		const day = date.getDate().toString();
		(day.length==1)?day='0'+day:'';
		const month = date.getMonth() + 1;
		month=month.toString();
		(month.length==1)?month='0'+month:'';
		const year = date.getFullYear();   

		return day+'-'+month+'-'+year;
	},

	/**
	 * get time from timestamp
	 * @param {*} value 
	 * @returns 
	 */
	 getTime:function(value){
		let date=new Date(value);
		
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();     

		return hours+':'+minutes+':'+seconds;
	},
	/**
	 * format the given date to DD-MM-YYYY
	 * @param {*} value 
	 * @returns 
	 */
	timeFOrmating: function(value) {
		let date=new Date(value);
		const day = date.getDate().toString();
		(day.length==1)?day='0'+day:'';
		const month = date.getMonth() + 1;
		month=month.toString();
		(month.length==1)?month='0'+month:'';
		const year = date.getFullYear();    
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();   

		return day+'-'+month+'-'+year+' '+hours+':'+minutes+':'+seconds;
	},
	
	/**
   * validating an empty field.
   * @param {*} value 
   * @returns 
   */
	emptyValidationMethod: function(value) {
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
	numberValidationMethod: function(value) {
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
	nameValidationMethod: function(value) {
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
	salaryValidationMethod: function(value) {
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
	pcnumberValidationMethod: function(value) {
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
	percentageValidationMethod: function(value) {
		// if(value.match(/^(100([.][0]{1,2})?)$/))
		if (
			value.match(/(^(100([.][0]{1,2})?)$)|(^[1-9][0-9]{0,1}([.]\d{1,2})?)$/) ||
			value.match(/(^(100([,][0]{1,2})?)$)|(^[1-9][0-9]{0,1}([,]\d{1,2})?)$/)
		) {
			return '';
		} else {
			return 'This field is invalid.';
		}
	},
	/**
   * Accepts salary values less than 1000 with decimal values up to 2 places 
   * @param {*} value 
   * @returns 
   */
	minSalaryValidationMethod: function(value) {
		if (value.match(/(^[1-9][0-9]{0,2}(([.]|[,])\d{1,4})?)$/)) {
			return '';
		} else {
			return 'This field is invalid.';
		}
	},

	hoursperdayValidationMethod: function(value) {
		if (
			value.match(/(^[0]?\d{1})$/) ||
			value.match(/(^[1]{1}\d{1})$/) ||
			value.match(/(^[2]{1}[0-3]{1})$/) ||
			value.match(/(^([2][4]){1})$/)
		) {
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
	postalCodeValidationMethod: function(value) {
		if (value.length > 6 || value.length < 4) {
			return 'This field is invalid';
		} else if (!value.match(/^[a-zA-Z\u0080-\uFFFF0-9 ]+$/)) {
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
	projectNameValidationMethod: function(value) {
		if (value.replace(' ', '').match(/^[a-zA-Z\u0080-\uFFFF0-9 .,'\- ]+$/)) {
			return '';
		} else {
			return 'This field is invalid.';
		}
	},

	onlyFutureDateValidationMethod: function(value) {
		let dateObj = new Date();
		var currentdate = new Date(value);
		var oneyearpast = new Date(dateObj.getTime() - 31556952000);
		var oneyearfuture = new Date(dateObj.getTime() + 31470552000);
		if (oneyearpast.getTime() < currentdate.getTime() && currentdate.getTime() < oneyearfuture.getTime()) {
			return '';
		} else {
      var oneyearpast=new Date(dateObj.getTime() - 31556952000+86400000);
			let date = oneyearpast.getDate();
			let month = oneyearpast.getMonth() + 1;
			let year = oneyearpast.getFullYear();
			let fdate = oneyearfuture.getDate();
			let fmonth = oneyearfuture.getMonth() + 1;
			let fyear = oneyearfuture.getFullYear();
			return (
				'Please select a date between ' +
				date +
				'/' +
				month +
				'/' +
				year +
				' and ' +
				fdate +
				'/' +
				fmonth +
				'/' +
				fyear
			);
		}
	},

	/**
   * Email validation
   * @param {*} value
   * @returns 
   */
	emailValidationMethod: function(value) {
		if (value.replace(' ', '').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
			return '';
		} else {
			return 'This field is invalid';
		}
	}

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
};
export default ValidationService;
