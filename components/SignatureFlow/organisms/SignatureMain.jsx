import React, { useState, useEffect } from 'react';
import SignatureDetails from '../molecules/SignatureDetails';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { getSignatureData, storeUpdateSignatureData, deleteSignatureData } from '@/Services/ApiEndPoints';

const SignatureMain = ({ entityId, entityType }) => {
  const router = useRouter();
  const entityTypeId = Number(entityType);
  const [state, setState] = useState({
    loaded: false,
    sign: '',
    showPopup: false,
    disabled: false,
  });

  useEffect(() => {  fetchData() }, [])
  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${getSignatureData}/${entityId}/${entityTypeId}`, 'GET').then(response => {
      if (response.status === 200)
        setState({...state,
          sign: response.data ? response.data.sign || '' : '',
          loaded: true
        });
    }).catch(error => console.error(error))
  }

  const submitSignData = async (signData) => {
    await APICALL.service(`${storeUpdateSignatureData}`, 'POST', postObj(signData))
    .then(response => {
      if (response.status === 200)
        setState({...state,
          sign:signData,
          showPopup: false,
          loaded: true
        });
    }).catch(error => console.error(error))
  }

  const eraseSignature = async () => {
    await APICALL.service(`${deleteSignatureData}/${entityId}/${entityTypeId}`, 'DELETE').then(response => {
      if (response.status === 200)
        setState({...state, sign: '' });
    }).catch(error => console.error(error))
  }


  const postObj = (signData) => {return { sign: signData, entity_id: entityId, entity_type: entityTypeId }}

  return (
    <div>
    {state.loaded === true ?
      <>
        <h4 className={`page-title-font-class text-center page-title`}> Manage signature</h4>
        <SignatureDetails state = {state} setState = {setState} submitSignData={submitSignData} eraseSignature={eraseSignature}/>
        <button onClick={() => router.back()} type="button" className="btn btn-dark pcp_btn col-1">
          {`Back`}
        </button>
      </>
    : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(SignatureMain);
