
export const ENV_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
export const REGEX_URL = '/api/';
export const BASE_URL = ENV_URL + REGEX_URL;

export const ENV_DRUPAL= process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/';
export const BASE_URL_DRUPAL = ENV_DRUPAL + REGEX_URL;



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


//------------Time Registration--------------------------------//
export const checkPinCode= BASE_URL+ "hasPincode/";

//------------Drupal ------------------------------//
export const homeScreen= ENV_DRUPAL+ "dashboard/url";

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
export const fetchPlannedTimings = BASE_URL + "fetch-planned-timings/"
export const storePlannedTimings = BASE_URL + "store-planned-timings"
export const updateProject = BASE_URL + "updateProject";
export const updateEditproject = BASE_URL + "updateproject"




//--------------PLANNING FETCHING----------------------------------//
export const fetchPlanning = BASE_URL + "fetch-planning-details/";
export const fetchproject = BASE_URL + "fetch-project/";
export const fetchallproject = BASE_URL + "fetch-all-project";
export const fetchallarchivedprojects = BASE_URL + "fetch-all-archived-project"
export const fetchprojectbyid = BASE_URL + "getproject/"
export const planningfinalize = BASE_URL + "planning-finalize"
export const fetchEmpDetails = BASE_URL + "fetch-emp-details/"
export const updateEmployeePlanning = BASE_URL + "update-employee-planning"
export const getPlanningEmployee = BASE_URL + "get-planningemployee/"
export const fetchEmployeeList =  BASE_URL + "getEmployeeByUsingCompanyId/"
export const fetchPlanningEmployee =  BASE_URL + "get-planning-employee/"
export const fetchPlanningFunction =  BASE_URL + "get-planning-functions/"








//--------------Manage Planning-----------------------------------//
export const getWeeklyPlanning = BASE_URL + "get-weekly-planning/";
export const getEmployeerCompanylist = BASE_URL + "get-employer-comp-details/";




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
export const getCooperationAgreementsTabs = BASE_URL + "get-coprtn-ags-tabs";
export const fetchAbsoluteYouAgentData = BASE_URL + "fetch-absolute-agent-data";
export const fetchPcLinkedEmployeeTypes = BASE_URL + "fetch-pclinked-employee-types";
export const getPcLinkedCoeffData = BASE_URL + "get-pclinked-coeff-data";
export const fetchSalaryBenefitsPerPc = BASE_URL + "get-salary-benefits-per-pc";
export const saveCooperationDataTabWise = BASE_URL + "save-cooperationdata-tab-wise";
export const getCooperationAgreementsTabWise = BASE_URL + "get-cooperation-agreements";
export const getDefaultOptionsData = BASE_URL + "getDefaultOptionsData";
export const checkAccess = BASE_URL + "check-access";
//------------------- @
//-------------------
//--------EMPLOYER COOPERATION AGREEMENTS------------//
export const fetchCompaniesBasedOnEmployer = BASE_URL + "get-employeer-agreements-data";
export const saveRequestedCompanies = BASE_URL + "save-requested-companies";
export const fetchRequestOverview = BASE_URL + "get-all-agreement-requests";
export const deleteCooperationAgreement = BASE_URL + "delete-cooperation-agreement";

//------SALES AGENT COOPERATION AGREEMENTS -------//
export const fetchSalesAgenetAgreements = BASE_URL + "get-sales-agent-agreement-requests";
export const saveSalesAgentSvData = BASE_URL + "save-agent-assigned-data";
export const deleteSalesAgenetAgreements = BASE_URL + "delete-sales-agent-agreement-request";

//-----------EMPLOYEE PLANNING---------------------//
export const fetchemployeeplanning = BASE_URL + "get-all-employee-planning/";

//-- SIGNATURE API END POINTS----------------//
export const getSignatureData = BASE_URL + 'get-signature-data';
export const storeUpdateSignatureData = BASE_URL + 'store-update-signature-data';
export const deleteSignatureData = BASE_URL + 'delete-signature-data';
//-- -------------

//------ COOPERATION_PDF_URL's-----------------------//
export const cooperationAgreementPreview = BASE_URL + 'cooperation-agreement-preview';
export const sendToEmployer = BASE_URL + 'send-to-employer';
export const updateEmployerSign = BASE_URL + 'employer-sign-update';
export const checkEmployerSignature = BASE_URL + 'check-employer-signature';
export const authenticateEmployer = BASE_URL + 'authenticate-employer';
//------


//----- BBRIGHT_API-------------------------//
export const fecthCompanyDetailsByVatNum = BASE_URL + 'enterprise-get-companydetails-by-vat';

//---------------ADDITIONAL DOCUMENTS---------------//
export const fetchAdditionalDocuments = BASE_URL + 'fetch-additional-docs';
export const updateAdditionalDocuments = BASE_URL + 'update-additional-docs';
export const deleteAdditionalDocuments = BASE_URL + 'delete-additional-docs';
export const storeAdditionalDocuments = BASE_URL + 'store-additional-docs';
export const downloadAdditionalDocuments = BASE_URL + 'download-additional-docs';
export const deleteUploadedFiles = BASE_URL + 'delete-files';
export const uploadAdditionalDocs = BASE_URL + 'upload-additional-docs';
export const uploadFiles = BASE_URL + 'upload-files';
export const downloadSvAsPdf = BASE_URL + 'download-cooperation-agreement-pdf';
//---------------


//---------------Composition coeffcients-------------//
export const fetchCompositions = BASE_URL + "get-compositions";
export const createCompositions = BASE_URL + "create-compositions";
export const updateCompositions = BASE_URL + "update-compositions";
export const deleteCompositions = BASE_URL + "delete-compositions";
//----------------------


//------------------ V1 Document -------------------------//
export const getCompaniesByEmployee = BASE_URL + "get-companies-by-employee";
export const v1DocumentPreview = BASE_URL + "v1-document-preview";
export const saveV1Document = BASE_URL + "save-v1-document";
export const getEmployerIdByCompanyId = BASE_URL + "get-employerid-by-company";
export const checkEmployeeCompV1Status = BASE_URL + "check-employee-company-v1-status";
export const getSignedV1Documents = BASE_URL + "get-signed-v1-documents";
export const downloadV1Documents = BASE_URL + "download-v1-documents";
//--------------------------

//------------------- QR CODE--------------------//
export const getCompanyLocationByEmployerId = BASE_URL + "get-company-locations";
export const downloadQrCode = BASE_URL + "download-qr-code";
export const regenerateQrCode = BASE_URL + "regenerate-qr-code";
//-------------------

//----------------- TODOS ---------------//
export const getMyTodos = BASE_URL + 'get-mytodos';
export const labourTodoFileUpload = BASE_URL + 'upload-labour-files';
export const saveLabourTodoFile = BASE_URL + 'save-labour-todo-files';
export const labourShareDocPreview = BASE_URL + 'labour-share-doc-preview';
export const updateEmployerSignOnLabourDoc = BASE_URL + 'update-employer-sign-labour-doc';
//-----------------
//-----------------

//------------------- Notifications --------------------//
export const getNotificationsCount = BASE_URL + "get-notifications-count";
export const getNotifications = BASE_URL + "get-notifications-data";
export const updateNotificationStatus = BASE_URL + "update-notifications";
export const deleteNotifications = BASE_URL + "delete-notifications";
//------------------

//-------------EMPLOYEERSTOPPLANNING-------//
export const getStopPlanningDetails = BASE_URL + 'getStopPlanningDetails/';
export const postStopPlanningDetails = BASE_URL + 'postEmployeerStopPlanningDetails';
//-----------
//----- Salary Flex worker---------------//
export const manageMinFlexWorkerSalary = BASE_URL + 'manage-min-salary-of-flex-worker';
//-----

export const updateEmployeesubmitDetails = BASE_URL + 'update-employee-submit-details';

// ----------------Encodage validations-----------------------//
export const fetchEncodageDeatils = BASE_URL + "get-all-encodage-planning";

//----------Dashboard end points ------------------//
export const getdashboardtiles = BASE_URL_DRUPAL + "dashboard-tiles-roles";

// ----------------------- Indexation of salary --------------------//
export const addIndexationOfSalary = BASE_URL + "add-indexation-of-salary";
export const getIndexationOfSalary = BASE_URL + "fetch-all-indexation-salary";

//-------------------------Add Planning---------------------------//
export const getPlanning = BASE_URL + "fetch-add-planning-details/";
