import React, { useState } from "react";
import ValidationService from '../../Services/ValidationService';
import Translation from "@/Translation";

import { addcostcenter } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';

function AddCostCenter(props) {
    const {t}=props;
    const [error_cost_center_name, setError_cost_center_name] = useState('');
    const [error_unique_number, setError_unique_number] = useState('');
    const [error_company, setError_company] = useState('');
    const [error_location, setError_location] = useState('');


    const [data, setData] = useState({
        id: '',
        cost_center_name: '',
        unique_number: '',
        company: '',
        location: '',

    });

    let validate = (res) => {
        var error1 = [];

        /**
         * check if required fields are empty
         */
        error1['cost_center_name'] = ValidationService.emptyValidationMethod(res.cost_center_name);
        error1['unique_number'] = ValidationService.emptyValidationMethod(res.unique_number);
        error1['company'] = ValidationService.emptyValidationMethod(res.company);
        error1['location'] = ValidationService.emptyValidationMethod(res.location);

        /**
         * check if cost center name is valid
         */
        // error1['cost_center_name'] =
        //     error1['cost_center_name'] == ''
        //         ? ValidationService.numberValidationMethod(res.cost_center_name)
        //         : error1['cost_center_name'];

        /**
         * Check if cost center unique number is valid or not
         */
        // error1['unique_number'] =
        //     error1['unique_number'] == ''
        //         ? ValidationService.numberValidationMethod(res.cost_center_name)
        //         : error1['unique_number'];

        /**
         * seterror messages
         */
        setError_cost_center_name(error1['cost_center_name']);
        setError_unique_number(error1['unique_number']);
        setError_company(error1['company']);
        setError_location(error1['location']);

        //return false if there is an error else return true
        if (
            error1['cost_center_name'] == '' &&
            error1['unique_number'] == '' &&
            error1['company'] == '' &&
            error1['location'] == ''
        ) {
            return true;
        } else {
            return false;
        }


    }

    let submit = async (event) => {
        event.preventDefault();
        var valid_res = validate(data);
        // alert(valid_res);
        if (valid_res) {
        // 	 alert('1111');
        	 console.log(data);

             APICALL.service(addcostcenter, 'POST',data)
             .then((data) => {
                 console.log(data);
             })
             .catch((error) => {
                 console.log(error);
             });
        }

    }
    return (
        <div className="container-fluid p-0">
            <form onSubmit={(e) => submit(e)}>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Add cost center')}</p>
                    <div className="form-check p-0 mt-2  border ">
                        <div className="p-3">
                            <div className="mb-3">
                                <label className="form-label custom_astrick">{t('Cost center name')}</label>
                                <input type="select" className="form-control rounded-0"
                                    value={data.cost_center_name}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            cost_center_name: e.target.value
                                        }));
                                    }}
                                />
                            </div>
                            <p className="error mt-2">{error_cost_center_name}</p>

                            <div className="mb-3">
                                <label className="form-label custom_astrick">{t('Unique number for cost center')}</label>
                                <input type="select" className="form-control rounded-0"
                                    value={data.unique_number}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            unique_number: e.target.value
                                        }));
                                    }}
                                />
                            </div>
                            <p className="error mt-2">{error_unique_number}</p>

                            <div className="mb-3">
                                <label className="form-label custom_astrick">{t('Company')}</label>
                                <select className="form-select"
                                    value={data.company}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            company: e.target.value
                                        }));
                                    }}
                                >
                                    <option value="Select" >{t('Select')}</option>
                                    <option value="1">Company one</option>
                                    <option value="2">Company two</option>
                                    <option value="3">Company three</option>
                                </select>
                            </div>
                            <p className="error mt-2">{error_company}</p>

                            <div className="mb-3">
                                <label className="form-label custom_astrick">{t('Location')}</label>
                                <select className="form-select"
                                    value={data.location}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            location: e.target.value
                                        }));
                                    }}
                                >
                                    <option value="Select" >{t('Select')}</option>
                                    <option value="1">Location one</option>
                                    <option value="2">Location two</option>
                                    <option value="3">Location three</option>
                                </select>
                            </div>
                            <p className="error mt-2">{error_location}</p>


                        </div>
                    </div>
                    <div className="text-start col-md-6">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"

                        >
                            {t('BACK')}
                        </button>
                    </div>
                    <div className="col-md-6 p-0 mt-3">
                        <button
                            type="submit"
                            // className="btn rounded-0 custom-btn px-3 btn-block float-end"
                            className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
                        >
                            {t('Save')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default React.memo(Translation(AddCostCenter,['Add cost center','Cost center name','Unique number for cost center','Company','Select','Location','Select','BACK','Save']));
