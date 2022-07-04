import React, { useReducer } from 'react';
import CooperationAgreementContext from './CooperationAgreementContext';
import CooperationAgreementReducer from './CooperationAgreementReducer';
import { UPDATE_STATE } from './Actions';

const CooperationAgreementStates = (props) => {
  const initialState = {
      tab_1 : { worksServantsData: {1: [], 2: []}, cooperationCoeffData: {} }
    , tab_2 : {'22':1,'23':1,'24':1}
    , tab_3 : {loaded:false}
    , tab_4 : {'43':1,'44':2,'48':1,'49':1}
    , tab_5 : {}
    , tab_6:  {'56':1,'57':2,'58':1,'61':2,'62':2,'63':2,'64':2,'65':2,'73':2,'74':1,'76':2,'77':2,'78':2,'79':2}
    , selectedTabId: 1
    , loadedTabs: []
    , renderTabComponents: false
    , alreadyLinked: []
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
