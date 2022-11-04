
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
// const proxy_url = "https://cors-anywhere.herokuapp.com/";
const proxy_url = "https://api.allorigins.win/raw?url=";

export const APICALL = {
    service,
    serviceForSitesJSON,
    headers,
    get_url_extension,
    proxy_url,

};
function get_url_extension( url ){
    return (url) ? url.split(/[#?]/)[0].split('.').pop().trim() : "";
}

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
function service(urlendpoint = '', httpmethod = '', data = '', file = 0, loading = 1, customHeaders = {}) {
    return fetch(urlendpoint, headers(data, httpmethod, customHeaders))
        .then(
            result => {
              return file ? result.blob() : result.json();
            }
        ).catch((error) => {
            console.log("Error service : ", error);
            return null;
        })
}
/*
*Getting headers for the Ajax
*@param data =data to the API
*@param httpmethod=METHOD
*returns headers for the Ajax
*/
function headers(data, httpmethod, customHeaders) {


    var header = {
        // *GET, POST, PUT, DELETE, etc.
        method: httpmethod,
        // no-cors, cors, *same-origin
        // mode: "no-cors",
       // withCredentials: true,
        // *default, no-cache, reload, force-cache, only-if-cached
        //cache: "no-cache",
        // include, *same-origin, omit
       // credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + process.env.REACT_APP_AUTHENTICATION_TOKEN,
            // 'Access-Control-Allow-Origin': '*',
            //"Authorization-id": Authorization_id,
            // "Language-id" : reduxState.active_language,

            // 'X-Authenticated-Userid': '15000500000@1',

            // "Content-Type": "application/x-www-form-urlencoded",
            // 'Content-Type': 'multipart/form-data',
        },
        ...customHeaders
        // manual, *follow, error
//        redirect: "follow",
        // no-referrer, *client
       // referrer: "no-referrer",
    }
    if (httpmethod !== 'GET') {
        // body data type must match "Content-Type" header
        //console.log(httpmethod, " : body : ", data);
        header.body = JSON.stringify(data);
    }
    return header;
}
