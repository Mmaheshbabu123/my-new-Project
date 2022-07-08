export default function  postalCodeVaidate(text) {
  var pattern = new RegExp(/^[0-9\b\+\-\(\)]+$/);
  console.log(text.length);
  console.log(pattern.test(text));
  if (pattern.test(text) && text.length < 7) {
   return true;
  }
  else {
    return false;
  }
}
