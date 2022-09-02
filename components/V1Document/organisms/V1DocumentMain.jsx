import React, { useState, useEffect, useMemo } from 'react';
import V1DocumentPreview from '../molecules/V1DocumentPreview';
import V1DocumentsOverview from '../molecules/V1DocumentsOverview';
import { APICALL } from '@/Services/ApiServices';
import { getCompaniesByEmployee, checkEmployeeCompV1Status } from '@/Services/ApiEndPoints';
import styles from '../molecules/V1Document.module.css';

const V1DocumentMain = ({ entityId, entityType, companyId, preview }) => {
  const [state, setState] = useState({
    selectedCompanyId: companyId,
    signed: 0,
    companies: [],
    loaded: false,
  })

  useEffect(() => {  fetchCompaniesOfEmployee() }, [])

  /**
   * [fetchCompaniesOfEmployee description]
   * @return {Promise} [description]
   */
  const fetchCompaniesOfEmployee = async () => {
    if(!state.selectedCompanyId && Number(entityType) !== 1) {
      await APICALL.service(`${getCompaniesByEmployee}/${entityId}`, 'GET').then(response => {
        if(response.status === 200) {
          setState({...state, companies: response.data })
        }
      }).catch(error => console.error(error))
    }
  }

  useMemo(() => {
    const checkStatus = async () => {
      if(state.selectedCompanyId  && Number(entityType) !== 1) {
        await APICALL.service(`${checkEmployeeCompV1Status}/${entityId}/${state.selectedCompanyId}`, 'GET').then(response => {
          if(response.status === 200) {
            setState({...state, signed: response.data, loaded: true })
          }
        }).catch(error => console.error(error))
      }
    }
    checkStatus();
  }, [state.selectedCompanyId])

  const showLinkedCompanies = () => {
    return (
      <>
      <h4 className={`page-title-font-class text-center page-title`}> Companies linked to employee</h4>
      <ul className={`${styles['companies-list']}`}>
        {state.companies.map(company => <li key={company.id}> <a href={`/v1-document?entityid=${entityId}&entitytype=${entityType}&companyid=${company.id}`}> {company.name} </a> </li> )}
      </ul>
      </>
    )
  }

  if(Number(entityType) === 3) {
    return (
      <div> {state.selectedCompanyId ?
        <>  {preview !== 1 && state.signed ? <p className = 'py-5 text-center lead' > You have already signed V1 document for this company </p>
            : (preview === 1 || state.loaded) === true && <V1DocumentPreview employeeId={entityId} companyId={state.selectedCompanyId} preview={preview} />}
        </> : showLinkedCompanies() }
      </div>
    );
  } else {
     return (
       <V1DocumentsOverview />
     );
  }
}

export default React.memo(V1DocumentMain);