import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateAdditionalDocuments, storeAdditionalDocuments, uploadAdditionalDocs } from '@/Services/ApiEndPoints'
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import { file } from '@/atoms/handleFileUpload';
import FileUpload from '@/atoms/FileUpload';
import DateField from '@/atoms/DateField';
import CheckBoxField from '@/atoms/CheckBoxField';
import MultiSelectField from '@/atoms/MultiSelectField';
import { APICALL } from '@/Services/ApiServices';
import ValidateMessage from '@/atoms/validationError';
import { MdDelete } from 'react-icons/md';
import Translation from '@/Translation';

const EditUpdateAdditionalDoc = ({ entityId = 0, entityType = 0, editId, documentDetails = {}, companies, employers }) => {
  const router = useRouter();
  const assignInitialValues = () => {
    return {
      name: documentDetails.name || '',
      startDate: documentDetails.startDate || '',
      endDate: documentDetails.endDate || '',
      employerId: documentDetails.employerId || 0,
      companyId: documentDetails.companyId || 0,
      linkToCooperationAgreement: documentDetails.linkToCooperationAgreement || 0,
      files: editId ? (documentDetails.files || []) : [],
   }
 }

  const [state, setState] = useState({
      ...assignInitialValues(),
      nameWarning: false,
      fileWarning: false,
      fileSizeWarning: false,
      employerWarning: false,
      companyWarning: false,
      files: [],
  })

  useEffect(() => {
    setState({...state, ...assignInitialValues() })
  }, [Object.keys(documentDetails).length])

    /**
     * [handleSubmit: function to save and edit employee/coefficient types]
     * @return {[void]} [it wont return anything]
     */
    const handleSave = async (draft = 0) => {
      let proceed = true;
      let url = editId ? `${updateAdditionalDocuments}/${editId}` : `${storeAdditionalDocuments}`;
      if(!draft) {
        proceed = checkRquiredField();
      }
      if(proceed) {
        await APICALL.service(url, 'POST', getPostData(draft))
        .then((result) => {
          if(result.status === 200) {
            router.back();
          }
        })
        .catch((error) => console.error('Error occurred'));
      }
    }

    const getPostData = (draft) => {
      const { name, startDate, endDate, linkToCooperationAgreement, files, companyId, employerId } = state;
      return {
        name, startDate, endDate, linkToCooperationAgreement, files, companyId, employerId, draft, entityType, entityId
      }
    }

    const checkRquiredField = () => {
      const { files, name, employerId, companyId, startDate, endDate } = state;
      let proceed = true;
      let setObj = {}
      if(!name.length) {
        setObj['nameWarning'] = true;
        proceed = false;
      }
      if(!Array.isArray(files) || files.length === 0) {
        setObj['fileWarning'] = true;
        proceed = false;
      }
      if(!employerId) {
        setObj['employerWarning'] = true;
        proceed = false;
      }
      if(!companyId) {
        setObj['companyWarning'] = true;
        proceed = false;
      }
      if(startDate && endDate && new Date(startDate).getTime() >= new Date(endDate).getTime()) {
        setObj['dateWarning'] = true;
        proceed = false;
      }
      setState({...state, ...setObj});
      return proceed;
    }

  const handleChange = (e, type) => {
    let setObj = {...state}
    const { value, checked, name } = e.target;
    if(type === 1) {
      setObj[name] = value;
      setObj[`${name}Warning`] = false;
    } else {
      setObj['linkToCooperationAgreement'] = checked ? 1 : 0;
    }
    setState(setObj);
  }

  const handleFileChange = async (e) => {
    let files = e.target.files;
    let size = files[0]['size'] / 1000;
    if(size > 2000) {
      setState({...state, fileSizeWarning: true});
    } else {
      let response = await file.uploadFile(e, uploadAdditionalDocs);
      if(response.status === 200){
        setState({...state, files: [...state.files, ...response.data], fileWarning: false, fileSizeWarning: false});
      }
    }
  }

  const onSelect = async (e, type) => {
    if(type === 1) {
      setState({...state, employerId: e.value, companyId: 0, employerWarning: false, companyWarning: false})
    } else {
      setState({...state, companyId: e.value, companyWarning: false})
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
          <div key = {index} className="mt-2">
            <span className="actions-span text-dark w-50 poppins-light-16px"> {file.file_name} </span>
            <span title={'Delete'} className="actions-span color-skyblue" onClick={() => handleActionClick('delete', index)}> <MdDelete/> </span>
          </div>
        );
      })
    )
  }

  const handleActionClick = (type, index) => {
    const { files } = state;
    files.splice(index, 1);
    setState({...state, files: files});
  }

  return <>
    <div className='add-edit-types border-purple p-3 mb-5'>
     <div className="">
      <div className='row'>
      <div className='col-md-6 pe-0 pb-3'>
        <div>
            <LabelField title={`Document name`} className='poppins-medium-18px' mandotory={true}/>
            <InputField
                type = {'text'}
                className = {'col-md-12 my-1 shadow-none rounded-0'}
                value={state.name}
                isDisabled= {false}
                placeholder={'Enter document name'}
                handleChange={(e) => handleChange(e, 1)}
                name={'name'}
             />
          {state.nameWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
        <div>
            <LabelField title={`File upload`} className='poppins-medium-18px' mandotory={true}/>
              <FileUpload
                name={'file'}
                id='additional_docs_id'
                multiple={false}
                fileUploadText={'Choose file, maximum allowed size is 2MB.'}
                handleChange={handleFileChange}
                className=' shadow-none rounded-0 pos-rel'
              />
          {state.fileSizeWarning && <ValidateMessage style={{margin:0}} text = {'This file is too large to upload, maximum allowed size is 2MB.'}/>}
          {state.fileWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
          {state.files.length > 0 && showUploadedFiles()}
        </div>
      </div>
      </div>
      <LabelField title={`Document validity`} className='poppins-medium-18px pb-0' />
     <div className='row'>
       <div className='col-md-12'>
         <div className='row'>
        <div className="col-md-12 pb-3">
          <LabelField title={`Start date`} className='poppins-medium-18px'/>
          <DateField
            name={'startDate'}
            value={state.startDate}
            id={'startDate_id'}
            className={'col-md-6 rounded-0 shadow-none'}
            handleChange={(e) => handleChange(e, 1)}
          />
      {state.dateWarning && <ValidateMessage style={{margin:0}} text = {'Start date should be earlier than end date.'}/>}
        </div>
        <div className="col-md-12 pb-3">
          <LabelField title={`End date`} className='poppins-medium-18px' />
          <DateField
            name={'endDate'}
            value={state.endDate}
            id={'endDate_id'}
            className={'col-md-6 rounded-0 shadow-none'}
            handleChange={(e) => handleChange(e, 1)}
          />
        </div>
         </div>
         </div>
     </div>
      <div className='row'>
      <div className="col-md-12">
       <div className='row'>
       <div className="col-md-12 pb-3">
          <LabelField title={`Employer`} mandotory={true} className='poppins-medium-18px'/>
          <MultiSelectField
            options={employers}
            standards={employers.filter(val => val.value === state.employerId)}
            handleChange={(e) => onSelect(e, 1)}
            isMulti={false}
            className="col-md-6 rounded-0 shadow-none employer_select"
            placeholder={'Select employer'}
          />
        {state.employerWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
        <div className="col-md-12 pb-3">
          <LabelField title={`Company`}  mandotory={true} className='poppins-medium-18px' />
          <MultiSelectField
            options={state.employerId ? companies[state.employerId] : []}
            standards={state.employerId && companies[state.employerId] ? companies[state.employerId].filter(val => val.value === state.companyId) : []}
            handleChange={(e) => onSelect(e, 2)}
            isMulti={false}
            className="col-md-6 rounded-0 shadow-none employer_select"
            placeholder={'Select company'}
          />
        {state.companyWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
       </div>
        <div className="col-md-12  ">
          <CheckBoxField
              id={'link_to_sv'}
              tick={state.linkToCooperationAgreement}
              disabled={false}
              onCheck={(e) => handleChange(e, 2)}
              name={`Link to cooperation agreement.`}
              customStyle={{margin: '10px 0', cursor:'pointer'}}
              className="col-md-6 d-flex rounded-0"
            />
        </div>
      </div>
      </div>
      {/* <div className="d-flex justify-content-end row">
      <div className='col-md-5 float-end'>
        <div className='row '>
          <div className='col-md-6'>
          <button onClick={() => handleSave(1)} type="button" className="btn skyblue-bg-color rounded-0 shadow-none float-end"> Save as draft </button>
          </div>
          <div className='col-md-5'>
          <button onClick={() => handleSave()} type="button" className="btn skyblue-bg-color rounded-0 shadow-none float-end"> Send to employer </button>
          </div>
        </div>
      </div>
      </div> */}
     {/* back button */}
     {/* end of back button */}
      </div>
    </div>
    <div className='row mb-2'>
       <div className='col-md-6 p-0'>
       <button onClick={() => router.back()} type="button" className="btn poppins-light-18px text-decoration-underline text-uppercase text-left shadow-none mb-3">
        {`Back`}
      </button>
       </div>
       <div className='col-md-6 '>
          <div className="row justify-content-end">
          <div className='col-md-6'>
          <button onClick={() => handleSave(1)} type="button" className="btn poppins-medium-18px-next-button rounded-0 shadow-none float-end w-75"> Save as draft </button>
          </div>
          <div className='col-md-6'>
          <button onClick={() => handleSave()} type="button" className="btn rounded-0 shadow-none float-end poppins-medium-18px-next-button w-100"> Send to employer </button>
          </div>
          </div>
        </div>
     </div>
  </>
}
export default React.memo(EditUpdateAdditionalDoc);
