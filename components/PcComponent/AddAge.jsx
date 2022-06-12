import { useState, useContext } from 'react';
import { PcContext } from '../../Contexts/PcContext';


const Addage = () => {
	const [ showhideage, setShowhideage ] = useState(' ');
	const { pc_unique_key, setCurrent_sec, setSec_completed, sec_completed, setPc_unique_key } = useContext(PcContext);


	const handleshowhide = (event) => {
		const getage = event.target.value;
		// console.log(getage);
		setShowhideage(getage);
		console.log(showhideage);
	};


	let next_redirection = () =>{
		setCurrent_sec(4);
		var res1 = sec_completed;
		res1['age'] = true;
		setSec_completed(res1);
	}
	return (
		<div className="container">
			<form>
				<div className="row pt-4">
					<div className="col-md-6">
						{/* <h4 className="mt-4 mb-2">Edit age</h4> */}

						<div className="form-group">
							<label className="custom_astrick">Project name</label>
							<select type="text" className="form-select mt-2 mb-2" onChange={(e) => handleshowhide(e)}>
								At which age full salary is paid?
								<option value="">Select age</option>
								<option value="1">18</option>
								<option value="2">19</option>
								<option value="3">20</option>
								<option value="4">21</option>
							</select>
						</div>
						{/* IF AGE = 18 */}
						{showhideage === '1' && (
							<div className="form-group">
								<label className="custom_astrick">Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 19 */}
						{showhideage === '2' && (
							<div className="form-group">
								<label className="custom_astrick">Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 20 */}
						{showhideage === '3' && (
							<div className="form-group">
								<label className="custom_astrick">Minimum salary for 19 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 21 */}
						{showhideage === '4' && (
							<div className="form-group">
								<label className="custom_astrick">Minimum salary for 20 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 19 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label className="custom_astrick">Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* <div>
							<button className="btn btn-secondary btn-lg btn-block float-sm-right" type="submit">
								Save
							</button>
						</div> */}
					</div>
				</div>
				<div className="row">
				<div className="text-start col-md-6">
					<button
						type="button"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={()=>{setCurrent_sec(2)}}
					>
						Back
					</button>
				</div>
				<div className="text-end col-md-6">
					<button
						type="sumit"
						className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
						onClick={() => {
							next_redirection();
							
						}}
					>
						Next
					</button>
				</div>
			</div>
			</form>
		</div>
	);
};
export default Addage;
