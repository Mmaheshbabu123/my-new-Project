import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { COOPERATION_TABS_JSON } from '@/components/CooperationAgreementComponents/Definations';
import CooperationAgreementStates from '@/Contexts/CooperationAgreement/CooperationAgreementStates';
import AccessDenied from '@/atoms/AccessDenied';
const CooperationAgreementMain = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementMain'),
  { suspense: true }
);

const CooperationAgreement = (props) => {
  const router = useRouter();
  const { root_parent_id, selectedTabId, ref_id = 0 } = router.query;
  if (root_parent_id !== undefined)
    return (
      <CooperationAgreementStates>
        {accessCheck(ref_id) === 200 ?
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

function accessCheck(ref_id) {
  return 200;
}

export default CooperationAgreement;
