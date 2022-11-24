import React from 'react'
import Translation from '@/Translation';
import Link from 'node_modules/next/link';
import { MdEdit ,MdDelete} from 'react-icons/md';

import { APICALL } from '@/Services/ApiServices';
import { ManagecostcenterInactive } from '../../Services/ApiEndPoints';
import { useEffect, useState } from 'react';
import Pagination from "../PcComponent/Pagination";
import {handleSearch} from './ManageCostActive';
 function ManageCostInactive(props) {
  const { t } = props;
  const [itemsPerPage, setItemsPerPage] = useState(8);
    const [categories, setCategories] = useState([]);
    const [categoriestemp2, setCategoriestemp2] = useState([]);
    const [categoriesTemp, setCategoriesTemp] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchPc, setSearchPc] = useState('');
    const [costCenterName, setCostCenterName] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
	const [searchLocation, setSearchLocation] = useState('');
    useEffect(
        () => {
            APICALL.service(ManagecostcenterInactive, 'GET')
                .then((result) => {
                    console.log(result.data);
                    setCategories(result.data);
                    setCategoriestemp2(result.data);
                    setCategoriesTemp(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []
    );

    //------------------- Pagination code -------------------------//

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(
        () => {
            const endOffset = itemOffset + itemsPerPage;
            setCategoriestemp2(categories.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(categories.length / itemsPerPage));
        },
        [itemOffset, itemsPerPage, categories]
    );

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % categories.length;
        setItemOffset(newOffset);
    };
    //------------------- Pagination code -------------------------//
    //------------------- RESET FUNCTIONALITY----------------------- //
    
    // searchPc,costCenterName,searchCompany,searchLocation
    // costcenter, unique_number , Company , Location
   

	function handleReset() {
		setSearch(false);
		setCategories(categoriesTemp);
		setSearchPc('');
		setCostCenterName('');
		setSearchCompany('');
        setSearchLocation('');
	}



    
    function handleSearch() {
		setSearch(true);
		var res = [];

		// CONDITIONS WHEN ALL THREE VALUES ARE GIVEN //


		if (searchPc != '' && costCenterName != '' && searchCompany != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (
					val['unique_number'].trim().includes(searchPc) &&
					val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase()) &&
                    val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase()) 
				) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);

			// CONDITIONS WHEN TWO VALUES ARE GIVEN //
		} else if (searchPc != '' && costCenterName != '' && searchCompany != '') {
			categoriesTemp.map((val) => {
				if (
					val['unique_number'].trim().includes(searchPc) &&
					val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase()) 
				) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
                   
		} else if (costCenterName != '' && searchCompany != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (
                    val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase() && 
                    val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase()) )				
                    ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}else if (searchPc != '' && costCenterName != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (
                    val['unique_number'].trim().includes(searchPc) &&
                    val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                    val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase())				
                    ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}
        
        else if (searchPc != '' && searchCompany != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (
                    val['unique_number'].trim().includes(searchPc) &&
                    val['Company'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                    val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase())				
                    ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}
         else if (searchPc != '' && costCenterName != '') {
			categoriesTemp.map((val) => {
				if (val['unique_number'].trim().includes(searchPc) &&
                val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
        }
        else if (searchPc != '' && searchCompany != '') {
			categoriesTemp.map((val) => {
				if (
                    val['unique_number'].trim().includes(searchPc) &&
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase())
                ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
        }else if (searchPc != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (val['unique_number'].trim().includes(searchPc)  &&
                 val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0); 
        }else if (costCenterName != '' && searchCompany != '') {
			categoriesTemp.map((val) => {
				if (
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase()) &&
                    val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase())
                ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
        }else if (costCenterName != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase()) &&
                val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase()) 
                ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
            
        }else if (searchCompany != '' && searchLocation != '') {
			categoriesTemp.map((val) => {
				if (
                    val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase()) &&
                    val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase())

                ) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
        }
			//  CONDITION WHEN ONLY ONE VALUES ARE GIVEN //
            
		    else if (searchPc != '') {
			categoriesTemp.map((val) => {
				if (val['unique_number'].trim().includes(searchPc.trim())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		} else if (costCenterName != '') {
			categoriesTemp.map((val) => {
				if (val['costcenter'].trim().toLowerCase().includes(costCenterName.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}else if (searchCompany != '') {
			categoriesTemp.map((val) => {
				if (val['Company'].trim().toLowerCase().includes(searchCompany.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}
        else if (searchLocation != '') {
			categoriesTemp.map((val) => {
				if (val['Location'].trim().toLowerCase().includes(searchLocation.trim().toLowerCase())) {
					res.push(val);
				}
			});
			setCategories(res);
			setItemOffset(0);
		}else {
			setCategories(categoriesTemp);
		}
	}
  return (
    <>
   <div className='container-fluid p-0 '>
                <div className='col-md-12  pb-3'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <div className='row'>
                                <div className="col-md-3 ps-0 field_height">
                                    <input
                                        type="search"
                                        id="form12"
                                        className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                        placeholder={t("Unique number for cost center")}
                                        value={searchPc}
                                        onChange={(e) => setSearchPc(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 ps-0 field_height">
                                    <input
                                        type="search"
                                        id="form12"
                                        className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                        placeholder={t("Cost center name")}
                                        value={costCenterName}
                                        onChange={(e) => setCostCenterName(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3 field_height">
                                    <input
                                        type="search"
                                        id="form12"
                                        className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                        placeholder={t("Company")}
                                        value={searchCompany}
                                        onChange={(e) => setSearchCompany(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3 field_height">
                                    <input
                                        type="search"
                                        id="form12"
                                        className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-16px mh-50 rounded-0 shadow-none"
                                        placeholder={t("Location")}
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 field_height pe-0 ">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <button
                                        type="button"
                                        className="btn  btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right skyblue-bg-color py-2 px-4 w-100 shadow-none text-uppercase"
                                        onClick={() => handleSearch()}
                                    >
                                        {t('Search')}
                                    </button>
                                </div>
                                <div className='col-md-6'>
                                    {(searchPc.trim() != '' ||
                                        costCenterName.trim() != '' ||
                                        searchCompany.trim() != '' ||
                                        searchLocation.trim() != '' ||
                                        search === true) && (
                                            <button
                                                type="button"
                                                className="btn  btn-block float-right mt-2 mb-2 rounded-0 float-right py-2 px-4 w-100 shadow-none reset_skyblue"
                                                onClick={() => handleReset()}
                                            >
                                                {t('RESET')}
                                            </button>
                                        )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="form-check p-0 mt-2 tab-pane fade show min_height_table">
                    <table className="table mb-3">
                        <thead>
                            <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 text-center">{t('Cost center name')}</th>
                                <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 text-center">{t('Unique number ')}</th>
                                <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 text-center">{t('Company')}</th>
                                <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 text-center">{t('Location')}</th>
                                <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2 text-center">{t('Action')}</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {categoriestemp2.length > 0 &&
                                categoriestemp2.map((result, key) => (
                                    <tr className="border poppins-regular-18px p-2" key={key}>
                                        <td className="poppins-regular-18px p-2 ps-4">{result.costcenter}</td>
                                        <td className="poppins-regular-18px p-2" style={{ width: '10%' }}>{result.unique_number}</td>
                                        <td className="poppins-regular-18px p-2 ps-4" style={{ width: '30%' }}>{result.Company}</td>
                                        <td className="poppins-regular-18px p-2">{result.Location}</td>

                                            
                                        <td className=" ps-4">
                                            <Link
                                                href={'/editpc/' + result.pc_unique_key + '?cid=' + result.cat_id}
                                                className=""
                                            >
                                                <a>
                                                    <MdEdit
                                                        className="color-skyblue "
                                                        data-toggle="tooltip"
                                                        title={t("Edit category")}
                                                    />
                                                </a>
                                            </Link>

                                            <span onClick={() => showPopup(result.cat_id)} type="button">
                                                <MdDelete
                                                    className=" ms-3 color-skyblue delete_button"
                                                    data-toggle="tooltip"
                                                    title={t("Delete category")}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            {categories.length == 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center poppins-regular-18px no-records">
                                        {t('No records')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination itemOffset={itemOffset} handlePageClick={handlePageClick} pageCount={pageCount} />
            </div>
    </>

  )
}
export default React.memo(Translation(ManageCostInactive, ['Manage locations', 'Add location', 'Search', 'Location', 'Company', 'Action', 'Aartselaar', 'The awkward antique store']));
