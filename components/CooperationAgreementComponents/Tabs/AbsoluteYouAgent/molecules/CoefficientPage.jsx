import React, { useContext, useState, useRef, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { getPcLinkedCoeffData } from '@/Services/ApiEndPoints';
import Image from 'next/image';
import forwardScroll from '@/components/images/right-arrow.png';
import backwardScroll from '@/components/images/left-arrow.png';
import { helpers } from '@/components/LinkCoeffEmpComponents/LinkCoeffEmpHelper';
import styles from '../absoluteAgent.module.css';
import LeftPart from './LeftPart';
import RightPart from './RightPart';
import MultiSelectField from '@/atoms/MultiSelectField';
import { APICALL } from '@/Services/ApiServices';

const CoefficientPage = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { pcArray = [], alreadyLinked = [] } = state;
  const [ compState, setCompState ] = useState({
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
    , valueErrorArray: []
    , emptyDataWarning: false
    , isOverflow: false
    , tableWidth: '100%'
    , scrollLeft: undefined
    , scrollRight: undefined
  });

  const { scrollLeft, scrollRight, tableWidth } = compState;
  const onSelect = async ({ value }) => {
    await APICALL.service(`${getPcLinkedCoeffData}/${value}`, 'GET').then(response => {
      if (response.status === 200) {
        let data = assignDataToStateVariables(value, response.data);
        setCompState(data);
        updateStateChanges({coeffPageData: data})
      }
    })
  }

  /**
   * [assignDataToStateVariables updating data in state variables/ context state variables]
   * @param  {Object}     data  [response data from backend]
   * @return {void}      [no return]
   */
  const assignDataToStateVariables = (pcId, data) => {
    const { employeeTypes, coefficientTypes, pcLinkedValueData } = data;
    return {...compState,
      employeeTypeArray: employeeTypes
      , coefficientTypeArray: coefficientTypes
      , valueTypeArray: [{ value: 2, label: 'Default' }]
      , pclinkingValueobj: pcLinkedValueData || {}
      , selectedPc: parseInt(pcId),
    };
  }

  useEffect(() => {
    const { coeffPageData = {} } = state;
    setCompState({...compState, ...coeffPageData});
  }, [])

  const addPCSelectDropDown = () => {
    let selectedIds = helpers.takeSelectedIds(alreadyLinked, state['workersServantsCompState']);
    return (
      <MultiSelectField
        options={pcArray.filter(val => selectedIds.includes(val.value))}
        standards={pcArray.filter(val => val.value === compState.selectedPc)}
        handleChange={onSelect}
        isMulti={false}
        className="pc-single-select"
        placeholder={'Select paritair comite'}
      />
    )
  }
  return (
    <div className={`${styles['coeffcient-table-parent']}`}>
      <div className="col-md-3 mt-2 mb-3 p-0"> {addPCSelectDropDown()}
        {compState.pcWarning ? <small style={{ color: 'red' }}> Choose paritair comite </small> : null}
        {compState.valueErrorArray.length > 0 &&
          <small className="col-md-3 mt-3 mb-3 warning-message">
            {`Wrong value range.`}
          </small>}
      </div>
      {compState.selectedPc ? <div className="col-md-12 m-0 p-0 relative-div">
        {scrollLeft && <span onClick={() => updateStateChanges(helpers.scrollContent(0))} style={{ right: scrollRight === false && scrollLeft === true ? 0 : '35px' }}>
            <Image src={backwardScroll} alt="backward" title="backward scroll" /> </span>}
        {scrollRight && <span onClick={() => updateStateChanges(helpers.scrollContent())} style={{ right: 0 }}>
            <Image src={forwardScroll} alt="forward" title="forward scroll" /> </span>}
        <div className="row link-emp-coeff-tableparent" id="linkempCoeffDivId" style={{ width: `${tableWidth}`, height: '350px' }}>
          <div className="col-md-3 m-0 p-0 pc-linking-div firstpart">
            <LeftPart compState={compState} setCompState = {setCompState} />
          </div>
          <div className="col-md-9 m-0 p-0 pc-linking-div secondpart">
            <RightPart compState={compState} setCompState = {setCompState}/>
          </div>
        </div>
      </div>:null}
    </div>
  );
}

export default React.memo(CoefficientPage);
