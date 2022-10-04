import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const V1DocumentMain = dynamic(() => import('@/components/V1Document/organisms/V1DocumentMain'), { suspense: true });

const V1DocumentIndex = (props) => {
  const router = useRouter();
  const { entitytype, entityid, companyid, preview } = router.query;
  if (entityid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
            <V1DocumentMain entityType={entitytype} entityId = {entityid} companyId={companyid} preview={Number(preview)}/>
        </Suspense>
      </div>
    )
  else return (<>  </>);
}

export default V1DocumentIndex;
