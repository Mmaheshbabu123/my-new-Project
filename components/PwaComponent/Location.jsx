import React, { useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import ValidationService from '../../Services/ValidationService';
import Translation from "@/Translation";

function AddLocation(props) {
    const {t} = props;
    const [error_company, setError_company] = useState('');
    const [error_location, setError_location] = useState('');
    const [error_street, setError_street] = useState('');
    const [error_number, setError_number] = useState('');
    const [error_box, setError_box] = useState('');
    const [error_postalcode, setError_postalcode] = useState('');
    const [error_city, setError_city] = useState('');
    const [error_country, setError_country] = useState('');

    const [data, setData] = useState({
        id: '',
        company: '',
        location: '',
        // location_manager: '',
        street: '',
        number: '',
        box: '',
        postalcode: '',
        city: '',
        country: '',
    });

    let validate = (res) => {
        var error1 = [];

        /**
         * check if required fields are empty
         */
        error1['company'] = ValidationService.emptyValidationMethod(res.company);
        error1['location'] = ValidationService.emptyValidationMethod(res.location);
        error1['street'] = ValidationService.emptyValidationMethod(res.street);
        error1['number'] = ValidationService.emptyValidationMethod(res.number);
        error1['box'] = ValidationService.emptyValidationMethod(res.box);
        error1['postalcode'] = ValidationService.emptyValidationMethod(res.postalcode);
        error1['city'] = ValidationService.emptyValidationMethod(res.city);
        error1['country'] = ValidationService.emptyValidationMethod(res.country);

        /**
         * postalcode validation
         */
        error1['postalcode'] =
            error1['postalcode'] == ''
                ? ValidationService.postalCodeValidationMethod(res.postalcode)
                : error1['postalcode'];

        /**
        * seterror messages
        */
        setError_company(error1['company']);
        setError_location(error1['location']);
        setError_street(error1['street']);
        setError_number(error1['number']);
        setError_box(error1['box']);
        setError_postalcode(error1['postalcode']);
        setError_city(error1['city']);
        setError_country(error1['country']);

        //return false if there is an error else return true
        if (
            error1['company'] == '' &&
            error1['location'] == '' &&
            error1['street'] == '' &&
            error1['number'] == '' &&
            error1['box'] == '' &&
            error1['postalcode'] == '' &&
            error1['city'] == '' &&
            error1['country'] == ''
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
        }

    }

    return (
        <div className="container-fluid p-0">
            <form onSubmit={(e) => submit(e)}>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">{t('Add location')}</p>
                    <div className="form-check p-0 mt-2  border ">
                        <div className="p-3">
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
                                    <option value="select">{t('Select')}</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <p className="error mt-2">{error_company}</p>

                            </div>

                            <div className="mb-3">
                                <label className="form-label custom_astrick">{t('Location name')}</label>
                                <input type="select" className="form-control rounded-0"
                                    value={data.location}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            location: e.target.value
                                        }));
                                    }}
                                />
                                <p className="error mt-2">{error_location}</p>
                            </div>


                            <div className="mb-3">
                                <label className="form-label ">{t('Location manager')}</label>
                                <Multiselect
                                    // value={data.location_manager}
                                    // options={this.state.options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onSelect={this.onSelect} // Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label custom_astrick">{t('Street')}</label>
                                    <input type="select" className="form-control rounded-0"
                                    value={data.street}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            street: e.target.value
                                        }));
                                    }}
                                    />
                                    <p className="error mt-2">{error_street}</p>

                                </div>

                                <div className="col">
                                    <label className="form-label custom_astrick">{t('Number')}</label>
                                    <input type="select" className="form-control rounded-0"
                                    value={data.number}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            number: e.target.value
                                        }));
                                    }}
                                    />
                                    <p className="error mt-2">{error_number}</p>

                                </div>
                                <div className="col">
                                    <label className="form-label ">{t('Box')}</label>
                                    <input type="select" className="form-control rounded-0"
                                    value={data.box}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            box: e.target.value
                                        }));
                                    }}
                                    />
                                    <p className="error mt-2">{error_box}</p>

                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col">
                                    <label className="form-label custom_astrick">{t('Postal code')}</label>
                                    <input type="select" className="form-control rounded-0"
                                    value={data.postalcode}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            postalcode: e.target.value
                                        }));
                                    }}
                                    />
                                    <p className="error mt-2">{error_postalcode}</p>
                                </div>

                                <div className="col">
                                    <label className="form-label custom_astrick">{t('City')}</label>
                                    <input type="select" className="form-control rounded-0"
                                    value={data.city}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            city: e.target.value
                                        }));
                                    }}
                                    />
                                    <p className="error mt-2">{error_city}</p>

                                </div>
                                <div className="col">

                                    <label className="form-label custom_astrick">{t('Country')}</label>
                                    <select className="form-select"
                                    value={data.country}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            country: e.target.value
                                        }));
                                    }}
                                    >
                                        <option value="select">{t('Select')}</option>
                                        <option value="1">Country 1</option>
                                        <option value="2">Country 2</option>
                                        <option value="3">Country 3</option>
                                    </select>
                                    <p className="error mt-2">{error_country}</p>

                                </div>
                            </div>
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
export default  React.memo(Translation(AddLocation,['Add location','Company','Select','Location name',
'Location manager','Street','Number','Box','Postal code','City','Country','Select','BACK','Save'
]));
