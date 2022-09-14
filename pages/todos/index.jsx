import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const TodosComponent = dynamic(() => import('@/components/Todos/organisms/TodosComponent'), { suspense: true });

const TodoIndex = (props) => {
  const router = useRouter();
  const { entitytype, entityid } = router.query;
  return (
    <div>
      <Suspense fallback={`Loading...`}>
          {entityid !== undefined ?
            <TodosComponent entityType={Number(entitytype)} entityId = {Number(entityid)}/>
            :
            null
          }
      </Suspense>
    </div>
  )
}
export default React.memo(TodoIndex);
