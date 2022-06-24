import React from 'react';
import { APICALL } from '../../Services/ApiServices';
import Link from 'next/link';
import { Uniquekey } from '../../Services/GenetateUniqueKey';

function Add_manage_planning(props) {
	const unique_key = Uniquekey.generate_unique_key();

	return (
		<div className="container">
			<div className="row mt-5 text-center ">
				<div className="col ">
					<button type="button " className="btn-lg btn-outline-dark border w-50 ">
						<Link href={'/add-planning/' + unique_key}>
							<p className="h3">Add planning</p>
						</Link>
					</button>
				</div>
				<div className="col">
					<button type="button" className="btn-lg btn-outline-dark border w-50 ">
						<Link href={'/weekly-planning'}>
							<p className="h3">Manage planning</p>
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default Add_manage_planning;
