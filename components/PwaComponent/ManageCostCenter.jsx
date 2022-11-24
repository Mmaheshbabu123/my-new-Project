import React from "react";
import Link from 'node_modules/next/link';
import { MdEdit } from 'react-icons/md';
import {
    RiDeleteBin6Fill
} from 'react-icons/ri';
import Translation from "@/Translation";
import { useState } from 'react';
import ManageCostActive from "./ManageCostActive";
import ManageCostInactive from "./ManageCostInactive";


function ManageCostCenter(props) {
    const { t } = props;

    // -------this state and function is for Managing Atcive tabs and inactive tabs---------- //
    const [toinactive, setToinactive] = useState(0);

    const changetoactive = event => {
        setToinactive(0);
    }
    const changetoinactive = event => {
        setToinactive(1);
    }
    //----------- this state and function is for Managing Atcive tabs and inactive tabs --------//



    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Manage cost center')}</p>
                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">

                            <Link href="/pwa/add-cost-center">
                                <button type="button" className="btn btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none">
                                    + {t('Add cost center')}
                                </button>
                            </Link>

                        </div>
                    </div>
                    <div className="col-md-12 row m-0 ps-0">
                        <nav className="nav my-0">
                            <ul className="nav nav-tabs border-0 mb-3 mt-3" id="myTab0" role="tablist">
                                <li className=" me-5" role="presentation">
                                    <Link href='' className="">
                                        <a className={toinactive === 0 ? ' project-active rounded-0 p-0 ' : ' mng-proj nav-link p-0 rounded-0 nav-link active'} aria-current="page" onClick={changetoactive}>
                                            Active
                                        </a>

                                    </Link>
                                </li>
                                <li className="" role="presentation">
                                    <Link href='' className="" >
                                        <a className={toinactive == 1 ? ' project-active rounded-0 p-0' : ' mng-arch nav-link p-0 rounded-0 nav-link'} onClick={changetoinactive} >
                                            inactive
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="form-check p-0 mt-2 ">
                    <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                        {toinactive == 0 && <ManageCostActive />}
                        {toinactive == 1 && <ManageCostInactive />}
                    </div>
                </div>


                {/* <div className="form-check p-0 mt-2    "> */}
                {/* <span className="mx-2"></span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                            <span className="mx-2"></span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                            <span className="mx-2"></span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                            <span className="mx-2"></span> */}
                {/* </div> */}


                {/*---------------- Search functionality---------------------- */}

                {/* <div className="col-sm-3 field_height ">
                        <div className='row'>
                            <div className="col-sm-3">
                                <button
                                    type="button"
                                    className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"

                                >
                                    Apply
                                </button>
                            </div>
                        </div> */}
                {/*---------------- Reset functionality---------------------- */}

                {/* <div className="col-sm-3">

                            <button
                                type="button"
                                className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
                            >
                                RESET
                            </button>
                        </div>
                    </div> */}
                {/* <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4">{t('Cost center name')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Location')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border poppins-regular-18px p-2" >

                                    <td className="poppins-regular-18px p-2">{t('Controle van overheadkosten')}</td>
                                    <td className="poppins-regular-18px p-2">{t('Aartselaar')}</td>
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
                                        // {/*-------------------- Planning update----------------------- 


                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}


                <div className="col-sm-3 field_height ">
                    <div className='row'>
                        <div className="col-sm-3">
                            <button
                                type="button"
                                className="btn  btn-block border-0 rounded-0  mt-2 mb-2 skyblue-bg-color  shadow-none"

                            >
                                {t('back')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default React.memo(Translation(ManageCostCenter, ['Manage cost center', 'Add cost center', 'Search', 'Cost center name', 'Location', 'Action', 'Controle van overheadkosten', 'Aartselaar', 'back']));
