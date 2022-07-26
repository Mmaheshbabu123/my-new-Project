import React ,{useContext,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
import { requiredFields} from '../../../RequiredFields';
const OnlineDetails = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_4_action, filledTabs}, updateStateChanges, state  } = useContext(CooperationAgreementContext);

  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
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

    return(
      <div className="" disabled={!filledTabs.includes(selectedTabId)}>
        <BasicDetails />
      </div>
    );

}

export default  React.memo(OnlineDetails);
