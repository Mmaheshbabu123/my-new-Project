import React from 'react';

function Popup(props) {
	return (
		<div className="modal" id="myModal" style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						{/* <h4 className="modal-title">Delete function</h4> */}
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							onClick={() => props.popupActionDeleteNo()}
						/>
					</div>

					<div className="modal-body title poppins-light-18px">
						<p className="my-1">{props.body}</p>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn poppins-medium-18px-next-button rounded-0 shadow-none" onClick={() => props.popupActionDeleteNo()} style={{ width: '80px' }}>
							No
						</button>
						<button className="btn poppins-medium-18px-next-button rounded-0 shadow-none m-2" onClick={() => props.popupActionDeleteYes()} style={{ width: '80px' }}>
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popup;
