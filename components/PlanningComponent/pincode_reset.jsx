import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Resetpin } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Translation from '@/Translation';
function ResetPincode(props) {
	const {t}=props;
	const [ visible, setVisible ] = useState(false);
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
	// function getData(e) {
	// 	setData(e.target.value);
	// }

	return (
		<div className="container">
			<div className="row justify-content-center">
				<p className="h2 text-center p-2 mt-5">{t('Reset pincode')}</p>

				<p className="h5 text-center p-2">{t('Enter your current pincode')}</p>

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
					{visible && (
						<div>
							<p className="h5 text-center p-2">{t('Enter new pincode')}</p>
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
							<p className="h5 text-center p-2">{t('Confirm pincode')}</p>
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
					)}
					<div className="col">
						<table className="table">
							<tbody>
								<tr>
									<td>
										<button className="btn btn-outline-dark" value="1">
											1
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="2">
											2
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="3">
											3
										</button>
									</td>
								</tr>
								<tr>
									<td>
										<button className="btn btn-outline-dark" value="4">
											4
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="5">
											5
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="6">
											6
										</button>
									</td>
								</tr>
								<tr>
									<td>
										<button className="btn btn-outline-dark" value="7">
											7
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="8">
											8
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark" value="9">
											9
										</button>
									</td>
								</tr>
								<tr>
									<td>
										<button
											className="btn btn-outline-dark p-2 m-auto"
											value="0"
											onClick={() => setVisible(false)}
										>
											<ImCross className="" />
										</button>
									</td>
									<td>
										<button className="btn btn-outline-dark">0</button>
									</td>
									<td>
										<button
											className="btn btn-outline-dark p-2"
											value="1"
											onClick={() => setVisible(true)}
										>
											<BsCheck2 className="" />
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
export default React.memo(Translation(ResetPincode,['Reset pincode','Enter your current pincode',"Password",'Enter new pincode','Confirm pincode']));
