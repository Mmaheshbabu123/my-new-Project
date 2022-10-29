import React, { useState, useEffect } from 'react';
import OverviewPage  from '../molecules/OverviewPage';
import RequestAgreement  from '../molecules/RequestAgreement';
import styles from '../molecules/EmployerSv.module.css';
import { fetchCompaniesBasedOnEmployer } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import Translation from '@/Translation';
import { useRouter } from 'next/router';

const EmployerCooperationAgreementMain = (props) => {
  const router = useRouter();
  const { t } = props;
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
   * [fetchData data]
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
         <div className='row'>
            <div className="col-md-12">
          <h1 className={`${styles['employer-sv-page-title']} page-title bitter-italic-normal-medium-24 position-sticky-pc py-4`}> {t('Manage agreements')} </h1>
              <OverviewPage state={state} setState={setState} companyLength={state.companies.length}/>
              {state.companies && state.companies.length > 0 &&
                <RequestAgreement state={state} setState={setState} employer_id = {props.employerid} />}
                <div className="row my-2">
                <div className="text-start col-md-6">
                  <button
                    type="button"
                    className="bg-white border-0 poppins-regular-18px  float-sm-right mt-3 md-5 px-0 text-decoration-underline text-uppercase"
                    onClick={() =>router.back()}
                  >
                    {t('BACK')}
                  </button>
                </div>
                </div>
          </div>
          </div>
        : <p>{t('Loading...')}</p>}
    </div>
  );
}

export default React.memo(Translation(EmployerCooperationAgreementMain,['Manage agreements','Loading...']));
