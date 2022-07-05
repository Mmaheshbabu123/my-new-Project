import {
    ABSOLUTEYOU_AGENT_TAB
  , COMPANY_INFORMATION_TAB
  , CONTACT_PERSONS_TAB
  , ONLINE_DETAILS_TAB
  , SALARY_BENEFITS_TAB
  , INVOIING_TAB
} from '../Definations';
import { requiredFields } from '../RequiredFields';

const {
  tab_1,
  tab_2,
  tab_3,
  tab_4,
  tab_5,
  tab_6
} = requiredFields;

export const validationService = {
  proceedToNextStepTab,
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

      break;
    case CONTACT_PERSONS_TAB:

      break;
    case ONLINE_DETAILS_TAB:

      break;
    case SALARY_BENEFITS_TAB:

      break;
    case INVOIING_TAB:

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
