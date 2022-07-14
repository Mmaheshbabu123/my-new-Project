import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import SearchIcon from '../../SearchIcon';
import {MdEdit, MdDelete, MdOutlineAddTask} from 'react-icons/md';
import { AiFillFilePdf, AiOutlineRedo } from 'react-icons/ai';
import SalesAgentPopUpComponent from './SalesAgentPopUpComponent.jsx';
import styles from './AbsAdminSv.module.css';

const itemsPerPage = 5;
const RequestOverviewData = (props) => {
  const { overviewData, salesAgentArray } = props;

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
      pageCount: 0,
      itemOffset: 0,
      currentPage: 0,
      selectedTabId: 1
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


  const handleSearchClick = () => {
    let value = state.searchTerm;
    let filterRows = overviewData.filter((item) => {
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
        {/*<div className='row' style={{ margin: '10px 0', position: 'relative' }}>
          <span className="searchIconCss"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
          <input
            type="text"
            className="form-control col-7 pcp_name"
            style={{margin: '10px 0'}}
            onChange={(e) => setState({...state, searchTerm: e.target.value})}
            placeholder={'Search'}
          />
        </div>*/}
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
                      <td> {eachRow.employer_email} </td>
                      <td> {eachRow.company_name} </td>
                      <td> {eachRow.date_of_request} </td>
                      <td> {eachRow.date_of_commencement} </td>
                      <td> <span className={`${styles['signed-class']} ${Number(eachRow.signed) ? styles['sv-signed'] : styles['sv-pending']}`}> </span> </td>
                      <td> {getNeededActions(eachRow) } </td>
                  </tr>
                );
              })}
            </tbody>
            : <p style={{paddingTop: '10px'}}> No data found... </p>}
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
    if(Number(eachRow.signed)) {
      return(
        <div>
          <span title={'Edit'} className="actions-span text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>
          <span title={'Download'} className="actions-span text-dark" onClick={() => handleActionClick('download', eachRow)}> <AiFillFilePdf /> </span>
          <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
        </div>
      )
    } else {
      return (
        <div>
          {!eachRow.assignedTo ?
              <span title={'Assign'} className="actions-span text-dark" onClick={() => handleActionClick('assign', eachRow)}> <MdOutlineAddTask /> </span>
            : <><span title={'Re-assign'} className="actions-span text-dark" onClick={() => handleActionClick('reassign', eachRow)}> <AiOutlineRedo /> </span>
                <span> {`Assigned to: ${eachRow.assignedTo ? eachRow.assignedTo:''}`} </span> </>
          }
          <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', eachRow)}> <MdDelete/> </span>
        </div>
      )
    }
  }

  const handleActionClick = (action, eachRow) => {
    let stateObj = { ...state };
    switch (action) {
      case 'delete':
        confirmAlert({
          message: `Do you want to delete the cooperation agreement?`,
          buttons: [
            { label: 'No' },
            { label: 'Yes', onClick: () => deleteCooperationAgreement(eachRow) }
          ]
        });
        break;
     case 'edit':
        console.log('Edit');
        break;
     case 'download':
          console.log('Download clicked');
        break;
     case 'assign':
           stateObj['showPopup'] = true;
           stateObj['selectedCompanyId'] = eachRow.company_id;
           stateObj['selectedEmployerId'] = eachRow.employer_id;
           stateObj['selectedSalesAgent'] = 0;
       break;
     case 'reassign':
          console.log('reassign clicked');
       break;
      default:
    }
    setState(stateObj);
  }

  const deleteCooperationAgreement = (eachRow) => {

  }


  return(
    <div className={`${styles['emp-sv-overview-page-div']}`}>
      {overviewData.length > 0 ? (
        <div>
          {showTabs()}
          {showOverviewOfCompanies()}
        </div>
        )
        :
      <pre> There is no cooperation agreement request. </pre>}

     </div>
  );
}

export default React.memo(RequestOverviewData)
