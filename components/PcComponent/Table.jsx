import React, { useEffect, useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PcContext } from '../../Contexts/PcContext';
import { RiHandCoinLine } from 'react-icons/ri';
import { GrRotateRight } from 'react-icons/gr';
import { MdOutlineGroups } from 'react-icons/md';
import Image from 'next/image'
import edit_icon from '../images/edit.svg';
import edit_active_icon from '../images/edit_active.svg';

import age_icon from '../images/age.svg';
import age_active_icon from '../images/age_Active.svg';

import employee_type_icon from '../images/employee_type.svg';
import employee_type_active_icon from '../images/employee_type_active.svg';
import hand_money_icon from '../images/hand-money.svg'
import hand_money_active_icon from '../images/hand-money-active.svg'


const Table = (props) => {
	const [ thvalues, setThvalues ] = useState([]);
	const [ tvalues, setTvalues ] = useState([]);
	const [ type, setType ] = useState('');
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
		setCat_subsec_id
	} = useContext(PcContext);

	useEffect(
		() => {
			if (props.header != undefined) {
				setThvalues(props.header);
			}
			if (props.tvalue != undefined) {
				setTvalues(props.tvalue);
			}
			if (props.type) {
				setType(props.type);
			}
		},
		[ props ]
	);
	let editCatOrFun = () => {
		if (props.sectype == 'cat') {
			setCat_subsec_type(1);
			setCat_leftsec('col-md-9');
			setCat_rightsec('d-block col-md-3');
			setCat_subsec_id(props.secId);
		} else if (props.sectype == 'funct') {
			setCat_subsec_type(2);
			setCat_leftsec('col-md-9');
			setCat_rightsec('d-block col-md-3');
			setCat_subsec_id(props.secId);
		}
	};

	let editSec = (type) => {
		switch (type) {
			case 'pc':
				setCat_subsec_type(3);
				setCat_subsec_id(props.secId);

				break;

			case 'age':
				setCat_subsec_type(4);

				break;
			case 'emp_type':
				setCat_subsec_type(5);

				break;

			case 'sal_benifts':
				setCat_subsec_type(6);

				break;
		}
		setCat_leftsec('col-md-9');
		setCat_rightsec('d-block col-md-3');
		// setCat_subsec_id(props.secId);
	};

	return (
		<div>
			{tvalues &&
			thvalues && (
				<table className="table table-borderless fst-normal">
					<thead />
					<tbody>
						<tr>
							{console.log(thvalues)}
							{/* {thvalues.map((th_val, index) => ( */}
								<td className="fst-normal first-col px-0 ">
									<span className='first_col_row poppins-regular-18px'>
										{thvalues[0]}
									</span>
									<br/>
								<span className='second_col_row poppins-medium-18px'>
									{tvalues[0]}
								</span>
								</td>
								<td className="fst-normal second-col px-0" >
								<span className='first_col_row poppins-regular-18px'>{thvalues[1]}</span>
									<br/>
									<span className='second_col_row poppins-medium-18px'>
									{tvalues[1]}
									</span>
								</td>

							{/* ))} */}
							{/* {tvalues.map((tval, key) => (
								<td className="fw-bold text-break poppins-regular-18px" key={key}>
									{tval}
								</td>
							))} */}
							<td className="text-end px-0 edit-icon-color">
								{/* <div onClick={() => {editCatOrFun()}} className="h5">
									{props.sectype != 'pc' && props.type == "addpc" && <FaEdit />}
								</div> */}
								<div
									onClick={() => {
										editSec('pc');
									}}
									className="h5"
								>
									{props.type == 'editpc' &&
									props.sectype == 'pc' && (<Image
										src={cat_subsec_type == 3?edit_active_icon:edit_icon}
										alt="edit"
										id="editpc"
										width={20}
										height={20}
										data-toggle="tooltip"
											title="Edit paritair comite"/>
									)}
								</div>

								<div
									onClick={() => {
										editCatOrFun();
									}}
									className="h5"
								>
									{props.sectype == 'cat' &&
									(props.type == 'addpc' || props.type == 'editpc') && (
										<Image
										src={props.sectype == 'cat' && cat_subsec_id == props.secId?edit_active_icon:edit_icon}
										alt="edit"
										id="editpc"
										width={20}
										height={20}
										data-toggle="tooltip"
											title="Edit category"/>
									)}
									{props.sectype == 'funct' &&
									(props.type == 'addpc' || props.type == 'editpc') && (
										<Image
										src={props.sectype == 'funct' && cat_subsec_id == props.secId?edit_active_icon:edit_icon}
										alt="edit"
										id="editpc"
										width={20}
										height={20}
										data-toggle="tooltip"
											title="Edit function"/>
									)}
								</div>
								<div
									onClick={() => {
										editSec('age');
									}}
									className="h5"
								>
									{props.sectype == 'pc' &&
									props.type != 'addpc' && (
										
										<Image
										src={cat_subsec_type == 4?age_active_icon:age_icon}
										alt="edit"
										id="editpc"
										width={20}
										height={20}
										data-toggle="tooltip"
											title={props.type=="editpc"?"Edit age":"View age"}/>
									)}
								</div>
								<div
									onClick={() => {
										editSec('emp_type');
									}}
									className="h5"
								>
									{props.sectype == 'pc' &&
									props.type != 'addpc' && (
										<Image
										src={cat_subsec_type == 5?employee_type_active_icon:employee_type_icon}
										alt="edit"
										id="editpc"
										width={20}
										height={20}
										data-toggle="tooltip"
											title={props.type=="editpc"?"Edit employee type":"View employee type"}/>
									)}

								</div>
								<div
									onClick={() => {
										editSec('sal_benifts');
									}}
									className="h5"
								>
									{props.sectype == 'pc' &&
									props.type != 'addpc' && (
										<Image
											src={cat_subsec_type == 6?hand_money_active_icon:hand_money_icon}
											alt="edit"
											id="editpc"
											width={20}
											height={20}
											data-toggle="tooltip"
											title={props.type=="editpc"?"Edit salary benefits":"View salary benefits"}/>
									)}
								</div>
							</td>
							
						</tr>

						{/* <tr>
							{tvalues.map((tval, key) => (
								<td className="fw-bold text-break poppins-regular-18px" key={key}>
									{tval}
								</td>
							))}
							<td />
						</tr> */}

					</tbody>
				</table>
			)}
		</div>
	);
};

export default Table;
