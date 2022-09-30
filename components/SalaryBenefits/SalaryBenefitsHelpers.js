
export function formatDate(dateInput) {
  if(!dateInput) return '';
  let date = new Date(dateInput);
  let month = date.getUTCMonth() + 1; //months from 1-12
  let day = date.getUTCDate();
  var year = date.getUTCFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
}

export function getFutureDates(startDate = new Date(), noOfDays = 5) {
  var dateOptions = [];
  for (var i = 0; i <= noOfDays; i++) {
    var currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    let yyyy = currentDate.getUTCFullYear();
    let mm = currentDate.getUTCMonth() + 1;
    let dd = currentDate.getUTCDate();
    dateOptions.push({
      value: `${yyyy}${mm < 10 ? '0' + mm : mm}${dd < 10 ? '0' + dd : dd}`,
      label: `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
    })
  }
  return dateOptions;
}
