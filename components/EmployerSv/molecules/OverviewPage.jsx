import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './EmployerSv.module.css';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import { downloadSvAsPdf} from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import sign_icon from '../molecules/images/cooperation_agreement.svg';
import pdf_icon from '../molecules/images/Pdf.svg';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Translation from '@/Translation';
const itemsPerPage = 6;
const OverviewPage = (props) => {
  const { t } = props;
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
      <div className='row position-sticky-co-op'>
        <div className='col-md-12'>
        <ul className={`${styles['employer-overview-tabs']}`}>
        <li className='manage-cooperation-tabs'> <span id = {1} className={`${selectedTabId === 1 ? styles['underline'] : ''}`} onClick={handleTabClick}> {t('All')}      </span> </li>
        <li className='manage-cooperation-tabs'> <span id = {2} className={`${selectedTabId === 2 ? styles['underline'] : ''}`} onClick={handleTabClick}> {t('Pending')}  </span> </li>
        <li className='manage-cooperation-tabs'> <span id = {3} className={`${selectedTabId === 3 ? styles['underline'] : ''}`} onClick={handleTabClick}> {t('Signed')}   </span> </li>
      </ul>
        </div>
      </div>
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
     <div className='row manage_agreement_position_sticky'>
     <div className='col-md-12 search_field_manage_cooperation_agreement mb-2' style={{position: 'relative' }}>
           <div className='row'>
           <div className='col-md-9'>
              <input
                type="text"
                className='form-control mt-2 mb-2 rounded-0 shadow-none'
                style={{margin: '10px 0'}}
                value={compState.searchTermCompany}
                name = {'employer_name'}
                onChange={(e) => setCompState({...compState, searchTermCompany: e.target.value})}
                onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                placeholder={t('Search employer ')}
              />
            </div>
            <div className='col-md-3'>
              <div className='row'>
                <div className='col-md-6'>
                <button
                type="button"
                className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
                onClick={() => handleSearchClick(1)}
              >
                {t('SEARCH')}
              </button>

                </div>
                <div className='col-md-6'>
                <button
                type="button"
                className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
                onClick={() => handleSearchClick(0)}
              >
                {t('RESET')}
              </button>
                </div>
              </div>
            </div>
           </div>
         </div>
     </div>
        <div className={`${styles['table-parent-div']} min_height_todo`}>
          <table className="table table-hover manage-types-table manage-cooperation-agreement-table-header">
            <thead className="table-render-thead">
              <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
            </thead>
            {currentItems && currentItems.length > 0 ?
            <tbody>
              {currentItems.map(eachRow => {
                return (
                  <tr key={eachRow.company_id}>
                      <td className='ps-4'> {eachRow.company_name} </td>
                      <td> {formatDate(eachRow.date_of_request)} </td>
                      <td> {formatDate(eachRow.date_of_commencement) || '--'} </td>
                      <td> <span className={`${styles['signed-class']} ${Number(eachRow.signed) ? styles['sv-signed'] : styles['sv-pending']}`}> </span> </td>
                      <td> {getNeededActions(eachRow) } </td>
                  </tr>
                );
              })}
            </tbody>
            : <tbody>
            <tr>
            <td colSpan={8} className="text-center poppins-regular-18px no-records">
                    {t('No records')}
                  </td>
            </tr>
            </tbody>}
          </table>
        </div>
        <div>
        {filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel={<AiOutlineArrowLeft />}
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
          onClick={() => handleEmployerSign(epa_id, company_id, agent.root_parent_id)}> <img src={sign_icon.src} alt="sign" className='action_icon_size'></img></span>
        : null}
        {agent.approved ? <span title={'Download'} className="span-action-icons" onClick={() => handleDownload(eachRow)}> <img src={pdf_icon.src} alt="sign" className='sign_action_icon_size_pdf'></img> </span>:null}
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
      <p style={{marginTop: '20px', textAlign: 'center'}}> {t(`We notice that you do not have any cooperation agreement for your company/companies,`)} <br />
	      {t(`please click on "Request agreement" button to request for an agreement.`)} </p>}

     </div>
  );
}

export default React.memo(Translation(OverviewPage,['All','Pending','Signed','Search employer ','SEARCH','RESET','No records',`We notice that you do not have any cooperation agreement for your company/companies`,`please click on "Request agreement" button to request for an agreement.`]));
