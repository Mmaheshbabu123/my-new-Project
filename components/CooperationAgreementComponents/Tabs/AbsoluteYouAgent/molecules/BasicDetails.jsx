import React, { useContext } from 'react';
import LabelField from '@/atoms/LabelField';
import DateField from '@/atoms/DateField';
import MultiSelectField from '@/atoms/MultiSelectField';
import CheckBoxField from '@/atoms/CheckBoxField';
import RequiredField from '@/atoms/RequiredSpanField';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import styles from '../absoluteAgent.module.css';
import { consultantArray, consultantNumArray } from '../../../Definations';


var startDateAgreement    = 1;
var absoluteConsultant    = 2;
var absoluteConsultantNum = 3;
var activateAddProject    = 4;
var consultNumber = [];

const BasicDetails = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  var { tab_1 } = state;


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
    } else {
      tab_1[startDateAgreement] = value;
    }
    updateStateChanges({ tab_1 })
  }

  /**
   * [onSelect description]
   * @param  {[Object]} obj               [description]
   * @param  {[int]}    key               [description]
   * @return {[void]}   [description]
   */
  const onSelect = (obj, key) => {
    if(key === absoluteConsultant) {
      consultNumber = consultantNumArray[obj.value];
      tab_1[absoluteConsultantNum] = '';
    }
    tab_1[key] = obj.value;
    updateStateChanges({ tab_1 });
  }

  return(
    <div className="">
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="Start date of agreement" customStyle = {{display:''}}/> <RequiredField />
          <DateField
             id={startDateAgreement}
             isDisabled= {false}
             placeholder={'date'}
             handleChange={handleChange}
             className="col-md-6"
             value={tab_1[startDateAgreement]}
            />
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="AbsoluteYou consultant" customStyle = {{display:''}}/> <RequiredField />
          <MultiSelectField
              id={absoluteConsultant}
              options={consultantArray}
              standards={consultantArray.filter(val => val.value === tab_1[absoluteConsultant])}
              disabled={false}
              handleChange={(obj) => onSelect(obj, absoluteConsultant)}
              isMulti={false}
              className="col-md-6"
            />
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <LabelField title="AbsoluteYou office number" customStyle = {{display:''}}/> <RequiredField />
          <MultiSelectField
              id={absoluteConsultantNum}
              options={consultNumber}
              standards={consultNumber.filter(val => val.value === tab_1[absoluteConsultantNum])}
              disabled={false}
              handleChange={(obj) => onSelect(obj, absoluteConsultantNum)}
              isMulti={false}
              className="col-md-6"
            />
      </div>
      <div className={`${styles['add-div-margings']}`}>
          <CheckBoxField
              id={activateAddProject}
              tick={tab_1[activateAddProject]}
              disabled={false}
              onCheck={(obj) => handleChange(obj, 1)}
              name={`Activate "Add project" for the employer in the planning`}
              className="col-md-6"
            />
      </div>

    </div>
  );
}

export default React.memo(BasicDetails);
