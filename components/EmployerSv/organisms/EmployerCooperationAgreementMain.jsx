import React, { useState, useEffect } from 'react';
import OverviewPage  from '../molecules/OverviewPage';
import RequestAgreement  from '../molecules/RequestAgreement';
import styles from '../molecules/EmployerSv.module.css';
import { fetchCompaniesBasedOnEmployer } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const EmployerCooperationAgreementMain = (props) => {

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
    await APICALL.service(`${fetchCompaniesBasedOnEmployer}/${props.employerid}`, 'GET').then(response => {
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
        companies: data.companies || {}
      , overviewData: data.overviewData || []
      , loaded: true
    })
  }

  return (
    <div>
    {state.loaded === true ?
          <div className="col-md-12 row">
          <h4 className={`${styles['employer-sv-page-title']}`}> Manage employer cooperation agreement </h4>
              <OverviewPage state={state} setState={setState}/>
              {state.companies && Object.keys(state.companies).length > 0 &&
                <RequestAgreement state={state} setState={setState} employer_id = {props.employerid} />}
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(EmployerCooperationAgreementMain);
