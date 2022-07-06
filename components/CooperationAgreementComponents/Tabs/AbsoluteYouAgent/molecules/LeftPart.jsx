import React from 'react';

const DEFAULT = 2;
const LeftPart = ( { compState, setCompState } ) => {
  const { coefficientTypeArray } = compState;
  const getTableContent = () => {
    let htmlContent = [];
    coefficientTypeArray.map(coefficient => {
      htmlContent.push(
        <tr height="50" key={coefficient.id} id={coefficient.id}>
          <td className="" title={coefficient.name}> {coefficient.name} </td>
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
                <span title="Employee types" className="cell--topRight" key={`tablecolindex`} scope="col"> Employee types </span>
                <span title="Coefficients" className="cell--bottomLeft" key={`tablecolindex2`} scope="col"> Coefficients </span>
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
export default React.memo(LeftPart)
