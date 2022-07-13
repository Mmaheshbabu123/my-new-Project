import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { fetchallproject, addProject } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import Popup from './ProjectDeletePopup';

function ManageProject(props) {
	const router = useRouter();
	const { p_unique_key } = router.query;
	/**
     * Initialise search filter 
     */
	const [ updated, setUpdated ] = useState(0);
	const [ searchProjectname, setSearchProjectname ] = useState('');
	const [ searchlocation, setSearchlocation ] = useState('');
	const [ searchaddress, setSearchaddress ] = useState('');
	const [ project, setProject ] = useState('');
	const [ projectTemp, setProjectTemp ] = useState([]);
	const [ showdeletepopup, setShowdeletepopup ] = useState(false);
	const [ projectid, setProjectid ] = useState('');

	/**
	/**
	 * FETCHING PROJECT
	 */
	useEffect(
		() => {
			APICALL.service(fetchallproject, 'GET')
				.then((result) => {
					console.log(result.data);

					setProject(result.data);
					setProjectTemp(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ updated ]
	);
	// DELETE FUNCTIONALITY //
	const deleteproject = async () => {
		var data = {
			id: projectid
		};
		APICALL.service(addProject, 'POST', data)
			.then((result) => {
				console.log(result.status);
				setUpdated(updated + 1);
				setShowdeletepopup(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const closePopup = () => {
		setShowdeletepopup(false);
	};
	const showPopup = (id) => {
		setProjectid(id);
		setShowdeletepopup(true);
	};
	/**
     *  SEARCH FUNCTIONALITY
     */
	function handleSearch() {
		var res = [];
		/**
		 * CONDITIONS WHEN ALL THREE VALUES ARE GIVEN 
		 */
		// if (searchProjectname != '' && searchlocation != '' && searchaddress != '') {
		// 	projectTemp.map((val) => {
		// 		if (
		// 			val['projectname'].trim().toLowerCase().includes(searchProjectname.toLowerCase()) &&
		// 			val['location'].trim().toLowerCase().includes(searchlocation.toLowerCase()) &&
		// 			val['address'].trim().toLowerCase().includes(searchaddress.toLowerCase())
		// 		) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// CONDITIONS WHEN TWO VALUES ARE GIVEN //
		// } else if (searchProjectname != '' && searchlocation != '') {
		// 	projectTemp.map((val) => {
		// 		if (
		// 			val['projectname'].trim().toLowerCase().includes(searchProjectname.toLowerCase()) &&
		// 			val['location'].trim().toLowerCase().includes(searchlocation.toLowerCase())
		// 		) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// } else if (searchlocation != '' && searchaddress != '') {
		// 	projectTemp.map((val) => {
		// 		if (
		// 			val['location'].trim().toLowerCase().includes(searchlocation.toLowerCase()) &&
		// 			val['address'].trim().toLowerCase().includes(searchaddress.toLowerCase())
		// 		) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// } else if (searchaddress != '' && searchProjectname != '') {
		// 	projectTemp.map((val) => {
		// 		if (
		// 			val['address'].trim().toLowerCase().includes(searchaddress.toLowerCase()) &&
		// 			val['projectname'].trim().toLowerCase().includes(searchProjectname.toLowerCase())
		// 		) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		//  CONDITION WHEN ONLY ONE VALUES ARE GIVEN //
		// } else if (searchProjectname != '') {
		// 	projectTemp.map((val) => {
		// 		if (val['projectname'].trim().toLowerCase().includes(searchProjectname.toLowerCase())) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// } else if (searchlocation != '') {
		// 	projectTemp.map((val) => {
		// 		if (val['location'].trim().toLowerCase().includes(searchlocation.toLowerCase())) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// } else if (searchaddress != '') {
		// 	projectTemp.map((val) => {
		// 		if (val['address'].trim().toLowerCase().includes(searchaddress.toLowerCase())) {
		// 			res.push(val);
		// 		}
		// 	});
		// 	setProject(res);
		// }
	}
	// RESET FUNCTIONALITY //

	function handleReset() {
		setProject(projectTemp);
		setSearchProjectname('');
		setSearchlocation('');
		setSearchaddress('');
	}
	let backToDashboard = () => {
		window.location.assign(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'dashboard?access=administrator&check_logged_in=1'
		);
	};

	return (
		<div className="container">
			<form>
				<div className="row ">
					<div className="form-check mt-2  ">
						<p className="h3">Manage project</p>
						<div className="row d-flex">
							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2"
									placeholder="Project name"
									value={searchProjectname}
									onChange={(e) => setSearchProjectname(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2"
									placeholder="Location"
									value={searchlocation}
									onChange={(e) => setSearchlocation(e.target.value)}
								/>
							</div>

							<div className="col-sm-3">
								<input
									type="search"
									id="form12"
									className="form-control mt-2 mb-2 text-break"
									placeholder="Address"
									value={searchaddress}
									onChange={(e) => setSearchaddress(e.target.value)}
								/>
							</div>
							<div className="col-sm-2">
								<button
									type="button"
									className="btn btn-secondary btn-block float-right mt-2 mb-2 ms-2 "
									onClick={() => handleSearch()}
								>
									Search
								</button>
								<button
									type="button"
									className="btn btn-secondary btn-block float-right mt-2 mb-2 ms-2"
									onClick={() => handleReset()}
								>
									Reset
								</button>
							</div>
						</div>
						<table className="table   mt-3 mb-3 text-center">
							<thead>
								<tr className="table-secondary">
									<th className="">Project name</th>
									<th className="">Location</th>
									<th className="">Address</th>
									<th className="">Action</th>
								</tr>
							</thead>
							<tbody>
								{project.length > 0 &&
									project.map((result) => (
										<tr className="border p-2" key={result.id}>
											<td className="">{result.project_name}</td>
											<td className="">{result.project_location}</td>
											<td className="">{result.address_id}</td>
											<td className="d-flex justify-content-center">
												<MdEdit className="mt-2 ms-3 " />

												<span onClick={() => showPopup()} type="button">
													<MdDelete className="mt-2 ms-3 " />
												</span>
											</td>
										</tr>
									))}
								{project.length == 0 && (
									<tr>
										<td colSpan={4} className="text-center">
											No records
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				<div className="text-start col-md-6">
					<button
						type="button"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => backToDashboard()}
					>
						Back
					</button>
				</div>
			</form>
			{showdeletepopup == true && (
				<Popup display={'block'} popupActionNo={closePopup} popupActionYes={deleteproject} />
			)}
		</div>
	);
}
export default ManageProject;
