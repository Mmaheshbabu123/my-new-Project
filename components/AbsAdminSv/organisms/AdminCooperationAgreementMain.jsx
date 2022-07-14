import React, { useState, useEffect } from 'react';
import RequestOverviewData  from '../molecules/RequestOverviewData';
import styles from '../molecules/AbsAdminSv.module.css';
import { fetchRequestOverview } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const AdminCooperationAgreementMain = (props) => {

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
          <div className="col-md-12 row">
          <h4 className={`${styles['employer-sv-page-title']} text-center page-title`}> Manage cooperation agreements</h4>
              <RequestOverviewData assignedData={state.assignedData} overviewData={state.overviewData} salesAgentArray={state.salesAgentArray}/>
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(AdminCooperationAgreementMain);
