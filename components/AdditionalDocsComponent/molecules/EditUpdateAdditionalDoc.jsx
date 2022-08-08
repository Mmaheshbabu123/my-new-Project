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

const EditUpdateAdditionalDoc = ({ entityId, editId, documentDetails = {}, companies, employers }) => {
  const router = useRouter();
  const assignInitialValues = () => {
    return {
      name: documentDetails.name || '',
      startDate: documentDetails.startDate || '',
      endDate: documentDetails.endDate || '',
      employerId: documentDetails.employerId || 0,
      companyId: documentDetails.companyId || 0,
      linkToCooperationAgreement: documentDetails.linkToCooperationAgreement || 0,
      files: documentDetails.files || [],
   }
 }

  const [state, setState] = useState({
      ...assignInitialValues(),
      nameWarning: false,
      fileWarning: false,
      employerWarning: false,
      companyWarning: false,
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
        name, startDate, endDate, linkToCooperationAgreement, files, companyId, employerId, draft
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
      if(!files.length) {
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
      if(startDate && endDate) {
        let status = new Date(startDate).getTime() >= new Date(endDate).getTime();
        setObj['dateWarning'] = status;
        proceed = !status;
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
    let response = await file.uploadFile(e, uploadAdditionalDocs);
    if(response.status === 200){
      setState({...state, files: [...state.files, ...response.data], fileWarning: false});
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
          <div key = {index} className="my-2">
            <span className="actions-span text-dark w-50"> {file.file_name} </span>
            <span title={'Delete'} className="actions-span text-dark" onClick={() => handleActionClick('delete', index)}> <MdDelete/> </span>
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
    <div className='add-edit-types my-3'>
     <div className="m-2">
      <div className='col-md-6 my-3'>
        <div>
            <LabelField title={`Document name`} mandotory={true}/>
            <InputField
                type = {'text'}
                className = {'col-md-12 my-1'}
                value={state.name}
                isDisabled= {false}
                placeholder={'Enter document name'}
                handleChange={(e) => handleChange(e, 1)}
                name={'name'}
             />
          {state.nameWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
        <div>
            <LabelField title={`File upload`} mandotory={true}/>
              <FileUpload
                name={'file'}
                id='additional_docs_id'
                handleChange={handleFileChange}
              />
          {state.fileWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
          {state.files.length > 0 && showUploadedFiles()}
        </div>
      </div>
      <LabelField title={`Document validity`}/>
      <div className="col-md-12 row my-1">
        <div className="col-md-6">
          <LabelField title={`Start date`}/>
          <DateField
            name={'startDate'}
            value={state.startDate}
            id={'startDate_id'}
            className={'col-md-12'}
            handleChange={(e) => handleChange(e, 1)}
          />
      {state.dateWarning && <ValidateMessage style={{margin:0}} text = {'Start date should be earlier than end date.'}/>}
        </div>
        <div className="col-md-6">
          <LabelField title={`End date`} />
          <DateField
            name={'endDate'}
            value={state.endDate}
            id={'endDate_id'}
            className={'col-md-12'}
            handleChange={(e) => handleChange(e, 1)}
          />
        </div>
      </div>
      <div className="col-md-12 row">
        <div className="col-md-6">
          <LabelField title={`Employer`}/>
          <MultiSelectField
            options={employers}
            standards={employers.filter(val => val.value === state.employerId)}
            handleChange={(e) => onSelect(e, 1)}
            isMulti={false}
            className="col-md-12"
            placeholder={'Select employer'}
          />
        {state.employerWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
        <div className="col-md-6">
          <LabelField title={`Company`} />
          <MultiSelectField
            options={state.employerId ? companies[state.employerId] : []}
            standards={state.employerId && companies[state.employerId] ? companies[state.employerId].filter(val => val.value === state.companyId) : []}
            handleChange={(e) => onSelect(e, 2)}
            isMulti={false}
            className="col-md-12"
            placeholder={'Select company'}
          />
        {state.companyWarning && <ValidateMessage style={{margin:0}} text = {'This field is required.'}/>}
        </div>
        <div className="col-md-6">
          <CheckBoxField
              id={'link_to_sv'}
              tick={state.linkToCooperationAgreement}
              disabled={false}
              onCheck={(e) => handleChange(e, 2)}
              name={`Link to cooperation agreeemnt.`}
              customStyle={{margin: '10px 0', cursor:'pointer'}}
              className="col-md-12"
            />
        </div>
      </div>
      <div className="text-end">
      <button onClick={() => handleSave(1)} type="button" className="btn btn-dark pcp_btn"> Save as draft </button>
      <button onClick={() => handleSave()} type="button" className="btn btn-dark pcp_btn"> Send to employer </button>
      </div>
      <button onClick={() => router.back()} type="button" className="btn btn-dark pcp_btn col-1">
        {`Back`}
      </button>
      </div>
    </div>
  </>
}
export default React.memo(EditUpdateAdditionalDoc);
