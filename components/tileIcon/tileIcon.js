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
           <Link href={`/${url}`}>
             <a>
               <Image src={iconPath} alt="" loading="lazy"  width="75%" height="75%"  />
               <div title={name} className = {styles["tile-title-text"]}> {name} </div>
             </a>
           </Link>
         </div>
       </div>
    </React.Fragment>
  )
}
