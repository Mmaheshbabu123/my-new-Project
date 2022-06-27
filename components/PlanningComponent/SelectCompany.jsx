import React, { Component, useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Link from 'next/link';
import { useRouter } from 'next/router';


function SelectCompany(props) {
    const router = useRouter();

	const [ company, setCompany ] = useState([]);
	const [ company_id, setCompany_id ] = useState('');

	const [ error_comp_id, setError_comp_id ] = useState('');

	// FETCHING DATA FROM DRUPAL //
	useEffect(() => {
		APICALL.service(process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'managecompanies?_format=json', 'GET')
			.then((result) => {
				console.log(result);

				if (result.length > 0) {
					setCompany(result);
				} else {
					console.log(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	let submit = (event) => {
		event.preventDefault();
		if (company_id != '') {
			router.push('/manage-planning/weekly/' + company_id);
		} else {
			setError_comp_id('This field is required');
		}
	};

	return (
		<div className="container">
			<form onSubmit={(e) => submit(e)}>
				<div className="row mt-5 text-center ">
					<div className="form-group">
						<label className="form-label mb-2 custom_astrick">Select company</label>
						<select
							className="form-select mb-2 mt-2"
							placeholder="select company"
							onChange={(e) => {
								setCompany_id(e.target.value);
								// setData((prev) => ({ ...prev, comp_id: e.target.value }));
							}}
						>
							<option value="">Select</option>
							{console.log(company)}
							{company.map((options) => (
								<option key={options.comp_id} value={options.comp_id}>
									{options.comp_name}
								</option>
							))}
						</select>
						<p className="error mt-2">{error_comp_id}</p>
					</div>
				</div>
				<div className="row pt-4">
					<div className="col-md-6">
						<button type="button" className="btn-lg btn-secondary border  ">
							<Link href={'/planning/options'}>
								<a className="">Back</a>
							</Link>
						</button>
					</div>
					<div className="col-md-6">
						<button type="submit" className="btn-lg btn-secondary border float-end ">
                            Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default SelectCompany;
