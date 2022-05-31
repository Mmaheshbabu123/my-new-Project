
export default function ErrorAlert(props){

    return(
        <div>
            { (props.activeError) ? <div
            className="my-3 alert alert-danger alert-dismissible"
            role="alert"
          > <img  alt="" style={{width: "30px", marginRight: "15px"}} src="../../path.svg"></img>{props.errorText}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={props.toggleAlertMessage}
            >
              <span className="close_popup_landing" aria-hidden="true">&times;</span>
            </button>
          </div> : ""}
        </div>
        
    )
}