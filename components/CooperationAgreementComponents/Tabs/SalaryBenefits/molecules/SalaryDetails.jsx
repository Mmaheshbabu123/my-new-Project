import React, { useContext, useState } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import InputField from '@/atoms/InputTextfield';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import styles from '../SalaryBenefits.module.css';
import { soortOptions, premiesAutoArray } from '../../../Definations';


const TAB_ID = 5;
const stateKey = 'tab_5';
const SalaryDetails = (props) => {
  const { state: { benefitCodes, salaryCodes, allCodes }, updateStateChanges, state } = useContext(CooperationAgreementContext);
  var { tab_5: {
    cooperationSalaryDetails,
    cooperationSalaryLinked,
    cooperationBenefits
  }, salaryDataPerPc, dependecyDataStatus } = state;
  const [ compState, setCompState ] = useState({  expand: {} })

  const expandMinimizeDiv = (pcid) => {
    let expand = {...compState.expand };
    expand[pcid] = !expand[pcid];
    setCompState({...compState, expand: expand})
  }

  const showSalaryDetailsOfEachPc = (val, index) => {
    const { expand } = compState;
    return(
      <div key = {val.pc_id} className={`${styles['expand-minimize-div']} poppins-medium-18px`}>
        <div>
          <span onClick={() => expandMinimizeDiv(val.pc_id)} title={expand[val.pc_id] === true ? 'Close' : 'Open'} className={`${styles['expand-minimize-span']} close_open_basic_details`} > {!expand[val.pc_id] ? <FaRegMinusSquare />: <FaRegPlusSquare />} </span>
          <div  onClick={() => expandMinimizeDiv(val.pc_id)} className={`${styles['expand-minimize-box']} mb-2`}> <span> {val.pc_name} </span> </div>
          <span onClick={() => props.onDelete(val.pc_id, index)} title={'Delete'} className={`${styles['expand-minimize-span']} salary_benefit_delete`}> <TiDelete /> </span>
        </div>
        {!expand[val.pc_id] ? <div className={`${styles['salay-content-div']}`}>
              {showSalaryContent(val.pc_id)}
        </div>:null}
      </div>
    );
  }

  const showSalaryContent = (pcId) => {
    let salaryDataArray = salaryDataPerPc[pcId] || [];
    let tableHtmlContent = [];
    tableHtmlContent.push(
      <div className = {`${styles['pc-linked-salary-div']}`}>
      <table className={`table table-hover ${styles['pc-linked-salary-table']}`}>
      {salaryDataArray.map(salary => {
          return (
            <tr key = {salary.salary_id} height="75">
                <td width="40%" className={`${styles['pc-linked-td']} poppins-medium-18px align-middle`} style={{borderRight: '1px solid lightgray'}}>
                  <span className="custom_astrick px-0">{ salary.salary_name }</span>
                </td>
                <td width="60%" className={`${styles['pc-linked-td']}`}>
                  {showLinkedInputFields(pcId, salary)}
                </td>
            </tr>
          )
        })}
      </table>
      {showSalaryCoeffFields(pcId)}
      </div>
    );
    return tableHtmlContent;
  }


    const showLinkedInputFields = (pcId, salaryObj) => {
      let fieldId = salaryObj.salary_id;
      let valueObj = cooperationSalaryLinked[pcId][fieldId] || {};
      let resetObj = salaryObj.mandotory !== 1 && valueObj['checked'] !== 1 ? {value: salaryObj.salary_value, granted: salaryObj.granted } : {};
      return(
        <div className = {`${styles['salary-input-field-div']} px-0 py-4`} >
          {salaryObj.mandotory !== 1 && <>
            <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('checked', pcId, fieldId, 1, 0, 0, resetObj)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
            <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('checked', pcId, fieldId, 0, 0, 0, resetObj)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
          </>}
          {salaryObj.mandotory === 1 || valueObj.checked ?
           <div className={`${styles['salary-input-field-div']} position-relative`}>
            <InputField type = {'text'}
              className = {`${styles['salary-input-value']} col-md-8 poppins-regular-18px`}
              name={'value'}
              value={valueObj['value'] !== undefined ? valueObj['value'] : salaryObj.salary_value}
              placeholder={'Value'}
              handleChange={(e)=>handleChange('value', pcId, fieldId, '', 0, e.target)}
            />
            <span className="position-absolute input-group-text rounded-0 border-0" style = {{right: '33.5%', top: '0.2%', height:'2.6rem'}}> {salaryObj.value_type === 1 ? '€' : '%'} </span>
            <div className="mt-3">
              <LabelField title="Is the benefit granted in case of absence of the employee" customStyle={{marginBottom: '-25px'}} className="poppins-regular-18px px-0 mb-1"/>
              <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('granted', pcId, fieldId, 1, 0, 0, resetObj)}> {valueObj['granted'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
              <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('granted', pcId, fieldId, 0, 0, 0, resetObj)}> {valueObj['granted'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
            </div>
          </div>
          :null}
        </div>
      );
    }

  const showSalaryCoeffFields = (pcId) => {
    return (
      <div className={`${styles['salary-coeff-fields-div']}`}>
          {premiesAutoArray.map(obj => {
            let fieldId = obj.type;
            let valueObj = cooperationBenefits[pcId][fieldId] || {};
            let resetObj = valueObj['checked'] !== 1 ? {code: 0, bedrag: '', percentage: '', soort_automatisering: ''} : {};
            return(
              <div key={'salary_' + fieldId} className={`${styles['salary-coeff-fields-premies']}`}>
                <LabelField title={obj.name} mandotory={true} customStyle={{margin:'10px 0'}} className={'poppins-regular-18px'}/>
                <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('checked', pcId, fieldId, 1, 1, 0, resetObj)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
                <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleChange('checked', pcId, fieldId, 0, 1, 0, resetObj)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
                {showPremiseAutomatischTable(pcId, fieldId, obj.rows, valueObj)}
              </div>
            );
          })}
      </div>
    );
  }

  const showPremiseAutomatischTable = (pcId, fieldId, rows, valueObj) => {
    let rowLabels = rows || [];
    let tableHtmlContent = [];
    let classKey = valueObj.checked ? 'display-visible' : 'display-hidden';
    tableHtmlContent.push(
      <div className={`${styles['premise-automatisch-div']} ${styles[classKey]}`}>
        <table className={`table table-hover ${styles['pc-linked-salary-table']}`}>
        {rowLabels.map((label, index) => {
            return (
              <tr key = {index} height="75">
                  <td width="40%" className={`${styles['pc-linked-premies-td']} poppins-medium-18px`} style={{borderRight: '1px solid lightgray'}}>
                    <span className='px-0'>{ label.label }</span>
                  </td>
                  <td width="60%" className={`${styles['pc-linked-premies-td']} poppins-regular-18px`}>
                    {premiseAutomatischInputFields(pcId, fieldId, label, valueObj)}
                  </td>
              </tr>
            )
          })}
        </table>
    </div>)
    return tableHtmlContent;
  }

  const premiseAutomatischInputFields = (pcId, fieldId, label, valueObj) => {
    if(label.label === 'Code' || label.key === 'soort_automatisering') {
      let bBrightCodes = fieldId === 1 ? benefitCodes : salaryCodes;
      return showDropDown(pcId, fieldId, label.key, valueObj, label.key === 'soort_automatisering' ? soortOptions : bBrightCodes);
    } else {
      let codeDetailsObj =  valueObj.code ? allCodes[valueObj.code] : {};
      let variableType = codeDetailsObj && codeDetailsObj.variable_type ?  codeDetailsObj.variable_type : '';
      let labelKey = label.key;
      let disabled = disabledOrNot(variableType, labelKey);
      let expression = /^[0-9,]*$/;
      return <InputField type = {'text'}
        className = {`${styles['salary-coeff-input-value']}`}
        name={label.key}
        value={valueObj[label.key] || ''}
        isDisabled= {disabled}
        placeholder={''}
        handleChange={(e)=>handleChange(label.key, pcId, fieldId, '', 1, e.target, {}, expression)}
      />
    }
  }

  const disabledOrNot = (variableType, labelKey) => {
    return false;
    // if(variableType === '') return false;
    // if(variableType === 'amount' && labelKey === 'bedrag') {
    //   return false;
    // }
    // if(variableType === 'percentage' && labelKey === 'percentage') {
    //   return false;
    // }
    // return true;
  }

  const showDropDown = (pcId, fieldId, label, valueObj, optionsArray) => {
    return(
      <div className='ps-0 pe-3'>
        <MultiSelectField
            options={optionsArray}
            standards={optionsArray.filter(val => val.value === valueObj[label])}
            handleChange={(e)=>handleChange(label, pcId, fieldId, e.value, 1)}
            isMulti={false}
            className={`${styles['salary-benefits-multiselect']} poppins-regular-18px`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}jmj`}
            placeholder={''}
        />
      </div>
    );
  }

  const handleChange = (name, pcId, fieldId, val, from = 0, target = 0, mergeObj = {}, expression = '') => {
    let value = target ? target.value : val;
    if(expression && !value.match(expression)) return;
    let key = from ? 'cooperationBenefits' : 'cooperationSalaryLinked';
    let salaryLinkedData = from ? {...cooperationBenefits} : {...cooperationSalaryLinked};
    salaryLinkedData[pcId][fieldId] = {...(salaryLinkedData[pcId][fieldId] ? salaryLinkedData[pcId][fieldId] : {}),
      [name]: target ? target.value : val,
      ...mergeObj
    }
    dependecyDataStatus[from ? 'cooperationBenefits' : 'cooperationSalaryLinked'] = true;
    let tab_5 = {...state[stateKey]};
    tab_5[[key]] = salaryLinkedData;
    updateStateChanges({tab_5});
  }

  return (
    <div className={''}>
      {cooperationSalaryDetails.map((val, index) => showSalaryDetailsOfEachPc(val, index))}
    </div>
  );
}

export default React.memo(SalaryDetails);
