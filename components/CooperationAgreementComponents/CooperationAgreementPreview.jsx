import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { cooperationAgreementPreview, sendToEmployer, updateEmployerSign } from '@/Services/ApiEndPoints';
import styles from './CooperationAgreement.module.css'
import CheckBoxField from '@/atoms/CheckBoxField';

const CooperationAgreementPreview = ({ rootParentId, salesAgentRefId, employerRefId, preview = 0 }) => {
  const router = useRouter();
  const { type, approved }  = router.query;
  const [state, setState] = useState({
    approved: Number(approved),
    alertSuccess: false,
    iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&approved=${0}&preview=${preview}`,
  });


  useEffect(() => {
    document.querySelectorAll('.clip0,.clip1').forEach(el => el.style['display'] = 'none');
  }, [])

  /**
   * [handleCheckbox description]
   * @param  {int} target               [description]
   * @return {void}        [description]
   */
  const handleCheckbox = ({ target: { checked } }) => {
    let approved = checked ? 1 : 0;
    setState({...state,
      approved: approved,
      iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&entityid=${employerRefId}&approved=${approved}&preview=${preview}`})
  }

  /**
   * [forwardToApproveProcess description]
   * @return {Promise} [description]
   */
  const forwardToApproveProcess = async () => {
    let url = Number(type) === 2 ? updateEmployerSign : sendToEmployer;
    await APICALL.service(url, 'POST', getDataToPost()).then(response => {
      if (response.status === 200) {
         setState({...state, alertSuccess: true})
         setTimeout(() => window.close(), 1500);
      } else {
        setState({...state, alertWarning: true})
        setTimeout(() => setState({...state, alertWarning: false }), 3000);
      }
    }).catch((error) => console.log(error) )
  }

  const getDataToPost = () => {
    return {
      salesAgentRefId,
      employerRefId,
      rootParentId,
      type,
      entityid: employerRefId,
      approved:state.approved
    }
  }

  return(
    <div className="">
      {state.alertSuccess === true && <div className="alert alert-success text-center" role="alert">
        {Number(type) !== 2 ? `Admin signature added on PDF and cooperation agreement sent to employer.` : 'Approved successfully.'}
      </div>}
      {state.alertWarning === true && <div className="alert alert-danger text-center" role="alert">
        {Number(type) !== 2 ? `Admin signature has not been added yet, please contact the admin.` : `You haven't added any signature yet, please add it.`}
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
         className="col-md-9 py-3"
       />
       {state.approved === 1 && <div className="col-md-3">
        <button onClick={forwardToApproveProcess} type="button" className="btn btn-dark pcp_btn"> {Number(type) === 2 ? 'Approve' : 'Send to employer'} </button>
      </div>}
    </div>}
    </div>
  );
}

export default React.memo(CooperationAgreementPreview);
