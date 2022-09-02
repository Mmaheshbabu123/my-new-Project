import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { cooperationAgreementPreview, sendToEmployer, updateEmployerSign,
  checkEmployerSignature, storeUpdateSignatureData
} from '@/Services/ApiEndPoints';
import styles from './CooperationAgreement.module.css'
import CheckBoxField from '@/atoms/CheckBoxField';
import SignatureDetails from '@/components/SignatureFlow/molecules/SignatureDetails';
import EmployerAuthenticModal from './EmployerAuthenticModal';

let timeOutRef;
const CooperationAgreementPreview = ({ rootParentId, salesAgentRefId, employerRefId, preview = 0 }) => {
  const router = useRouter();
  let { type, approved }  = router.query;
  type = Number(type);
  approved = Number(approved);
  const [state, setState] = useState({
    approved: approved,
    alertSuccess: false,
    employerAddedSign: 0,
    signAsEmployer: 0,
    sign: '',
    showPopup: false,
    employerId: 0,
    authenticModal: false,
    authenticated: 0,
    iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&approved=${0}&preview=${preview}&employer_id=${0}`,
  });


  useEffect(() => {
    document.querySelectorAll('.clip0,.clip1').forEach(el => el.style['display'] = 'none');
    type === 1 ? checkForEmployerSignature() : null;

    return () => {
      clearTimeout(timeOutRef);
    }
  }, [])


  const checkForEmployerSignature = async () => {
    await APICALL.service(`${checkEmployerSignature}/${salesAgentRefId}`, 'GET')
    .then(response => {
      if(response.status === 200) {
        setState({...state,
          employerAddedSign: response.data.signData || 0,
          employerId: response.data.employerId || 0,
          employerMail: response.data.mail || '',
          oldpass: response.data.oldpass || '',
        })
      }
    })
  }

  const signAsEmployer = () => {
    if(state.employerAddedSign) {
      setState({...state,
        signAsEmployer: 1,
        authenticated: 1,
        authenticModal: false,
        iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&approved=${1}&preview=${0}&employer_id=${state.employerId}`
      })
     } else {
       setState({...state, showPopup: true, authenticated: 1, authenticModal: false })
    }
   }

  const checkAuthenticateEmployer = () => {
    state.authenticated !== 1 ?
      setState({...state, authenticModal: true}) :
      signAsEmployer();
  }

  const submitSignData = async (signData) => {
    await APICALL.service(`${storeUpdateSignatureData}`, 'POST', { sign: signData, entity_id: state.employerId, entity_type: 2 })
    .then(response => {
      if (response.status === 200) {
        setState({...state,
          showPopup: false,
          signAsEmployer: 1,
          iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&approved=${1}&preview=${0}&employer_id=${state.employerId}`,
        })
      }
    }).catch(error => console.error(error))
  }

  /**
   * [handleCheckbox description]
   * @param  {int} target               [description]
   * @return {void}        [description]
   */
  const handleCheckbox = ({ target: { checked } }) => {
    let approved = checked ? 1 : 0;
    setState({...state,
      approved: approved,
      signAsEmployer: approved === 0 ? 0 : state.signAsEmployer,
      iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&entityid=${employerRefId}&approved=${approved}&preview=${preview}`})
  }
  /**
   * [forwardToApproveProcess description]
   * @return {Promise} [description]
   */
  const forwardToApproveProcess = async (from = 0, setObj = {}) => {
    let url = type === 2 ? updateEmployerSign : sendToEmployer;
    await APICALL.service(url, 'POST', getDataToPost(from)).then(response => {
      if (response.status === 200) {
         setState({...state, alertSuccess: true, showPopup: false, ...setObj })
         timeOutRef = setTimeout(() => window.open(process.env.NEXT_PUBLIC_APP_URL_DRUPAL, '_self'), 3000);
      } else {
        setState({...state, alertWarning: true, showPopup: false, ...setObj})
        timeOutRef = setTimeout(() => setState({...state, alertWarning: false }), 3000);
      }
    }).catch((error) => console.log(error) )
  }

  const getDataToPost = (from) => {
    return {
      salesAgentRefId,
      employerRefId,
      rootParentId,
      type,
      entityid: employerRefId,
      approved:state.approved,
      employer_id: from ? state.employerId || 0 : 0,
    }
  }

  return(
    <div className="">
      {state.alertSuccess === true && <div className="alert alert-success text-center" role="alert">
        {state.signAsEmployer === 0 && type !== 2 ? `Admin signature added on PDF and cooperation agreement sent to employer.` : 'Approved successfully.'}
      </div>}
      {state.alertWarning === true && <div className="alert alert-danger text-center" role="alert">
        {type !== 2 ? `Admin signature has not been added yet, please contact the admin.` : `You haven't added any signature yet, please add it.`}
      </div>}
      <div>
        <iframe src={state.iframeUrl} height={screen.height - 400} width={screen.width - 200} />
      </div>
      {!preview && <div className = {`${styles['term_and_conditions_class']} row`}>
        <CheckBoxField
         id={'approved_check'}
         tick={state.approved}
         onCheck={handleCheckbox}
         name={`I hereby declare that I have reviewed the document and confirming that I agree with all details.`}
         customStyle={{margin: '2px 0', cursor:'pointer'}}
         className="col-md-8 py-3"
       />
       {state.approved === 1 && state.signAsEmployer !== 1 ?
         <>
             <div className="col-md-2 text-end">
               <button onClick={() => forwardToApproveProcess()} type="button" className="btn btn-dark pcp_btn"> {type === 2 ? 'Approve' : 'Send to employer'} </button>
             </div>
             <div className="col-md-2 text-end">
              {type === 1 && <button onClick={checkAuthenticateEmployer} type="button" className="btn btn-dark pcp_btn"> {'Sign as employer'} </button>}
             </div>
              {type === 1 && <SignatureDetails state = {state} setState = {setState} submitSignData={submitSignData} fromSvPreview={1} />}
          </>
         :
         <div className="col-md-2 text-end">
           {state.signAsEmployer === 1 && <button onClick={() => forwardToApproveProcess(1)} type="button" className="btn btn-dark pcp_btn"> {'Approve'} </button>}
         </div>
       }
     </div>}
     <EmployerAuthenticModal props={state} allowEmployerSignature={signAsEmployer}close={()=>setState({...state, authenticModal: false})} />
    </div>
  );
}

export default React.memo(CooperationAgreementPreview);
