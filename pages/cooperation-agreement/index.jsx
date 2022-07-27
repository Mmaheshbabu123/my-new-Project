import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { COOPERATION_TABS_JSON } from '@/components/CooperationAgreementComponents/Definations';
import CooperationAgreementStates from '@/Contexts/CooperationAgreement/CooperationAgreementStates';
const CooperationAgreementMain = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementMain'),
  { suspense: true }
);

const CooperationAgreement = (props) => {
  const router = useRouter();
  const { root_parent_id, selectedTabId, ref_id =0 } = router.query;
  if (root_parent_id !== undefined)
    return (
      <CooperationAgreementStates>
        <Suspense fallback={`Loading...`}>
          <CooperationAgreementMain
              corporateAgreementId={root_parent_id}
              cooperTabs = {props.data}
              selectedTabParam={selectedTabId}
              salesAgentRefId = {ref_id}
         />
        </Suspense>
      </CooperationAgreementStates>
    )
  else return (<>  </>);
}

//------SERVER SIDE RENDERING-------//
export async function getStaticProps() {
  // const response = await fetch(getCooperationAgreementsTabs); //
  // const data = await response.json();
  return { props: { data: COOPERATION_TABS_JSON } }
}

export default CooperationAgreement;
