import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee, fetchPlanningEmployee } from '../../Services/ApiEndPoints';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { cloneDeep } from 'lodash';

const AddEmployee = () => {
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;

	const [ empList, setEmpList ] = useState([]);
	const [ tempEmpList, setTempEmpList ] = useState([]);
	const [ pclist, setPclist ] = useState([]);
	const [ tempPcList, setTempPcList ] = useState([]);
	const [ inputlist, setInputlist ] = useState([ { pc: [], employees: [], pc_error: '', emp_error: '' } ]);
	const [ previousVal, setPreviousVal ] = useState([]);
	const [buttonDisable, setButtonDisable] = useState(false);

	/**
	 * 
	 * @param {*} type 
	 * @param {*} val 
	 * @param {*} index 
	 */
	const handleinputchange = (type, val, index) => {
		const list = [ ...inputlist ];
		if (type == 'employees') {
			list[index].employees = val;
			list[index].emp_error = '';
			setInputlist(list);
			updatelist('emp', list);
		} else {
			list[index].pc = [ val ];
			list[index].pc_error = '';
			setInputlist(list);
			updatelist('pc', list);
		}
	};

	/** updatelist: Update dropdown list based on the value selected
	 * 
	 * @param {*} type 
	 * @param {*} list 
	 */
	const updatelist = (type, list) => {
		const temp = [ ...tempEmpList ];

		console.log(temp);
		if (type == 'emp') {
			list.map((v1, k1) => {
				v1.employees.map((v2) => {
					temp.splice(temp.findIndex((a) => a.value == v2.value), 1);
				});
			});
			setEmpList(temp);
		}
		if (type == 'pc') {
			var pcs = [ ...tempPcList ];
			list.map((v1, k1) => {
				pcs.splice(pcs.findIndex((a) => a.value == v1.pc[0].value), 1);
			});
			setPclist(pcs);
		}
	};

	/**
	 *  Add another block to select pc and employees
	 */
	const handleaddanother = () => {
		var error = validate(inputlist);
		if (!error) {
			setInputlist([ ...inputlist, { pc: [], employees: [], pc_error: '', emp_error: '' } ]);
		} else {
			window.scrollTo(0, 0);
		}
	};

	/**
	 * 
	 * @param {*} index 
	 */
	const handleremove = (index) => {
		const list = [ ...inputlist ];
		list.splice(index, 1);
		setInputlist(list);
		updatelist('emp', list);
		updatelist('pc', list);
	};

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(fetchPlanningEmployee + p_unique_key, 'GET')
				.then((result) => {
					if (result.status == 200) {
						setTempEmpList(cloneDeep(result.data[0]));
						setTempPcList(cloneDeep(result.data[1]));

						if (result.data[2].length > 0) {
							setPreviousVal(cloneDeep(result.data[2]));
							setInputlist(cloneDeep(result.data[2]));
							const temp2 = result.data[0];
							const temp3 = result.data[1];

							result.data[2].map((v1, k1) => {
								v1.employees.map((v2) => {
									temp2.splice(temp2.findIndex((a) => a.value == v2.value), 1);
								});
									temp3.splice(temp3.findIndex((a) => a.value == v1.pc[0].value), 1);
							});
							setEmpList(temp2);
							setPclist(temp3);

						} else if (result.data[1].length == 1 && result.data[2].length == 0) {
							var list = [ ...inputlist ];
							list[0].pc = result.data[1];
							setInputlist(list);
							setEmpList(result.data[0]);
							setPclist(result.data[1]);
						} else {
							setEmpList(result.data[0]);
							setPclist(result.data[1]);
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	/**
	 * 
	 * @param {*} res 
	 * @returns 
	 */
	const validate = (res) => {
		var count = 0;
		var data = [ ...res ];
		data.map((val, key) => {
			if (val.pc.length == 0) {
				data[key].pc_error = 'This field is required.';
				count++;
			}
			if (val.employees.length == 0) {
				data[key].emp_error = 'This field is required.';
				count++;
			}
		});
		setInputlist(data);

		if (count == 0) {
			return false;
		} else {
			return true;
		}
	};

	/**
	 * 
	 * @param {*} e 
	 */
	const submit = (e) => {
		e.preventDefault();
		var err = validate(inputlist);

		if (!err) {
			setButtonDisable(true);
			let data = [ inputlist, p_unique_key, previousVal ];
			APICALL.service(addplanningemployee, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
						setButtonDisable(false);
						router.push('/planning/functions/' + p_unique_key);
					} else {
						console.log(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div className="col-md-12" style={{}}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row m-0  position-sticky-pc">
					<div className="row col-md-12" style={{}}>
						<h1 className="py-4  font-weight-bold  bitter-italic-normal-medium-24 px-0">Select employee</h1>
					</div>
				</div>
				{/* Select paritair commite */}
				<div className='planning-height'>
					{inputlist.map((val, i) => {
						return (
							<div className="row" key={i}>
								<div className="col-md-7 m-auto mb-3 mt-5 p-0">
									<div className='row'>
									<div className="col-md-8 select-relative slt-emp p-0">
										<label className="custom_astrick form-label mb-1 custom_astrick poppins-medium-18px ps-0">
											Paritair commite
										</label>
										<Select
											id={'pc-value-select' + i}
											instanceId={'pc-value-select' + i}
											value={val['pc']}
											name="pc"
											className="poppins-regular-16px rounded-0 select_employee_container px-0"
											options={pclist}
											onChange={(value) => {
												handleinputchange('pc', value, i);
											}}
										/>
									</div>
									<div className="col-md-4" />
									<div className="pt-2 px-0" style={{ color: 'red' }}>
										{val['pc_error']}
									</div>
								</div>
									</div>
								<div className="col-md-12 ">
								<div className='row'>
								<div className="col-md-7 m-auto p-0">
										<div className='row'>
										<div className="col-md-8 select-relative slt-emp p-0">
											<label className="custom_astrick form-label mb-1 custom_astrick poppins-medium-18px px-0">
												Employee
											</label>
											<Select
												id={'emp-value-select' + i}
												instanceId={'emp-value-select' + i}
												value={val['employees']}
												isMulti
												name="employees"
												className="poppins-regular-16px rounded-0 select_employee_container px-0"
												options={empList}
												onChange={(value) => {
													handleinputchange('employees', value, i);
												}}
											/>
											<span className="mt-2" style={{ color: 'red' }}>
												{val['emp_error']}
											</span>
										</div>
										{/* Add or remove button */}

										<div className="col-md-4 bd-highlight align-self-end">
											<div className="bd-highlight row">
												<div className='col-md-6 align-self-center'>
													{// pclist.length > 1 &&
												inputlist.length !== 1 &&
												i > 0 && (
													<button
														type="button"
														className="btn  btn-block px-0 shadow-none"
														onClick={() => handleremove(i)}
													>
														<p className="bg-white border-0 poppins-medium-18px poppins-medium-18px shadow-none">
															Remove
														</p>
													</button>
												)}
													</div>
												<div className='col-md-6 align-self-center add_project'>
												{inputlist.length < tempPcList.length &&
												inputlist.length - 1 === i && (
													<button
														type="submit"
														className="btn rounded-0 px-3  btn-block float-end ms-1 shadow-none add-proj-btn"
														onClick={handleaddanother}
														style={{height:'43px'}}
													>
														+ Add
													</button>
												)}
													</div>
											</div>
										</div>
											</div>
									</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="row my-4">
					<div className="text-start col-md-6 d-flex align-items-center">
						<button type="button" className="btn  btn-block px-0 shadow-none">
							<Link href={'/planning/add/' + p_unique_key}>
								<p className="bg-white border-0 poppins-light-18px shadow-none text-decoration-underline">
									BACK
								</p>
							</Link>
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
						disabled={buttonDisable}
							type="sumit"
							className="btn poppins-medium-18px-next-button rounded-0 px-3  btn-block float-end shadow-none"
						>
							NEXT
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEmployee;
