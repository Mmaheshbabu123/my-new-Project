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
	}
};
export default TimeValidationService;
