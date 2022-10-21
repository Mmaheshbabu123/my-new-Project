import React, { useEffect, useState, useContext } from 'react';
import { ExitToApp } from "node_modules/@material-ui/icons/index";
import EmployeeWidget from "./EmployeeWidget";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';

export default function DashboardTiles({dashboardtiles}) {
const { contextState: {uid=0, role='', roleType=0  }, contextState } = useContext(UserAuthContext);
return(
    
    
    <>

 {Object !== undefined && Object.keys(dashboardtiles).map((key, idx) => {
   
    return(
    <div className="row" key={idx}>
      {Object !== undefined && Object.keys(dashboardtiles[key]).map((tile, idx1)=> {
      //  console.log(tile, idx1);
        if(tile == 'children' ){
            var tileObject = Object.assign({}, dashboardtiles[key][tile]);
            return(
                <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
            <DashboardTiles dashboardtiles = { tileObject } />
            </div>

            )
        }
        else if (tile == 'widget')
        {
            
            return (
                <div className="col-lg-6 col-md-6 col-sm-12 ">
            <EmployeeWidget  />
            </div>
            )

        }
        else{
        return(
          <div key={idx1} className={dashboardtiles[key][tile]['col_class']}>
             <div className="position_relative_dashboard">
                <a href={`${dashboardtiles[key][tile]['menu_link']}?entityid=${uid}&entitytype=${roleType}&role=${role}`} className="mx-0 row dashboard_menu_links py-4 dashboard-tile">
                 <div className="col-lg-3 col-md-12 align-self-center text-center dashboard-image-div">
                 <img src={dashboardtiles[key][tile]['menu_icon']} layout="fill" className="dasboard_image img-fluid" />
                 </div>
                  <div className='col-lg-9 col-md-12 dashboard_menu_title mx-auto px-0'>
                  {dashboardtiles[key][tile]['menu_title']}
                  </div>
                </a>
            </div>
          </div>
        )
      }
      })
      }
    </div>
    );
  })
  }

  </>

);
}
