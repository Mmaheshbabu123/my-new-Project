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
   * [fetchData description]
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
        <div className='py-4 position-sticky-pc px-0'>
          <h4 className='font-weight-bold px-0  bitter-italic-normal-medium-24'> Manage signature </h4>
        </div>
        <SignatureDetails state = {state} setState = {setState} submitSignData={submitSignData} eraseSignature={eraseSignature}/>
        <button onClick={() => router.back()} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-5 mb-5 ps-0 text-decoration-underline text-uppercase">
          {`BACK`}
        </button>
      </>
    : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(SignatureMain);
