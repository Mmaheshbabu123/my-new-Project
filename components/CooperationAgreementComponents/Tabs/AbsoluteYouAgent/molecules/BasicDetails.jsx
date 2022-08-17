import React, { useContext, useEffect } from 'react';
import LabelField from '@/atoms/LabelField';
import DateField from '@/atoms/DateField';
import MultiSelectField from '@/atoms/MultiSelectField';
import CheckBoxField from '@/atoms/CheckBoxField';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import ValidateMessage from '@/atoms/validationError';
// import { helpers } from '../../../CooperationAgreementHelper'; //.
import styles from '../absoluteAgent.module.css';

import { whoWillSignOptions } from '../../../Definations';

var startDateAgreement    = 1;
var absoluteConsultant    = 2;
var absoluteConsultantNum = 3;
var activateAddProject    = 4;
var whoWillSign           = 80;
var consultNumber = [];
var consultantArray = [];
var consultantNumArray = [];

const BasicDetails = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  var { tab_1, element_status, defaultOptions } = state;
  var { validations } = tab_1;

  useEffect(() => {
    if(defaultOptions) {
      let { agent_details, absolute_consultant, absolute_office_num } = defaultOptions;
      let bbright_id = agent_details && agent_details.bbright_id ? agent_details.bbright_id : 0;
      consultantArray = absolute_consultant ? absolute_consultant.filter(val => Number(val.value) === Number(bbright_id)) : [];
      consultNumber = absolute_office_num.length ? absolute_office_num : [];
      tab_1 = getTabBasicData(consultantArray, consultNumber, bbright_id);
      updateStateChanges({tab_1, bbright_id});
    }
  }, [defaultOptions])

/**
 * [getTabBasicData description]
 * @param  {[type]} consultantArray               [description]
 * @param  {[type]} consultNumber                 [description]
 * @param  {[type]} bbright_id                    [description]
 * @return {[type]}                 [description]
 */
    const getTabBasicData = (consultantArray, consultNumber, bbright_id) => {
      let obj = consultantArray.length ? consultantArray[0] : {};
      return {...tab_1,
        [whoWillSign]: tab_1[whoWillSign] || [],
        [absoluteConsultant]: Number(obj.value) || 0,
      }
    }

  /**
   * [handleChange description]
   * @param  {[Object]} target                 [description]
   * @param  {[Boolean]} checked                [description]
   * @param  {textfield/checkbox} [type=0]               [description]
   * @return {[void]}          [description]
   */
  const handleChange = ({ target: { value, checked } }, type = 0) => {
    if(type) {
      tab_1[activateAddProject] = checked ? 1 : 0;
      element_status['tab_1'].push(activateAddProject);
    } else {
      tab_1[startDateAgreement] = value;
      element_status['tab_1'].push(startDateAgreement);
      validations[startDateAgreement] = false;
    }
    tab_1['validations'] = validations;
    updateStateChanges({ tab_1, element_status })
  }

  /**
   * [onSelect description]
   * @param  {[Object]} obj               [description]
   * @param  {[int]}    key               [description]
   * @return {[void]}   [description]
   */
  const onSelect = (obj, key) => {
    if(key === absoluteConsultant) {
      tab_1[absoluteConsultantNum] = '';
    }
    element_status['tab_1'].push(key);
    tab_1[key] = Number(obj.value);
    validations[key] = false;
    tab_1['validations'] = validations;
    updateStateChanges({ tab_1, element_status });
  }

  const handleSignCheckChange = ({ target: { value, checked } }) => {
    let valueId = Number(value);
    let selectedIds = tab_1[whoWillSign];
    element_status['tab_1'].push(whoWillSign)
    if(checked) {
      selectedIds.push(valueId);
    } else {
      selectedIds.indexOf(valueId) > -1 ?
        selectedIds.splice(selectedIds.indexOf(valueId), 1) : null;
    }
    tab_1[whoWillSign] = selectedIds;
    updateStateChanges({ tab_1, element_status })
  }

  return(
    <div className="">
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="Start date of agreement" mandotory = {true}/>
          <DateField
             id={startDateAgreement}
             isDisabled= {false}
             placeholder={'date'}
             handleChange={handleChange}
             className="col-md-6"
             value={tab_1[startDateAgreement]}
            />
           {validations[startDateAgreement] && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="AbsoluteYou consultant" mandotory = {true}/>
          <MultiSelectField
              id={absoluteConsultant}
              options={consultantArray}
              standards={consultantArray.filter(val => Number(val.value) === tab_1[absoluteConsultant])}
              disabled={false}
              handleChange={(obj) => onSelect(obj, absoluteConsultant)}
              isMulti={false}
              className="col-md-6"
            />
      {validations[absoluteConsultant] && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="AbsoluteYou office number" mandotory = {true}/>
          <MultiSelectField
              id={absoluteConsultantNum}
              options={consultNumber}
              standards={consultNumber.filter(val => Number(val.value) === tab_1[absoluteConsultantNum])}
              disabled={false}
              handleChange={(obj) => onSelect(obj, absoluteConsultantNum)}
              isMulti={false}
              className="col-md-6"
            />
      {validations[absoluteConsultantNum] && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <CheckBoxField
              id={activateAddProject}
              tick={tab_1[activateAddProject]}
              disabled={false}
              onCheck={(obj) => handleChange(obj, 1)}
              name={`Activate "Add project" for the employer in the planning.`}
              customStyle={{margin: '2px 0', cursor:'pointer'}}
              className="col-md-5"
            />
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="Who will sign the Werkpostfiche?" />
          {whoWillSignOptions.map(option => {
            return (
              <div key={`checkbox_${option.id}`}>
              <CheckBoxField
                  id={option.id}
                  tick={tab_1[whoWillSign] && tab_1[whoWillSign].includes(option.id)}
                  disabled={false}
                  value={option.id}
                  onCheck={handleSignCheckChange}
                  customStyle={{margin: '2px 0', cursor:'pointer'}}
                  name={option.label}
                  className="col-md-2"
                />
              </div>
            )
          })
          }
      </div>
    </div>
  );
}

export default React.memo(BasicDetails);
