export default function  phoneValidation(text) {
  var pattern = new RegExp(/^[0-9\b\+\-\(\)]+$/);
  if (!pattern.test(text)) {
   return false;
  }
  else {
    return true;
  }
}
