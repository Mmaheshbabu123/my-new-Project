import React, { useContext, useRef } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';

const LOW     = 1;
const DEFAULT = 2;
const HIGH    = 3;

const CoefficientSecondPart = () => {
  const { state, updateStateChanges } = useContext(LinkCoeffEmpContext);
  const inputRef  = useRef({});
  const {
    employeeTypeArray
    , valueTypeArray
    , coefficientTypeArray
    , pclinkingValueobj
    , lowHighValidation
  } = state;

  console.count('coeff secondpart');

  const handleValueChange = (target, _EmpId, _Coeffid, _ValId) => {
    let valueDataObj = {
      ...pclinkingValueobj,
      [_EmpId]: {
        ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId] : {}),
        [_Coeffid]: {
          ...(pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId][_Coeffid] : {}),
          [_ValId]: target.value
        }
      }
    }
    updateStateChanges({ pclinkingValueobj: valueDataObj,
      lowHighValidation: handleValidation(valueDataObj, _EmpId, _Coeffid, _ValId),
    });
  }

  const handleValidation = (valueDataObj, _EmpId, _Coeffid, _ValId) => {
    let valObj = valueDataObj[_EmpId][_Coeffid];
    let lowVal = parseInt(valObj[LOW]);
    let highVal = parseInt(valObj[HIGH]);
    if(highVal && lowVal) {
      return compareAndShowTootTip(lowVal, highVal, `${_EmpId}_${_Coeffid}`);
    }
    return [];
  }

  const compareAndShowTootTip = (lowVal, highVal, refkey) => {
    let lowRef  = inputRef.current[`${refkey}_1`];
    let highRef = inputRef.current[`${refkey}_3`];
    let title = '';
    if(lowVal > highVal) {
      title = 'Low value should be less then high value (Low < High)';
      if(lowHighValidation.includes(refkey)) return lowHighValidation;
      lowRef.classList.add("warning");
      highRef.classList.add("warning");
      lowHighValidation.push(refkey)
    } else {
      lowRef.classList.remove("warning");
      highRef.classList.remove("warning");
      lowHighValidation.splice(lowHighValidation.indexOf(refkey), 1);
    }
      lowRef.title  = title;
      highRef.title = title;
      return lowHighValidation;
  }

  const getCoefficientTableContent = () => {
    let htmlContent = [];
    employeeTypeArray.map(employeeType => {
      valueTypeArray.map(valueType => {
        htmlContent.push(<tr key={`${employeeType.id}-${valueType.id}`} className="table-second-part-tbody-tr">{
          coefficientTypeArray.map(coefficient => {
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
    return {
      matrixKey,
      value: pclinkingValueobj[_EmpId] ? pclinkingValueobj[_EmpId][_Coeffid] ?
                  pclinkingValueobj[_EmpId][_Coeffid][_ValId] ?
                    pclinkingValueobj[_EmpId][_Coeffid][_ValId] : ''
                  : ''
              : ''
    }
  }

  return (
    <div className="second-part-parent-div">
      <table className="table pclinking-table table-second-part">
        <thead className="pclinking-table-thead table-second-part-thead">
          <tr className="table-second-part-thead-tr-class">{
            coefficientTypeArray.map(coeff => <th key={coeff.id} className="table-second-part-th-class"> {coeff.name} </th>)
          }</tr>
        </thead>
        <tbody className="pclinking-table-tbody table-second-part-tbody">
          {getCoefficientTableContent()}
        </tbody>
      </table>
    </div>
  )
}

export default CoefficientSecondPart;
