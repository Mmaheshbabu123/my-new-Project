import React, { useContext } from 'react';
import LinkCoeffEmpContext from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpContext';

const DEFAULT = 2;
const CoeffcientValuesFirstPart = () => {
  const { state } = useContext(LinkCoeffEmpContext);
  const { coefficientTypeArray, valueTypeArray } = state;

  const getTableContent = () => {
    let htmlContent = [];
    coefficientTypeArray.map(coefficient => {
      let tempValueTypeArray = [...valueTypeArray];
      htmlContent.push(
        <tr className="" key={coefficient.id} id={coefficient.id}>
          <td className="three-row-span" rowSpan={valueTypeArray.length}> {coefficient.name} </td>
          <td className="value-single-span pc-linking-td"> {tempValueTypeArray.shift().name} </td>
        </tr>
      )
      tempValueTypeArray.map(valueType => {
        let key = `${coefficient.id}-${valueType.id}`;
        htmlContent.push(<tr className="" key={key} id={key}>
          <td className="pc-linking-td"> {parseInt(valueType.id) === DEFAULT ? (<strong> {valueType.name} </strong>) : (valueType.name) } </td>
        </tr>
        )
        return 1;
      })
    })
    return htmlContent;
  }

  return (
      <table className="table pclinking-table table-first-part">
        <thead className="pclinking-table-thead table-first-part-thead">
          <tr>
            <th height= "50" colSpan="2" className="p-0">
              <div className="firstpart-cell">
                <span className="cell--topRight" key={`tablecolindex`} scope="col"> Employee type </span>
                <span className="cell--bottomLeft" key={`tablecolindex2`} scope="col"> Coefficient </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="pclinking-table-tbody table-first-part-tbody">
          {getTableContent()}
        </tbody>
      </table>
  )
}

export default CoeffcientValuesFirstPart;
