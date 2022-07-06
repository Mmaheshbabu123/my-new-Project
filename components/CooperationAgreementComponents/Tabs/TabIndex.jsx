import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import styles from './AbsoluteYouAgent/absoluteAgent.module.css';
import { APICALL } from '@/Services/ApiServices';
import { submitService } from './submitService';
import {
  fetchAbsoluteYouAgentData,
  fetchSalaryBenefitsPerPc,
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
	const { state: { selectedTabId }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  const router = useRouter();

	useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId)) // Once data loaded next time it wont call database
    		loadData();
	}, [selectedTabId])


  const loadData = async () => {
    let stateKey = `tab_${selectedTabId}`;
    var data = await fetchDataAccordingToTabSelection(selectedTabId);
    data[stateKey] = {...state[stateKey],  ...(data[stateKey] ? data[stateKey] : {})};
    data['loadedTabs'] = [...state.loadedTabs, selectedTabId];
    data['renderTabComponents'] = true;
    updateStateChanges(data)
  }

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

  const forWardToNextStepTab = async () => {
    let proceed = submitService.proceedToNextStepTab({state, selectedTabId});
    console.log(proceed);
    if(proceed) {
      // saveDataTabWise(state, selectedTabId, saveCooperationDataTabWise).then(response => {
        // console.log(response);
        let nextTab = selectedTabId + 1;
        let obj = { selectedTabId: nextTab, proceedToNextTabWarning: false, filledTabs: [...state.filledTabs, nextTab] }
        router.query.selectedTabId = nextTab;
        router.push(router, undefined, { shallow: true })
        updateStateChanges(obj);
      // })
    } else {
      updateStateChanges({proceedToNextTabWarning: true});
    }
  }

	return (
		<div className="">
      {state.proceedToNextTabWarning ? <p style={{color:'red', textAlign:'center'}}> Please fill all mandotory fields (fields with asterisk mark) </p> : null}
      {state.renderTabComponents ? showComponentBasedOnTabSelection() : <> Loading... </>}
      {state.renderTabComponents ? <div className={`col-md-12 row`} >
          <div className={`col-md-11 ${styles['tab-index-back-div']}`}>
            <p className={`${styles['tab-index-back-btn']}`}> Back </p>
          </div>
          <div className={`col-md-1`}>
            <button
              onClick={forWardToNextStepTab}
              type="button"
              className="btn btn-dark pcp_btn">
              Next
            </button>
          </div>
      </div>:null}
    </div>
	);
}

async function fetchDataAccordingToTabSelection(selectedTabId) {
  let data = {};
  let response = {};
  switch (selectedTabId) {
    case ABSOLUTEYOU_AGENT_TAB:
        response = await fetchDataFromBackend(fetchAbsoluteYouAgentData);
        data['pcArray'] = response.pc_array || [];
        data['pcLinkedEmployeeTypes'] = response.pcLinkedEmployeeTypes || {};
      break;
    case COMPANY_INFORMATION_TAB:
      //.
      break;
    case CONTACT_PERSONS_TAB:
      data['tab_3'] = {1:{'25':1,'30':1,'31':2,'32':2,'38':2,'39':2},2:{'25':1,'30':1,'31':2,'32':2,'38':2,'39':2},loaded:true};
      break;
    case ONLINE_DETAILS_TAB:
      //.
      break;
    case SALARY_BENEFITS_TAB:
      response = await fetchDataFromBackend(fetchSalaryBenefitsPerPc);
      data['salaryBenefitPcArray'] = response.pc_array || [];
      data['salaryDataPerPc'] = response.salaryData || {};
      break;
    default:
      data = {};
  }
  return data;
}

async function fetchDataFromBackend(url) {
  let data = {};
  await APICALL.service(`${url}`, 'GET').then(response => {
    if (response.status === 200) {
      data = response.data;
    }
  })
  return data;
}

/**
 * [saveDataTabWise description]
 * @param  {int}    tabId               [description]
 * @param  {Onject} state               [description]
 * @param  {String} url                 [description]
 * @return {Object}       [description]
 */
async function saveDataTabWise(state, tabId, url) {
  APICALL.service(`${url}`, 'POST', getTabRelatedData(state, tabId))
  .then((response) => {
    console.log(response);
  })
}

function getTabRelatedData(state, tabId) {
  return {
    root_parent_id: state.root_parent_id || 0,
    tab_id: tabId,
    data: getTabWisePostData(state, tabId),
    element_status: state['element_status']['tab_1'],
    depedency_data_status:state['dependecyDataStatus'],
  }
}


function getTabWisePostData(state, tabId) {
  let data = {}
  switch (tabId) {
    case ABSOLUTEYOU_AGENT_TAB:
      data = submitService.absoluteYouPostData(state)
      break;
    case COMPANY_INFORMATION_TAB:
      //.
      break;
    case CONTACT_PERSONS_TAB:

      break;
    case ONLINE_DETAILS_TAB:
      //.
      break;
    case SALARY_BENEFITS_TAB:

      break;
    default:
      data = {};
  }
  return data;
}

export default TabIndex;
