import { useRouter } from 'next/router';
import PcCommon from "../../components/PcComponent/PcCommon";


const Pc = () => {
	const router = useRouter();

	return <PcCommon pcid={router.query.pcid}  type="edit"/>;
};

export default Pc;