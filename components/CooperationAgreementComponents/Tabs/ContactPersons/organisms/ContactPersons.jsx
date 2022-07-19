import React,{useContext,useEffect} from 'react';
import ContactPersonTabs from '../molecules/ContactPersonTabs';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const ContactPersons = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_3_action}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
console.log(state);
const personId  = 1;
  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_3 = { ...state[stateKey] };
  console.log(tab_3)
  let validations = tab_3[2]['validations'] || {};
  let required  =  tab_3[2]['required'] || {};
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_3']).length ? data['tab_3']['personsData'] : 0;

  tab_3_action = apiData === 0 ? 1 :2;
  if(apiData) {
  apiData[personId]['validations']  = validations;
  apiData[personId]['required']      = required;
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
