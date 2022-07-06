import React, { useEffect, useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';
import CoefficientPage from '../molecules/CoefficientPage';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';


const AbsoluteYouAgent = (props) => {
  const { state: { selectedTabId, renderTabComponents, root_parent_id }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
    		loadData();
  }, [])

  const loadData = async () => {
    let stateKey = `tab_${selectedTabId}`;
    var data = await fetchDataFromBackend(getCooperationAgreementsTabWise);
    data[stateKey] = {...state[stateKey],  ...(data[stateKey] ? data[stateKey] : {})};
    data['pcArray'] = data.pc_array || [];
    data['pcLinkedEmployeeTypes'] = data.pcLinkedEmployeeTypes || {};
    data['loadedTabs'] = [...state.loadedTabs, selectedTabId];
    data['renderTabComponents'] = true;
    updateStateChanges(data)
  }

  const fetchDataFromBackend = async (url) => {
    let data = {};
    await APICALL.service(`${url}/${root_parent_id}/${selectedTabId}`, 'GET').then(response => {
      if (response.status === 200)
            data = response.data;
    }).catch((error) => console.log(error) )
    return data;
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
