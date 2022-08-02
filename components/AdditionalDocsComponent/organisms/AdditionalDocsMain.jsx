import React, { useState, useEffect } from 'react';
import AdditionalDocsOverview  from '../molecules/AdditionalDocsOverview';
import EditUpdateAdditionalDoc  from '../molecules/EditUpdateAdditionalDoc';
import styles from '../molecules/AdditionalDocsOverview.module.css';
import { fetchAdditionalDocuments } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const AdditionalDocsMain = (props) => {
  const { entityType, entityId, action, editId } = props;
  const [state, setState] = useState({
      overviewData: []
    , loaded: false
    , employers: []
    , companies: {}
    , assignedData: {}
    , headers: ['Document title', 'Start date', 'End date', 'Link to cooperation agreeemnt', 'Actions']
    , documentDetails: {}
  })

  useEffect(() => {  fetchData() }, [action])

  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${fetchAdditionalDocuments}/${entityId}/${entityType}/${editId}/${action}`, 'GET').then(response => {
      if (response.status === 200)
        setState({...state,
          overviewData: response.data.overviewData ? Object.values(response.data.overviewData) :[],
          loaded: true,
          companies: response.data.companies || {},
          employers: response.data.employers || [],
          documentDetails: response.data.documentDetails || {}
        });
    }).catch(error => console.error(error))
  }

  return (
    <div>
    {state.loaded === true ?
          <div className="col-md-12">
              <h4 className={`page-title-font-class text-center`}> {`${action === 0 ? 'Manage additional documents'
                : Number(editId) ? 'Edit additional document': 'Add additional document'}`}</h4>
              {   action !== 0  ?
                  <EditUpdateAdditionalDoc
                    entityType={Number(entityType)}
                    entityId = {Number(entityId)}
                    editId={Number(editId)}
                    documentDetails={state.documentDetails[Number(editId)] || {}}
                    companies={state.companies}
                    employers={state.employers}
                  /> :
                  <AdditionalDocsOverview
                    entityType={Number(entityType)}
                    entityId = {Number(entityId)}
                    rows={state.overviewData}
                    headers={state.headers}
                  />
              }
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(AdditionalDocsMain);
