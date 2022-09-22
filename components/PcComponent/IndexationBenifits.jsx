import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/purple.css"
import Multiselect from 'multiselect-react-dropdown';


const IndexationBenifits = () => {
    const [value, setValue] = useState(new Date());

    return (
        <div className='container'>
            <p className='h3 mt-3'>Indexation of benefits</p>
            <div className='row ms-1'><p className={'  poppins-medium-16px '}>How do you want to index the benefit?</p>
                <div className="form-check col mt-2 ">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label mt-1" htmlFor="flexRadioDefault1">
                        Indexation via selection of one or more benefits
                    </label>
                </div>
                <div className="form-check col mt-2 ">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label mt-1" htmlFor="flexRadioDefault1">
                        Indexation via selection of one or more benefits
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 mt-2'><p className={'  poppins-medium-16px '}>Category</p>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select..</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>


                    <div className='mt-3'>
                        <p className={' poppins-medium-16px '}>Date as of which indexation takes place</p>
                        <DatePicker className="purple"
                            value={value}
                            onChange={setValue}
                            render={<InputIcon />}
                        />
                    </div>

                    <div className='mt-2'>
                        <p className={' poppins-medium-16px '}>Paritair comite</p>
                        <Multiselect
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Category" // Property name to display in the dropdown options
                    />
                    </div>

                </div>
            </div>


            <div className="form-group row mt-3">
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-16px '}>Current value </p></div>
                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-16px '}>New value</p></div>
                </div>

                <label htmlFor="" className="col-sm-2 col-form-label">Benefit A (PC 118)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
                <div className="col-sm-2">

                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="" className="col-sm-2 col-form-label">Benefit B (PC 116)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="" className="col-sm-2 col-form-label">Benefit C (PC 119)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control" id="" placeholder="" />
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6 mt-2'><p className={'  poppins-medium-16px '}>Category</p>
                <Multiselect
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Category" // Property name to display in the dropdown options
                    />
                    <div className='mt-2'>
                        <p className={'  poppins-medium-16px '}>Function</p>

                          <Multiselect
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Function" // Property name to display in the dropdown options
                    />
                    </div>
                    <div className='mt-2'>
                        <p className={' poppins-medium-16px '}>Employee type (statuut)</p>

                        <Multiselect
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Function" // Property name to display in the dropdown options
                        />
                    </div>

                </div>
            </div>
            <div className="row my-4">
                <div className="text-start col-md-6">
                    <button
                        type="button"
                        className="bg-white border-0 poppins-regular-18px shadow-none px-0 text-decoration-underline"
                    >
                        BACK
                    </button>
                </div>
                <div className="text-end col-md-6">
                    <button
                        type="sumit"
                        className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px shadow-none"
                    >
                        SAVE
                    </button>
                </div>
            </div>

        </div>
    );
}
export default IndexationBenifits;
