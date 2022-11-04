import React,{useContext,useEffect} from 'react';
import InvoiceDetails from '../molecules/InvoiceDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { requiredFields} from '../../../RequiredFields';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const Invoicing = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_6_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
  const { tab_6,tab_2,tab_3,tab_4} = state;
 console.log(tab_6);
  const PersonId = 1;
  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else  {
      prefillFieldsDefault(tab_6,tab_2,tab_3);
    updateStateChanges({tab_6,renderTabComponents: true});
  }
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_6 = { ...state[stateKey] };
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_6']['data']).length ? data['tab_6']['data'] : 0;
  tab_6_action = data['tab_6']['action'] ? data['tab_6']['action'] :1;
  console.log(tab_6);
  if(apiData) {
  tab_6 = {...tab_6,...apiData}
}else {
  prefillFieldsDefault(tab_6,tab_2,tab_3);

}
console.log(tab_6);
  updateStateChanges({tab_6,tab_6_action,loadedTabs:[...state.loadedTabs, selectedTabId],
    filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs
  })
  }
 const prefillFieldsDefault = (tab_6,tab_2,tab_3) =>{
   console.log(tab_3)
   let personId  = tab_3['contactSelectedDetails'].length > 0 ? tab_3['contactSelectedDetails'][0]['person_id'] : 0;
   let firstName = personId  ? tab_3['contactPersonsDetails'][personId]['26'] : '';
   let lastName  = personId ? tab_3['contactPersonsDetails'][personId]['33'] : '';

  console.log(personId);
  console.log(tab_6['50']);
   tab_6['51']  =  tab_6['51'] || tab_2['11'];
   tab_6['52']  =  tab_6['52'] || tab_2['14'] ;
   tab_6['53']  =  tab_6['53'] || tab_2['16'];
   tab_6['54']  =  tab_6['54'] || tab_2['17'];
   tab_6['71']  =  tab_6['71'] || tab_2['18'] ;
   tab_6['55']  = tab_6['55']  || tab_2['19'] ;
   tab_6['59']  = tab_6['59']  || tab_2['19'] ;
   tab_6['68']  = tab_6['68']  || tab_2['12'] ;
   tab_6['69']  = tab_6['69']  || tab_2['13'] ;
   tab_6['70']  = tab_6['70']  || tab_2['15'] ;
   tab_6['50']  = tab_6['50'] || firstName;
   tab_6['67']  = tab_6['67'] || lastName;
   tab_6['required'] = requiredFields['tab_6'];


 }

  return (
    <div className ='' disabled={!filledTabs.includes(selectedTabId)}>
     <InvoiceDetails />
    </div>
  )
}

export default React.memo(Invoicing);
