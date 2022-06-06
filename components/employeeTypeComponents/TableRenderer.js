import { useState } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteEmployeeType } from '../../Services/ApiEndPoints'
import { APICALL } from '../../Services/ApiServices';

const TableRenderer = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({ searchTerm: '', filterRows: rows, searchKey: 'name' })
  const getNeededActions = (eachRow) => {
    return (
      <>
        <span className='actions-span' onClick={() => handleActionClick('edit', eachRow)}> Edit </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', eachRow)}> Delete </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'delete') {
      confirmAlert({
        message: 'Do you want to delete the type',
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
    await APICALL.service(`${deleteEmployeeType}/${id}`, 'DELETE')
      .then((result) => router.reload() )
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

  return (
    <>
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
          {`Add employee type`}
        </button>
      </div>
      <div className="table-render-parent-div">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead">
            <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          <tbody>
            {state.filterRows.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>{headers.map(colName => <>
              <td> {colName === 'actions' ? getNeededActions(eachRow) : eachRow[colName]}</td>
            </>)}</tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableRenderer;
