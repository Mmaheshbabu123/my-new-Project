import React, { useContext, useState } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import { APICALL } from '@/Services/ApiServices';
import {
  fetchPcLinkedEmployeeTypes,
} from '@/Services/ApiEndPoints';
import styles from '../absoluteAgent.module.css';

const PcForWorkersServants = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { pcArray } = state;
  const [ compState, setCompState ] = useState({
      newItems: []
    , selectedPc: {1: 0, 2: 0}
    , selectedEmpId: {1: [], 2: []}
    , pcLinkedEmployeeTypes: {1: [], 2: []}
    , editIndex: 0
  });

  const onSelect = async (target, type, pcOrEmp = 1) => {
    console.log(target);
    let dataObj = {...compState};
    if(pcOrEmp) {
     const value = target.value;
     let employeeTypes = await getPcLinkedEmployeetypes(value);
     dataObj['selectedPc'][type] = value;
     dataObj['pcLinkedEmployeeTypes'][type] = employeeTypes;
   } else {
     const value = target.map(val => val.value);
     dataObj['selectedEmpId'][type] = value;
   }
   console.log(dataObj);
   setCompState(dataObj)
  }

  const getPcLinkedEmployeetypes = async (pcId) => {
    let employeeTypes = [];
    if(!pcId) {
      return employeeTypes;
    }
    await APICALL.service(`${fetchPcLinkedEmployeeTypes}/${pcId}`, 'GET').then(response => {
      if (response.status === 200) {
        employeeTypes = response.data;
      }
    })
    return employeeTypes;
  }
  console.log(compState['pcLinkedEmployeeTypes'][1].filter(val => compState['selectedEmpId'][1].includes(val.value)));
  const employeeTypeParitairDropDown = (type = 1) => {
    return <div className={`${type === 1 ? 'col-md-7' : 'col-md-9 ' + styles['margin-auto-class']}`}>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title="AbsoluteYou consultant" />
            <MultiSelectField
                options={pcArray}
                standards={pcArray.filter(val => val.value === compState['selectedPc'][type])}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type)}
                isMulti={false}
                className="col-md-12"
              />
        </div>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title="AbsoluteYou office number" />
            <MultiSelectField
                options={compState['pcLinkedEmployeeTypes'][type]}
                standards={compState['pcLinkedEmployeeTypes'][type].filter(val => compState['selectedEmpId'][type].includes(val.value))}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type, 0)}
                isMulti={true}
                className="col-md-12"
              />
        </div>
    </div>
  }

  const workersPart = () => {
    return(
      <div className = {''}>
        {employeeTypeParitairDropDown(1)}
      </div>
    );
  }

  const servantsPart = () => {
    return(
      <div className = {``}>
        {employeeTypeParitairDropDown(2)}
      </div>
    );
  }

  return(
    <div className ={`${styles['worker-servant-parent']}`}>
     <div className = {`col-md-12 row`}>
      <div className = {`col-md-6 ${styles['workers-border']}`}>
          {workersPart()}
      </div>
      <div className = {`col-md-6`}>
          {servantsPart()}
      </div>
     </div>
    </div>
  )
}

export default React.memo(PcForWorkersServants);
