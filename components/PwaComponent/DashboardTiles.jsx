import { ExitToApp } from "node_modules/@material-ui/icons/index";
import EmployeeWidget from "./EmployeeWidget";
export default function DashboardTiles({dashboardtiles}) {
    // console.log(dashboardtiles)

return(
    
    
    <>

 {Object !== undefined && Object.keys(dashboardtiles).map((key, idx) => {
   
    console.log(key);
    return(
    <div className="row" key={idx}>
      {Object !== undefined && Object.keys(dashboardtiles[key]).map((tile, idx1)=> {
        console.log(tile, idx1);
        if(tile == 'children' ){
            // console.log(dashboardtiles, tile );
            var tileObject = Object.assign({}, dashboardtiles[key][tile]);
            // console.log(tileObjet);
            return(
                <div className="col-lg-6 col-md-6 col-sm-12">
            <DashboardTiles dashboardtiles = { tileObject } />
            </div>

            )
        }
        else if (tile == 'widget')
        {
            
            return (
                <div className="col-lg-6 col-md-6 col-sm-12 employee_widget_dashboard">
            <EmployeeWidget  />
            </div>
            )

        }
        else{
        return(
          <div key={idx1} className={dashboardtiles[key][tile]['col_class']}>
             <div className="position_relative_dashboard">
                <a href={dashboardtiles[key][tile]['menu_link']} className="mx-0 row dashboard_menu_links dashboard-tile">
                 <div className="col-md-3 align-self-center text-center dashboard-image-div">
                 <img src={dashboardtiles[key][tile]['menu_icon']} layout="fill" className="dasboard_image img-fluid" />
                 </div>
                  <div className='col-md-9 dashboard_menu_title mx-auto'>
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
