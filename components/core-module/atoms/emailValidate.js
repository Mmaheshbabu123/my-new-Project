export default function  emailValidate(text) {

  var mailformat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
  if (mailformat.test(text.toLowerCase())) {
    return true;
  }
  else {
    return false;
  }
}
