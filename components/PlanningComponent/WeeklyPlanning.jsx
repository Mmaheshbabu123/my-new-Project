import React, { useEffect, useState, useContext } from 'react';
import { APICALL } from '../../Services/ApiServices';
import { getEmployeerCompanylist, getWeeklyPlanning } from '../../Services/ApiEndPoints';
import { MdEdit, MdDelete } from 'react-icons/md';
import moment from 'moment';
import Translation from '@/Translation';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import DraftPlanning from '@/components/PlanningComponent/DraftPlanning';
import { useRouter } from 'next/router';
import BackLink from '../BackLink';
import PlanningOverview from './PlanningOverview';

function WeeklyPlanning(props) {
	const router = useRouter();
	const { t } = props;
	const { contextState = {} } = useContext(UserAuthContext);
	const [ showview, setShowview ] = useState(false);
	const [ activeWeek, setActiveWeek ] = useState([]);
	const [ location, setLocation ] = useState('');
	const [ company, setCompany ] = useState('');
	const [ project, setProject ] = useState('');
	const [ costcenter, setCostcenter ] = useState('');
	const [ companylist, setCompanylist ] = useState([]);
	const [ locationlist, setLocationlist ] = useState([]);
	const [ costcenterlist, setCostcenterlist ] = useState([]);
	const [ edit, setEdit ] = useState(false);
	const [ weekCount, setWeekCount ] = useState(0);
	const [ activeTab, setActiveTab ] = useState(1);
	const [ search, setSearch ] = useState(false);

	useEffect(
		() => {
			if (router.query.type == 'draft') {
				setActiveTab(2);
			}
		},
		[ router ]
	);

	useEffect(
		() => {
			if (contextState.uid) {
				APICALL.service(getEmployeerCompanylist + contextState.uid, 'GET')
					.then((result) => {
						if (result.status == 200) {
							console.log(result);
							setCompanylist(result.data[0]);
							setLocationlist(result.data[1]);
							setCostcenterlist(result.data[2]);
							setActiveWeek(result.data[3]);
							setShowview(true);
							if (result.data[0].length == 1) {
								setCompany(result.data[0][0].nid);
								// result.data[0][0].add_project === '1' && result.data[0][0].add_project!= undefined?	setShowproject(true):setShowproject(false)
								if (result.data[1].length == 1) {
									setLocation(result.data[1][0].value);
									if (result.data[2].length == 1) {
										setCostcenter(result.data[2][0].value);
									}
								}
							}
						}
						console.log(result);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ contextState.uid ]
	);

	let updateLocation = (comp_id) => {
		setCompany(comp_id);
		var compObj = companylist.find((obj) => {
			return obj.nid == comp_id ? obj : '';
		});

		let counter = 0;
		locationlist.map((loc) => {
			if (loc.comp_id == comp_id) counter++;
		});
		if (counter == 1) {
			var result = locationlist.find((obj) => {
				return obj.comp_id == comp_id ? obj : '';
			});
			if (result != '') {
				setLocation(result.value);
			}
			updateCostCenter(result.value);
		} else {
			setLocation('');
		}
	};
	let updateCostCenter = (loc_id) => {
		let counter = 0;
		costcenterlist.map((loc) => {
			if (loc.location_id == loc_id) counter++;
		});
		if (counter == 1) {
			var result = costcenterlist.find((obj) => {
				return obj.location_id == loc_id ? obj : '';
			});
			if (result != '') {
				setCostcenter(result.value);
			}
		} else {
			setCostcenter('');
		}
	};
	let updateTabs = (val) => {
		if (activeTab != val) {
			if (companylist.length > 1) {
				setCompany('');

				setLocation('');

				setCostcenter('');
			}
			setActiveTab(val);
		}
	};
	return (
		<div className="container-fluid p-0 m-0">
			<div className="row">
				<div className="row position-sticky-pc">
					<div className="col-md-12">
						<p className=" py-4 font-weight-bold   bitter-italic-normal-medium-24">
							{t('Weekly planning')}
						</p>
						{activeTab == 1 &&
						activeWeek &&
						activeWeek.length > 0 && (
							<p className=" poppins-light-18px pb-3">
								{t('For the week of Monday from')} {activeWeek[0].split('-').reverse().join('-')}{' '}
								{t('to sunday')} {activeWeek[6].split('-').reverse().join('-')}
							</p>
						)}
					</div>
				</div>
				<div className=" pt-3 d-flex justify-content-end planning_encodage_position">
					<div className="d-inline ">
						<button
							type="button"
							className={`btn  btn my-2 ${activeTab == 1
								? 'skyblue-bg-color'
								: 'btn-bg-gray-medium'} border-0 poppins-medium-18px  rounded-0 btn-block float-end mt-2 mb-2 d-flex align-items-center add-pln  px-3 btn-block shadow-none rounded-0 "`}
							onClick={() => {
								updateTabs(1);
							}}
						>
							{t('Planning view')}
						</button>
					</div>
					<div className=" ">
						<button
							type="submit"
							className={`btn  my-2 border-0 px-3  btn-block ${activeTab == 2
								? 'skyblue-bg-color'
								: 'btn-bg-gray-medium'} add-pln poppins-medium-18px shadow-none rounded-0`}
							onClick={() => {
								updateTabs(2);
							}}
						>
							{t('Draft planning')}
						</button>
					</div>
				</div>
				<div className=" py-4 d-flex weekly_planning_search_position">
					<div className="col-md-12 row">
						<div className="row">
							<div className="col-md-3 field_height pe-0 ">
								<select
									value={company}
									className="form-select w-100 rounded-0 poppins-light-18px shadow-none rounded-0"
									onChange={(e) => {
										updateLocation(e.target.value);
										setEdit(false);
									}}
								>
									<option value=""> {t('Select company')}</option>
									{companylist.map((value) => (
										<option key={value.nid} value={value.nid}>
											{value.title}
										</option>
									))}
								</select>
							</div>
							<div className="col-md-3 field_height pe-0 ">
								<select
									className="form-select w-100 poppins-light-18px shadow-none rounded-0"
									onChange={(e) => {
										setLocation(e.target.value);
										updateCostCenter(e.target.value);
									}}
									value={location}
									disabled={company == ''||company == undefined}
								>
									<option value="">{t('Select Location')}</option>
									{company != '' &&
										locationlist.map(
											(options) =>
												options.comp_id == company && (
													<option key={options.value} value={options.value}>
														{options.title}
													</option>
												)
										)}
								</select>
							</div>
							<div className="col-md-3 field_height pe-0 ">
								<select
									className="form-select w-100 poppins-light-18px shadow-none rounded-0"
									value={costcenter}
									onChange={(e) => {
										setCostcenter(e.target.value);
									}}
									disabled={(location == ''||location == undefined)}
								>
									<option value="">{t('Select cost center')}</option>
									{location != '' &&
										costcenterlist.map(
											(value) =>
												value.location_id == location && (
													<option key={value.value} value={value.value}>
														{value.title}
													</option>
												)
										)}
								</select>
							</div>
							{/* <div className="col-md-3 field_height pe-0 ">
							<div className='row'>
										<div className='col-md-6 pe-0'>
											<button
												type="button"
												className="btn  btn-block float-right mb-2 border-0 rounded-0 float-right skyblue-bg-color py-2 px-4 w-100 shadow-none text-uppercase"
												onClick={() => handleSearch()}
											>
												{t('Search')}
											</button>
										</div>
										<div className='col-md-6'>
											{(
													<button
														type="button"
														className="btn  btn-block float-right mb-2 rounded-0 float-right py-2 px-4 w-100 shadow-none reset_skyblue"
														onClick={() => {setCompany('');setLocation('');setCostcenter('')}}
													>
														{t('RESET')}
													</button>
												)}
										</div>
									</div>
							</div> */}
						</div>
					</div>
				</div>
				{activeTab == 1 ? (
					<div>
						<PlanningOverview
							editEmployee={edit}
							company={company}
							location={location}
							costcenter={costcenter}
							week={activeWeek}
						/>
					</div>
				) : (
					<div className="mt-4">
						<DraftPlanning company={company} location={location} costcenter={costcenter} />
					</div>
				)}

				<div className="row mt-4 mb-2 col-md-12 m-0">
					<div className="col-md-6 p-0">
						<BackLink path="/planning/options" />
					</div>
					<div className="col-md-6 p-0">
						<button
							type="submit"
							className="btn rounded-0 px-3 float-end poppins-medium-18px-next-button shadow-none"
							onClick={() => {
								router.push('/');
							}}
						>
							{t('DASHBOARD')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default React.memo(
	Translation(WeeklyPlanning, [
		'Weekly planning',
		'For the week of Monday from',
		'to sunday',
		'Planning view',
		'Draft planning',
		'Select company',
		'Select Location',
		'Select cost center',
		'Current week',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thrusday',
		'Friday',
		'Saturday',
		'Sunday',
		'No planning for this week.',
		'Select company and location to view planning.',
		'DASHBOARD'
	])
);
