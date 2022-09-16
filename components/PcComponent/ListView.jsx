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
		<li key={props.index} className= {`list-inline-item ${props.level=='3'?styles.section_func_li:styles.sectionli} ${props.level=='3'?styles.section_funct:styles.section_cat} ms-2 my-2 hi sectioncolor`}>
			{header && (
				<div
					className={`accordion accordion-flush  accordion_padding `}
					id={`accordionFlush${props.pc_number.replace(".", "")}pc${props.index}`}
				>
					<div className={`accordion-item `}>
						<h4 className="accordion-header" 
						id={`flush-heading${props.pc_number.replace(".", "")}pc${props.index}`}>
							<button
								className={`accordion-button color-gray-lt shadow-none collapsed ${styles.sectioncolor} `}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
								aria-expanded="false"
								aria-controls={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							>
								{props.sectype=='pc' &&<span className="first-col poppins-medium-16px"> {props.pc_number}</span>}
								{/* <span className={`${props.level=='3'?styles.section_funct:styles.section_cat} ${props.sectype=='pc'?'ms-4 poppins-medium-18px':''}`}>{props.title}</span> */}
								<span className={`${props.level=='3'?styles.section_funct:styles.section_cat} ${props.sectype=='pc'?'second-col':''}`}>{props.title}</span>
							</button>
						</h4>
						<div
							id={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							className="accordion-collapse collapse border-4C4D554D poppins-regular-18px"
							aria-labelledby={`flush-collapse${props.pc_number.replace(".", "")}pc${props.index}`}
							data-bs-parent={`#accordionFlush${props.pc_number.replace(".", "")}pc${props.index}`}
						>
							<div className="accordion-body sectioncolor">
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
