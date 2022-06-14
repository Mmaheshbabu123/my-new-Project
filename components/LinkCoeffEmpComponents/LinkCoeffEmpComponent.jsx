import React, { useContext, useEffect } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';
import EmployeeValueFirstPart from './EmployeeValueFirstPart';
import CoefficientSecondPart from './CoefficientSecondPart';
import MultiSelect from '../SelectComponent';
import { getAllEmpCoeffAndValueTypes, savePcLinkingData } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

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
      , pcArray: pcArray
      , selectedPc: parseInt(props.pcid)
    });
  }

  /**
   * [handleSubmit save data into datbase]
   * @return {Promise} [description]
   */
  const handleSubmit = async () => {
    if (state.selectedPc) {
      await APICALL.service(`${savePcLinkingData}`, 'POST', postdata())
        .then(response => {
          if (response.status === 200)
            props.router.push('/');
        })
    } else {
      updateStateChanges({ pcWarning: true })
    }
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
    updateStateChanges({ selectedPc: e.value, pcWarning: false, pclinkingValueobj: {} });
  }

  if (SERVER_SIDE_RENDERING)
    return <>
      <div className="m-4">
        <div className="col-md-3 mt-2 mb-4 p-0">
          <MultiSelect
            options={state.pcArray}
            standards={state.pcArray.filter(val => val.id === state.selectedPc)}
            disabled={parseInt(props.pcid) && state.selectedPc ? true : false}
            handleChange={onSelect}
            isMulti={false}
            className="pc-single-select"
            placeholder={'Select paritiar committe'}
          />
          {state.pcWarning ? <small style={{ color: 'red' }}> Choose paritiar committe </small> : null}
        </div>
        <div className="col-md-12 row link-emp-coeff-tableparent">
          <div className="col-md-3 m-0 p-0 pc-linking-div firstpart">
            <EmployeeValueFirstPart />
          </div>
          <div className="col-md-9 m-0 p-0 pc-linking-div secondpart">
            <CoefficientSecondPart />
          </div>
        </div>
        <div style={{ textAlign: 'end', marginTop: '10px' }}>
          <button onClick={() => handleSubmit()} type="button" className="btn btn-dark pcp_btn col-1">
            {`Save`}
          </button> </div>
      </div>
    </>
  else
    return <></>
}

export default LinkCoeffEmpComponent;
