import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { MdQrCode } from 'react-icons/md';

function QRCode(props) {
	return (
		<div>
			<div
				className="modal"
				id="myModal"
				tabIndex="-1"
				style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
			>
				<div className="modal-dialog modal-lg ">
					<div className="modal-content  ">
						<div className="modal-header">
							<p className="modal-title h4">Start/stop by QRcode</p>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								onClick={() => props.popupActionNo()}
							/>
						</div>

						<div className="modal-body ">
							<MdQrCode className="w-50 h-auto m-auto text-center  " />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default QRCode;
