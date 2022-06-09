import React, { useEffect, useState } from 'react';
import Table from './Table';
import styles from '../../styles/Pc.module.css'
import {
	FaEdit,
	FaRegPlusSquare,
	FaMinusSquare,
	FaAngleUp,
	FaAngleDown,
	FaArrowCircleRight,
	FaRedo
} from 'react-icons/fa';
// import './/pc.css';

const ListView = (props) => {
	const [ header, setHeader ] = useState([]);
	const [ tval, setTval ] = useState([]);
	const [ count, setCount ] = useState(props.index);
	const [ sectype, setSectype ] = useState();
	const [ secId, setSecId ] = useState();
	const [type, setType] = useState('');


	useEffect(
		() => {
			if (props.theader != undefined) {
				setHeader(props.theader);
			}
			if (props.tvalue != undefined) {
				setTval(props.tvalue);
			}
			if (props.sectype) {
				setSectype(props.sectype);
			}
			if (props.secId) {
				setSecId(props.secId);
			}
			if (props.type) {
				setType(props.type);
			}
		},
		[ props ]
	);

	useEffect(() => {}, []);
	const SecInfo = (sectype, secid) => {
		props.secInfoFromLst(sectype, secid);
	};
	return (
		<li key={props.index} className= {`${styles.sectioncolor} list-inline-item ${styles.sectionli} ms-2 my-2`}>
			{header && (
				<div
					className={`accordion accordion-flush ${styles.sectioncolor} px-4`}
					id={`accordionFlush${props.pc_number}pc${props.index}`}
				>
					<div className={`accordion-item ${styles.sectioncolor}`}>
						<h4 className="accordion-header" 
						id={`flush-heading${props.pc_number}pc${props.index}`}>
							<button
								className={`accordion-button collapsed ${styles.listtitle} ${styles.sectioncolor} fw-bold`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#flush-collapse${props.pc_number}pc${props.index}`}
								aria-expanded="false"
								aria-controls={`flush-collapse${props.pc_number}pc${props.index}`}
							>
								<span className="w-25 ">{props.pc_number}</span>
								<span className="ms-4">{props.title}</span>
							</button>
						</h4>
						<div
							id={`flush-collapse${props.pc_number}pc${props.index}`}
							className="accordion-collapse collapse border-top border-1 border-secondary"
							aria-labelledby={`flush-collapse${props.pc_number}pc${props.index}`}
							data-bs-parent={`#accordionFlush${props.pc_number}pc${props.index}`}
						>
							<div className="accordion-body">
								<Table
									header={header}
									tvalue={tval}
									sectype={sectype}
									secId={secId}
									type={type}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</li>
	);
};

export default ListView;
