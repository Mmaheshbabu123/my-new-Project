import React, { useEffect, useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PcContext } from '../../Contexts/PcContext';
import { RiHandCoinLine } from 'react-icons/ri';
import { GrRotateRight } from 'react-icons/gr';
import { MdOutlineGroups } from 'react-icons/md';

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
							{thvalues.map((th_val, index) => (
								<td className="fst-normal" key={index}>
									{th_val}
								</td>
							))}
							<td className="text-end " rowSpan="2">
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
									props.sectype == 'pc' && (
										<FaEdit
											className="col-4C4D550F"
											data-toggle="tooltip"
											title="Edit paritair comite"
										/>
									)}
								</div>

								<div
									onClick={() => {
										editCatOrFun();
									}}
									className="h5"
								>
									{props.sectype != 'pc' &&
									(props.type == 'addpc' || props.type == 'editpc') && (
										<FaEdit
											lassName="col-4C4D550F"
											data-toggle="tooltip"
											title="Edit paritair comite"
										/>
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
										<GrRotateRight
											className="col-4C4D550F"
											data-toggle="tooltip"
											title="Edit age"
										/>
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
										<MdOutlineGroups
											className="col-4C4D550F"
											data-toggle="tooltip"
											title="Edit employee type"
										/>
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
										<RiHandCoinLine
											className="col-4C4D550F"
											data-toggle="tooltip"
											title="Edit salary benefits"
										/>
									)}
								</div>
							</td>
						</tr>

						<tr>
							{tvalues.map((tval, key) => (
								<td className="fw-bold text-break poppins-regular-18px" key={key}>
									{tval}
								</td>
							))}
							<td />
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Table;
