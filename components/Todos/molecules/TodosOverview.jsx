import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { HiOutlineExternalLink, } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import { CgMailOpen } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDownload } from 'react-icons/ai';
import {MdEdit } from 'react-icons/md';
import { FaFileSignature } from 'react-icons/fa';
import styles from './Todos.module.css';
import { getMyTodos } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import customAlert from '@/atoms/customAlert';

const itemsPerPage = 6;

const TodosOverview = ({ props, entityId, entityType }) => {
  const { todos = [], } = props;
  /**
   * [getSelectedStatus description]
   * @param  {int}    selectedTabId               [description]
   * @return {array}              [description]
   */
  const getSelectedStatus = (statusIds = [0]) => {
    return todos.filter(val => statusIds.includes(Number(val.todo_status)));
  }

  const [state, setState] = useState({
    selectedTabId: 1,
    headers: ['Todo', 'Status', 'Actions'],
    tabs: [{
      id: 1,
      name: "Open",
      icon: HiOutlineExternalLink
    }, {
      id: 2,
      name: "Done",
      icon: MdDone
    }, {
      id: 3,
      name: "All",
      icon: CgMailOpen
    }],
    rows: getSelectedStatus(),
    filterRows: getSelectedStatus(),
    searchKey: 'name',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
  });


  const handleSearchClick = (search = 1) => {
    // let value = search ? state.searchTermCompany : '';
    // let status = state.selectedTabId === 1 ? [1, 0] : state.selectedTabId === 2 ? [0] : [1];
    // let data = getSelectedStatus(status);
    // let filterRows = [];
    // if(value) {
    //   filterRows = data.filter((item) => {
    //     return (item['company_name'].toLowerCase().toString())
    //       .indexOf(value.toLowerCase().toString()) !== -1;
    //   })
    // } else {
    //   filterRows = data;
    // }
    // setState({ ...state,
    //   searchTermCompany: value,
    //   filterRows: filterRows,
    //   currentPage: 0,
    //   itemOffset: 0,
    //   ...updatePaginationData(filterRows, 0)
    // });
  }


  //------------------- Pagination code -------------------------//
  //-------------------
  useEffect(() => {
    setState({ ...state, ...updatePaginationData(state.filterRows, state.itemOffset || 0) })
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
    setState({ ...state, itemOffset: newOffset, currentPage: event.selected });
  };
  //------------------- Pagination code -------------------------//
  //-------------------


  const getNeededActions = (eachRow) => {
    return <>
      {eachRow.todo_type === 3 ? <>
        <span title={'Accept'} className={styles["span-action-icons"]} onClick={() => handleActionClick('accept', eachRow)}> <MdDone /> </span>
        <span title={'Reject'} className={styles["span-action-icons"]} onClick={() => handleActionClick('reject', eachRow)}> <AiOutlineClose /> </span>
      </>: eachRow.todo_type === 2 ? <>
        <span title={'Edit'}     className={styles["span-action-icons"]} onClick={() => handleActionClick('edit', eachRow)}> <MdEdit /> </span>
        <span title={'Sign'}     className={styles["span-action-icons"]} onClick={() => handleActionClick('sign', eachRow)}> <FaFileSignature /> </span>
        <span title={'Download'} className={styles["span-action-icons"]} onClick={() => handleActionClick('download', eachRow)}> <AiOutlineDownload /> </span>
      </>
      : <span title={'Sign'} className={styles["span-action-icons"]} onClick={() => handleActionClick('sign', eachRow)}> <FaFileSignature /> </span>
    }
    </>
  }

  const handleActionClick = (type, eachRow) => {
    if(type === 'accept' || type === 'reject') {
      let accept, reject;
      let linkArray = eachRow.uri.length ? eachRow.uri.split(',') : [];
      if(linkArray.length) {
        accept = eachRow.baseUrl + linkArray[0];
        reject = eachRow.baseUrl + linkArray[1];
      } else {
        reject = accept = 'javascript:void(0)';
      }
      eachRow['accept'] = accept;
      eachRow['reject'] = reject;
      showAlert(type, eachRow)
    }
    if(eachRow.todo_type === 2) {
      let { webform_id, submit_id, tid } = eachRow;
      let path;
      if(type === 'edit')
         path = `admin/structure/webform/manage/${webform_id}/submission/${submit_id}/edit?type=optout`;
      if(type === 'sign')
         path = `werkpostfichespdf/form/werkpostfiche_preview/${webform_id}/${submit_id}/${tid}/${entityId}?type=${entityType === 2 ? 'employer' : 'employee'}`
      if(type === 'download')
         path = entityType === 2 ? `werkpostfichespdf/pdf/${webform_id}/${submit_id}/${entityId}type=employeer&signed`
                                 : `werkpostfichespdf/pdf/${webform_id}/${submit_id}/${entityId}?signed=0&type=employee`;
      window.open(eachRow.baseUrl  + path, '_self');
    }
    if(eachRow.todo_type === 1 && type === 'sign') {
      window.open(eachRow.uri, '_self');
    }
  }

  const showAlert = (action, obj) => {
    confirmAlert({
      message: `Do you want to ${action} the invitation?`,
      buttons: [
        { label: 'No' },
        { label: 'Yes', onClick: () => window.open(obj[action], '_self') }
      ]
    })
  }

  const handleTabClick = (id) => {
    let selectedTabId = Number(id);
    let status = selectedTabId === 1 ? [0] : selectedTabId === 2 ? [1] : [0, 1];
    let filterRows = getSelectedStatus(status);
    setState({
      ...state, selectedTabId, filterRows, status,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  const showTabs = () => {
    let { selectedTabId } = state;
    return (
      <ul className={`${styles['todo-tabs']} col-md-8`}>
        {state.tabs.map(tab => {
          let Icon = tab.icon;
          return (
            <li key={tab.id}>
              <div className={`w-50 py-2 text-center ${styles['cursor-pointer']} ${selectedTabId === tab.id ? styles['underline'] : ''}`} onClick={() => handleTabClick(tab.id)}>
                <span id={tab.id} className={`${styles['todo-icon']}`}>  <Icon /> </span>
                <span className="d-block my-1"> {tab.name} </span>
              </div>
            </li>
          )
        })}
      </ul>
    );
  }

  return (
    <div>
      <>
        <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`My Todos`} </h4>
        <div className="my-4">  {showTabs()} </div>
        <div className='row searchbox m-0 my-4' style={{ margin: '10px 0', position: 'relative' }}>
          <div className='col-md-12 row pe-0'>
            <div className='col-md-8 col-lg-9 p-0'>
              <input
                type="text"
                value={state.searchTerm}
                className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
                onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
                placeholder={'Search'}
                onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1) : null}
              />
            </div>
            <div className='col-md-4 col-lg-3 pe-0'>
              <div className='row justify-content-end'>
                <div className='col-md-6 col-lg-6'>
                  <button
                    type="button"
                    className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
                    onClick={() => handleSearchClick(1)}>
                    SEARCH
                  </button>
                </div>
                <div className='col-md-6 col-lg-6 pe-0'>
                  <button
                    type="button"
                    // className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn  w-100 shadow-none"
                    className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
                    onClick={() => handleSearchClick(0)}>
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-render-parent-div">
          <table className="table table-hover manage-types-table table  mb-3 text-start">
            <thead className="table-render-thead bg_grey">
              <tr className='table-sticky-bg-gray poppins-medium-18px border-0' key={'header-row-tr'}>{state.headers.map((eachHeader, index) => <th className='' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
              <tbody className='table-body-employee-type poppins-light-18px'>
                {state.currentItems.map(eachRow =>
                  <tr key={eachRow.tid} id={eachRow.tid}>
                    <td className='text-start px-5 py-1'> {eachRow.title} </td>
                    <td> <span className={`${styles['status-icon']} ${Number(eachRow.todo_status) ? styles['status-done'] : styles['status-open']}`}> </span> </td>
                    <td className=''>{eachRow.todo_status !== 1 ? getNeededActions(eachRow) : null} </td>
                  </tr>)}
              </tbody>
              : <p style={{ paddingTop: '10px' }}> No records </p>}
          </table>
        </div>
        <div>
          {state.filterRows.length > itemsPerPage && <div className='pgnation col-md-3 my-5 m-auto'><ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel={<AiOutlineArrowLeft />}
            renderOnZeroPageCount={null}
            containerClassName={"pagination justify-content-center project-pagination align-items-center"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          /></div>}
          <button onClick={() => router.push('/')} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-3 mb-5 px-0 text-decoration-underline">
            {`Back`}
          </button>
        </div>
      </>
    </div>
  );
}

export default React.memo(TodosOverview);
