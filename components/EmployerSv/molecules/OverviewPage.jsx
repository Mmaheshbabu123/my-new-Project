import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { AiFillFilePdf, AiOutlineDownload } from 'react-icons/ai';
import { FaFileSignature } from 'react-icons/fa';
import styles from './EmployerSv.module.css';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import { downloadSvAsPdf} from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';

const itemsPerPage = 6;
const OverviewPage = (props) => {
  const { state: {  overviewData, salesAgentUpdates } } = props;

  /**
   * [getSelectedStatus description]
   * @param  {int}    selectedTabId               [description]
   * @return {array}              [description]
   */
  const getSelectedStatus = (statusIds = [1, 0]) => {
    return overviewData.filter(val => statusIds.includes(Number(val.signed)));
  }

  const [compState, setCompState] = useState({
      headers: ['Company', 'Date of request', 'Date of commencement', 'Status', 'Actions'],
      filterRows: getSelectedStatus(),
      searchTermCompany: '',
      currentItems: [],
      searchTerm: '',
      pageCount: 0,
      itemOffset: 0,
      currentPage: 0,
      selectedTabId: 1
  })

  const handleTabClick = ({ target: { id } }) => {
    let selectedTabId = Number(id);
    let status = selectedTabId === 1 ? [1, 0] : selectedTabId === 2 ? [0] : [1];
    let filterRows = getSelectedStatus(status);
    setCompState({...compState, selectedTabId, filterRows, status,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)});
  }

  const showTabs = () => {
    let { selectedTabId } = compState;
    return (
      <ul className={`${styles['employer-overview-tabs']}`}>
        <li> <span id = {1} className={`${selectedTabId === 1 ? styles['underline'] : ''}`} onClick={handleTabClick}> All      </span> </li>
        <li> <span id = {2} className={`${selectedTabId === 2 ? styles['underline'] : ''}`} onClick={handleTabClick}> Pending  </span> </li>
        <li> <span id = {3} className={`${selectedTabId === 3 ? styles['underline'] : ''}`} onClick={handleTabClick}> Signed   </span> </li>
      </ul>
    );
  }


  const handleSearchClick = (search = 1) => {
    let value = search ? compState.searchTermCompany : '';
    let status = compState.selectedTabId === 1 ? [1, 0] : compState.selectedTabId === 2 ? [0] : [1];
    let data = getSelectedStatus(status);
    let filterRows = [];
    if(value) {
      filterRows = data.filter((item) => {
        return (item['company_name'].toLowerCase().toString())
          .indexOf(value.toLowerCase().toString()) !== -1;
      })
    } else {
      filterRows = data;
    }
    setCompState({ ...compState,
      searchTermCompany: value,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }


  //------------------- Pagination code -------------------------//
  //-------------------
     useEffect(() => {
       setCompState({...compState, ...updatePaginationData(compState.filterRows, compState.itemOffset || 0)})
     }, [compState.itemOffset]);

     const updatePaginationData = (filterRows, offset) => {
       let items = [...filterRows];
       const endOffset = offset + itemsPerPage;
       return {
         currentItems: items.slice(offset, endOffset),
         pageCount: Math.ceil(items.length / itemsPerPage)
       };
     }

     const handlePageClick = (event) => {
       let items = [...compState.filterRows];
       const newOffset = (event.selected * itemsPerPage) % items.length;
       setCompState({...compState, itemOffset: newOffset, currentPage: event.selected});
     };
  //------------------- Pagination code -------------------------//
  //-------------------

  const showOverviewOfCompanies = () => {
    const { headers, currentItems, filterRows, pageCount,  currentPage} = compState;
    return(
      <>
      <div className='col-md-12 row' style={{ margin: '10px 0', position: 'relative' }}>
            <div className='col-md-9 row'>
              <input
                type="text"
                className='form-control mt-2 mb-2'
                style={{margin: '10px 0'}}
                value={compState.searchTermCompany}
                name = {'employer_name'}
                onChange={(e) => setCompState({...compState, searchTermCompany: e.target.value})}
                onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                placeholder={'Search employer '}
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
        <div className={`${styles['table-parent-div']}`}>
          <table className="table table-hover manage-types-table">
            <thead className="table-render-thead">
              <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
            </thead>
            {currentItems && currentItems.length > 0 ?
            <tbody>
              {currentItems.map(eachRow => {
                return (
                  <tr key={eachRow.company_id}>
                      <td> {eachRow.company_name} </td>
                      <td> {formatDate(eachRow.date_of_request)} </td>
                      <td> {formatDate(eachRow.date_of_commencement) || '--'} </td>
                      <td> <span className={`${styles['signed-class']} ${Number(eachRow.signed) ? styles['sv-signed'] : styles['sv-pending']}`}> </span> </td>
                      <td> {getNeededActions(eachRow) } </td>
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
        </div>
      </>
    );
  }

  /**
   * [handleEmployerSign description]
   * @param  {int} employer_id                  [description]
   * @param  {int} company_id                   [description]
   * @param  {int} root_parent_id               [description]
   * @return {url}                [description]
   */
  const handleEmployerSign = (empRefId, company_id, root_parent_id, preview = 0) => {
    window.open(`/cooperation-agreement-preview?root_parent_id=${root_parent_id}&emp_ref=${empRefId}&type=2&preview=${preview}`, '_blank');
  }

  const getNeededActions = (eachRow) => {
    const { epa_id, employer_id, company_id } = eachRow;
    let agent = salesAgentUpdates[employer_id] && salesAgentUpdates[employer_id][company_id] ? salesAgentUpdates[employer_id][company_id] : {};
    let signed = Number(eachRow.signed);
    return (
      <>
        {!signed && agent.approved ? <span title={signed ? 'Download' : 'Sign'}
          className="span-action-icons"
          onClick={() => handleEmployerSign(epa_id, company_id, agent.root_parent_id)}> <FaFileSignature /> </span>
        : null}
        {agent.approved ? <span title={'Download'} className="span-action-icons" onClick={() => handleDownload(eachRow)}> <AiFillFilePdf /> </span>:null}
      </>
    )
  }

  const handleDownload = async (eachRow) => {
    eachRow['type'] = 2;
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

  return(
    <div className={`${styles['emp-sv-overview-page-div']}`}>
      {overviewData.length > 0 ? (
        <div>
          {showTabs()}
          {showOverviewOfCompanies()}
        </div>
        )
        :
      <p style={{marginTop: '20px', textAlign: 'center'}}> {`We notice that you do not have any cooperation agreement for your company/companies,`} <br />
	      {`please click on "Request agreement" button to request for an agreement.`} </p>}

     </div>
  );
}

export default React.memo(OverviewPage)
