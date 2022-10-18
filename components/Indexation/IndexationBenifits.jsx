import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/purple.css"
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';


const IndexationBenifits = () => {

    /** Date formate */
    const [value, setValue] = useState(new Date());

    const [data, setData] = useState({
        id: '',
        pc: '',
        date: '',
        benefits: '',
        currentvalue: '',
        newvalue: '',
        category: '',
        function: '',
        employeetype: ''
    })

    /**Validation */
    const [error_pc, setError_pc] = useState('');
    const [error_date, setError_date] = useState('');
    const [error_benefits, setError_benefits] = useState('');
    const [error_currentvalue, setError_currentvalue] = useState('');
    const [error_newvalue, setError_newvalue] = useState('');
    const [error_category, setError_category] = useState('');
    const [error_function, setError_function] = useState('');
    const [error_employeetype, setError_employeetype] = useState('');

    let validate = (res) => {
        var error1 = [];

        /**checking the fiels are empty or not */
        error1['pc'] = ValidationService.emptyValidationMethod(res.pc);
        error1['date'] = ValidationService.emptyValidationMethod(res.date);
        error1['currentvalue'] = ValidationService.emptyValidationMethod(res.currentvalue);
        error1['newvalue'] = ValidationService.emptyValidationMethod(res.newvalue);
        error1['category'] = ValidationService.emptyValidationMethod(res.category);
        error1['function'] = ValidationService.emptyValidationMethod(res.function);
        error1['employeetype'] = ValidationService.emptyValidationMethod(res.employeetype);

        /**Set error message */
        setError_pc(error1['pc']);
        setError_date(error1['date']);
        setError_currentvalue(error1['currentvalue']);
        setError_newvalue(error1['newvalue']);
        setError_category(error1['category']);
        setError_function(error1['function']);
        setError_employeetype(error1['employeetype']);


        /**If error is still then validate again or else proceed  */
        if (error1['pc'] == '' &&
            error1['date'] == '' &&
            error1['currentvalue'] == '' &&
            error1['newvalue'] == '' &&
            error1['category'] == '' &&
            error1['employeetype'] == ''
        ) {
            return true;
        } else {
            return false;
        }

    }

    /**Show hide field based on radio button select */
    const [status, setStatus] = useState(1);

    const radioHandler = (status) => {
        setStatus(status);
    };

    /**Show fields based on selecting option in select list */
    const [showhide, setShowhide] = useState('');

    const handleshowhide = (event) => {
        const get = event.target.value;
        setShowhide(getuser);
        // console.log(getuser);
    }

    let submit = async (event) => {
        event.preventDefault();
        var valid_res = validate(data);
        console.log(valid_res);
    }

    return (
        <div className='container'>
            <form onSubmit={(e) => submit(e)}>
                <div className='row  py-4 '>
                    <div className='col-md-12 px-0 position-sticky-pc'>
                        <p className='bitter-italic-normal-medium-24 '>Indexation of benefits</p>
                    </div>
                </div>
                <div className='row border-purple px-2 py-3'>
                    <div className='col-md-12'>
                        <div className='row'><p className={'  poppins-medium-18px '}>How do you want to index the benefit?</p>
                            <div className="form-check col mt-2 d-flex align-items-center" style={{ paddingLeft: '2.2rem' }}>
                                <input className="form-check-input mb-1" type="radio" checked={status === 1} onClick={(e) => radioHandler(1)} />
                                <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                                    Indexation via selection of one or more benefits
                                </label>
                            </div>
                            <div className="form-check col mt-2 d-flex align-items-center">
                                <input className="form-check-input mb-1" type="radio" checked={status === 2} onClick={(e) => radioHandler(2)} />
                                <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                                    Indexation via selection of one or more benefits
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            {status === 1 &&
                                <div className='col-md-6 mt-2'>
                                    <p className={' poppins-medium-18px mb-2 '}>Benefits</p>
                                    <select className="form-select shadow-none rounded-0 border" onChange={(e) => handleshowhide(e)} >
                                        <option value=''>Select..</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>


                                    <div className='mt-3 indexation_date_field'>
                                        <p className={' poppins-medium-18px mb-2'}>Date as of which indexation takes place</p>
                                        <DatePicker className="purple"
                                            // value={value}
                                            // onChange={setValue}
                                            value={data.date}
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    date: moment(e).format('YYYY-MM-DD')
                                                }));
                                            }}
                                            render={<InputIcon />}
                                        />
                                        <p className="error mt-2">{error_date}</p>
                                    </div>

                                    <div className='mt-2 indexation_paritair_comitte'>
                                        <p className={' poppins-medium-18px mb-2 mt-3'}>Paritair comite</p>
                                        <Select
                                            isMulti={true}
                                            options={[{ value: 1, label: 'PC-101' }]}
                                            disabled={false}
                                            onChange={(value) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    pc: value
                                                }))
                                            }
                                            value={data.pc}
                                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        // onSelect={this.onSelect} // Function will trigger on select event
                                        // onRemove={this.onRemove} // Function will trigger on remove event
                                        // displayValue="Category" // Property name to display in the dropdown options
                                        />
                                    </div>
                                    <p className="error mt-2">{error_pc}</p>

                                </div>
                            }
                            {status === 2 &&
                                <div className='col-md-6 mt-2'>
                                    <p className={' poppins-medium-18px mb-2 mt-3'}>Paritair comite</p>
                                    <Select
                                        isMulti={true}
                                        // options={}
                                        disabled={false}
                                        onChange={(value) =>
                                            setData((prev) => ({
                                                ...prev,
                                                pc: value
                                            }))
                                        }
                                        value={data.pc}
                                    />
                                    <p className="error mt-2">{error_pc}</p>

                                    <div className='mt-3 indexation_date_field'>
                                        <p className={' poppins-medium-18px mb-2'}>Date as of which indexation takes place</p>
                                        <DatePicker className="purple"
                                            // value={value}
                                            // onChange={setValue}
                                            value={data.date}
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    date: moment(e).format('YYYY-MM-DD')
                                                }));
                                            }}
                                            render={<InputIcon />}
                                        />
                                        <p className="error mt-2">{error_date}</p>
                                    </div>

                                    <div className='mt-2 indexation_paritair_comitte'>
                                        <p className={' poppins-medium-18px mb-2 '}>Benefits</p>
                                        <select className="form-select shadow-none rounded-0 border" aria-label="Default select example" onChange={(e) => handleshowhide(e)}>
                                            <option selected>Select..</option>
                                            <option value="1">One</option>
                                            {/* <option value="2">Two</option>
                                        <option value="3">Three</option> */}
                                        </select>
                                    </div>
                                </div>

                            }


                        </div>

                        {showhide === '1' && (
                            <div className="form-group row mt-3">

                                <div className='row'>
                                    <div className='col-sm-2'></div>
                                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2' }>Current value </p></div>
                                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2' }>New value</p></div>
                                </div>

                                <label htmlFor="" className="col-sm-2 col-form-label poppins-regular-18px">Benefit A (PC 118)</label>
                                <div className="col-sm-2">
                                    <input type="textfield" className="form-control rounded-0 shadow-none border"
                                        // onChange={(value) =>
                                        //     setData((prev) => ({
                                        //         ...prev,
                                        //         currentvalue: value
                                        //     }))
                                        // }
                                        // value={data.currentvalue} 
                                    />
                                    {/* <p className="error mt-2">{}</p> */}
                                </div>



                                <div className="col-sm-2">
                                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" 
                                    // value={data.newvalue}
                                        // onChange={(value) =>
                                        //     setData((prev) => ({
                                        //         ...prev,
                                        //         newvalue: value
                                        //     }))
                                        // }
                                    />
                                    {/* <p className="error mt-2">{error_currentvalue}</p> */}
                                </div>
                            </div>
                        )}

                        <div className='row category_function_indexation'>
                            <div className='col-md-6 mt-2'><p className={'  poppins-medium-18px mt-3 mb-2 '}>Category</p>
                                <Select
                                    isMulti={true}
                                    options={[{ value: 1, label: 'category1' }]}
                                    disabled={false}
                                    onChange={(value) =>
                                        setData((prev) => ({
                                            ...prev,
                                            category: value
                                        }))
                                    }
                                    value={data.category}
                                />
                                <p className="error mt-2">{error_category}</p>

                                <div className='mt-2'>
                                    <p className={'  poppins-medium-18px mt-3 mb-2 '}>Function</p>

                                    <Select
                                        isMulti={true}
                                        options={[{ value: 1, label: 'category1' }]}
                                        disabled={false}
                                        onChange={(value) =>
                                            setData((prev) => ({
                                                ...prev,
                                                function: value
                                            }))
                                        }
                                        value={data.function}
                                    />
                                    <p className="error mt-2">{error_function}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className={' poppins-medium-18px mt-3 mb-2'}>Employee type (statuut)</p>
                                    <Select
                                        isMulti={true}
                                        options={[{ value: 1, label: 'category1' }]}
                                        disabled={false}
                                        onChange={(value) =>
                                            setData((prev) => ({
                                                ...prev,
                                                employeetype: value
                                            }))
                                        }
                                        value={data.employeetype}
                                    />
                                    <p className="error mt-2">{error_employeetype}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 mb-2">
                    <div className="text-start col-md-6 px-0 align-self-center">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-light-18px shadow-none px-0 text-decoration-underline"
                        >
                            BACK
                        </button>
                    </div>
                    <div className="text-end col-md-6 px-0">
                        <button
                            type="sumit"
                            className="btn rounded-0 px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default IndexationBenifits;
