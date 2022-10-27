import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteEmployeeType ,deleteCoefficientType} from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 5;

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

  const handleSearchClick = (search = 0) => {
    handleSearch(search ? state.searchTerm : '' );
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
      <div className='py-4 position-sticky-pc px-0'>
      <h4 className='font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Manage ${button_title.includes('employee') ? 'employee types' : 'coefficients'}`} </h4>
      </div>
      <div className='col-md-12 text-end position-sticky-config-add'>
      <button
        onClick={() => router.push(`${manageType}/add?id=0`)}
        type="button"
        // className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 footer-content"
        className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 shadow-none text-uppercase"
        >
        {`+ ${button_title}`}
      </button>
      </div>
      <div className='row searchbox m-0 pt-2 pb-4 position-sticky-config-search' style={{ margin: '10px 0'}}>
       <div className='col-md-12 row pe-0'>
         <div className='col-md-8 col-lg-9 ps-0 pe-4'>
           <input
             type="text"
             value={state.searchTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
             onChange={(e) => setState({...state, searchTerm: e.target.value})}
             placeholder={`${button_title.includes('employee') ? 'Employee types' : 'Coefficient'}`}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
         </div>
         <div className='col-md-4 col-lg-3 pe-0'>
            <div className='row justify-content-end'>
              <div className='col-md-6 col-lg-6 ps-0'>
                <button
                type="button"
                className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
                onClick={() => handleSearchClick(1)}>
                SEARCH
              </button>
              </div>
              <div className='col-md-6 col-lg-6 pe-0'>
                <button
                type="button"
                // className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn  w-100 shadow-none"
                className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
                onClick={() => handleSearchClick(0)}>
                RESET
                </button>
              </div>
            </div>
         </div>
        </div>
      </div>
      <div className="table-render-parent-div">
          <table className="table table-hover manage-types-table table  mb-3 text-start">
            <thead className="table-render-thead bg_grey">
              <tr className='table-sticky-bg-gray poppins-medium-18px border-0' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='action-sec px-5' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody className='table-body-employee-type poppins-light-18px'>
              {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
                <td className='text-start px-5 py-1'> {eachRow.name} </td>
                <td className='text-end px-5 py-1 '>{ getNeededActions(eachRow) } </td>
              </tr>)}
            </tbody>
            :
            <tbody className='no_records text-center'>
               <tr>
               <td style={{width:'100%'}} colSpan={'8'} className='poppins-light-18px'> No records </td>
               </tr>
              </tbody>}
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
          containerClassName={"pagination justify-content-center project-pagination align-items-center"}
          itemClass="page-item"
          linkClass="page-link"
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
      /></div>}
        <button onClick={() => router.push('/manage')} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-3 mb-2 px-0 text-decoration-underline text-uppercase">
          {`Back`}
        </button>
      </div>
    </>
  );
}

export default TableRenderer;
