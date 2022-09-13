import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee, fetchPlanningEmployee } from '../../Services/ApiEndPoints';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AddEmployee = () => {
	const [ empList, setEmpList ] = useState([]);
	const [ tempEmpList, setTempEmpList ] = useState([]);

	const [ pclist, setPclist ] = useState([]);
	const [ tempPcList, setTempPcList ] = useState([]);

	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ tempOption, setTempOption ] = useState([]);
	//--------------------- Add another and remove field ------------------------------//
	const [ inputlist, setInputlist ] = useState([ { pc: [], employees: [], pc_error: '', emp_error: '' } ]);
	const [ previousVal, setPreviousVal ] = useState([]);


	const handleinputchange = (type, val, index) => {
		const list = [ ...inputlist ];
		if (type == 'employees') {
			list[index].employees = val;
			list[index].emp_error = '';
			setInputlist(list);

			updatelist('emp',list);
		} else {
			list[index].pc = [ val ];
			list[index].pc_error = '';
			setInputlist(list);
			updatelist('pc',list);

			
		}

	};

	const updatelist = (type,list) => {

		if(type == 'emp'){
			const temp = [ ...tempEmpList ];
			list.map((v1, k1) => {
				v1.employees.map((v2) => {
					temp.splice(temp.indexOf(v2), 1);
				});
			});
			setEmpList(temp);
		}
		if(type == 'pc'){
			var pcs = [ ...tempPcList ];
			list.map((v1, k1) => {
				pcs.splice(pcs.indexOf(v1.pc[0]), 1);

			})
			setPclist(pcs);
		}

		
	};

	const handleaddanother = () => {
		var error = validate(inputlist);
		if (!error) {
			setInputlist([ ...inputlist, { pc: [], employees: [], pc_error: '', emp_error: '' } ]);
		} else {
			window.scrollTo(0, 0);
		}
	};
	const handleremove = (index) => {
		const list = [ ...inputlist ];
		list.splice(index, 1);
		setInputlist(list);
		updatelist('emp',list);
		updatelist('pc',list);
	};
	//--------------------- Add another and remove field ------------------------------//

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(fetchPlanningEmployee + p_unique_key, 'GET')
				.then((result) => {
					if (result.status == 200) {
						setEmpList(result.data[0]);
						setTempEmpList(result.data[0]);
						setPclist(result.data[1]);
						setTempPcList(result.data[1]);
						if(result.data[2].length>0){
							setInputlist(result.data[2])

						}else if (result.data[1].length == 1) {
							var list = [ ...inputlist ];
							list[0].pc = result.data[1];
							setInputlist(list);
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});

			// APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/selectedEmployees/' + p_unique_key, 'GET')
			// 	.then((result) => {
			// 		getOptions(result, 2);
			// 	})
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
		},
		[ router.query ]
	);

	const getOptions = (res, c) => {
		var options = [];
		if (res !== null) {
			res.map((val, key) => {
				var opt = {
					value: '',
					label: ''
				};
				opt.value = val.Employee_id;
				opt.label = val.Employee_name;
				opt.isDisabled = true;

				options[key] = opt;
			});
			if (c == 1) {
				setEmpList(options);
			} else {
				setSelectedOption(options);
				setTempOption(options);
			}
		}
	};

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

	const submit = (e) => {
		e.preventDefault();

		var err = validate(inputlist);
		if (!err) {
			let data = [ inputlist, p_unique_key, previousVal ];
			APICALL.service(addplanningemployee, 'POST', data)
				.then((result) => {
					if (result.status === 200) {
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
				<div className="row m-0">
					<div className="row col-md-12" style={{}}>
						<h1 className="mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0">Select employee</h1>
					</div>
				</div>
				{/* Select paritair commite */}
				<div>
					{inputlist.map((val, i) => {
						return (
							<div className="row" key={i}>
								<div className="col-md-7 m-auto mb-3 mt-5 ">
									<div className="row col-md-8 select-relative slt-emp">
										<label className="custom_astrick form-label mb-1 custom_astrick poppins-medium-22px ps-0">
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
									<div className="pt-2" style={{ color: 'red' }}>
										{val['pc_error']}
									</div>
								</div>
								<div className="col-md-12 ">
									<div className="row col-md-7 m-auto">
										<div className="row col-md-8 select-relative slt-emp ps-1">
											<label className="custom_astrick form-label mb-1 custom_astrick poppins-medium-22px px-0">
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
											<div className="p-2 bd-highlight">
												{// pclist.length > 1 &&
												inputlist.length !== 1 &&
												i > 0 && (
													<button
														type="button"
														className="btn  btn-block px-0 "
														onClick={() => handleremove(i)}
													>
														<p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px ">
															Remove
														</p>
													</button>
												)}
												{tempPcList.length > 1 && 
												pclist.length >= 1 &&
												inputlist.length - 1 === i && (
													<button
														type="submit"
														className="btn poppins-light-19px-next-button rounded-0 px-3  btn-block float-end ms-1"
														onClick={handleaddanother}
													>
														Add another
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="row">
					<div className="text-start col-md-6 d-flex align-items-center">
						<button
							type="button"
							className="btn  btn-block px-0"

						>
							<Link href={'/planning/add/' + p_unique_key}>
								<p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px shadow-none">
									BACK
								</p>
							</Link>
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn poppins-light-19px-next-button rounded-0 px-3  btn-block float-end shadow-none"
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
