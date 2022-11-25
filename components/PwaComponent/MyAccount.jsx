import React from "react";
import BackLink from '../BackLink';

function MyAccount() {
    return (
        <div className="container-fluid p-0">
            <form onSubmit={(e) => submit(e)}>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">My account</p>
                </div>
                <div className="form-check p-0 mt-2 border tab-pane fade show active">
                    <div className="p-3">
                        <div className=" row gx-2 mb-3 h-25 ps-2 mt-1">
                            <div className="col-sm-3 border ms-2 ">
                                <label className="form-label  mt-2">Profile picture</label>
                                <input type="file" className="form-control mb-3 border-0" />
                                <p className="fs-6 mb-2">2 MB limit.</p>
                                <p className="fs-6 mb-3">Allowed types: gif png jpg jpeg</p>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col">
                                <div className="mb-3 me-3">
                                    <label className="form-label custom_astrick">First name</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label custom_astrick">Last name</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col-md-6">
                                <div className="mb-3 me-3">
                                    <label className="form-label custom_astrick">Street</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label className="form-label custom_astrick">Number</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label className="form-label custom_astrick">Bus</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col">
                                <div className="mb-3 me-3">
                                    <label className="form-label custom_astrick">Postal code</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label custom_astrick">City</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col">
                                <div className="mb-3 me-3">
                                    <label className="form-label custom_astrick">Country</label>
                                    <select type="form-select" className="form-control rounded-0">
                                        <option value="1">India</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label custom_astrick">Mobile number</label>
                                    <input type="text" className="form-control rounded-0" />
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col-md-6">
                                <div className="mb-3 me-3">
                                    <label className="form-label custom_astrick">Language</label>
                                    <select type="form-select" className="form-control rounded-0">
                                        <option value="1">Dutch</option>
                                        <option value="2">English</option>
                                        <option value="3">French</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2">
                            <div className="col-md-6">
                                <div className="mb-3 me-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" />
                                        <label className="form-check-label mt-1" forHtml="flexCheckDefault">
                                            Add plannings to my calendar
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div className="row mt-3">
                    <div className="text-start col-md-7">
                        <BackLink path={'/'} />
                    </div>
                    <div className="text-end col-md-3">
                        <button className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none">Delete my account</button>
                    </div>
                    <div className="text-end col-md-2">
                        <button className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none mt-2 mb-2">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default MyAccount;
