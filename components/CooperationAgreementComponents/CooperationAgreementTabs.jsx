import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { submitService } from './Tabs/submitService'; //Might needed NOSONAR

const CooperationAgreementTabs = ({corporateAgreementId = 0, cooperTabs = [], selectedTabParam, salesAgentRefId = 0 }) => {
  const { state: { selectedTabId, filledTabs }, updateStateChanges, state } = useContext(CooperationAgreementContext);   //Might needed NOSONAR
  const router = useRouter();

  const handleTabClick = async (clickedTabId) => {
    if(clickedTabId === selectedTabId) return;
    // let disabledTab = !filledTabs.includes(Number(selectedTabId));
    // if(disabledTab || await forWardToNextStepTab(clickedTabId)) {
      router.query.selectedTabId = clickedTabId
      router.push(router, undefined, { shallow: true })
      updateStateChanges({selectedTabId: clickedTabId})
    // } else {
       // submitService.keepActiveClassOnSelectedTabId(selectedTabId, clickedTabId);
    // }
  }

  // const forWardToNextStepTab = async (clickedTabId, draft = 0) => {
  //   return await submitService.forWardToNextStepTab(router, state, updateStateChanges, selectedTabId, draft, clickedTabId);
  // }

  useEffect(() => {
    let tabId = Number(selectedTabParam) || selectedTabId;
    updateStateChanges({ selectedTabId: tabId,
      root_parent_id: Number(corporateAgreementId), salesAgentRefId,
      uniqueId: 0,
      proceedToNextTabWarning: false });
  }, [selectedTabParam])

  return (
    <div className='cooperation_agreement_steps pb-3'>
      <ul className="nav nav-pills nav-justified cooperation_agreement_list" id="pills-tab" role="tablist">
      {cooperTabs.map(tab => {
        let disabled = filledTabs.includes(Number(tab.id)) ? '' : 'disabled';
        return(
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link py-3 ${disabled} ${selectedTabId === tab.id ? 'active custom-active' : ''}`}
              id={`cooperation_tab_${tab.id}`}
              data-bs-toggle="pill"
              data-bs-target="#pills-pc"
              type="button"
              role="tab"
              aria-controls="pills-pc"
              aria-selected="true"
              onClick={() => handleTabClick(Number(tab.id))}
            > {!disabled ? <FaRegCheckCircle className="d-inline mb-2"/> : <BsCircle className="d-inline mb-2" />}
              <p className="mb-2 poppins-regular-16px-white ">Step: {tab.id}</p>
              <p className='poppins-regular-18px-white min_height_step'>{tab.name}</p>
            </button>
          </li>
        );
      })}
      </ul>
  </div>
  )
}


export default CooperationAgreementTabs;
