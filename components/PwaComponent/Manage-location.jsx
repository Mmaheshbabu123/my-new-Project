import React from "react";
import Link from 'node_modules/next/link';
import { MdEdit } from 'react-icons/md';
import {
    RiDeleteBin6Fill
} from 'react-icons/ri';
import Translation from "@/Translation";
import { APICALL } from '@/Services/ApiServices';
import { manageLocation } from '../../Services/ApiEndPoints';
import { useEffect, useState } from 'react';
import ManageActive from "./ManageActive";
import ManageInactiveTab from "./ManageInactiveTab";

import PrivacyPolicy from "../layout/Footer/PrivacyPolicy";



function ManageLocation(props) {
    const { t } = props;
    const [toinactive, setToinactive] = useState(0);
    const [manageLocationCompany, setManageLocationCompany] = useState([]);
    const [message, setMessage] = useState('');
    const [showvalue, setShowvalue] = useState(0);
    const [updated, setUpdated] = useState(message);
    const changetoactive = event => {
        // alert('active = ', toinactive);

        setToinactive(0);

    }
    const changetoinactive = event => {
        // alert('inactive = ', toinactive)
        setToinactive(1);
    }
    const handleChange = (event) => {
        setMessage(event.target.value);
      };
    
      const handleClick = () => {
        // 👇 "message" stores input field value
        setUpdated(message);
        setShowvalue(1);
        // alert(message)
      };

    useEffect(
        () => {
            APICALL.service(manageLocation, 'GET')
                .then((result) => {
                    console.log(result);
                    setManageLocationCompany(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []
    );



    return (
        <div className="container-fluid p-0">

            <form>
                <div className="row m-0 qr_position_sticky">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Manage locations')}</p>

                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <button
                                type="button"
                                className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                            >
                                + {t('Add location')}
                            </button>
                        </div>
                    </div>
                    <div className="col-md-12 row m-0 ps-0">
                        <nav className="nav">
                            <ul className="nav nav-tabs border-0 mb-3 mt-3" id="myTab0" role="tablist">
                                <li className=" me-5" role="presentation">
                                    <Link href='' className="">
                                        <a className={toinactive === 0 ? '   project-active rounded-0 p-0 ' : ' mng-proj  nav-link p-0 rounded-0 nav-link active'} aria-current="page" onClick={changetoactive}>
                                            Active
                                        </a>

                                    </Link>
                                </li>
                                <li className="" role="presentation">
                                    <Link href='' className="" >
                                        <a className={toinactive == 1 ? '  project-active rounded-0 p-0' : ' mng-arch nav-link p-0 rounded-0 nav-link'} onClick={changetoinactive} >
                                            inactive
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="form-check p-0 mt-2  ">


                        <div className="row d-flex mt-3">
                            <div className="col field_height">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"  onChange={handleChange}/>
                                    <button
                                        type="button"
                                        className="btn  btn-block border-0 rounded-0 float-right  skyblue-bg-color  shadow-none"
                                        onClick={handleClick}
                                    >
                                        + {t('Search')}
                                    </button>
                                    {/* <span className="input-group-text">{t('Search')}</span> */}
                                </div>
                            </div>


                            {/*---------------- Search functionality---------------------- */}

                            {/* <div className="col-sm-3 field_height mt-4 p-2">
                                <div className='row'>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"

                                        >
                                            Apply
                                        </button>
                                    </div> */}
                            {/*---------------- Reset functionality---------------------- */}

                            {/* <div className="col-md-6">

                                        <button
                                            type="button"
                                            className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
                                        >
                                            RESET
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* =========== hided============== */}
                        <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                            {toinactive == 0 && <ManageActive  inputvalue = {message} valueshow = {showvalue} />}
                            {toinactive == 1 && <ManageInactiveTab />}
                            {/* <table className="table mt-3 mb-3">
                                <thead>

                                    <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Location')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Company')}	</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manageLocationCompany.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" >
                                            <td className="poppins-regular-18px p-2 ">{result.place}</td>
                                            <td className="poppins-regular-18px p-2">{result.industry}</td>
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
                                                 -------------------- Planning update-----------------------  


                                            </td>
                                        </tr>))}
                                </tbody>
                            </table> */}
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
export default React.memo(Translation(ManageLocation, ['Manage locations', 'Add location', 'Search', 'Location', 'Company', 'Action', 'Aartselaar', 'The awkward antique store']));