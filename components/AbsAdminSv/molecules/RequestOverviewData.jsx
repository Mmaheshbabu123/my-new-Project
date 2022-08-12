import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import {MdEdit, MdDelete } from 'react-icons/md';
import {  AiOutlineUserAdd, AiOutlineUserSwitch, AiOutlineDownload } from 'react-icons/ai';
import { deleteCooperationAgreement, downloadSvAsPdf } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import SalesAgentPopUpComponent from './SalesAgentPopUpComponent.jsx';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import styles from './AbsAdminSv.module.css';

const itemsPerPage = 5;
const RequestOverviewData = (props) => {
  const router = useRouter();
  const { overviewData, salesAgentArray, assignedData } = props;

  /**
   * [getSelectedStatus description]
   * @param  {int}    selectedTabId               [description]
   * @return {array}              [description]
   */
  const getSelectedStatus = (statusIds = [1, 0]) => {
    return overviewData.filter(val => statusIds.includes(Number(val.signed)));
  }

  const [state, setState] = useState({
      headers: ['Employer name', 'Email', 'Company', 'Date of request', 'Date of commencement', 'Status', 'Actions'],
      filterRows: getSelectedStatus(),
      searchTermCompany: '',
      searchTermEmployer: '',
      currentItems: [],
      status: [1, 0],
      salesAgentArray: salesAgentArray,
      showPopup: false,
      selectedSalesAgent: 0,
      warning: false,
      reassign: false,
      pageCount: 0,
      itemOffset: 0,
      currentPage: 0,
      selectedTabId: 1,
      savedAgentId: 0,
      bbrightId: 0,
  })

  const handleTabClick = ({ target: { id } }) => {
    let selectedTabId = Number(id);
    let status = selectedTabId === 1 ? [1, 0] : selectedTabId === 2 ? [0] : [1];
    let filterRows = getSelectedStatus(status);
    setState({...state, selectedTabId, filterRows, status,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)});
  }

  const showTabs = () => {
    let { selectedTabId } = state;
    return (
      <ul className={`${styles['employer-overview-tabs']}`}>
        <li> <span id = {1} className={`${selectedTabId === 1 ? styles['underline'] : ''}`} onClick={handleTabClick}> All      </span> </li>
        <li> <span id = {2} className={`${selectedTabId === 2 ? styles['underline'] : ''}`} onClick={handleTabClick}> Pending  </span> </li>
        <li> <span id = {3} className={`${selectedTabId === 3 ? styles['underline'] : ''}`} onClick={handleTabClick}> Signed   </span> </li>
      </ul>
    );
  }


  const handleSearchClick = (search = 1) => {
    let filterRows = [];
    let { selectedTabId, searchTermEmployer = '', searchTermCompany = '' } = state;
    let status = selectedTabId === 1 ? [1, 0] : selectedTabId === 2 ? [0] : [1];
    let data = getSelectedStatus(status);
    if(search && (searchTermEmployer || searchTermCompany)) {
      filterRows = data.filter((item) => {
        let status = true;
        if(searchTermEmployer)
          status = `${item['employer_name']}`.toLowerCase().toString().indexOf(searchTermEmployer.toLowerCase().toString()) !== -1;
        if(status && searchTermCompany)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(searchTermCompany.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = data;
      searchTermEmployer = '';
      searchTermCompany = '';
    }
    setState({ ...state,
      searchTermEmployer: searchTermEmployer,
      searchTermCompany: searchTermCompany,
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

  const showOverviewOfCompanies = () => {
    const { headers, currentItems, filterRows, pageCount,  currentPage} = state;
    return(
      <>
        {<div className='col-md-12 row' style={{ margin: '10px 0', position: 'relative' }}>
              <div className='col-md-9 row'>
                <input
                  type="text"
                  className='form-control mt-2 mb-2 w-auto'
                  style={{margin: '10px 0'}}
                  value={state.searchTermEmployer}
                  name = {'employer_name'}
                  onChange={(e) => setState({...state, searchTermEmployer: e.target.value,searchColumn:'employer_name'})}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                  placeholder={'Search employer '}
                />
                <input
                  type="text"
                  className='form-control mt-2 mb-2 mx-2 w-auto'
                  style={{margin: '10px 0'}}
                  name = {'company_name'}
                  value={state.searchTermCompany}
                  onChange={(e) => setState({...state, searchTermCompany: e.target.value,searchColumn:'company_name'})}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                  placeholder={'Search company '}
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
           </div>}
        <div className={`${styles['table-parent-div']}`}>
          <table className="table table-hover manage-types-table">
            <thead className="table-render-thead">
              <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
            </thead>
            {currentItems && currentItems.length > 0 ?
            <tbody>
              {currentItems.map((eachRow, index) => {
                return (
                  <tr key={index}>
                      <td> {eachRow.employer_name} </td>
                      <td> {eachRow.employer_mail} </td>
                      <td> {eachRow.company_name} </td>
                      <td> {formatDate(eachRow.date_of_request)} </td>
                      <td> {formatDate(eachRow.date_of_commencement) || '--'} </td>
                      <td> <span className={`${styles['signed-class']} ${Number(eachRow.signed) ? styles['sv-signed'] : styles['sv-pending']}`}> </span> </td>
                      <td width='100'> {getNeededActions(eachRow) } </td>
                  </tr>
                );
              })}
            </tbody>
            : <p style={{paddingTop: '10px'}}> No records. </p>}
          </table>
        </div>
        <div>
        {filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />}
        {<SalesAgentPopUpComponent state={state} setState={setState}/>}
        </div>
      </>
    );
  }

  const getNeededActions = (eachRow) => {
    let salesObj = assignedOrNot(eachRow);
    let savedAgentId = salesObj.sales_agent_id || 0;
    if(Number(eachRow.signed)) {
      return(
        <div>
          <span title={'Edit'} className="span-action-icons" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>
          <span title={'Download'} className="span-action-icons" onClick={() => handleActionClick('download', eachRow)}> <AiOutlineDownload /> </span>
          <span title={'Delete'} className="span-action-icons" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
        </div>
      )
    } else {
      return (
        <div>
          {!savedAgentId ?
              <span title={'Assign'}  className={`span-action-icons`}  onClick={() => handleActionClick('assign', eachRow)}> <AiOutlineUserAdd /> </span>
            : !salesObj.approved ? <span title={'Re-assign'}  className={`span-action-icons`} onClick={() => handleActionClick('assign', eachRow)}> <AiOutlineUserSwitch /> </span> : null
          }
          {salesObj.approved ? <span title={'Edit'} className="span-action-icons" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>:null}
          <span title={'Delete'} className={`span-action-icons`} onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
        </div>
      )
    }
  }

  const handleActionClick = (action, eachRow) => {
    let stateObj = { ...state };
    switch (action) {
      case 'delete':
        confirmAlert({
          message: `Do you want to delete the request of cooperation agreement?`,
          buttons: [
            { label: 'No' },
            { label: 'Yes', onClick: () => handleDelete(eachRow) }
          ]
        });
        break;
     case 'edit':
        let salesObj = assignedData[eachRow['employer_id']][eachRow['company_id']]
        router.push(`cooperation-agreement?root_parent_id=${salesObj.root_parent_id}&selectedTabId=0&ref_id=${salesObj.sca_id}`);
        break;
     case 'download':
          handleDownload(eachRow);
        break;
     case 'assign':
         let savedAgentId = assignedOrNot(eachRow)
         savedAgentId = savedAgentId.sales_agent_id || 0;
         stateObj['showPopup'] = true;
         stateObj['selectedCompanyId'] = eachRow.company_id;
         stateObj['selectedEmployerId'] = eachRow.employer_id;
         stateObj['selectedSalesAgent'] = savedAgentId;
         stateObj['savedAgentId'] = savedAgentId;
       break;
      default:
    }
    setState(stateObj);
  }

  const handleDownload = async (eachRow) => {
    eachRow['type'] = 1;
    await APICALL.service(`${downloadSvAsPdf}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if(response.status === 200 && result.url) {
          var a = document.createElement("a");
          a.setAttribute("type", "file");
          a.href     = result.url;
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

  /**
   * [assignedOrNot description]
   * @param  {Object} eachRow               [description]
   * @return {int}         [description]
   */
  const assignedOrNot = (eachRow) =>
  assignedData[eachRow.employer_id] ? assignedData[eachRow.employer_id][eachRow.company_id] ?  assignedData[eachRow.employer_id][eachRow.company_id] : { } : { };

  /**
   * [handleDelete description]
   * @param  {[type]}  eachRow               [description]
   * @return {Promise}         [description]
   */
  const handleDelete = async (eachRow) => {
    await APICALL.service(`${deleteCooperationAgreement}`, 'POST', { company_id: eachRow.company_id, employer_id: eachRow.employer_id })
    .then(response => {
      if(response.status === 200) {
        router.reload()
      }
    }).catch(error => console.error(error))
  }


  return(
    <div className={`${styles['emp-sv-overview-page-div']}`}>
        <div>
          {showTabs()}
          {showOverviewOfCompanies()}
        </div>
     </div>
  );
}

export default React.memo(RequestOverviewData)
