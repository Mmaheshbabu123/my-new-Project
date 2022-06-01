import React from 'react';

function Popup(props) {
	return (
		<div className="modal" id="myModal" style={{ display: 'block' }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">Delete function</h4>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							onClick={() => props.popupActionNo()}
						/>
					</div>

					<div className="modal-body title">
						<h4>Are you sure you want to delete this function</h4>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn btn-danger" onClick={() => props.popupActionNo()}>
							No
						</button>
						<button className="btn btn-danger m-2" onClick={() => props.popupActionYes()}>
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popup;
