import React, { useState, useEffect } from 'react';
import CheckBoxField from '@/atoms/CheckBoxField';
import { useRouter } from 'next/router';
import { v1DocumentPreview, saveV1Document, getEmployerIdByCompanyId } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import styles from './V1Document.module.css';
import customAlert from '@/atoms/customAlert';
import PopUp from '../../TimeRegistration/PopUpWerkpostfishe';

const V1DocumentPreview = ({ employeeId, companyId, preview = 0, to: locationId = '' }) => {
	const router = useRouter();
	const [ show, setShow ] = useState(false);
	const [ popupdata, setPopUpData ] = useState('');
	const [ state, setState ] = useState({
		employerId: 0,
		approved: 0,
		alertSuccess: false,
		iframeUrl: '',
		loaded: false
	});

	useEffect(() => {
		getEmployerId();
		document.querySelectorAll('.clip0,.clip1').forEach((el) => (el.style['display'] = 'none'));
	}, []);

	// OPEN/CLOSE POPUP //
	const actionPopup = () => {
		setShow(!show);
	};

	const getEmployerId = async () => {
		await APICALL.service(getEmployerIdByCompanyId + '/' + companyId, 'GET').then((response) => {
			if (response.status === 200) {
				let employerId = response.data || 0;
				setState({
					...state,
					employerId,
					loaded: true,
					iframeUrl: `${v1DocumentPreview}/${employeeId}/${companyId}?employer_id=${employerId}&approved=${0}&preview=${preview}`
				});
			}
		});
	};

	/**
   * [handleCheckbox description]
   * @param  {int} target               [description]
   * @return {void}        [description]
   */
	const handleCheckbox = ({ target: { checked } }) => {
		let approved = checked ? 1 : 0;
		setState({
			...state,
			approved: approved,
			iframeUrl: `${v1DocumentPreview}/${employeeId}/${companyId}?employer_id=${state.employerId}&approved=${approved}&preview=${preview}`
		});
	};
	/**
  * [forwardToApproveProcess description]
  * @return {Promise} [description]
  */
	const forwardToApproveProcess = async (from = 0, setObj = {}) => {
		await APICALL.service(saveV1Document, 'POST', getData())
			.then((response) => {
				if (response.status === 200) {
					checkSignStatusAndApprove(response.data);
					if (locationId != '') {
						locationId == 0
							? setTimeout(() => router.push('/pincode/options'), 2700)
							: APICALL.service(
									process.env.NEXT_PUBLIC_APP_BACKEND_URL +
										'/api/check-signed-or-not-wpf?id=' +
										contextState.uid +
										'&company=' +
										companyId +
										'&location=' +
										locationId,
									'GET'
								)
									.then((result) => {
										if (result.res == 999) {
											router.push('/pincode/options');
										} else {
											setPopUpData(result.res);
										}
									})
									.catch((error) => {
										console.error(error);
									});
					}
				} else {
					customAlert('error', 'Error while approving document', 2000);
				}
			})
			.catch((error) => {
				customAlert('error', 'Error while approving document', 2000);
				console.log(error);
			});
	};

	const getData = () => {
		return {
			employeeId,
			companyId,
			employer_id: state.employerId,
			approved: state.approved
		};
	};

	const checkSignStatusAndApprove = (data) => {
		if (data.completed === 1) {
			customAlert('success', 'Approved successfully!', 2500);
		} else {
			let message = '';
			if (!data.employerSignStatus && !data.employeeSignStatus) {
				message = `<span> i. Employer signature has not been added yet, please contact the employer </span> <br >
       <span> ii. You haven't added any signature yet, please add it. <span>`;
			} else if (!data.employerSignStatus) {
				message = `Employer signature has not been added yet, please contact the employer.`;
			} else if (!data.employeeSignStatus) {
				message = `You haven't added any signature yet, please add it.`;
			}
			customAlert('error', message, 3000);
		}
	};

	return (
		<div className="">
			{popupdata != '' && <PopUp display={'block'} popupAction={actionPopup} data={result.res} />}
			{state.loaded === true && (
				<div>
					<iframe src={state.iframeUrl} height={screen.height - 400} width={screen.width - 175} />
				</div>
			)}
			{!preview && (
				<div className={`${styles['term_and_conditions_class']} row`}>
					<CheckBoxField
						id={'approved_check'}
						tick={state.approved}
						onCheck={handleCheckbox}
						name={`I hereby declare that I have reviewed the document and confirming that I agree with all details.`}
						customStyle={{ margin: '2px 0', cursor: 'pointer' }}
						className="col-md-9 py-3"
					/>
					{state.approved === 1 && (
						<div className="col-md-2 text-end">
							<button onClick={forwardToApproveProcess} type="button" className="btn btn-dark pcp_btn">
								{' '}
								Approve{' '}
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default React.memo(V1DocumentPreview);
