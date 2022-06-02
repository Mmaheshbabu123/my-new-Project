import React, { useEffect, useState } from 'react';
import { getPcByPcnumber } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import ListView from './ListView';
import AddCategory from './AddCategory';
import styles from '../../styles/Pc.module.css'

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
import { useRouter } from "next/router";

const PcOverview = (params) => {
	const router = useRouter();
	const [ pc, setPc ] = useState([]);
	const [ enableEdit, setEnableEdit ] = useState(false);
	const [ leftSec, setLeftSec ] = useState('col-md-12');
	const [ rightSec, setRightSec ] = useState('');
	const [ count, setCount ] = useState(1);
	const [ data, setData ] = useState('');
	const [ pclistUpdated, setPclistUpdated ] = useState(false);
	const [ category, setCategory ] = useState(false);
	const [ addfunction, setAddfunction ] = useState(false);
	const [ editpc, setEditpc ] = useState(false);

	const [ secid, setSecid ] = useState('');
	const [ pcid, setPcid ] = useState('');
	const [ pc_number, setPc_number ] = useState('');

	const [ page_type, setPage_type ] = useState('add');


	/**
   * Fetch data from backend on page load
   */
	useEffect(
		() => {
			if (router.query.pcid || params.pcid) {
				var id =  router.query.pcid?router.query.pcid:params.pcid?params.pcid:"";
				setPcid(id);
				// var pc_number = params.pc_number != undefined ? params.pc_number : '';
				var type = params.page_type ? params.page_type : 'add';
				setPage_type(type);
				APICALL.service(getPcByPcnumber + id, 'GET')
					.then((result) => {
						console.log(result);
						setPc(result.data);
						setPc_number(result.data['pc_number']);

					})
					.catch((error) => {
						console.error(error);
					});
			}
		},
		[ pclistUpdated ]
	);

	const childToParent = (childdata) => {
		setPclistUpdated(false);

		console.log('baggu');
		setPclistUpdated(true);
		setLeftSec('col-md-12');
		setAddfunction(false);
		setCategory(false);

		setEnableEdit(false);
	};

	useEffect(
		() => {
			if (category == true && enableEdit == true) {
				setAddfunction(false);
				setLeftSec('col-md-9');
			}
		},
		[ category ]
	);

	useEffect(
		() => {
			if (addfunction == true && enableEdit == true) {
				setCategory(false);
				setLeftSec('col-md-9');
			}
		},
		[ addfunction ]
	);
	const SecInfo = (sectype, secid) => {
		setSecid(secid);
		switch (sectype) {
			case 'pc':
				break;
			case 'cat':
				setCategory(true);
				break;
			case 'funct':
				setAddfunction(true);
				break;
		}
		setEnableEdit(true);
	};

	return (
		<div className="container">
			<div className="row pt-4">
				<div className={`px-5 ${leftSec}`}>
					{pc && (
						<div>
							{!enableEdit &&
							page_type == 'add' && (
								<div className="text-end me-4">
									<button
										type="button"
										to="category"
										pcid={pcid}
										className={"btn me-3"+ styles.btncolor}
										onClick={() => {
											setCategory(true);
											setEnableEdit(true);
										}}
									>
										Add category
									</button>
									<button
										type="button"
										to="function"
										pcid={pcid}
										className={"btn me-2" + styles.btncolor}
										onClick={() => {
											setAddfunction(true);
											setEnableEdit(true);
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
											href={'#collapsepc' + pcid}
											role="button"
											aria-expanded="false"
											aria-controls={'collapsepc' + pcid}
										>
											<FaRegPlusSquare />
										</a>
									</li>
									<ListView
										pcid={pcid}
										pc_number={pc_number}
										index={count + 1}
										title={pc['pc_name']}
										theader={pc['header']}
										tvalue={[ pc['pc_number'], pc['pc_name'] ]}
										actiontype={[ 'edit' ]}
										sectype="pc"
										secId={pc['id']}
										secInfoFromLst={SecInfo}
									/>
								</ul>
								{pc['childObj'] &&
									Object.keys(pc['childObj']).map((val, key) => (
										<ul
											id={'collapsepc' + pcid}
											className={`collapse list-inline list-unstyled ms-5 my-0 py-1 ${styles.lev1} ${styles.tree}`}
											key={val}
										>
											<li className="list-inline-item section-plus-icon fs-4 align-top mt-3">
												<FaRegPlusSquare />
											</li>
											{pc['childObj'][val]['type'] === 2 ? (
												<ListView
													pcid={pcid}
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
													secInfoFromLst={SecInfo}
												/>
											) : (
												<ListView
													pcid={pcid}
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
													secInfoFromLst={SecInfo}
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
				{enableEdit && (
					<div className="col-md-3 px-4 pt-5 border-start border-2">
						<div className="text-center">
							<button
								type="button"
								to="category"
								pcid={pcid}
								className={"btn me-3"+ styles.btncolor}
								onClick={() => {
									setCategory(true);
									setSecid('');
								}}
							>
								Add category
							</button>
							<button
								type="button"
								to="function"
								pcid={pcid}
								className={"btn me-2"+ styles.btncolor}
								onClick={() => setAddfunction(true)}
							>
								Add function
							</button>
						</div>
						{category && <AddCategory childToParent={childToParent} id={secid} />}
						{addfunction && <AddFunction childToParent={childToParent} id={secid} />}
						{editpc && <EditPc childToParent={childToParent} id={secid} />}
					</div>
				)}
			</div>
		</div>
	);
};
export default PcOverview;
