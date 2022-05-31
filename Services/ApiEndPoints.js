
export const ENV_URL = process.env.REACT_APP_BACKEND_URL;
export const REGEX_URL = 'api/v1/';
export const BASE_URL = ENV_URL + REGEX_URL;


// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';
export const getMalfunctionAndWorksData = BASE_URL + 'malfunction-and-works/list';
export const getNewsData = BASE_URL + 'news/list';
export const getEventData = BASE_URL + 'event/list';
export const getTerminateContract = BASE_URL + 'terminate-contract';
export const getMeterReadingValidations = BASE_URL + 'meter-reading/list';