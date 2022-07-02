import React, { useContext, useState, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import {MdEdit, MdDelete} from 'react-icons/md';
import styles from '../absoluteAgent.module.css';

const tabStateKey = 'tab_1';
const workersType  = 1;
const servantsType = 2;
const PcForWorkersServants = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { tab_1, pcArray = [], pcLinkedEmployeeTypes = {} } = state;
  const [ compState, setCompState ] = useState({
      newItems: {  [workersType]: [], [servantsType]: [] }
    , selectedPc: {
      [workersType]: 0,
      [servantsType]: 0
    }
    , selectedEmpId: {
      [workersType]: [],
      [servantsType]: []
    }
    , editIndex: {
      [workersType]: 0,
      [servantsType]: 0
    }
    , alreadyLinked: []
  });

  useEffect(() => {
    const { worksServantsData } = tab_1;
    let editIndex = {};
    let newItems = {
      [workersType]: worksServantsData[workersType] || [],
      [servantsType]: worksServantsData[servantsType] || []
    }
    editIndex[workersType] = newItems[workersType].length;
    editIndex[servantsType] = newItems[servantsType].length;
    setCompState({...compState, editIndex: editIndex, newItems: newItems, alreadyLinked: state['alreadyLinked'] });
  }, [])

  const onSelect = (target, type, pcOrEmp = 1) => {
    let dataObj = {...compState};
    if(pcOrEmp) {
     const value = target.value;
     dataObj['selectedPc'][type] = value;
   } else {
     const value = target.map(val => val.value);
     dataObj['selectedEmpId'][type] = value;
   }
   setCompState(dataObj)
  }

  /**
   * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
   * @param {Object} stateObj   [description]
   * @param {String} nameValue  [description]
   */
  const addItemAndUpdateIndex = (stateObj, type) => {
    let tab_1 = {...state[tabStateKey] }
    if(!stateObj['selectedPc'][type]) return;
    stateObj['newItems'][type][stateObj['editIndex'][type]] = {
      pc_id: stateObj['selectedPc'][type],
      employee_type_id: stateObj['selectedEmpId'][type],
      tab_id: type,
      type,
    }
    stateObj['selectedPc'][type] = 0;
    stateObj['selectedEmpId'][type] = [];
    stateObj['editIndex'][type] = stateObj['newItems'][type].length;
    tab_1['worksServantsData'][type] = stateObj['newItems'][type];
    stateObj['alreadyLinked'] = updateAlreadyLinkedPcIds(stateObj['newItems']);
    setCompState(stateObj);
    updateStateChanges({tab_1, alreadyLinked: stateObj['alreadyLinked']});
  }

  const updateAlreadyLinkedPcIds = (addedData) => {
    let pcIds = [];
    Object.values(addedData).map(array => {
      pcIds = [...pcIds, ...array.map(val => val.pc_id)];
      return 1;
    })
    return pcIds;
  }


  const employeeTypeParitairDropDown = (type = 1) => {
    const { alreadyLinked } = compState;
    let selectedPc = compState['selectedPc'][type];
    let emplOptions = pcLinkedEmployeeTypes[selectedPc] ? pcLinkedEmployeeTypes[selectedPc] : [];
    return <div className={`${type === 1 ? 'col-md-9' : 'col-md-9 ' + styles['margin-auto-class']}`}>
        <p className={styles['worker-servants-title']}> {type === 1 ? `PC for workers (arbeiders)` : `PC for servants (bedienden)` } </p>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title={`Paritair comité (PC) ${type}`} />
            <MultiSelectField
                options={pcArray.filter(val => !alreadyLinked.includes(val.value))}
                standards={pcArray.filter(val => val.value === compState['selectedPc'][type])}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type)}
                isMulti={false}
                className="col-md-12"
              />
        </div>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title="Selection of employee types (statuut) that can be used" />
            <MultiSelectField
                options={emplOptions}
                standards={emplOptions.filter(val => compState['selectedEmpId'][type].includes(val.value))}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type, 0)}
                isMulti={true}
                className="col-md-12"
              />
        </div>
        <div className={`managetype-save-btn ${styles['pc-worker-servant-add-btn']}`}>
          <button
            onClick={() => addItemAndUpdateIndex({...compState}, type)}
            type="button"
            style={{marginTop: '20px'}}
            className="btn btn-dark pcp_btn">
            <pre>{`Extra Paritair comité
              ${type ===workersType ? 'workers (arbeiders)' : 'servants (bedienden)'}`}</pre>
          </button>
        </div>
    </div>
  }

  const workersPart = () => {
    return(
      <div className = {''}>
        {employeeTypeParitairDropDown(workersType)}
        {showtable(compState['newItems'][workersType], workersType)}
      </div>
    );
  }

  const servantsPart = () => {
    return(
      <div className = {``}>
        {employeeTypeParitairDropDown(servantsType)}
        {showtable(compState['newItems'][servantsType], servantsType)}
      </div>
    );
  }

  const showtable = (dataObj, type) => {
    if(!dataObj.length) return;
    return(
      <>
      {dataObj.length > 0 &&
        <div className={`add-item-div ${styles['workers-servants-table']}`} style={{ margin: type === servantsType ? '0 auto':''}}>
          <table className='table-hover col-md-10 m-3 add-item-table'>
          <thead style={{borderBottom: '1px solid', margin: '15px 0'}}>
            <tr key={'header-row-tr'}>
              {['Paritair comité', 'Employee types', 'Actions'].map((eachHeader, index) =>
                <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)}
            </tr>
          </thead>
          <tbody>
            {dataObj.map((item, index) =>
              <tr key={index} id={index}>
                <td style={{ width: '40%' }}> {getCommaSeparatedlabels([item.pc_id], pcArray)} </td>
                <td style={{ width: '40%' }}> {getCommaSeparatedlabels(item.employee_type_id, pcLinkedEmployeeTypes[item.pc_id])} </td>
                <td style={{ width: '20%' }}> {getNeededActions(item, index, type)} </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>}
      </>
    );
  }

  const getCommaSeparatedlabels = (selectedIds, optionArray = []) => {
    let labelString = optionArray.filter(val => selectedIds.includes(val.value)).map(val => val.label);
    return labelString.join(', ');
  }

  const getNeededActions = (item, index, type) => {
    return (
      <>
        <span className='actions-span' onClick={() => handleActionClick('edit', item, index, type)}> <MdEdit /> </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', item, index, type)}> <MdDelete /> </span>
      </>
    )
  }

  const handleActionClick = (type, item, index, workSerType) => {
    let stateObj = { ...compState };
    if (type === 'edit') {
      stateObj['selectedPc'][workSerType] = item.pc_id;
      stateObj['selectedEmpId'][workSerType] = item.employee_type_id;
      stateObj['editIndex'][workSerType] = index;
    } else {
      stateObj['newItems'][workSerType].splice(index, 1)
      stateObj['editIndex'][workSerType] = stateObj['newItems'][workSerType].length;
    }
    setCompState(stateObj);
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
