import React, { useEffect, useState, useContext } from 'react';
import styles from '../molecules/Notification.module.css'
import notificationSvg from '../molecules/notification.svg';
import notificationExists from '../molecules/notificationExists.svg';
// import { useRouter } from 'next/router';
import NotificationView from '../molecules/NotificationView';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import {
  getNotificationsCount,
  getNotifications,
  updateNotificationStatus,
  deleteNotifications
} from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const INITIAL_COUNT = 2; //only 2 notifcations we will fetch
const urlObject = {
  '@frontendurl_': process.env.NEXT_PUBLIC_APP_URL + '/',
  '@backendurl_': process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/'
}

const NotificationMain = ( props ) => {
  	const { contextState: { uid, roleType } } = useContext(UserAuthContext);
    const entityId = Number(uid)
    const [state, setState] = useState({
      notificationView: false,
      notificationCount: 0,
      readUnreadAllCount: 0,
      loading: false,
      notificationsList: [],
      refresh: 0,
    });

    useEffect( () => { loadData(INITIAL_COUNT) }, [Number(entityId)])

    const loadData = async (count = 0, viewState = state.notificationView) => {
      if(entityId) {
        let url = viewState ? getNotifications : getNotificationsCount;
        await APICALL.service(`${url}/${entityId}?fetch=${count}`, 'GET').then(res =>{
          if(res.status === 200) {
            setState({...state,
              [viewState ? 'notificationsList' : 'notificationCount']: res.data,
              loading: true,
              notificationView: viewState,
              readUnreadAllCount: res.readUnreadAllCount || 0,
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
      loadData(INITIAL_COUNT, !state.notificationView);
    }

    const updateNotifications = async (type, obj) => {
      let stateObj = {...state};
      if(type === 'single') {
        let updatedUrl = getRedirectionUrl(obj.uri || '');
        stateObj['notificationCount'] = state.notificationCount - 1;
        obj['seen_by_user'] === 0 ? await updateStatusInBackend(updateNotificationStatus, type, obj) : null;
        obj['seen_by_user'] = 1;
        updatedUrl ? window.open(`${updatedUrl}?entityid=${entityId}&entitytype=${roleType}`, '_self') : null;
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

    const getRedirectionUrl = (uri) => {
      var regEx = new RegExp(Object.keys(urlObject).join("|"), "gi");
      let updatedUrl = uri.replace(regEx, function(matched) {
        return urlObject[matched];
      });
      return updatedUrl;
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
           {state.loading === true && Number(state.notificationCount) > 0 && <span className={styles["iconBadge"]} >{state.notificationCount}</span>}
          </div>
        </div>
        {state.notificationView === true &&
          <NotificationView
              updateNotifications={updateNotifications}
              notificationsList = {state.notificationsList}
              toggleNotificationView = {toggleNotificationView}
              loadAllNotifications = {loadData}
              totalCount={state.notificationCount}
              readUnreadAllCount={state.readUnreadAllCount}
          />}
      </>
    );
}
export default React.memo(NotificationMain);
