import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { labourShareDocPreview, updateEmployerSignOnLabourDoc } from '@/Services/ApiEndPoints';
import customAlert from '@/atoms/customAlert';
import CheckBoxField from '@/atoms/CheckBoxField';

const LabourShareDocPreview = ({ userId, preview = 0, approved = 0 }) => {
  const router = useRouter();
  approved = Number(approved);
  const [ state, setState ] = useState({
    approved: approved,
    iframeUrl: `${labourShareDocPreview}/${userId}?approved=${0}&preview=${preview}`,
  })

  /**
   * [handleCheckbox description]
   * @param  {int} target               [description]
   * @return {void}        [description]
   */
  const handleCheckbox = ({ target: { checked } }) => {
    let approved = checked ? 1 : 0;
    setState({...state,
      approved: approved,
      iframeUrl: `${labourShareDocPreview}/${userId}?approved=${approved}&preview=${preview}`})
  }

  /**
   * [forwardToApproveProcess description]
   * @return {Promise} [description]
   */
  const forwardToApproveProcess = async () => {
    await APICALL.service(updateEmployerSignOnLabourDoc, 'POST', getDataToPost({
      approved:state.approved,
      entityId: userId
    })).then(response => {
        if (response.status === 200) {
          customAlert('success', 'Request sent successfully!', 2000); //no of milliseconds
          router.push(`/todos?entitytype=2&entityid=${userId}&tab=2`)
        } else
           customAlert('error', 'Error occured while requesting cooperation agreement', 2000); //no of milliseconds
    }).catch((error) => console.log(error) )
  }

  return (
    <div>
      <div>
        <iframe src={state.iframeUrl} height={screen.height - 400} width={screen.width - 200} />
      </div>
      {!preview && <div className = "row" style={{margin: '15px 0'}}>
        <CheckBoxField
         id={'approved_check'}
         tick={state.approved}
         onCheck={handleCheckbox}
         name={`I hereby declare that I have reviewed the document and confirming that I agree with all details.`}
         customStyle={{margin: '2px 0', cursor:'pointer'}}
         className="col-md-8 py-3"
       />
       {state.approved === 1 &&
         <div className="col-md-2 text-end">
           {state.signAsEmployer === 1 && <button onClick={() => forwardToApproveProcess(1)} type="button" className="btn btn-dark pcp_btn"> {'Approve'} </button>}
         </div>
       }
     </div>}
    </div>
  );
}
export default React.memo(LabourShareDocPreview);
