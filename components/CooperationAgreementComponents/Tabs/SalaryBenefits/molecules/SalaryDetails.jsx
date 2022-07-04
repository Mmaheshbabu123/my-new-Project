import React, { useContext, useState } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import InputField from '@/atoms/InputTextfield';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import styles from '../SalaryBenefits.module.css';
import { codeArray } from '../../../Definations';
// import { helpers } from '../SalaryBenefitHelper';  //.


const TAB_ID = 5;
const stateKey = 'tab_5';
const SalaryDetails = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  var { tab_5: {
    cooperationSalaryDetails,
    cooperationSalaryLinked,
    cooperationBenefits
  }, salaryDataPerPc } = state;

  const [ compState, setCompState ] = useState({
      expand: {},
      premiesAutoArray: [
        {
          type: 1,
           name: 'Premies en vergoeding (Benefits)',
           rows: ['Code', 'Bedrag', 'Percentage']},
        {
          type: 2,
          name: 'Automatisch looncodes (automatic salarycodes)',
          rows: ['Code', 'Soort automatisering']}
      ],
  })

  const expandMinimizeDiv = (pcid) => {
    let expand = {...compState.expand };
    expand[pcid] = !expand[pcid];
    setCompState({...compState, expand: expand})
  }

  const showSalaryDetailsOfEachPc = (val) => {
    const { expand } = compState;
    return(
      <div key = {val.pc_id} className={`${styles['expand-minimize-div']}`}>
        <div onClick={() => expandMinimizeDiv(val.pc_id)}>
          <span className={`${styles['expand-minimize-span']}`} > {expand[val.pc_id] === true ? <FaRegMinusSquare />: <FaRegPlusSquare />} </span>
          <div className={`${styles['expand-minimize-box']}`}> <span> {val.pc_name} </span> </div>
        </div>
        {expand[val.pc_id] === true ? <div className={`${styles['salay-content-div']}`}>
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
                  <span>{ salary.salary_name }</span>
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
      return(
        <div className = {`${styles['salary-input-field-div']}`} >
          <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 1)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
          <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 0)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
          {valueObj.checked ? <InputField type = {'text'}
            className = {`${styles['salary-input-value']} col-md-4`}
            name={'value'}
            value={valueObj['value'] !== undefined ? valueObj['value'] : salaryObj.salary_value}
            isDisabled= {false} placeholder={'Value'}
            handleChange={(e)=>handleChange('value', pcId, fieldId, '', 0, e.target)}
          />:null}
        </div>
      );
    }

  const showSalaryCoeffFields = (pcId) => {
    return (
      <div className={`${styles['salary-coeff-fields-div']}`}>
          {compState.premiesAutoArray.map(obj => {
            let fieldId = obj.type;
            let valueObj = cooperationBenefits[pcId][fieldId] || {};
            return(
              <div key={'salary_' + fieldId} className={`${styles['salary-coeff-fields-premies']}`}>
                <LabelField title={obj.name} customStyle={{margin:'10px 0'}}/>
                <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 1, 1)}> {valueObj['checked'] === 1 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} Yes </label>
                <label className = {`${styles['salary-input-radio-label']}`} onClick={() => handleChange('checked', pcId, fieldId, 0, 1)}> {valueObj['checked'] === 0 ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />} No </label>
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
                    <span>{ label }</span>
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
    if(label === 'Code') {
      return showDropDown(pcId, fieldId, 'code', valueObj);
    } else {
      return <InputField type = {'text'}
        className = {`${styles['salary-coeff-input-value']}`}
        name={label}
        value={valueObj[label]}
        isDisabled= {false}
        placeholder={''}
        handleChange={(e)=>handleChange(label, pcId, fieldId, '', 1, e.target)}
      />
    }
  }

  const showDropDown = (pcId, fieldId, label, valueObj) => {
    return(
      <div >
        <MultiSelectField
            options={codeArray}
            standards={codeArray.filter(val => val.value === valueObj[label])}
            handleChange={(e)=>handleChange(label, pcId, fieldId, e.value, 1)}
            isMulti={false}
            className={`${styles['salary-benefits-multiselect']}`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}`}
            placeholder={''}
        />
      </div>
    );
  }

  const handleChange = (name, pcId, fieldId, val, from = 0, target = 0) => {
    let key = from ? 'cooperationBenefits' : 'cooperationSalaryLinked';
    let salaryLinkedData = from ? {...cooperationBenefits} : {...cooperationSalaryLinked};
    salaryLinkedData[pcId][fieldId] = {...(salaryLinkedData[pcId][fieldId] ? salaryLinkedData[pcId][fieldId] : {}),
      [name]: target ? target.value : val,
    }
    let tab_5 = {...state[stateKey]};
    tab_5[[key]] = salaryLinkedData;
    updateStateChanges({tab_5});
  }

  return (
    <div className={''}>
      {cooperationSalaryDetails.map(val => showSalaryDetailsOfEachPc(val))}
    </div>
  );
}

export default React.memo(SalaryDetails);
