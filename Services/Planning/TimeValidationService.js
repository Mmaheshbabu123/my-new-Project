import moment from 'moment';

/**
 * service for validation
 */
const TimeValidationService = {
	/**
	 * get time duration
	 * @param start Start time
	 * @param end End time
	 * @returns 
	 */

	getDuration: function(start, end) {
		var starttime = moment(start).format('HH:mm').split(':');
		var endtime = moment(end).format('HH:mm').split(':');
		if (
			parseInt(endtime[0]) > parseInt(starttime[0]) ||
			(parseInt(endtime[0]) == parseInt(starttime[0]) && parseInt(endtime[1]) >= parseInt(starttime[1]))
		) {
			if (parseInt(endtime[1]) >= parseInt(starttime[1])) {
				var diff2 = parseInt(endtime[1]) - parseInt(starttime[1]);
				var diff1 = parseInt(endtime[0]) - parseInt(starttime[0]);
			} else {
				endtime[0] = parseInt(endtime[0]) - 1;
				var diff2 = 60 + parseInt(endtime[1]) - parseInt(starttime[1]);
				var diff1 = parseInt(endtime[0]) - parseInt(starttime[0]);
			}
		}else{
			endtime[0] = parseInt(endtime[0]) +24;
			if (parseInt(endtime[1]) >= parseInt(starttime[1])) {
				var diff2 = parseInt(endtime[1]) - parseInt(starttime[1]);
				var diff1 = parseInt(endtime[0]) - parseInt(starttime[0]);
			} else {
				endtime[0] = parseInt(endtime[0]) - 1;
				var diff2 = 60 + parseInt(endtime[1]) - parseInt(starttime[1]);
				var diff1 = parseInt(endtime[0]) - parseInt(starttime[0]);
			}
		}

		return diff1 + diff2 / 60;
	},

	/***
	 * 
	 * 
	 */

	 breakWarning: function(starttime,endtime){
		 var error = '';
		 var duration =0;
			 duration = this.getDuration(starttime,endtime);
		 if(duration >= 6.5){
			 error = 'Please note that the employee is planned 6.5 hours or more, which means that a legally (not paid) mandatory break of 60 minutes for below 18 year old employees and 30 minutes for above 18 year old employees will be included.'
		 }
		 return error;

	 },
	 endTimeWarning: function(starttime,endtime,dob){
		 var startDate = starttime!=''?moment(starttime).format('YYYY-MM-DD'):'';
		 var endDate = endtime!=''?moment(endtime).format('YYYY-MM-DD'):'';
		 var maxtime = moment(startDate+' '+'20:00');

		 var error = '';
		 if(moment(endDate) > moment(startDate)){
			error = 'You are planning a below 18 year old employee after 20h00, which is legally not allowed. We suggest you to replan.'
		 }else{
			 if(starttime!= '' && moment(starttime)>moment(maxtime)){
				error = 'You are planning a below 18 year old employee after 20h00, which is legally not allowed. We suggest you to replan.' 
			 }else if(endtime!= '' && moment(endtime)>moment(maxtime)){
			 	error = 'You are planning a below 18 year old employee after 20h00, which is legally not allowed. We suggest you to replan.' 

			 }
		 }

			// error = 'You are planning a below 18 year old employee after 20h00, which is legally not allowed. We suggest you to replan.'
		// }
		return error;

	}
};
export default TimeValidationService;
