export default function  vatRateValidate(text) {
  var pattern = new RegExp(/^\d*(,\d{3})*(\.\d*)?$/);
  var last_char = text.charAt(text.length-1);
  //const isNumber = x => !!`${x}`.match(/^\d*(,\d{3})*(\.\d*)?$/)
  var numeric_text = text.slice(0, -1);

  if (pattern.test(numeric_text) && last_char === '%') {
   return true;
  }
  else {
    return false;
  }
}
