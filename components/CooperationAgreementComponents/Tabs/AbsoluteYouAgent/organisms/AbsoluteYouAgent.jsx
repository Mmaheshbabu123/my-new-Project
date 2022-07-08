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
const AbsoluteYouAgent = (props) => {
  const { state: { selectedTabId, renderTabComponents, root_parent_id }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
    		loadData();
    else updateStateChanges({renderTabComponents: true});
  }, [])

  const loadData = async () => {
    let stateKey = `tab_${selectedTabId}`;
    let tab_1 = { ...state[stateKey] };
    var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
    let apiData = Object.keys(data['tab_data']).length ? data['tab_data'] : 0;
    if(apiData) {
      let { basicDetails = {}, cooperationCoeffData = {}, worksServantsData = {} } = apiData;
      tab_1[startDateAgreement]     = basicDetails['startdateagreement']             || helpers.formatDate(new Date());
      tab_1[absoluteConsultant]     = Number(basicDetails['absoluteConsultant'])     || '';
      tab_1[absoluteConsultantNum]  = Number(basicDetails['absoluteConsultantNum'])  || '';
      tab_1[activateAddProject]     = Number(basicDetails['activateAddProject'])     || '';
      tab_1['worksServantsData']    = worksServantsData;
      data['coeffPageData']         = cooperationCoeffData;
    }
    data[stateKey] = tab_1;
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
