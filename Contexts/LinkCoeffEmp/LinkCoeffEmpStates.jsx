import React, { useReducer } from 'react';
import LinkCoeffEmpContext from './LinkCoeffEmpContext';
import LinkCoeffEmpReducer from './LinkCoeffEmpReducer';
import { UPDATE_STATE } from './Actions';

const LinkCoeffEmpStates = (props) => {
  const initialState = {
    employeeTypeArray: []
    , coefficientTypeArray: []
    , valueTypeArray: []
    , pclinkingValueobj: {}
    , selectedPc: null
    , pcArray: []
    , pcWarning: false,
  };
  const [state, dispatch] = useReducer(LinkCoeffEmpReducer, initialState);

  const updateStateChanges = (obj) => {
    dispatch({ type: UPDATE_STATE, payload: obj })
  }

  return (
    <LinkCoeffEmpContext.Provider value={{
      state,
      updateStateChanges,
    }}> {props.children}
    </LinkCoeffEmpContext.Provider>
  )
}

export default LinkCoeffEmpStates;
