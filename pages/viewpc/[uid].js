import { useRouter } from 'next/router';
import PcCommon from "../../components/PcComponent/PcCommon";


const ViewPc = () => {
	const router = useRouter();

	return <PcCommon pcid={router.query.pcid}  type="view"/>;
};

export default ViewPc;