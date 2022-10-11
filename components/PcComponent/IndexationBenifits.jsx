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
            <div className='row  py-4 bitter-italic-normal-medium-24 position-sticky-pc'>
                <div className='col-md-12 px-0'>
                <p className=''>Indexation of benefits</p>
                </div>
            </div>
           <div className='row border-purple px-2 py-3'>
               <div className='col-md-12'>
               <div className='row'><p className={'  poppins-medium-18px '}>How do you want to index the benefit?</p>
                <div className="form-check col mt-2 d-flex align-items-center" style={{paddingLeft:'2.2rem'}}>
                    <input className="form-check-input mb-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                        Indexation via selection of one or more benefits
                    </label>
                </div>
                <div className="form-check col mt-2 d-flex align-items-center">
                    <input className="form-check-input mb-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                        Indexation via selection of one or more benefits
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 mt-2'><p className={'  poppins-medium-18px mb-2     '}>Category</p>
                    <select className="form-select shadow-none rounded-0 border" aria-label="Default select example">
                        <option selected>Select..</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>


                    <div className='mt-3 indexation_date_field'>
                        <p className={' poppins-medium-18px mb-2'}>Date as of which indexation takes place</p>
                        <DatePicker className="purple"
                            value={value}
                            onChange={setValue}
                            render={<InputIcon />}
                        />
                    </div>

                    <div className='mt-2 indexation_paritair_comitte'>
                        <p className={' poppins-medium-18px mb-2 mt-3'}>Paritair comite</p>
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
                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2'}>Current value </p></div>
                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2'}>New value</p></div>
                </div>

                <label htmlFor="" className="col-sm-2 col-form-label poppins-regular-18px">Benefit A (PC 118)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
                <div className="col-sm-2">

                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="" className="col-sm-2 col-form-label poppins-regular-18px">Benefit B (PC 116)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="" className="col-sm-2 col-form-label poppins-regular-18px">Benefit C (PC 119)</label>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
                <div className="col-sm-2">
                    <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                </div>
            </div>

            <div className='row category_function_indexation'>
                <div className='col-md-6 mt-2'><p className={'  poppins-medium-18px mt-3 mb-2 '}>Category</p>
                <Multiselect
                className='rounded-0'
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Category" // Property name to display in the dropdown options
                    />
                    <div className='mt-2'>
                        <p className={'  poppins-medium-18px mt-3 mb-2 '}>Function</p>

                          <Multiselect
                        // options={this.state.options} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="Function" // Property name to display in the dropdown options
                    />
                    </div>
                    <div className='mt-2'>
                        <p className={' poppins-medium-18px mt-3 mb-2'}>Employee type (statuut)</p>

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

        </div>
    );
}
export default IndexationBenifits;
