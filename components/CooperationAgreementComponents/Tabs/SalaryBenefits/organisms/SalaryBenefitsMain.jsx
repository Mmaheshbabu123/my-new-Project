import React, { useContext, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import SalaryDetailsPerPC from '../molecules/SalaryDetailsPerPC';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';

const SalaryBenefitsMain = (props) => {
  const { state: { selectedTabId, renderTabComponents },root_parent_id, updateStateChanges, state } = useContext(CooperationAgreementContext);
  useEffect(() => {
    if(!state.loadedTabs.includes(selectedTabId))
        loadData();
    else updateStateChanges({renderTabComponents: true});
  }, [])
  console.log(state);
  const loadData = async () => {
    let data = {};
    var response = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
    data['salaryBenefitPcArray'] = response.pc_array || [];
    data['salaryDataPerPc'] = response.salaryData || {};
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
