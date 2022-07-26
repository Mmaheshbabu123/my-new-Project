import React, { useState, useEffect } from 'react';
import SignatureDetails from '../molecules/SignatureDetails';
import { APICALL } from '@/Services/ApiServices';
import { getSignatureData, storeUpdateSignatureData } from '@/Services/ApiEndPoints';

const SignatureMain = ({ entityId, entityType }) => {
  const entityTypeId = entityType === 'absolute_you_admin_config_user' ? 1 : entityType === 'employeer' ? 2 : entityType === 'employee' ? 3 : -999;
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

  const postObj = (signData) => {return { sign: signData, entity_id: entityId, entity_type: entityTypeId }}

  return (
    <div>
    {state.loaded === true ?
        <SignatureDetails state = {state} setState = {setState} submitSignData={submitSignData}/>
    : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(SignatureMain);
