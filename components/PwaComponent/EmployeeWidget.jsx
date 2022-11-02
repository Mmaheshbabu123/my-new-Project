import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Link from 'node_modules/next/link';
import Image from "next/image";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { APICALL } from '../../Services/ApiServices';
import { fetchEmployeeWidgetPlanning } from '../../Services/ApiEndPoints';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import moment from 'moment';
import Pagination from '../PcComponent/Pagination';
import StopPlanning from "./StopPlanning";
import BackLink from '../BackLink';
import { ExitToApp } from "node_modules/@material-ui/icons/index";


function EmployeeWidget(props) {

    const current_time = moment();
    const [addProject, setAddProject] = useState(false);

    // For popup add project
    const [show, setShow] = useState(true);
    
    // CLOSE POPUP //
    const closePopup = () => {
        setShow(false);
    };

    // SHOW POPUP //
    const showPopup = (id) => {
        setShow(true);
    };

    const [widget, setWidget] = useState([]);
    const [widgetTemp, setWidgetTemp] = useState([]);
    const [widgetTemp2, setWidgetTemp2] = useState([]);
    const [updated, setUpdated] = useState(0);
    const [popupdata,setPopUpData]=useState(null);
    /**
     * Initialise search filter 
     */
    const [searchname, setSearchname] = useState('');
    const [searchcompany, setSearchcompany] = useState('');
    const [searchlocation, setSearchlocation] = useState('');



    /**
     * Reset button hide and show depending on the search values
     */
    const [search, setSearch] = useState(false);

    const { contextState = {} } = useContext(UserAuthContext);

    useEffect(
        () => {

            if (contextState.uid != '') {
                APICALL.service(fetchEmployeeWidgetPlanning + contextState.uid, 'GET')
                    .then((result) => {
                        if (result.status == 200) {
                            // console.log(result.data);

                            if(result.data!=undefined){
                                setWidget(result.data);
                            setWidgetTemp(result.data);
                            setWidgetTemp2(result.data);
                            }else{
                                setWidget('');
                                setWidgetTemp('');
                                setWidgetTemp2(''); 
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        [props, contextState.uid, updated]
    );

    /**
     * Pagination related variables
     */
    const [itemsPerPage, setItemsPerPage] = useState(8);

    //------------------- Pagination code -------------------------//
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(
        () => {
            const endOffset = itemOffset + itemsPerPage;
            if (widget != undefined) {
                setWidgetTemp2(widget.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(widget.length / itemsPerPage));
            }
        },
        [itemOffset, itemsPerPage, widget]
    );

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % widget.length;
        setItemOffset(newOffset);
    };
    //------------------- Pagination code -------------------------//

    function handleSearch() {
        setSearch(true);
        var res = [];

        //-------------------------If all three values are given to filter----------------------//
        if (searchname != '' && searchcompany != '' && searchlocation != '') {
            widgetTemp.map((val) => {
                if (
                    val['name'].trim().toLowerCase().includes(searchname.trim().toLowerCase()) &&
                    (val['company_name'] != undefined &&
                        val['company_name'] != '' &&
                        val['company_name'] != null &&
                        val['company_name'].trim().toLowerCase().includes(searchcompany.trim().toLowerCase())) &&
                    (val['location_name'] != undefined &&
                        val['location_name'] != '' &&
                        val['location_name'] != null &&
                        val['location_name'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase()))

                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        } else if (searchname != '' && searchcompany != '') {
            widgetTemp.map((val) => {
                if (
                    val['name'] != undefined &&
                    val['name'] != '' &&
                    val['name'] != null &&
                    val['name'].trim().toLowerCase().includes(searchname.trim().toLowerCase()) &&
                    (val['company_name'] != undefined &&
                        val['company_name'] != '' &&
                        val['company_name'] != null &&
                        val['company_name'].trim().toLowerCase().includes(searchcompany.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
        else if (searchcompany != '' && searchlocation != '') {
            widgetTemp.map((val) => {
                if (
                    val['company_name'] != undefined &&
                    val['company_name'] != '' &&
                    val['company_name'] != null &&
                    val['company_name'].trim().toLowerCase().includes(searchcompany.trim().toLowerCase()) &&
                    (val['location_name'] != undefined &&
                        val['location_name'] != '' &&
                        val['location_name'] != null &&
                        val['location_name'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
        else if (searchlocation != '' && searchname != '') {
            widgetTemp.map((val) => {
                if (
                    val['location_name'] != undefined &&
                    val['location_name'] != '' &&
                    val['location_name'] != null &&
                    val['location_name'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase()) &&
                    (val['name'] != undefined &&
                        val['name'] != '' &&
                        val['name'] != null &&
                        val['name'].trim().toLowerCase().includes(searchname.trim().toLowerCase()))
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
        else if (searchname != '') {
            // ----------If single value is given to filter---------------//
            widgetTemp.map((val) => {
                if (
                    val['name'] != undefined &&
                    val['name'] != '' &&
                    val['name'] != null &&
                    val['name'].trim().toLowerCase().includes(searchname.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
        else if (searchcompany != '') {
            // ----------If single value is given to filter---------------//
            widgetTemp.map((val) => {
                if (
                    val['company_name'] != undefined &&
                    val['company_name'] != '' &&
                    val['company_name'] != null &&
                    val['company_name'].trim().toLowerCase().includes(searchcompany.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
        else if (searchlocation != '') {
            // ----------If single value is given to filter---------------//
            widgetTemp.map((val) => {
                if (
                    val['location_name'] != undefined &&
                    val['location_name'] != '' &&
                    val['location_name'] != null &&
                    val['location_name'].trim().toLowerCase().includes(searchlocation.trim().toLowerCase())
                ) {
                    res.push(val);
                }
            });
            setWidget(res);
            setItemOffset(0);
        }
    }
    // ---------------------Search reset------------------- //
    function handleReset() {
        setSearch(false);
        setWidget(widgetTemp);
        setSearchname('');
        setSearchcompany('');
        setSearchlocation('');

    }

    //----------------Warning icon------------------------//



    return (
        <div className="cemployee_widget_dashboard">
            <form>
                <div className="row m-0 ">
                    <p className="px-0  bitter-italic-normal-medium-22">Employees currently working  ({moment().format('D-M-YYYY, h:mm a')}) </p>


                    <div className="row d-flex ">
                        <div className="col-sm-3 field_height">
                            <input
                                type="search"
                                id="form12"
                                className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                placeholder="Company"
                                value={searchcompany}
                                onChange={(e) => setSearchcompany(e.target.value)}
                            />
                        </div>

                        <div className="col-sm-3 field_height">
                            <input
                                type="search"
                                id="form12"
                                className="form-control mt-2 mb-2 text-break input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none  "
                                placeholder="Location"
                                value={searchlocation}
                                onChange={(e) => setSearchlocation(e.target.value)}
                            />
                        </div>

                        <div className="col-sm-3 field_height">
                            <input
                                type="search"
                                id="form12"
                                className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                placeholder="Employee name"
                                value={searchname}
                                onChange={(e) => setSearchname(e.target.value)}
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
                                        Search
                                    </button>
                                </div>
                                {/*---------------- Reset functionality---------------------- */}

                                <div className="col-md-6">
                                    {(searchname != '' ||
                                        searchcompany != '' ||
                                        searchlocation != '' ||
                                        search === true) && (
                                            <button
                                                type="button"
                                                className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
                                                onClick={() => handleReset()}
                                            >
                                                Reset
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-check p-0 mt-2 tab-pane fade show ">
                        <table className="table mb-0">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">Name</th>
                                    <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">Company</th>
                                    <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">Location</th>
                                    <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">Planned stop time</th>
                                    <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                {widgetTemp2.length > 0 &&
                                    widgetTemp2.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id}>
                                            <td className="poppins-regular-16px p-2">{result.name}</td>
                                            <td className="poppins-regular-16px p-2">{result.company_name}</td>
                                            <td className="poppins-regular-16px p-2">{result.location_name}</td>
                                            <td className="poppins-regular-16px p-2">{moment(result.planned_endtime).format('HH:mm')}</td>
                                            {/* {moment(result.planned_endtime).format('HH:mm')} */}
                                            <td className="poppins-regular-16px p-2 d-inline-flex align-middle">
                                                {moment(result.planned_endtime) < current_time &&
                                                    <Link href='' className="m-2">
                                                        <a type="button" className="warning-icon-solid"
                                                        data-toggle="tooltip"
                                                        title="Employee has crossed planned stop time"
                                                        >

                                                        </a>
                                                    </Link>
                                                }
                                                <Link href='' className="m-2">
                                                    <a type="button" className="stop-working-icon-solid"
                                                    data-toggle="tooltip"
                                                    title="Stop planning"
                                                    onClick={()=>{showPopup();setPopUpData([result.name,result.planned_endtime,result.worked_id,contextState.uid]);}} 
                                                    >

                                                    </a>
                                                </Link>
                                                <Link href='' className="m-4">
                                                    <a type="button" className="cross-icon-solid"
                                                     data-toggle="tooltip"
                                                     title="Cancel contract"
                                                    // onClick={showPopup} 
                                                    >
                                                    </a>
                                                </Link>

                                            </td>

                                        </tr>

                                    ))}
                                {/*----------------------------No records found-------------------------- */}
                               
                                    { widget.length == 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-3 border poppins-regular-18px">
                                                No records
                                            </td>
                                        </tr>
                                    )}

                            </tbody>
                        </table>
                    </div>
                </div>

            </form>
            <div className="">

              {show &&  <StopPlanning
								data={widget}
								display={'block'}
								// company={company}
								// company_id={companyid}
								popupActionNo={closePopup}
								popupActionYes={showPopup}
								// updatecompany={updatcomp}
								// countries={countrylist}
                                Data={popupdata}
							/>
              }

            </div>

            {/*-------------------------- Pagination---------------------------*/}
            <div className="row my-4">
                {widget.length > itemsPerPage && (
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
           
        </div>
    );
}
export default EmployeeWidget;
