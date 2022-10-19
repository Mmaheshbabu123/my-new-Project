import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '../../Services/ApiServices';
import { FaLaptopCode } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Translation from '@/Translation';
function PincodePopup(props) {
	const {t}=props;
	const [ passwordType, setPasswordType ] = useState('password');
	const [ passwordInput, setPasswordInput ] = useState('');
	const handlePasswordChange = (evnt) => {
		setPasswordInput(evnt.target.value);
	};
	const togglePassword = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
			return;
		}
		setPasswordType('password');
	};
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
							<p className="modal-title h4">{t('Start/stop by pincode')}</p>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								onClick={() => props.pincodepopupActionNo()}
							/>
						</div>

						<div className="modal-body ">
							<div className="col-sm-3   ">
								<div className="input-group mb-3">
									<input
										type={passwordType}
										onChange={handlePasswordChange}
										value={passwordInput}
										name="Enter pincode"
										className="form-control col-xs-4"
										placeholder={t("Password")}
									/>
									<button className="btn btn-outline-primary" onClick={togglePassword}>
										{passwordType === 'password' ? <AiFillEyeInvisible /> : <AiFillEye />}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default React.memo(Translation(PincodePopup,['Start/stop by pincode',"Password"]));
