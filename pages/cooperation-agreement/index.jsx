import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCooperationAgreementsTabs } from '@/Services/ApiEndPoints';
import CooperationAgreementStates from '@/Contexts/CooperationAgreement/CooperationAgreementStates';
const CooperationAgreementMain = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementMain'),
  { suspense: true }
);

const CooperationAgreement = (props) => {
  const router = useRouter();
  const { root_parent_id, selectedTabId } = router.query;
  if (root_parent_id !== undefined)
    return (
      <CooperationAgreementStates>
        <Suspense fallback={`Loading...`}>
          <CooperationAgreementMain
              corporateAgreementId={root_parent_id}
              cooperTabs = {props.data}
              selectedTabParam={selectedTabId}
         />
        </Suspense>
      </CooperationAgreementStates>
    )
  else return (<>  </>);
}

//------SERVER SIDE RENDERING-------//
export async function getStaticProps() {
  const response = await fetch(getCooperationAgreementsTabs);
  const data = await response.json();
  return { props: { data: data.status === 200 ? data.data: [] } }
}

export default CooperationAgreement;
