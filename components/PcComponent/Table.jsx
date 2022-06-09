import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Table = (props) => {
	const [ thvalues, setThvalues ] = useState([]);
	const [ tvalues, setTvalues ] = useState([]);

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
								<span>
									{props.type!='addpc'&&<FaEdit />}
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
