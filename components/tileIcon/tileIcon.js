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
    <Link className='sree' href={`${url}`}>
       <div  className={`${styles["dashboard-tile-parent"]} select-bg-gray border-0 my-3 mx-0 me-5`}>
         <div className={styles["dashboard-tile-field-content"]}>

             <a className={styles["anchor-tag"]} >
               <Image src={iconPath} alt={name} loading="lazy"  width="70%" height="60%"  />
               <div title={name} className = {`{styles["tile-title-text"] poppins-medium-16px  my-3 text-decoration-none`}> {name} </div>
             </a>

         </div>
       </div>
     </Link>
    </React.Fragment>
  )
}
