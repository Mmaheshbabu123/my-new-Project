export default function dateValidate(text) {
  let year = (text || '').split('-')[0];
  return (year && year.length < 5) ? true : false;
}
