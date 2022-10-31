import React, { useState, useEffect } from 'react';
import { getOtherDocuments, downloadAdditionalDocuments } from '@/Services/ApiEndPoints';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { GrView } from 'react-icons/gr';
import { FiDownload } from 'react-icons/fi';
import customAlert from '@/atoms/customAlert';
import { getLastTwelveMonths } from '@/components/SalaryBenefits/SalaryBenefitsHelpers';
const itemsPerPage = 8;

const monthOptions = getLastTwelveMonths();
const OtherDocumentsOverview = ({ entityId, entityType}) => {
  const router = useRouter();
  const [state, setState] = useState({
    loaded: false,
    rows: [],
    filterRows: [],
    headers: Number(entityType) === 2 ? ['Document', 'Company', 'Actions']
    : ['Document', 'Employer', 'Company', 'Actions'],
    titleSearchTerm: '',
    companySearchTerm: '',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
  })

  useEffect(() => {  fetchData() }, [])

  /**
   * [fetchData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    let setObj = {...state};
    await APICALL.service(`${getOtherDocuments}/${entityId}/${entityType}`, 'GET').then(response => {
      if(response.status === 200) {
        let apiData = response.data;
        setObj['rows'] = apiData;
        setObj['filterRows'] = [...apiData || []];
        setObj['loaded'] = true;
      }
    }).catch(error => console.error(error))
    setState(setObj);
  }


  const handleSearchClick = (search = 0) => {
    let { rows, titleSearchTerm, companySearchTerm } = state;
    let filterRows = [];
    if(search && (titleSearchTerm || companySearchTerm)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(titleSearchTerm)
          status = `${item['title']}`.toLowerCase().toString().indexOf(titleSearchTerm.toLowerCase().toString()) !== -1;
        if(status && companySearchTerm)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(companySearchTerm.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = rows;
      companySearchTerm = '';
      titleSearchTerm = '';
    }
    setState({ ...state, companySearchTerm, titleSearchTerm,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  const getNeededActions = (eachRow) => {
    return (
      <>
        {eachRow.type === 2 && <span title={'View'} className="actions-span text-dark" onClick={() => handleActionClick('preview', eachRow)}> <GrView /> </span>}
        <span title={'Download'} className="actions-span text-dark" onClick={() => handleActionClick('download', eachRow)}> <FiDownload/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if(action === 'preview') {
      window.open(`labour-share-doc-preview?entityid=${eachRow.uid}&root_parent_id=${eachRow.root_parent_id}&ref_id=${eachRow.tid}&preview=1&approved=1`, '_blank');
    }
    if(action === 'download') {
      handleDownload(eachRow);
    }
  }

  const handleDownload = async (eachRow) => {
    const {fid, file_path, file_location, file_name } = eachRow;
    eachRow['files'] = [{ fid, file_path, file_location, file_name }];
    setState({...state, spinner: true})
    await APICALL.service(`${downloadAdditionalDocuments}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if(response.status === 200 && result.url) {
          setState({...state, spinner: false, showPopup: false})
          var a = document.createElement("a");
          a.setAttribute("type", "file");
          a.href     = result.url;
          a.download = result.zipFileName;
          a.target   = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          setState({...state, spinner: false, showPopup: false})
          customAlert('error', `Error occurred while downloading`, 2000);
        }
    }).catch((error) => {
      customAlert('error', `Error occurred while downloading`, 2000);
      setState({...state, spinner: false, showPopup: false})
    })
  }

  //------------------- Pagination code -------------------------//
  //-------------------
     useEffect(() => {
       if(state.loaded) {
         setState({...state, ...updatePaginationData(state.filterRows, state.itemOffset || 0)})
       }
     }, [state.itemOffset, state.loaded]);

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


  if(!state.loaded) {
    return <> Loading... </>
  }

  const searchTextField = (key, placeholder) => {
    return(
        <div className='col-md-6' >
        <input
          type="text"
          value={state[key]}
          className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
          onChange={(e) => setState({...state, [key]: e.target.value })}
          placeholder={'Search ' + placeholder}
          onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
        />

      </div>
    )
  }

  return(
    <div>
    <div className='searchbox m-0 v1_doc v1_position_sticky' style={{ margin: '10px 0', position: 'relative' }}>
    <div className='row '>
    <div className='col-md-12'>
       <div className='row'>
       <div className='col-md-9'>
         <div className='row'>
         {searchTextField('titleSearchTerm', 'title')}
         {searchTextField('companySearchTerm', 'company')}
         </div>
       </div>
       <div className='col-md-3'>
         <div className='row'>
           <div className='col-md-6'>
           <button
           type="button"
           className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color shadow-none w-100"
           onClick={() => handleSearchClick(1)}
         >
           SEARCH
         </button>

           </div>
           <div className='col-md-6'>
           <button
           type="button"
           className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button shadow-none w-100"
           onClick={() => handleSearchClick(0)}
         >
           RESET
         </button>
           </div>
         </div>
       </div>
       </div>
      </div>
    </div>
    </div>
    <div className="table-render-parent-div minimun_height_v1">
        <table className="table table-hover manage-types-table manage-documents-table-header ">
          <thead className="table-render-thead">
            <tr key={'header-row-tr'}>{state.headers.map((eachHeader, index) => <th key={`tablecol${index}`} className="align-middle" scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => <tr key={eachRow.tid} id={eachRow.tid}>
              <td> {eachRow.title}  </td>
              {Number(entityType) === 1 && <td> {eachRow.employer_name} </td>}
              <td> {eachRow.company_name} </td>
              <td>{ getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>
          : <tbody>
          <tr>
          <td colSpan={8} className="text-center poppins-regular-18px no-records">
                  No records
                </td>
          </tr>
          </tbody>}
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
     <div className='row'>
       <div className='col-md-12'>
       <button onClick={() => router.push('/')} type="button" className="btn text-decoration-underline text-uppercase poppins-light-18px shadow-none px-0">
        {`Back`}
      </button>
       </div>
     </div>
    </div>
    </div>
  );
}

export default React.memo(OtherDocumentsOverview)
