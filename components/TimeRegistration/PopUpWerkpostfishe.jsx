import React, { useState } from 'react';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { APICALL } from '../../Services/ApiServices';
import ValidationService from '@/Services/ValidationService';
import DatePicker from 'react-multi-date-picker';
import { useRouter } from 'next/router';
import { da } from 'date-fns/locale';

function popUpWerkPostFiche(props) {
	
	const save = () => {
		let data = props.data;
		let destination = btoa(process.env.NEXT_PUBLIC_APP_URL+'/pincode/options');
		window.open(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL+'/werkpostfichespdf/form/werkpostfiche_preview/' +
				data[0].webformid +
				'/' +
				data[0].submitid +
				'/' +
				data[0].id +
				'/' +
				data[0].employer_id +
				'?type=employee' +
				'&destination_url=' + destination,
				'_blank'
		);
	};

	return (
		<form>
			<div
				className="modal"
				id="myModal"
				tabIndex="-1"
				style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
			>
				<div className="modal-dialog modal-lg modal-dialog-centered ">
					<div className="modal-content">
						<div className="modal-header col-md-11 m-auto px-0">
							<div className="col-md-10" />
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								onClick={() => props.popupAction()}
							/>
						</div>
						<div className="modal-body ">
							<div className="col-md-11 m-auto add_project">
								<div className="row">
									<div className="px-1">
										<div className="h4">
											We notice you have a werkpostfiche which is not signed.
										</div>
										<div className="h4">To start your work please sign the werkpostfiche.</div>
									</div>
									<div className="modal-footer border-0 col-md-2 m-auto add_project">
										<button
											type="button"
											className="btn poppins-medium-18px-next-button float-right px-3 rounded-0 shadow-none"
											onClick={() => save()}
										>
											Sign
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
export default popUpWerkPostFiche;
