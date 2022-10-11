import React, { useEffect, useState } from 'react';
import styles from '../molecules/Notification.module.css'
import notificationSvg from '../molecules/notification.svg';
import notificationExists from '../molecules/notification.svg';
import { useRouter } from 'next/router';
import NotificationView from '../molecules/NotificationView';
import {
  getNotificationsCount,
  getNotifications,
  updateNotificationStatus,
  deleteNotifications
} from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const INITIAL_COUNT = 4; //only 5 notifcations we will fetch
const NotificationMain = ( props ) => {
    const router  = useRouter();
    const { entityid = 0, id = 0} = router.query;
    const entityId = entityid || id;
    const [notificationView, setNotificationView] = useState(false);
    const [state, setState] = useState({
      notificationCount: 0,
      loading: false,
      notificationsList: [],
      refresh: 0,
    });

    useEffect( () => { loadData(INITIAL_COUNT) }, [Number(entityId), notificationView])

    const loadData = async (count = 0) => {
      if(entityId) {
        let url = notificationView ? getNotifications : getNotificationsCount;
        await APICALL.service(`${url}/${entityId}?fetch=${count}`, 'GET').then(res =>{
          if(res.status === 200) {
            setState({...state,
              [notificationView ? 'notificationsList' : 'notificationCount']: res.data,
              loading: true,
              refresh: !state.refresh
            })
          } else {
            console.error('error occured');
          }
        }).catch(error => console.error(error))
      }
    }

    const updateStatusInBackend = async (url, type, postdata = {}) => {
      postdata['request_type'] = type;
      await APICALL.service(url, 'POST', postdata).then(response => console.log(response))
      .catch(error => console.error(error))
    }

    const toggleNotificationView = () => {
      setNotificationView(!notificationView);
    }

    const updateNotifications = async (type, obj) => {
      let stateObj = {...state};
      if(type === 'single' && obj['seen_by_user'] === 0) {
        obj['seen_by_user'] = 1;
        await updateStatusInBackend(updateNotificationStatus, type, obj);
        stateObj['notificationCount'] = state.notificationCount - 1;
      } else if (type === 'readAll') {
        await updateStatusInBackend(updateNotificationStatus, type, {user_to_notify: entityId});
        stateObj['notificationsList'].map(eachItem => {  eachItem['list'].map(eachNotifn => eachNotifn['seen_by_user'] = 1) })
        stateObj['refresh'] = !stateObj['refresh'];
        stateObj['notificationCount'] = 0;
      } else if(type === 'deleteAll') {
        await updateStatusInBackend(deleteNotifications, type, {user_to_notify: entityId});
        stateObj['notificationCount'] = 0;
        stateObj['notificationsList'] = [];
        setTimeout(() => toggleNotificationView(), 500) ;
      }
      setState(stateObj);
    }

    return (
      <>
        <div className={styles["notification"]} style={{ position: "relative" }}>
          <div title="Notifications" className={styles["iconSection"]} style={{ cursor: "pointer"}} onClick={toggleNotificationView}>
            <img
              alt={"Notification"}
              src={Number(state.notificationCount) > 0 ? notificationExists.src : notificationSvg.src}
              style={{ width: '22px' }}
            ></img>
           {/*state.loading === true && Number(state.notificationCount) > 0 && <span className={styles["iconBadge"]}>{state.notificationCount}</span>*/}
          </div>
        </div>
        {notificationView === true &&
          <NotificationView
              updateNotifications={updateNotifications}
              notificationsList = {state.notificationsList}
              toggleNotificationView = {toggleNotificationView}
              loadAllNotifications = {loadData}
          />}
      </>
    );
}
export default React.memo(NotificationMain);
