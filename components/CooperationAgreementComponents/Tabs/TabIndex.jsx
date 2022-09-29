import React, {useContext, useEffect } from 'react';
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
import SalaryBenefitsMain  from './SalaryBenefits/organisms/SalaryBenefitsMain';
import Invoicing from './Invoicing/organisms/Invoicing';
//----


const TabIndex = (props) => {
	const { state: { selectedTabId ,renderedOptions, filledTabs,salesAgentRefId }, updateStateChanges, state } = useContext(CooperationAgreementContext);
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
  if(!renderedOptions && salesAgentRefId)  loadData()
}, [salesAgentRefId])

const loadData = async () => {
 let data = [];
 let defaultOptions = {...state['defaultOptions']};
  await APICALL.service(getDefaultOptionsData + `/${salesAgentRefId}`, 'GET').then(response => {
    if (response.status === 200) {
      data = response.data || {};
      defaultOptions['countrylist']          =  data['countrylist'];
      defaultOptions['locationslist']        =  data['locationslist'];
      defaultOptions['payment_condtion']     =  data['payment_condtion'];
      defaultOptions['absolute_consultant']  =  data['absolute_consultant'];
      defaultOptions['absolute_office_num']  =  data['absolute_office_num'];
      defaultOptions['salaryCodes']          =  data['pref_codes'] && data['pref_codes']['salaryCodes'] ? data['pref_codes']['salaryCodes'] : [];
      defaultOptions['benefitCodes']         =  data['benefitCodes'] && data['pref_codes']['benefitCodes'] ? data['pref_codes']['benefitCodes'] : [];
      defaultOptions['agent_details']        =  data['agent_details'] || [];
      defaultOptions['pref_codes']           =  data['pref_codes'] || [];
      defaultOptions['contactList']          =  data['contactsData'] && data['contactsData']['multiselctObj'] ?  data['contactsData']['multiselctObj']: [];
      defaultOptions['contactsData']         =  data['contactsData'] ?.['personsData'];
      defaultOptions['locationObj']          =  data['contactsData'] ?.['locationObj'];
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
      {renderedOptions === 1 && showComponentBasedOnTabSelection()}
     <div className='row my-4'>
     <div className={`col-md-12`} >
        <div className='row py-3'>
        <div className={`col-md-9 ${styles['tab-index-back-div']} align-self-center`}>
            <p className={`${styles['tab-index-back-btn']} poppins-light-18px text-decoration-underline text-uppercase shadow-none`} onClick={() => router.back()}> Back </p>
          </div>
          <div className={`col-md-3 text-end`}>
           <div className='row'>
             <div className='col-md-8'>
             <button disabled = {!filledTabs.includes(selectedTabId)} onClick={() => forWardToNextStepTab(1)} type="button" className="btn poppins-medium-18px-next-button shadow-none rounded-0 text-uppercase">
              <span className="sv-save-btn-text_1 spinner-border-sm me-2 "></span>{'Save as draft'}
            </button>
            
             </div>
             <div className='col-md-4'>
             <button disabled = {!filledTabs.includes(selectedTabId)} onClick={() => forWardToNextStepTab()} type="button" className="btn poppins-medium-18px-next-button shadow-none rounded-0 text-uppercase">
              <span className="sv-save-btn-text_0 spinner-border-sm text-uppercase"></span>{selectedTabId === INVOIING_TAB ? 'Submit' : 'Next'}
            </button>
             </div>
           </div>
          </div>
        </div>
      </div>
     </div>
    </div>
	);
}

export default TabIndex;
