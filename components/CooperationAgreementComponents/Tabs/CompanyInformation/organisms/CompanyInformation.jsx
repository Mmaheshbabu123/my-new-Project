import React ,{useContext,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import CompanyDetails from '../molecules/CompanyDetails';
import LegalAddress from  '../molecules/LegalAddress';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';
const CompanyInformation = (props) => {
  var {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_2_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);

 useEffect(()=>{
   if(!state.loadedTabs.includes(selectedTabId))
      loadData();
   else updateStateChanges({renderTabComponents: true});
 },[])
 const loadData = async () => {
   let stateKey = `tab_${selectedTabId}`;
   let tab_2 = { ...state[stateKey] };
   var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
   let apiData = Object.keys(data['tab_2']).length ? data['tab_2'] : 0;
   tab_2_action = apiData === 0 ? 1 :2;
   if(apiData) {
    tab_2 = {...apiData,...tab_2}
   }
   console.log(data, filledTabs);
   updateStateChanges({tab_2,tab_2_action,loadedTabs:[...state.loadedTabs, selectedTabId],
     filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs,
   })
 }
 console.log(filledTabs);
    return(
      <div className="" disabled={!filledTabs.includes(selectedTabId)}>
        <CompanyDetails />
        <LegalAddress />
      </div>
    );

}

export default  React.memo(CompanyInformation);
