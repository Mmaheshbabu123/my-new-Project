import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import PcOverview from './PcOverview';
import AddPc from './AddPc';
import AddAge from './AddAge';
import EmployeeType from './EmployeeType';
import { useRouter } from 'next/router';

import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import SalaryBenefits from './SalaryBenifits';
const PcCommon = (props) => {
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
		<div className="container">
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
					<div>
						<p className="h4">
							{current_sec == 1 ? (
								'Add paritair comite'
							) : current_sec == 2 ? (
								'Add category and function'
							) : current_sec == 3 ? (
								'Add age'
							) : current_sec == 4 ? (
								'Add employee type'
							) : current_sec == 5 ? (
								'Add salary benifits'
							) : (
								'Add paritair comite'
							)}
						</p>
						<div className="row mt-4 pt-2">
							<ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link py-3 ${current_sec == 1
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
										<p className="mb-2">Step 1:</p>
										<p>Paritair comite details</p>
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link py-3 ${sec_completed.pc == false
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
										<p className="mb-2">Step 2:</p> <p>Category and Function</p>
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link py-3 ${current_sec != 3 && sec_completed.cat == false
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
										<p className="mb-2">Step 3:</p> <p>Age</p>
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link py-3 ${current_sec != 4 && sec_completed.age == false
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
										<p className="mb-2">Step 4:</p> <p>Employee type</p>
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link py-3 ${current_sec != 5 && sec_completed.emp_type == false
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
										<p className="mb-2">Step 5:</p> <p>Salary benefits</p>
									</button>
								</li>
							</ul>
							<div className="tab-content" id="pills-tabContent">
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
									id="pills-salary"
									role="tabpanel"
									aria-labelledby="pills-contact-tab"
								>
									{current_sec == 5 && <SalaryBenefits />}
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

export default PcCommon;
