import React, { useEffect, useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';
import CoefficientPage from '../molecules/CoefficientPage';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';

var startDateAgreement    = 1;
var absoluteConsultant    = 2;
var absoluteConsultantNum = 3;
var activateAddProject    = 4;
var whoWillSign           = 80;
const AbsoluteYouAgent = (props) => {
  const { state: { selectedTabId, renderTabComponents, root_parent_id, workerServentsCompLoaded, absoluteAgentTabRender }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
    		loadData();
    else updateStateChanges({renderTabComponents: true});
  }, [])

  const loadData = async () => {
    let stateKey = `tab_${selectedTabId}`;
    let tab_1 = { ...state[stateKey] };
    var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
    let apiData = data['tab_data'] && Object.keys(data['tab_data']).length ? data['tab_data'] : 0;
    if(apiData) {
      let { basicDetails = {}, cooperationCoeffData = {}, worksServantsData = {} } = apiData;
      tab_1[startDateAgreement]     = basicDetails && basicDetails['startdateagreement'] || helpers.formatDate(new Date());
      tab_1[absoluteConsultant]     = basicDetails && Number(basicDetails['absoluteConsultant'])     || '';
      tab_1[absoluteConsultantNum]  = basicDetails && Number(basicDetails['absoluteConsultantNum'])  || '';
      tab_1[activateAddProject]     = basicDetails && Number(basicDetails['activateAddProject'])     || '';
      tab_1[whoWillSign]            = basicDetails && basicDetails['whoWillSign'] || '';
      tab_1['worksServantsData']    = worksServantsData || {};
      data['coeffPageData']         = cooperationCoeffData || {};
    } else
        tab_1[startDateAgreement]= helpers.formatDate(new Date());
    data[stateKey] = tab_1;
    data['pcArray'] = data.pc_array || [];
    data['pcLinkedEmployeeTypes'] = data.pcLinkedEmployeeTypes || {};
    data['filledTabs'] = data.completedTabIds.length ? [...data.completedTabIds, selectedTabId] : [selectedTabId];
    data['loadedTabs'] = [...state.loadedTabs, selectedTabId];
    data['renderTabComponents'] = true;
    data['absoluteAgentTabRender'] = true;
    updateStateChanges(data)
  }

  return(
    <>{renderTabComponents === true && absoluteAgentTabRender === true ?
       <div className="_absolute-you-agend_">
           <BasicDetails />
           <PcForWorkersServants />
           {workerServentsCompLoaded && workerServentsCompLoaded === true ? <CoefficientPage /> : null}
       </div>
     : <p>Loading...</p>}
    </>
  );
}

export default React.memo(AbsoluteYouAgent);
