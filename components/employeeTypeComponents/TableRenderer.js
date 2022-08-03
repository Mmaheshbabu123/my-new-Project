import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteEmployeeType ,deleteCoefficientType} from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import SearchIcon from '../SearchIcon';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 8;

const TableRenderer = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    deleteUrl : (manageType == 'employee-types') ? deleteEmployeeType :deleteCoefficientType,
    delete_title : (manageType == 'employee-types') ? 'employee type'  :'coefficient',
    filterRows: rows,
    searchKey: 'name',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
  })
  useEffect(() => {
    setState({...state, filterRows: rows, deleteUrl: (manageType == 'employee-types') ? deleteEmployeeType :deleteCoefficientType})
  }, [rows.length])

  const getNeededActions = (eachRow) => {
    return (
      <>
        <span title={'Edit'} className="actions-span text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className="color-skyblue"/> </span>
        <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete className="color-skyblue"/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'delete') {

      confirmAlert({
        message: `Do you want to delete the ${state.delete_title}?`,
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

  const handleSearch = (value) => {
    let filterRows = rows.filter((item) => {
      return (item[state.searchKey].toLowerCase().toString())
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

const button_title = manageType == 'employee-types'? `Add employee type`:`Add coefficient`;
  return (
    <>
      <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Manage ${button_title.includes('employee') ? 'employee types' : 'coefficients'}`} </h4>
      <div className='row searchbox m-0 my-4' style={{ margin: '10px 0', position: 'relative' }}>
       <div className='col-md-9 p-0'>
        <span className="searchIconCss"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
        <input
          type="text"
          className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
          onChange={(e) => setState({...state, searchTerm: e.target.value})}
          placeholder={'Search'}
          onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(): null}
        />
        </div>
        <div className='col-md-3'>
        <button
          onClick={() => router.push(`${manageType}/add?id=0`)}
          type="button"
          className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 footer-content">
          {`+ ${button_title}`}
        </button>
        </div>
      </div>
      <div className="table-render-parent-div">
          <table className="table table-hover manage-types-table table  mb-3 text-start">
            <thead className="table-render-thead ">
              <tr className='table-sticky-bg-gray poppins-regular-18px ' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='action-sec px-5' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody>
              {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
                <td className='text-start px-5 poppinns-regular-thin py-1'> {eachRow.name} </td>
                <td className='text-end px-5 poppinns-regular-thin py-1 '>{ getNeededActions(eachRow) } </td>
              </tr>)}
            </tbody>
            : <p style={{paddingTop: '10px'}}> No records </p>}
          </table>
      </div>
      <div>
      {state.filterRows.length > itemsPerPage && <div className='pgnation col-md-3 my-5 m-auto'><ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineArrowRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={state.pageCount}
          forcePage={state.currentPage}
          previousLabel={<AiOutlineArrowLeft />}
          renderOnZeroPageCount={null}
          containerClassName={"pagination justify-content-center project-pagination"}
          itemClass="page-item"
          linkClass="page-link"
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
      /></div>}
        <button onClick={() => router.push('/')} type="button" className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 md-5">
          {`Back`}
        </button>
      </div>
    </>
  );
}

export default TableRenderer;
