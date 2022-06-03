
export const ENV_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
export const REGEX_URL = 'api/';
export const BASE_URL = ENV_URL + REGEX_URL;

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';
export const WithoutAppUrl = BASE_URL + "getParitairecommittes";
export const getPcByPcnumber = BASE_URL + "getpc/"
export const storeCategoryDetails = BASE_URL + "addcategory";
export const getCat = BASE_URL + "getcat/";
export const catUpdate = BASE_URL + "categoryupdate"
export const getCategory = BASE_URL + "getCategory";
export const getFunctions = BASE_URL + "getFunctions";
export const updateFunction = BASE_URL + "updateFunction";
export const updateCategory = BASE_URL + "updateCategory";
export const getPc = BASE_URL + "getParitaireCommitteFunctionCategory";
export const addPc = BASE_URL + "addpc"