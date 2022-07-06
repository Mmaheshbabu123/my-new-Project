
export const ENV_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
export const REGEX_URL = 'api/';
export const BASE_URL = ENV_URL + REGEX_URL;

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';
export const WithoutAppUrl = BASE_URL + "getParitairecommittes";
export const getPcByPcnumber = BASE_URL + "getpc/"
export const getPcByUniquekey = BASE_URL + "getpc-by-uniquekey/"

//-------------Manage FUNCTION API ROUTES---------------------//
export const addFunction = BASE_URL + "addfunction";
export const getFunctions = BASE_URL + "getFunctions";
export const deleteFunction = BASE_URL + "updateFunction";
export const fetchFunction = BASE_URL + "get-function/";
export const updateFunction = BASE_URL + "update-function";




//--------------CATEGORY API ROUTES ----------------//
export const getCat = BASE_URL + "getcat/";
export const updateCategory = BASE_URL + "updateCategory";
export const catUpdate = BASE_URL + "categoryupdate"
export const getCategory = BASE_URL + "getCategory";
export const storeCategoryDetails = BASE_URL + "addcategory";

//--------------PC API ROUTES ----------------//
export const getPcOverviewDetails = BASE_URL + "getParitaireCommitteFunctionCategory";
export const addPc = BASE_URL + "addpc"
export const updatePc = BASE_URL + "pc-update/"
export const getAllPc = BASE_URL + "get-all-pcs";
export const deletePcdetails = BASE_URL + "delete-pc/";




//----- EMPLOYEE TYPE and COEFFICIENT API ROUTES -----//
export const fetchEmployeeTypes = BASE_URL + "get-employee-types";
export const createEmployeeTypes = BASE_URL + "create-employee-types";
export const editEmployeeType = BASE_URL + "edit-employee-type";
export const deleteEmployeeType = BASE_URL + "delete-employee-type";
export const fecthCoefficientTypes = BASE_URL + "get-cofficent-types";
export const editCofficientType = BASE_URL + "edit-cofficent-types";
export const deleteCoefficientType = BASE_URL + "delete-cofficent-type";
export const createCofficientType = BASE_URL + "create-cofficent-types";
export const getAllEmpCoeffAndValueTypes = BASE_URL + "get-coeff-empl-valuetypes";
export const savePcLinkingData = BASE_URL + "save-pclinking-data";


//-----


//--------------PLANNING API ROUTES ----------------//
export const add_manage_planning = BASE_URL + "/planning";
export const addPlanning = BASE_URL + "addplanning";
export const addProject = BASE_URL + "addproject";
export const Selectemployee = BASE_URL + "selectemployee";
export const Weeklyplanning = BASE_URL + "weeklyplanning";
export const Addplanningfunction = BASE_URL + "add-planningfunction";
export const Timeregistration = BASE_URL + "time-registration";
export const Resetpin = BASE_URL + "pincode-reset";
export const Addcostcenter = BASE_URL + "addCostCenter";
export const employeetyplanning = BASE_URL + "addemployeetoplanning";
export const addplanningemployee = BASE_URL + "addplanningemployee";
export const planningoverview = BASE_URL + "planningdetails-by-uniquekey/";


//--------------PLANNING FETCHING----------------------------------//
export const fetchPlanning = BASE_URL + "fetch-planning-details/";

//--------------Manage Planning-----------------------------------//
export const getweekly_planning = BASE_URL + "getweekly_planning/";



//--------------PC min age API ROUTES ----------------//
export const addAge = BASE_URL + "add-age";
export const getAge = BASE_URL + "get-pc-age/";
export const updateAge = BASE_URL + "update-pc-age";

//--------------PC employee type ROUTES --------------------//
export const storePcEmployeeTypes = BASE_URL + 'add-pc-emptype';
export const getPcEmployeeTypes = BASE_URL + "fetch-pc-employee_type/";
export const updatePcEmployeeTypes = BASE_URL + "update-pc-emptype";
export const getCofficientPerPc = BASE_URL + "get-linking-coff-pc-data";
export const delteCofficientPerPc = BASE_URL + "delete-pc-linking-data";
export const Addfunction = BASE_URL + "addfunction";

//--------------PC salary benifits ROUTES --------------------//
export const getPcSalaryBenefits = BASE_URL + "get-pc-sal-benifits/";
export const storePcSalBenifits = BASE_URL + "store-pc-sal-benifits";





//------------------HEADER AND FOOTER-------------------------//
export const header = BASE_URL + "header";
export const footer = BASE_URL + "footer";



//----SALARY BENEFITS ROUTES-----//
export const fetchSalaryBenefits = BASE_URL + "get-salary-benefits";
export const createSalaryBenefits = BASE_URL + "create-salary-benefits";
export const updateSalaryBenefits = BASE_URL + "update-salary-benefits";
export const deleteSalaryBenefits = BASE_URL + "delete-salary-benefits";
//------------------- @


//---- COOPERATION AGREEMENTS ROUTES -----//
export const getCooperationAgreementsTabs = BASE_URL  + "get-coprtn-ags-tabs";
export const fetchAbsoluteYouAgentData = BASE_URL  + "fetch-absolute-agent-data";
export const fetchPcLinkedEmployeeTypes = BASE_URL + "fetch-pclinked-employee-types";
export const getPcLinkedCoeffData = BASE_URL + "get-pclinked-coeff-data";
export const fetchSalaryBenefitsPerPc = BASE_URL + "get-salary-benefits-per-pc";
export const saveCooperationDataTabWise = BASE_URL + "save-cooperationdata-tab-wise";
export const getCooperationAgreementsTabWise = BASE_URL + "get-cooperation-agreements";
//------------------- @
