import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import Link from 'node_modules/next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
//import Translation from 'pages/TranslationPage';
import Translation from "@/Translation";
import BenefitIndexationDelete from './DeleteBenefitsIndexation';
import { getAllManageBenefits, UpdateStatus } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import BackLink from '../BackLink';

function ManageIndexationBenifits(props) {
    const { t } = props;
    const router = useRouter();

    const [benefitId, setBenefitId] = useState('');
    const [indexationBenefit, setIndexationBenefit] = useState([]);
    const [updated, setUpdated] = useState(0);

    useEffect(
        () => {
            APICALL.service(getAllManageBenefits, 'GET')
                .then((result) => {
                    console.log(result.data);
                    setIndexationBenefit(result.data);

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [updated]
    );


    /**Popup  */
    const [showdeletepopup, setShowdeletepopup] = useState(false);

    const closePopup = () => {
        setShowdeletepopup(false);
    };

    const showPopup = (id) => {
        setBenefitId(id);
        setShowdeletepopup(true);
    };

    // DELETE FUNCTIONALITY //
    const update = async () => {
        var data = {
            id:benefitId
        };
        APICALL.service(UpdateStatus, 'POST', data)
        .then((result) => {
            console.log(result.status);
            setUpdated(updated + 1);
            setShowdeletepopup(false);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row m-0 ">
                    <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2 mb-5">{t('Manage indexation of benefits')}</p>
                    <div className="float-end">
                        <div className="col-md-3 p-0 float-end ">
                            <Link href={'/indexation-benefits'}
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
                                    {/* <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Indexation value')}</th> */}
                                    {/* <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('PC')}</th> */}
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Employee type')}</th>
                                    <th className="poppins-medium-18px btn-bg-gray-medium align-middle p-2">{t('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexationBenefit.length > 0 &&
                                    indexationBenefit.map((result) => (
                                        <tr className="border poppins-regular-18px p-2" key={result.id} >
                                            <td className="poppins-regular-18px p-2">{result.date.split('-').reverse().join('/')}</td>
                                            {/* <td className="poppins-regular-18px p-2">{result.pc}</td> */}
                                            {/* <td className="poppins-regular-18px p-2">{result.benefits}</td> */}
                                            <td className="poppins-regular-18px p-2">{result.flex == 1 ? "Flex" : ''}</td>

                                            <td className="p-2">
                                                <Link href={'/indexation-benefits/' + result.id} className="">
                                                    <a type="button">
                                                        <MdEdit
                                                            className="color-skyblue me-2"
                                                            data-toggle="tooltip"
                                                            title="Edit cost center"
                                                        />
                                                    </a>
                                                </Link>
                                                <Link href='' className="">
                                                    <span className='p-1 m-1' onClick={() => showPopup(result)} type="button">
                                                        <MdDelete
                                                            className="color-skyblue"
                                                            data-toggle="tooltip"
                                                            title="Delete cost center"
                                                        />
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                {/*----------------------------No records found-------------------------- */}
                                {indexationBenefit.length == 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-3 border poppins-regular-18px">
                                            {t('No records')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                    <div className="text-start col-md-6">
                        <BackLink path={'/'} />
                    </div>
            </form>
            {showdeletepopup == true && (
                <BenefitIndexationDelete display={'block'} popupActionNo={closePopup} popupActionYes={update} />
            )}
        </div>
    );

}
export default React.memo(Translation(ManageIndexationBenifits, ['Manage indexation of benefits', 'Add indexation of benefits', 'Date', 'Indexation value',
    'PC', 'Employee type', 'Action', '10-10-2022', '1', 'PC-101', 'Flex worker', 'back']));
