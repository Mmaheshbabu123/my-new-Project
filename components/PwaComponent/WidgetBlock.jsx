import React, { useState, useEffect, useContext } from "react";
import Link from 'node_modules/next/link';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { APICALL } from '../../Services/ApiServices';
import { fetchEmployeeWidgetPlanning } from '../../Services/ApiEndPoints';
import moment from 'moment';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CancelContract from "./CancelContract";
import StopPlanning from "./StopPlanning";
import { isMobile } from 'react-device-detect';
import Translation from '@/Translation';


function EmployeeWidgetBlock(props) {

    const { t } = props;

    const current_time = moment();
    var contract_id;
    const [visible, setVisible] = useState(3);
    const [cancel_con, setCancel_con] = useState(false);

    // For popup stop planning
    const [show, setShow] = useState(false);
    const [popupdata, setPopUpData] = useState('');


    const viewMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    };
    const cancel_contact = () => {
        console.log('kkk');
        setCancel_con(true);

    };

    // CLOSE POPUP //
    const closePopup = () => {
        setShow(false);
    };

    // SHOW POPUP //
    const showPopup = (id) => {
        setShow(true);
    };

    // const storeval =(a) =>{
    //     contract_id=a;
    //     return contract_id;

    // }

    const [widget, setWidget] = useState([]);
    const [widgetTemp, setWidgetTemp] = useState([]);
    const [widgetTemp2, setWidgetTemp2] = useState([]);
    const [contractid, setContractId] = useState(null);
    const [deviceType, setDeviceType] = useState('desktop');

    const { contextState = {} } = useContext(UserAuthContext);

    /**Auto refresh */
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(
        () => {

            if (contextState.uid != '') {
                APICALL.service(fetchEmployeeWidgetPlanning + contextState.uid, 'GET')
                    .then((result) => {
                        if (result.status == 200) {
                            console.log(result.data);
                            // alert(result.data[0]['contract_id']);
                            var contract_id = result.data[0]['contract_id'];
                            setContractId(contract_id);
                            setWidget(result.data);
                            setWidgetTemp(result.data);
                            setWidgetTemp2(result.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        [props, contextState.uid]
    );
    const handleClosePopup = () => {
        setCancel_con(false);

    }
    console.log(cancel_con);
    return (


        <div className="border mb-2 p-2 employee_widget_dashboard">

            {cancel_con == true && (
                <div
                    className="modal"
                    id="myModal"
                    tabIndex="-1"
                    style={{ display: cancel_con ? "block" : "none", background: 'rgb(0,0,0,0.5)' }}
                >
                    <CancelContract handleClosePopup={handleClosePopup} contract={contractid} title={'Cancel Contract'} />

                </div>
            )}

            <form>
                {!isMobile ?
                    <div className="row m-0 ">

                        <p className="h3 px-0  bitter-italic-normal-medium-22 mt-2">{t('Employees currently working')} ({moment().format('D-M-YYYY, h:mm a')})</p>
                        <div className="form-check p-0 mt-2 tab-pane fade show ">
                            <table className="table mb-0">
                                <thead>
                                    <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">{t('Name')}</th>
                                        <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">{t('Company')}</th>
                                        <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">{t('Location')}</th>
                                        <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">{t('Planned stop time')}</th>
                                        <th className="poppins-medium-16px btn-bg-gray-medium align-middle p-2 employee_width_col">{t('Action')}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {widgetTemp2.length > 0 &&
                                        widgetTemp2.slice(0, visible).map((result) => (
                                            <tr className="border poppins-regular-18px p-2" key={result.id}>
                                                <td className="poppins-regular-16px p-2" data-toggle="tooltip" title={result.name}>{result.name}</td>
                                                <td className="poppins-regular-16px p-2 text-truncate d-inline-block" data-toggle="tooltip" title={result.company_name} style={{ width: '150px', verticalAlign: 'middle' }}>{result.company_name}</td>
                                                <td className="poppins-regular-16px p-2" data-toggle="tooltip" title={result.location_name}>{result.location_name}</td>
                                                <td className="poppins-regular-16px p-2">{moment(result.planned_endtime).format('HH:mm')}</td>
                                                <td className="poppins-regular-16px p-2 d-inline-flex align-middle">
                                                    {moment(result.planned_endtime) < current_time &&
                                                        <Link href='' className="m-2">
                                                            <a type="button" className="warning-icon-solid"
                                                                data-toggle="tooltip"
                                                                title={t("Employee has crossed planned stop time")}
                                                            >

                                                            </a>
                                                        </Link>
                                                    }
                                                    <Link href='' className="">
                                                        <a type="button" className="stop-working-icon-solid"
                                                            // onClick={showPopup} 
                                                            data-toggle="tooltip"
                                                            title={t("Stop planning")}
                                                            onClick={() => { showPopup(); setPopUpData([result.name, result.planned_endtime, result.worked_id, contextState.uid]); }}
                                                        >

                                                        </a>
                                                    </Link>
                                                    <Link href='' className="m-2">
                                                        <a type="button" className="cross-icon-solid"
                                                            onClick={cancel_contact}
                                                            data-toggle="tooltip"
                                                            title={t("Cancel Contract")}
                                                        >

                                                        </a>
                                                    </Link>

                                                </td>

                                            </tr>
                                        ))}
                                    {/*----------------------------No records found-------------------------- */}
                                    {widget.length == 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-3 border poppins-regular-18px">
                                                {t('Currently no employee working')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-end p-0">
                            {widget.length > 3 &&
                                <Link href='/pwa/employee-widget' className="m-2">
                                    <a type="button" className="mt-2 view-more-employee-widget text-decoration-underline">{t('View more')} &nbsp;
                                        <AiOutlineArrowRight />
                                    </a>
                                </Link>
                            }
                        </div>
                    </div> :
                    <div className="row m-0 ">
                        <p className="h3 px-0  bitter-italic-normal-medium-22 mt-2 ms-3">{t('Employees currently working')} </p>
                        <p className="h3 px-0  bitter-italic-normal-medium-22 mt-1 ms-3">({moment().format('D-M-YYYY, h:mm a')})</p>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item  p-2">
                                {widgetTemp2.length > 0 &&
                                    widgetTemp2.slice(0, visible).map((result) => (
                                        <div className="m-2 " key={result.id}>
                                            <h2 className="accordion-header" id="headingTwo">

                                                <button className="accordion-button collapsed bg-light " type="button" data-bs-toggle="collapse" data-bs-target={"#collapseTwo" + result.id} aria-expanded="false" aria-controls="collapseTwo">
                                                    {result.name}
                                                </button>

                                            </h2>
                                            <div id={"collapseTwo" + result.id} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">                                           
                                             <div className="accordion-body ">

                                                <div className="row m-2 " key={result.id}>
                                                    <div className="col-sm-4 mb-1">{t('Company')}</div>
                                                    <div className="col-sm-6 text-black-50">{result.company_name}</div>
                                                </div>
                                                <div className="row m-2 p-1 " key={result.id}>
                                                    <div className="col-sm-4 mb-1">{t('Location')}</div>
                                                    <div className="col-sm-8 text-black-50">{result.location_name}</div>
                                                </div>
                                                <div className="row m-2 p-1 " key={result.id}>
                                                    <div className="col-sm-4 mb-1">{t('Planned stop time')}</div>
                                                    <div className="col-sm-8 text-black-50">{moment(result.planned_endtime).format('HH:mm')}</div>
                                                </div>
                                                <div className="row m-2 p-1" key={result.id}>

                                                    <div className="col">
                                                        {moment(result.planned_endtime) < current_time &&
                                                            <Link href='' className="">
                                                                <a type="button" className="warning-icon-solid ms-2"
                                                                    data-toggle="tooltip"
                                                                    title={t("Employee has crossed planned stop time")}
                                                                >
                                                                </a>
                                                            </Link>
                                                        }
                                                        <Link href='' className="">
                                                            <a type="button" className="stop-working-icon-solid ms-2"
                                                                // onClick={showPopup} 
                                                                data-toggle="tooltip"
                                                                title={t("Stop planning")}
                                                                onClick={() => { showPopup(); setPopUpData([result.name, result.planned_endtime, result.worked_id, contextState.uid]); }}
                                                            >
                                                            </a>
                                                        </Link>
                                                        <Link href='' className="m-2">
                                                            <a type="button" className="cross-icon-solid ms-2"
                                                                onClick={cancel_contact}
                                                                data-toggle="tooltip"
                                                                title={t("Cancel Contract")}
                                                            >
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            </div>
                                        </div>
                                    ))}
                                {/*----------------------------No records found-------------------------- */}
                                {widget.length == 0 && (
                                    <div className="row m-2 p-1 ">
                                        <div className="col text-center">{t('Currently no employee working')}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-end p-0">
                            {widget.length > 3 &&
                                <Link href='/pwa/employee-widget' className="m-2">
                                    <a type="button" className="mt-2 view-more-employee-widget text-decoration-underline">{t('View more')} &nbsp;
                                        <AiOutlineArrowRight />
                                    </a>
                                </Link>
                            }
                        </div>
                    </div>}
            </form>
            <div className="">

                {show && <StopPlanning
                    data={widget}
                    display={'block'}
                    popupActionNo={closePopup}
                    popupActionYes={showPopup}
                    Data={popupdata}
                />
                }

            </div>

        </div>

    );
}
export default React.memo(Translation(EmployeeWidgetBlock, ['Employees currently working',
    'Name',
    'Company',
    'Location',
    'Planned stop time',
    'Action',
    'Employee has crossed planned stop time',
    'Stop planning',
    'Cancel Contract',
    'Currently no employee working',
    'View more'
]));