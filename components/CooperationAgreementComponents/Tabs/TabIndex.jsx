import React, {useContext } from 'react';
import { useRouter } from 'next/router';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import styles from './AbsoluteYouAgent/absoluteAgent.module.css';
import { APICALL } from '@/Services/ApiServices';
import { getDefaultOptionsData } from '@/Services/ApiEndPoints'
import { submitService } from './submitService';
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

useEffect(()=> {
  if(!renderedOptions)  loadData()
}, [])

const loadData = async () => {
 let data = [];
 let defaultOptions = {...state['defaultOptions']};
  await APICALL.service(getDefaultOptionsData, 'GET').then(response => {
    if (response.status === 200) {
      data = response.data || {};
      defaultOptions['countrylist'] = data['countrylist'];
      updateStateChanges({defaultOptions,renderedOptions:1})
    }
  }).catch((error) => console.log(error) )
}

  const forWardToNextStepTab = async (draft = 0) => {
    await submitService.forWardToNextStepTab(router, state, updateStateChanges, selectedTabId, draft);
  }

	return (
		<div className="">
      {state.proceedToNextTabWarning ? <p style={{color:'red', textAlign:'center'}}> Please fill all mandotory fields. </p> : null}
      {showComponentBasedOnTabSelection()}
      <div className={`col-md-12 row`} >
          <div className={`col-md-9 ${styles['tab-index-back-div']}`}>
            <p className={`${styles['tab-index-back-btn']}`} onClick={() => router.back()}> Back </p>
          </div>
          <div className={`col-md-3 text-end`}>
            <button onClick={() => forWardToNextStepTab(1)} type="button" className="btn btn-dark pcp_btn">
              {'Save as draft'}
            </button>
            <button onClick={() => forWardToNextStepTab()} type="button" className="btn btn-dark pcp_btn">
              {selectedTabId === INVOIING_TAB ? 'Save' : 'Next'}
            </button>
          </div>
      </div>
    </div>
	);
}

export default TabIndex;
