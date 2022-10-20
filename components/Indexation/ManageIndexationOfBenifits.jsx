import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import Translation from 'pages/TranslationPage';
function ManageIndexationBenifits(props) {
    const {t} =props;
    const router = useRouter();
    const unique_key = Uniquekey.generate_unique_key();

    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2 mb-5">{t('Manage indexation of benefits')}</p>
                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <Link href={'//' + Uniquekey.generate_unique_key()}
                            >
                                <button
                                    type="button"
                                    className="btn  btn-block border-0 rounded-0 float-right mt-2 skyblue-bg-color w-100 shadow-none"

                                >
                                    + {t('Add indexation of benefits')}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="form-check p-0 mt-5 tab-pane fade show min_height_table">
                        <table className="table mt-3 mb-3">
                            <thead>
                                <tr className="btn-bg-gray-medium table-sticky-bg-gray">
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Date')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Indexation value')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('PC')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Employee type')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border poppins-regular-18px p-2" >
                                    <td className="poppins-regular-18px p-2">{t('10-10-2022')}</td>
                                    <td className="poppins-regular-18px p-2">{t('1')}</td>
                                    <td className="poppins-regular-18px p-2">{t('PC-101')}</td>
                                    <td className="poppins-regular-18px p-2">{t('Flex worker')}</td>

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
                                {t('back')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

}
export default React.memo(Translation(ManageIndexationBenifits,['Manage indexation of benefits','Add indexation of benefits','Date','Indexation value',
'PC','Employee type','Action','10-10-2022','1','PC-101','Flex worker','back']));