import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import styles from './AbsoluteYouAgent/absoluteAgent.module.css';
import { APICALL } from '@/Services/ApiServices';
import { getDefaultOptionsData } from '@/Services/ApiEndPoints'
import { submitService } from './submitService';
import {
  saveCooperationDataTabWise
} from '@/Services/ApiEndPoints';
import {
    ABSOLUTEYOU_AGENT_TAB
  , COMPANY_INFORMATION_TAB
  , CONTACT_PERSONS_TAB
  , ONLINE_DETAILS_TAB
  , SALARY_BENEFITS_TAB
  , INVOIING_TAB
} from '../Definations'

//----Impport each tab dynamically using next/dynamic
import AbsoluteYouAgent from './AbsoluteYouAgent/organisms/AbsoluteYouAgent';
import CompanyInformation from './CompanyInformation/organisms/CompanyInformation';
import OnlineDetails  from './OnlineDetails/organisms/OnlineDetails';
import ContactPersons from './ContactPersons/organisms/ContactPersons';
import Invoicing from './Invoicing/organisms/Invoicing';
import SalaryBenefitsMain  from './SalaryBenefits/organisms/SalaryBenefitsMain';
//----


const TabIndex = (props) => {
	const { state: { selectedTabId ,renderedOptions }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  const router = useRouter();

	/**
   * [showComponentBasedOnTabSelection rendering component according to tab selection]
   * @return {[ReactElement]} [correspoding React component]
   */
  const showComponentBasedOnTabSelection = () => {
    let component;
    switch (selectedTabId) {
      case ABSOLUTEYOU_AGENT_TAB:
        component = <AbsoluteYouAgent />
        break;
      case COMPANY_INFORMATION_TAB:
        component = <CompanyInformation />
        break;
      case CONTACT_PERSONS_TAB:
      component = <ContactPersons />
        break;
      case ONLINE_DETAILS_TAB:
        component = <OnlineDetails />
        break;
      case SALARY_BENEFITS_TAB:
        component = <SalaryBenefitsMain />
        break;
      case INVOIING_TAB:
        component = <Invoicing />
       break;
      default:
        component = <div> Nothing...! </div>
    }
    return component || <> {`Selected tab id: ${selectedTabId}`} </>;
  }
useEffect(()=>{
  if(!state.renderedOptions) {
    loadData();
  }
},[])
const loadData = async () => {
 let data = [];
 let defaultOptions = {...state['defaultOptions']};

  await APICALL.service(getDefaultOptionsData, 'GET').then(response => {
    if (response.status === 200)
      data = response.data || {};
      defaultOptions['countrylist'] = data['countrylist'];
      updateStateChanges({defaultOptions,renderedOptions:1})
  }).catch((error) => console.log(error) )

}

  const forWardToNextStepTab = async () => {
    let proceed = submitService.proceedToNextStepTab({state, selectedTabId, updateStateChanges});
    if(proceed) {
      await saveDataTabWise(state, selectedTabId, saveCooperationDataTabWise).then((response) => {
        if(response.status === 200) {
          let nextTab = selectedTabId + 1;
          let obj = {
            selectedTabId: nextTab,
            proceedToNextTabWarning: false,
            filledTabs: [...state.filledTabs, nextTab],
            renderTabComponents: false,
          }
          if(selectedTabId === 1) {
            obj['root_parent_id']= response.data;
            router.query.root_parent_id = obj['root_parent_id'];
          }
          if(selectedTabId === INVOIING_TAB) {
            router.push('/manage-cooperation-overview?type=sales_agent&id=1')
          } else {
            router.query.selectedTabId = nextTab;
            router.push(router, undefined, { shallow: true })
            updateStateChanges(obj);
          }
        } else {
          console.error(response.msg);
        }
      }).catch(error => {
        console.log(error);
      })
    } else {
      updateStateChanges({proceedToNextTabWarning: true});
    }
  }

	return (
		<div className="">
      {state.proceedToNextTabWarning ? <p style={{color:'red', textAlign:'center'}}> Please fill all mandotory fields. </p> : null}
      {showComponentBasedOnTabSelection()}
      <div className={`col-md-12 row`} >
          <div className={`col-md-11 ${styles['tab-index-back-div']}`}>
            <p className={`${styles['tab-index-back-btn']}`} onClick={() => router.back()}> Back </p>
          </div>
          <div className={`col-md-1`}>
            <button
              onClick={forWardToNextStepTab}
              type="button"
              className="btn btn-dark pcp_btn">
              {selectedTabId === INVOIING_TAB ? 'Save' : 'Next'}
            </button>
          </div>
      </div>
    </div>
	);
}

/**
 * [saveDataTabWise description]
 * @param  {int}    tabId               [description]
 * @param  {Onject} state               [description]
 * @param  {String} url                 [description]
 * @return {Object}       [description]
 */
async function saveDataTabWise(state, tabId, url) {
  let apiResponse = '';
  await APICALL.service(`${url}`, 'POST', getTabRelatedData(state, tabId))
  .then(response => {
    apiResponse = response;
  })
  return apiResponse;
}

function getTabRelatedData(state, tabId) {
  return {
    root_parent_id: state.root_parent_id || 0,
    tab_id: tabId,
    action:state[`tab_${tabId}_action`] || 1,
    data: getTabWisePostData(state, tabId),
    element_status: state['element_status'][`tab_${tabId}`],
    depedency_data_status:state['dependecyDataStatus'],
    salesAgentRefId: state['salesAgentRefId']
  }
}


function getTabWisePostData(state, tabId) {
  let data = {}
  switch (tabId) {
    case ABSOLUTEYOU_AGENT_TAB:
      data = submitService.absoluteYouPostData(state)
      break;
    case COMPANY_INFORMATION_TAB:
      data = submitService.companyInformationPostData(state,'tab_2');
      break;
    case CONTACT_PERSONS_TAB:
      data =  submitService.contractPersonsPostData(state,'tab_3');
      break;
    case ONLINE_DETAILS_TAB:
      data = submitService.onlineDetailsPostData(state,'tab_4');
      break;
    case SALARY_BENEFITS_TAB:
      data = state['tab_5'];
      break;
    case INVOIING_TAB:
      data = submitService.invoiceDetailsPostData(state,'tab_6');
    break;
    default:
      data = {};
  }

  return data;
}

export default TabIndex;
