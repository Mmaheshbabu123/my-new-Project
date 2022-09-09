import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteSalaryBenefits } from '@/Services/ApiEndPoints';
import { formatDate } from './SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { salaryBenefitOccurenceOptions } from '@/Constants';
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
        <span className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className='mt-2 ms-3 color-skyblue '/> </span>
        <span className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete className='mt-2 ms-3 color-skyblue '/> </span>
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

  return (
    <>
      <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Manage salary benefits`} </h4>
      <div className='col-md-12 text-end'>
        <button
          onClick={() => router.push(`manage-salary-benefits?action=create&id=0`)}
          type="button"
          // className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 footer-content"
          className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 shadow-none">
          {`+ Add salary benefit`}
        </button>
      </div>
      <div className='searchbox m-0 my-4' style={{ margin: '10px 0', position: 'relative' }}>
       <div className='row'>
         <div className='col-md-6 p-0'>
           <input
             type="text"
             value={state.searchTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
             onChange={(e) => setState({...state, searchTerm: e.target.value})}
             placeholder={'Search'}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
         </div>
         <div className='col-md-6'>
           <div className='row justify-content-end'>
             <div className='col-md-3'>
             <button
             type="button"
             className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 poppins-medium-18px shadow-none"
             onClick={() => handleSearchClick(1)}
           >
             SEARCH
           </button>
             </div>
             <div className='col-md-3'>
             <button
             type="button"
            //  className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 poppins-medium-18px"
             className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 poppins-medium-18px shadow-none"
             
             onClick={() => handleSearchClick(0)}
           >
             RESET
           </button>
             </div>
           </div>
           
          
         </div>
        </div>
      </div>
      <div className="table-render-parent-div max-height-420">
        <table className="table table-hover manage-types-table salary-benefits">
          <thead className="table-render-thead ">
            <tr className='btn-bg-gray-medium table-sticky-bg-gray py-2' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='poppins-regular-18px justify-content-center btn-bg-gray-medium padding-t-b-10' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => <tr className='border poppinns-regular-thin p-2' key={eachRow.sb_id} id={eachRow.sb_id}>
              <td className='poppinns-regular-thin py-2'> {eachRow.name} </td>
              <td className='poppinns-regular-thin'> {eachRow.value ? `${eachRow.value} ${eachRow.valueType === 1 ? '€' : '%'}` : ''} </td>
              <td className='poppinns-regular-thin'> {eachRow.occurence ? salaryBenefitOccurenceOptions.filter(val => val.value === eachRow.occurence)[0]['label'] : ''} </td>
              <td className='poppinns-regular-thin'> {formatDate(eachRow.date) ? formatDate(eachRow.date) : '--'} </td>
              <td className='poppinns-regular-thin'> { getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>: <p className='poppins-regular-18px' style={{paddingTop: '10px'}}> No records </p>}
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
            subContainerClassName={"pages pagination justify-content-center project-pagination"}
            activeClassName={"active"}
        />}
        <button onClick={() => router.push('/')} type="button" className="bg-white  back-btn-text  border-0 ppoppins-medium-18px   float-sm-right mt-5 mb-5">
          {`Back`}
        </button>
      </div>
    </>
  );
}

export default ShowTable;
