import React, { useContext, useState, useRef, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { getPcLinkedCoeffData } from '@/Services/ApiEndPoints';
import Image from 'next/image';
// import forwardScroll from '@/components/images/right-arrow.png';
// import backwardScroll from '@/components/images/left-arrow.png';
import { helpers } from '@/components/LinkCoeffEmpComponents/LinkCoeffEmpHelper';
import styles from '../absoluteAgent.module.css';
import LeftPart from './LeftPart';
import RightPart from './RightPart';
import MultiSelectField from '@/atoms/MultiSelectField';
import { APICALL } from '@/Services/ApiServices';
import Translation from '@/Translation';

const CoefficientPage = (props) => {
  const {t} = props;
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { pcArray = [], alreadyLinked = [], dependecyDataStatus } = state;
  const [ compState, setCompState ] = useState({
    employeeTypeArray: []
    , coefficientTypeArray: []
    , valueTypeArray: []
    , pclinkingValueobj: {}
    , selectedPc: null
    , pcWarning: false
    , lowHighValidation: []
    , inputRef: useRef({})
    , lowKey: 1
    , defaultKey: 2
    , highKey: 3
    , minValue: 0
    , maxValue: 10
    , regexp: /^[0-9,]*$/
    , valueErrorArray: []
    , emptyDataWarning: false
    , isOverflow: false
    , tableWidth: '100%'
    , scrollLeft: undefined
    , scrollRight: undefined
    , emptyError: false
  });

  // const { scrollLeft, scrollRight, tableWidth } = compState;
  const onSelect = async ({ value }) => {
    if(!value) {
      dependecyDataStatus['cooperationCoeffData'] = true;
      setCompState({...compState, selectedPc: value});
      updateStateChanges({coeffPageData: {...compState, selectedPc: value}, dependecyDataStatus })
      return;
    }
    await APICALL.service(`${getPcLinkedCoeffData}/${value}`, 'GET').then(response => {
      if (response.status === 200) {
        let tab_1 = state['tab_1'];
        let data = assignDataToStateVariables(value, response.data);
        dependecyDataStatus['cooperationCoeffData'] = true;
        data['emptyError'] = !response['data'].employeeTypeArray.length;
        setCompState(data);
        tab_1['cooperationCoeffData'] = data.pclinkingValueobj || {};
        updateStateChanges({coeffPageData: data, dependecyDataStatus, tab_1})
      }
    })
  }

  /**
   * [assignDataToStateVariables updating data in state variables/ context state variables]
   * @param  {Object}     data  [response data from backend]
   * @return {void}      [no return]
   */
  const assignDataToStateVariables = (pcId, data) => {
    const { employeeTypeArray, coefficientTypeArray, pclinkingValueobj } = data;
    return {...compState,
      employeeTypeArray: employeeTypeArray
      , coefficientTypeArray: coefficientTypeArray
      , valueTypeArray: [{ value: 2, label: 'Default' }]
      , pclinkingValueobj: pclinkingValueobj || {}
      , selectedPc: parseInt(pcId)
      , emptyError: false
    };
  }

  useEffect(() => {
    const { coeffPageData = {} } = state;
    setCompState({...compState, ...coeffPageData});
  }, [])

  const addPCSelectDropDown = () => {
    let selectedIds = helpers.takeSelectedIds(alreadyLinked, state['workersServantsCompState']);
    let pcoptions = [{value: false, label: '--- Select ---'}, ...pcArray];
    return (
      <>
      <p className='my-2 poppins-medium-18px'> {t('Select paritair comite to link coefficients to employee types')} </p>
     <div className='row pe-3'>
     <div className='col-md-12'>
     <MultiSelectField
        options={pcoptions.filter(val => selectedIds.includes(val.value))}
        standards={pcoptions.filter(val => val.value === compState.selectedPc)}
        handleChange={onSelect}
        isMulti={false}
        className="pc-single-select"
        placeholder={t('Select paritair comite')}
      />
      </div>
     </div>
      </>
    )
  }
  return (
    <div className={`${styles['coeffcient-table-parent']}`}>
      <div className="col-md-6 mt-2 mb-3 p-0"> {addPCSelectDropDown()}
        {compState.pcWarning ? <small style={{ color: 'red' }}> {t('Choose paritair comite')} </small> : null}
      </div>
      {compState.valueErrorArray.length > 0 &&
        <small className="col-md-3 mt-3 mb-3 warning-message">
          {t(`Some values are not in between low and high value.`)}
        </small>}
      {compState.selectedPc ? <div className="col-md-12 m-0 p-0 relative-div">
        {compState.emptyError !== true ? <>
        <p className={`mb-4 mt-5 text-center d-none ${styles['worker-servants-title']}`}> {t('Link coefficients to employee types')}</p>
        {/*scrollLeft && <span onClick={() => updateStateChanges(helpers.scrollContent(0))} style={{ right: scrollRight === false && scrollLeft === true ? 0 : '35px' }}>
            <Image src={backwardScroll} alt="backward" title="backward scroll" /> </span>*/}
        {/*scrollRight && <span onClick={() => updateStateChanges(helpers.scrollContent())} style={{ right: 0 }}>
            <Image src={forwardScroll} alt="forward" title="forward scroll" /> </span>*/}
        <div className="row link-emp-coeff-tableparent" id="linkempCoeffDivId" style={{ width: '100%', minHeight: '150px' }}>
          <div className="col-md-3 m-0 p-0 pc-linking-div firstpart">
            <LeftPart compState={compState} setCompState = {setCompState} />
          </div>
          <div className="col-md-9 m-0 p-0 pc-linking-div secondpart">
            <RightPart compState={compState} setCompState = {setCompState}/>
          </div>
        </div>
        </>:<p className={'text-align-left poppins-light-16px'}> {t('This PC is not linked with coefficients to employee types.')} </p>}
      </div>:null}
    </div>
  );
}

export default React.memo(Translation(CoefficientPage,['Select paritair comite to link coefficients to employee types','Select paritair comite',
'Choose paritair comite',`Some values are not in between low and high value.`,'Link coefficients to employee types','This PC is not linked with coefficients to employee types.']));
