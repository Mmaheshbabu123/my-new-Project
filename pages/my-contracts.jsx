import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const MyContractsMain = dynamic(() => import('@/components/MyContracts/MyContractsMain'), { suspense: true });

const MyContracts = ( props ) => {
  const router = useRouter();
  const { entitytype, entityid } = router.query;
  if (entityid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
            <MyContractsMain
                entityType={entitytype}
                entityId = {entityid}
            />
        </Suspense>
      </div>
    )
  else return (<>  </>);
}
export default React.memo(MyContracts);
