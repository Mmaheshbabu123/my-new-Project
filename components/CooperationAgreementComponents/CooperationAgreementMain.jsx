import React, { useContext } from 'react';
import CooperationAgreementTabs from './CooperationAgreementTabs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import {
    ABSOLUTEYOU_AGENT_TAB
  , COMPANY_INFORMATION_TAB
  , CONTACT_PERSONS_TAB
  , ONLINE_DETAILS_TAB
  , SALARY_BENEFITS_TAB
} from '@/Contexts/CooperationAgreement/Actions'
//----Impport each tab dynamically using next/dynamic

//----

const CooperationAgreementMain = (props) => {
  const { state } = useContext(CooperationAgreementContext);
  const { selectedTabId }  = state;

  /**
   * [showComponentBasedOnTabSelection rendering component according to tab selection]
   * @return {[ReactElement]} [correspoding React component]
   */
  const showComponentBasedOnTabSelection = () => {
    let component;
    switch (selectedTabId) {
      case ABSOLUTEYOU_AGENT_TAB:
        //.
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
        component = <div> Nothing...! </div>
    }
    return component || <> {`Selected tab id: ${selectedTabId}`} </>;
  }

  return(
    <div className="">
        <CooperationAgreementTabs {...props}/>
        {showComponentBasedOnTabSelection()}
    </div>
  );
}

export default CooperationAgreementMain;
