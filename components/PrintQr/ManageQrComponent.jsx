import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { downloadQrCode, regenerateQrCode } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import { FiDownload } from 'react-icons/fi';
import { BiQrScan } from 'react-icons/bi';
import { GrRefresh } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import DateField from '@/atoms/DateField';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { formatDate, getFutureDates } from '@/components/SalaryBenefits/SalaryBenefitsHelpers';
import customAlert from '@/atoms/customAlert';
import Translation from '@/Translation';

const itemsPerPage = 5;
let dateObj = new Date()
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();
let dateValue = `${year}-${month < 10 ? '0' + month : month}`;
const dateOptions = getFutureDates();
let updatedDay = day - 1 < 10 ? '0' + (day - 1) : day - 1;
const ManageQrComponent = ({ props: { headers, rows, renderComp }, loadData, entityId, t }) => {


  // console.log(t);
  const router = useRouter();
  const [state, setState] = useState({
    searchTerm: '',
    filterRows: rows,
    searchKey: 'name',
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    currentPage: 0,
    showPopup: false,
    selectedDateOption: 1,
    headingDate: `${year}${month < 10 ? '0' + month : month}${updatedDay}`,
    selectedDate: `${dateValue}-${updatedDay}`,
    currentDate: `${dateValue}-${updatedDay}`,
    minDate: `${dateValue}-${updatedDay}`,
    maxDate: `${dateValue}-${day + 4 < 10 ? '0' + (day + 4) : day + 4}`,
    selectedRow: {},
    dateError: false,
  })

  useEffect(() => {
    setState({...state, filterRows: rows, ...updatePaginationData(rows, state.itemOffset || 0) })
  }, [rows.length, renderComp])

  const getNeededActions = (eachRow) => {
    let generated = eachRow.qr_path !== '';
    return (
      <>
        <span className="span-action-icons me-2 text-dark" title={generated ? "Regenerate": "Generate"} onClick={() => handleActionClick('regenerate', eachRow)}>   <GrRefresh className='mt-2 color-skyblue force-skyblue'/> </span>
        {generated && <>
          <span className="span-action-icons me-2 text-dark" title="View" onClick={() => window.open(`image-preview?url=${eachRow.qr_path.replaceAll('/', '@')}`,'_blank')}>   <BiQrScan className='mt-2 ms-3 color-skyblue'/> </span>
          <span className="span-action-icons me-2 text-dark" title="Download" onClick={() => handleActionClick('download', eachRow)}> <FiDownload className='mt-2 ms-3 color-skyblue'/> </span>
        </>}
      </>
    )
  }

  const handleActionClick = (action, eachRow) => {
    if (action === 'view') {
      window.open(eachRow.qr_path, '_blank')
    } else if (action === 'regenerate') {
      handleRegenerateQrCode(eachRow)
    } else {
      handleDownload(eachRow);
    }
  }

  const handleDownload = async (eachRow) => {
    await APICALL.service(`${downloadQrCode}`, 'POST', eachRow)
      .then((response) => {
        let result = response.data;
        if(response.status === 200 && result.url) {
          var a = document.createElement("a");
          a.setAttribute("type", "file");
          a.href     = result.url;
          a.download = result.zipFileName;
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

  const handleSearchClick = (search = 0) => {
    let filterRows = [];
    let { companyTerm = '', locationTerm = '' } = state;
    if(search && (companyTerm || locationTerm)) {
      filterRows = rows.filter((item) => {
        let status = true;
        if(companyTerm)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(companyTerm.toLowerCase().toString()) !== -1;
        if(status && locationTerm)
          status = `${item['location_name']}`.toLowerCase().toString().indexOf(locationTerm.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = rows;
      companyTerm = '';
      locationTerm = '';
    }
    setState({ ...state, companyTerm, locationTerm, filterRows,
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

  const showDateSelectModal = () => { //NOSONAR
    const { showPopup, selectedDateOption, selectedDate, minDate, maxDate, dateError } = state;
    return (
      <>
          <Modal size={'lg'} show={showPopup} onHide={handleClose}>
            <Modal.Header closeButton style={{paddingLeft: '30%'}}>
              <Modal.Title> Header </Modal.Title>
            </Modal.Header>
          <Modal.Body>
              <div>
                <div className="col-md-12 row p-0 m-0">
                  <RadioField
                      id="1"
                      checked={selectedDateOption === 1}
                      disabled={false}
                      handleChange={handleRadioSelect}
                      label="Take current date"
                      className="col-md-6"
                    />
                    <RadioField
                        id="2"
                        checked={selectedDateOption === 2}
                        disabled={false}
                        handleChange={handleRadioSelect}
                        label="Take future date"
                        className="col-md-6"
                      />
                      <DateField
                         id="selectedDate"
                         isDisabled= {selectedDateOption === 1}
                         placeholder={'date'}
                         handleChange={handleChange}
                         className="col-md-6 my-3 mx-2"
                         value={selectedDate}
                         minDate={minDate}
                         maxDate={maxDate}
                        />
                       {selectedDateOption === 2 && <small className="small"> {t('Future date only next 5 days are allowed')} </small>} <br />
                       {dateError && <small className="my-3 small" style={{color:'red'}}> {t('Date should be between')} {formatDate(minDate)} - {formatDate(maxDate)} </small>}
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <p className="popup-back-btn" onClick={handleClose}> Back </p>
            <Button variant="secondary" onClick={handleRegenerateQrCode}>
              {t('Regenerate')}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const handleRegenerateQrCode = async (eachRow) => {
    if(state.selectedDateOption === 1 || checkDateFieldValid()) {
      let postData = {...eachRow, entityId: entityId, selectedDate: state.headingDate }
      await APICALL.service(`${regenerateQrCode}`, 'POST', postData)
        .then((response) => {
          if(response.status === 200) {
            setState({...state,
              filterRows: response.data,
              dateError: false,
              showPopup: false,
              selectedRow: {},
              selectedDateOption: 1,
              selectedDate: state.currentDate,
              ...updatePaginationData(response.data, state.itemOffset || 0)
            })
            customAlert('success', eachRow.qr_path !== '' ? `QR code regenerated successfully!` : `QR code generated successfully!`, 2000);
          }
        }).catch((error) => window.alert('Error occurred'));
    } else {
      setState({...state, dateError: true});
    }
  }

  const handleClose = () => {
    setState({...state,
      dateError: false,
      selectedRow: {},
      showPopup: false,
      selectedDateOption: 1,
      selectedDate: state.currentDate
    })
  }

  const handleRadioSelect = ( { target: { id = 1} } ) => {
    setState({...state,
      selectedDateOption: Number(id) || 1,
      selectedDate: Number(id) === 1 ? state.currentDate : ''
    })
  }

  const handleChange = ( { target: {value = '',  id = 'selectedDate'} } ) => {
    setState({...state,
      [id]: value,
      dateError: false
    })
  }

  const checkDateFieldValid = () => {
    let value = state.selectedDate;
    return !value || (new Date(value).getTime() >= new Date(state.minDate).getTime() && new Date(value).getTime() <= new Date(state.maxDate).getTime()) ? true: false
  }

  const onSelect = (e) => {
    loadData(e.value);
    setState({...state, headingDate: e.value});
  }

  return (
    <>
      <div className='row position-sticky-pc'>
        <div className='col-md-12 px-0'>
          <h4 className='py-4 font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Manage QR code`} </h4>
        </div>
      </div>
      <>
      <div className='row qr_position_sticky'>
      <div className='col-md-12 '>
       <div className='row'>
       <div className='col-md-12 px-0'>
         <div className='row'>
         <div className='col-md-9 '>
           <div className='row'>
             <div className='col-md-6'>
             <input
             type="text"
             value={state.companyTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px rounded-0 shadow-none"
             onChange={(e) => setState({...state, companyTerm: e.target.value})}
             placeholder={'Search company'}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />

             </div>
             <div className='col-md-6'>
             <input
             type="text"
             value={state.locationTerm}
             className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px rounded-0 shadow-none"
             onChange={(e) => setState({...state, locationTerm: e.target.value})}
             placeholder={'Search location'}
             onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
           />
             </div>
           </div>
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
        <div className='row'>
        <div className="col-md-12 m-0 p-0 py-3 ">
       <div className='row d-flex justify-content-end'>
         <div className='col-md-1 align-self-center'>
         <span style={{fontSize: 'x-large'}} className="text-start poppins-medium-18px align-self-center"> {t('Date')}: </span>
         </div>
         <div className='col-md-3'>
         <MultiSelectField
              id="headingDate"
              options={dateOptions}
              standards={dateOptions.filter(val => val.value === state.headingDate)}
              disabled={false}
              handleChange={onSelect}
              classNamePrefix="qr-custom-multiselect"
              isMulti={false}
              className="col-md-12 date-select"
            />
         </div>
       </div>

        </div>
        </div>
       </div>
      </div>
      </>
     <div className='row'>
       <div className='col-md-12 px-0'>
       <div className=" minimun_height_v1">
        <table className="table table-hover manage-types-table manage-documents-table-header qr_sticky">
          <thead className="table-render-thead ">
            <tr width={30} key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className="align-middle" width={30} key={`tablecol${index}`} scope="col">{eachHeader}</th>)}</tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => {
              return (
                <tr key={eachRow.location_id}>
                    <td className='ps-4'> {eachRow.company_name} </td>
                    <td> {eachRow.location_name} </td>
                    <td> {getNeededActions(eachRow) } </td>
                </tr>
              );
            })}
          </tbody>
          :  <tbody>
          <tr>
          <td colSpan={8} className="text-center poppins-regular-18px no-records">
                  {t('No records')}
                </td>
          </tr>
          </tbody>}
        </table>
      </div>
       </div>
     </div>
      <div>
        {state.filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel={<AiOutlineArrowLeft />}
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination justify-content-center project-pagination"}
            activeClassName={"active"}
        />}
      <div className='row'>
        <div className='col-md-12 px-0'>
        <button onClick={() => router.push('/')} type="button" className="bg-white border-0 poppins-light-18px text-decoration-underline text-uppercase shadow-none float-sm-right mt-5 px-0">
          {`Back`}
        </button>
        </div>
      </div>
      </div>
      {/*showDateSelectModal()*/}
    </>
  );
}
export default React.memo(Translation(ManageQrComponent,['Future date only next 5 days are allowed','Date should be between','Regenerate','SEARCH','RESET','Date','No records']));
