import React, { useReducer } from 'react';
import CooperationAgreementContext from './CooperationAgreementContext';
import CooperationAgreementReducer from './CooperationAgreementReducer';
import { UPDATE_STATE } from './Actions';

const CooperationAgreementStates = (props) => {
  const initialState = {
      tab_1 : {}
    , tab_2 : {'22':1,'23':1,'24':1}
    , tab_3 : {}
    , tab_4 : {}
    , tab_5 : {}
    , selectedTabId: 1
    , loadedTabs: []
    , renderTabComponents: false
  };
  const [state, dispatch] = useReducer(CooperationAgreementReducer, initialState);
  const updateStateChanges = (obj) => {
    dispatch({ type: UPDATE_STATE, payload: obj })
  }

  return (
    <CooperationAgreementContext.Provider value={{
      state,
      updateStateChanges,
    }}> {props.children}
    </CooperationAgreementContext.Provider>
  )
}

export default CooperationAgreementStates;
