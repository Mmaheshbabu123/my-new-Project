import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const AdditionalDocsMain = dynamic(() => import('@/components/AdditionalDocsComponent/organisms/AdditionalDocsMain'), { suspense: true });

const ManageDocumentIndex = (props) => {
  const router = useRouter();
  const { entitytype, entityid, action = 0, id = 0 } = router.query;
  if (entityid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
            <AdditionalDocsMain
                entityType={entitytype}
                entityId = {entityid}
                action={Number(action)}
                editId={id}
            />
        </Suspense>
      </div>
    )
  else return (<>  </>);
}

export default ManageDocumentIndex;
