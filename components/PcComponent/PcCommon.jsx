import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import PcOverview from './PcOverview';
import AddPc from './AddPc';
import AddAge from './AddAge';
import EmployeeType from './EmployeeType';
import { useRouter } from 'next/router';

import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import AddSalaryBenefits from './AddSalaryBenefits';
import Translation from '@/Translation';
const PcCommon = (props) => {
	const {t} =props;
	const router = useRouter();
	const [ current_sec, setCurrent_sec ] = useState(1); //holds value for active tab [1=addPc  2=Add caterory and function 3=Add age 4=Employee Type 5=Salary benefits]
	const [ sec_completed, setSec_completed ] = useState({
		pc: false,
		cat: false,
		age: false,
		emp_type: false,
		sal_benefit: false
	});
	const [ pc_unique_key, setPc_unique_key ] = useState('');
	const [ pc_overview_type, setPc_overview_type ] = useState('');
	const [ cat_rightsec, setCat_rightsec ] = useState('d-none');
	const [ cat_leftsec, setCat_leftsec ] = useState('col-md-12');
	const [ cat_subsec_type, setCat_subsec_type ] = useState(0);
	const [ cat_fun_updated, setCat_fun_updated ] = useState('');
	const [ cat_subsec_id, setCat_subsec_id ] = useState(0);
	const [ pc_view_type, setPc_view_type ] = useState('addpc');
	const [ update_sec_completed, setUpdate_sec_completed ] = useState(0);

	useEffect(
		() => {
			if (!router.isReady) return;
			if (router.query.uid) {
				setPc_unique_key(router.query.uid);
			}
		},
		[ router.isReady ]
	);
	useEffect(
		() => {
			if (pc_unique_key == '' && props.pcid != '' && props.pcid != undefined) {
				setPc_unique_key(props.pcid);
			}
		},
		[ props ]
	);

	// useEffect(
	// 	() => {
	// 		var completed = sec_completed;

	// 		if (update_sec_completed > 0) {
	// 			if(update_sec_completed == 5){
	// 					completed['pc'] = true;
	// 					completed['cat'] = true;
	// 					completed['age'] = true;
	// 					completed['emp_type'] = true;
	// 					completed['sal_benefit'] = true;
	// 					setSec_completed(completed);

	// 			}
	// 		}
	// 		// if (pc_unique_key == '' && props.pcid!='' && props.pcid != undefined) {
	// 		// 	setPc_unique_key(props.pcid);
	// 		// }
	// 	},
	// 	[ update_sec_completed ]
	// );

	return (
		<div className="container-fluid p-0">
			<PcContext.Provider
				value={{
					pc_unique_key,
					setPc_unique_key,
					current_sec, //holds value for active tab [1=addPc  2=Add caterory and function 3=Add age 4=Employee Type 5=Salary benefits]
					setCurrent_sec,
					sec_completed,
					setSec_completed,
					pc_overview_type,
					setPc_overview_type,
					cat_rightsec,
					setCat_rightsec,
					cat_leftsec,
					setCat_leftsec,
					cat_subsec_type,
					setCat_subsec_type,
					cat_fun_updated,
					setCat_fun_updated,
					cat_subsec_id,
					setCat_subsec_id,
					pc_view_type,
					setPc_view_type,
					setUpdate_sec_completed
				}}
			>
				{props.type == 'add' ? (
					<div className='col-md-12'>
						<div className='col-md-12 position-sticky-pc py-4'>
						<p className="font-weight-bold   px-0  bitter-italic-normal-medium-24 ">
							{current_sec == 1 ? (
								'Add paritair comite'
							) : current_sec == 2 ? (
								'Add category and function'
							) : current_sec == 3 ? (
								'Add age'
							) : current_sec == 4 ? (
								'Add employee type'
							) : current_sec == 5 ? (
								'Add salary benefits'
							) : (
								'Add paritair comite'
							)}
						</p>
						</div>
						<div className="row m-0">
							<ul className="nav nav-pills nav-justified pb-3 row m-0 p-0 nav-pills-position-sticky" id="pills-tab" role="tablist">
								<li className=" border-0 rounded-0 poppins-regular-16px col ps-0" role="presentation">
									<button
										className={`nav-link parithair-tabs poppins-regular-16px py-3 border-0 rounded-0 w-100 btn-active px-1 ${current_sec == 1
											? 'active custom-active'
											: 'custom-inactive'}`}
										id="pills-pc-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-pc"
										type="button"
										role="tab"
										aria-controls="pills-pc"
										aria-selected="true"
										onClick={() => {
											setCurrent_sec(1);
										}}
									>
										{sec_completed.pc || current_sec == 1 ? (
											<FaRegCheckCircle className="d-inline mb-2" />
										) : (
											<BsCircle className="d-inline mb-2" />
										)}
										<p className="mb-2 poppins-regular-16px-white  btn-active">{t('Step 1:')}</p>
										<p className='poppins-regular-18px-white btn-active'>{t('Paritair comite details')}</p>
									</button>
								</li>
								<li className="col border-0 rounded-0 poppins-regular-16px " role="presentation">
									<button
										className={`nav-link parithair-tabs w-100 py-3 poppins-regular-16px border-0 rounded-0 px-1 ${sec_completed.pc == false
											? 'disabled'
											: ''} ${current_sec == 2 ? 'active custom-active' : 'custom-inactive'}`}
										id="pills-profile-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-profile"
										type="button"
										role="tab"
										aria-controls="pills-profile"
										aria-selected="false"
										onClick={() => {
											setCurrent_sec(2);
										}}
									>
										{sec_completed.cat || current_sec == 2 ? (
											<FaRegCheckCircle className="d-inline mb-2" />
										) : (
											<BsCircle className="d-inline mb-2" />
										)}
										<p className="mb-2 poppins-regular-16px-white btn-active">{t('Step 2:')}</p> <p className='poppins-regular-18px-white btn-active'>{t('Category and Function')}</p>
									</button>
								</li>
								<li className="col border-0 rounded-0 poppins-regular-16px" role="presentation">
									<button
										className={`nav-link parithair-tabs poppins-regular-16px w-100 border-0 rounded-0  py-3 px-1 ${current_sec != 3 && sec_completed.cat == false
											? 'disabled'
											: ''} ${current_sec == 3 ? 'active custom-active' : 'custom-inactive'}`}
										id="pills-contact-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-age"
										type="button"
										role="tab"
										aria-controls="pills-contact"
										aria-selected="false"
										onClick={() => {
											setCurrent_sec(3);
										}}
									>
										{sec_completed.age || current_sec == 3 ? (
											<FaRegCheckCircle className="d-inline mb-2" />
										) : (
											<BsCircle className="d-inline mb-2" />
										)}
										<p className="mb-2 poppins-regular-16px-white btn-active">{t('Step 3:')}</p> <p className='poppins-regular-18px-white  btn-active'>{t('Age')}</p>
									</button>
								</li>
								<li className="col border-0 rounded-0 poppins-regular-16px" role="presentation">
									<button
										className={`nav-link parithair-tabs w-100 poppins-regular-16px border-0 rounded-0  py-3 px-1 ${current_sec != 4 && sec_completed.age == false
											? 'disabled'
											: ''} ${current_sec == 4 ? 'active custom-active' : 'custom-inactive'}`}
										id="pills-contact-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-emp-type"
										type="button"
										role="tab"
										aria-controls="pills-contact"
										aria-selected="false"
										onClick={() => {
											setCurrent_sec(4);
										}}
									>
										{sec_completed.emp_type || current_sec == 4 ? (
											<FaRegCheckCircle className="d-inline mb-2" />
										) : (
											<BsCircle className="d-inline mb-2" />
										)}
										<p className="mb-2 poppins-regular-16px-white  btn-active">{t('Step 4:')}</p> <p className='poppins-regular-18px-white btn-active'>{t('Employee type')}</p>
									</button>
								</li>
								<li className="col border-0 rounded-0 pe-0 poppins-regular-16px" role="presentation">
									<button
										className={`nav-link parithair-tabs w-100 border-0 poppins-regular-16px rounded-0  py-3 px-1 ${current_sec != 5 && sec_completed.emp_type == false
											? 'disabled'
											: ''} ${current_sec == 5 ? 'active custom-active' : 'custom-inactive'}`}
										id="pills-contact-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-contact"
										type="button"
										role="tab"
										aria-controls="pills-contact"
										aria-selected="false"
										onClick={() => {
											setCurrent_sec(5);
										}}
									>
										{sec_completed.sal_benefit || current_sec == 5 ? (
											<FaRegCheckCircle className="d-inline mb-2" />
										) : (
											<BsCircle className="d-inline mb-2" />
										)}
										<p className="mb-2 poppins-regular-16px-white btn-active">{t('Step 5:')}</p> <p className='poppins-regular-18px-white btn-active'>{t('Salary benefits')}</p>
									</button>
								</li>
							</ul>
							<div className="tab-content col-md-12 p-0" id="pills-tabContent">
								<div
									className={`tab-pane fade ${current_sec == 1 ? 'show active' : ''}`}
									id="pills-pc"
									role="tabpanel"
									aria-labelledby="pills-pc-tab"
								>
									<AddPc />
								</div>
								<div
									className={`tab-pane fade ${current_sec == 2 ? 'show active' : ''}`}
									id="pills-profile"
									role="tabpanel"
									aria-labelledby="pills-profile-tab"
								>
									{/* <PcOverview /> */}
									{current_sec == 2 ? <PcOverview type="addpc" pc_type="add" /> : ''}
								</div>
								<div
									className={`tab-pane fade ${current_sec == 3 ? 'show active' : ''}`}
									id="pills-age"
									role="tabpanel"
									aria-labelledby="pills-contact-tab"
								>
									{current_sec == 3 && <AddAge />}
								</div>
								<div
									className={`tab-pane fade ${current_sec == 4 ? 'show active' : ''}`}
									id="pills-emp-type"
									role="tabpanel"
									aria-labelledby="pills-contact-tab"
								>
									{current_sec == 4 && <EmployeeType />}
								</div>
								<div
									className={`tab-pane fade ${current_sec == 5 ? 'show active' : ''}`}
									id="pills-salary salary-benefit-pc"
									role="tabpanel"
									aria-labelledby="pills-contact-tab"
								>
									{current_sec == 5 && <AddSalaryBenefits />}
								</div>
							</div>
						</div>
					</div>
				) : props.type == 'view' ? (
					<div>
						<PcOverview type="viewpc" pc_type="view" />
					</div>
				) : (
					<div>
						{' '}
						<PcOverview type="editpc" pc_type="edit" />
					</div>
				)}
			</PcContext.Provider>
		</div>
	);
};

export default React.memo(Translation(PcCommon,['Step 1:','Paritair comite details','Step 2:','Category and Function','Age','Step 4:','Employee type','Step 5:','Salary benefits','Step 3:']));
