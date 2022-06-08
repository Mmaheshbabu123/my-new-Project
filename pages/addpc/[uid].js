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
		<>
		<PcCommon unique_id={router.query.uid}/>
		</>
	);
};
export default Addpc;
