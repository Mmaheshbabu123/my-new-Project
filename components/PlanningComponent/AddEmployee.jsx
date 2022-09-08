import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { NextResponse, NextRequest } from 'next/server';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { Printer } from 'react-bootstrap-icons';
import Link from 'next/link';

const AddEmployee = () => {
	const [ Data, setData ] = useState([]);
	const [ Error, setError ] = useState();
	const router = useRouter();
	const p_unique_key = router.query.p_unique_key;
	const [ defaultvalue, setDefaultValue ] = useState(null);
	const [ selectedOption, setSelectedOption ] = useState([]);
	const [ pclist, setPclist ] = useState([]);

	const [ tempOption, setTempOption ] = useState([]);

	const [ error_pclist, setError_pclist ] = useState('');

	//--------------------- Add another and remove field ------------------------------//
	const [ inputlist, setInputlist ] = useState([ { pclist: '', employees: '' } ]);
	const [ disabled, setDisabled ] = useState(true);
	const handleinputchange = (e, index) => {
		const { name, value } = e.target;
		const list = [ ...inputlist ];
		list[index][name] = value;
		setInputlist(list);
	};

	const handleaddanother = () => {
		// alert('add-another successful ');
		setInputlist([ ...inputlist, { pclist: '', employees: '' } ]);
	};
	const handleremove = (index) => {
		const list = [ ...inputlist ];
		list.splice(index, 1);
		setInputlist(list);
	};

	// const handleChange = (e) => {
	// 	if (inputlist != '') {
	// 		setDisabled(false);
	// 	}
	// };
	//--------------------- Add another and remove field ------------------------------//

	useEffect(
		() => {
			if (!router.isReady) return;
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getEmployeeByUsingCompanyId/' + p_unique_key,
				'GET'
			)
				.then((result) => {
					console.log(result);
					getOptions(result, 1);
				})
				.catch((error) => {
					console.error(error);
				});

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/selectedEmployees/' + p_unique_key, 'GET')
				.then((result) => {
					getOptions(result, 2);
				})
				.catch((error) => {
					console.error(error);
				});
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

				options[key] = opt;
			});
			if (c == 1) {
				setData(options);
			} else {
				setSelectedOption(options);
				setTempOption(options);
			}
		}
	};

	const submit = (e) => {
		e.preventDefault();

		var err = ValidationService.emptyValidationMethod(selectedOption);
		// var err1 = ValidationService.emptyValidationMethod(pclist);

		if (err != '') {
			setError(err);
			// setError_pclist(err1);
		} else {
			setError(err);
			// setError_pclist(err1);
			if (selectedOption.length != 0) {
				let data = [ selectedOption, p_unique_key, tempOption ];

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
			} else {
				router.push('/planning/functions/' + p_unique_key);
			}
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
					{inputlist.map((input, i) => {
						return (
							<div className="row">
								<div className="col-md-7 m-auto mb-3 mt-5 ">
									<div className="row col-md-8 select-relative slt-emp">
										<label
											className="custom_astrick form-label mb-1 custom_astrick poppins-medium-22px ps-0"
											style={{}}
										>
											Paritair commite
										</label>
										<select
											className="form-select poppins-regular-16px rounded-0 border-0 bg-light"
											name="pclist"
											// value={pclist}
											onChange={(e) => {
												handleinputchange(e, i);
											}}
										>
											<option selected key="1">
												Select...
											</option>
											<option value="1">PC-101</option>
											<option value="2">PC-102</option>
											<option value="3">PC-301</option>
										</select>
									</div>
									<div className="col-md-4" />
									{/* <span style={{ color: 'red' }}>{error_pclist}</span> */}
								</div>
								{/* <div className="col-md-12 selectemp-height"> */}
								<div className="col-md-12 ">
									<div className="row col-md-7 m-auto">
										<div className="row col-md-8 select-relative slt-emp ps-1">
											<label
												className="custom_astrick form-label mb-1 custom_astrick poppins-medium-22px px-0"
												style={{}}
											>
												Employee
											</label>
											<Select
												value={selectedOption}
												isMulti
												name="employees"
												className="poppins-regular-16px rounded-0 select_employee_container px-0"
												options={Data}
												onChange={(e) => {
													setSelectedOption, handleinputchange(e, i);
												}}
											/>
											<span style={{ color: 'red' }}>{Error}</span>
										</div>
										{/* Add or remove button */}

										<div className="col-md-4 bd-highlight align-self-end">
											<div className="p-2 bd-highlight">
												{inputlist.length !== 1 &&
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
												{inputlist.length - 1 === i && (
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
					<div className="text-start col-md-6">
						<button type="button" className="btn  btn-block px-0">
							<Link href={'/planning/add/' + p_unique_key}>
								<p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px ">
									BACK
								</p>
							</Link>
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="submit"
							className="btn poppins-light-19px-next-button rounded-0 px-3  btn-block float-end"
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
