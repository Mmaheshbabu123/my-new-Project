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
        <span title={'Edit'} className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className='mt-2 ms-3 color-skyblue' /> </span>
        <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete className='mt-2 ms-3 color-skyblue'/> </span>
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
        <h4 className='mt-2 mb-4 font-weight-bold   px-0  bitter-italic-normal-medium-24'> {`Manage coefficients per PC`} </h4>
        <div className='row searchbox m-0 my-4' style={{ margin: '10px 0' }}>
         <div className='col-md-12 row'>
           <div className='col-md-9 row'>
             <input
               type="text"
               value={state.searchTerm}
               className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 w-auto rounded-0"
               onChange={(e) => setState({...state, searchTermNumber: e.target.value})}
               placeholder={'Pc number search'}
               onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
             />
             <input
               type="text"
               value={state.searchTerm}
               className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 mx-2 w-auto rounded-0"
               onChange={(e) => setState({...state, searchTermName: e.target.value})}
               placeholder={'PC name search'}
               onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
             />
           </div>
           <div className='col-md-3'>
             <button
               type="button"
               className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color"
               onClick={() => handleSearchClick(1)}
             >
               SEARCH
             </button>
             <button
               type="button"
               className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 ms-2 reset-btn"
               onClick={() => handleSearchClick(0)}
             >
               RESET
             </button>
           </div>
          </div>
        </div>
        <div className="table-render-parent-div ">
          <table className="table table-hover manage-types-table  mb-3 text-center">
            <thead className="table-render-thead">
              <tr className='btn-bg-gray-medium table-sticky-bg-gray' key={'header-row-tr'}>{headers.map((eachHeader, index) =>
              <th className='poppins-regular-18px justify-content-center align-items-center btn-bg-gray-medium text-center pt-4' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody>
              {state.currentItems.map(eachRow => <tr className='border poppinns-regular-thin p-2' key={eachRow.id} id={eachRow.id}>
                <td className="poppinns-regular-thin"> {eachRow.pc_number} </td>
                <td className="poppinns-regular-thin"> {eachRow.name} </td>
                <td className="poppinns-regular-thin">{ getNeededActions(eachRow) } </td>
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
          <button onClick={() => router.push('/')} type="button" className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 mb-5">
            {`BACK`}
          </button>
          </div>
        </div>
      </>
    );
  }

  export default TableRenderer;
