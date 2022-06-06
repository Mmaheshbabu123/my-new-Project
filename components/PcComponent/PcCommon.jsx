import { useState } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import PcOverview from './PcOverview';
import AddPc from './AddPc';
import AddAge from './AddAge';


const PcCommon = () => {
	const [ pcid, setPcid ] = useState('');
    const [sec_pc, setSec_pc] = useState(true);
    const [sec_cat_fun, setSec_cat_fun] = useState(false);
    const [sec_age, setSec_age] = useState(false);
    const [sec_emptype, setSec_emptype] = useState(false);



	return (
		<div className="container mt-5">
			<PcContext.Provider value={{ pcid, setPcid, sec_cat_fun,setSec_cat_fun}}>
				<p className="h4">Add Paritair comitte</p>
				<div className="row mt-4 pt-2">
					<ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className="nav-link active py-3"
								id="pills-home-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-home"
								type="button"
								role="tab"
								aria-controls="pills-home"
								aria-selected="true"
							>
								<p className="mb-3">Step 1:</p> <p>Paritair comitte details</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className="nav-link"
								id="pills-profile-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-profile"
								type="button"
								role="tab"
								aria-controls="pills-profile"
								aria-selected="false"
                                onClick={()=>setSec_cat_fun(true)}
							>
								<p className="mb-3">Step 2:</p> <p>Category and Function</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className="nav-link"
								id="pills-contact-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-age"
								type="button"
								role="tab"
								aria-controls="pills-contact"
								aria-selected="false"
							>
								<p className="mb-3">Step 3:</p> <p>Age</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className="nav-link"
								id="pills-contact-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-contact"
								type="button"
								role="tab"
								aria-controls="pills-contact"
								aria-selected="false"
							>
								<p className="mb-3">Step 4:</p> <p>Employee type</p>
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className="nav-link"
								id="pills-contact-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-contact"
								type="button"
								role="tab"
								aria-controls="pills-contact"
								aria-selected="false"
							>
								<p className="mb-3">Step 5:</p> <p>Salary benefits</p>
							</button>
						</li>
					</ul>
					<div className="tab-content" id="pills-tabContent">
						<div
							className="tab-pane fade show active"
							id="pills-home"
							role="tabpanel"
							aria-labelledby="pills-home-tab"
						>
							<AddPc />
						</div>
						<div
							className="tab-pane fade"
							id="pills-profile"
							role="tabpanel"
							aria-labelledby="pills-profile-tab"
						>
							<PcOverview />
						</div>
						<div
							className="tab-pane fade"
							id="pills-age"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							<AddAge/>
						</div>
						<div
							className="tab-pane fade"
							id="pills-emp-type"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							...
						</div>
						<div
							className="tab-pane fade"
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
