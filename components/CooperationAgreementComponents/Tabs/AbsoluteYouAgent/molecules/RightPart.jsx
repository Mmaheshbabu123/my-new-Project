import React, { useEffect, useContext } from 'react';
import { helpers } from '@/components/LinkCoeffEmpComponents/LinkCoeffEmpHelper';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const TABKEY = 'tab_1';
const RightPart = ( { compState, setCompState } ) => {
  const { state, updateStateChanges, state: { dependecyDataStatus } } = useContext(CooperationAgreementContext);
  const {
    employeeTypeArray
    , coefficientTypeArray
    , pclinkingValueobj
    , inputRef
    , valueErrorArray
    , lowKey, highKey, defaultKey
  } = compState;

  /**
   * [useEffect to check scroll button is needed or not]
   * @param  {function} const               [description]
   * @return {void}       [description]
   */
  useEffect(() => {
    const current = compState.inputRef.current['secondpart'];
    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      if (hasOverflow) {
        setCompState({...compState,
          isOverflow: hasOverflow,
          scrollRight: true, scrollLeft: false, tableWidth: '97%'
        });
      }
    };
    if (current) {
      trigger();
    }
  }, [Object.keys(compState.inputRef.current).length])

  /**
   * [handleValueChange handling user input]
   * @param  {[type]} target                 [description]
   * @param  {[int]} _EmpId                 [description]
   * @param  {[int]} _Coeffid               [description]
   * @return {[void]}          [description]
   */
  const handleValueChange = (target, _EmpId, _Coeffid, lowVal, highVal) => {
    if (!target.value.match(compState.regexp)) return;
    let valueDataObj = {
      ...pclinkingValueobj,
      [_EmpId]: {
        ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId] : {}),
        [_Coeffid]: {
          ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId][_Coeffid] : {}),
          [defaultKey]: target.value
        }
      }
    }
    let stateData = state[TABKEY];
    stateData['cooperationCoeffData'] = valueDataObj;
    let dataObj = {...compState,
      pclinkingValueobj: valueDataObj,
      valueErrorArray: valueValidation(_EmpId, _Coeffid, target.value, lowVal, highVal),
      emptyDataWarning: false
     };
     dependecyDataStatus['cooperationCoeffData'] = true;
    updateStateChanges({ [TABKEY]: stateData,  coeffPageData: dataObj, dependecyDataStatus });
    setCompState(dataObj);
  }


  /**
   * [valueValidation min and max value validation]
   * @param  {[int]} _EmpId                 [description]
   * @param  {[int]} _Coeffid               [description]
   * @param  {[string]} inputVal               [description]
   * @return {[object]}          [description]
   */
  const valueValidation = (_EmpId, _Coeffid, inputVal, lowVal, highVal) => {
    let value = Number(inputVal.replace(',', '.'));
    let refkey = `${_EmpId}_${_Coeffid}_${defaultKey}`;
    if (((value < lowVal) || (value > highVal)) && inputVal !== '') {
      if (valueErrorArray.includes(refkey)) return valueErrorArray;
      valueErrorArray.push(refkey);
      helpers.toggleWarningClass(inputRef, refkey);
    }
    else {
      valueErrorArray.indexOf(refkey) > -1 ?
        valueErrorArray.splice(valueErrorArray.indexOf(refkey), 1) : null;
      helpers.toggleWarningClass(inputRef, refkey, 0);
    }
    return valueErrorArray;
  }

  const getEmployeeTypeTableContent = () => {
    let htmlContent = [];
    coefficientTypeArray.map(coefficient => {
        htmlContent.push(<tr height="50" key={`${coefficient.id}-${defaultKey}`} className="table-second-part-tbody-tr">{
          employeeTypeArray.map(employeeType => {
            let _EmpId = employeeType.id, _ValId = 2, _Coeffid = coefficient.id;
            let { matrixKey, value, disabled, lowVal, highVal } = getPcLinkingValue(_EmpId, _Coeffid, _ValId);
            return (<td key={matrixKey} id={matrixKey} className="pc-linking-td">
              <input
                type="text"
                className="value-input-cell"
                value={value}
                disabled={disabled}
                title={`value: ${value} ${disabled ? 'disabled' : ''}`}
                id={`${_EmpId}_${_Coeffid}_${_ValId}`}
                ref={ref => inputRef.current[`${_EmpId}_${_Coeffid}_${_ValId}`] = ref}
                onChange={(e) => handleValueChange(e.target, _EmpId, _Coeffid, lowVal, highVal)}
              />
            </td>)
          })
        }</tr>
        )
    })
    return htmlContent;
  }

  const getPcLinkingValue = (_EmpId, _Coeffid, _ValId) => {
    let matrixKey = `${_EmpId}-${_Coeffid}-${_ValId}`;
    let valueObj = pclinkingValueobj[_EmpId][_Coeffid];
    let disabled = false;
    if(!valueObj[lowKey] || !valueObj[highKey])
        disabled = true;
    return {
      matrixKey,
      disabled,
      lowVal: valueObj[lowKey],
      highVal: valueObj[highKey],
      value: valueObj[defaultKey] ? valueObj[defaultKey] : ''
    }
  }

  return (
    <div className="second-part-parent-div" ref={ref => inputRef.current['secondpart'] = ref}>
      <table className="table pclinking-table table-second-part">
        <thead className="pclinking-table-thead table-second-part-thead">
          <tr className="table-second-part-thead-tr-class">{
            employeeTypeArray.map(emp => <th height="50" key={emp.id} className="table-second-part-th-class" title = {emp.name}>
              <div className="header-div-tag"> {emp.name} </div> </th>)
          }</tr>
        </thead>
        <tbody className="pclinking-table-tbody table-second-part-tbody">
          {getEmployeeTypeTableContent()}
        </tbody>
      </table>
    </div>
  )
  }

export default React.memo(RightPart)
