import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Translation from '@/Translation';
function PrivacyPolicy(props) {
	const { t } =props;
	return (
		<div className="container">
			<h2 className="text-center h1">{t('Privacy and Policy')}</h2>
			<p className="text-center" />
		</div>
	);
}
export default React.memo(Translation(PrivacyPolicy,[]));
