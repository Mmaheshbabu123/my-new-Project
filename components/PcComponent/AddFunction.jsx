import React from 'react';

function AddFunction() {
	return (
		<form className="Search__form">
			<div className="mt-2 form-group  ">
				<label className="">
					{' '}
					Function name
					<input type="text" className=" form-control mt-2 col-md-4" />
					<p style={{ color: 'red' }}>Required</p>
				</label>
			</div>

			<div className="form-group">
				<label className="mt-2 mb-1  ">Category</label>
				{/* <select style={{width: '240px'}} className="form-select  mt-2 ">
         <option value="select" selected="selected">select</option> */}
				{/* </select> */}
			</div>

			<div className="form-group">
				<label className="mt-2 mb-2">
					Minimum salary
					<input className=" form-control mt-2" type="text" />
					<p style={{ color: 'red' }}>Required</p>
				</label>
			</div>

			<div>
				<button className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn">
					Save
				</button>
			</div>
		</form>
	);
}

export default AddFunction;
