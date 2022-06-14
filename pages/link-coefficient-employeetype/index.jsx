import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
const LinkCoeffEmpStates = dynamic(() => import('../../Contexts/LinkCoeffEmp/LinkCoeffEmpStates'), { ssr: false });
const LinkCoeffEmpComponent = dynamic(() => import('../../components/LinkCoeffEmpComponents/LinkCoeffEmpComponent'), { ssr: false });


const LinkCoefficientEmployeetype = () => {
  const router = useRouter();
  const { pcid } = router.query;
  if (pcid !== undefined)
    return (
      <LinkCoeffEmpStates>
        <LinkCoeffEmpComponent pcid={pcid} router={router} />
      </LinkCoeffEmpStates>
    )
  else return (<>  </>);
}

export default LinkCoefficientEmployeetype;






/*


let employeeTypeArray = ['Employee-type 1', 'Employee-type 2', 'Employee-type 3', 'Employee-type 4', 'Employee-type 5'];
let valueTypeArray = ['Low', 'Special', 'High'];
let coefficientTypeArray = ['Coefficient-type 1', 'Coefficient-type 2', 'Coefficient-type 3', 'Coefficient-type 4', 'Coefficient-type 5', 'Coefficient-type 6',
'Coefficient-type 7', 'Coefficient-type 8', 'Coefficient-type 9', 'Coefficient-type 10'];
const state = {
  '0-0-0': '123',
  '1-1-3': '93',
  '1-3-2': '23',
  '1-2-3': '13',
}
const getTableContent = () => {
  let content = [];
  employeeTypeArray.map(employeeType => {
    let tempValueTypeArray = [...valueTypeArray];
    content.push(
      <tr> <td  className="three-row-span" rowspan={valueTypeArray.length}> {employeeType} </td> <td> {tempValueTypeArray.shift()} </td>  </tr>
    )
    tempValueTypeArray.map(valueType => {
      content.push(
        <tr> <td> {valueType} </td> </tr>
      )
      return 1;
    })
  })
  return content;
}

const getCoefficientTableContent = () => {
  let content = [];
  employeeTypeArray.map((emp, top) => {
    valueTypeArray.map((val, top1) => {
      content.push(<tr>{
        coefficientTypeArray.map((coef, top2) =>
            <td className="pc-linking-td">
            <input type="text" className="pc-linking-cell"  title={state[`${top}-${top1}-${top2}`]} value={state[`${top}-${top1}-${top2}`]} placeholder={`${top}-${top1}-${top2}`} />
         </td>)
      }</tr>
      )
    })
  })
  return content;
}

return (
  <div className = "m-4">

  <div className="col-md-12 row">
      <div className="col-md-3 m-0 p-0 table-render-parent-div">
        <table className="table">
          <thead className="pclinking-table-thead">
            <tr className="cell">
                <th className = "cell--topRight" key={`tablecolindex`} scope="col"> Coefficient </th>
                <th className = "cell--bottomLeft" key={`tablecolindex2`} scope="col"> Employee type</th>
            </tr>
          </thead>
          <tbody className="pclinking-table-tbody">
              {getTableContent()}
          </tbody>
        </table>
      </div>
      <div className="col-md-9 p-0 table-render-parent-div">
          <table className="table coefficient">
            <thead className="pclinking-table-thead coefficient">
              <tr className="coefficient-head-tr-class">{
                coefficientTypeArray.map(coef => <th className="coefficient-th-class"> {coef} </th>)
              }</tr>
            </thead>
            <tbody className="pclinking-table-tbody">
                {getCoefficientTableContent()}
            </tbody>
          </table>
      </div>
  </div>
  </div>
);





 */
