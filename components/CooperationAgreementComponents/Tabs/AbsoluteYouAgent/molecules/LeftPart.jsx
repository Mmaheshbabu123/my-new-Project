import React from 'react';
import Translation from '@/Translation';
const DEFAULT = 2;
const LeftPart = ( { compState, setCompState } ) => {
  const { coefficientTypeArray } = compState;
  const getTableContent = () => {
    let htmlContent = [];
    coefficientTypeArray.map(coefficient => {
      htmlContent.push(
        <tr height="50" key={coefficient.id} id={coefficient.id}>
          <td className="poppins-regular-16px" title={coefficient.name}> {coefficient.name} </td>
        </tr>
      )
    })
    return htmlContent;
  }

  return (
      <table className="table pclinking-table table-first-part">
        <thead className="pclinking-table-thead table-first-part-thead">
          <tr>
            <th height= "50" colSpan="2" className="p-0">
              <div className="firstpart-cell">
                <span title="Employee types" className="cell--topRight poppins-medium-18px " key={`tablecolindex`} scope="col"> Employee types </span>
                <span title="Coefficients" className="cell--bottomLeft poppins-medium-18px ms-3" key={`tablecolindex2`} scope="col"> Coefficients </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="pclinking-table-tbody table-first-part-tbody poppins-regular-18px">
          {getTableContent()}
        </tbody>
      </table>
  )
}
export default React.memo(Translation(LeftPart,[]));
