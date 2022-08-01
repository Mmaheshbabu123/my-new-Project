import React, { useContext, useEffect } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';
import { helpers } from './LinkCoeffEmpHelper';

const EmployeeTypeSecondPart = () => {
  const { state, updateStateChanges } = useContext(LinkCoeffEmpContext);
  const {
    employeeTypeArray
    , valueTypeArray
    , coefficientTypeArray
    , pclinkingValueobj
    , lowHighValidation
    , inputRef
    , valueErrorArray
    , defaultValueError
    , lowKey, highKey, defaultKey, minValue, maxValue
  } = state;


  /**
   * [useEffect to check scroll button is needed or not]
   * @param  {function} const               [description]
   * @return {void}       [description]
   */
  useEffect(() => {
    const current = state.inputRef.current['secondpart'];
    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      if (hasOverflow) {
        updateStateChanges({
          isOverflow: hasOverflow,
          scrollRight: true, scrollLeft: false, tableWidth: '97%'
        });
      }
    };
    if (current) {
      trigger();
    }
  }, [Object.keys(state.inputRef.current).length])

  /**
   * [handleValueChange handling user input]
   * @param  {[type]} target                 [description]
   * @param  {[int]} _EmpId                 [description]
   * @param  {[int]} _Coeffid               [description]
   * @param  {[int]} _ValId                 [description]
   * @return {[void]}          [description]
   */
  const handleValueChange = (target, _EmpId, _Coeffid, _ValId) => {
    let value = target.value;
    if (!target.value.match(state.regexp) || checkDecimalPointError(value)) return;
    let valueDataObj = {
      ...pclinkingValueobj,
      [_EmpId]: {
        ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId] : {}),
        [_Coeffid]: {
          ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId][_Coeffid] : {}),
          [_ValId]: value
        }
      }
    }
    // lowHighDefaultChanges(_EmpId, _Coeffid, _ValId, valueDataObj) //not needed as of now
    updateStateChanges({
      pclinkingValueobj: valueDataObj,
      valueErrorArray: valueValidation(_EmpId, _Coeffid, _ValId, value),
      defaultValueError: validationForDefaultValue(valueDataObj, _EmpId, _Coeffid),
      lowHighValidation: handleValidation(valueDataObj, _EmpId, _Coeffid, _ValId),
      emptyDataWarning: false
    });
  }

  /**
   * [checkDecimalPointError description]
   * @param  {[type]} value               [description]
   * @return {[type]}       [description]
   */
  const checkDecimalPointError = (value) => {
    let status = false;
    if(value) {
      let inputVal = value.replace(',', '.');
      let decimals = inputVal.split('.')[1];
      status =  decimals && decimals.length > 2 ? true : false;
    }
    return status;
  }

  const validationForDefaultValue = (valueDataObj, _EmpId, _Coeffid) => {
    let lowHighDef = valueDataObj[_EmpId][_Coeffid] || {};
    let refkey = `${_EmpId}_${_Coeffid}_${defaultKey}`;
    let lowVal = lowHighDef[lowKey] || '';
    let highVal = lowHighDef[highKey] || '';
    let defaultVal = lowHighDef[defaultKey] || ''
    let addWarning = false;
    if(lowVal && highVal && defaultVal) {
      lowVal = Number(lowVal.replace(',', '.'));
      highVal = Number(highVal.replace(',', '.'));
      defaultVal = Number(defaultVal.replace(',', '.'));
      if((defaultVal < lowVal || defaultVal > highVal)) {
        addWarning = true;
      }
    }
    if(addWarning) {
      if (defaultValueError.includes(refkey)) return defaultValueError;
          defaultValueError.push(refkey);
      helpers.toggleWarningClass(inputRef, refkey);
    } else {
      defaultValueError.indexOf(refkey) > -1 ?
        defaultValueError.splice(defaultValueError.indexOf(refkey), 1) : null;
      helpers.toggleWarningClass(inputRef, refkey, 0);
    }
    return defaultValueError;
  }

  /**
   * [lowHighDefaultChanges force modifying low high and default values based on condition]
   * @param  {[int]} _EmpId                     [description]
   * @param  {[int]} _Coeffid                   [description]
   * @param  {[int]} _ValId                     [description]
   * @param  {[object]} valueDataObj               [description]
   * @return {[void]}              [description]
   */
  const lowHighDefaultChanges = (_EmpId, _Coeffid, _ValId, valueDataObj) => { //might needed in future NOSONAR
    if (_ValId === lowKey || _ValId === highKey) {
      valueDataObj[_EmpId][_Coeffid][defaultKey] = '';
    }
    if (_ValId === defaultKey) {
      valueDataObj[_EmpId][_Coeffid][lowKey] = '';
      valueDataObj[_EmpId][_Coeffid][highKey] = '';
    }
  }

  /**
   * [valueValidation min and max value validation]
   * @param  {[int]} _EmpId                 [description]
   * @param  {[int]} _Coeffid               [description]
   * @param  {[int]} _ValId                 [description]
   * @param  {[string]} inputVal               [description]
   * @return {[object]}          [description]
   */
  const valueValidation = (_EmpId, _Coeffid, _ValId, inputVal) => {
    let value = Number(inputVal.replace(',', '.'));
    let refkey = `${_EmpId}_${_Coeffid}_${_ValId}`;
    if ((value < minValue) || (value > maxValue)) {
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

  /**
   * [handleValidation description]
   * @param  {[type]} valueDataObj               [description]
   * @param  {[int]} _EmpId                     [description]
   * @param  {[int]} _Coeffid                   [description]
   * @param  {[int]} _ValId                     [description]
   * @return {[object]}              [description]
   */
  const handleValidation = (valueDataObj, _EmpId, _Coeffid, _ValId) => {
    let valObj = valueDataObj[_EmpId][_Coeffid];
    let lowVal = valObj[lowKey]
    let highVal = valObj[highKey];
    if (highVal && lowVal) {
      return compareAndShowTootTip(Number(lowVal.replace(',', '.')), Number(highVal.replace(',', '.')), `${_EmpId}_${_Coeffid}`);
    } else {
      return compareAndShowTootTip(lowVal, highVal, `${_EmpId}_${_Coeffid}`, 0);
    }
  }

  /**
   * [compareAndShowTootTip adding css class and title toolyip based on conditions]
   * @param  {[int/float]} lowVal                 [description]
   * @param  {[int/float]} highVal                [description]
   * @param  {[string]} refkey                 [description]
   * @param  {Number} [type=1]               [description]
   * @return {[object]}          [description]
   */
  const compareAndShowTootTip = (lowVal, highVal, refkey, type = 1) => {
    let lowRef = inputRef.current[`${refkey}_1`];
    let highRef = inputRef.current[`${refkey}_3`];
    let title = '';
    if (lowVal >= highVal && type) {
      title = 'Low value should be less then high value (Low < High)';
      if (lowHighValidation.includes(refkey)) return lowHighValidation;
      lowRef.classList.add("warning");
      highRef.classList.add("warning");
      lowHighValidation.push(refkey)
    } else {
      lowRef.classList.remove("warning");
      highRef.classList.remove("warning");
      lowHighValidation.indexOf(refkey) > -1 ?
        lowHighValidation.splice(lowHighValidation.indexOf(refkey), 1) : null;
    }
    lowRef.title = title;
    highRef.title = title;
    return lowHighValidation;
  }

  const getEmployeeTypeTableContent = () => {
    let htmlContent = [];
    coefficientTypeArray.map(coefficient => {
      valueTypeArray.map(valueType => {
        htmlContent.push(<tr key={`${coefficient.id}-${valueType.id}`} className="table-second-part-tbody-tr">{
          employeeTypeArray.map(employeeType => {
            let _EmpId = employeeType.id, _ValId = valueType.id, _Coeffid = coefficient.id;
            let { matrixKey, value } = getPcLinkingValue(_EmpId, _Coeffid, _ValId);
            return (<td key={matrixKey} id={matrixKey} className="pc-linking-td">
              <input
                type="text"
                className="value-input-cell"
                value={value}
                id={`${_EmpId}_${_Coeffid}_${_ValId}`}
                ref={ref => inputRef.current[`${_EmpId}_${_Coeffid}_${_ValId}`] = ref}
                onChange={(e) => handleValueChange(e.target, _EmpId, _Coeffid, _ValId)}
              />
            </td>)
          })
        }</tr>
        )
      })
    })
    return htmlContent;
  }

  const getPcLinkingValue = (_EmpId, _Coeffid, _ValId) => {
    let matrixKey = `${_EmpId}-${_Coeffid}-${_ValId}`;
    let valueObj = pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId][_Coeffid] ?
      pclinkingValueobj[_EmpId][_Coeffid] : {} : {};
    let lowVal = valueObj[lowKey] || '';
    let highVal = valueObj[highKey] || '';
    return {
      matrixKey,
      value: valueObj[_ValId] ? valueObj[_ValId] : '',
      lowVal,
      highVal
    }
  }

  return (
    <div className="second-part-parent-div" ref={ref => inputRef.current['secondpart'] = ref}>
      <table className="table pclinking-table table-second-part">
        <thead className="pclinking-table-thead table-second-part-thead">
          <tr className="table-second-part-thead-tr-class poppins-regular-18px">{
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

export default EmployeeTypeSecondPart;
