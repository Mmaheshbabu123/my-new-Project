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
}
