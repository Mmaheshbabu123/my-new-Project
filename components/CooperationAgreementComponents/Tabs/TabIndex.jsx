import React, { useEffect, useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { APICALL } from '@/Services/ApiServices';
import {
  fetchAbsoluteYouAgentData,
} from '@/Services/ApiEndPoints';
import {
    ABSOLUTEYOU_AGENT_TAB
  , COMPANY_INFORMATION_TAB
  , CONTACT_PERSONS_TAB
  , ONLINE_DETAILS_TAB
  , SALARY_BENEFITS_TAB
} from '../Definations'

//----Impport each tab dynamically using next/dynamic
import AbsoluteYouAgent from './AbsoluteYouAgent/organisms/AbsoluteYouAgent';
import CompanyInformation from './CompanyInformation/organisms/CompanyInformation';
import OnlineDetails  from './OnlineDetails/organisms/OnlineDetails';
//----


const TabIndex = (props) => {
	const { state: { selectedTabId }, updateStateChanges, state } = useContext(CooperationAgreementContext);

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
    updateStateChanges({data})
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
        //.
        break;
      case ONLINE_DETAILS_TAB:
        component = <OnlineDetails />
        break;
      case SALARY_BENEFITS_TAB:
        //.
        break;
      default:
        component = <div> Nothing...! </div>
    }
    return component || <> {`Selected tab id: ${selectedTabId}`} </>;
  }

	return (
		<div className="">
      {state.renderTabComponents ? showComponentBasedOnTabSelection() : <> Loading... </>}
    </div>
	);
}

async function fetchDataAccordingToTabSelection(selectedTabId) {
  let data = {};
  switch (selectedTabId) {
    case ABSOLUTEYOU_AGENT_TAB:
      data = await fetchAbsoluteYouAgentTabData();
      break;
    case COMPANY_INFORMATION_TAB:
      //.
      break;
    case CONTACT_PERSONS_TAB:
      //.
      break;
    case ONLINE_DETAILS_TAB:
      //.
      break;
    case SALARY_BENEFITS_TAB:
      //.
      break;
    default:
      data = {};
  }
  return data;
}

async function fetchAbsoluteYouAgentTabData() {
  let data = {};
  await APICALL.service(`${fetchAbsoluteYouAgentData}`, 'GET').then(response => {
    if (response.status === 200) {
      data['pcArray'] = response.data['pc_array'];
      data['pcLinkedEmployeeTypes'] = response.data['pcLinkedEmployeeTypes'];
    }
  })
  return data;
}


export default TabIndex;
