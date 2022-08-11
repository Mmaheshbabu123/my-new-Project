import React, { useState } from 'react';
import ManageArchivedProject from './ManageArchivedProject';
import ManageProject from './ManageProject';

const ProjectCommon = (props) => {
	const [ showtab, setShowtab ] = useState(1);
	const handletab = (e) => {
		setShowtab(e);
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<h1 className="my-3 font-weight-bold   px-0  bitter-italic-normal-medium-24">Manage project</h1>
				<div className='col-md-12 row m-0'>
				<ul className="nav nav-tabs border-0 mb-3 mt-3" id="myTab0" role="tablist">
					<li className="hi-50 me-4" role="presentation">
						<button
							className={showtab === 1 ? ' nav-link  project-active rounded-0 ' : ' mng-proj  nav-link'}
							onClick={() => handletab(1)}
						>
							Manage project
						</button>
					</li>
					<li className="hi-50" role="presentation">
						<button
							className={showtab == 2 ? 'nav-link  project-active rounded-0' : ' mng-arch nav-link'}
							onClick={() => handletab(2)}
						>
							Manage archived project
						</button>
					</li>
				</ul>
				</div>
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
