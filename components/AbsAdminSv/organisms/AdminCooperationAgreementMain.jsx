import React, { useState, useEffect } from 'react';
import RequestOverviewData  from '../molecules/RequestOverviewData';
import styles from '../molecules/AbsAdminSv.module.css';
import { fetchRequestOverview } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const AdminCooperationAgreementMain = (props) => {

  const [state, setState] = useState({
      overviewData: []
    , loaded: false
    , salesAgentArray: [{id: 123, name: 'Agent 123'},{id: 321, name: 'Agent tina'}],
  })

  useEffect(() => {  fetchData() }, [])
  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${fetchRequestOverview}`, 'GET').then(response => {
      if (response.status === 200)
        setState({...state, overviewData: response.data || [], loaded: true });
    }).catch(error => console.error(error))
  }

  return (
    <div>
    {state.loaded === true ?
          <div className="col-md-12 row">
          <h4 className={`${styles['employer-sv-page-title']}`}> Manage cooperation agreement requests</h4>
              <RequestOverviewData overviewData={state.overviewData} salesAgentArray={state.salesAgentArray}/>
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(AdminCooperationAgreementMain);
