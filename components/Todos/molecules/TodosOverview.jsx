import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { APICALL } from '@/Services/ApiServices';
import {
  updateEmployeesubmitDetails,
  downloadSvAsPdf,
  labourTodoFileUpload,
  saveLabourTodoFile
} from '@/Services/ApiEndPoints';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import { dom } from '@/Services/domServices';
import ValidateMessage from '@/atoms/validationError';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { file } from '@/atoms/handleFileUpload';
import FileUpload from '@/atoms/FileUpload';
import { MdDelete } from 'react-icons/md';
import styles from './Todos.module.css';
import sign_icon from '../molecules/images/cooperation_agreement.svg';
import edit_svg from '../molecules/images/edit.svg';
import download_svg from '../molecules/images/download.svg';
import { HiOutlineExternalLink, } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import { CgMailOpen } from 'react-icons/cg';
import Translation from '@/Translation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import envelope_svg from '../molecules/images/envelope-open-text-solid.svg';

const itemsPerPage = 5;
const COOPERATION_AGREEMENT_TODO = 1;
const WERKPOSTFICHES_TODO = 2;
const LABOUR_COOPERATION_TODO = 3;


const TodosOverview = ({ props, entityId, entityType, tabId, t }) => {
  // const { t } = props;
  const router = useRouter();
  const { todos = [], headers = [] } = props;
  const getSelectedStatus = (selectedTab = 1) => {
    let statusIds = selectedTab === 1 ? [0] : selectedTab === 2 ? [1] : selectedTab === 3 ? [0, 1] : [];
    return todos.filter(val => statusIds.includes(Number(val.todo_status)));
  }

  entityType === 3 ? headers.indexOf('Employee') > -1 ? headers.splice(headers.indexOf('Employee'), 1) : headers : [];
  const [state, setState] = useState({
    selectedTabId: tabId,
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
      icon: ''
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
    //----- Labour todo related---//
    files: [],
    fileWarning: false,
    fileSizeWarning: false,
    labourTodoPopUp: false,
  });

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
    dom.scrollToTop();
    let items = [...state.filterRows];
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setState({ ...state, itemOffset: newOffset, currentPage: event.selected });
  };
  //------------------- Pagination code -------------------------//
  //-------------------

  const getSpanTag = (eachRow, title, key, src = '', hidden = 0, className='span-action-icons') => {
    return (
      <span
          title={title}
          className={styles[className]}
          hidden={hidden}
          onClick={() => handleActionClick(key, eachRow)}
        >
           <img src={src} alt={key} className = ''  />
      </span> )
  }

  /**
   * [getNeededActions description]
   * @param  {[type]} eachRow               [description]
   * @return {[type]}         [description]
   */
  const getNeededActions = (eachRow) => {
    let returnActions = [];
    switch (eachRow.todo_type) {
      case COOPERATION_AGREEMENT_TODO:
        returnActions.push(  getSpanTag(
          eachRow,
          'Sign',
          'sign',
          sign_icon.src,
          eachRow.todo_status === 1
        ))
        break;
      case WERKPOSTFICHES_TODO:
        returnActions.push( eachRow.todo_status !== 1 && <>  { entityType !== 3 &&
          getSpanTag( eachRow, 'Fill werkpostfiche', 'edit', edit_svg.src)}{
          (entityType === 3 || Number(eachRow.submitted) === 1) &&
          getSpanTag(eachRow, 'Sign', 'sign', sign_icon.src)}
          </>
        );
        break;
      case LABOUR_COOPERATION_TODO:
          returnActions.push( eachRow.type === 1 ?
            getSpanTag(eachRow, 'Upload', 'upload', edit_svg.src, eachRow.todo_status === 1):
            getSpanTag(eachRow, 'Sign', 'sign', edit_svg.src, eachRow.todo_status === 1)
          )
        break;
      default:
        break;
    }
    returnActions.push(eachRow.todo_status === 1 && <span title={'Download'} className={styles["span-action-icons"]} onClick={() => handleActionClick('download', eachRow)}> <img src={download_svg.src} alt="download" className=''></img> </span>)
    return returnActions;
  }

  const handleActionClick = (type, eachRow) => {
    let { webform_id, submit_id, tid, employer_id = 0 } = eachRow;
    let encode = btoa(window.location.href.replaceAll(`tab=${state.selectedTabId}`, `tab=${type === 'edit' ? 1 : 2}`));
    if (type === 'sign' && entityType === 3) {
      setState({ ...state, showPopup: true, labourTodoPopUp: false, selectedObj: eachRow })
      return;
    }
    if (eachRow.todo_type === COOPERATION_AGREEMENT_TODO) {
      if (type === 'sign')
        window.open(`/cooperation-agreement-preview?root_parent_id=${webform_id}&emp_ref=${submit_id}&type=2&preview=0&destination_url=${encode}`, '_self');
      if (type === 'download')
        handleCooperationAgreementDownload({root_parent_id: webform_id});
    }
    if (eachRow.todo_type === WERKPOSTFICHES_TODO) {
      let path;
      if (type === 'edit')
        path = `admin/structure/webform/manage/${webform_id}/submission/${submit_id}/edit?type=optout&rowId=${tid}`;
      if (type === 'sign')
        path = `werkpostfichespdf/form/werkpostfiche_preview/${webform_id}/${submit_id}/${tid}/${entityType === 3 ? employer_id : entityId}?type=${entityType === 2 ? 'employeer' : 'employee'}`
      if (type === 'download')
        path = `werkpostfichespdf/pdf/${webform_id}/${submit_id}/${entityType === 3 ? employer_id : entityId}?signed=${eachRow.todo_status}&type=employee`
      setTimeout(() => window.close(), 500);
      window.open(eachRow.baseUrl + `${path}&todo_user_id=${entityId}${type === 'download' ? '' : `&destination_url=${encode}`}`, type === 'download' ? '_self' : '_blank');
    }
    if(eachRow.todo_type === LABOUR_COOPERATION_TODO) {
      if(type === 'upload') {
        setState({ ...state, showPopup: true, labourTodoPopUp: true, selectedObj: eachRow })
      } else if(type === 'download') {
         downloadUsingAnchorTag(eachRow.baseUrl + eachRow.file_path);
      } else {
        window.open(`labour-share-doc-preview?entityid=${entityId}&ref_id=${eachRow.tid}`, '_blank');
      }
      return;
    }
  }

  const handleCooperationAgreementDownload = async (eachRow) => {
    eachRow['type'] = 4;
    await APICALL.service(`${downloadSvAsPdf}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if(response.status === 200 ) {
          downloadUsingAnchorTag(result.url);
        } else {
          window.alert('Error occurred')
        }
        downloadUsingAnchorTag(response);
      })
      .catch((error) => window.alert('Error occurred'));
  }

  const downloadUsingAnchorTag = (url) => {
    if(url) {
      var a = document.createElement("a");
      a.setAttribute("type", "file");
      a.href = url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
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
    const { experience_aquired, education_aquired, files, labourTodoPopUp, selectedObj } = state;
    let postData = {};
    let url = '';
    if(labourTodoPopUp) {
      if(!files || !files.length) {
        setState({...state, fileWarning: true})
        return;
      } else {
        postData = {data: {...selectedObj, file_id: files ?.[0]?.['file_id'] ?? 0} }
      }
    } else {
      if (experience_aquired == '' || education_aquired == '') {
        setState({
          ...state,
          experience_aquired_warning_error: experience_aquired == '' ? true : false,
          education_aquired_warning_error: education_aquired == '' ? true : false,
        });
        return;
      }
      postData = {
        webformId: webform_id,
        submitId: submit_id,
        experience_aquired: state.experience_aquired,
        education_aquired: state.education_aquired

      }
    }
    await APICALL.service(labourTodoPopUp? saveLabourTodoFile : updateEmployeesubmitDetails , 'POST', postData).then(response => {
      if (response.status === 200) {
        if(labourTodoPopUp) {
          window.open(window.location.href.replaceAll(`tab=${state.selectedTabId}`, 'tab=2'), '_self');
        } else {
          let encode = btoa(window.location.href.replaceAll(`tab=${state.selectedTabId}`, 'tab=2'));
          let path = `werkpostfichespdf/form/werkpostfiche_preview/${webform_id}/${submit_id}/${tid}/${entityType === 3 ? employer_id : entityId}?type=${entityType === 2 ? 'employeer' : 'employee'}`
          setTimeout(() => window.close(), 500);
          setState({ ...state, showPopup: false, labourTodoPopUp: false });
          window.open(baseUrl + `${path}&todo_user_id=${entityId}&destination_url=${encode}`, '_blank')
        }
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
    const { showPopup, labourTodoPopUp = false } = state;
    return (
      <>
        <Modal size={'lg'} show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{ paddingLeft: '36%' }}>
            <Modal.Title> {labourTodoPopUp ? 'Upload file' : 'Education Details'} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {labourTodoPopUp ?
             <div>
                <LabelField title={`File upload`} className='poppins-medium-18px' mandotory={true}/>
                  <FileUpload
                    name={'file'}
                    id='labour_todo_id'
                    multiple={false}
                    fileUploadText={'Choose file, maximum allowed size is 2MB.'}
                    handleChange={handleFileChange}
                    className=' shadow-none rounded-0 pos-rel'
                  />
                {state.fileSizeWarning && <ValidateMessage style={{margin:0}} text = {'This file is too large to upload, maximum allowed size is 2MB.'}/>}
                {state.fileWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
                {state.files.length > 0 && showUploadedFiles()}
              </div>
             :
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
            </div>}
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

  const handleClose = () => setState({ ...state, showPopup: false, labourTodoPopUp: false, files:[], fileWarning: false,
  fileSizeWarning: false,  });

  const handleFileChange = async (e) => {
    let files = e.target.files;
    let size = files[0]['size'] / 1000;
    if(size > 2000) {
      setState({...state, fileSizeWarning: true});
    } else {
      let response = await file.uploadFile(e, labourTodoFileUpload);
      if(response.status === 200){
        setState({...state, files: response.data, fileWarning: false, fileSizeWarning: false});
      }
    }
  }

  /**
   * [showUploadedFiles description]
   * @return {[type]} [description]
   */
  const showUploadedFiles = () => {
    const { files } = state;
    return(
      files.map((file, index) => {
        return (
          <div key = {index} className="my-2">
            <span className="actions-span text-dark w-50 poppins-light-16px"> {file.file_name} </span>
            <span title={'Delete'} className="actions-span color-skyblue" onClick={() => handleDelete('delete', index)}> <MdDelete/> </span>
          </div>
        );
      })
    )
  }

  const handleDelete = (type, index) => {
    const { files } = state;
    files.splice(index, 1);
    setState({...state, files: files});
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
              // let Icon = tab.icon;
              // return (
              //   <li key={tab.id}>
              //     <div className={`w-50 py-2 text-center ${styles['cursor-pointer']} ${selectedTabId === tab.id ? styles['underline'] : ''}`} onClick={() => handleTabClick(tab.id)}>
              //       <span id={tab.id} className={`${styles['todo-icon']}`}> <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" /> </span>
              //       <span className="d-block my-1"> {tab.name} </span>
              //     </div>
              //   </li>
              //
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
        <div className='row searchbox m-0 pt-4 mb-2 position-sticky-mytodo_searchbox' style={{ margin: '10px 0'}}>
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
                      {t('SEARCH')}
                      
                    </button>
                  </div>
                  <div className='col-md-6 col-lg-6 pe-0'>
                    <button
                      type="button"
                      // className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn  w-100 shadow-none"
                      className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
                      onClick={() => handleSearchClick(0)}>
                      {t('RESET')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-render-parent-div min_height_todo">
          <table className="table table-hover manage-types-table table  mb-3 text-start manage-documents-table-header my_todo_table">
            <thead className="table-render-thead bg_grey table_header_todo sticky-table-header">
              <tr className='table-sticky-bg-gray poppins-medium-18px border-0' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='' key={`tablecol_${index}`} scope="col"> {eachHeader} </th>)}</tr>
            </thead>
            {state.currentItems && state.currentItems.length > 0 ?
              <tbody className='table-body-employee-type poppins-light-18px'>
                {state.currentItems.map((eachRow, index) =>
                  <tr key={`${index}_${eachRow.tid}`} id={eachRow.tid}>
                    <td className='text-start ps-4 py-1'> {eachRow.title} </td>
                    <td className='text-start py-1'> {eachRow.company_name} </td>
                    {entityType === 2 && <td className='text-start py-1'> {eachRow.employee_name} </td>}
                    <td> <span className={`${styles['status-icon']} ${Number(eachRow.todo_status) ? styles['status-done'] : styles['status-open']}`}> </span> </td>
                    <td className='align-self-center my_todo_action_icon'>{getNeededActions(eachRow)} </td>
                  </tr>)}
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

export default React.memo(Translation(TodosOverview,['SEARCH' ,'RESET','No records',`Back`]));
