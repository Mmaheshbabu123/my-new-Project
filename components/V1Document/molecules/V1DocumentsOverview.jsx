import React, { useState, useEffect } from 'react';
import { getSignedV1Documents, downloadV1Documents } from '@/Services/ApiEndPoints';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { APICALL } from '@/Services/ApiServices';
import MultiSelectField from '@/atoms/MultiSelectField';
import { GrView } from 'react-icons/gr';
import { FiDownload } from 'react-icons/fi';
import styles from './V1Document.module.css';
import customAlert from '@/atoms/customAlert';
const itemsPerPage = 8;

const V1DocumentsOverview = (props) => {
  const [state, setState] = useState({
    loaded: false,
    rows: [],
    filterRows: [],
    headers: ['Employer', 'Company', 'Employee', 'Function', 'Signing date', 'Actions'],
    functions: [{label: '-- Select --', value: 0}],
    period: [{label: '-- Select --', value: 0}],
    employeeSearchTerm: '',
    companySearchTerm: '',
    functionSearchTerm: [],
    periodSearchTerm: [],
    employerArray: [],
    showPopup: false,
    spinner: false,
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
    await APICALL.service(getSignedV1Documents, 'GET').then(response => {
      if(response.status === 200) {
        let apiData = response.data;
        setObj['functions'] = [...setObj['functions'], ...apiData.overviewData.map(val => { return {value: val.function_id, label: val.function_name } })]
        setObj['rows'] = apiData.overviewData;
        setObj['filterRows'] = [...apiData.overviewData];
        setObj['employerArray'] = apiData.employers;
        setObj['loaded'] = true;
      }
    }).catch(error => console.error(error))
    setState(setObj);
  }


  const handleSearchClick = (search = 0) => {
    let { rows, employeeSearchTerm, companySearchTerm, functionSearchTerm, periodSearchTerm } = state;
    let filterRows = [];
    if(search && (employeeSearchTerm || companySearchTerm || functionSearchTerm || periodSearchTerm)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(employeeSearchTerm)
          status = `${item['employee_name']}`.toLowerCase().toString().indexOf(employeeSearchTerm.toLowerCase().toString()) !== -1;
        if(status && companySearchTerm)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(companySearchTerm.toLowerCase().toString()) !== -1;
        if(status && functionSearchTerm)
          status = item['function_id'] === functionSearchTerm;
        if(status && periodSearchTerm)
          status = checkPeriod(item, periodSearchTerm)
       return status;
      })
    } else {
      filterRows = rows;
      companySearchTerm = '';
      employeeSearchTerm = '';
      functionSearchTerm = '';
      periodSearchTerm = ''
    }
    setState({ ...state, companySearchTerm, employeeSearchTerm, functionSearchTerm, periodSearchTerm,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  const checkPeriod = (item, periodSearchTerm) => {
    return true;
  }

  const getNeededActions = (eachRow) => {
    return (
      <>
        <span title={'View'} className="actions-span text-dark" onClick={() => handleActionClick('preview', eachRow)}> <GrView /> </span>
        <span title={'Download'} className="actions-span text-dark" onClick={() => handleActionClick('download', eachRow)}> <FiDownload/> </span>
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if(action === 'preview') {
      window.open(`/v1-document?entityid=${eachRow.employee_id}&entitytype=${3}&companyid=${eachRow.company_id}&preview=${1}`, '_blank');
    }
    if(action === 'download') {
      handleDownload(eachRow);
    }
  }

  const handleDownload = async (v1Docs = [], type = 0) => {
    let postObj = {data: v1Docs, type }
    setState({...state, spinner: true})
    await APICALL.service(`${downloadV1Documents}`, 'POST', postObj)
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
          customAlert('error', `Error occurred while ${type ? 'exporting' : 'downloading'}`, 2000);
        }
    }).catch((error) => {
      customAlert('error', `Error occurred while ${type ? 'exporting' : 'downloading'}`, 2000);
      setState({...state, spinner: false, showPopup: false})
    })
  }

  const getEntityName = (eachRow) => {
    let { employer_id } = eachRow;
    let rowObj = [];
    rowObj = state.employerArray ? state.employerArray.filter(val => val.id === employer_id) : [];
    return rowObj.length ? rowObj[0]['name'] : '';
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

  const handleClose = () => { setState({...state, showPopup: state.spinner === true ? true: false }) }
  const showExportConfirmModal = () => {
    return (
      <Modal size={'lg'} show={state.showPopup} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton style={{paddingLeft: '30%'}}>
          <Modal.Title> Export V1 document </Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <p> Do you want to export {state.filterRows.length === state.rows.length ? 'all' : 'filtered'} V1 documents </p>
      </Modal.Body>
      <Modal.Footer>
        <p className={`${styles['popup-back-btn']}`} onClick={handleClose}> Cancel </p>
        <button className="btn btn-secondary" type="button" onClick={() => state.spinner === false ? handleDownload(state.filterRows, 1) : null}>
          <span className={state.spinner === true ? "spinner-border spinner-border-sm mx-2" : ''} role="status" aria-hidden="true"></span>
          {state.spinner === true ? 'Exporting...' : 'Export'}
        </button>
      </Modal.Footer>
    </Modal>
    )
  }


  if(!state.loaded) {
    return <> Loading... </>
  }

  const searchTextField = (key, placeholder) => {
    return(
        <div className='col-md-3' >
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

  const onSelect = (e, key) => {
    setState({...state, [key]: Number(e.value)})
  }

  const searchSelectField = (key, options, placeholder) => {
    return (
      <MultiSelectField
        options={options}
        standards={options.filter(val => val.value === state[key])}
        handleChange={(e) => onSelect(e, key)}
        isMulti={false}
        customStyle={{ menuPortal: base => ({ ...base, zIndex: 9999 }), paddingLeft: placeholder === 'Select period' ? '' : '' }}
        className={`${styles['v1-multiselect']} col-md-3 my-2 select_option_v1_doc`}
        classNamePrefix={`${styles['v1-multiselect']}`}
        placeholder={placeholder}
      />
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
         {searchTextField('employeeSearchTerm', 'employee')}
       {searchTextField('companySearchTerm', 'company')}
       {searchSelectField('functionSearchTerm', state.functions, 'Select function')}
       {searchSelectField('periodSearchTerm', state.period, 'Select period')}
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
            {state.currentItems.map(eachRow => <tr key={eachRow.id} id={eachRow.id}>
              <td> {getEntityName(eachRow)}  </td>
              <td> {eachRow.company_name} </td>
              <td> {eachRow.employee_name} </td>
              <td> {eachRow.function_name} </td>
              <td> {formatDate(eachRow.date_of_sign) || '-'} </td>
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
     <div className='row justify-content-end'>
     <div className="col-md-1">
        <button
          type="button"
          className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
          onClick={() => setState({...state, showPopup: true})}
        >
          Export
        </button>
    </div>
     </div>
     <div className='row'>
       <div className='col-md-12'>
       <button onClick={() => window.open(process.env.NEXT_PUBLIC_APP_URL_DRUPAL, '_self')} type="button" className="btn text-decoration-underline text-uppercase poppins-light-18px shadow-none px-0">
        {`Back`}
      </button>
       </div>
     </div>
    </div>
    {showExportConfirmModal()}
    </div>
  );
}

export default React.memo(V1DocumentsOverview)
