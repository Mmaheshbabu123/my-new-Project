import React, { useContext, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import SalaryDetailsPerPC from '../molecules/SalaryDetailsPerPC';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';

const SalaryBenefitsMain = (props) => {
  const { state: { selectedTabId, renderTabComponents, root_parent_id }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
        loadData();
    else updateStateChanges({renderTabComponents: true});
  }, [])

  const loadData = async () => {
    let data = {};
    let stateKey = 'tab_5';
    let tab_5 = { ...state[stateKey] };
    var response = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
    data['salaryBenefitPcArray'] = response.pc_array || [];
    data['salaryDataPerPc'] = response.salaryData || {};
    let apiData = Object.keys(response['tab_data']).length ? response['tab_data'] : 0;
    if(apiData) {
      let { cooperationSalaryDetails = [], cooperationSalaryLinked = {}, cooperationBenefits = {} } = apiData;
      tab_5['cooperationSalaryDetails'] = response.pc_array.filter(val => cooperationSalaryDetails.includes(val.value));
      tab_5['cooperationSalaryLinked']  = cooperationSalaryLinked;
      tab_5['cooperationBenefits']      = cooperationBenefits;
    }
    data[stateKey] = tab_5;
    data['loadedTabs'] = [...state.loadedTabs, selectedTabId];
    data['renderTabComponents'] = true;
    updateStateChanges(data);
  }

  return (
    <div className="">
      {renderTabComponents === true ?
      <SalaryDetailsPerPC />
      : <p> Loading... </p>
    }
    </div>
  )
}

export default React.memo(SalaryBenefitsMain)
