import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteAdditionalDocuments, downloadAdditionalDocuments } from '@/Services/ApiEndPoints'
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 8;

const AdditionalDocsOverview = ({ headers, rows, entityId, entityType, ...props }) => {
  entityType === 2 ? headers.indexOf('Employer') > -1 ? headers.splice(headers.indexOf('Employer'), 1) : headers : [];
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
    setState({...state, filterRows: rows, ...updatePaginationData(rows, 0)})
  }, [rows.length])



  const handleActionClick = (action, eachRow) => {
    if(action === 'edit') {
      router.push(`/manage-additional-docs?entitytype=${entityType}&entityid=${entityId}&action=1&id=${eachRow.ad_id}`);
    }
    if (action === 'delete') {
      confirmAlert({
        message: `Do you want to delete the document?`,
        buttons: [
          { label: 'No' },
          { label: 'Yes', onClick: () => handleDelete(eachRow.ad_id) }
        ]
      });
    }
    if(action === 'download') {
      handleDownload(eachRow);
    }
  }

  const handleDownload = async (eachRow) => {
    await APICALL.service(`${downloadAdditionalDocuments}`, 'POST', eachRow)
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

  const handleDelete = async (id) => {
    await APICALL.service(`${deleteAdditionalDocuments}/${id}`, 'DELETE')
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

  const getNeededActions = (eachRow) => {
    return (
      <>
        {entityType !== 2 && <span title={'Edit'} className="actions-span text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>}
        {entityType !== 2 && <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>}
        <span title={'Download'} className="actions-span text-dark" onClick={() => handleActionClick('download', eachRow)}> <FiDownload/> </span>
      </>
    )
  }

  const getEntityName = (eachRow, type) => {
    let { employerId, companyId } = eachRow;
    let { companies, employers } = props;
    let rowObj = {};
    if(type) {
      rowObj = companies[employerId] ? companies[employerId].filter(val => val.id === companyId) : [];
    } else {
      rowObj = employers ? employers.filter(val => val.id === employerId) : [];
    }
    return rowObj.length ? rowObj[0]['label'] : '';
  }

  return (
    <>
      <div className='col-md-12 text-end'>
      {entityType !== 2 && <button
        onClick={() => router.push(`/manage-additional-docs?entitytype=${entityType}&entityid=${entityId}&action=1&id=0`)}
        type="button"
        className="btn btn-dark pcp_btn col-3">
        {`+Add my document`}
      </button>}
      </div>
      <div className='row searchbox m-0 my-4' style={{ margin: '10px 0', position: 'relative' }}>
       <div className='col-md-12 row'>
         <div className='col-md-6 p-0'>
           <input
             type="text"
             value={state.searchTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0"
             onChange={(e) => setState({...state, searchTerm: e.target.value})}
             placeholder={'Search'}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
         </div>
         <div className='col-md-6'>
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
      <div className="table-render-parent-div">
          <table className="table table-hover manage-types-table">
            <thead className="table-render-thead">
              <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} className="align-middle" scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody>
              {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
                <td> {eachRow.name} </td>
                {entityType !== 2 ? <td width="170px"> {getEntityName(eachRow)} </td> : null}
                <td width="170px"> {getEntityName(eachRow, 1)} </td>
                <td> {formatDate(eachRow.startDate) || '-'} </td>
                <td> {formatDate(eachRow.endDate) || '-'} </td>
                <td> {eachRow.linkToCooperationAgreement ? 'Yes' : 'No'} </td>
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
        <button onClick={() => window.open(process.env.NEXT_PUBLIC_APP_URL_DRUPAL, '_self')} type="button" className="btn btn-dark pcp_btn col-1">
          {`Back`}
        </button>
      </div>
    </>
  );
}

export default AdditionalDocsOverview;
