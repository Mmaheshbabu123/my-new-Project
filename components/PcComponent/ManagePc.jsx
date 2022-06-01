import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
// import axios from 'axios';
import { FaTrash, FaPen, FaAngleDown, FaAngleUp, FaEdit, FaRecycle, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
// import Collapsible from 'react-collapsible';
// import { render } from '@testing-library/react';
// import ReactNbsp from 'react-nbsp';
// import { Link } from 'react-bootstrap-icons';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import PcOverview from './PcOverview';
import { MdEdit, MdDelete } from 'react-icons/md';
import { APICALL } from '../../Services/ApiServices';
import { getPc } from '../../Services/ApiEndPoints';

/**
 * this will project all the partire committee's data.
 * @returns 
 */
const ManagePc = (props) => {
	console.log(props);
	var url = process.env.REACT_APP_BACKEND_URL;
	// const navigate = useNavigate();
	const [ data, setData ] = useState([]);
	const [ cls, setcls ] = useState('col-md-10');
	const [ cls1, setcls1 ] = useState('col-md-2');

	useEffect(() => {
		getData();
	});

	/**
   * used to delete complete paritaire committee data at the backend through the api's.
   * @param {*} $id 
   */

	// const delet = async ($id) => {
	//   console.log('gotcha');
	//   var url = process.env.REACT_APP_BACKEND_URL;
	//   const res = await axios.post(url + 'api/deletefullcommitte/' + $id);
	//   if (res.data.status === 200) {
	//     await getData();
	//   }
	//   window.location.reload();
	// }

	var t = [];

	var lenght = data.length;
	/**
   * used to get the data when we loads the page.
   */
	const getData = async () => {
		var url = process.env.REACT_APP_BACKEND_URL;
		if (lenght == 0 || lenght == undefined) {
			APICALL.service(getPc, 'GET')
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						var d = [];
						console.log(result.paritairecomitee);
						setData(result.paritairecomitee);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	/**
   * Goes to the add_pc page with respective pc id.
   * @param {*} n 
   * @returns 
   */
	const edt = async (n) => {
		navigate('/add-pc');
	};
	var D = [];
	var pid = '';
	D = data;
	var result = [];

	return (
		<div className="container">
			<div className="row">
				<h3 className="row mt-3 ms-5 text-bold">Manage Paritaire Comitee</h3>
				<div className="col-md-9" />
				<div className="col-md-3">
					<button
						className="mt-5 ml-2 mb-4 btn btn-secondary btn-lg btn-block float-sm-right  add-proj-btn"
						onClick={() => navigate('/addpc')}
					>
						Add Paritaire Comitee
					</button>
				</div>
			</div>

			{Object.keys(data).map((val, key) => (
				<div className="row" key={val}>
					<div className="col-md-10">
						<PcOverview
							pcid={data[val][0]['id']}
							pc_number={data[val][0]['pc_number']}
							page_type={'manage'}
						/>
					</div>
					<div className="col-md-2">
						<h5 className="pt-2 pb-3 px-2 managep-actions section-color">
							<a className="me-2 text-dark" href={`/pc/${data[val][0]['id']}`}>
								<MdEdit />
							</a>
							<a className="me-2 text-dark">
								<MdDelete />
							</a>
						</h5>
					</div>
				</div>
			))}
		</div>
	);
};

export default ManagePc;
