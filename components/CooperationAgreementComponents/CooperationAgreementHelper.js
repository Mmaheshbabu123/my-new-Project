export const helpers = {
  formatDate,
}

function formatDate(dateInput, type = 0) {
  if(!dateInput) return '';
  let date = new Date(dateInput);
  let month = date.getUTCMonth() + 1; //months from 1-12
  let day = date.getUTCDate();
  var year = date.getUTCFullYear();
  return  type ? `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
 : `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
