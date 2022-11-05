import React, { useEffect, useState , useContext } from 'react';
import { GrValidate } from 'react-icons/gr';
import { BiRotateRight } from 'react-icons/bi';
import { APICALL } from '../../Services/ApiServices';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { fetchEncodageDeatils } from '../../Services/ApiEndPoints';
import Translation from '@/Translation';
function EncodageValidation(props) {
    const {t}=props;
    const { contextState = {} } = useContext(UserAuthContext);
    const [ companies,setCompanies]=useState();
    const [ locations,setLocations]=useState();
    useEffect(
        () => {
            // if (contextState.uid != null&&contextState.uid != undefined&&contextState.uid != ''){
			// 	setUid(contextState.uid);
			// }
            APICALL.service(fetchEncodageDeatils, 'GET')
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [props]
    );
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Encodage validations')}</p>
                    <div className="form-check p-0 mt-2  ">
                        {/* ----------------Search functionality--------------------------------*/}

                        <div className="row d-flex mt-3">
                            <div className="col-sm-2 field_height">
                                <label>{t('Company')}</label>
                                <select className="form-select mt-2" aria-label="Default select example">
                                    <option selected>{t('Select')}</option>
                                    <option value="1">{t('One')}</option>
                                    <option value="2">{t('Two')}</option>
                                    <option value="3">{t('Three')}</option>
                                </select>
                            </div>
                            <div className="col-sm-2 field_height">
                                <label>{t('Location')}</label>
                                <select className="form-select mt-2" aria-label="Default select example">
                                    <option selected>{t('Select')}</option>
                                    <option value="1">{t('One')}</option>
                                    <option value="2">{t('Two')}</option>
                                    <option value="3">{t('Three')}</option>
                                </select>
                            </div>
                            <div className="col-sm-2 field_height">
                                <label>{t('Cost center')}</label>
                                <select className="form-select mt-2" aria-label="Default select example">
                                    <option selected>{t('Select')}</option>
                                    <option value="1">{t('One')}</option>
                                    <option value="2">{t('Two')}</option>
                                    <option value="3">{t('Three')}</option>
                                </select>
                            </div>
                            <div className="col-sm-2 field_height">
                                <label>{t('Project')}</label>
                                <select className="form-select mt-2" aria-label="Default select example">
                                    <option selected>{t('Select')}</option>
                                    <option value="1">{t('One')}</option>
                                    <option value="2">{t('Two')}</option>
                                    <option value="3">{t('Three')}</option>
                                </select>
                            </div>
                            {/*---------------- Search functionality---------------------- */}

                            <div className="col-sm-3 field_height mt-2">
                                <div className='row'>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"

                                        >
                                            {t('SEARCH')}
                                        </button>
                                    </div>
                                    {/*---------------- Reset functionality---------------------- */}

                                    <div className="col-md-6">

                                        <button
                                            type="button"
                                            className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset-btn w-100 shadow-none"
                                        >
                                            {t('RESET')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                            <table className="table mt-3 mb-3">
                                <thead>
                                    <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-4"></th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Date')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('First name')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Last name')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Planned start time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actual start time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Planned end time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Actual end time')}</th>
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border poppins-regular-18px p-2" >
                                        <td className="poppins-regular-18px p-2 ps-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td className="poppins-regular-18px p-2">06-07-2022</td>
                                        <td className="poppins-regular-18px p-2">Steve</td>
                                        <td className="poppins-regular-18px p-2">Jobs</td>
                                        <td className="poppins-regular-18px p-2">8:00</td>
                                        <td className="poppins-regular-18px p-2">8:30</td>
                                        <td className="poppins-regular-18px p-2">17:30</td>
                                        <td className="poppins-regular-18px p-2">17:45</td>
                                        <td className="poppins-regular-18px p-2"><GrValidate className='me-2' /> <BiRotateRight /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/*---------------Back to dashobard redirection------------------ */}
                    <div className="text-start col-md-6">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"

                        >
                            {t('BACK')}
                        </button>
                    </div>
                    <div className="col-md-6 p-0">
                        <button
                            type="submit"
                            // className="btn rounded-0 custom-btn px-3 btn-block float-end"
                            className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
                        >
                            {t('Validate')}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}
export default React.memo(Translation(EncodageValidation,['Company','Encodage validations','Location','Select','One','Two','Three','Cost center','Project','SEARCH','RESET',
'Date','First name','Last name','Planned start time','Actual start time','Planned end time','Actual end time','Action','BACK','Validate'
]));
