import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const CooperationAgreementPreview = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementPreview'),
  { suspense: true }
);

const PreviewIndex = (props) => {
  const router = useRouter();
  const { root_parent_id, sales_ref = 0, emp_ref = 0 } = router.query;
  if (root_parent_id !== undefined)
    return (
        <Suspense fallback={`Loading...`}>
          <CooperationAgreementPreview
              rootParentId={root_parent_id}
              salesAgentRefId = {sales_ref}
              employerRefId = {emp_ref}
              renderOutSideOfLayout={1}
         />
        </Suspense>
    )
  else return (<>  </>);
}
export default PreviewIndex;
