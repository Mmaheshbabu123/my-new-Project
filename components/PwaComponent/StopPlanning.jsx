import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { APICALL } from '../../Services/ApiServices';
import { fetchEmployeeWidgetPlanning } from '../../Services/ApiEndPoints';

function StopPlanning(props) {
    /**
     * 
     * @param {*} event 
     * Submit function
     */

    (props.Data==null)?props.Data='':"";
   
    const [datetime,setDateTime]=useState();

    const Save=()=>{
        APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/stop-planning-by-employer/'+props.Data[3]+'?wid='+props.Data[2]+'&datetime='+datetime, 'POST')
        .then((result) => {
                
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
            <form onSubmit={Save}>
                <div
                    className="modal"
                    id="myModal"
                    tabIndex="-1"
                    style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered ">
                        <div className="modal-content">
                            <div className="modal-header col-md-11 m-auto px-0">
                                <div className="col-md-10">
                                    <p className="modal-title  font-weight-bold  bitter-italic-normal-medium-24 px-4">
                                        Stop planning
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                onClick={() => props.popupActionNo()}
                                />
                            </div>
                            <div className="modal-body ">
                                <div className="col-md-11 m-auto add_project">
                                    <div className="row">
                                        <div className=" ">
                                            <div className="row  m-0">
                                                <div className="col">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={props.Data[0]}
                                                        className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                    />

                                                </div>
                                                {/* <div className="col">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                    />
                                                </div> */}
                                            </div>
                                            <div className="row  m-0">
                                                <div className="col">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Planned stop time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={props.Data[1]}
                                                        className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                    />

                                                </div>
                                                <div className="col">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Actual stop time
                                                    </label>
                                                    <DatePicker

                                                        name="datetime" 
                                                        format="YYYY-MM-DD HH:mm"
                                                        plugins={[
                                                            <TimePicker key={datetime} position="bottom" hideSeconds />
                                                        ]} 
                                                        onChange={(e)=>setDateTime(e.format('YYYY-MM-DD HH:mm:ss'))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer border-0 col-md-11 m-auto px-2 add_project">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-block float-right add-proj-btn  px-3 rounded-0 "
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );

}
export default StopPlanning;