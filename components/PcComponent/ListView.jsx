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
	console.log(props)
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
		<li key={props.index} className= {`${styles.sectioncolor} list-inline-item ${styles.sectionli} ms-2 my-2 hi`}>
			{header && (
				<div
					className={`accordion accordion-flush ${styles.sectioncolor} `}
					id={`accordionFlush${props.pc_number.replace(".", "")}pc${props.index}`}
				>
					<div className={`accordion-item ${styles.sectioncolor}`}>
						<h4 className="accordion-header" 
						id={`flush-heading${props.pc_number.replace(".", "")}pc${props.index}`}>
							<button
								className={`accordion-button poppins-regular-18px collapsed ${styles.listtitle} ${styles.sectioncolor} fw-bold`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
								aria-expanded="false"
								aria-controls={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							>
								{props.sectype=='pc' &&<span className="w-25 poppins-regular-18px"> {props.pc_number}</span>}
								<span className={props.sectype=='pc'?'ms-4 poppins-regular-18px':''}>{props.title}</span>
							</button>
						</h4>
						<div
							id={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							className="accordion-collapse collapse border-top border-1 border-secondary poppins-regular-18px"
							aria-labelledby={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							data-bs-parent={`#accordionFlush${props.pc_number.replace(".", "")}pc${props.index}`}
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
