import React, { useContext } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';

const CoefficientSecondPart = () => {
  const { state, updateStateChanges } = useContext(LinkCoeffEmpContext);
  const {
    employeeTypeArray
    , valueTypeArray
    , coefficientTypeArray
    , pclinkingValueobj
  } = state;

  console.count('coeff secondpart');

  const handleValueChange = (target, _EmpId, _ValId, _Coeffid) => {
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
    updateStateChanges({ pclinkingValueobj: valueDataObj });
  }

  const getCoefficientTableContent = () => {
    let htmlContent = [];
    employeeTypeArray.map(employeeType => {
      valueTypeArray.map(valueType => {
        htmlContent.push(<tr key={`${employeeType.id}-${valueType.id}`} className="table-second-part-tbody-tr">{
          coefficientTypeArray.map(coefficient => {
            let _EmpId = employeeType.id, _ValId = valueType.id, _Coeffid = coefficient.id;
            let { matrixKey, value } = getPcLinkingValue(_EmpId, _ValId, _Coeffid);
            return (<td key={matrixKey} id={matrixKey} className="pc-linking-td">
              <input
                type="text"
                className="value-input-cell"
                title={value}
                value={value}
                onChange={(e) => handleValueChange(e.target, _EmpId, _ValId, _Coeffid)}
             />
            </td>)
          })
        }</tr>
        )
      })
    })
    return htmlContent;
  }

  const getPcLinkingValue = (_EmpId, _ValId, _Coeffid) => {
    let matrixKey = `${_EmpId}-${_Coeffid}-${_ValId}`;
    return {
      matrixKey,
      value: pclinkingValueobj?.[_EmpId]?.[_Coeffid] ? .[_ValId] ?? ''
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
