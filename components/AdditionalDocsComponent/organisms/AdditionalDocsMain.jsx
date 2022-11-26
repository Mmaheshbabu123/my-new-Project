import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdditionalDocsOverview  from '../molecules/AdditionalDocsOverview';
import EditUpdateAdditionalDoc  from '../molecules/EditUpdateAdditionalDoc';
import V1DocumentsOverview  from '@/components/V1Document/molecules/V1DocumentsOverview';
import { fetchAdditionalDocuments } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import styles from '../molecules/AdditionalDocsOverview.module.css';

const AdditionalDocsMain = (props) => {
  const { entityType, entityId, action, editId } = props;
  const router = useRouter();
  const { tab = 1 } = router.query;
  const [state, setState] = useState({
      overviewData: []
    , loaded: false
    , employers: []
    , companies: {}
    , assignedData: {}
    , headers: ['Document name', 'Employer', 'Company', 'Start date', 'End date', 'Link to cooperation agreement', 'Actions']
    , documentDetails: {}
    , selectedTabId: Number(tab) || 1,
  })

  useEffect(() => {  fetchData() }, [state.selectedTabId, action])

  /**
   * [fetchData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    if(state.selectedTabId === 1) {
      await APICALL.service(`${fetchAdditionalDocuments}/${entityId}/${entityType}/${editId}/${action}`, 'GET').then(response => {
        if (response.status === 200)
          setState({...state,
            overviewData: response.data.overviewData ? response.data.overviewData :[],
            loaded: true,
            companies: response.data.companies || {},
            employers: response.data.employers || [],
            documentDetails: response.data.documentDetails || {}
          });
      }).catch(error => console.error(error))
    }
  }

  const showTabs = () => {
    let { selectedTabId } = state;
    return (
     <div className='row position-sticky-subhead py-4'>
       <div className='col-md-12'>
       <ul className={`${styles['docs-overview-tabs']}  m-0`}>
        <li className='manage-cooperation-tabs'> <span id = {1} className={`${selectedTabId === 1 ? styles['underline'] : ''}`} onClick={handleTabClick}> Additional documents </span> </li>
        {Number(entityType) === 1 && <li className='manage-cooperation-tabs'> <span id = {2} className={`${selectedTabId === 2 ? styles['underline'] : ''}`} onClick={handleTabClick}> V1 documents </span> </li>}
      </ul>
       </div>
     </div>
    );
  }

  const handleTabClick = ({ target: { id } }) => {
    router.push(`?entitytype=${entityType}&entityid=${entityId}&tab=${id}`, undefined, { shallow: true })
    let selectedTabId = Number(id);
    setState({...state, selectedTabId });
  }

  return (
    <div>
    {state.loaded === true || state.selectedTabId === 2 ?
          <div className="col-md-12">
              <h4 className='py-4 font-weight-bold px-0 bitter-italic-normal-medium-24 position-sticky-pc'> {`Manage my documents`} </h4>
              {action === 0 && showTabs()}

              {state.selectedTabId === 2  && <V1DocumentsOverview /> }

              {state.selectedTabId === 1 && <> {   action !== 0  ?
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
                      companies={state.companies}
                      employers={state.employers}
                    />
                } </>}
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(AdditionalDocsMain);
