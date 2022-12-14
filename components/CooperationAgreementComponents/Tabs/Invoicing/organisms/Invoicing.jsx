import React,{useContext,useEffect} from 'react';
import InvoiceDetails from '../molecules/InvoiceDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { requiredFields} from '../../../RequiredFields';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const Invoicing = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_6_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
  const { tab_6,tab_2,tab_3} = state;
  const PersonId = 1;
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
  if(apiData) {
  tab_6 = {...apiData,...tab_6}
}else {
  prefillFieldsDefault(tab_6,tab_2,tab_3);

}

  updateStateChanges({tab_6,tab_6_action,loadedTabs:[...state.loadedTabs, selectedTabId],
    filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs
  })
  }
 const prefillFieldsDefault = (tab_6,tab_2,tab_3) =>{

   tab_6['51']  = tab_2['11'] || '';
   tab_6['52']  = tab_2['14'] || '';
   tab_6['53']  = tab_2['16'] || '';
   tab_6['54']  = tab_2['17'] || '';
   tab_6['71']  = tab_2['18'] || '';
   tab_6['55']  = tab_2['19'] || '';
   tab_6['68']  = tab_2['12'] || '';
   tab_6['69']  = tab_2['13'] || '';
   tab_6['70']  = tab_2['15'] || '';
   tab_6['50']  = tab_3[PersonId]['26'] || '';
   tab_6['67']  = tab_3[PersonId]['33'] || '';
   tab_6['required'] = requiredFields['tab_6'];

 }

  return (
    <div className ='' disabled={!filledTabs.includes(selectedTabId)}>
     <InvoiceDetails />
    </div>
  )
}

export default React.memo(Invoicing);
