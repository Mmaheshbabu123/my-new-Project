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
import CheckBoxField from '@/atoms/CheckBoxField';
// import { helpers } from '../SalaryBenefitHelper';  //.


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
      <div key = {val.pc_id} className={`${styles['expand-minimize-div']}`}>
        <div>
          <span onClick={() => expandMinimizeDiv(val.pc_id)} title={expand[val.pc_id] === true ? 'Close' : 'Open'} className={`${styles['expand-minimize-span']}`} > {!expand[val.pc_id] ? <FaRegMinusSquare />: <FaRegPlusSquare />} </span>
          <div  onClick={() => expandMinimizeDiv(val.pc_id)} className={`${styles['expand-minimize-box']}`}> <span> {val.pc_name} </span> </div>
          <span onClick={() => props.onDelete(val.pc_id, index)} title={'Delete'} className={`${styles['expand-minimize-span']}`}> <TiDelete /> </span>
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
                <td width="40%" className={`${styles['pc-linked-td']}`} style={{borderRight: '2px solid lightgray'}}>
                  <span className="custom_astrick">{ salary.salary_name }</span>
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
      let resetObj = valueObj['checked'] !== 1 ? {value: salaryObj.salary_value } : {};
      return(
        <div className = {`${styles['salary-input-field-div']}`} >
          <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 1, 0, 0, resetObj)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
          <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 0, 0, 0, resetObj)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
          {valueObj.checked ? <InputField type = {'text'}
            className = {`${styles['salary-input-value']} col-md-4`}
            name={'value'}
            value={valueObj['value'] !== undefined ? valueObj['value'] : salaryObj.salary_value}
            isDisabled= {salaryObj.salary_value} placeholder={'Value'}
            handleChange={(e)=>handleChange('value', pcId, fieldId, '', 0, e.target)}
          />:null}
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
                <LabelField title={obj.name} mandotory={true} customStyle={{margin:'10px 0'}}/>
                <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 1, 1, 0, resetObj)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
                <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 0, 1, 0, resetObj)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
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
                  <td width="40%" className={`${styles['pc-linked-premies-td']}`} style={{borderRight: '2px solid lightgray'}}>
                    <span>{ label.label }</span>
                  </td>
                  <td width="60%" className={`${styles['pc-linked-premies-td']}`}>
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
      let optionVal = label.label === 'Code' ? valueObj[label.key] : Number(valueObj[label.key]);
      return <InputField type = {'text'}
        className = {`${styles['salary-coeff-input-value']}`}
        name={label.key}
        value={optionVal}
        isDisabled= {disabled}
        placeholder={''}
        handleChange={(e)=>handleChange(label.key, pcId, fieldId, '', 1, e.target)}
      />
    }
  }

  const disabledOrNot = (variableType, labelKey) => {
    if(variableType === '') return false;
    if(variableType === 'amount' && labelKey === 'bedrag') {
      return false;
    }
    if(variableType === 'percentage' && labelKey === 'percentage') {
      return false;
    }
    return true;
  }

  const showDropDown = (pcId, fieldId, label, valueObj, optionsArray) => {
    return(
      <div >
        <MultiSelectField
            options={optionsArray}
            standards={optionsArray.filter(val => val.value === valueObj[label])}
            handleChange={(e)=>handleChange(label, pcId, fieldId, e.value, 1)}
            isMulti={false}
            className={`${styles['salary-benefits-multiselect']}`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}`}
            placeholder={''}
        />
      </div>
    );
  }

  const handleChange = (name, pcId, fieldId, val, from = 0, target = 0, mergeObj = {}) => {
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
