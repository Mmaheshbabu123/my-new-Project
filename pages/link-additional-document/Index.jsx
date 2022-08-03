import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const LinkAdditionalDocs = (props) => {
  const router = useRouter();
  const { root_parent_id, ref_id =0 } = router.query;
  if (root_parent_id !== undefined)
    return (
        <Suspense fallback={`Loading...`}>
          <p>show magage page </p>
        </Suspense>
    )
  else return (<>  </>);
}
export default LinkAdditionalDocs;
