import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

const Editemployee = () => {
	// const [ visible, setVisible ] = useState(false);

	// const [ worker, setWorker ] = useState();
	// const [ workerErr, setWorkerErr ] = useState(false);

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-sm-5 d-flex form-group bg-light mt-4">
					<input type="checkbox" className="" value="1" />
					<label className="p-3 ms-2 md-4"> Worker</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4  ms-4">
					<input type="checkbox" className="" value="2" />
					<label className="p-3 ms-2 md-4"> Seasonal worker</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4">
					<input type="checkbox" className="" value="3" />
					<label className="p-3 ms-2 md-4"> Occasional worker catering (extra)</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="4" />
					<label className="p-3 ms-2 md-4 ">Working student worker (we don't use)</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4 ">
					<input type="checkbox" className="" value="5" />
					<label className="p-3 ms-2 md-4 ">Clerk Job student</label>
				</div>

				<div className="col-sm-5 d-flex form-group bg-light mt-4 ms-4">
					<input type="checkbox" className="" value="6" />
					<label className="p-3 ms-2 md-4 ">Flexijob Clerk</label>
				</div>
			</div>
		</div>
	);
};
export default Editemployee;
