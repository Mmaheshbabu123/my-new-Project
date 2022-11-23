// import ManagePc from '../components/PcComponent/ManagePc';
import Pincode from '@/components/TimeRegistration/Pincode';

const Verifypin = () => {
	return (
		<div>
			<div className="row py-4 position-sticky-pc">
				{/* <div className="col-4" /> */}
				<div className="col-md-12 display-5 bitter-italic-normal-medium-24 text-left">Enter pincode to start/stop the planning</div>
			</div>
			<Pincode />
		</div>
	);
};
export default Verifypin;
