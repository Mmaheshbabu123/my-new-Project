import React ,{useContext,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import CompanyDetails from '../molecules/CompanyDetails';
import LegalAddress from  '../molecules/LegalAddress';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';
const CompanyInformation = (props) => {
  var {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_2_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
  let companyId = state['defaultOptions']?.['agent_details']['company_id'];
 useEffect(()=>{
   if(!state.loadedTabs.includes(selectedTabId))
      loadData();
   else updateStateChanges({renderTabComponents: true});
 },[])
 const loadData = async () => {
   let stateKey = `tab_${selectedTabId}`;
   let tab_2 = { ...state[stateKey] };

   var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId,companyId);
   let companyObj = data['tab_2']['data']
  // let obj2 = companyObj.map(e => [+e[0], e[1]])

   let apiData = Object.keys(data['tab_2']['data']).length ? data['tab_2']['data'] : 0;
   tab_2_action = data['tab_2']['action'] ? data['tab_2']['action'] :1;
   if(apiData) {
    tab_2 = {...apiData,...tab_2}
   }
   updateStateChanges({tab_2,tab_2_action,loadedTabs:[...state.loadedTabs, selectedTabId],
     filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs,
   })
 }
    return(
      <div className="" disabled={!filledTabs.includes(selectedTabId)}>
        <CompanyDetails />
        <LegalAddress />
      </div>
    );

}

export default  React.memo(CompanyInformation);
