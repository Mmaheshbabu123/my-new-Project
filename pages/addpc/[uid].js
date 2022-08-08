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
		<div className="container-fluid pt-5 p-0 ">
		<PcCommon type="add" pcid={router.query.pcid}/>
		</div>
	);
};
export default Addpc;
