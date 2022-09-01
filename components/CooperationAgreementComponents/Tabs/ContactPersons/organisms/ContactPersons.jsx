import React,{useContext,useEffect} from 'react';
import ContactPersonTabs from '../molecules/ContactPersonTabs';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { helpers } from '../../../CooperationAgreementHelper';
import { requiredFields } from '@/components/CooperationAgreementComponents/RequiredFields';

import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const requiredElements  = structuredClone(requiredFields);

const ContactPersons = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_3_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
const personId  = 1;
  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_3 = { ...state[stateKey] };
  let validations = tab_3['validations'] || {};
  let required  =  tab_3['required'] || {};
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_3']).length ? data['tab_3']['personsData'] : 0;
  let personId = data['tab_3']['personId'] ? data['tab_3']['personId'] : 0;
  let defaultObj = {'25':1,'30':1,'31':2,'32':2,'38':2,'39':2,required:requiredElements['tab_3'],validations:{'34':{'type':1,validate:false},'35':{'type':2,validate:false}}};
  for(const key in apiData) {
    apiData[key]['validations'] = defaultObj.validations;
    apiData[key]['required']  = defaultObj.required;
  }
  tab_3_action = apiData === 0 ? 1 :2;
  if(apiData) {
  let resonponseData= [];
  let contactOptions = [];
  contactOptions   = state.defaultOptions['contactList'];
  console.log(contactOptions)
  console.log(Object.values(personId));
  resonponseData['contactPersonsDetails'] = apiData;
  resonponseData['contactSelectedDetails'] = contactOptions.filter(value=>Object.values(personId).includes(`${value.value}`));
  resonponseData['alredyLinkedPersons'] = personId;
  tab_3 = {...tab_3,...resonponseData}
  }
  updateStateChanges({tab_3,tab_3_action,loadedTabs:[...state.loadedTabs, selectedTabId],
    filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs
  })
  }


  return (
    <div className = '' disabled={!filledTabs.includes(selectedTabId)}>
     <ContactPersonTabs />
    </div>
  )
}
export default React.memo(ContactPersons);
