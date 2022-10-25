import React, { useState, useEffect } from 'react';
import RequestOverviewData  from '../molecules/RequestOverviewData';
import styles from '../molecules/AbsAdminSv.module.css';
import { fetchRequestOverview } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import Translation from '@/Translation';
const AdminCooperationAgreementMain = (props) => {
  const {t} = props;
  const [state, setState] = useState({
      overviewData: []
    , loaded: false
    , salesAgentArray: []
    , assignedData: {}
  })

  useEffect(() => {  fetchData() }, [])
  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${fetchRequestOverview}`, 'GET').then(response => {
      if (response.status === 200)
        setState({...state,
          overviewData: response.data.overviewData || [],
          salesAgentArray: response.data.salesAgentArray,
          assignedData: response.data.assignedData || {},
          loaded: true
        });
    }).catch(error => console.error(error))
  }

  return (
    <div>
    {state.loaded === true ?
          <div className='row'>
            <div className="col-md-12">
          <h4 className={`${styles['employer-sv-page-title']} page-title bitter-italic-normal-medium-24 position-sticky-pc py-4`}> {t('Manage cooperation agreements')}</h4>
              <RequestOverviewData assignedData={state.assignedData} overviewData={state.overviewData} salesAgentArray={state.salesAgentArray}/>
          </div>
            </div>
        : <p>{t('Loading...')}</p>}
    </div>
  );
}

export default React.memo(Translation(AdminCooperationAgreementMain,['Manage cooperation agreements','Loading...']));
