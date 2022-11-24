import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/purple.css"
import ValidationService from '../../Services/ValidationService';
import moment from 'moment';
import Translation from '@/Translation';
import MultiSelectField from '@/atoms/MultiSelectField';
import { storeIndexationOfSalary, getIndexationofBenefitsById, getCategoreisLinkedToPcForBenefits, getAllPartiairComites, getAllBenefitsLinkedtoPc } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
// import { values } from 'lodash';
import BackLink from '../BackLink';

const IndexationBenifits = (props) => {

    /** Date formate */
    const { t } = props;
    const [value, setValue] = useState(new Date());
    const [pc1, setPc1] = useState([]);
    const [pc2, setPc2] = useState([]);
    const [category, setCategory] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [benefits1, setBenefits1] = useState([]);
    const [benefits2, setBenefits2] = useState([]);
    const [count, setCount] = useState(0);

    const [data, setData] = useState({
        id: '',
        pc: [],
        pc1: [],
        pc2: [],
        date: [],
        benefits: [],
        category: [],
        flex: '',
        indexation_type: '',
        benefit_id: '',
        current_value: '',
        new_value:''
    })

    useEffect(
        () => {
            if (data.id != undefined) {
                if (data.id != '') {
                    APICALL.service(getIndexationofBenefitsById + data.id, 'GET')
                        .then((result) => {
                            if (result.status == 200) {
                                console.log(result.data[1]);
                                updateObj(result.data[0]);
                                setPc1(result.data[1]);
                                setPc2(result.data[1]);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    APICALL.service(getAllPartiairComites, 'GET')
                        .then((result) => {
                            if (result) {
                                console.log(result);
                                setPc1(result[0]);
                                setPc2(result[0]);

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        },
        [props]
    );


    /**
     * Fetching categories
     */
    useEffect(
        () => {
            if (data.pc.length > 0) {
                APICALL.service(getCategoreisLinkedToPcForBenefits, 'POST', data.pc)
                    .then((result) => {
                        if (result) {
                            setCategory(result.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setData((prev) => ({
                    ...prev,
                    category: []
                }));
            }
        }, [data.pc]
    )

    /**
     * Fetching benefits linked to pc
     */
    useEffect(
        () => {
            if (data.pc.length > 0) {
                APICALL.service(getAllBenefitsLinkedtoPc, 'POST', data.pc)
                    .then((result) => {
                        if (result) {
                            setBenefits(result.data);
                            setBenefits1(result.data);
                            setBenefits2(result.data);
                            console.log(result.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setData((prev) => ({
                    ...prev,
                    benefits: []
                }));
            }
        }, [data.pc]
    )

    let updateObj = (data) => {

        id = data[0].id != null && data[0].id != undefined ? data[0].id : '';
        setData((prev) => ({
            ...prev,
            id: id,
            indexation_type: data[0].indexation_type,
            pc: data[0].pc,
            benefits: data[0].benefits,
            date: data[0].date,
            flex: data[0].flex,
        }))
    }

    /**Setting values for employee types */
    const [emptype, setEmptype] = useState([{ value: 0, label: 'Select' }, { value: 1, label: 'Flex' }]);


    /**Validation */
    const [error_pc1, setError_pc1] = useState('');
    const [error_pc2, setError_pc2] = useState('');
    const [error_benefits1, setError_benefits1] = useState('');
    const [error_benefits2, setError_benefits2] = useState('');
    const [error_date1, setError_date1] = useState('');
    const [error_date2, setError_date2] = useState('');
    const [error_indexationtype, setError_indexationtype] = useState('');
    const [error_category, setError_category] = useState('');
    const [error_employeetype, setError_employeetype] = useState('');

    let validate = (res) => {
        // console.log(res)
        var error1 = [];
        error1['indexation_type'] = ValidationService.emptyValidationMethod(res.indexation_type);
        /**checking the fiels are empty or not */
        if (res.indexation_type == 1) {
            console.log(res.pc1);

            error1['pc1'] = ValidationService.emptyValidationMethod(res.pc);
            setError_pc1(error1['pc1']);
            setError_pc2('');

            error1['benefits1'] = ValidationService.emptyValidationMethod(res.benefits);
            setError_benefits1(error1['benefits1']);
            setError_benefits2('');

            error1['date1'] = ValidationService.emptyValidationMethod(res.date);
            setError_date1(error1['date1']);
            setError_date2('');

        } else if (res.indexation_type == 2) {

            error1['pc2'] = ValidationService.emptyValidationMethod(res.pc);
            setError_pc2(error1['pc2']);
            setError_pc1('');

            error1['benefits2'] = ValidationService.emptyValidationMethod(res.benefits);
            setError_benefits2(error1['benefits2']);
            setError_benefits1('');

            error1['date2'] = ValidationService.emptyValidationMethod(res.date);
            setError_date2(error1['date2']);
            setError_date1('');
        }

        error1['category'] = ValidationService.emptyValidationMethod(res.category);
        error1['flex'] = ValidationService.emptyValidationMethod(res.flex);

        /**Set error message */

        setError_category(error1['category']);
        setError_employeetype(error1['flex']);
        setError_indexationtype(error1['indexation_type']);
        console.log(error1);

        /**If error is still then validate again or else proceed  */
        if (res.indexation_type == 1 &&
            error1['pc1'] == '' &&
            error1['benefits1'] == '' &&
            error1['date1'] == '' &&

            error1['category'] == '' &&
            error1['flex'] == '' &&
            error1['indexation_type'] == ''
        ) {
            return true;
        } else if (res.indexation_type == 2 &&
            error1['pc2'] == '' &&
            error1['benefits2'] == '' &&
            error1['date2'] == ''
        ) {
            return true;
        } else {
            return false;
        }

    }

    /**Show fields based on selecting option in select list */
    const [showhide, setShowhide] = useState('');
    const [showerror, setShowerror] = useState('');
    const handleshowhide = (event) => {
        const get = event.target.value;
        setShowhide(get);
        // console.log(getuser);
    }

    const handleError = () => {
        setError_pc1('');
        setError_pc2('');
        setError_benefits1('');
        setError_benefits2('');
        setError_date1('');
        setError_date2('');
        setError_indexationtype('');
        setError_category('');
        setError_employeetype('');
        setData((prev) => ({
            ...prev,
            id: '',
            pc: [],
            benefits: [],
            date: []
        }))
    }

    let submit = async (event) => {
        event.preventDefault();
        var valid_res = validate(data);
        if (valid_res) {
            APICALL.service(storeIndexationOfSalary, 'POST', data)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * Update pc dropdown list
     */
    let updatePc = (values) => {
        var pc_comite = [];
        var category1 = [];
        var index_benefits = [];

        values.map((val, key) => {
            pc_comite.push(val.value)
        })
        category.map((val, key) => {
            category1.push(val.value)
        })
        benefits.map((val, key) => {
            index_benefits.push(val.value)
        })

        setData((prev) => ({
            ...prev,
            pc: pc_comite,
            category: category1,
            benefits: index_benefits,
        }));
    }

    /**
     * Category list
     */
    let updateCategory = (values) => {
        var category1 = [];
        values.map((val, key) => {
            category1.push(val.value)
        })
        setData((prev) => ({
            ...prev,
            category: category1
        }));
    }

    /**
     * Salary benefits list
     */
    let updateBenefits = (values) => {
        var index_benefits = [];
        values.map((val, key) => {
            index_benefits.push(val.value)
        })
        setData((prev) => ({
            ...prev,
            benefits: index_benefits,

        }));
    }

    return (
        <div className='container'>
            <form onSubmit={(e) => submit(e)}>
                <div className='row  py-4 '>
                    <div className='col-md-12 px-0 position-sticky-pc'>
                        <p className='bitter-italic-normal-medium-24 '>{t('Indexation of benefits')}</p>
                    </div>
                </div>
                <div className='row border-purple px-2 py-3'>
                    <div className='col-md-12'>
                        {/* Radio buttons */}
                        <div className='row'>
                            <p className='poppins-medium-18px custom_astrick'>{t('How do you want to index the benefit?')}</p>

                            {/* Indexation via selection of one or more benefits */}
                            <div className="form-check col mt-2 d-flex align-items-center" style={{ paddingLeft: '2.2rem' }}>
                                <div>
                                    <input className="form-check-input mb-1" type="radio" checked={data.indexation_type === 1}

                                        onClick={(e) => {
                                            setData((prev) => ({
                                                ...prev,
                                                indexation_type: 1
                                            }));
                                            handleError()
                                        }}

                                    />
                                    <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                                        {t('Indexation via selection of one or more benefits')}
                                    </label>

                                </div>

                            </div>


                            {/* Indexation via selection of one or more paritaire comite  */}
                            <div className="form-check col mt-2 d-flex align-items-center">
                                <div>
                                    <input className="form-check-input mb-1" type="radio" checked={data.indexation_type === 2}

                                        onClick={(e) => {
                                            setData((prev) => ({
                                                ...prev,
                                                indexation_type: 2
                                            }));
                                            handleError()
                                        }}
                                    />
                                    <label className="form-check-label poppins-regular-18px ms-2" htmlFor="flexRadioDefault1">
                                        {t('Indexation via selection of one or more paritaire comite')}
                                    </label>
                                </div>

                            </div>
                            <p className="error mt-2 ">{error_indexationtype}</p>
                        </div>
                        <div className='row'>
                            {/*  Indexation via selection of one or more benefits  */}
                            {data.indexation_type === 1 &&
                                <div className='col-md-6 mt-2 indexation-salary'>
                                    <p className={' poppins-medium-18px mb-2 custom_astrick '}>Benefits</p>

                                    <MultiSelectField
                                        placeholder={t('Select benefits')}
                                        name="benefits"
                                        id={'benefits'}
                                        options={benefits1}
                                        isMulti={true}
                                        disabled={false}
                                        handleChange={(obj) =>
                                            updateBenefits(obj)}
                                        standards={benefits1.filter(val => data.benefits.includes(val.value))}
                                    />
                                    <p className="error mt-2">{error_benefits1}</p>

                                    <div className='mt-3 indexation_date_field'>
                                        <p className={' poppins-medium-18px mb-2 custom_astrick'}>{t('Date as of which indexation takes place')}</p>
                                        <DatePicker className="purple"
                                            value={data.date}
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    date: moment(e).format('YYYY-MM-DD')
                                                }));
                                            }}
                                            render={<InputIcon />}
                                        />
                                        <p className="error mt-2">{error_date1}</p>
                                    </div>

                                    <div className='mt-2 indexation_paritair_comitte'>
                                        <p className={' poppins-medium-18px mb-2 mt-3 custom_astrick'}>{t('Paritair comite')}</p>
                                        <MultiSelectField
                                            placeholder={t('Select paritair comites')}
                                            name="partaircomites"
                                            id={'partaircomites'}
                                            instanceId={'pc'}
                                            options={pc1}
                                            isMulti={true}
                                            disabled={false}
                                            handleChange={(obj) =>
                                                updatePc(obj)}
                                            standards={pc1.filter(val => data.pc.includes(val.value))}
                                        />
                                    </div>
                                    <p className="error mt-2">{error_pc1}</p>

                                </div>
                            }

                            {/* Indexation via selection of one or more paritaire comite */}
                            {data.indexation_type === 2 &&
                                <div className='col-md-6 mt-2'>
                                    <p className={' poppins-medium-18px mb-2 mt-3 custom_astrick'}>{t('Paritair comite')}</p>
                                    <MultiSelectField
                                        placeholder={t('Select paritair comites')}
                                        name="partaircomites"
                                        id={'partaircomites'}
                                        instanceId={'pc'}
                                        options={pc2}
                                        isMulti={true}
                                        disabled={false}
                                        handleChange={(obj) =>
                                            updatePc(obj)}
                                        standards={pc2.filter(val => data.pc.includes(val.value))}
                                    />
                                    <p className="error mt-2">{error_pc2}</p>

                                    <div className='mt-3 indexation_date_field'>
                                        <p className={' poppins-medium-18px mb-2 custom_astrick'}>{t('Date as of which indexation takes place')}</p>
                                        <DatePicker className="purple"
                                            value={data.date}
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    date: moment(e).format('YYYY-MM-DD')
                                                }));
                                            }}
                                            render={<InputIcon />}
                                        />
                                        <p className="error mt-2">{error_date2}</p>
                                    </div>

                                    <div className='mt-2 indexation_paritair_comitte'>
                                        <p className={' poppins-medium-18px mb-2 custom_astrick '}>{t('Benefits')}</p>
                                        <MultiSelectField
                                            placeholder={t('Select benefits')}
                                            name="benefits"
                                            id={'benefits'}
                                            options={benefits2}
                                            isMulti={true}
                                            disabled={false}
                                            handleChange={(obj) =>
                                                updateBenefits(obj)}
                                            standards={benefits2.filter(val => data.benefits.includes(val.value))}
                                        />
                                        <p className="error mt-2">{error_benefits2}</p>
                                    </div>
                                </div>

                            }
                        </div>

                        {/* Current and new values */}
                        {/* {showhide === '1' && ( */}
                        {/* {data.benefits != '' &&
                            <div className="form-group row mt-3">

                                <div className='row'>
                                    <div className='col-sm-2'></div>
                                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2'}>{t('Current value')} </p></div>
                                    <div className='col-sm-2 ms-2'><p className={'  poppins-medium-18px mb-2'}>{t('New value')}</p></div>
                                </div>
                                
                                    <div>

                                        <label htmlFor="" className="col-sm-2 col-form-label poppins-regular-18px">{t('')}</label>
                                        <div className="col-sm-2">
                                            <input type="textfield" className="form-control rounded-0 shadow-none border"></input>
                                        </div>

                                        <div className="col-sm-2">
                                            <input type="textfield" className="form-control rounded-0 shadow-none border" id="" placeholder="" />
                                        </div>

                                    </div>
                           
                            </div>
                        } */}
                        {
                            data.benefits != '' &&
                            
                            <div className=" p-0  tab-pane fade show  col-md-6">
                                <table className="table mt-3 table-benefits">
                                    <thead>
                                        <tr className="">
                                        <th className="poppins-medium-18px btn-bg-gray-medium align-middle"></th>
                                            <th className="poppins-medium-18px  align-middle p-2">{t('Current value')}</th>
                                            <th className="poppins-medium-18px  align-middle p-2">{t('New value')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {benefits.map((result) => (
                                    <tr className=" poppins-regular-18px " key={result.id} >
                                    <td className="poppins-regular-18px p-2 ps-3">{result.label}</td>
                                    <td className="poppins-regular-18px p-2 ps-3 border">{result.current_value}</td>
                                    <td className="poppins-regular-18px p-2 ps-3 border"  contentEditable={true}></td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                        }
                        {/* )} */}

                        <div className='row category_function_indexation'>
                            {data.indexation_type != '' &&
                                <div className='col-md-6 mt-2 indexation-salary'>
                                    {/* Select category */}
                                    <div>
                                        <p className={'  poppins-medium-18px mt-3 mb-2 custom_astrick '}>{t('Category')}</p>
                                        <MultiSelectField
                                            placeholder={t('Select category')}
                                            name="category"
                                            id={'category'}
                                            options={category}
                                            disabled={category.length > 0}
                                            isMulti={true}
                                            handleChange={(obj) =>
                                                updateCategory(obj)}
                                            standards={category.filter(val => data.category.includes(val.value))}
                                        />
                                    </div>
                                    <p className="error mt-2">{error_category}</p>

                                    {/* Select employee type */}
                                    <div className='mt-2'>
                                        <p className={' poppins-medium-18px mt-3 mb-2 custom_astrick'}>{t('Employee type (statuut)')}</p>

                                        <MultiSelectField
                                            placeholder={t('Select employee types')}
                                            name="employeetypes"
                                            id={'employeetypes'}
                                            options={emptype}
                                            disabled={false}
                                            handleChange={(obj) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    flex: obj.value
                                                }));

                                            }}
                                            isMulti={false}
                                            standards={emptype.filter(val => val.value === data.flex)}

                                        />
                                        <p className="error mt-2">{error_employeetype}</p>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* Back and Save buttons */}
                <div className="row mt-4 mb-2">
                    <div className="text-start col-md-6">
                        <BackLink path={'/'} />
                    </div>
                    <div className="text-end col-md-6 px-0">
                        <button
                            type="sumit"
                            className="btn rounded-0 px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
                        >
                            {t('SAVE')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default React.memo(Translation(IndexationBenifits, ['Indexation of benefits', 'How do you want to index the benefit?',
    'Indexation via selection of one or more benefits', 'Indexation via selection of one or more benefits', 'Select..',
    'Date as of which indexation takes place', 'Paritair comite', 'Paritair comite', 'Date as of which indexation takes place',
    'Benefits', 'Current value', 'New value', 'Category', 'Function', 'Employee type (statuut)', 'BACK', 'SAVE']));
