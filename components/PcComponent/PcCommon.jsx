import { useState } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import PcOverview from './PcOverview';
import AddPc from './AddPc';
import AddAge from './AddAge';
import EmployeeType from './EmployeeType';

import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
const PcCommon = (props) => {
	const [ pcid, setPcid ] = useState('');
	const [ current_sec, setCurrent_sec ] = useState(1);
	const [ sec_completed, setSec_completed ] = useState({
		pc: false,
		cat: false,
		age: false,
		emp_type: false,
		sal_benefit: false
	});
		const [pc_unique_key, setPc_unique_key] = useState('');


	return (
		<div className="container mt-5">
			<PcContext.Provider value={{ pc_unique_key, setPc_unique_key, current_sec, setCurrent_sec, sec_completed, setSec_completed }}>
				<p className="h5">
					{current_sec == 1 ? (
						'Add paritair comitte'
					) : current_sec == 2 ? (
						'Add category and function'
					) : current_sec == 3 ? (
						'Add age'
					) : current_sec == 4 ? (
						'Add employee type'
					) : current_sec == 5 ? (
						'Add salary benifits'
					) : (
						'Add paritair comitte'
					)}
				</p>
				<div className="row mt-4 pt-2">
					<ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link py-3 ${current_sec == 1 ? 'active' : ''}`}
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
								{sec_completed.pc ? (
									<FaRegCheckCircle className="d-inline mb-2" />
								) : (
									<BsCircle className="d-inline mb-2" />
								)}
								<p className="mb-2">Step 1:</p> <p>Paritair comitte details</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link py-3 ${current_sec == 2 ? 'active' : ''}`}
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
								{' '}
								{sec_completed.cat ? (
									<FaRegCheckCircle className="d-inline mb-2" />
								) : (
									<BsCircle className="d-inline mb-2" />
								)}
								<p className="mb-2">Step 2:</p> <p>Category and Function</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link py-3 ${current_sec == 3 ? 'active' : ''}`}
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
								{sec_completed.age ? (
									<FaRegCheckCircle className="d-inline mb-2" />
								) : (
									<BsCircle className="d-inline mb-2" />
								)}
								<p className="mb-2">Step 3:</p> <p>Age</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link py-3 ${current_sec == 4 ? 'active' : ''}`}
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
								{sec_completed.emp_type ? (
									<FaRegCheckCircle className="d-inline mb-2" />
								) : (
									<BsCircle className="d-inline mb-2" />
								)}
								<p className="mb-2">Step 4:</p> <p>Employee type</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link py-3 ${current_sec == 5 ? 'active' : ''}`}
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
								{sec_completed.sal_benefit ? (
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
							className={`tab-pane fade disable ${current_sec == 2 ? 'show active' : ''}`}
							id="pills-profile"
							role="tabpanel"
							aria-labelledby="pills-profile-tab"
						>
							<PcOverview />
						</div>
						<div
							className={`tab-pane fade ${current_sec == 3 ? 'show active' : ''}`}
							id="pills-age"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							<AddAge />
						</div>
						<div
							className={`tab-pane fade ${current_sec == 4 ? 'show active' : ''}`}
							id="pills-emp-type"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							<EmployeeType />
						</div>
						<div
							className={`tab-pane fade ${current_sec == 5 ? 'show active' : ''}`}
							id="pills-salary"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							...
						</div>
					</div>
				</div>
			</PcContext.Provider>
		</div>
	);
};

export default PcCommon;
