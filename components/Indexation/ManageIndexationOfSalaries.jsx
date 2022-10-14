import React, { useState, useEffect } from "react";
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import { getIndexationOfSalary } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';


function ManageIndexationOfSalaries(props) {
    const router = useRouter();
    const unique_key = Uniquekey.generate_unique_key();
    const [indexation, setIndexation] = useState([]);
    const [indexationTemp, setIndexationTemp] = useState([]);
    const [indexationTemp2, setIndexationTemp2] = useState([]);


    useEffect(
        () => {
            APICALL.service(getIndexationOfSalary, 'GET')
                .then((result) => {
                    console.log(result.data);
                    setIndexation(result.data);
                    setIndexationTemp(result.data);
                    setIndexationTemp2(result.data);


                })
                .catch((error) => {
                    console.log(error);
                });
        },
        []
    );

    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2 mb-5">Manage indexation of salaries</p>
                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <Link href={'/indexation/' + Uniquekey.generate_unique_key()}
                            >
                                <button
                                    type="button"
                                    className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                                >
                                    + Add Indexation of salary
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="form-check p-0 mt-5 tab-pane fade show min_height_table">
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Date</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Indexation value</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">PC</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Employee type</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexationTemp2.length > 0 &&
                                    indexationTemp2.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id} >
                                            <td className="poppins-regular-18px p-2">{result.date}</td>
                                            <td className="poppins-regular-18px p-2">{result.indexation_type}</td>
                                            <td className="poppins-regular-18px p-2">{result.indexation_pc}</td>
                                            <td className="poppins-regular-18px p-2">{result.indexation_type}</td>

                                            <td className="p-2">
                                                <Link href='' className="">
                                                    <a type="button">
                                                        <MdEdit
                                                            className="color-skyblue me-2"
                                                            data-toggle="tooltip"
                                                            title="Edit cost center"
                                                        />
                                                    </a>
                                                </Link>
                                                <Link href='' className="">
                                                    <a type=" p-1 m-1">
                                                        <MdDelete
                                                            className="color-skyblue"
                                                            data-toggle="tooltip"
                                                            title="Delete cost center"
                                                        />
                                                    </a>
                                                </Link>



                                            </td>
                                        </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-sm-3 field_height ">
                    <div className='row'>
                        <div className="col-sm-3">
                            <button
                                type="button"
                                className="bg-white border-0 poppins-light-18px  float-sm-right mt-5 mb-2 px-0 text-decoration-underline shadow-none"
                            >
                                back
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ManageIndexationOfSalaries;