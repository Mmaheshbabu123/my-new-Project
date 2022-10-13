import React, { useState, useEffect } from "react";
import styles from './Notification.module.css'
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
    notificationCount: -1.
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
          <div style={{ display: "flex" }} className="bg-white p-3">
            <p className={`${styles['notification-header']} bitter-italic-normal-medium-24 pt-4`}>
              Notifications
            </p>
            <img alt={"close"} title={"Close"} onClick={toggleNotificationView} style={{ cursor: "pointer", width: "15px" }} src={closeIcon.src} />
          </div>
          {state.notificationCount < 1 && <p className="text-center poppins-light-18px"> {state.notificationCount === 0 ? 'No notifications to show.' : 'Loading...'} </p>}
          <div className={styles["notification-scroll"]} style={{ minHeight: state.notificationCount ? "200px" : "150px", maxHeight: state.viewAllLink ? "400px" : "460px", overflowY: 'auto' }}>
          {state.allTimestamp.map((i, k) => {
            return (
              <div key={k} className="container px-3 notification_container">
                <p className={`${styles['date-p-tag']} d-flex align-items-center row`}>
                  <span style={{ display: "inline-block"}} className="poppins-medium-16px col-md-6 ps-3 py-3">  {i.UTC.date} </span>
                  <span style={{ display: "inline-block", textAlign: "right" }} className="col-md-6 pe-3" >
                  </span>
                </p>
                {i.list.map(l => {
                  return l.map((k, _key) => {
                    const d = new Date(k.timeStamp * 1000);
                    const min = d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes();
                    const hours = d.getUTCHours() % 12 || 12;
                    const amOrpm = hours >= 12 ? "pm" : "am";
                    return (
                      <div key={_key} className={`${styles["lineItmes"]} py-3`}>
                        <div onClick={() => updateNotifications('single', k)} className="cursor-pointer">
                          <span className={k.seen_by_user !== 0 ? styles['seen'] : styles['unseen']}> {k.message} </span>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12">
                          <span className={`${styles['time-span']} float-start`}> {`${hours}:${min} ${amOrpm}`} </span>
                            </div>
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
         {state.viewAllLink === 1 && <p className={`${styles['link-p-tags']} cursor-pointer col-md-12 text-center text-uppercase text-decoration-underline  bitter-italic-normal-medium-16`} onClick={loadAll}> View all </p>}
        </div>}
      </div>
    </div>
  );
}

export default NotificationView;
