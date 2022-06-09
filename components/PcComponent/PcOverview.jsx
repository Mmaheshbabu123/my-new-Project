import React, { useEffect, useState, useContext } from 'react';
import { getPcByPcnumber } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import ListView from './ListView';
import AddCategory from './AddCategory';
import styles from '../../styles/Pc.module.css';
import { PcContext } from '../../Contexts/PcContext';
import AddFunction from '../../components/PcComponent/AddFunction';
// import EditPc from '../../components/PcComponent/'

// import { useParams } from 'react-router-dom';
// import AddCategory from './AddCategory';
// import AddFunction from './AddFunction';
// import EditPc from './EditPc';
import {
	FaEdit,
	FaRegPlusSquare,
	FaMinusSquare,
	FaAngleUp,
	FaAngleDown,
	FaArrowCircleRight,
	FaRedo
} from 'react-icons/fa';
import { useRouter } from 'next/router';

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
		setCat_subsec_type
	} = useContext(PcContext);

	const router = useRouter();
	const [ pc, setPc ] = useState([]);
	const [ count, setCount ] = useState(1);
	const [ secid, setSecid ] = useState('');
	const [ pc_number, setPc_number ] = useState('');
	const [ type, setType ] = useState('');
	if (pc_unique_key == '' && router.query.uid) {
		setPc_unique_key(router.query.uid);
	}
	/**
   * Fetch data from backend on page load
   */
	useEffect(
		() => {
			console.log('test');
			if (current_sec == 2) {
				if (pc_unique_key) {
					APICALL.service(getPcByPcnumber + pc_unique_key, 'GET')
						.then((result) => {
							console.log(result);
							setPc(result.data);
							setPc_number(result.data['pc_number']);
							setType(params.type);
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}
		},
		[ current_sec, pc_unique_key ]
	);

	return (
		<div className="container">
			<div className="row pt-4">
				<div className={`px-5 ${cat_leftsec}`}>
					{pc && (
						<div>
							{cat_subsec_type == 0 && (
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
							<ul className={`list-inline list-unstyled ${styles.tree}`}>
								<ul className={`list-inline list-unstyled  pc ${styles.tree}`}>
									<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
										<a
											data-bs-toggle="collapse"
											href={'#collapsepc' + pc_unique_key}
											role="button"
											aria-expanded="false"
											aria-controls={'collapsepc' + pc_unique_key}
										>
											<FaRegPlusSquare />
										</a>
									</li>
									<ListView
										pcid={pc_unique_key}
										pc_number={pc_number}
										index={count + 1}
										title={pc['pc_name']}
										theader={pc['header']}
										tvalue={
											pc['pc_alias_name'] != '' ? (
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
								{pc['childObj'] &&
									Object.keys(pc['childObj']).map((val, key) => (
										<ul
											id={'collapsepc' + pc_unique_key}
											className={`collapse list-inline list-unstyled ms-5 my-0 py-1 ${styles.lev1} ${styles.tree}`}
											key={val}
										>
											<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
												<FaRegPlusSquare />
											</li>
											{pc['childObj'][val]['type'] === 2 ? (
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
												/>
											) : (
												<ListView
													pcid={pc_unique_key}
													pc_number={pc_number}
													index={'fun2-' + val}
													title={pc['childObj'][val]['function_name']}
													theader={pc['childObj'][val]['header']}
													tvalue={[
														pc['childObj'][val]['function_name'],
														pc['childObj'][val]['min_salary']
													]}
													secId={pc['childObj'][val]['id']}
													sectype="funct"
												/>
											)}
											{/*{pc['childObj'][val]['type'] === 3 &&
        <ListView  index={"fun2-"+val} title={pc['childObj'][val]['function_name']} theader={pc['childObj'][val]['header']} tvalue={[pc['childObj'][val]['function_name'],pc['childObj'][val]['min_salary']]} secId={pc['childObj'][val]['id']} sectype="funct" secInfoFromLst={SecInfo}/> 
        }
      <ul className={`list-inline list-unstyled ms-5`}>
    {pc['childObj'][val]['childObj'] && Object.keys(pc['childObj'][val]['childObj']).map((val2,key2)=>
        <ListView key={val2} index={"fun1-"+val} title={pc['childObj'][val]['childObj'][val2]['function_name']} theader={pc['childObj'][val]['childObj'][val2]['header']} tvalue={[pc['childObj'][val]['childObj'][val2]['function_name'],pc['childObj'][val]['childObj'][val2]['id']]} secId={pc['childObj'][val2]['min_salary']} sectype="funct" secInfoFromLst={SecInfo}/> 
      )} */}
										</ul>
									))}

								{/* <ListView index={count+1} title={pc['pc_name']} theader={pc['header']} tvalue={[pc['pc_number'],pc['pc_name']]} actiontype={['edit']} sectype="pc" secId={pc['id']} secInfoFromLst={SecInfo}/> 
      <ul key={val} className={`list-inline list-unstyled ms-5 my-0 py-1`}>
      {pc['childObj'] && Object.keys(pc['childObj']).map((val,key)=>
      
        {pc['childObj'][val]['type'] === 2 && 
        <ListView  index={"cat1-"+val} title={pc['childObj'][val]['category_name']} theader={pc['childObj'][val]['header']} tvalue={[pc['childObj'][val]['category_name'],"€ "+pc['childObj'][val]['min_salary']]} className="ms-2" sectype="cat" secId={pc['childObj'][val]['id']} secInfoFromLst={SecInfo}/> 
    }
      <ul className={`list-inline list-unstyled ms-5 my-0 py-3`}>
      {pc['childObj'][val]['childObj'] && Object.keys(pc['childObj'][val]['childObj']).map((val2,key2)=>
        <ListView key={val2} index={"fun1-"+val} title={pc['childObj'][val]['childObj'][val2]['function_name']} theader={pc['childObj'][val]['childObj'][val2]['header']} tvalue={[pc['childObj'][val]['childObj'][val2]['function_name'],pc['childObj'][val]['childObj'][val2]['id']]} secId={pc['childObj'][val2]['min_salary']} sectype="funct" secInfoFromLst={SecInfo}/> 
      )} 
      </ul>
        {pc['childObj'][val]['type'] === 3 &&
        <ListView  index={"fun2-"+val} title={pc['childObj'][val]['function_name']} theader={pc['childObj'][val]['header']} tvalue={[pc['childObj'][val]['function_name'],pc['childObj'][val]['min_salary']]} secId={pc['childObj'][val]['id']} sectype="funct" secInfoFromLst={SecInfo}/> 
        }
  )
  </ul>
    </ul>

    } */}
							</ul>
						</div>
					)}
				</div>
				<div className={`px-4 pt-2 border-start border-2 ${cat_rightsec}`}>
					<div className="text-center">
						<button
							type="button"
							to="category"
							pcid={pc_unique_key}
							className={'btn me-3' + styles.btncolor}
							onClick={() => {
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
								setCat_subsec_type(2);
							}}
						>
							Add function
						</button>
					</div>
					{cat_subsec_type == 1 && <AddCategory id={secid} />}
					{cat_subsec_type == 2 && <AddFunction id={secid} />}
				</div>
			</div>
		</div>
	);
};
export default PcOverview;
