import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const CooperationAgreementTabs = ({corporateAgreementId = 0, cooperTabs = [], selectedTabParam, salesAgentRefId = 0 }) => {
  const { state: { selectedTabId, filledTabs }, updateStateChanges } = useContext(CooperationAgreementContext);
  const router = useRouter();

  const handleTabClick = (selectedTabId) => {
    router.query.selectedTabId = selectedTabId
    router.push(router, undefined, { shallow: true })
    updateStateChanges({selectedTabId: selectedTabId})
  }

  useEffect(() => {
    let tabId = Number(selectedTabParam) || selectedTabId;
    updateStateChanges({ selectedTabId: tabId, root_parent_id: Number(corporateAgreementId), salesAgentRefId });
  }, [selectedTabParam])

  return (
    <div>
      <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
      {cooperTabs.map(tab => {
        let disabled = filledTabs.includes(Number(tab.id)) ? '' : 'disabled';
        return(
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link py-3 ${disabled} ${selectedTabId === tab.id ? 'active custom-active' : 'custom-inactive'}`}
              id="pills-pc-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-pc"
              type="button"
              role="tab"
              aria-controls="pills-pc"
              aria-selected="true"
              onClick={() => handleTabClick(Number(tab.id))}
            > {!disabled ? <FaRegCheckCircle className="d-inline mb-2"/> : <BsCircle className="d-inline mb-2" />}
              <p className="mb-2">Step: {tab.id}</p>
              <p>{tab.name}</p>
            </button>
          </li>
        );
      })}
      </ul>
  </div>
  )
}


export default CooperationAgreementTabs;
