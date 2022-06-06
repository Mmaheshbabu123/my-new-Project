import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

const EmployeeType = () => {
	const [ visible, setVisible ] = useState(false);

	const [ worker, setWorker ] = useState();
	const [ workerErr, setWorkerErr ] = useState(false);

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-sm-5 form-group bg-light mt-4">
					<input type="checkbox" className="" value="1" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4"> Worker</label>
					{visible && <input type="text" className="form-control col-sm-2 mb-2" placeholder="Worker name" />}
				</div>

				<div className="col-sm-5 form-group bg-light mt-4  ms-4">
					<input type="checkbox" className="" value="2" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4"> Seasonal worker</label>
					{visible && (
						<input type="text" className="form-control col-sm-2 mb-2" placeholder="Seasonal worker name" />
					)}
				</div>

				<div className="col-sm-5 form-group bg-light mt-4">
					<input type="checkbox" className="" value="3" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4"> Occasional worker catering (extra)</label>
					{visible && (
						<input
							type="text"
							className="form-control col-sm-2 mb-2"
							placeholder="Occasional worker catering"
						/>
					)}
				</div>

				<div className="col-sm-5 form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="4" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4 ">Working student worker (we don't use)</label>
					{visible && (
						<input
							type="text"
							className="form-control col-sm-2 mb-2"
							placeholder="Occasional worker catering"
						/>
					)}
				</div>

				<div className="col-sm-5 form-group bg-light mt-4 ">
					<input type="checkbox" className="" value="5" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4 ">Clerk Job student</label>
					{visible && (
						<input
							type="text"
							className="form-control col-sm-2 mb-2"
							placeholder="Occasional worker catering"
						/>
					)}
				</div>

				<div className="col-sm-5 form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="6" onClick={(e) => setVisible(!visible)} />
					<label className="p-3 ms-2 md-4 ">Flexijob Clerk</label>
					{visible && (
						<input
							type="text"
							className="form-control col-sm-2 mb-2"
							placeholder="Occasional worker catering"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default EmployeeType;
