import { useState } from 'react';

const Addage = () => {
	const [ showhideage, setShowhideage ] = useState(' ');

	const handleshowhide = (event) => {
		const getage = event.target.value;
		// console.log(getage);
		setShowhideage(getage);
		console.log(showhideage);
	};
	return (
		<div className="container">
			<form>
				<div className="row justify-content-end ">
					<div className="col-sm-3 col-md-6 col-lg-4  ">
						<h4 className="mt-4 mb-2">Edit age</h4>

						<div className="  col-sm-9 col-md-6 col-lg-8">
							<label>Project name</label>
							<select type="text" className="form-select mt-2 mb-2" onChange={(e) => handleshowhide(e)}>
								At which age full salary is paid?
								<option value="">Select age</option>
								<h4 className="mt-4 mb-2">Edit age</h4> <option value="1">18</option>
								<option value="2">19</option>
								<option value="3">20</option>
								<option value="4">21</option>
							</select>
						</div>
						{/* IF AGE = 18 */}
						{showhideage === '1' && (
							<div className="col-md-8 form-group">
								<label>Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 19 */}
						{showhideage === '2' && (
							<div className="col-md-8 form-group">
								<label>Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 20 */}
						{showhideage === '3' && (
							<div className="col-md-8 form-group">
								<label>Minimum salary for 19 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						{/* IF AGE = 21 */}
						{showhideage === '4' && (
							<div className="col-md-8 form-group">
								<label>Minimum salary for 20 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 19 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 18 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 17 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 16 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
								<label>Minimum salary for 15 years?</label>
								<input type="text" className="form-control mt-2 mb-2" />
							</div>
						)}
						<div>
							<button className="btn btn-secondary btn-lg btn-block float-sm-right" type="submit">
								Save
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Addage;
