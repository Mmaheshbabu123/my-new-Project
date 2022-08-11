import axios from 'axios';
import { ENV_URL, deleteUploadedFiles, uploadFiles } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

export const file = {
  uploadFile,
  removeFile,
  downloadFile
};

async function uploadFile(e, customUrl = '', path = ''){
  var result = {};
  const formData = new FormData();
  for (const key of Object.keys(e.target.files)) {
    formData.append(`file_${key}`, e.target.files[key])
  }
  if(path)
    formData.append('path', path);
  document.getElementById("file_upload_progress").setAttribute("style", "display: not none");
  let url = customUrl || uploadFiles;
  await axios.post(url, formData, { headers: { "Authorization": "Bearer " + 'abs' } })
      .then(response => {
          document.getElementById("file_upload_progress").setAttribute("style", "display:none;");
          result = response.data;
      })
      .catch(error => {
          document.getElementById("file_upload_progress").setAttribute("style", "display:none;");
          console.error(error);
      })
      return result;
}

 async function removeFile(id){
  var url = window.DELETE_UPLOADED_FILE + '/' + id;
  await datasave.service(url, "POST")
      .then(result => {
        return 1;
     })
     .catch(err => {
       return 0;
     })
}

function downloadFile(url, fileName = ''){
  if(!url) return;
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", url, true);
  xmlRequest.responseType = "blob";
  xmlRequest.onload = function(){
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var anchorTag = document.createElement('a');
    anchorTag.href = imageUrl;
    anchorTag.download = fileName ? fileName : Math.random().toString(16).slice(2);
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);
  }
  xmlRequest.send();
}
