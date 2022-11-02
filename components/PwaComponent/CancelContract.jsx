import React from "react";
import { useState } from "react";
import EmployeeWidgetBlock from './WidgetBlock';
function CancelContract(props) {
    console.log(props);

    const [pophide, setPophide] = useState(props.popupActionNo);
    const [text, setText] = useState('');

    const [message, setMessage] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();
        console.log('handleClick ', message);
        console.log('Contract id ',props.contract);
        props.handleClosePopup();
    };
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
                                Stop planning
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
                                            <input
                                                type="text"
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
                                                className="btn btn-lg btn-block add-proj-btn  px-3 rounded-0 "
                                            >
                                                Back
                                            </button>

                                        </div>
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-block float-end add-proj-btn  px-3 rounded-0 "

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