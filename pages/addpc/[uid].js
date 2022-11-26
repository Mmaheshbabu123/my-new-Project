import PcCommon from "../../components/PcComponent/PcCommon";
import { useRouter } from 'next/router';



/**
 * 
 * @param {*} props 
 * @returns the added category data to the common.js component.
 */
const Addpc = () => {
	const router = useRouter();

	
	return (
		<div className="container-fluid p-0 ">
			{/* <div className="hidden-text"><h1>hello</h1></div> */}
		<PcCommon type="add" pcid={router.query.pcid}/>
		</div>
	);
};
export default Addpc;
