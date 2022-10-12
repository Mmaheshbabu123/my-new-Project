var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
      label: `${dd < 10 ? '0' + dd : dd}-${mm < 10 ? '0' + mm : mm}-${yyyy}`
    })
  }
  return dateOptions;
}

export function getLastTwelveMonths() {
  let date = new Date();
  let dateOptions = [{ value: 0, label: '--Select--' }];
  date = new Date(date.getFullYear(), date.getMonth(), 1);
  for (let i = 0; i <= 11; i++) {
    dateOptions.push({
      value: date.getTime(),
      lastValue: new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime(),
      label: monthName[date.getMonth()] + ' ' + date.getFullYear()
    })
    date.setMonth(date.getMonth() - 1);
  }
  return dateOptions;
}
