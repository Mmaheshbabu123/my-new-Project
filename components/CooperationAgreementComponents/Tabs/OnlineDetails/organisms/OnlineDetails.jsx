import React ,{useContext,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { requiredFields} from '../../../RequiredFields';
const OnlineDetails = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_4_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);
  const { tab_4,tab_2,} = state;
  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else {
   prefillFieldsDefault(tab_4,tab_2);
   updateStateChanges({tab_4,renderTabComponents: true});
  }
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_4 = { ...state[stateKey] };
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);
  tab_4['required'] = requiredFields['tab_4'];
  let apiData = Object.keys(data['tab_4']).length ? data['tab_4'] : 0;
  tab_4_action = apiData === 0 ? 1 :2;
  if(apiData) {
  tab_4 = {...apiData,...tab_4}
  }

  updateStateChanges({tab_4,tab_4_action,loadedTabs:[...state.loadedTabs, selectedTabId],
    filledTabs: data.completedTabIds.length ? [...filledTabs, ...data.completedTabIds] : filledTabs
  })
  }

  const prefillFieldsDefault = (tab_4,tab_2) =>{
    let defaultKeys = ['40','41','42','45','46','47'];
    defaultKeys.forEach((item)=>{
      tab_4[item] = tab_4[item] || tab_2['19'] ;
    })

  }

    return(
      <div className="" disabled={!filledTabs.includes(selectedTabId)}>
        <BasicDetails />
      </div>
    );

}

export default  React.memo(OnlineDetails);
