import React, { useContext } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const CooperationAgreementTabs = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { cooperTabs = [] } = props;
  const { selectedTabId } = state;

  const handleTabClick = (selectedTabId) => {
    updateStateChanges({selectedTabId: selectedTabId})
  }
  console.log(state);
  return (
    <div>
      <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
      {cooperTabs.map(tab => {
        return(
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link py-3 ${selectedTabId === tab.id ? 'active custom-active' : 'custom-inactive'}`}
              id="pills-pc-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-pc"
              type="button"
              role="tab"
              aria-controls="pills-pc"
              aria-selected="true"
              onClick={() => handleTabClick(Number(tab.id))}
            >
                {selectedTabId === tab.id ? <FaRegCheckCircle className="d-inline mb-2"/> : <BsCircle className="d-inline mb-2" />}
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
