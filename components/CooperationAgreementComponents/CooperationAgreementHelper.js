import { APICALL } from '@/Services/ApiServices';

export const helpers = {
  formatDate,
  fetchDataFromBackend
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



async function fetchDataFromBackend(url, root_parent_id, selectedTabId) {
  let postSubmitId = root_parent_id;
  if(!root_parent_id) {
    const urlParams = new URLSearchParams(window.location.search);
    postSubmitId = urlParams.get('root_parent_id');
  }
  let data = {};
  await APICALL.service(`${url}/${postSubmitId}/${selectedTabId}`, 'GET').then(response => {
    if (response.status === 200)
          data = response.data || {};
  }).catch((error) => console.log(error) )
  return data;
}
