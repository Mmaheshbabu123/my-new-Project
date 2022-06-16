import React, { useContext } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';

const DEFAULT = 2;
const EmployeeValueFirstPart = () => {
  const { state } = useContext(LinkCoeffEmpContext);
  const { employeeTypeArray, valueTypeArray } = state;

  const getTableContent = () => {
    let htmlContent = [];
    employeeTypeArray.map(employeeType => {
      let tempValueTypeArray = [...valueTypeArray];
      htmlContent.push(
        <tr className="" key={employeeType.id} id={employeeType.id}>
          <td className="three-row-span" rowSpan={valueTypeArray.length}> {employeeType.name} </td>
          <td className="value-single-span"> {tempValueTypeArray.shift().name} </td>
        </tr>
      )
      tempValueTypeArray.map(valueType => {
        let key = `${employeeType.id}-${valueType.id}`;
        htmlContent.push(<tr className="" key={key} id={key}>
          <td> {parseInt(valueType.id) === DEFAULT ? (<strong> {valueType.name} </strong>) : (valueType.name) } </td>
        </tr>
        )
        return 1;
      })
    })
    return htmlContent;
  }


  return (
    <div>
      <table className="table pclinking-table table-first-part">
        <thead className="pclinking-table-thead table-first-part-thead">
          <tr>
            <th colSpan="2" className="p-0">
              <div className="firstpart-cell">
                <span className="cell--topRight" key={`tablecolindex`} scope="col"> Coefficient </span>
                <span className="cell--bottomLeft" key={`tablecolindex2`} scope="col"> Employee type</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="pclinking-table-tbody table-first-part-tbody">
          {getTableContent()}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeValueFirstPart;
