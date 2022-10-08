import React from "react";
import Link from 'node_modules/next/link';
import { MdEdit } from 'react-icons/md';
import {
    RiDeleteBin6Fill
} from 'react-icons/ri';



function ManageLocation(props) {
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Manage locations</p>
                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <button
                                type="button"
                                className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                            >
                                + Add location
                            </button>
                        </div>
                    </div>
                    <div className="form-check p-0 mt-2  ">


                        <div className="row d-flex mt-3">
                            <div className="col field_height">
                                <label className="form-label mb-2 mt-1 poppins-regular-16px">Company name</label>

                                <input
                                    type="search"
                                    id="form12"
                                    className="form-control mt-1 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                    placeholder="Select"
                                />
                            </div>
                            <div className="col field_height">
                                <label className="form-label mb-2 mt-1 poppins-regular-16px">Location</label>

                                <input
                                    type="search"
                                    id="form12"
                                    className="form-control mt-1 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                    placeholder="Select"
                                />
                            </div>

                            {/*---------------- Search functionality---------------------- */}

                            <div className="col-sm-3 field_height mt-4 p-2">
                                <div className='row'>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"

                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {/*---------------- Reset functionality---------------------- */}

                                    <div className="col-md-6">

                                        <button
                                            type="button"
                                            className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
                                        >
                                            RESET
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                            <table className="table mt-3 mb-3">
                                <thead>
                                    <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Location</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Company	</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border poppins-regular-18px p-2" >
                                        <td className="poppins-regular-18px p-2">Aartselaar</td>
                                        <td className="poppins-regular-18px p-2">The awkward antique store	</td>
                                        <td className="p-2">
                                            <Link href='' className="">
                                                <a type="button">
                                                    <MdEdit
                                                        className="color-skyblue me-2"
                                                        data-toggle="tooltip"
                                                        title="Edit cost center"
                                                    />
                                                </a>
                                            </Link>
                                            <Link href='' className="">
                                                <a type=" p-1 m-1">
                                                    <RiDeleteBin6Fill
                                                        className="color-skyblue"
                                                        data-toggle="tooltip"
                                                        title="Delete cost center"
                                                    />
                                                </a>
                                            </Link>
                                            {/*-------------------- Planning update----------------------- */}


                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
export default ManageLocation;