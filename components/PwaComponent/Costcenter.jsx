import React from "react";

function AddCostCenter(props) {
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Add cost center</p>
                    <div className="form-check p-0 mt-2  border ">
                        <div className="p-3">
                        <div className="mb-3">
                                <label className="form-label custom_astrick">Cost center name</label>
                                <input type="select" className="form-control rounded-0" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label custom_astrick">Unique number for cost center</label>
                                <input type="select" className="form-control rounded-0" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label custom_astrick">Company</label>
                                <select class="form-select" >
                                    <option selected>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label custom_astrick">Location</label>
                                <select class="form-select" >
                                    <option selected>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                           
                        </div>
                    </div>
                    <div className="text-start col-md-6">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"

                        >
                            BACK
                        </button>
                    </div>
                    <div className="col-md-6 p-0 mt-3">
                        <button
                            type="submit"
                            // className="btn rounded-0 custom-btn px-3 btn-block float-end"
                            className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default AddCostCenter;
