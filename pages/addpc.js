import AddPc from '../components/PcComponent/AddPc';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PcContext } from '../Contexts/PcContext';
import { useState } from 'react';
import PcOverview from "../components/PcComponent/PcOverview";

// import 'react-tabs/style/react-tabs.css';

/**
 * 
 * @param {*} props 
 * @returns the added category data to the common.js component.
 */
const Addpc = () => {

	const [ pcid, setPcid ] = useState('');
	const [ test, setTest ] = useState('qqq');
	return (
		<div className="container mt-5">
			<PcContext.Provider value={{ test, setTest, pcid, setPcid }}>
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
							>
								<p className="mb-3">Step 2:</p> <p>Category and Function</p>
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
								Step 3: <br />Age
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
								Step 4: <br />Employee type
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
								Step 5: <br />Salary benefits
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
							<PcOverview/>
							
						</div>
						<div
							className="tab-pane fade"
							id="pills-contact"
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
export default Addpc;
