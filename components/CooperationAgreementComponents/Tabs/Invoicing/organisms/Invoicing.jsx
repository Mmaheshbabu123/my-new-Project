import React,{useContext,useEffect} from 'react';
import InvoiceDetails from '../molecules/InvoiceDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const Invoicing = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_6_action}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_6 = { ...state[stateKey] };
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_6']).length ? data['tab_6'] : 0;
  tab_6_action = apiData === 0 ? 1 :2;
  console.log(tab_6_action)
  if(apiData) {
  tab_6 = {...apiData,...tab_6}
  }
  console.log(state)

  updateStateChanges({tab_6,tab_6_action})
  }

  return (
    <div className =''>
     <InvoiceDetails />
    </div>
  )
}

export default React.memo(Invoicing);
