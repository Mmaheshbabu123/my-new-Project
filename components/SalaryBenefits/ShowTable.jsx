import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteSalaryBenefits } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import SearchIcon from '../SearchIcon';

const ShowTable = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    filterRows: rows,
    searchKey: 'name'
  })
  useEffect(() => {
    setState({...state, filterRows: rows})
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
        message: 'Do you want to delete the salary benefit?',
        buttons: [
          { label: 'No' },
          { label: 'Yes', onClick: () => handleDelete(eachRow.sb_id) }
        ]
      });
    } else {
      router.push(`/manage-salary-benefits?action=edit&id=${eachRow.sb_id}`);
    }
  }

  const handleDelete = async (id) => {
    await APICALL.service(`${deleteSalaryBenefits}/${id}`, 'DELETE')
      .then((result) => router.reload())
      .catch((error) => window.alert('Error occurred'));
  }

  const handleSearch = (value) => {
    let filterRows = rows.filter((item) => {
      return (item[state.searchKey].toLowerCase().toString())
        .indexOf(value.toLowerCase().toString()) !== -1;
    })
    setState({ ...state, searchTerm: value, filterRows: filterRows });
  }

  const handleSearchClick = () => {
    handleSearch(state.searchTerm);
  }

  return (
    <>
      <h4> {`Manage salary benefits`} </h4>
      <div className='row searchbox' style={{ margin: '10px 0', position: 'relative' }}>
        <span className="searchIconCss"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
        <input
          type="text"
          className="form-control col-7"
          id="pcp_name"
          onChange={(e) => setState({...state, searchTerm: e.target.value})}
          placeholder={'Search'}
        />
        <button
          onClick={() => router.push(`manage-salary-benefits?action=create&id=0`)}
          type="button"
          className="btn btn-dark pcp_btn col-3">
          {`+ Add Salary benefit`}
        </button>
      </div>
      <div className="table-render-parent-div">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead">
            <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          <tbody>
            {state.filterRows.map(eachRow => <tr key={eachRow.sb_id} id={eachRow.sb_id}>
              <td> {eachRow.name} </td>
              <td> {dateFormater(eachRow.date)} </td>
              <td> {eachRow.value ? '€ ' + eachRow.value : '--'} </td>
              <td>{ getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowTable;


function dateFormater(dateInput) {
  let date = new Date(dateInput);
  let month = date.getUTCMonth() + 1; //months from 1-12
  let day = date.getUTCDate();
  var year = date.getUTCFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
}
