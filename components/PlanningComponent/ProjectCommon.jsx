import React, { useState } from 'react';
import ManageArchivedProject from './ManageArchivedProject';
import ManageProject from './ManageProject';
import Translation from '@/Translation';
const ProjectCommon = (props) => {
	const {t}=props;
	const [ showtab, setShowtab ] = useState(1);
	const handletab = (e) => {
		setShowtab(e);
	};
	return (
		<div className="container-fluid manage_project">
			<div className="row">
				<h1 className="py-4 position-sticky-pc font-weight-bold   px-0  bitter-italic-normal-medium-24">{t('Manage projects')}</h1>
				<div className="col-md-12 row m-0 ps-0 qr_position_sticky">
					<ul className="nav nav-tabs border-0 mb-3 mt-3" id="myTab0" role="tablist">
						<li className="hi-50 me-5" role="presentation">
							<button
								className={
									showtab === 1 ? ' nav-link  project-active rounded-0 p-0 ' : ' mng-proj  nav-link p-0 rounded-0'
								}
								onClick={() => handletab(1)}
							>
								{t('Active')}
							</button>
						</li>
						<li className="hi-50" role="presentation">
							<button
								className={showtab == 2 ? 'nav-link  project-active rounded-0 p-0' : ' mng-arch nav-link p-0 rounded-0'}
								onClick={() => handletab(2)}
							>
								{t('Archived')}
							</button>
						</li>
					</ul>
				</div>
				<div className="tab-content text-dark p-0" id="pills-tabContent">
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
export default React.memo(Translation(ProjectCommon,['Manage projects','Active','Archived']));
