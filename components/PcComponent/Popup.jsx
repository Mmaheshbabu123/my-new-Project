import React from 'react';
import Translation from '@/Translation';
function Popup(props) {
	const {t} =props;
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
							onClick={() => props.popupActionNo()}
						/>
					</div>

					<div className="modal-body title poppins-light-18px">
						<h4>{t('Are you sure you want to delete this paritair committe?')}</h4>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn poppins-medium-18px-next-button rounded-0 shadow-none" onClick={() => props.popupActionNo()} style={{ width: '80px' }}>
							{t('No')}
						</button>
						<button className="btn poppins-medium-18px-next-button rounded-0 shadow-none m-2" onClick={() => props.popupActionYes()} style={{ width: '80px' }}>
							{t('Yes')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Translation(Popup,['Are you sure you want to delete this paritair committe?','No','Yes']));