import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './AbsSalesAgentSv.module.css';
import { AiFillFilePdf } from 'react-icons/ai';
import {MdEdit } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { HiPlusCircle} from 'react-icons/hi';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { deleteSalesAgenetAgreements, downloadSvAsPdf} from '@/Services/ApiEndPoints'
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { formatDate } from '../../SalaryBenefits/SalaryBenefitsHelpers';
import pdf_icon from '../molecules/images/Pdf.svg';
import add_icon from '../molecules/images/Add.svg';
import Translation from '@/Translation';
const itemsPerPage = 5;
const Overviewpage = (props) => {
  const {t} = props;
  const { overviewData } = props;
  const router = useRouter();

  /**
   * [getSelectedStatus description]
   * @param  {int}    selectedTabId               [description]
   * @return {array}              [description]
   */
  const getSelectedStatus = (statusIds = [1, 0]) => {
    return overviewData.filter(val => statusIds.includes(Number(val.signed)));
  }

  const [state, setState] = useState({
      headers: ['Employer name',  'Company', 'Date of request', 'Start date of cooperation agreement', 'Status', 'Actions'],
      filterRows: getSelectedStatus(),
      searchTermCompany: '',
      searchTermEmployer: '',
      currentItems: [],
      status: [1, 0],
      searchTerm: '',
      searchColumn:'',
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
    let filterRows = [];
    let { searchTermEmployer = '', searchTermCompany = '', selectedTabId } = state;
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
        {<div className='row manage_cooperation_agreement_position_sticky'>
        <div className='col-md-12 search_field_manage_cooperation_agreement mb-2' style={{  position: 'relative' }}>
              <div className='row'>
              <div className='col-md-9'>
                <div className='row'>
                  <div className='col-md-6'>
                   <input
                  type="text"
                  className='form-control mt-2 mb-2 rounded-0 shadow-none'
                  style={{margin: '10px 0'}}
                  value={state.searchTermEmployer}
                  name = {'employer_name'}
                  onChange={(e) => setState({...state, searchTermEmployer: e.target.value,searchColumn:'employer_name'})}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                  placeholder={t('Search employer ')}
                />
                
                  </div>
                  <div className='col-md-6'>
                  <input
                  type="text"
                  className='form-control mt-2 mb-2 rounded-0 shadow-none'
                  style={{margin: '10px 0'}}
                  name = {'company_name'}
                  value={state.searchTermCompany}
                  onChange={(e) => setState({...state, searchTermCompany: e.target.value,searchColumn:'company_name'})}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                  placeholder={t('Search company ')}
                  />
                  </div>
                </div>
              </div>
               <div className='col-md-3'>
                <div className='row'>
                  <div className='col-md-6'>
                  <button
                  type="button"
                  className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2  skyblue-bg-color w-100 shadow-none"
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
             
           </div></div>}
        <div className={`${styles['table-parent-div']} min_height_cooperation_sales`}>
          <table className="table table-hover manage-types-table manage-cooperation-agreement-table-header">
            <thead className="table-render-thead">
              <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
            </thead>
            {currentItems && currentItems.length > 0 ?
            <tbody>
              {currentItems.map((eachRow, index) => {
                return (
                  <tr key={index}>
                      <td className='ps-4'> {eachRow.employer_name} </td>

                      <td> {eachRow.company_name} </td>
                      <td> {formatDate(eachRow.date_of_request ? Number(eachRow.date_of_request) * 1000 : '') || '-'} </td>
                      <td> {formatDate(eachRow.startdate_agreement ? Number(eachRow.startdate_agreement) * 1000 : '') || '-'} </td>
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
        	<div className="row my-2">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="bg-white border-0 poppins-regular-18px  float-sm-right mt-3 md-5 px-0 text-decoration-underline text-uppercase"
							onClick={() =>router.back()}
						>
							{t('BACK')}
						</button>
					</div>
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

  const getNeededActions = (eachRow) => {
    if(Number(eachRow.root_parent_id) !== 0) {
      return(
        <div>
          <span title={'Edit'} className="actions-span text-dark" onClick={() => handleActionClick('edit', eachRow)}> <MdEdit className='color-skyblue' /> </span>
          {eachRow.signed ? <span title={'Download'} className="span-action-icons" onClick={() => handleActionClick('download', eachRow)}> <img src={pdf_icon.src} alt="sign" className='sign_action_icon_size_pdf'></img> </span> : null}
        </div>
      )
    } else {
      return (
        <div>
          <span title = {'Add'} className="actions-span text-dark" onClick={() => handleActionClick('add', eachRow)}>  <img src={add_icon.src} alt="sign" className='sign_action_icon_size_add'></img> </span>
        </div>
      )
    }
  }

  const handleActionClick = (action, eachRow) => {
    var ref_id = eachRow.ref_id;
    var root_parent_id = eachRow.root_parent_id;
    switch (action) {
      case 'delete':
        confirmAlert({
          message: `Do you want to delete the cooperation agreement?`,
          buttons: [
            { label: 'No' },
            { label: 'Yes', onClick: () => handleDelete(ref_id) }
          ]
        });
        break;
     case 'edit':
        window.open(`cooperation-agreement?root_parent_id=${root_parent_id}&selectedTabId=0&ref_id=${ref_id}`, '_blank');
        break;
     case 'download':
          handleDownload(eachRow)
        break;
      case 'add':
       window.open(`cooperation-agreement?root_parent_id=0&selectedTabId=0&ref_id=${ref_id}`, '_blank');
       break;
      default:
    }
  }

  const handleDownload = async (eachRow) => {
    eachRow['type'] = 4;
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

  const handleDelete = async (id) => {
    await APICALL.service(`${deleteSalesAgenetAgreements}/${id}`, 'DELETE')
      .then((result) => router.reload())
      .catch((error) => window.alert('Error occurred'));
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

export default React.memo(Translation(Overviewpage,['All','Pending','Signed','Search employer ','Search company ','SEARCH','RESET','No records','BACK']));
