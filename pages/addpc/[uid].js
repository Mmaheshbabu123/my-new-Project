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
		<div className="container mt-5">
		<PcCommon type="add" pcid={router.query.pcid}/>
		</div>
	);
};
export default Addpc;
