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
    , salesAgentUpdates: {}
    , alreadyRequestedCompanies: []
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
      , salesAgentUpdates: data.salesAgentData || {}
      , loaded: true
    })
  }

  return (
    <div>
    {state.loaded === true ?
          <div className="col-md-12 row">
          <h1 className={`${styles['employer-sv-page-title']} text-center page-title`}> Manage agreements </h1>
              <OverviewPage state={state} setState={setState} companyLength={state.companies.length}/>
              {state.companies &&
                <RequestAgreement state={state} setState={setState} employer_id = {props.employerid} />}
          </div>
        : <p>Loading...</p>}
    </div>
  );
}

export default React.memo(EmployerCooperationAgreementMain);
