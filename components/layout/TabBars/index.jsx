import Image from 'next/image';
import {UTILITYFN} from '../../UtilityFunctions/Utility';

function TabBars(props){
    function handleUserClickOnTab(event){
        event.preventDefault();
        
        ( ( (UTILITYFN.getPageTickStatus(props) || UTILITYFN.getVisitedPageStatus(props)) && props.currentPage !== 5   ) ? props.setPageDirection(props.pageNumber) : "");

    }
    return (
      <div onClick={handleUserClickOnTab} className={` move_nav_menu col ${(props.currentPage === props.pageNumber) ? "active": ""} ${(UTILITYFN.getPageTickStatus(props)) ? "custom-cursor": ""} `}>
         <ul className="nav nav-pills nav-fill col-md-12">
            
            {/* <li className="nav-item col-md-4">
               
            </li> */}
            <li className="nav-item col-8 flex">
                <div className="align-self-center d-flex"> <a style = {{padding: `${(props.pageNumber === 3) ? "0.69rem" : ".5rem 1rem"}`}}className="nav-link" href="#"><Image style={{width: "25px"}} alt={props.title} className="" src={(props.currentPage !== props.pageNumber) ? props.imgSrc : props.imgBlue}/></a></div>
                <div>
            <div className="stap1 active_blue tahoma-regular-normal-white-18px">{props.stepName}</div>
                   <div className="eigenaar-4 active_blue tahoma-regular-normal-white-28px"><span style={{marginLeft: "2px"}}>{props.title}</span></div>
                   </div>
                    
            </li>
            <li className="nav-item col-4 custom_center_align">
                <div>
                <a tabIndex="-1" aria-label= "Klik hier om het tabblad te activeren" className="nav-link disabled" href="#"><span>{(UTILITYFN.getPageTickStatus(props) && (props.currentPage !== props.pageNumber)) ? <div className="status_complete_tick">
                        <Image alt="tick-image" src="/tick.svg" style={{width: "25px"}} />
                   </div> : ""}</span></a></div>
            </li>
         </ul>
      </div>
      
    )
}

export default TabBars