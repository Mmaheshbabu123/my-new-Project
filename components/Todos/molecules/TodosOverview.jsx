import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { APICALL } from '@/Services/ApiServices';
import { updateEmployeesubmitDetails, downloadSvAsPdf } from '@/Services/ApiEndPoints';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import ValidateMessage from '@/atoms/validationError';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './Todos.module.css';
import sign_icon from '../molecules/images/cooperation_agreement.svg';
import open from '../molecules/images/Open.svg';
import done from '../molecules/images/Done.svg';
import all from '../molecules/images/All.svg';
import open_1 from '../molecules/images/Open_1.svg';
import done_1 from '../molecules/images/Done_1.svg';
import all_1 from '../molecules/images/All_1.svg';
import edit_svg from '../molecules/images/edit.svg';
import download_svg from '../molecules/images/download.svg';
import sign_icon_1 from '../molecules/images/cooperation_agreement_1.svg';

const itemsPerPage = 6;

const TodosOverview = ({ props, entityId, entityType, tabId }) => {
  const router = useRouter();
  const { todos = [], headers = [] } = props;
  const getSelectedStatus = (selectedTab = 1) => {
    let statusIds = selectedTab === 1 ? [0] : selectedTab === 2 ? [1] : selectedTab === 3 ? [0, 1] : [];
    return todos.filter(val => statusIds.includes(Number(val.todo_status)));
  }

  entityType === 3 ? headers.indexOf('Employee name') > -1 ? headers.splice(headers.indexOf('Employee name'), 1) : headers : [];
  const [state, setState] = useState({
    selectedTabId: tabId,
    tabs: [{
      id: 1,
      name: "Open",
      icon: open_1.src,
      activeIcon: open.src,
    }, {
      id: 2,
      name: "Done",
      icon: done_1.src,
      activeIcon: done.src
    }, {
      id: 3,
      name: "All",
      icon: all_1.src,
      activeIcon: all.src
    }],
    rows: getSelectedStatus(tabId),
    filterRows: getSelectedStatus(tabId),
    searchKey: 'title',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
    titleTerm: '',
    webformId: '',
    submitId: '',
    experience_aquired: '',
    education_aquired: '',
    experience_aquired_warning_error: false,
    education_aquired_warning_error: false,
    showPopup: false,
    selectedObj: {},
  });
  const handleClose = () => setState({ ...state, showPopup: false });

  const handleSearchClick = (search = 1) => {
    let value = search ? state.titleTerm : '';
    let data = getSelectedStatus(state.selectedTabId);
    let filterRows = [];
    if (value) {
      filterRows = data.filter((item) => {
        return (item[state.searchKey].toLowerCase().toString())
          .indexOf(value.toLowerCase().toString()) !== -1;
      })
    } else {
      filterRows = data;
    }
    setState({
      ...state,
      titleTerm: value,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  useEffect(() => {
    router.push(`?entitytype=${entityType}&entityid=${entityId}&tab=${tabId}`, undefined, { shallow: true })
  }, [])

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
      {eachRow.todo_type === 2 ?
        <>
          {eachRow.todo_status !== 1 && <span title={'Fill werkpostfiche'} className={styles["span-action-icons"]} onClick={() => handleActionClick('edit', eachRow)}><img src={edit_svg.src} alt="fill_werkpostfiche" className=''></img> </span>}
          {eachRow.todo_status !== 1 && <span title={'Sign'} className={styles["span-action-icons"]} onClick={() => handleActionClick('sign', eachRow)}> <img src={sign_icon.src} alt="sign" className='sign_action_icon_size'></img> </span>}
        </> : eachRow.todo_status !== 1 && <span title={'Sign'} className={styles["span-action-icons"]} hidden={eachRow.todo_status === 1} onClick={() => handleActionClick('sign', eachRow)}> <img src={sign_icon_1.src} alt="sign" className=''></img> </span>
      }     {eachRow.todo_status === 1 && <span title={'Download'} className={styles["span-action-icons"]} onClick={() => handleActionClick('download', eachRow)}> <img src={download_svg.src} alt="download" className=''></img> </span>}
    </>
  }

  const handleActionClick = (type, eachRow) => {
    let encode = btoa(window.location.href.replaceAll(`tab=${state.selectedTabId}`, `tab=${type === 'edit' ? 1 : 2}`));
    if (type === 'sign' && entityType === 3) {
      setState({ ...state, showPopup: true, selectedObj: eachRow })
      return;
    }
    if (eachRow.todo_type === 1) {
      if (type === 'sign')
        window.open(`${eachRow.uri}&destination_url=${encode}`, '_self');
      if (type === 'download')
        handleCooperationAgreementDownload(eachRow);
    }
    if (eachRow.todo_type === 2) {
      let { webform_id, submit_id, tid, employer_id = 0 } = eachRow;
      let path;
      if (type === 'edit')
        path = `admin/structure/webform/manage/${webform_id}/submission/${submit_id}/edit?type=optout`;
      if (type === 'sign')
        path = `werkpostfichespdf/form/werkpostfiche_preview/${webform_id}/${submit_id}/${tid}/${entityType === 3 ? employer_id : entityId}?type=${entityType === 2 ? 'employeer' : 'employee'}`
      if (type === 'download')
        path = `werkpostfichespdf/pdf/${webform_id}/${submit_id}/${entityType === 3 ? employer_id : entityId}?signed=${eachRow.todo_status}&type=employee`
      setTimeout(() => window.close(), 500);
      window.open(eachRow.baseUrl + `${path}&todo_user_id=${entityId}&destination_url=${encode}`, type === 'download' ? '_self' : '_blank');
    }
  }

  const handleCooperationAgreementDownload = async (eachRow) => {
    eachRow['type'] = 4;
    eachRow['root_parent_id'] = eachRow.uri.split('root_parent_id=').pop().split('&')[0];
    await APICALL.service(`${downloadSvAsPdf}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if (response.status === 200 && result.url) {
          var a = document.createElement("a");
          a.setAttribute("type", "file");
          a.href = result.url;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          window.alert('Error occurred')
        }
      })
      .catch((error) => window.alert('Error occurred'));
  }

  const handleTabClick = (id) => {
    let selectedTabId = Number(id);
    router.push(`?entitytype=${entityType}&entityid=${entityId}&tab=${selectedTabId}`, undefined, { shallow: true })
    let filterRows = getSelectedStatus(selectedTabId);
    setState({
      ...state, selectedTabId, filterRows, status, titleTerm: '',
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }
  const handleSubmit = async () => {
    let { webform_id, submit_id, tid, employer_id = 0, baseUrl } = state.selectedObj;
    const { experience_aquired, education_aquired } = state;
    if (experience_aquired == '' || education_aquired == '') {
      setState({
        ...state,
        experience_aquired_warning_error: experience_aquired == '' ? true : false,
        education_aquired_warning_error: education_aquired == '' ? true : false,
      });
      return;
    }
    const postData = {
      webformId: webform_id,
      submitId: submit_id,
      experience_aquired: state.experience_aquired,
      education_aquired: state.education_aquired

    }
    await APICALL.service(`${updateEmployeesubmitDetails}`, 'POST', postData).then(response => {
      if (response.status === 200) {
        let encode = btoa(window.location.href.replaceAll(`tab=${state.selectedTabId}`, 'tab=2'));
        let path = `werkpostfichespdf/form/werkpostfiche_preview/${webform_id}/${submit_id}/${tid}/${entityType === 3 ? employer_id : entityId}?type=${entityType === 2 ? 'employeer' : 'employee'}`
        setTimeout(() => window.close(), 500);
        setState({ ...state, showPopup: false });
        window.open(baseUrl + `${path}&todo_user_id=${entityId}&destination_url=${encode}`, '_blank');

      }
    }).catch(error => console.error(error))
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
      [name + '_warning_error']: false,
    })

  }
  const educationPopup = () => {
    const { showPopup } = state;
    return (
      <>
        <Modal size={'lg'} show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{ paddingLeft: '36%' }}>
            <Modal.Title> Education Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className={`col-md-12`}>
                <LabelField title="Ervaring" customStyle={{ display: '' }} className={'poppins-regular-18px'} />
                <InputField
                  type={'text'}
                  className={'col-md-11 poppins-regular-18px'}
                  value={state.experience_aquired}
                  name='experience_aquired'
                  placeholder={''}
                  handleChange={(e) => handleChange(e)}
                />
                {state.experience_aquired_warning_error && <ValidateMessage style={{ margin: 0 }} text={'This field is required'} />}
              </div>
              <div className={`col-md-12`}>
                <LabelField title="Verworven opleiding" customStyle={{ display: '' }} className={'poppins-regular-18px'} />
                <InputField
                  type={'text'}
                  className={'col-md-11 poppins-regular-18px'}
                  value={state.education_aquired}
                  name='education_aquired'
                  placeholder={''}
                  handleChange={(e) => handleChange(e)}
                />
                {state.education_aquired_warning_error && <ValidateMessage style={{ margin: 0 }} text={'This field is required'} />}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <p className={`${styles['popup-back-btn']}`} onClick={handleClose}> Back </p>
            <Button variant="secondary" onClick={handleSubmit}>
              SAVE
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const showTabs = () => {
    let { selectedTabId } = state;
    return (
      <div className='row my_todo_tab pt-2'>
        <div className='col-md-12'>
          <ul className={`${styles['todo-tabs']} col-md-6 m-0`}>
            {state.tabs.map(tab => {
              let Icon = selectedTabId === tab.id ? tab.activeIcon : tab.icon;
              return (
                <li key={tab.id} className='col-md-1'>
                  <div className={`w-auto d-inline-block my_todo_color ${styles['cursor-pointer']} ${selectedTabId === tab.id ? styles['underline'] : ''}`} onClick={() => handleTabClick(tab.id)}>
                    <span id={tab.id} className={`${styles['todo-icon']}`}>  <img src={Icon}></img> </span>
                    <span className="d-block my-1 text-center"> {tab.name} </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <>
        {state.showPopup === true && educationPopup()}
        <div className='row position-sticky-pc'>
          <div className='col-md-12'>
            <h4 className='py-4 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`My Todos`} </h4>
          </div>
        </div>
        <div className="position-sticky-mytodo">  {showTabs()} </div>
        <div className='row searchbox m-0 mt-4 mb-2' style={{ margin: '10px 0', position: 'relative' }}>
          <div className='col-md-12'>
            <div className='row'>
              <div className='col-md-8 col-lg-9 ps-0'>
                <input
                  type="text"
                  value={state.titleTerm}
                  className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 shadow-none"
                  onChange={(e) => setState({ ...state, titleTerm: e.target.value })}
                  placeholder={'Search'}
                  onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1) : null}
                />
              </div>
              <div className='col-md-4 col-lg-3'>
                <div className='row justify-content-end'>
                  <div className='col-md-6 col-lg-6 pe-0'>
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
        </div>
        <div className="table-render-parent-div min_height_todo">
          <table className="table table-hover manage-types-table table  mb-3 text-start manage-documents-table-header my_todo_table">
            <thead className="table-render-thead bg_grey table_header_todo">
              <tr className='table-sticky-bg-gray poppins-medium-18px border-0' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='' key={`tablecol_${index}`} scope="col"> {eachHeader} </th>)}</tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
              <tbody className='table-body-employee-type poppins-light-18px'>
                {state.currentItems.map((eachRow, index) =>
                  <tr key={`${index}_${eachRow.tid}`} id={eachRow.tid}>
                    <td className='text-start ps-4 py-1'> {eachRow.title} </td>
                    <td className='text-start ps-4 py-1'> {eachRow.company_name} </td>
                    {entityType === 2 && <td className='text-start ps-4 py-1'> {eachRow.employee_name} </td>}
                    <td> <span className={`${styles['status-icon']} ${Number(eachRow.todo_status) ? styles['status-done'] : styles['status-open']}`}> </span> </td>
                    <td className='align-self-center my_todo_action_icon'>{getNeededActions(eachRow)} </td>
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
          <button onClick={() => router.push('/')} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-3 mb-3 px-0 text-decoration-underline text-uppercase">
            {`Back`}
          </button>
        </div>
      </>
    </div>
  );
}

export default React.memo(TodosOverview);
