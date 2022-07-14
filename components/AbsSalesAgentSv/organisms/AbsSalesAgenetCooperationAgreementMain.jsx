import React, { useState, useEffect } from 'react';
import OverviewPage  from '../molecules/Overviewpage';
import styles from '../molecules/AbsSalesAgentSv.module.css';
import { fetchSalesAgenetAgreements } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const AbsSalesAgenetCooperationAgreementMain = (props) => {

  const [state, setState] = useState({
      companies: {}
    , overviewData: []
    , selectedTabId: 1
    , status: [1, 0] // By default show all pending and signed
    , loaded: false
  })

  useEffect(() => {  fetchData() }, [])
  /**
   * [fetchEmpCoeffValueTypesData data fetching based on pcid]
   * @return {Promise} [description]
   */
  const fetchData = async () => {

    await APICALL.service(`${fetchSalesAgenetAgreements}`, 'GET').then(response => {
      if (response.status === 200)
        assignDataToStateVariables(response.data);
    })
  }

  /**
   * [assignDataToStateVariables updating data in state variables/ context state variables]
   * @param  {Object}     data  [response data from backend]
   * @return {void}      [no return]
   */
  const assignDataToStateVariables = (data) => {
    setState({...state,
       overviewData: data || []
      , loaded: true
    })
  }
  console.log(state)
  return (
    <div>
    {state.loaded === true ?
          <div className="col-md-12 row">
          <h4 className={`${styles['employer-sv-page-title']}`}> Manage sales-agent cooperation agreement </h4>
              <OverviewPage overviewData={state.overviewData} setState={setState}/>
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(AbsSalesAgenetCooperationAgreementMain);
