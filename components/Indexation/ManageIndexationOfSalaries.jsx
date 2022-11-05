import React, { useState, useEffect } from "react";
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import { getIndexationOfSalary } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import SalaryIndexationDeletePopup from './DeleteSalaryIndexationPopup';
import Pagination from '../PcComponent/Pagination';
import Translation from "@/Translation";

function ManageIndexationOfSalaries(props) {
    const {t}=props;
    const router = useRouter();
    const unique_key = Uniquekey.generate_unique_key();
    const [indexation, setIndexation] = useState([]);
    const [indexationTemp, setIndexationTemp] = useState([]);
    const [indexationTemp2, setIndexationTemp2] = useState([]);

    const [ indexationId, setIndexationId ] = useState('');

    /**Popup  */
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);

	const closePopup = () => {
		setShowdeletepopup(false);
	};

	const showPopup = (id) => {
		setIndexationId(id);
		setShowdeletepopup(true);
	};

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

    // DELETE FUNCTIONALITY //
	const deleteIndexation = async () => {
		var data = {
			id: indexationId
		};
    }
// //------------------- Pagination code -------------------------//
// const [ pageCount, setPageCount ] = useState(0);
// const [ itemOffset, setItemOffset ] = useState(0);

// useEffect(
//     () => {
//         const endOffset = itemOffset + itemsPerPage;
//         setIndexationTemp2(project.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(project.length / itemsPerPage));
//     },
//     [ itemOffset, itemsPerPage, project ]
// );

// const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % project.length;
//     setItemOffset(newOffset);
// };
// //------------------- Pagination code -------------------------//
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row py-4 position-sticky-pc">
                    <div className="col-md-12">
                    <p className="px-0 bitter-italic-normal-medium-24">{t('Manage indexation of salaries')}</p>
                    </div>
                </div>
                <div className="row m-0 ">
                   
                    <div className="float-end position-sticky-add-indexation">
                        <div className="col-md-3 p-0 float-end ">
                            <Link href={'/indexation/' + Uniquekey.generate_unique_key()}
                            >
                                <button
                                    type="button"
                                    className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                                >
                                    + {t('Add Indexation of salary')}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="form-check p-0 pt-2 tab-pane fade show min_height_table">
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 ps-3">{t('Date')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Indexation value')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('PC')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Employee type')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexationTemp2.length > 0 &&
                                    indexationTemp2.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id} >
                                            <td className="poppins-regular-18px p-2 ps-3">{result.date}</td>
                                            <td className="poppins-regular-18px p-2">{result.indexation_type}</td>
                                            <td className="poppins-regular-18px p-2">{result.entity_id}</td>
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
                                                <span onClick={() => showPopup(result)} type="button">
													<MdDelete
														className=" ms-3 color-skyblue "
														data-toggle="tooltip"
														title="Delete Indexation of salary"
													/>
												</span>



                                            </td>
                                        </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* -------------------------- Pagination---------------------------
				<div className="row my-4">
					{project.length > itemsPerPage && (
							<Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount}/>
						// <ReactPaginate
						// 	breakLabel="..."
						// 	nextLabel={<AiOutlineArrowRight />}
						// 	onPageChange={handlePageClick}
						// 	pageRangeDisplayed={5}
						// 	pageCount={pageCount}
						// 	previousLabel={<AiOutlineArrowLeft />}
						// 	renderOnZeroPageCount={null}
						// 	containerClassName={'pagination justify-content-center project-pagination'}
						// 	itemClass="page-item"
						// 	linkClass="page-link"
						// 	subContainerClassName={'pages pagination'}
						// 	activeClassName={'active'}
						// />
					)}
				</div> */}
                <div className="col-sm-3 field_height ">
                    <div className='row'>
                        <div className="col-sm-3">
                            <button
                                type="button"
                                className="bg-white border-0 poppins-light-18px  float-sm-right mt-5 mb-2 px-0 text-decoration-underline shadow-none text-uppercase"
                            >
                                {t('back')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {showdeletepopup == true && (
				<SalaryIndexationDeletePopup display={'block'} popupActionNo={closePopup} popupActionYes={deleteIndexation} />
			)}
        </div>
    );
}
export default React.memo(Translation(ManageIndexationOfSalaries,['Manage indexation of salaries','Add Indexation of salary','Date','Indexation value','PC','Employee type','Action','back']));