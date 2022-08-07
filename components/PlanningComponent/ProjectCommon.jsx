import React, { useState } from 'react';
import ManageArchivedProject from './ManageArchivedProject';
import ManageProject from './ManageProject';

const ProjectCommon = (props) => {
	const [ showtab, setShowtab ] = useState(1);
	const handletab = (e) => {
		setShowtab(e);
	};
	return (
		<div className="container">
			<div className="row">
				<h1 className="mt-1 mb-1 font-weight-bold   px-0  bitter-italic-normal-medium-24">Manage project</h1>
				<ul className="nav nav-tabs mb-3 mt-3" id="myTab0" role="tablist">
					<li className="nav-item" role="presentation">
						<button
							className={showtab === 1 ? ' nav-link  project-active ' : '  nav-link'}
							onClick={() => handletab(1)}
						>
							Manage project
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button
							className={showtab == 2 ? 'nav-link project-active' : 'nav-link'}
							onClick={() => handletab(2)}
						>
							Manage archived project
						</button>
					</li>
				</ul>
				<div className="tab-content text-dark" id="pills-tabContent">
					{/* Tab 1 content */}
					<div className={showtab === 1 ? 'tab-pane fade show active' : 'tab-pane fade show'}>
						<ManageProject />
					</div>

					{/* Tab2 content */}
					<div className={showtab === 2 ? 'tab-pane fade show active' : 'tab-pane fade show'}>
						<ManageArchivedProject />
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectCommon;
