import { useState } from 'react';

const SalaryBenifits = () => {
	const [ visible, setVisible ] = useState(false);

	return (
		<div className="container">
			<div className="form-check mt-4">
				<input
					className="form-check-input"
					type="checkbox"
					value=""
					id="flexCheckDefault"
					onClick={(e) => setVisible(!visible)}
				/>
				<label class="form-check-label p-1" for="flexCheckDefault">
					Salary (remuneration) - compensatory rest
				</label>
			</div>
			<div>
				{visible && (
					<div className="mt-3">
						<p>Is this mandatory?</p>
						<div className="d-flex mt-3">
							<div className="form-check  ">
								<input className="form-check-input d-flex" type="radio" value="option1" />
								<label className="form-check-label ms-1" for="exampleRadios1">
									Yes
								</label>
							</div>

							<div className="form-check">
								<input className="form-check-input ms-2" type="radio" value="option2" />
								<label className="form-check-label ms-1" for="exampleRadios2">
									No
								</label>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default SalaryBenifits;
