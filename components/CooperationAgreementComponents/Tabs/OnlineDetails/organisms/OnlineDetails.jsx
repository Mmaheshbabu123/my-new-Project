import React ,{useContext,useEffect} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import { helpers } from '../../../CooperationAgreementHelper';
import { getCooperationAgreementsTabWise } from '@/Services/ApiEndPoints';
const OnlineDetails = (props) => {
  const {state: { selectedTabId, renderTabComponents, root_parent_id ,tab_4_action}, updateStateChanges, state  } = useContext(CooperationAgreementContext);

  useEffect(()=>{
  if(!state.loadedTabs.includes(selectedTabId))
    loadData();
  else updateStateChanges({renderTabComponents: true});
  },[])
  const loadData = async () => {
  let stateKey = `tab_${selectedTabId}`;
  let tab_4 = { ...state[stateKey] };
  var data = await helpers.fetchDataFromBackend(getCooperationAgreementsTabWise, root_parent_id, selectedTabId);

  let apiData = Object.keys(data['tab_4']).length ? data['tab_4'] : 0;
  tab_4_action = apiData === 0 ? 1 :2;
  if(apiData) {
  tab_4 = {...apiData,...tab_4}
  }

  updateStateChanges({tab_4,tab_4_action})
  }

    return(
      <div className="">
        <BasicDetails />
      </div>
    );

}

export default  React.memo(OnlineDetails);
