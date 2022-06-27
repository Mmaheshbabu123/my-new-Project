import React from 'react';
import { APICALL } from '../../Services/ApiServices';
import Link from 'next/link';
import { Uniquekey } from '../../Services/GenetateUniqueKey';

function Add_manage_planning(props) {
	const unique_key = Uniquekey.generate_unique_key();
	let backToDashboard = () => {
		window.location.assign(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'dashboard?access=employeer&check_logged_in=1'
		);
	};
	return (
		<div className="container">
			<div className="row mt-5 text-center ">
				<div className="col ">
					<button type="button " className="btn-lg btn-outline-dark border w-50 ">
						<Link href={'/planning/add/' + unique_key}>
							<p className="h3">Add planning</p>
						</Link>
					</button>
				</div>
				<div className="col">
					<button type="button" className="btn-lg btn-outline-dark border w-50 ">
						<Link href={'manage-planning/select'}>
							<p className="h3">Manage planning</p>
						</Link>
					</button>
				</div>
			</div>
			<div className="">
				<button type="button" className="btn-lg btn-secondary border  " onClick={() => backToDashboard()}>
					Back
				</button>
			</div>
		</div>
	);
}
export default Add_manage_planning;
