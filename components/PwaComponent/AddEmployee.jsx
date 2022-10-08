import React, { useState } from "react";
import DatePicker from "react-multi-date-picker"
import Multiselect from 'multiselect-react-dropdown';

function AddEmployee(props) {

    const [showtab, setShowtab] = useState(1);

    const handletab = (e) => {
        setShowtab(e);
    }

    return (
        <div className="container-fluid p-0">
            <form onSubmit={(e) => submit(e)}>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Add employee</p>
                    {/* Tab  */}

                    <ul className="nav nav-pills mb-3 mt-5 " id="pills-tab" role="tablist">
                        <li className="nav-item me-2 w-25  border border-white   " role="presentation">
                            <button className={showtab === 1 ? "nav-link active w-100" : "nav-link w-100 "}
                                data-bs-toggle="pill"
                                type="button"
                                role="tab"
                                aria-selected="true"
                                onClick={() => handletab(1)}
                            >User information</button>
                        </li>
                        <li className="nav-item w-25 border border-white " role="presentation">
                            <button className={showtab === 2 ? "nav-link w-100 active" : "nav-link w-100"}
                                data-bs-toggle="pill"
                                type="button"
                                role="tab"
                                aria-selected="false"
                                onClick={() => handletab(2)}
                            >Address details</button>
                        </li>
                    </ul>

                    <div className={showtab===1 ? "form-check p-0 mt-2 border tab-pane fade show active": "form-check p-0 mt-2 border tab-pane fade show" }>
                        <div className= "p-3">
                            <div className=" row gx-2 mb-3 h-25 ps-2 mt-1">
                                <div className="col-sm-3 border ms-2 ">
                                    <label className="form-label  mt-2">Profile picture</label>
                                    <input type="file" className="form-control mb-3 border-0" />
                                    <p className="fs-6 mb-2">2 MB limit.</p>
                                    <p className="fs-6 mb-3">Allowed types: gif png jpg jpeg.</p>

                                </div>

                            </div>
                            <div className="row ms-2">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Social security number</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="row ms-2">
                                <div className="col">
                                    <div className="mb-3 me-3">
                                        <label className="form-label custom_astrick">First name</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label custom_astrick">Last name</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="row ms-2">
                                <div className="col">
                                    <div className="mb-3 me-3">
                                        <label className="form-label custom_astrick">Email address</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label custom_astrick">Phone number</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="row ms-2">
                                <div className="col">
                                    <div className="mb-3 me-3">
                                        <label className="form-label custom_astrick">Gender</label>
                                        <select className="form-select rounded-0"
                                        >
                                            <option value="select">Select</option>
                                            <option value="1">Country 1</option>
                                            <option value="2">Country 2</option>
                                            <option value="3">Country 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label custom_astrick">Date of birth</label>
                                        <input type="text" className="form-control rounded-0" />
                                        {/* <DatePicker>
                                            <button
                                                // style={{ margin: "5px 0" }}
                                                onClick={() => alert("clicked")}
                                            >
                                                click me
                                            </button>
                                        </DatePicker> */}
                                    </div>
                                </div>
                            </div>

                            <div className="row ms-2">
                                <div className="col">
                                    <div className="mb-3 me-3">
                                        <label className="form-label custom_astrick ">Bank account number</label>
                                        <input type="text" className="form-control rounded-0" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label custom_astrick mb-1">Company</label>
                                        {/* <input type="text" className="form-control rounded-0" /> */}
                                        <Multiselect
                                            className=""
                                            // value={data.location_manager}
                                            // options={this.state.options} // Options to display in the dropdown
                                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            // onSelect={this.onSelect} // Function will trigger on select event
                                            // onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row ms-1 gx-3 ">
                                <div className=" col">
                                    <div className="mb-3 me-2 bg-light p-2">
                                        <label className="form-label custom_astrick m-2 ">Roles</label>
                                    </div>
                                    <div className="mb-3 me-1 mt-1 d-flex">
                                        <input className="form-check-input ms-1 rounded-0" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label ms-2 mt-1" for="flexCheckDefault">
                                            Location manager
                                        </label>
                                    </div>
                                    <div className="mb-3 me-3 mt-1 d-flex">
                                        <input className="form-check-input ms-2 rounded-0" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label ms-2 mt-1" for="flexCheckDefault">
                                            Contact person
                                        </label>
                                    </div>
                                    <div className="mb-3 me-3 mt-1 d-flex">
                                        <input className="form-check-input ms-2 rounded-0" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label ms-2 mt-1" for="flexCheckDefault">
                                            Employee
                                        </label>
                                    </div>
                                    <div className="mb-3 me-3 mt-1 d-flex">
                                        <input className="form-check-input ms-2 rounded-0" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label ms-2 mt-1" for="flexCheckDefault">
                                            Sales manager
                                        </label>
                                    </div>
                                    <div className="mb-3 me-3 mt-1 d-flex">
                                        <input className="form-check-input ms-2 rounded-0" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label ms-2 mt-1" for="flexCheckDefault">
                                            Co-employeer
                                        </label>
                                    </div>


                                </div>
                                <div className=" col  ">
                                    <div className="mb-3 me-3 bg-light p-2">
                                        <label className="form-label custom_astrick m-2 ">User type</label>
                                    </div>
                                    <div className="mb-3 me-1 mt-1 d-flex">
                                        <input class="form-check-input ms-2" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label ms-2 mt-1" for="flexRadioDefault1">
                                            Internal
                                        </label>
                                    </div>
                                    <div className="mb-3 me-1 mt-1 d-flex">
                                        <input class="form-check-input ms-2" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label ms-2 mt-1" for="flexRadioDefault1">
                                            External
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Address details */}
                    <div className={showtab===2 ? "form-check p-0 mt-2 border tab-pane fade show active": "form-check p-0 mt-2 border tab-pane fade show" }>
                        <div className="row m-0 ">
                            <div className="p-3">
                                {/* Official address */}
                                <div className="row m-0 ">
                                    <div className="p-3">
                                        <div className="row ms-1 gx-3 ">
                                            <div className="mb-3 me-2 bg-light p-2">
                                                <label className="form-label  m-2 ">Official address</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label custom_astrick">Street</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">House number</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label ">Box</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">Postal code</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label custom_astrick ">City</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">Country</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 me-1 mt-1 d-flex ms-2">
                                        <input className="form-check-input ms-2 rounded-0" type="checkbox" value="" />
                                        <label className="form-check-label ms-2 mt-1" >
                                            Residential address is same as my official address.
                                        </label>
                                    </div>
                                </div>
                                {/* Residential address */}
                                <div className="row m-0 ">
                                    <div className="p-3">
                                        <div className="row ms-1 gx-3 ">
                                            <div className="mb-3 me-2 bg-light p-2">
                                                <label className="form-label  m-2 ">Residential address</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label custom_astrick">Street</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">House number</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label ">Box</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">Postal code</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col">
                                            <div className="mb-3 me-3">
                                                <label className="form-label custom_astrick ">City</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label custom_astrick">Country</label>
                                                <input type="text" className="form-control rounded-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-start col-md-6">
                        <button
                            type="button"
                            className="bg-white border-0 poppins-regular-18px float-sm-right my-4 px-0 text-decoration-underline d-inline-block"

                        >
                            BACK
                        </button>
                    </div>
                    <div className="col-md-6 p-0 mt-3">
                        <button
                            type="submit"
                            // className="btn rounded-0 custom-btn px-3 btn-block float-end"
                            className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
                        >
                            Save
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}
export default AddEmployee;