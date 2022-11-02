import React, { useState, useEffect, useContext } from "react";
import Link from 'node_modules/next/link';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { APICALL } from '../../Services/ApiServices';
import { fetchEmployeeWidgetPlanning } from '../../Services/ApiEndPoints';
import moment from 'moment';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CancelContract from "./CancelContract";

function EmployeeWidgetBlock(props) {
    const current_time = moment();
    var contract_id;
    const [visible, setVisible] = useState(3);
    const [cancel_con, setCancel_con]=useState(false);
    const viewMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    };
    const cancel_contact =() => {
        console.log('kkk');
        setCancel_con(true);

    };
    // const storeval =(a) =>{
    //     contract_id=a;
    //     return contract_id;

    // }

    const [widget, setWidget] = useState([]);
    const [widgetTemp, setWidgetTemp] = useState([]);
    const [widgetTemp2, setWidgetTemp2] = useState([]);
    const [contractid,setContractId]=useState(null);
    const { contextState = {} } = useContext(UserAuthContext);

    useEffect(
        () => {

            if (contextState.uid != '') {
                APICALL.service(fetchEmployeeWidgetPlanning + contextState.uid, 'GET')
                    .then((result) => {
                        if (result.status == 200) {
                            console.log(result.data);
                            // alert(result.data[0]['contract_id']);
                            var  contract_id =result.data[0]['contract_id'];
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
        
        
        <div className="container-fluid p-2 employee_widget_dashboard">   
        {/* {cancel_con?alert('true'):alert('false')} */}
        {cancel_con == true && (
				<div
                className="modal"
                id="myModal"
                tabIndex="-1"
                style={{ display: cancel_con ? "block" : "none" }}
            >
               <CancelContract  handleClosePopup = {handleClosePopup} contract ={contractid} />    
                
            </div>
			)}
         
            <form>
                <div className="row m-0 ">
                
                    <p className="h3 px-0  bitter-italic-normal-medium-22 mt-2">Employees currently working ({moment().format('D-M-YYYY, h:mm a')})</p>
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
                                    widgetTemp2.slice(0, visible).map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id}>
                                            <td className="poppins-regular-16px p-2">{result.name}</td>
                                            <td className="poppins-regular-16px p-2">{result.company_name}</td>
                                            <td className="poppins-regular-16px p-2">{result.location_name}</td>
                                            <td className="poppins-regular-16px p-2">{moment(result.actual_end_time).format('HH:mm')}</td>
                                            <td className="poppins-regular-16px p-2 d-inline-flex align-middle">
                                                {moment(result.actual_end_time) < current_time &&
                                                    <Link href='' className="m-2">
                                                        <a type="button" className="warning-icon-solid">

                                                        </a>
                                                    </Link>
                                                }
                                                <Link href='' className="m-2">
                                                    <a type="button" className="stop-working-icon-solid"
                                                    // onClick={showPopup} 
                                                    >

                                                    </a>
                                                </Link>
                                                <Link href='' className="m-2">
                                                    <a type="button" className="cross-icon-solid"
                                                    onClick={cancel_contact} 
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
                                            No records
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-end mb-3 p-0">
                        {widget.length > 3 &&
                            <Link href='/pwa/employee-widget' className="m-2">
                                <a type="button" className="mt-2">View more &nbsp;
                                    <AiOutlineArrowRight />
                                </a>
                            </Link>
                        }
                    </div>
                </div>
            </form>
        </div>

    );
}
export default EmployeeWidgetBlock;
