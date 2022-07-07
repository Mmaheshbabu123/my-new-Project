import React, { useEffect, useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';
import CoefficientPage from '../molecules/CoefficientPage';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';


const AbsoluteYouAgent = (props) => {
  const { state: { selectedTabId, renderTabComponents, root_parent_id }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
    		loadData();
    else updateStateChanges({renderTabComponents: true});
  }, [])

  const loadData = async () => {
    let stateKey = `tab_${selectedTabId}`;
    var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
    data[stateKey] = {...state[stateKey],  ...(data[stateKey] ? data[stateKey] : {})};
    data['pcArray'] = data.pc_array || [];
    data['pcLinkedEmployeeTypes'] = data.pcLinkedEmployeeTypes || {};
    data['loadedTabs'] = [...state.loadedTabs, selectedTabId];
    data['renderTabComponents'] = true;
    updateStateChanges(data)
  }

  return(
    <>{renderTabComponents === true ?
       <div className="_absolute-you-agend_">
           <BasicDetails />
           <PcForWorkersServants />
           <CoefficientPage />
       </div>
     : <p>Loading...</p>}
    </>
  );
}

export default React.memo(AbsoluteYouAgent);
