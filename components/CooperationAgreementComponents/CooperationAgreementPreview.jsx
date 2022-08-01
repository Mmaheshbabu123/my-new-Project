import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { cooperationAgreementPreview, sendToEmployer, updateEmployerSign } from '@/Services/ApiEndPoints';
import styles from './CooperationAgreement.module.css'
import CheckBoxField from '@/atoms/CheckBoxField';

const CooperationAgreementPreview = ({ rootParentId, salesAgentRefId, employerRefId }) => {
  const router = useRouter();
  const { type, approved }  = router.query;
  const [state, setState] = useState({
    approved: Number(approved),
    alertSuccess: false,
    iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&approved=${0}`,
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
    setState({...state, approved: approved, iframeUrl: `${cooperationAgreementPreview}/${rootParentId}?type=${type}&entityid=${employerRefId}&approved=${approved}`})
  }

  /**
   * [forwardToApproveProcess description]
   * @return {Promise} [description]
   */
  const forwardToApproveProcess = async () => {
    let url = Number(type) === 2 ? updateEmployerSign : sendToEmployer;
    await APICALL.service(url, 'POST', { salesAgentRefId, employerRefId, rootParentId, approved }).then(response => {
      if (response.status === 200) {
         setState({...state, alertSuccess: true})
         setTimeout(() => window.close(), 1500);
      }
    }).catch((error) => console.log(error) )
  }


  return(
    <div className="">
      {state.alertSuccess === true && <div className="alert alert-success" role="alert">
        {Number(type) !== 2 ? `Sign added and forwarded to employer` : 'Approved successfully'}
      </div>}
      <div>
        <iframe src={state.iframeUrl} height={screen.height - 400} width={screen.width - 200} />
      </div>
      <div className = {`${styles['term_and_conditions_class']} row`}>
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
    </div>
    </div>
  );
}

export default CooperationAgreementPreview;
