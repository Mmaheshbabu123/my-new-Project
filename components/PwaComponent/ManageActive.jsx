import React from 'react'

import Link from 'node_modules/next/link';
import { MdEdit ,MdDelete} from 'react-icons/md';
import {
    RiDeleteBin6Fill
} from 'react-icons/ri';
import Translation from "@/Translation";
import { APICALL } from '@/Services/ApiServices';
import { manageLocation } from '../../Services/ApiEndPoints';
import { useEffect, useState } from 'react';
import Pagination from "../PcComponent/Pagination";

function ManageActive(props) {
    const { t } = props;
    const [manageLocationCompany, setManageLocationCompany] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [categories, setCategories] = useState([]);
    const [categoriestemp2, setCategoriestemp2] = useState([]);
    const [categoriesTemp, setCategoriesTemp] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchPc, setSearchPc] = useState('');
    useEffect(
        () => {
            APICALL.service(manageLocation, 'GET')
                .then((result) => {
                    console.log(result.data);
                    setManageLocationCompany(result.data);
                    setCategories(result.data);
                    setCategoriestemp2(result.data);
                    setCategoriesTemp(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []
    );

    //------------------- Pagination code -------------------------//

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(
        () => {
            const endOffset = itemOffset + itemsPerPage;
            setCategoriestemp2(categories.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(categories.length / itemsPerPage));
        },
        [itemOffset, itemsPerPage, categories]
    );

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % categories.length;
        setItemOffset(newOffset);
    };
    //------------------- Pagination code -------------------------//
   

    function handleSearch() {
        setSearch(true);
        var res = [];
        if (searchPc != '') {
            categoriesTemp.map((val) => {
                if (
                    val['place'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())
                    || val['industry'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())
                ) {
                    res.push(val);

                }
            });
            setCategories(res);
            setItemOffset(0);
            console.log('cata = ', categories);
            res = [];
           
            
        } else {
            setCategories(categoriesTemp);
        }
    }
    function handleReset() {
        setSearch(false);
        setCategories(categoriesTemp);
        setSearchPc('');

    }
    
   

    return (
        <>
            <div className="container-fluid p-0">
                <form>
                    
                    <div className="form-check p-0 mt-2  ">


                        {/* <div className="row d-flex mt-3">
                            <div className="col field_height">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                    <span className="input-group-text">{t('Search')}</span>

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
                        {/* </div> */}
                        <div className="col field_height">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" value={searchPc}
                                        onChange={(e) => setSearchPc(e.target.value)} />
                                    <div className="mx-3">
                                        <button
                                            type="button"
                                            className="btn btn-block border-0 rounded-0 float-right skyblue-bg-color shadow-none"
                                            onClick={handleSearch}
                                        >
                                            {t('Search')}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-block border-0 rounded-0 float-right skyblue-bg-color shadow-none"
                                            onClick={handleReset}
                                        >
                                            {t('Reset')}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                        <table className="table mb-3">
                                <thead className='manage_category_table'>
                                    
                                    <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Location')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Company')} </th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                    </tr>
                                   
                                </thead>
                                <tbody className="">
                                    { categoriestemp2.length > 0 &&
                                        categoriestemp2.map((result) => (
                                            <tr className="border poppins-regular-18px p-2" key={result.industry}>
                                                <td className="poppins-regular-18px p-2 ps-4">{result.place}</td>
                                                <td className="poppins-regular-18px p-2">{result.industry}</td>
                                              
                                                <td className=" p-2">
                                                    <Link
                                                        href={'/editpc/' + result.pc_unique_key + '?cid=' + result.cat_id}
                                                        className=""
                                                    >
                                                        <a>
                                                            <MdEdit
                                                                className="color-skyblue "
                                                                data-toggle="tooltip"
                                                                title={t("Edit category")}
                                                            />
                                                        </a>
                                                    </Link>

                                                    <span onClick={() => showPopup(result.cat_id)} type="button">
                                                        <MdDelete
                                                            className=" ms-3 color-skyblue delete_button"
                                                            data-toggle="tooltip"
                                                            title={t("Delete category")}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    {categories.length == 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center poppins-regular-18px no-records">
                                                {t('No records')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount} />
                    </div>

                </form>
            </div>

        </>
    )
}

export default React.memo(Translation(ManageActive, ['Manage locations', 'Add location', 'Search', 'Location', 'Company', 'Action', 'Aartselaar', 'The awkward antique store']));

