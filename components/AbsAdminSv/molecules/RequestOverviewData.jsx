import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import {MdEdit, MdDelete } from 'react-icons/md';
import { AiFillFilePdf, AiOutlineUserAdd, AiOutlineUserSwitch } from 'react-icons/ai';
import { deleteCooperationAgreement, downloadSvAsPdf } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import SalesAgentPopUpComponent from './SalesAgentPopUpComponent.jsx';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import styles from './AbsAdminSv.module.css';
import SearchIcon from '../../SearchIcon';

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
      searchKey: 'company_name',
      currentItems: [],
      status: [1, 0],
      searchTerm: '',
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


  const handleSearchClick = (e) => {
    let value = state.searchTerm;
    let name = state.searchColumn;
    let filterRows = overviewData.filter((item) => {
      let rowVal = item[name];
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
        {<div className='row' style={{ margin: '10px 0', position: 'relative' }}>
              <div className="col-sm-3 px-0">
                  <input
                    type="text"
                    className='form-control mt-2 mb-2'
                    style={{margin: '10px 0'}}
                    name = {'employer_name'}
                    onChange={(e) => setState({...state, searchTerm: e.target.value,searchColumn:'employer_name'})}
                    onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(e): null}
                    placeholder={'Search employer '}
                  />
                    <span className="searchIconCss svadmin_icon"> <SearchIcon handleSearchClick={(e)=>handleSearchClick(e)} /></span>
                </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  className='form-control mt-2 mb-2'
                  style={{margin: '10px 0'}}
                  name = {'company_name'}
                  onChange={(e) => setState({...state, searchTerm: e.target.value,searchColumn:'company_name'})}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(e): null}
                  placeholder={'Search company '}
                  />
                 <span className="searchIconCss svadmin_icon2"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
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
            : <p style={{paddingTop: '10px'}}> No data found. </p>}
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
          <span title={'PDF'} className="span-action-icons" onClick={() => handleActionClick('download', eachRow)}> <AiFillFilePdf /> </span>
          <span title={'Delete'} className="span-action-icons" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
        </div>
      )
    } else {
      return (
        <div>
          {!savedAgentId ?
              <span title={'Assign'}  className={`span-action-icons`}  onClick={() => handleActionClick('assign', eachRow)}> <AiOutlineUserAdd /> </span>
            : !salesObj.approved ? <span title={'Re-assign'}  className={`span-action-icons`} onClick={() => handleActionClick('assign', eachRow)}> <AiOutlineUserSwitch /> </span> : null
          }   <span title={'Delete'} className={`span-action-icons`} onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
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
        console.log('Edit');
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
