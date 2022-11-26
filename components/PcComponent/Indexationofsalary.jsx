import React, { useState, useContext, useEffect } from 'react';
import { PcContext } from '../../Contexts/PcContext';
import { fetchEmployeeTypes, storePcEmployeeTypes, getPcEmployeeTypes } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { useRouter } from 'next/router';
import MultiSelectField from '@/atoms/MultiSelectField';
import DatePicker from 'react-multi-date-picker';

const Indexationofsalary = () => {
	const router = useRouter();

	const [ paritaircomites, setParitaircomites ] = useState([]);

	useEffect(
		() => {
			if (!router.isReady) return;
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getAllPartiairComites', 'GET')
				.then((result) => {
					if (result) {
						setParitaircomites(result);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	const updateradio = (value) => {};

	return (
		<div className="container">
			<form>
				<div className="container">
					<div className="row">
						<div>
							<p style={{ fontWeight: 'bold' }}>Indexation of salary</p>
						</div>
						<div className="mt-2">
							Indexation type
							<div onChange={updateradio} className="mt-1">
								<div>
									<input type="radio" value="percentage" name="indexation" /> Indexation in %
								</div>
								<div>
									<input type="radio" value="value" name="indexation" /> Indexation in euro(value)
								</div>
							</div>
						</div>
						<label className="mt-3">Amount of indexation:</label>
						<div className="mt-2">
							<input className="w-75" type="text" />
						</div>
						<label className="mt-3">Date as of which indexation takes place</label>
						<div className="mt-2">
							{/* <input className='w-75' type="date" /> */}
							<DatePicker size="lg" />
						</div>

						<label className="mt-3">Paritair comite</label>
						<div className="mt-2">
							<MultiSelectField
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								options={paritaircomites[0]}
								disabled={false}
								// handleChange={(obj) =>
								// 	updateEmployeeType(value, obj.value)}
								isMulti={true}
								// className="col-md-6"
								className="col-md-9 "
							/>
						</div>

						<label className="mt-3">Category</label>
						<div className="mt-2">
							<MultiSelectField
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								options={paritaircomites[1]}
								disabled={false}
								// handleChange={(obj) =>
								// 	updateEmployeeType(value, obj.value)}
								isMulti={true}
								// className="col-md-6"
								className="col-md-9 "
							/>
						</div>

						<label className="mt-3">Employee type(statuut)</label>
						<div className="mt-2">
						<MultiSelectField
								placeholder={'Select employee types'}
								name="employeetypes"
								id={'employeetypes'}
								options={paritaircomites[2]}
								disabled={false}
								// handleChange={(obj) =>
								// 	updateEmployeeType(value, obj.value)}
								isMulti={true}
								// className="col-md-6"
								className="col-md-9 "
							/>
						</div>

						<label className="mt-3">Selection of indexation</label>
						<div className="mt-2">
						<MultiSelectField
								placeholder={'Select paritair comites'}
								name="partaircomites"
								id={'partaircomites'}
								options={paritaircomites[2]}
								disabled={false}
								// handleChange={(obj) =>
								// 	updateEmployeeType(value, obj.value)}
								isMulti={true}
								// className="col-md-6"
								className="col-md-9 "
							/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-6">
							<button>Back</button>{' '}
						</div>
						<div className="col-6 me-0">
							<button>Next</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Indexationofsalary;
