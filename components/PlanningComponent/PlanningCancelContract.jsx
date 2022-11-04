import React from "react";
import { useState } from "react";
import EmployeeWidgetBlock from '../PwaComponent/WidgetBlock';
import customAlert from '@/atoms/customAlert';
import ValidationService from "@/Services/ValidationService";
//-----------Calling api -------------//
import { APICALL } from '@/Services/ApiServices';
import { cancelContract } from '@/Services/ApiEndPoints'


function CancelContract(props) {
 
    const [pophide, setPophide] = useState(props.popupActionNo);
    const [text, setText] = useState('');

    const [message, setMessage] = useState('');
    const [message_err, setMessageErr] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const valiDate=()=>{
        let err=ValidationService.emptyValidationMethod(message);
        if(err!=''){
            setMessageErr(err);
            return false;
        }
        setMessageErr('');
        return true;
    }

    const handleClick = async (event) => {
        event.preventDefault();
        let data = getPostData();
        let deta=props.data;
        if(valiDate()){
        APICALL.service(cancelContract,'POST',[deta.emp_id,deta.employee_name,deta.comp_id,deta.location_id,message])
        .then((result) => {
            
            if (result == 200) {
                router.push('/pincode/options');
            }
        })
        .catch((error) => {
            console.error(error);
        });
        props.handleClosePopup();        
    }
    };

    const getPostData = () => {
        return {
            reason: message
        }
    }

    const popuphide = (e) => {
        props.handleClosePopup();
    };
    return (
        <>
            {/* <form onSubmit={(e) => submit(e)}> */}
            {/* <div
                className="modal"
                id="myModal"
                tabIndex="-1"
                style={{ display: pophide ? "block" : "none" }}
            > */}
            {/* {alert('adf =',props.cancel_con)} */}
            <div className="modal-dialog modal-lg modal-dialog-centered " >
                <div className="modal-content">
                    <div className="modal-header col-md-11 m-auto px-0">
                        <div className="col-md-10">
                            <p className="modal-title  font-weight-bold  bitter-italic-normal-medium-24 px-4">
                               {props.title}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={() => popuphide()}
                        />
                    </div>
                    <div className="modal-body ">
                        <div className="col-md-11 m-auto add_project">
                            <div className="row">
                                <div className=" ">
                                    <div className="row  m-0">
                                        <div className="col">
                                            <label className="custom_astrick poppins-light-18px">
                                                Reason
                                            </label>
                                            <textarea
                                                // type="text"
                                                id="message"
                                                name="message"
                                                onChange={handleChange}
                                                value={message}
                                                className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                
                                            />
                                            <p style={{color:"red"}}>{message_err}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="modal-footer border-0 col-md-12 m-auto px-2 add_project">
                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-block float-sm-right add-proj-btn  px-3 rounded-0 "
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-block float-right add-proj-btn  px-3 rounded-0 "
                                        >
                                            Save
                                        </button>
                                    </div> */}
                                <div className=" col-md-12 m-auto px-2 ">
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                className="btn btn-lg px-3 rounded-0 poppins-light-18px text-decoration-underline text-uppercase shadow-none"
                                            >
                                                Back
                                            </button>

                                        </div>
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                className="btn float-end poppins-medium-18px-next-button shadow-none px-3 rounded-0 "

                                                onClick={handleClick}
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
            </div>
            {/* </div> */}
            {/* </form> */}



        </>

    );
}
export default CancelContract;