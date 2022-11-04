import React from "react";
import { useState } from "react";
import EmployeeWidgetBlock from './WidgetBlock';
import customAlert from '@/atoms/customAlert';

//-----------Calling api -------------//
import { APICALL } from '@/Services/ApiServices';
import { cancelContract } from '@/Services/ApiEndPoints'


function CancelContract(props) {
    console.log(props);

    const [pophide, setPophide] = useState(props.popupActionNo);
    const [text, setText] = useState('');

    const [message, setMessage] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault();
        let data = getPostData();
        await APICALL.service(cancelContract, 'POST', data).then(response => {
            console.log(response);
            if(response.status == 200){
                console.log('Successfull');
                customAlert('success', 'cancel contract for employee Successfull ', 2000);
            }else{
                customAlert('error', 'cancel contract for employee Failed', 2000);
                console.log('Failed');
            }

            
        })
        props.handleClosePopup();
    };

    const getPostData = () => {
        return {
            contract_id: props.contract,
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