import React, { useEffect, useState, useContext } from 'react';
import { getPcByPcnumber } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import ListView from './ListView';
import AddCategory from './AddCategory';
import styles from '../../styles/Pc.module.css';
import { PcContext } from '../../Contexts/PcContext';
import AddFunction from '../../components/PcComponent/AddFunction';
import AddPc from './AddPc';
import AddAge from './AddAge';
import EmployeeType from './EmployeeType';
import AddSalaryBenefits from './AddSalaryBenefits';

import ViewSalaryBenefits from './ViewSalaryBenefits';

import {
	FaEdit,
	FaPlusSquare,
	FaAngleUp,
	FaAngleDown,
	FaArrowCircleRight,
	FaRedo,
	FaRegMinusSquare,
	FaMinusSquare,
} from 'react-icons/fa';

// import {
// 	BsFillPlusSquareFill,
// } from 'react-icons/bs';

import {
	AiFillPlusSquare,
	AiFillMinusSquare
} from 'react-icons/ai';

import { useRouter } from 'next/router';
import CompanyOptions from 'pages/manage-planning/select';
import Translation from '@/Translation';
const PcOverview = (params) => {
	const {t = (tword) => tword  } = params;
	const {
		pc_unique_key,
		setPc_unique_key,
		current_sec,
		cat_rightsec,
		setCat_rightsec,
		cat_leftsec,
		setCat_leftsec,
		cat_subsec_type,
		setCat_subsec_type,
		cat_fun_updated,
		setCat_fun_updated,
		sec_completed,
		setSec_completed,
		cat_subsec_id,
		setCat_subsec_id,
		setCurrent_sec,
		pc_view_type,
		setPc_view_type
	} = useContext(PcContext);

	const router = useRouter();
	const [ pc, setPc ] = useState([]);
	const [ count, setCount ] = useState(1);
	const [ secid, setSecid ] = useState('');
	const [ pc_number, setPc_number ] = useState('');
	const [ type, setType ] = useState('');

	if (router.query.uid && router.query.uid != undefined) {
		setPc_unique_key(router.query.uid);
	}
	console.log(params);
	/**
   * Fetch data from backend on page load
   */
	useEffect(
		() => {
			setCat_fun_updated('');
			if (current_sec == 2 || params.type == 'editpc' || params.type == 'viewpc') {
				var res1 = sec_completed;
				res1['pc'] = true;
				setSec_completed(res1);

				if (pc_unique_key) {
					APICALL.service(getPcByPcnumber + pc_unique_key, 'GET')
						.then((result) => {
							console.log(result);
							setPc(result.data);
							console.log(pc);
							setPc_number(result.data['pc_number']);
							setType(params.type);
							setPc_view_type(params.type);
							window.scrollTo(0, 0)
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}
		},
		[ current_sec, pc_unique_key, cat_fun_updated, params ]
	);

	useEffect(
		() => {
			var cid = router.query.cid;
			var fid = router.query.fid;
			if (cid != null && cid != undefined && cid != '') {
				setCat_subsec_type(1);
				setCat_leftsec('col-md-9');
				setCat_rightsec('d-block col-md-3');
				setCat_subsec_id(cid);
			} else if (fid != null && fid != undefined && fid != '') {
				setCat_subsec_type(2);
				setCat_leftsec('col-md-9');
				setCat_rightsec('d-block col-md-3');
				setCat_subsec_id(fid);
			}
		},
		[ router.query ]
	);

	let next_redirection = () => {
		setCurrent_sec(3);
		var res1 = sec_completed;
		res1['cat'] = true;
		setSec_completed(res1);
	};

	let updateCollapseSec = (level, id, val,val2) => {
		var pc1 = pc;
		if (level == 1) {
			setPc((current) => {
				return {
					...current,
					collapseOpen: !val
				};
			});
		}
		else if (level == 2) {
			pc1['childObj'][id]['collapseOpen'] = !val;
			setPc((prev) => ({ ...prev, pc: pc1 }));
		}
		// else{
		// 	pc1['childObj'][val][
		// 		'childObj'
		// 	][val2]['collapseOpen'] = !val;
		// 	setPc((prev) => ({ ...prev, pc: pc1 }));
		// }
	};

	return (
		<div className="container-fluid p-0">
			<div className='row position-sticky-pc'>
				<div className='col-md-12'>
				{params.type == 'editpc' ? (
						<p className="py-4 font-weight-bold   px-0  bitter-italic-normal-medium-24 ">{t('Edit paritair comite')}</p>
					) : params.type == 'viewpc' ? (
						<p className=" py-4 font-weight-bold   px-0  bitter-italic-normal-medium-24">{t('View paritair comite')}</p>
					) : (
						''
					)}
				</div>
			</div>
			<div className="row min-vh-75 pc-height2">
				<div className={` ${cat_leftsec}`}>
					
					{pc && (
						<div className='epc epc_height mt-1'>
							{
							params.type != 'viewpc' && (
								<div className={cat_subsec_type ==0?"text-end mb-3 ":"d-none"} style={pc_view_type =='addpc'?{marginBottom:'1.5rem'}:{}}>
									<button
										type="button"
										to="category"
										// className={'btn me-3 blue-border-bg-white' + styles.btncolor}
										className='btn me-3 blue-border-bg-white  me-3 p-3 '
										onClick={() => {
											setCat_leftsec('col-md-9');
											setCat_rightsec('d-block col-md-3');
											setCat_subsec_type(1);
										}}
									>
										+ Add category
									</button>
									<button
										type="button"
										to="function"
										className='btn blue-border-bg-white p-3 '
										onClick={() => {
											setCat_leftsec('col-md-9');
											setCat_rightsec('d-block col-md-3');
											setCat_subsec_type(2);
										}}
									>
										+ {t('Add function')}
									</button>
								</div>
							)}
							<div className=''>
							<ul className={`list-unstyled shadow-none view_pc_accordion ${styles.tree}`}>
								<li className={styles.sectioncolor}>
									<ul className={`list-inline my-2 list-unstyled  pc ${styles.tree} d-flex `}>
										<li className="list-inline-item section-plus-icon align-top fs-4 mrg-lf-rt mt-3 shadow-none">
											{/* <a
												// data-bs-toggle="collapse"
												// href={'#collapsepc' + pc_unique_key}
												// role="button"
												// aria-expanded="false"
												// aria-controls={'collapsepc' + pc_unique_key}
												onClick={updateCollapseSec(1,pc['id'])}
											> */}
											<span>
												{pc['collapseOpen'] == true || pc['childObj'] == undefined? (
													<AiFillMinusSquare className="sky-border-white"
														onClick={() =>
															updateCollapseSec(1, pc['id'], pc['collapseOpen'])}
													/>
												) : (
													<AiFillPlusSquare className="sky-border-white"
														onClick={() =>
															updateCollapseSec(1, pc['id'], pc['collapseOpen'])}
													/>
												)}
											</span>
											{/* </li>	</a> */}
										</li>

										<ListView
											pcid={pc_unique_key}
											pc_number={pc_number}
											index={count + 1}
											title={
												pc['pc_alias_name'] != '' && pc['pc_alias_name'] != undefined ? (
													pc['pc_alias_name']
												) : (
													pc['pc_name']
												)
											}
											theader={pc['header']}
											tvalue={
												pc['pc_alias_name'] != '' && pc['pc_alias_name'] != undefined ? (
													[ pc['pc_number'], pc['pc_alias_name'] ]
												) : (
													[ pc['pc_number'], pc['pc_name'] ]
												)
											}
											actiontype={[ 'edit' ]}
											sectype="pc"
											secId={pc['id']}
											type={type}
											level="1"
										/>
									</ul>
								</li>
								<li>
									{pc['childObj'] &&
										pc['collapseOpen'] == true &&
										Object.keys(pc['childObj']).map((val, key) => (
											<ul
												id={'collapsepc' + pc_unique_key}
												className={`collapse show list-unstyled ms-5 my-0 py-1 ${styles.lev1} ${styles.tree}`}
												key={val}
											>
												{pc['childObj'][val]['type'] == 2 ? (
													<li>
														<ul className="list-inline my-2 ">
															<li className='sectioncolor'>
																<ul className='d-flex'>
																	<li className="list-inline-item section-plus-icon fs-4 mrg-lf-rt align-top mt-3">
																		<span>
																			{pc['childObj'] && console.log(pc['childObj'])}
																			{pc['childObj'][val]['collapseOpen'] ==
																			true|| pc['childObj'][val]['childObj'] == undefined ? (
																				<AiFillMinusSquare className="sky-border-white"
																					onClick={(prev) =>
																						updateCollapseSec(
																							2,
																							val,
																							pc['childObj'][val]['collapseOpen']
																						)}
																				/>
																			) : (
																				<AiFillPlusSquare className="sky-border-white"
																					onClick={() =>updateCollapseSec(2,val,pc['childObj'][val]['collapseOpen'])}
																				/>
																			)}
																		</span>
																		{/* <FaMinusSquare /> */}
																	</li>
																	<ListView
																		pcid={pc_unique_key}
																		pc_number={pc_number}
																		index={'cat1-' + val}
																		title={pc['childObj'][val]['category_name']}
																		theader={pc['childObj'][val]['header']}
																		tvalue={[
																			pc['childObj'][val]['category_name'],
																			'€ ' + pc['childObj'][val]['min_salary']
																		]}
																		className="ms-2"
																		sectype="cat"
																		secId={pc['childObj'][val]['id']}
																		type={type}
																		level="2"
																	/>
																</ul>
															</li>
															<li>
																<ul className={`list-unstyled ms-5 ${styles.tree}`}>
																	{/* <ul className={`list-inline list-unstyled ms-5`}> */}
																	{pc['childObj'][val]['childObj'] &&
																		pc['childObj'][val]['collapseOpen'] == true &&
																		Object.keys(
																			pc['childObj'][val]['childObj']
																		).map((val2, key2) => (
																			<li key={key2}>
																				<ul className="list-inline my-2 gggg">
																					<li className="list-inline-item section-plus-icon  align-top mrg-lf-rt fs-4 ">
																				{/* <FaMinusSquare className="sky-border-white"
																				/> */}
																					</li>
																					<ListView
																						pcid={pc_unique_key}
																						key={val2}
																						pc_number={pc_number}
																						index={'fun1-cat'+val + val2}
																						title={
																							pc['childObj'][val][
																								'childObj'
																							][val2]['function_name']
																						}
																						theader={
																							pc['childObj'][val][
																								'childObj'
																							][val2]['header']
																						}
																						tvalue={[
																							pc['childObj'][val][
																								'childObj'
																							][val2]['function_name'],
																							'€ ' +
																								pc['childObj'][val][
																									'childObj'
																								][val2]['min_salary']
																						]}
																						className="ms-2"
																						secId={
																							pc['childObj'][val][
																								'childObj'
																							][val2]['id']
																						}
																						sectype="funct"
																						type={type}
																						level="3"
																					/>
																				</ul>
																			</li>
																		))}
																</ul>
															</li>
														</ul>
													</li>
												) : (
													<li className='sectioncolor'>
														<ul className='d-flex'>
															<li className="list-inline-item section-plus-icon align-top mrg-lf-rt fs-4 mt-3 ">
																{console.log(pc['childObj'][val]['childObj'])}
																{pc['childObj'][val]['collapseOpen'] == true || pc['childObj'][val]['childObj'] == undefined ? (
																	<AiFillMinusSquare
																	className="sky-border-white"
																		onClick={() =>
																			updateCollapseSec(
																				2,
																				val,
																				pc['childObj'][val]['collapseOpen']
																			)}
																	/>
																) : (
																	<AiFillPlusSquare
																		onClick={() =>
																			updateCollapseSec(
																				2,
																				val,
																				pc['childObj'][val]['collapseOpen']
																			)}
																	/>
																)}
															</li>
															<ListView
																pcid={pc_unique_key}
																pc_number={pc_number}
																index={'fun2-' + val}
																title={pc['childObj'][val]['function_name']}
																theader={pc['childObj'][val]['header']}
																tvalue={[
																	pc['childObj'][val]['function_name'],
																	'€ ' + pc['childObj'][val]['min_salary']
																]}
																secId={pc['childObj'][val]['id']}
																sectype="funct"
																type={type}
																level="2"
															/>
														</ul>
													</li>
												)}
											</ul>
										))}
								</li>
							</ul>
							</div>
						</div>
					)}
					{/* {router.query.cid &&
			<div className="row">
			<div className="text-start col-md-6">
				<button
					type="button"
					className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
					onClick={() => {
						router.push('/manage-category');	
					}}
				>
					Back
				</button>
			</div>
			<div className="text-end col-md-6">
			</div>
		</div>
			}
			{router.query.fid &&
			<div className="row">
			<div className="text-start col-md-6">
				<button
					type="button"
					className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
					onClick={() => {
						router.push('/manage-function');	
					}}
				>
					Back
				</button>
			</div>
			<div className="text-end col-md-6">
			</div>
		</div>
			} */}
					{pc_view_type != 'addpc' && (
						<div className="row mt-4 mb-1">
							<div className="text-start col-md-6 align-items-center d-flex">
								<button
									type="button"
									className="bg-white border-0 poppins-regular-18px shadow-none text-decoration-underline"
									onClick={() => {
										if (router.query.fid) {
											router.push('/manage-function');
										} else if (router.query.cid) {
											router.push('/manage-category');
										} else {
											router.push('/manage-pc');
										}
									}}
								>
									{t('BACK')}
								</button>
							</div>
							<div className="text-end col-md-6" />
						</div>
					)}
				</div>
				<div className={`col pt-2 ${cat_rightsec} ${pc_view_type == 'editpc'?'':pc_view_type == 'viewpc'?'':''}`}>
					{pc_view_type != 'viewpc' && (
						<div className="text-center form-group row m-0 ">
							<button
								type="button"
								to="category"
								className='btn  blue-border-bg-white col me-3 p-3 '
								onClick={() => {
									setCat_subsec_type(1);
									setCat_subsec_id('');
								}}
							>
								+ {t('Add category')}
							</button>
							<button
								type="button"
								to="function"
								className= 'btn  blue-border-bg-white col p-3'
								onClick={() => {
									setCat_subsec_type(2);
									setCat_subsec_id('');
								}}
							>
								+ {t('Add function')}
							</button>
						</div>
					)}
					{cat_subsec_type == 1 && (
						<AddCategory id={secid} categorylist={pc['childObj'] ? pc['childObj'] : []} />
					)}
					{cat_subsec_type == 2 && (
						<AddFunction id={secid} categorylist={pc['childObj'] ? pc['childObj'] : []} />
					)}
					{cat_subsec_type == 3 && <AddPc />}
					{cat_subsec_type == 4 && <AddAge />}
					{cat_subsec_type == 5 && <EmployeeType />}
					{/* {(cat_subsec_type == 6 && pc_view_type == 'editpc') && router.push('/view-salary-benfits/viewSalaryBenfits?k='+pc_unique_key)}
					{(cat_subsec_type == 6 && pc_view_type == 'viewpc') && router.push('/salary-benefits/view?k='+pc_unique_key)} */}
					{/* {(cat_subsec_type == 6 && pc_view_type == 'viewpc') && <ViewSalaryBenefits/>} */}
				</div>
			</div>
			{console.log(router.query)}
			{router.query.cid || router.query.fid || params.type != 'addpc' ? (
				''
			) : (
				<div className="row mt-4 mb-2 m-0">
					<div className="text-start col-md-6 d-flex align-items-center px-0">
						<button
							type="button"
							className="bg-white border-0 poppins-regular-18px shadow-none px-0 text-decoration-underline"
							onClick={() => {
								params.pc_type == 'edit' ? router.push('/manage-pc') : setCurrent_sec(1);
							}}
						>
							{t('BACK')}
						</button>
					</div>
					<div className="text-end col-md-6 px-0">
						<button
							type="sumit"
							className="btn rounded-0  custom-btn px-3  btn-block float-end poppins-medium-18px-next-button shadow-none"
							onClick={() => {
								next_redirection();
							}}
						>
							{t('NEXT')}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
export default React.memo(Translation(PcOverview,['Edit paritair comite','View paritair comite','Add function','BACK','Add category','NEXT']));
