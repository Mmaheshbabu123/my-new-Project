import React, { useReducer, useRef } from 'react';
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
    , pcWarning: false
    , lowHighValidation: []
    , inputRef: useRef({})
    , lowKey: 1
    , defaultKey: 2
    , highKey: 3
    , minValue: 0
    , maxValue: 10
    , regexp: /^[0-9,.]*$/
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
