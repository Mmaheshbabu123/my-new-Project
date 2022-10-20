import React from "react";
import Translation from "@/Translation";
function SalaryIndexationDeletePopup(props) {
	const {t} =props;
	return (
		<div className="modal" id="myModal" style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title bitter-italic-normal-medium-22">{t('Delete Indexation of salary')}</h4>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							onClick={() => props.popupActionNo()}
						/>
					</div>

					<div className="modal-body title">
						<p className='my-1 poppins-regular-18px'>{t('Are you sure you want to delete this salary indexation?')}</p> 
					</div>

					<div className="modal-footer">
						<button type="button" className="btn poppins-medium-18px-next-button rounded-0 shadow-none" style={{ width: '80px' }} onClick={() => props.popupActionNo()}>
							{t('No')}
						</button>
						<button className="btn poppins-medium-18px-next-button rounded-0 shadow-none m-2" style={{ width: '80px' }} 
						onClick={() => props.popupActionYes()}
						>
							{t('Yes')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default  React.memo(Translation(SalaryIndexationDeletePopup,['Delete Indexation of salary','Are you sure you want to delete this salary indexation?','No','Yes']));
