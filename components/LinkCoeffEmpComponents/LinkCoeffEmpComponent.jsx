import React, { useContext, useEffect } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';
import CoeffcientValuesFirstPart from './CoeffcientValuesFirstPart';
import EmployeeTypeSecondPart from './EmployeeTypeSecondPart';
import { helpers } from './LinkCoeffEmpHelper';
import MultiSelect from '../SelectComponent';
import Image from 'next/image';
import { getAllEmpCoeffAndValueTypes, savePcLinkingData } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import Translation from '@/Translation';
var SERVER_SIDE_RENDERING = 1;
const LinkCoeffEmpComponent = (props) => {
  const { t } = props;
  const { state, updateStateChanges } = useContext(LinkCoeffEmpContext);
  const { inputRef, isOverflow } = state;
  useEffect(() => {
    SERVER_SIDE_RENDERING ? fetchEmpCoeffValueTypesData() : SERVER_SIDE_RENDERING += 1;
  }, [])

  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchEmpCoeffValueTypesData = async (url = `${getAllEmpCoeffAndValueTypes}?pcid=${props.pcid}`, type = 0) => {
    let res;
    await APICALL.service(url, 'GET').then(response => {
      if (response.status === 200) {
        if(type)
          res = response;
        else assignDataToStateVariables(response.data)
      }
    })
    return res;
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
      , pcArray: [{ value: false, label: '--- Select ---' }, ...pcArray]
      , selectedPc: parseInt(props.pcid),
    });
  }

  /**
   * [handleSubmit save data into datbase]
   * @return {Promise} [description]
   */
  const handleSubmit = async () => {
    if (proceedToSubmit()) {
      await APICALL.service(`${savePcLinkingData}`, 'POST', postdata())
        .then(response => {
          if (response.status === 200)
            props.router.push('/linkcofficientpc/manage');
        })
    }
  }

/**
 * [proceedToSubmit description]
 * @return {[Boolean]} [description]
 */
  const proceedToSubmit = () => {
    let proceed = true;
    if (!state.selectedPc) {
      proceed = false;
      updateStateChanges({ pcWarning: true })
    }
    const { status, regExpressionStatus } = helpers.checkCoefficientsFilledOrNot(state.coefficientTypeArray, state.employeeTypeArray, state.pclinkingValueobj);
    if (state.selectedPc && (!status || !regExpressionStatus)) {
      proceed = false;
      updateStateChanges({ emptyDataWarning: !status, regExpWarning: !regExpressionStatus })
    }
    if (state.lowHighValidation.length)
      proceed = false;
    if (state.valueErrorArray.length)
      proceed = false;
    if (state.defaultValueError.length)
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
  const onSelect = async (e) => {
    removeWarningClass()
    let response = await fetchEmpCoeffValueTypesData(`${getAllEmpCoeffAndValueTypes}?pcid=${e.value || 0}&edit=1`, 1);
    const { employeeTypes = [] } = response.data;
    updateStateChanges({
      employeeTypeArray: employeeTypes,
      selectedPc: e.value,
      pcWarning: false,
      emptyDataWarning: false,
      regExpWarning: false,
      pclinkingValueobj: {},
      lowHighValidation: [],
      valueErrorArray: [],
      defaultValueError: [],
    });
  }

  /**
   * [removeWarningClass description]
   * @return {[void]} [description]
   */
  const removeWarningClass = () => {
    state.lowHighValidation.map(val => {
      let lowRef = inputRef.current[`${val}_1`];
      let highRef = inputRef.current[`${val}_3`];
      lowRef.classList.remove("warning");
      highRef.classList.remove("warning");
    })
  }

  const addMultiSelectTag = () => {
    return (
      <>
      <p className='my-2 poppins-medium-18px custom_astrick'> {t('Select paritair comite')} </p>
      <MultiSelect
        options={state.pcArray}
        standards={state.pcArray.filter(val => val.value === state.selectedPc)}
        disabled={parseInt(props.pcid) && state.selectedPc ? true : false}
        handleChange={onSelect}
        isMulti={false}
        className="pc-single-select  input-border-lightgray poppins-regular-18px mh-50 rounded-0 linkcoe mb-3"
        placeholder={'Select paritair comite'}
      />
      </>
    )
  }

  if (SERVER_SIDE_RENDERING)
    return <>
      <div className="row">
        <div className="col-md-12 m-0">
         <div className='py-4 px-0 position-sticky-pc'>
         {/* <h4 className={`sv-cp-page-title  page-title font-weight-bold  bitter-italic-normal-medium-24 px-0`}> Link coefficients to employee types</h4> */}
         <h4 className={`page-title font-weight-bold  bitter-italic-normal-medium-24 px-0`}> {t('Link coefficients to employee types')}</h4>
         </div>
          <div className='row position-sticky-config-link'>
          <div className="col-md-5 col-lg-3"> {addMultiSelectTag()}
            {state.pcWarning ? <small style={{ color: 'red' }} className='error_text mt-3'> {t('Choose paritair comite')} </small> : null}
          </div>
          <div className='col-md-7 col-lg-9'>

          <div className='row'>
          {state.lowHighValidation !== undefined && state.lowHighValidation.length > 0 &&
            <small className="col-md-12 my-2 text-danger text-left error_text">
              {t('Please change the highlighted low and high values, low value should be less than high value Low < High.')}
            </small>}
          {state.emptyDataWarning === true &&
            <small className="col-md-12 my-2 text-danger text-left error_text">
              {t(`Please fill all coefficient fields.`)}
            </small>}
          {state.valueErrorArray.length > 0 &&
            <small className="col-md-12 my-2 text-danger text-left error_text">
              {t(`Value should be in between 0 to 10.`)}
            </small>}
          {state.defaultValueError.length > 0 &&
            <small className="col-md-12 my-2 text-danger text-left error_text">
              {t(`Default value should be in between low and high values.`)}
            </small>}
            {state.regExpWarning === true && <small className="col-md-10 my-2 text-danger text-left error_text" id="reg-expression-div">
              {t(`Please enter proper values.`)}
            </small>}
          </div>
          </div>
          </div>
          <div className="col-md-12 m-0 p-0 relative-div right_arrow_align">
          {/* {scrollLeft && <span onClick={() => updateStateChanges(helpers.scrollContent(0))} style={{ right: scrollRight === false && scrollLeft === true ? 0 : '35px' }}>
              <Image src={backwardScroll} alt="backward" title="backward scroll" /> </span>}
          {scrollRight && <span onClick={() => updateStateChanges(helpers.scrollContent())} style={{ right: 0 }}>
              <Image src={forwardScroll} alt="forward" title="forward scroll" /> </span>} */}
          {/* <div className="row link-emp-coeff-tableparent" id="linkempCoeffDivId" style={{ width: `${tableWidth}` }}> */}
          <div className={`row link-emp-coeff-tableparent ${isOverflow ? 'table-overflow' : ''}`} id="linkempCoeffDivId">
            <div className="col-lg-3 col-md-6 m-0 p-0 pc-linking-div firstpart">
              <CoeffcientValuesFirstPart />
            </div>
            <div className="col-lg-9 col-md-6 m-0 p-0 pc-linking-div secondpart">
              <EmployeeTypeSecondPart />
            </div>
          </div>
        </div>
        <div className='col-md-12 row m-0 mt-5 mb-2' style={{  }}>
          <div className='col-md-6 p-0 align-self-center'>
          <button onClick={() => parseInt(props.pcid) ? props.router.back() : props.router.push('/manage')} type="button" className=" col-2 bg-white  text-start border-0 poppins-regular-18px  float-sm-right text-left p-0 md-5 text-decoration-underline shadow-none">
            {t(`BACK`)}
          </button>
          </div>
          <div className='col-md-6 p-0'>
          <button onClick={() => handleSubmit()} type="button" className=" btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none">
            {t(`SAVE`)}
          </button></div>
           </div>
        </div>

      </div>
    </>
  else
    return <></>
}

export default React.memo(Translation(LinkCoeffEmpComponent,['Select paritair comite','Select paritair comite','Link coefficients to employee types','Choose paritair comite',
'Please change the highlighted low and high values, low value should be less than high value (Low < High).',`Please fill all coefficient fields.`,`Value should be in between 0 to 10.`,
`Default value should be in between low and high values.`,`Please enter proper values.`,`BACK`,`SAVE`]));
