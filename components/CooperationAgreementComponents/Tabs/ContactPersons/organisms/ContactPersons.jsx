import React,{useContext,useEffect} from 'react';
import ContactPersonTabs from '../molecules/ContactPersonTabs';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const ContactPersons = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_3_action}, updateStateChanges, state  } = useContext(CooperationAgreementContext);

  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_3 = { ...state[stateKey] };
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_3']).length ? data['tab_3']['personsData'] : 0;

  tab_3_action = apiData === 0 ? 1 :2;
  if(apiData) {

  tab_3 = {...tab_3,...apiData}
  }


  updateStateChanges({tab_3,tab_3_action})
  }


  return (
    <div className = ''>
     <ContactPersonTabs />
    </div>
  )
}
export default React.memo(ContactPersons);
