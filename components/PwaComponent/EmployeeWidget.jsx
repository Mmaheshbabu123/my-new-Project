import React, { useState } from "react";
import ReactDOM from "react-dom";
import Link from 'node_modules/next/link';
import Image from "next/image";


export default function EmployeeWidget() {
    // const [query, setquery] = useState('')

    // const handleChange = (e) => {
    //     setquery(e.target.value)
    // }
console.log('widget employee');
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Employees currently working (2022-10-09, 09:59)</p>

                    <div className="row d-flex mt-3">
                        <div className="input-group">
                            <input type="text" className="form-control" />
                            <span className="input-group-text">Search</span>

                        </div>
                    </div>
                    <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4">Name</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Company</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Location</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Planned stop time</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border poppins-regular-18px p-2" >

                                    <td className="poppins-regular-18px p-2">Preeti RK</td>
                                    <td className="poppins-regular-18px p-2">The awkward antique store</td>
                                    <td className="poppins-regular-18px p-2">Aartselaar</td>
                                    <td className="poppins-regular-18px p-2">2022-08-17 10:00:07</td>
                                    <td>
                                        <Link href='' className="m-2">
                                            <a type="button" className="warning-icon-solid">

                                            </a>
                                        </Link>

                                        <Link href='' className="m-2">
                                            <a type="button" className="stop-working-icon-solid">

                                            </a>
                                        </Link>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="text-start col-md-6">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"

                        >
                            BACK
                        </button>
                    </div> */}
                </div>
            </form>
        </div>
    );
}
// export default EmployeeWidget;