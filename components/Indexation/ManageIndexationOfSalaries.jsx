import React, { useState, useEffect } from "react";
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import { getIndexationOfSalary, updateStatus } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import SalaryIndexationDeletePopup from './DeleteSalaryIndexationPopup';
import ReactPaginate from 'react-paginate';
import Translation from "@/Translation";
import moment from 'moment';
import BackLink from '../BackLink';
import Pagination from '../PcComponent/Pagination';

function ManageIndexationOfSalaries(props) {
    const { t } = props;
    const router = useRouter();
    const unique_key = Uniquekey.generate_unique_key();
    const [indexation, setIndexation] = useState([]);
    const [indexationTemp, setIndexationTemp] = useState([]);
    const [indexationTemp2, setIndexationTemp2] = useState([]);
    const [salaryid, setSalaryid] = useState('');
    const [updated, setUpdated] = useState(0);
    const [search, setSearch] = useState(false);
    const [searchDate, setSearchDate] = useState('');
    const [searchIndexation, setSearchIndexation] = useState('');
    const [searchPc, setSearchPc] = useState('');

    /**Popup  */
    const [showdeletepopup, setShowdeletepopup] = useState(false);

    const closePopup = () => {
        setShowdeletepopup(false);
    };

    const showPopup = (id) => {
        setSalaryid(id);
        setShowdeletepopup(true);
    };

    useEffect(
        () => {
            APICALL.service(getIndexationOfSalary, 'GET')
                .then((result) => {
                    console.log(result.data);
                    setIndexation(result.data);
                    setIndexationTemp(result.data);
                    setIndexationTemp2(result.data);

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [updated]
    );

    /**
         * Delete functionality
         * @param {*} res 
         * @returns 
         */
    const update = async () => {
        var data = {
            id: salaryid,
        };
        APICALL.service(updateStatus, 'POST', data)
            .then((result) => {
                console.log(result.status);
                setUpdated(updated + 1);
                setShowdeletepopup(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // //------------------- Pagination code -------------------------//
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(
        () => {
            const endOffset = itemOffset + itemsPerPage;
            setIndexationTemp2(indexation.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(indexation.length / itemsPerPage));
        },
        [itemOffset, itemsPerPage, indexation]
    );
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % indexation.length;
        setItemOffset(newOffset);
    };
    // //------------------- Pagination code -------------------------//

    // ------------------------- Search functionality----------------------------//

    function handleSearch() {
        setSearch(true);
        var res = [];
        if (searchDate != '' && searchIndexation != '' && searchPc != '') {
            indexationTemp.map((val) => {
                if (
                    val['date'].trim().toLowerCase().includes(searchDate.trim().toLowerCase()) &&
                    (val['value'] != undefined &&
                        val['value'] != '' &&
                        val['value'] != null &&
                        val['value'].trim().toLowerCase().includes(searchIndexation.trim().toLowerCase())) &&
                    (val['pc'] != undefined &&
                        val['pc'] != '' &&
                        val['pc'] != null &&
                        val['pc'].trim().toLowerCase().includes(searchIndexation.trim().toLowerCase())
                    )
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        }
        else if (searchDate != '' && searchIndexation != '') {
            indexationTemp.map((val) => {
                if (
                    val['date'] != undefined &&
                    val['date'] != '' &&
                    val['date'] != null &&
                    val['date'].trim().toLowerCase().includes(searchDate.trim().toLowerCase()) &&
                    (val['value'] != undefined &&
                        val['value'] != '' &&
                        val['value'] != null &&
                        val['value'].trim().toLowerCase().includes(searchPc.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        } else if (searchIndexation != '' && searchPc != '') {
            indexationTemp.map((val) => {
                if (
                    val['value'] != undefined &&
                    val['value'] != '' &&
                    val['value'] != null &&
                    val['value'].trim().toLowerCase().includes(searchIndexation.trim().toLowerCase()) &&
                    (val['pc'] != undefined &&
                        val['pc'] != '' &&
                        val['pc'] != null &&
                        val['pc'].trim().toLowerCase().includes(searchPc.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        } else if (searchPc != '' && searchDate != '') {
            indexationTemp.map((val) => {
                if (
                    val['pc'] != undefined &&
                    val['pc'] != '' &&
                    val['pc'] != null &&
                    val['pc'].trim().toLowerCase().includes(searchPc.trim().toLowerCase()) &&
                    (val['date'] != undefined &&
                        val['date'] != '' &&
                        val['date'] != null &&
                        val['date'].trim().toLowerCase().includes(searchDate.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        }
        else if (searchDate != '') {
            indexationTemp.map((val) => {
                if (
                    val['date'] != undefined &&
                    val['date'] != '' &&
                    val['date'] != null &&
                    val['date'].trim().toLowerCase().includes(searchDate.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        } else if (searchIndexation != '') {
            indexationTemp.map((val) => {
                if (
                    val['value'] != undefined &&
                    val['value'] != '' &&
                    val['value'] != null &&
                    val['value'].trim().toLowerCase().includes(searchIndexation.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        } else if (searchPc != '') {
            indexationTemp.map((val) => {
                if (
                    val['pc'] != undefined &&
                    val['pc'] != '' &&
                    val['pc'] != null &&
                    val['pc'].trim().toLowerCase().includes(searchPc.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setIndexation(res);
            setItemOffset(0);
        }
    }
    // ---------------------Search reset------------------- //
    function handleReset() {
        setSearch(false);
        setIndexation(indexationTemp);
        setSearchDate('');
        setSearchIndexation('');
        setSearchPc('');
    }
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row py-4 position-sticky-pc">
                    <div className="col-md-12">
                        <p className="px-0 bitter-italic-normal-medium-24">{t('Manage indexation of salaries')}</p>
                    </div>
                </div>
                <div className="row m-0 ">

                    <div className="float-end position-sticky-add-indexation">
                        <div className="col-md-3 p-0 float-end ">
                            <Link
                                // href={'/indexation/' + Uniquekey.generate_unique_key()}
                                href={'/indexation'}
                            >
                                <button
                                    type="button"
                                    className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                                >
                                    + {t('Add Indexation of salary')}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="form-check p-0 pt-2 tab-pane fade show min_height_table">
                        {/* ----------------Search functionality--------------------------------*/}

                        <div className="row d-flex project_sticky">
                            <div className="col-sm-3 field_height">
                                <input
                                    type="search"
                                    id="form12"
                                    className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                    placeholder="Date"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                />
                            </div>

                            <div className="col-sm-3 field_height">
                                <input
                                    type="search"
                                    id="form12"
                                    className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                    placeholder="Indexation value "
                                    value={searchIndexation}
                                    onChange={(e) => setSearchIndexation(e.target.value)}
                                />
                            </div>

                            <div className="col-sm-3 field_height">
                                <input
                                    type="search"
                                    id="form12"
                                    className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                    placeholder="Paritaire comite "
                                    value={searchPc}
                                    onChange={(e) => setSearchPc(e.target.value)}
                                />
                            </div>

                            <div className="col-sm-3 field_height">
                                <div className='row'>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
                                            onClick={() => handleSearch()}
                                        >
                                            SEARCH
                                        </button>
                                    </div>
                                    {/*---------------- Reset functionality---------------------- */}

                                    <div className="col-md-6">
                                        {(searchDate != '' ||
                                            searchIndexation != '' ||
                                            searchPc != '' ||
                                            search === true) && (
                                                <button
                                                    type="button"
                                                    className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_employee_widget w-100 shadow-none"
                                                    onClick={() => handleReset()}
                                                >
                                                    RESET
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-3">{t('Date')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Indexation value')}</th>
                                    {/* <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('PC')}</th> */}
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Employee type')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexationTemp2.length > 0 &&
                                    indexationTemp2.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id} >
                                            <td className="poppins-regular-18px p-2 ps-3">{result.date.split('-').reverse().join('/')}</td>
                                            <td className="poppins-regular-18px p-2">{result.value_type == 1 ? result.value + '%' : result.value + '€'}</td>
                                            <td className="poppins-regular-18px p-2">{result.flex == 1 ? "Flex" : ''}</td>
                                            {/* <td className="poppins-regular-18px p-2">{result.indexation_type}</td> */}

                                            <td className="p-2">
                                                <Link href={'/indexation/' + result.id} className="">
                                                    <a type="button" >
                                                        <MdEdit
                                                            className="color-skyblue me-2"
                                                            data-toggle="tooltip"
                                                            title="Edit cost center"
                                                        />
                                                    </a>
                                                </Link>
                                                <span onClick={() => showPopup(result)} type="button">
                                                    <MdDelete
                                                        className=" ms-3 color-skyblue "
                                                        data-toggle="tooltip"
                                                        title="Delete Indexation of salary"
                                                    />
                                                </span>



                                            </td>
                                        </tr>
                                    ))}
                                {/*----------------------------No records found-------------------------- */}
                                {indexation.length == 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-3 border poppins-regular-18px">
                                            {t('No records')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* -------------------------- Pagination--------------------------- */}
                <div className="row my-4">
                    {indexation.length >= itemsPerPage && (
                        <Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount} />
                        // <ReactPaginate
                        // 	breakLabel="..."
                        // 	nextLabel={<AiOutlineArrowRight />}
                        // 	onPageChange={handlePageClick}
                        // 	pageRangeDisplayed={5}
                        // 	pageCount={pageCount}
                        // 	previousLabel={<AiOutlineArrowLeft />}
                        // 	renderOnZeroPageCount={null}
                        // 	containerClassName={'pagination justify-content-center project-pagination'}
                        // 	itemClass="page-item"
                        // 	linkClass="page-link"
                        // 	subContainerClassName={'pages pagination'}
                        // 	activeClassName={'active'}
                        // />
                    )}
                </div>

                <div className="text-start col-md-6">
                    <BackLink path={'/'} />
                </div>
            </form>
            {showdeletepopup == true && (
                <SalaryIndexationDeletePopup display={'block'} popupActionNo={closePopup} popupActionYes={update} />
            )}
        </div>
    );
}
export default React.memo(Translation(ManageIndexationOfSalaries, ['Manage indexation of salaries', 'Add Indexation of salary', 'Date', 'Indexation value', 'PC', 'Employee type', 'Action', 'back']));