import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { deleteAdditionalDocuments, downloadAdditionalDocuments } from '@/Services/ApiEndPoints'
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import { USER_ROLE_ENTITY_TYPE } from '@/Constants';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
const itemsPerPage = 5;

const AdditionalDocsOverview = ({ headers, rows, entityId, entityType, ...props }) => {
  entityType === 2 ? headers.indexOf('Employer') > -1 ? headers.splice(headers.indexOf('Employer'), 1) : headers : [];
  const router = useRouter();
  const [state, setState] = useState({
    searchName: '',
    searchEmployer: '',
    searchCompany: '',
    filterRows: rows,
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

  const handleSearch = (search) => {
    let filterRows = [];
    let { searchEmployer = '', searchCompany = '', searchName = '' } = state;
    if(search && (searchEmployer || searchCompany || searchName)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(searchName)
          status = `${item['name']}`.toLowerCase().toString().indexOf(searchName.toLowerCase().toString()) !== -1;
        if(status && searchEmployer)
          status = `${item['employer_name']}`.toLowerCase().toString().indexOf(searchEmployer.toLowerCase().toString()) !== -1;
        if(status && searchCompany)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(searchCompany.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = rows;
      searchEmployer = '';
      searchCompany = '';
      searchName = '';
    }
    setState({ ...state,
      searchName, searchCompany, searchEmployer,
      filterRows: filterRows,
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
       console.log(filterRows)
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
        {[USER_ROLE_ENTITY_TYPE.ABSOLUTE_YOU_ADMIN, USER_ROLE_ENTITY_TYPE.SALES_AGENT].includes(entityType) && <span title={'Edit'} className="actions-span text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>}
        {[USER_ROLE_ENTITY_TYPE.ABSOLUTE_YOU_ADMIN, USER_ROLE_ENTITY_TYPE.SALES_AGENT].includes(entityType) &&  <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>}
        {eachRow.files.length > 0 && <span title={'Download'} className="actions-span text-dark" onClick={() => handleActionClick('download', eachRow)}> <FiDownload/> </span>}
      </>
    )
  }

  return (
    < div className='row'>
      {[USER_ROLE_ENTITY_TYPE.ABSOLUTE_YOU_ADMIN, USER_ROLE_ENTITY_TYPE.SALES_AGENT].includes(entityType) && <div className='col-md-12 text-end additional_add_sticky pb-3'>
      <button
        onClick={() => router.push(`/manage-additional-docs?entitytype=${entityType}&entityid=${entityId}&action=1&id=0`)}
        type="button"
        className="btn skyblue-bg-color rounded-0 shadow-none col-3 px-0">
        {`+Add additional document`}
      </button>
      </div>
      }
      <div className={`my_documents_position_sticky ${[USER_ROLE_ENTITY_TYPE.ABSOLUTE_YOU_ADMIN, USER_ROLE_ENTITY_TYPE.SALES_AGENT ].includes(entityType) ? 'my_documents_position_sticky_admin mb-4' : entityType === USER_ROLE_ENTITY_TYPE.EMPLOYER ? 'my_documents_position_sticky_employer mb-4' : 'my_documents_position_sticky_employee mb-4'}`}>
      <div className='row'>
      <div className='col-md-12'>
         <div className='row'>
         {[{value:'searchName', label: 'document'}, {value:'searchEmployer', label: 'employer'},{value:'searchCompany', label: 'company'}].map((key, index) => {
           if((entityType == 2 && key.label === 'employer') || (entityType === 3 && key.label !== 'document')) return;
           return (
             <div key={index} className={entityType === 3 ? 'col-md-9' : entityType === 2 ? 'col-md-4' : 'col-md-3'}>
               <input
                 type="text"
                 value={state[key.value]}
                 className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
                 onChange={(e) => setState({...state, [key.value]: e.target.value})}
                 placeholder={`Search ${key.label}`}
                 onKeyUp={(e) => e.key === 'Enter' ? handleSearch(1): null}
               />
             </div>
           );
         })}
         <div className='col-md-3'>
           <div className='row'>
             <div className='col-md-6'>
             <button
             type="button"
             className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
             onClick={() => handleSearch(1)}
           >
             SEARCH
           </button>

             </div>
             <div className='col-md-6'>
              <button
             type="button"
             className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
             onClick={() => handleSearch(0)}
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
      <div className="table-render-parent-div min-height-add-doc">
          <table className="table table-hover manage-types-table manage-documents-table-header my_documents_position_sticky_table">
            <thead className="table-render-thead">
              <tr key={'header-row-tr'}>{headers.map((eachHeader, index) => <th key={`tablecol${index}`} className="align-middle " scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
            <tbody>
              {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
                <td> {eachRow.name} </td>
                {entityType !== 2 ? <td width="170px"> {eachRow.employer_name} </td> : null}
                <td width="170px"> {eachRow.company_name} </td>
                <td> {formatDate(eachRow.startDate) || '-'} </td>
                <td> {formatDate(eachRow.endDate) || '-'} </td>
                <td className='text-center'> {eachRow.linkToCooperationAgreement ? 'Yes' : 'No'} </td>
                <td className='color-skyblue-icon'>{ getNeededActions(eachRow) } </td>
              </tr>)}
            </tbody>
            :  <tbody>
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
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
      />}
       <div className='row mt-3 mb-2'>
        <div className='col-md-12'>
         <button onClick={() => window.open(process.env.NEXT_PUBLIC_APP_URL_DRUPAL, '_self')} type="button" className="btn poppins-light-18px text-decoration-underline shadow-none p-0 text-uppercase">
          {`Back`}
        </button>
        </div>
       </div>
      </div>
    </div>
  );
}

export default AdditionalDocsOverview;
