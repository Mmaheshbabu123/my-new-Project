export default function  vatNumberVaidate(text) {
  var pattern = new RegExp(/^[0-9\b\+\-\(\)]+$/);
  var pattern1 = new RegExp(/^((BE)|\d{10})+$/);
  var pattern2 = new RegExp(/^((BE)|\d{3}[.,\s]\d{3}[.,\s]\d{3})+$/);//BE123.456.001
  var pattern3 = new RegExp(/^((BE)|[1-9]{1}[0-9]{13})+$/);

  if(pattern1.test(text) || pattern2.test(text)  ) {
    return true;
  }
  else{
    return false;
  }
// var  be_str = text.substring(0, 2);
// var  num_str = text.substring(2);
//   if (be_str[0].toLowerCase() === 'b' && be_str[1].toLowerCase() === 'e' && pattern.test(num_str) && num_str.length < 11) {
//    return true;
//   }
//   else {
//     return false;
//   }
}
