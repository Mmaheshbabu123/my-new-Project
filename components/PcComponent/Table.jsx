import React, { useEffect, useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PcContext } from '../../Contexts/PcContext';

const Table = (props) => {
	const [ thvalues, setThvalues ] = useState([]);
	const [ tvalues, setTvalues ] = useState([]);
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
		},
		[ props ]
	);
	let editCatOrFun = () =>{
		if(props.sectype =='cat'){
			setCat_subsec_type(1);
			setCat_leftsec('col-md-9');
			setCat_rightsec('d-block col-md-3');
			setCat_subsec_id(props.secId);
		}
	}

	return (
		<div>
			{tvalues &&
			thvalues && (
				<table className="table table-borderless fst-normal">
					<thead>
						<tr>
							{thvalues.map((th_val, index) => (
								<td className="fst-normal" key={index}>
									{th_val}
								</td>
							))}
							<td className="text-end">
								<span onClick={() => {editCatOrFun()}}>
									{props.sectype != 'pc' && <FaEdit />}
								</span>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							{tvalues.map((tval, key) => (
								<td className="fw-bold" key={key}>
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
