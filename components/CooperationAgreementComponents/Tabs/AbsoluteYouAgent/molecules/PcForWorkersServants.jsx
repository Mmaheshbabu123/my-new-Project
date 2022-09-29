import React, { useContext, useState, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import MultiSelectField from '@/atoms/MultiSelectField';
import {MdEdit, MdDelete} from 'react-icons/md';
import { helpers } from '../AbsoluteAgentHelper';
import styles from '../absoluteAgent.module.css';

const tabStateKey = 'tab_1';
const workersType  = 1;
const servantsType = 2;
const PcForWorkersServants = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  const { pcArray = [], pcLinkedEmployeeTypes = {}, dependecyDataStatus } = state;
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
    , employeeTyperError: {
      [workersType]: false,
      [servantsType]: false
    }
    , noPcWarning: {
      [workersType]: false,
      [servantsType]: false
    }
  });

  useEffect(() => {
    const { tab_1:{ worksServantsData } = {} } = state;
    let editIndex = {};
    let newItems = {
      [workersType]: worksServantsData[workersType] || [],
      [servantsType]: worksServantsData[servantsType] || []
    }
    let alreadyLinked = updateAlreadyLinkedPcIds(newItems);
    editIndex[workersType] =  newItems[workersType].length;
    editIndex[servantsType] = newItems[servantsType].length;
    let obj = { selectedPc: {}, selectedEmpId: {}, newItems, editIndex, alreadyLinked }
    updateStateChanges({alreadyLinked: alreadyLinked, workersServantsCompState: {...compState, ...obj},
      workerServentsCompLoaded: true,
    })
    setCompState({...compState, ...obj });
  }, [])

  /**
   * [useEffect to set states on submit validation errors ]
   * @param  {[type]} if               [description]
   * @return {[type]}    [description]
   */
  useEffect(() => {
    if(state.uniqueId) {
      const {  workersServantsCompState = {} } = state;
      setCompState({...compState, employeeTyperError: workersServantsCompState['employeeTyperError'] || { [workersType]: false,
        [servantsType]: false }
      })
    }
  }, [state.uniqueId])

  const onSelect = (target, type, pcOrEmp = 1) => {
    let dataObj = {...compState};
    if(pcOrEmp) {
     const value = target.value;
     dataObj['selectedPc'][type] = value;
     dataObj['selectedEmpId'][type] = [];
     dataObj['noPcWarning'][1] = false;
     dataObj['noPcWarning'][2] = false;
   } else {
     const value = target.map(val => val.value);
     dataObj['selectedEmpId'][type] = value;
   }
   dataObj['employeeTyperError'][type] = false;
   dependecyDataStatus['worksServantsData'] = true;
   updateStateChanges({ workersServantsCompState: dataObj, dependecyDataStatus });
   setCompState(dataObj)
  }

  /**
   * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
   * @param {Object} stateObj   [description]
   * @param {String} nameValue  [description]
   */
  const addItemAndUpdateIndex = (stateObj, type) => {
    let tab_1 = {...state[tabStateKey] }
    if(!stateObj['selectedPc'][type] || !stateObj['selectedEmpId'][type].length) {
      setCompState({...compState, employeeTyperError: {[type]: true} });
      return;
    }
    stateObj['newItems'][type][stateObj['editIndex'][type]] = {
      pc_id: stateObj['selectedPc'][type],
      employee_type_id: stateObj['selectedEmpId'][type],
      tab_id: 1,
      type,
    }
    stateObj['selectedPc'][type] = 0;
    stateObj['selectedEmpId'][type] = [];
    stateObj['editIndex'][type] = stateObj['newItems'][type].length;
    stateObj['employeeTyperError'] = {[type]: false}
    tab_1['worksServantsData'][type] = stateObj['newItems'][type];
    stateObj['alreadyLinked'] = updateAlreadyLinkedPcIds(stateObj['newItems']);
    dependecyDataStatus['worksServantsData'] = true;
    setCompState(stateObj);
    updateStateChanges({tab_1, dependecyDataStatus, workersServantsCompState: stateObj, alreadyLinked: stateObj['alreadyLinked']});
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
    const { alreadyLinked, employeeTyperError, noPcWarning } = compState;
    let selectedPc = compState['selectedPc'][type];
    let emplOptions = pcLinkedEmployeeTypes[selectedPc] ? pcLinkedEmployeeTypes[selectedPc] : [];
    let pcOptions = helpers.returnNotAddedPcOptions(pcArray, state['workersServantsCompState']);
    let allPCs = [{value: false, label: '--- Select ---'}, ...pcArray];
    pcOptions = [{value: false, label: '--- Select ---'}, ...pcOptions];
    return <div className={`${type === 1 ? 'col-md-12' : 'col-md-12 ms-auto ' + styles['margin-auto-class']}`}>
        <p className={styles['worker-servants-title']}> {type === 1 ? `Paritair comité for workers (arbeiders)` : `Paritair comité for servants (bedienden)`} </p>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title={`Paritair comité (PC) ${type}`} mandotory={true} />
            <MultiSelectField
                options={pcOptions.filter(val => val.value === false || !alreadyLinked.includes(val.value))}
                standards={allPCs.filter(val => val.value === compState['selectedPc'][type])}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type)}
                isMulti={false}
                className="col-md-12"
              />
          {noPcWarning[type] === true && <small style={{ color:'red', display: 'block', marginTop: '10px' }}> This field is required. </small>}
        </div>
        <div className={`${styles['add-div-margings']}`}>
            <LabelField title="Selection of employee types (statuut) that can be used" mandotory={true} />
            <MultiSelectField
                options={emplOptions}
                standards={emplOptions.filter(val => compState['selectedEmpId'][type].includes(val.value))}
                disabled={false}
                handleChange={(obj) => onSelect(obj, type, 0)}
                isMulti={true}
                className="col-md-12"
              />
              {employeeTyperError[type] === true && <small style={{ color:'red', display: 'block', marginTop: '10px' }}> This field is required. </small>}
        </div>
        <div className={`managetype-save-btn workers_extra_button mb-3 ${styles['pc-worker-servant-add-btn']}`}>
          <button
            onClick={() => addItemAndUpdateIndex({...compState}, type)}
            type="button"
            style={{marginTop: '20px'}}
            className="btn ">
            <>{`Extra Paritair comité 
            ${type === workersType ? 'workers (arbeiders)' : 'servants (bedienden)'}`}</>
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
          <table className='table-hover col-md-11 mx-auto my-3 add-item-table'>
          <thead style={{borderBottom: '1px solid'}}>
            <tr key={'header-row-tr'}>
              {['Paritair comité', 'Employee types', 'Actions'].map((eachHeader, index) =>
                <th key={`tablecol${index}`} scope="col" className='poppins-medium-16px'> {eachHeader} </th>)}
            </tr>
          </thead>
          <tbody>
            {dataObj.map((item, index) =>
              <tr key={index} id={index}>
                <td style={{ width: '40%' }}> <span className={`${styles['newitems-span']} poppins-light-16px me-3`} >{getCommaSeparatedlabels([item.pc_id], pcArray)}</span> </td>
                <td style={{ width: '40%' }}> <span className={`${styles['newitems-span']} poppins-light-16px `} >{getCommaSeparatedlabels(item.employee_type_id, pcLinkedEmployeeTypes[item.pc_id])}</span></td>
                <td style={{ width: '20%' }}> <span className={`${styles['newitems-span']} poppins-light-16px`} >{getNeededActions(item, index, type)}</span></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>}
      </>
    );
  }

  const getCommaSeparatedlabels = (selectedIds, optionArray = []) => {
    if(!selectedIds) return ''
    let labelString = optionArray.filter(val => selectedIds.includes(val.value)).map(val => val.label);
    return labelString.join(', ');
  }

  const getNeededActions = (item, index, type) => {
    return (
      <>
        <span className='actions-span' onClick={() => handleActionClick('edit', item, index, type)}> <MdEdit className='color-skyblue'/> </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', item, index, type)}> <MdDelete className='color-skyblue' /> </span>
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
    stateObj['alreadyLinked'] = updateAlreadyLinkedPcIds(stateObj['newItems']);
    dependecyDataStatus['worksServantsData'] = true;
    updateStateChanges({ workersServantsCompState: stateObj, dependecyDataStatus, alreadyLinked: stateObj['alreadyLinked'] })
    setCompState(stateObj);
  }


  return(
    <div className ={`${styles['worker-servant-parent']}`}>
     <div className = {`col-md-12 row m-0`}>
      <div className = {`col-md-6 ${styles['workers-border']} ps-0`}>
          {workersPart()}
      </div>
      <div className = {`col-md-6 pe-0`}>
          {servantsPart()}
      </div>
     </div>
    </div>
  )
}

export default React.memo(PcForWorkersServants);
