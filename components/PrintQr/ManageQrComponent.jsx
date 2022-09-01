import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { downloadQrCode, regenerateQrCode } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import { FiDownload } from 'react-icons/fi';
import { BiQrScan } from 'react-icons/bi';
import { GrRefresh } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import customAlert from '@/atoms/customAlert';
const itemsPerPage = 8;

const ManageQrComponent = ({ headers, rows }) => {
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
        <span className="span-action-icons me-2 text-dark" onClick={() => handleActionClick('view', eachRow)}>   <BiQrScan className='mt-2 ms-3 color-skyblue'/> </span>
        <span className="span-action-icons me-2 text-dark" onClick={() => handleActionClick('regenerate', eachRow)}>   <GrRefresh className='mt-2 ms-3 color-skyblue force-skyblue'/> </span>
        <span className="span-action-icons me-2 text-dark" onClick={() => handleActionClick('download', eachRow)}> <FiDownload className='mt-2 ms-3 color-skyblue'/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'view') {
      window.open(eachRow.qr_path, '_blank')
    } else if (action === 'regenerate') {
      handleRegenerateQrCode(eachRow);
    } else {
      handleDownload(eachRow);
    }
  }

  const handleRegenerateQrCode = async (eachRow) => {
    await APICALL.service(`${regenerateQrCode}`, 'POST', eachRow)
      .then((response) => {
        if(response.status === 200) {
          customAlert('success', `QR code regenerated successfully!`, 2000);
        }
      }).catch((error) => window.alert('Error occurred'));
  }

  const handleDownload = async (eachRow) => {
    await APICALL.service(`${downloadQrCode}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if(response.status === 200 && result.url) {
          var a = document.createElement("a");
          a.setAttribute("type", "file");
          a.href     = result.url;
          a.download = result.zipFileName;
          a.target   = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          window.alert('Error occurred')
        }
      })
      .catch((error) => window.alert('Error occurred'));
  }

  const handleSearchClick = (search = 0) => {
    let filterRows = [];
    let { companyTerm = '', locationTerm = '' } = state;
    if(search && (companyTerm || locationTerm)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(companyTerm)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(companyTerm.toLowerCase().toString()) !== -1;
        if(status && locationTerm)
          status = `${item['location_name']}`.toLowerCase().toString().indexOf(locationTerm.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = rows;
      companyTerm = '';
      locationTerm = '';
    }
    setState({ ...state, companyTerm, locationTerm, filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
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
      <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Manage QR code`} </h4>
      <div className='row searchbox m-0 my-4' style={{ margin: '10px 0' }}>
       <div className='col-md-12 row'>
         <div className='col-md-9 row'>
           <input
             type="text"
             value={state.companyTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 w-auto rounded-0"
             onChange={(e) => setState({...state, companyTerm: e.target.value})}
             placeholder={'Search company'}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
           <input
             type="text"
             value={state.locationTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 mx-2 w-auto rounded-0"
             onChange={(e) => setState({...state, locationTerm: e.target.value})}
             placeholder={'Search location'}
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
      <div className="max-height-420">
        <table className="table table-hover manage-types-table">
          <thead className="table-render-thead ">
            <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className="align-middle" width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => {
              return (
                <tr key={eachRow.location_id}>
                    <td> {eachRow.company_name} </td>
                    <td> {eachRow.location_name} </td>
                    <td> {getNeededActions(eachRow) } </td>
                </tr>
              );
            })}
          </tbody>
          : <p style={{paddingTop: '10px'}}> No records. </p>}
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

export default ManageQrComponent;
