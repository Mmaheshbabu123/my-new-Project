import { useRouter } from 'next/router';
import PcOverview from '../../components/PcComponent/PcOverview';

const Pc = () => {
	const router = useRouter();

	return <PcOverview pcid={router.query.pcid} />;
};

export default Pc;