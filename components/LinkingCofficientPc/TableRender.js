import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { delteCofficientPerPc} from '../../Services/ApiEndPoints'
import { APICALL } from '../../Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import SearchIcon from '../SearchIcon';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 8;

const TableRenderer = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    deleteUrl :  delteCofficientPerPc,
    filterRows: rows,
    searchKey: 'name',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
  })
  useEffect(() => {
    setState({...state, filterRows: rows, deleteUrl:delteCofficientPerPc})
  }, [rows.length])

  const getNeededActions = (eachRow) => {
    return (
      <>
        <span title={'Edit'} className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>
        <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
      </>
    )
  }
  const handleActionClick = (action, eachRow) => {
    if (action === 'delete') {
      confirmAlert({
        message: 'Do you want to delete the coefficients per PC?',
        buttons: [
          { label: 'No' },
          { label: 'Yes', onClick: () => handleDelete(eachRow.id) }
        ]
      });
    } else {
      router.push(`/link-coefficient-employeetype?pcid=${eachRow.id}`);
    }
  }
  const handleDelete = async (id) => {
    await APICALL.service(`${state.deleteUrl}/${id}`, 'DELETE')
      .then((result) => router.reload())
      .catch((error) => window.alert('Error occurred'));
  }
  const handleSearch = (value) => {
    let filterRows = rows.filter((item) => {
      let rowVal = `${item['pc_number']}${item['name']}`
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
        <h4> {`Manage coefficients per PC`} </h4>
        <div className='row' style={{ margin: '10px 0', position: 'relative' }}>
          <span className="searchIconCss"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
          <input
            type="text"
            className="form-control col-7 pcp_name"
            onChange={(e) => setState({...state, searchTerm: e.target.value})}
            placeholder={'Search'}
            onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(): null}
          />
          {/*<button
            onClick={() => router.push(`${manageType}/add?id=0`)}
            type="button"
            className="btn btn-dark pcp_btn col-3">
            {`+ ${button_title}`}
          </button>*/}
        </div>
        <div className="table-render-parent-div">
          <table className="table table-hover manage-types-table">
            <thead className="table-render-thead">
              <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody>
              {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
                <td> {eachRow.pc_number} </td>
                <td> {eachRow.name} </td>
                <td>{ getNeededActions(eachRow) } </td>
              </tr>)}
            </tbody>
            : <p style={{paddingTop: '10px'}}> No records </p>}
          </table>
        </div>
        <div>
        {state.filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel="< Previous"
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

  export default TableRenderer;
