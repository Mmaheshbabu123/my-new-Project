import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const SignatureMain = dynamic(() => import('@/components/SignatureFlow/organisms/SignatureMain'), { suspense: true });

const ManageSignatureIndex = (props) => {
  const router = useRouter();
  const { entitytype, entityid } = router.query;
  if (entityid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
            <SignatureMain entityType={entitytype} entityId = {entityid}/>
        </Suspense>
      </div>
    )
  else return (<>  </>);
}

export default ManageSignatureIndex;
