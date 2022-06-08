import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteEmployeeType ,deleteCoefficientType} from '../../Services/ApiEndPoints'
import { APICALL } from '../../Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';

const TableRenderer = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    deleteUrl : (manageType == 'employee-types') ? deleteEmployeeType :deleteCoefficientType,
    filterRows: rows,
    searchKey: 'name'
  })
  useEffect(() => {
    setState({...state, filterRows: rows, deleteUrl: (manageType == 'employee-types') ? deleteEmployeeType :deleteCoefficientType})
  }, [rows.length])

  const getNeededActions = (eachRow) => {
    return (
      <>
        <span className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>
        <span className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'delete') {
      confirmAlert({
        message: 'Do you want to delete the type?',
        buttons: [
          { label: 'No' },
          { label: 'Yes', onClick: () => handleDelete(eachRow.id) }
        ]
      });
    } else {
      router.push(`${manageType}/${action}?id=${eachRow.id}`);
    }
  }

  const handleDelete = async (id) => {
    await APICALL.service(`${state.deleteUrl}/${id}`, 'DELETE')
      .then((result) => router.reload())
      .catch((error) => window.alert('Error occurred'));
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    let filterRows = rows.filter((item) => {
      return (item[state.searchKey].toLowerCase().toString())
        .indexOf(value.toLowerCase().toString()) !== -1;
    })
    setState({ ...state, searchTerm: e.target.value, filterRows: filterRows });
  }

const button_title = manageType == 'employee-types'? `Add employee type`:`Add coefficient type`;
  return (
    <>
      <h4> {`Manage ${button_title.includes('employee') ? 'Employee' : 'Coefficient'} types`} </h4>
      <div className='row' style={{ margin: '10px 0' }}>
        <input
          type="text"
          className="form-control col-7"
          id="pcp_name"
          onChange={(e) => handleSearch(e)}
          placeholder={'Search'}
        />
        <button
          onClick={() => router.push(`${manageType}/add?id=0`)}
          type="button"
          className="btn btn-dark pcp_btn col-3">
          {`+ ${button_title}`}
        </button>
      </div>
      <div className="table-render-parent-div">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead">
            <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          <tbody>
            {state.filterRows.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
              <td> {eachRow.name} </td>
              <td>{ getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableRenderer;
