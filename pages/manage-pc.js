import { Layout } from '../components/layout/Layout';
import ManagePc from '../components/PcComponent/ManagePc';
import { APICALL } from '../Services/ApiServices';
import { getPcOverviewDetails } from '../Services/ApiEndPoints';


export async function getStaticProps() {
    const data = await APICALL.service(getPcOverviewDetails, 'GET')
			.then((result) => {
				if (result.status === 200) {
					return result.paritairecomitee;
				}
			})
			.catch((error) => {
				console.log(error);
                return [];
			});


	// Props returned will be passed to the page component
	return { props: { res:data } };
}

const Managepc = ({ res }) => (
	<div>
		<ManagePc data={res} />
	</div>
);
export default Managepc;
