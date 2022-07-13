import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SearchIcon from '../../SearchIcon';
import styles from './EmployerSv.module.css';

const itemsPerPage = 6;
const OverviewPage = (props) => {
  const { state: {  overviewData } } = props;

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
      searchKey: 'company_name',
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


  const handleSearchClick = () => {
    let value = compState.searchTerm;
    let filterRows = overviewData.filter((item) => {
      return (item[compState.searchKey].toLowerCase().toString())
        .indexOf(value.toLowerCase().toString()) !== -1;
    })
    setCompState({ ...compState,
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
        <div className='row' style={{ margin: '10px 0', position: 'relative' }}>
          <span className="searchIconCss"> <SearchIcon handleSearchClick={handleSearchClick} /></span>
          <input
            type="text"
            className="form-control col-7 pcp_name"
            style={{margin: '10px 0'}}
            onChange={(e) => setCompState({...compState, searchTerm: e.target.value})}
            placeholder={'Search'}
          />
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
        </div>
      </>
    );
  }

  const getNeededActions = (eachRow) => {
    return (
      <>
      -
      </>
    )
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
      <pre> We notice that you do not have any cooperation agreement for your company/companies,
                please click on "Request agreement" button to request for an agreement </pre>}

     </div>
  );
}

export default React.memo(OverviewPage)
