import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteSalaryBenefits } from '@/Services/ApiEndPoints';
import { formatDate } from './SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import SearchIcon from '../SearchIcon';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 8;

const ShowTable = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    filterRows: rows,
    searchKey: 'name',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
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
      let rowVal = `${item['name']}${item['date']}${item['value']}`
      return (rowVal.toLowerCase().toString())
        .indexOf(value.toLowerCase().toString()) !== -1;
    })
    setState({ ...state,
      searchTerm: value,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  const handleSearchClick = () => {
    handleSearch(state.searchTerm);
  }

//------------------- Pagination code -------------------------//
//-------------------
   useEffect(() => {
     setState({...state, ...updatePaginationData(state.filterRows, state.itemOffset || 0)})
   }, [state.itemOffset]);

   const updatePaginationData = (filterRows, offset) => {
     let items = [...filterRows];
     const endOffset = offset + itemsPerPage;
     return {
       currentItems: items.slice(offset, endOffset),
       pageCount: Math.ceil(items.length / itemsPerPage)
     };
   }

   const handlePageClick = (event) => {
     let items = [...state.filterRows];
     const newOffset = (event.selected * itemsPerPage) % items.length;
     setState({...state, itemOffset: newOffset, currentPage: event.selected});
   };
//------------------- Pagination code -------------------------//
//-------------------

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
          {`+ Add salary benefit`}
        </button>
      </div>
      <div className="table-render-parent-div">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead">
            <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          <tbody>
            {state.currentItems.map(eachRow => <tr key={eachRow.sb_id} id={eachRow.sb_id}>
              <td> {eachRow.name} </td>
              <td> {formatDate(eachRow.date)} </td>
              <td> {eachRow.value ? eachRow.value : '--'} </td>
              <td>{ getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div>
        {state.filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />}
        <button onClick={() => router.push('/')} type="button" className="btn btn-dark pcp_btn col-1">
          {`Back`}
        </button>
      </div>
    </>
  );
}

export default ShowTable;
