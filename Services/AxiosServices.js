// import axios from 'axios';

/**
 * Below is the usage of service function
 * import APICALL from {../give-proper-path-whearver you are importing it}
 * URLENDPOINT is the ENDPOINT of the API CAll
 * httpmethod can be GET, PUT, POST, DELETE etc.
 * data is the json object which you want to send to the backend using post, put, delete and update methods
 * APICALL.service(URLENDPOINT, httpmethod, data)
 *  .then(result => {
 *  use ur result.json()  object here whatever you want to do.
 * })  
 */

export const APICALL = {
    service,
    serviceForSitesJSON,
    headers

};


/*
this is for the fetch which will return the sites JSON,which will be executed bofore fetching the ,
since at that time we're using env file to get the backend url,
therefore writing a separate function for that.
*/

/*
*Call to the API
*@param urlendpoint=urlendpoint of the API
*@param httpmethod=METHOD
*@param data=data to the API
*@returns response from the APIsettings
*/
function serviceForSitesJSON(urlendpoint = '', httpmethod = '', data = '') {
    // Default options are marked with *
    return fetch(process.env.REACT_APP_serverURL + urlendpoint, headers(data, httpmethod))
        .then(
            // parses JSON response into native Javascript objects
            result => result.json()
        )
        .then(
            result => { return result }
        );
}
/*
*Call to the API
*@param urlendpoint=urlendpoint of the API
*@param httpmethod=METHOD
*@param data=data to the API
*@returns response from the API
*/
async function service(
  urlendpoint = "",
  httpmethod = "",
  data = "",
  file = 0,
  loading = 1
) {
    if (loading === 1 && document.getElementById("loading-icon") !== null) {
        document
            .getElementById("loading-icon")
            .setAttribute("style", "display:block;");
    }


  if (httpmethod == "POST") {
    return await axios
      .post(urlendpoint, data, headers())
      .then((result) => {
        console.log(result.data);
         if ( loading === 1 && document.getElementById("loading-icon") !== null ) {
           document.getElementById("loading-icon").setAttribute("style", "display:none;");
         }
        return file ? result.blob() : result.data;
      })
      .catch((error) => {
        console.log("Error service : ", error);
           if ( loading === 1 && document.getElementById("loading-icon") !== null ) {
             document.getElementById("loading-icon").setAttribute("style", "display:none;");
           }
        return null;
      });
  } else {
    return await axios
      .get(urlendpoint, headers())
      .then((result) => {
        if (loading === 1 && document.getElementById("loading-icon") !== null) {
            document.getElementById("loading-icon").setAttribute("style", "display:none;");
        }
        return file ? result.blob() : result.data;
      })
      .catch((error) => {
        console.log("Error service : ", error);
          if (loading === 1 && document.getElementById("loading-icon") !== null) {
              document.getElementById("loading-icon").setAttribute("style", "display:none;");
          }
        return null;
      });
  }
}
/*
*Getting headers for the Ajax
*@param data =data to the API
*@param httpmethod=METHOD
*returns headers for the Ajax
*/
function headers() {


    var header = {
        // *GET, POST, PUT, DELETE, etc.
      //  method: httpmethod,
        // no-cors, cors, *same-origin
        mode: "no-cors",
       // withCredentials: true,
        // *default, no-cache, reload, force-cache, only-if-cached
        //cache: "no-cache",
        // include, *same-origin, omit
       // credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer aAqbVgy30qDmSqT0m32rB2xON0EE_3OW",
            'Access-Control-Allow-Origin': '*',
            //"Authorization-id": Authorization_id,
            // "Language-id" : reduxState.active_language,

            // 'X-Authenticated-Userid': '15000500000@1',

            // "Content-Type": "application/x-www-form-urlencoded",
            'Content-Type': 'multipart/form-data',
        },
        // manual, *follow, error
//        redirect: "follow",
        // no-referrer, *client
       // referrer: "no-referrer",
    }
    return header;
}
