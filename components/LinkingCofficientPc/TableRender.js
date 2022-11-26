import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { delteCofficientPerPc} from '../../Services/ApiEndPoints'
import { APICALL } from '../../Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';

import ReactPaginate from 'react-paginate';
const itemsPerPage = 8;

const TableRenderer = ({ headers, rows, manageType, ...props }) => {
  const router = useRouter();
  const [state, setState] = useState({
    searchTermNumber: '',
    searchTermName: '',
    deleteUrl :  delteCofficientPerPc,
    filterRows: rows,
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
        <span title={'Edit'} className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className=' color-skyblue' /> </span>
        <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete className='ms-3 color-skyblue'/> </span>
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

  const handleSearch = (search = 1) => {
    let filterRows = [];
    let { searchTermName = '', searchTermNumber = '' } = state;
    if(search && (searchTermName || searchTermNumber)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(searchTermName)
          status = `${item['name']}`.toLowerCase().toString().indexOf(searchTermName.toLowerCase().toString()) !== -1;
        if(status && searchTermNumber)
          status = `${item['pc_number']}`.toLowerCase().toString().indexOf(searchTermNumber.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = rows;
    }
    setState({ ...state,
      searchTermName: searchTermName,
      searchTermNumber: searchTermNumber,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  const handleSearchClick = (search = 0) => {
    handleSearch(search);
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

        <div className='py-4 position-sticky-pc px-0'>
        <h4 className='font-weight-bold px-0  bitter-italic-normal-medium-24'> {`Manage coefficients per PC`} </h4>
        </div>
        <div className='searchbox m-0 my-4' style={{ margin: '10px 0' }}>
         <div className='row'>
           <div className='col-md-7 col-lg-9'>
             <div className='row'>
               <div className='col-md-6'>
               <input
               type="text"
               value={state.searchTerm}
               className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
               onChange={(e) => setState({...state, searchTermNumber: e.target.value})}
               placeholder={'Paritair comite number'}
               onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
             />
               </div>
               <div className='col-md-6'>
               <input
               type="text"
               value={state.searchTerm}
               className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
               onChange={(e) => setState({...state, searchTermName: e.target.value})}
               placeholder={'Paritair comite name'}
               onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
             />
               </div>
             </div>
           </div>
           <div className='col-md-5 col-lg-3'>
             <div className='row'>
               <div className='col-md-6 col-lg-6'>
               <button
               type="button"
               className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
               onClick={() => handleSearchClick(1)}
             >
               SEARCH
             </button>
               </div>
               <div className='col-md-6 col-lg-6'>
               <button
               type="button"
               className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
               onClick={() => handleSearchClick(0)}
             >
               RESET
             </button>
               </div>
             </div>
           </div>
          </div>
        </div>
        <div className="table-render-parent-div ">
          <table className="table table-hover manage-types-table  mb-3 ">
            <thead className="table-render-thead">
              <tr className='btn-bg-gray-medium table-sticky-bg-gray border-bottom-0' key={'header-row-tr'}>{headers.map((eachHeader, index) =>
              <th className='poppins-medium-18px justify-content-center align-items-center btn-bg-gray-medium ps-4' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody className='manage_coefficient_table_body'>
              {state.currentItems.map(eachRow => <tr className='border poppins-regular-18px p-2' key={eachRow.id} id={eachRow.id}>
                <td className="poppins-regular-18px ps-4"> {eachRow.pc_number} </td>
                <td className="poppins-regular-18px ps-4"> {eachRow.name} </td>
                <td className="poppins-regular-18px ps-4">{ getNeededActions(eachRow) } </td>
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
            subContainerClassName={"pages pagination justify-content-center project-pagination"}
            activeClassName={"active"}
        />}
        <div className="text-start col-md-6">
          <button onClick={() => router.push('/')} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-5 mb-5 ps-0 text-decoration-underline text-uppercase">
            {`BACK`}
          </button>
          </div>
        </div>
      </>
    );
  }

  export default TableRenderer;
