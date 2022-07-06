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
const {
  tab_1,
  tab_2,
  tab_3,
  tab_4,
  tab_5,
  tab_6
} = requiredFields;

export const submitService = {
  proceedToNextStepTab,
  absoluteYouPostData,
}


let stateObj = {};
let selectedTabKey;
let validationStatus;

function proceedToNextStepTab({ state, selectedTabId, ...props }) {
  stateObj = state || {};
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

      break;
    case ONLINE_DETAILS_TAB:
      validationStatus = checkOnlineDetailsValidation(tab_4,'tab_4');
      break;
    case SALARY_BENEFITS_TAB:

      break;
    case INVOIING_TAB:
      validationStatus = checkInvoiceValidation(tab_6,'tab_6');
      break;
    default:
      validationStatus = true;
  }
  return validationStatus;
}

function checkAbsoluteAgentTabValidation() {
  var startDateAgreement    = 1;
  var absoluteConsultant    = 2;
  var absoluteConsultantNum = 3;
  let tabStateObj = stateObj['tab_1'];
  if(!tabStateObj[startDateAgreement] || !tabStateObj[absoluteConsultant] || !tabStateObj[absoluteConsultantNum]) {
    validationStatus = false;
  }
  if(validationStatus) {
    let compStateObj = stateObj['workersServantsCompState'] || {};
    let contextWS = tabStateObj['worksServantsData'] || {};
    let stateWS = {pc_id: compStateObj['selectedPc'] || 0, employee_type_id: compStateObj['selectedEmpId'] || 0};
    validationStatus = loopAndCheckLength(contextWS);
    if(!validationStatus) {
      let { employee_type_id } = stateWS;
      validationStatus = loopAndCheckLength(employee_type_id);
    }
  }
  return validationStatus;
}

function loopAndCheckLength(obj) {
  let tempStatus = false;
  Object.values(obj).map(workersServant => {
      if(workersServant.length && !tempStatus) {
        tempStatus = true;
      }
    return 1;
  })
  return tempStatus;
}


function checkCompanyInformationTabValidation(tab_data,tab_key) {
    let validationObj = stateObj[tab_key]['validations'];
    var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key);
    var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key);
  return  requiredFields && validateFileds;

}
function checkOnlineDetailsValidation(tab_data,tab_key) {
    let validationObj = stateObj[tab_key]['validations'];
    var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key);
    var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key);
  return  requiredFields && validateFileds;
}
function checkInvoiceValidation (tab_data,tab_key) {
  let validationObj = stateObj[tab_key]['validations'];
  var validateFileds = checkValidationFieldsEachTab(validationObj,tab_key);
  var requiredFields = checkRequiredKeyExistStateValue(tab_data,tab_key);
return  requiredFields && validateFileds;

}

function checkRequiredKeyExistStateValue(tab_data,tab_key) {
  let tempSatatus = true;
for(const key in tab_data) {
 if(stateObj[tab_key].hasOwnProperty(key)
 && stateObj[tab_key][key] != '') {
   tempSatatus = true;
 }
 else{
   tempSatatus = false;
   break;
 }
}
return tempSatatus;
}

function checkValidationFields(key,value,type,tab_key) {
  if(type === 1 && numericValidate(value)) {
  stateObj[tab_key]['validations'][key]['validate'] = false;
 }
  else if(type === 2 && emailValidate(value)) {
    stateObj[tab_key]['validations'][key]['validate'] = false;
  }
  else {
     stateObj[tab_key]['validations'][key]['validate'] = true;

  }
}
function checkValidationFieldsEachTab(validationObj,tab_key) {
  Object.keys(validationObj).map((key)=>{
    var value = stateObj[tab_key][key] || '';
    var type  = validationObj[key]['type'];
     if(value) {
       checkValidationFields(key,value,type,tab_key);
     }
  })
  return validationsObjCheckStatus(stateObj[tab_key]['validations']);
}
function absoluteYouPostData(state) {
  let workers = 1;
  let servants = 2;
  let data = {...state['tab_1']};
  let workersServantsCompState = {...state['workersServantsCompState']}
  let selectedPc    = workersServantsCompState['selectedPc'] || {};
  let selectedEmpId = workersServantsCompState['selectedEmpId'] || {};
  if(selectedEmpId[workers] && selectedEmpId[workers].length) {
    data['worksServantsData'][workers].push(insertObj(selectedPc, selectedEmpId, workers));
  }
  if(selectedEmpId[servants] && selectedEmpId[servants].length) {
    data['worksServantsData'][workers].push(insertObj(selectedPc, selectedEmpId, servants))
  }
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
  return { pc_id: selectedPc[type], selectedEmpId: selectedEmpId[type], tab_id: 1, type: type }
}
