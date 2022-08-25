import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { COOPERATION_TABS_JSON } from '@/components/CooperationAgreementComponents/Definations';
import { APICALL } from '@/Services/ApiServices';
import { checkAccess } from '@/Services/ApiEndPoints';
import CooperationAgreementStates from '@/Contexts/CooperationAgreement/CooperationAgreementStates';
import AccessDenied from '@/atoms/AccessDenied';
const CooperationAgreementMain = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementMain'),
  { suspense: true }
);

const CooperationAgreement = (props) => {
  const router = useRouter();
  const [ access, setAccess ] = useState(0);
  const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;

  useEffect(() => {    if(ref_id) accessCheck(ref_id, setAccess)   },  [ref_id])


  if (root_parent_id !== undefined && access)
    return (
      <CooperationAgreementStates>
        {access === 200 ?
          <Suspense fallback={`Loading...`}>
            <CooperationAgreementMain
                corporateAgreementId={root_parent_id}
                cooperTabs = {props.data}
                selectedTabParam={selectedTabId}
                salesAgentRefId = {ref_id}
           />
          </Suspense>:
          <AccessDenied />
        }
      </CooperationAgreementStates>
    )
  else return (<>  </>);
}

//------SERVER SIDE RENDERING-------//
export async function getStaticProps() {
  return { props: { data: COOPERATION_TABS_JSON } }
}

async function accessCheck(refId, setStateRef) {
  await APICALL.service(`${checkAccess}`, 'POST', {refId, userId: localStorage.getItem('currentLoggedInUserId') || 0 })
  .then(response => {
    setStateRef(response.status);
  })
}

export default CooperationAgreement;
