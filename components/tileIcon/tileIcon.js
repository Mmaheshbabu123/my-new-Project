import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from './tileIcon.module.css';

export default function tileIcon({ props }) {
  let iconPath = props.iconPath || '/';
  let name = props.name || 'Manage employee types';
  let url = props.url || 'manage/employee-types';
  return (
    <React.Fragment>
       <div className={styles["dashboard-tile-parent"]}>
         <div className={styles["dashboard-tile-field-content"]}>
           <Link href={`${url}`}>
             <a className={styles["anchor-tag"]}>
               <Image src={iconPath} alt={name} loading="lazy"  width="85%" height="75%"  />
               <div title={name} className = {styles["tile-title-text"]}> {name} </div>
             </a>
           </Link>
         </div>
       </div>
    </React.Fragment>
  )
}
