import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteCompositions } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import SearchIcon from '../SearchIcon';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Translation from '@/Translation';
const itemsPerPage = 8;

const CompositionsOverview = ({ headers, rows, manageType, ...props }) => {
  const {t} = props;
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
        <span title="Edit" className="actions-span me-2 text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className='mt-2 ms-3 color-skyblue '/> </span>
        <span title="Delete" className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete className='mt-2 ms-3 color-skyblue '/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'delete') {
      confirmAlert({
        message: 'Do you want to delete the record?',
        buttons: [
          { label: 'No' },
          { label: 'Yes', onClick: () => handleDelete(eachRow.cc_id) }
        ]
      });
    } else {
      router.push(`composition-coefficient?action=edit&id=${eachRow.cc_id}`);
    }
  }

  const handleDelete = async (id) => {
    await APICALL.service(`${deleteCompositions}/${id}`, 'DELETE')
      .then((result) => router.reload())
      .catch((error) => window.alert('Error occurred'));
  }

  const handleSearch = (value) => {
    let filterRows = rows.filter((item) => {
      let rowVal = `${item['name']}`
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
      <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0 pt-3'> {t(`Manage compositions coeffcients`)} </h4>
      <div className='col-md-12 text-end'>
        <button
          onClick={() => router.push(`composition-coefficient?action=create&id=0`)}
          type="button"
          className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 footer-content">
          {'+' + t(`Add composition coefficient`)}
        </button>
      </div>
      <div className='row searchbox m-0 mt-2 mb-4' style={{ margin: '10px 0', position: 'relative' }}>
       <div className='col-md-12 row'>
         <div className='col-md-6 p-0'>
           <input
             type="text"
             value={state.searchTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
             onChange={(e) => setState({...state, searchTerm: e.target.value})}
             placeholder={t('Search')}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
         </div>
         <div className='col-md-6'>
           <button
             type="button"
             className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color"
             onClick={() => handleSearchClick(1)}
           >
             {t('SEARCH')}
           </button>
           <button
             type="button"
             className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 ms-2 reset-btn"
             onClick={() => handleSearchClick(0)}
           >
             {t('RESET')}
           </button>
         </div>
        </div>
      </div>
      <div className="table-render-parent-div max-height-420">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead">
            <tr className='btn-bg-gray-medium table-sticky-bg-gray py-2' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='poppins-regular-18px justify-content-center btn-bg-gray-medium padding-t-b-10' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => <tr className='border poppinns-regular-thin p-2' key={eachRow.cc_id} id={eachRow.cc_id}>
              <td className='poppinns-regular-thin py-2'> {eachRow.name} </td>
              <td className='poppinns-regular-thin'> {eachRow.including ? 'Yes' : '-'} </td>
              <td className='poppinns-regular-thin'> {eachRow.including ? '' : 'No'} </td>
              <td className='poppinns-regular-thin'> {eachRow.remark ? eachRow.remark : '-'} </td>
              <td className='poppinns-regular-thin'> { getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>: <p className='poppins-regular-18px' style={{paddingTop: '10px'}}> {t('No records')} </p>}
        </table>
      </div>
      <div>
        {state.filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel={<AiOutlineArrowLeft />}
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination justify-content-center project-pagination"}
            activeClassName={"active"}
        />}
        <button onClick={() => router.push('/')} type="button" className="bg-white  back-btn-text  border-0 poppins-regular-20px  float-sm-right mt-5 mb-5">
          {t(`Back`)}
        </button>
      </div>
    </>
  );
}

export default React.memo(Translation(CompositionsOverview,[`Manage compositions coeffcients`,'Search','SEARCH','RESET','No records',`Back`]));
