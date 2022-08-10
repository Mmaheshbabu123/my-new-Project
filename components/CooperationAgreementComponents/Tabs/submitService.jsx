import {
    ABSOLUTEYOU_AGENT_TAB
  , COMPANY_INFORMATION_TAB
  , CONTACT_PERSONS_TAB
  , ONLINE_DETAILS_TAB
  , SALARY_BENEFITS_TAB
  , INVOIING_TAB
} from '../Definations';
import { requiredFields } from '../RequiredFields';
import numericValidate  from '@/atoms/phoneNumberValidate';
import emailValidate from '@/atoms/emailValidate';
import postalCodeValidate from '@/atoms/postalCodeValidate';
import urlValidate from '@/atoms/urlValidate';
import vatNumberVaidate from '@/atoms/vatNumberValidate';
import vatRateValidate from '@/atoms/vatRateValidate';
const {
  tab_1,
  tab_2,
  tab_3,
  tab_4,
  tab_5,
  tab_6
} = requiredFields;
import { APICALL } from '@/Services/ApiServices';
import { saveCooperationDataTabWise } from '@/Services/ApiEndPoints';

export const submitService = {
  proceedToNextStepTab,
  absoluteYouPostData,
  companyInformationPostData,
  onlineDetailsPostData,
  invoiceDetailsPostData,
  contractPersonsPostData,
  forWardToNextStepTab,
  keepActiveClassOnSelectedTabId
}


let stateObj = {};
let selectedTabKey;
let validationStatus;
let updateStateChanges;
let selectedTabId = 1;


function proceedToNextStepTab() {
  selectedTabKey = selectedTabId || 0;
  validationStatus = true;
  switch (selectedTabKey) {
    case ABSOLUTEYOU_AGENT_TAB:
      validationStatus = checkAbsoluteAgentTabValidation();
      break;
    case COMPANY_INFORMATION_TAB:
      validationStatus = checkCompanyInformationTabValidation(tab_2,'tab_2');
      break;
    case CONTACT_PERSONS_TAB:
      validationStatus = checkContactPersonsTabValidation(tab_3,'tab_3');
      break;
    case ONLINE_DETAILS_TAB:
      validationStatus = checkOnlineDetailsValidation(tab_4,'tab_4');
      break;
    case SALARY_BENEFITS_TAB:
      validationStatus = true;
      break;
    case INVOIING_TAB:
      validationStatus = checkInvoiceValidation(tab_6,'tab_6');
      break;
    default:
      validationStatus = true;
  }
  return validationStatus;
}

var startDateAgreement    = 1;
var absoluteConsultant    = 2;
var absoluteConsultantNum = 3;
function checkAbsoluteAgentTabValidation() {
  let basicDetailsFilled = true;
  let tabStateObj = stateObj['tab_1'];
  let validations = tabStateObj['validations'];
  if(!checkBasicFieldAbsoluteTab(validations, tabStateObj)) {
    basicDetailsFilled = false;
  }
  let compStateObj = stateObj['workersServantsCompState'] || {};
  let noPcWarning = compStateObj['noPcWarning'];
  let contextWS = tabStateObj['worksServantsData'] || {};
  let stateWS = {pc_id: compStateObj['selectedPc'] || 0, employee_type_id: compStateObj['selectedEmpId'] || 0};
  let employeeTyperError = checkEachPcHasEmployeetypeOrNot(stateWS);
  if(employeeTyperError[1] || employeeTyperError[2]) {
    compStateObj['employeeTyperError'] = employeeTyperError;
    updateStateChanges({workersServantsCompState: compStateObj, uniqueId: Math.random()});
    validationStatus = false;
    return validationStatus;
  }
  validationStatus = loopAndCheckLength(contextWS, noPcWarning);
  if(!validationStatus) {
    let { employee_type_id } = stateWS;
    validationStatus = loopAndCheckLength(employee_type_id, noPcWarning);
    // if(!validationStatus)
      // updateStateChanges({workersServantsCompState: compStateObj, uniqueId: Math.random()});
  }
  return basicDetailsFilled && validationStatus ? true : false;
}

function checkBasicFieldAbsoluteTab(validations, tabStateObj) {
  let proceed = true;
  Object.keys(tab_1).map(eachField => {
    if(!tabStateObj[eachField]) {
      proceed = false;
      validations[eachField] = true;
    }
    return 1;
  })
  return proceed;
}

function loopAndCheckLength(obj, validations) {
  let tempStatus = false;
  Object.values(obj).map((workersServant, index) => {
      if(workersServant.length && !tempStatus) {
        tempStatus = true;
        validations[1] = false;
        validations[2] = false;
      } else {
        validations[index + 1] = true;
      }
    return 1;
  })
  return tempStatus;
}

function checkEachPcHasEmployeetypeOrNot(stateWS) {
  let errorObj = {1:false, 2: false};
  if(stateWS['pc_id']) {
    Object.keys(stateWS['pc_id']).map(type => {
      if(stateWS['pc_id'][type]) {
        if(stateWS['employee_type_id'] && stateWS['employee_type_id'][type] && stateWS['employee_type_id'][type].length)
          errorObj[type] = false;
        else
          errorObj[type] = true;
      }
    return 1;
    })
  }
  return errorObj;
}


function checkCompanyInformationTabValidation(tab_data,tab_key) {
    let validationObj = stateObj[tab_key]['validations'];
      let stateData = stateObj[tab_key];
    var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key,stateData);
    var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key,stateData);

  return  requiredFields && validateFileds;

}
function checkContactPersonsTabValidation(tab_data,tab_key) {
  let validationObj  = stateObj[tab_key]['validations'];
  let contractObj = stateObj[tab_key];
  const selectPersonId = contractObj['selected_person_id'] || 0;
  var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key,contractObj);
  var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key,contractObj);
  
  return  requiredFields && validateFileds;
}
function checkOnlineDetailsValidation(tab_data,tab_key) {
    let validationObj = stateObj[tab_key]['validations'];
    let stateData = stateObj[tab_key];
    var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key,stateData);
    var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key,stateData);
  return  requiredFields && validateFileds;
}
function checkInvoiceValidation (tab_data,tab_key) {
  let validationObj = stateObj[tab_key]['validations'];
  let stateData = stateObj[tab_key];
  var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key,stateData);
  var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key,stateData);
return  requiredFields && validateFileds;

}

function checkRequiredKeyExistStateValue(tab_data,tab_key,stateData) {
  let tempSatatus = true;
for(const key in tab_data) {
 if(stateData.hasOwnProperty(key)
 && stateData[key] != ''  && stateData[key] != null ) {
   stateData['required'][key] = true;
   tempSatatus = true;
 }
 else{
    stateData['required'][key] = false;
   tempSatatus = false;
   //break;
 }
}

return !Object.values(stateData['required']).includes(false);

}

function checkValidationFields(key,value,type,tab_key,stateData) {
  if(type === 1 && numericValidate(value)) {
  stateData['validations'][key]['validate'] = false;
 }
  else if(type === 2 && emailValidate(value)) {

    stateData['validations'][key]['validate'] = false;
  }
  else if(type === 3 && postalCodeValidate(value)) {
    stateData['validations'][key]['validate'] = false;
  }
  else if(type === 4 && urlValidate(value)) {
     stateData['validations'][key]['validate'] = false;

  }
  else if(type === 5 && vatNumberVaidate(value) ) {
     stateData['validations'][key]['validate'] = false;
  }
  else if(type === 6 && vatRateValidate(value)) {
   stateData['validations'][key]['validate'] = false;
  }
  else  {
     stateData['validations'][key]['validate'] = true;
  }
}
function checkValidationFieldsEachTab(validationObj,tab_key,stateData) {
  Object.keys(validationObj).map((key)=>{
    var value = stateData[key] || '';
    var type  = validationObj[key]['type'];
     if(value) {

       checkValidationFields(key,value,type,tab_key,stateData);
     }
     else {
       stateData['validations'][key]['validate'] = false;
     }
  })

  return validationsObjCheckStatus(stateData['validations']);
}
function absoluteYouPostData(state) {
  let workers = 1;
  let servants = 2;
  let data = {...state['tab_1']};
  let alreadyLinkedIds = state['alreadyLinked'];
  let workersServantsCompState = {...state['workersServantsCompState']}
  let selectedPc    = workersServantsCompState['selectedPc'] || {};
  let selectedEmpId = workersServantsCompState['selectedEmpId'] || {};
  if(selectedEmpId[workers] && selectedEmpId[workers].length && !alreadyLinkedIds.includes(selectedPc[workers])) {
    data['worksServantsData'][workers].push(insertObj(selectedPc, selectedEmpId, workers));
  }
  if(selectedEmpId[servants] && selectedEmpId[servants].length && !alreadyLinkedIds.includes(selectedPc[servants])) {
    data['worksServantsData'][servants].push(insertObj(selectedPc, selectedEmpId, servants))
  }
  let coeffPageData = state['coeffPageData'] || {};
  let selectedPcId = coeffPageData.selectedPc || 0;
  data['coeffPageDataPc'] = selectedPcId;
  return data;
}
function validationsObjCheckStatus (validate_data) {

  let tempSatatus = true;
  for(const key in validate_data) {
    if(validate_data[key]['validate']) {
      tempSatatus = false;
      break
    }
  }
  return tempSatatus;
}

function insertObj(selectedPc, selectedEmpId, type) {
  return { pc_id: selectedPc[type], employee_type_id: selectedEmpId[type], tab_id: 1, type: type }
}

function companyInformationPostData(state,tab_key) {
  let data = structuredClone(state);
  return   removeValidatioKeyState(data[tab_key])

}
 function onlineDetailsPostData(state,tab_key) {
   let data = structuredClone(state);
   return   removeValidatioKeyState(data[tab_key])
 }
 function invoiceDetailsPostData(state,tab_key) {
    let data = structuredClone(state);
   return   removeValidatioKeyState(data[tab_key])
 }
 function contractPersonsPostData(state,tab_key) {
   console.log(state)
   let data = structuredClone(state[tab_key]);
   const selectedPersonId = data['selected_person_id'] || 0;
   console.log(selectedPersonId)
   let obj = {};
    delete data['selected_person_id'];
      removeValidatioKeyState(data);
  obj['persons'] = data;
  obj['selected_id'] = selectedPersonId;
 return obj;
 }
function removeValidatioKeyState(postData) {
  delete postData['validations'];
  delete postData['required'];
   return postData;
}

function checkValidationContractPersons(tab_key,selectPersonId) {
 let tempStatus = true;
 let contractObj = stateObj[tab_key];
let validationObj;

 //delete contractObj['validations'];
 for(const key in contractObj) {
   validationObj = contractObj['validations'] || {} ;

   if(validationObj)
   if(!checkValidationFieldsEachTab(validationObj,tab_key,contractObj)) {
     tempStatus = false;
     break;
   };

  }

 return tempStatus;
}

function checkRequiredContractPersons(tab_data,tab_key,selectPersonId) {
  let tempStatus = true;
  let contractObj = stateObj[tab_key];
  let validationObj;
  for(const key in contractObj) {

    if(!checkRequiredKeyExistStateValue(tab_data,tab_key,contractObj) && key !== 'loaded') {
      tempStatus = false;
      break;
    };

   }

  return tempStatus;
 }




//--------------------------- SAVE/---FORWARD-TO-NEXT-STEP--/--SAVE AS DRAFT METHOD-----////

/**
 * [forWardToNextStepTab used for validation and saving cooperation data]
 * @param  {Object} router                      [description]
 * @param  {Object} contextState                [description]
 * @param  {Method reference} contextUpdate     [description]
 * @param  {int} currentTab                     [description]
 * @param  {int} draft                          [description]
 * @return {void}                               [description]
 */
async function forWardToNextStepTab(router, contextState, contextUpdate, currentTab, draft, forwardtabId = 0) {
  addRemoveLoadedClass(1, draft);
  stateObj = contextState;
  selectedTabId = currentTab;
  updateStateChanges = contextUpdate;
  let proceed = draft === 1 ? true : proceedToNextStepTab();
  if(proceed) {
    await saveDataTabWise(saveCooperationDataTabWise).then((response) => {
      addRemoveLoadedClass(0, draft);
      if(response.status === 200) {
        let nextTab = forwardtabId ? forwardtabId : selectedTabId + 1;
        let obj = {
          selectedTabId: nextTab,
          proceedToNextTabWarning: false,
          filledTabs: [...stateObj.filledTabs, nextTab],
          renderTabComponents: false,
        }
        if(selectedTabId === 1) {
          obj['root_parent_id']= response.data;
          router.query.root_parent_id = obj['root_parent_id'];
        }
        if(draft === 1) {
          router.push(`/manage-cooperation-overview?type=sales_agent&id=${stateObj.defaultOptions.agent_details['sales_agent_id']}`);
        }
        if(selectedTabId === INVOIING_TAB && draft !== 1) {
          window.open(`/cooperation-agreement-preview?root_parent_id=${stateObj.root_parent_id}&sales_ref=${stateObj.salesAgentRefId}&type=1`, '_blank');
          router.push(`/manage-cooperation-overview?type=sales_agent&id=${stateObj.defaultOptions.agent_details['sales_agent_id']}`);
        } else {
          router.query.selectedTabId = nextTab;
          router.push(router, undefined, { shallow: true })
          updateStateChanges(obj);
        }
        return proceed;
      } else {
        console.error(response.msg);
        return false;
      }
    }).catch(error => {
      addRemoveLoadedClass(0, draft);
      console.log(error);
      return false;
    })
  } else {
    addRemoveLoadedClass(0, draft);
    updateStateChanges({proceedToNextTabWarning: true});
    return false;
  }
}

/**
 * [saveDataTabWise description]
 * @param  {String} url                 [description]
 * @return {Object}       [description]
 */
async function saveDataTabWise(url) {
  let apiResponse = '';
  await APICALL.service(`${url}`, 'POST', getTabRelatedData())
  .then(response => {
    apiResponse = response;
  })
  return apiResponse;
}

/**
 * [getTabRelatedData description]
 * @return {Object} [description]
 */
function getTabRelatedData() {
  return {
    root_parent_id: stateObj.root_parent_id || 0,
    tab_id: selectedTabId,
    action:stateObj[`tab_${selectedTabId}_action`] || 1,
    data: getTabWisePostData(),
    element_status: stateObj['element_status'][`tab_${selectedTabId}`],
    depedency_data_status:stateObj['dependecyDataStatus'],
    salesAgentRefId: stateObj['salesAgentRefId']
  }
}


/**
 * [getTabWisePostData description]
 * @return {[Object]} [description]
 */
function getTabWisePostData() {
  let data = {}
  switch (selectedTabId) {
    case ABSOLUTEYOU_AGENT_TAB:
      data = absoluteYouPostData(stateObj)
      break;
    case COMPANY_INFORMATION_TAB:
      data = companyInformationPostData(stateObj,'tab_2');
      break;
    case CONTACT_PERSONS_TAB:
      data =  contractPersonsPostData(stateObj,'tab_3');
      break;
    case ONLINE_DETAILS_TAB:
      data = onlineDetailsPostData(stateObj,'tab_4');
      break;
    case SALARY_BENEFITS_TAB:
      data = stateObj['tab_5'];
      break;
    case INVOIING_TAB:
      data = invoiceDetailsPostData(stateObj,'tab_6');
    break;
    default:
      data = {};
  }
  return data;
}

/**
 * [addRemoveLoadedClass description]
 * @param {Number} [add=1]  [description]
 */
function addRemoveLoadedClass(add = 1, draft = 0) {
  document.querySelectorAll(`.sv-save-btn-text_${draft}`).forEach(el =>
    add ? el.classList.add("spinner-border") : el.classList.remove("spinner-border")
  );
}

function keepActiveClassOnSelectedTabId(selectedTabId, clickedTabId) {
  document.getElementById(`cooperation_tab_${selectedTabId}`).classList.add('active')
  document.getElementById(`cooperation_tab_${clickedTabId}`).classList.remove('active')
}

//---------------------------//---------------------------//---------------------------//---------------------------
