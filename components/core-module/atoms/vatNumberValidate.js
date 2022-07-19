export default function  vatNumberVaidate(text) {
  var pattern = new RegExp(/^[0-9\b\+\-\(\)]+$/);
var  be_str = text.substring(0, 2);
var  num_str = text.substring(2);
  if (be_str[0].toLowerCase() === 'b' && be_str[1].toLowerCase() === 'e' && pattern.test(num_str) && num_str.length < 11) {
   return true;
  }
  else {
    return false;
  }
}
