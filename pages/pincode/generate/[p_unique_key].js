// import ManagePc from '../components/PcComponent/ManagePc';
import Genrate from '@/components/TimeRegistration/ConfirmPin';

const Pin = () => {
	return (
		<div>
			<div className="row py-4 position-sticky-pc">
				{/* <div className="col-4" /> */}
				<div className="col-md-12 display-5 bitter-italic-normal-medium-24 text-left">Create pincode</div>
			</div>
			<Genrate />
		</div>
	);
};
export default Pin;
