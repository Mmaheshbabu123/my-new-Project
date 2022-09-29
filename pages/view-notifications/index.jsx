import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const NotificationMain = dynamic(() => import('@/components/Notifications/organism/NotificationMain'), { suspense: true });

const NotificationIndex = (props) => {
  const router = useRouter();
  const { entityid } = router.query;
  if (entityid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
            <NotificationMain notificationView = {1}/>
        </Suspense>
      </div>
    )
  else return (<>  </>);
}

export default NotificationIndex;
