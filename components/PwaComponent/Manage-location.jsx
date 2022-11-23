import React from "react";
import Link from 'node_modules/next/link';
import Translation from "@/Translation";
import {  useState } from 'react';
import ManageActive from "./ManageActive";
import ManageInactiveTab from "./ManageInactiveTab";



function ManageLocation(props) {
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
                <div className="row m-0 qr_position_sticky">
                    <p className="h3 px-0 bitter-italic-normal-medium-24 mt-2">{t('Manage locations')}</p>

                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <Link href="/pwa/AddLocation">
                                <button type="button" className="btn btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none">
                               + {t('Add location')}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12 row m-0 ps-0">
                        <nav className="nav">
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

                    <div className="form-check p-0 mt-2 ">
                        <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                            {toinactive == 0 && <ManageActive />}
                            {toinactive == 1 && <ManageInactiveTab />}
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
export default React.memo(Translation(ManageLocation, ['Manage locations', 'Add location', 'Search', 'Location', 'Company', 'Action', 'Aartselaar', 'The awkward antique store']));