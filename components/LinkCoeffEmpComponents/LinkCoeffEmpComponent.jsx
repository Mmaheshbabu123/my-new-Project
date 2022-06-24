import React, { useContext, useEffect } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';
import CoeffcientValuesFirstPart from './CoeffcientValuesFirstPart';
import EmployeeTypeSecondPart from './EmployeeTypeSecondPart';
import { helpers } from './LinkCoeffEmpHelper';
import MultiSelect from '../SelectComponent';
import { getAllEmpCoeffAndValueTypes, savePcLinkingData } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

var SERVER_SIDE_RENDERING = 1;
const LinkCoeffEmpComponent = (props) => {
  const { state, updateStateChanges } = useContext(LinkCoeffEmpContext);
  useEffect(() => {
    SERVER_SIDE_RENDERING ? fetchEmpCoeffValueTypesData() : SERVER_SIDE_RENDERING += 1;
  }, [])

  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchEmpCoeffValueTypesData = async () => {
    await APICALL.service(`${getAllEmpCoeffAndValueTypes}?pcid=${props.pcid}`, 'GET').then(response => {
      if (response.status === 200)
        assignDataToStateVariables(response.data);
    })
  }

  /**
   * [assignDataToStateVariables updating data in state variables/ context state variables]
   * @param  {Object}     data  [response data from backend]
   * @return {void}      [no return]
   */
  const assignDataToStateVariables = (data) => {
    const { employeeTypes, coefficientTypes, valueTypes, pcLinkedValueData, pcArray } = data;
    updateStateChanges({
      employeeTypeArray: employeeTypes
      , coefficientTypeArray: coefficientTypes
      , valueTypeArray: valueTypes
      , pclinkingValueobj: pcLinkedValueData || {}
      , pcArray: [{value: false, label: '--- Select ---'}, ...pcArray]
      , selectedPc: parseInt(props.pcid),
    });
  }

  /**
   * [handleSubmit save data into datbase]
   * @return {Promise} [description]
   */
  const handleSubmit = async () => {
    if(proceedToSubmit()) {
      await APICALL.service(`${savePcLinkingData}`, 'POST', postdata())
      .then(response => {
        if (response.status === 200)
          props.router.push('/');
     })
    }
  }

  const proceedToSubmit = () => {
    let proceed = true;
    if (!state.selectedPc) {
      proceed = false;
      updateStateChanges({ pcWarning: true })
    }
    if(state.selectedPc && !helpers.checkCoefficientsFilledOrNot(state.coefficientTypeArray, state.employeeTypeArray, state.pclinkingValueobj)) {
      proceed = false;
      updateStateChanges({ emptyDataWarning: true })
    }
    if(state.lowHighValidation.length)
      proceed = false;
    if(state.valueErrorArray.length)
      proceed = false;
    return proceed;
  }

  /**
   * [postdata needed postdata to send to backend]
   * @return {Object} [description]
   */
  const postdata = () => {
    return { pclinkingValueobj: state.pclinkingValueobj, selectedPc: state.selectedPc }
  }

  /**
   * [onSelect whenever we change pc resetting all values to empty state]
   * @param  {[Object]} e               [description]
   * @return {[Void]}   [description]
   */
  const onSelect = (e) => {
    removeWarningClass()
    updateStateChanges({
      selectedPc: e.value,
      pcWarning: false,
      emptyDataWarning: false,
      pclinkingValueobj: {},
      lowHighValidation: [],
      valueErrorArray: [],
    });
  }

/**
 * [removeWarningClass description]
 * @return {[void]} [description]
 */
  const removeWarningClass = () => {
    state.lowHighValidation.map(val => {
      let lowRef  = state.inputRef.current[`${val}_1`];
      let highRef = state.inputRef.current[`${val}_3`];
      lowRef.classList.remove("warning");
      highRef.classList.remove("warning");
    })
  }

 const addMultiSelectTag = () => {
    return (
      <MultiSelect
        options={state.pcArray}
        standards={state.pcArray.filter(val => val.value === state.selectedPc)}
        disabled={parseInt(props.pcid) && state.selectedPc ? true : false}
        handleChange={onSelect}
        isMulti={false}
        className="pc-single-select"
        placeholder={'Select paritair comite'}
      />
    )
  }

  if (SERVER_SIDE_RENDERING)
    return <>
      <div className="m-4">
        <div className="col-md-12 row p-0 m-0">
        <h4>{(Number(props.pcid) ? 'Edit': 'Add') + ' link coefficients to employee types'}</h4>
        <div className="col-md-3 mt-2 mb-3 p-0"> {addMultiSelectTag()}
          {state.pcWarning ? <small style={{ color: 'red' }}> Choose paritair comite </small> : null}
        </div>
        {state.lowHighValidation.length > 0 &&
            <small className="col-md-6 mt-3 mb-3 warning-message">
              {`Change highlighted low and high values low value should be less than high value (Low < High)`}
            </small>}
      {state.emptyDataWarning === true &&
          <small className="col-md-6 mt-3 mb-3 warning-message">
            {`Please fill all coefficient fields to save`}
          </small>}
        {state.valueErrorArray.length > 0 &&
            <small className="col-md-3 mt-3 mb-3 warning-message">
              {`Value should be in between 0 to 10`}
            </small>}
        </div>
        <div className="col-md-12 row link-emp-coeff-tableparent">
          <div className="col-md-3 m-0 p-0 pc-linking-div firstpart">
            <CoeffcientValuesFirstPart />
          </div>
          <div className="col-md-9 m-0 p-0 pc-linking-div secondpart">
            <EmployeeTypeSecondPart />
          </div>
        </div>
        <div style={{ textAlign: 'end', marginTop: '10px' }}>
          <button onClick={() => props.router.push('/')} type="button" className="btn btn-dark pcp_btn col-1">
            {`Back`}
          </button>
          <button onClick={() => handleSubmit()} type="button" className="btn btn-dark pcp_btn col-1">
            {`Save`}
          </button> </div>
      </div>
    </>
  else
    return <></>
}

export default LinkCoeffEmpComponent;
