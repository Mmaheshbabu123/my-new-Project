import React, { useState, useEffect } from "react";
import styles from './Notification.module.css'
import clearIcon from './clearAll.svg';
import closeIcon from './close.svg';

const NotificationView = ({
  notificationsList = [],
  updateNotifications,
  toggleNotificationView,
  loadAllNotifications, ...props
}) => {
  const [state, setState] = useState({
    toggleNotification: false,
    listItems: [],
    allTimestamp: [],
    totalCount: 0,
    viewAllLink: 1,
    notificationCount: 0.
  })

  const loadAll = () => {
    setState({...state, viewAllLink: 0});
    loadAllNotifications();
  }

  useEffect(() => {
    const listItems = notificationsList;
    const allTimestamp = [];
    listItems.map((i, k) => {
      const test = allTimestamp.filter(
        item => item.UTC.date === generateDate(i.UTC).date
      );
      if (test.length === 0) {
        const itemObj = {
          UTC: generateDate(i.UTC),
          list: []
        };
        allTimestamp.push(itemObj);
      }
    });
    listItems.map((i, j) => {
      const iUTC = generateDate(i.UTC).date;
      const sameData = allTimestamp.filter(function (k) {
        return k.UTC.date === iUTC;
      });
      const key = sameData.length && sameData[0].UTC.date;
      allTimestamp.map(item => {
        if (item.UTC.date === key) {
          i.list.map(p => {
            p.timeStamp = i.UTC;
          });
          item.list.push(i.list);
        }
      });
    });
    setState({ ...state, allTimestamp, listItems, notificationCount: allTimestamp.length });
  }, [notificationsList.length, props.refresh])


  const generateDate = timeStamp => {
    const d = new Date(timeStamp * 1000);
    const n = d.getDate();
    const m = d.getMonth();
    const y = d.getUTCFullYear();
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    return { date: `${n} ${monthNames[m]} ${y}`, time: timeStamp };
  };

  return (
    <div className="w-100">
      <div className={styles["notificationBar"]} >
        <div>
          <div style={{ display: "flex" }} className="mb-3">
            <p className={`${styles['notification-header']} text-center bitter-italic-normal-medium-24`}>
              Notifications
            </p>
            <img alt={"close"} title={"Close"} onClick={toggleNotificationView} style={{ cursor: "pointer", width: "15px" }} src={closeIcon.src} />
          </div>
          {state.notificationCount === 0 && <p> No notifications to show. </p>}
          <div style={{ minHeight: state.notificationCount ? "200px" : "150px", maxHeight: state.viewAllLink ? "400px" : "570px", overflowY: 'auto' }}>
          {state.allTimestamp.map((i, k) => {
            return (
              <div key={k}>
                <p className={`${styles['date-p-tag']}`}>
                  <span style={{ display: "inline-block", width: "50%" }} className="poppins-medium-16px">  {i.UTC.date} </span>
                  <span style={{ display: "inline-block", width: "50%", textAlign: "right" }} >
                  {k === 0 && (
                    <img alt={"delete all"} title="Delete all" style={{ width: "15px", cursor: "pointer",marginRight:"15px" }}
                         onClick={() => updateNotifications('deleteAll')}
                         src={clearIcon.src} />
                    )}
                  </span>
                </p>
                {i.list.map(l => {
                  return l.map((k, _key) => {
                    const d = new Date(k.timeStamp * 1000);
                    const min = d.getUTCMinutes();
                    const hours = d.getUTCHours() % 12 || 12;
                    const amOrpm = hours >= 12 ? "pm" : "am";
                    return (
                      <div key={_key} className={`${styles["lineItmes"]} mt-3 mb-3`}>
                        <span className={styles['time-span']}> {`${hours}:${min} ${amOrpm}`} </span>
                        <div onClick={() => updateNotifications('single', k)} className="cursor-pointer">
                          <span className={k.seen_by_user === 0 ? styles['unseen'] : 'poppins-light-18px'}> </span>
                          <span className={k.seen_by_user !== 0 ? styles['seen'] : ''}> {k.message} </span>
                        </div>
                      </div>
                    );
                  });
                })}
              </div>
            );
          })}
          </div>
        </div>
        {state.notificationCount > 0 && <div className="col-md-12 row m-0 p-0 pt-3 pb-2 ">
          <p className={`${styles['link-p-tags']} cursor-pointer col-md-6 text-start bitter-italic-normal-medium-24`} onClick={() => updateNotifications('readAll', state.allTimestamp)}>
             Mark all as read
          </p>
           {state.viewAllLink === 1 && <p className={`${styles['link-p-tags']} cursor-pointer col-md-6 text-end bitter-italic-normal-medium-24`} onClick={loadAll}> View all </p>}
        </div>}
      </div>
    </div>
  );
}

export default NotificationView;
