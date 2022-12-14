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
import SalaryBenefits from './SalaryBenifits';

import {
	FaEdit,
	FaRegPlusSquare,
	FaMinusSquare,
	FaAngleUp,
	FaAngleDown,
	FaArrowCircleRight,
	FaRedo,
	FaRegMinusSquare
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import CompanyOptions from 'pages/manage-planning/select';

const PcOverview = (params) => {
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
		<div className="container">
			<div className="row pt-4 min-vh-75">
				<div className={`px-5 ${cat_leftsec}`}>
					{params.type == 'editpc' ? (
						<p className="h4">Edit paritair comite</p>
					) : params.type == 'viewpc' ? (
						<p className="h4">View paritair comite</p>
					) : (
						''
					)}
					{pc && (
						<div>
							{cat_subsec_type == 0 &&
							params.type != 'viewpc' && (
								<div className="text-end me-4">
									<button
										type="button"
										to="category"
										pcid={pc_unique_key}
										className={'btn me-3' + styles.btncolor}
										onClick={() => {
											setCat_leftsec('col-md-9');
											setCat_rightsec('d-block col-md-3');
											setCat_subsec_type(1);
										}}
									>
										Add category
									</button>
									<button
										type="button"
										to="function"
										pcid={pc_unique_key}
										className={'btn me-2' + styles.btncolor}
										onClick={() => {
											setCat_leftsec('col-md-9');
											setCat_rightsec('d-block col-md-3');
											setCat_subsec_type(2);
										}}
									>
										Add function
									</button>
								</div>
							)}
							<ul className={`list-unstyled ${styles.tree}`}>
								<li>
									<ul className={`list-inline list-unstyled  pc ${styles.tree}`}>
										<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
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
													<FaRegMinusSquare
														onClick={() =>
															updateCollapseSec(1, pc['id'], pc['collapseOpen'])}
													/>
												) : (
													<FaRegPlusSquare
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
														<ul className="list-inline">
															<li>
																<ul>
																	<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
																		<span>
																			{pc['childObj'] && console.log(pc['childObj'])}
																			{pc['childObj'][val]['collapseOpen'] ==
																			true|| pc['childObj'][val]['childObj'] == undefined ? (
																				<FaRegMinusSquare
																					onClick={(prev) =>
																						updateCollapseSec(
																							2,
																							val,
																							pc['childObj'][val]['collapseOpen']
																						)}
																				/>
																			) : (
																				<FaRegPlusSquare
																					onClick={() =>updateCollapseSec(2,val,pc['childObj'][val]['collapseOpen'])}
																				/>
																			)}
																		</span>
																		{/* <FaRegMinusSquare /> */}
																	</li>
																	<ListView
																		pcid={pc_unique_key}
																		pc_number={pc_number}
																		index={'cat1-' + val}
																		title={pc['childObj'][val]['category_name']}
																		theader={pc['childObj'][val]['header']}
																		tvalue={[
																			pc['childObj'][val]['category_name'],
																			'??? ' + pc['childObj'][val]['min_salary']
																		]}
																		className="ms-2"
																		sectype="cat"
																		secId={pc['childObj'][val]['id']}
																		type={type}
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
																				<ul className="list-inline">
																					<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
																					{/* {pc['childObj'][val][
																								'childObj'
																							][val2]['collapseOpen'] ==
																			true ? ( */}
																				<FaRegMinusSquare
																					// onClick={(prev) =>
																					// 	updateCollapseSec(
																					// 		3,
																					// 		val,
																					// 		pc['childObj'][val][
																					// 			'childObj'
																					// 		][val2]['collapseOpen'],val2
																					// 	)}
																				/>
																			{/* ) : (
																				<FaRegPlusSquare
																					onClick={() =>updateCollapseSec(3,val,pc['childObj'][val][
																						'childObj'
																					][val2]['collapseOpen'],val2)}
																				/>
																			)} */}
																					</li>
																					<ListView
																						pcid={pc_unique_key}
																						key={val2}
																						pc_number={pc_number}
																						index={'fun1-' + val2}
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
																							'??? ' +
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
																					/>
																				</ul>
																			</li>
																		))}
																</ul>
															</li>
														</ul>
													</li>
												) : (
													<li>
														<ul>
															<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
																{console.log(pc['childObj'][val]['childObj'])}
																{pc['childObj'][val]['collapseOpen'] == true || pc['childObj'][val]['childObj'] == undefined ? (
																	<FaRegMinusSquare
																		onClick={() =>
																			updateCollapseSec(
																				2,
																				val,
																				pc['childObj'][val]['collapseOpen']
																			)}
																	/>
																) : (
																	<FaRegPlusSquare
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
																	'??? ' + pc['childObj'][val]['min_salary']
																]}
																secId={pc['childObj'][val]['id']}
																sectype="funct"
																type={type}
															/>
														</ul>
													</li>
												)}
											</ul>
										))}
								</li>
							</ul>
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
						<div className="row">
							<div className="text-start col-md-6">
								<button
									type="button"
									className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
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
									Back
								</button>
							</div>
							<div className="text-end col-md-6" />
						</div>
					)}
				</div>
				<div className={`px-4 pt-2 border-start border-2 ${cat_rightsec}`}>
					{pc_view_type != 'viewpc' && (
						<div className="text-center">
							<button
								type="button"
								to="category"
								pcid={pc_unique_key}
								className={'btn me-3' + styles.btncolor}
								onClick={() => {
									setCat_subsec_type(1);
									setCat_subsec_id('');
								}}
							>
								Add category
							</button>
							<button
								type="button"
								to="function"
								pcid={pc_unique_key}
								className={'btn me-2' + styles.btncolor}
								onClick={() => {
									setCat_subsec_type(2);
									setCat_subsec_id('');
								}}
							>
								Add function
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
					{cat_subsec_type == 6 && <SalaryBenefits />}
				</div>
			</div>
			{console.log(router.query)}
			{router.query.cid || router.query.fid || params.type != 'addpc' ? (
				''
			) : (
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								params.pc_type == 'edit' ? router.push('/manage-pc') : setCurrent_sec(1);
							}}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => {
								next_redirection();
							}}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
export default PcOverview;
