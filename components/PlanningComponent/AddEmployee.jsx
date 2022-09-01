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
	const [ tempOption, setTempOption ] = useState([]);

	useEffect(
		() => {
			var p_unique_key = router.query.p_unique_key;
			console.log(p_unique_key);
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getEmployeeByUsingCompanyId/' + p_unique_key,
				'GET'
			)
				.then((result) => {
					getOptions(result, 1);
				})
				.catch((error) => {
					console.error(error);
				});

			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/selectedEmployees/' + p_unique_key, 'GET')
				.then((result) => {
					console.log(result);
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

		if (err != '') {
			setError(err);
		} else {
			setError(err);
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
				<div className="col-md-12 selectemp-height">
					<div className="row col-md-6 m-auto select-relative slt-emp">
						<label
							className="custom_astrick form-label mb-1 custom_astrick poppins-medium-22px"
							style={{}}
						>
							Employee
						</label>
						{console.log(Data)}
						{console.log(selectedOption)}

						<Select
							value={selectedOption}
							isMulti
							name="employees"
							className="poppins-regular-16px rounded-0 select_employee_container"
							options={Data}
							onChange={setSelectedOption}
						/>
						<span style={{ color: 'red'}}>{Error}</span>
					</div>
				</div>
				<div className="row">
					<div className="text-start col-md-6 d-flex align-items-center">
						<button
							type="button"
							className="btn  btn-block px-0"
						
						>
							<Link href={'/planning/add/' + p_unique_key}>
								<p className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-medium-18px ">
									BACK
								</p>
							</Link>
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
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
