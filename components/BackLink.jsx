import React from 'react';
import { useRouter } from 'next/router';
import Translation from '@/Translation';


const BackToDashboardButton = (props) => {
    const {t}=props;

    const router = useRouter();
	return (
		<button type="button" style={{ background: 'none' }} className="btn  btn-block px-0 " onClick={() => {router.push(props.path)}}>
			<span className="bg-white text-decoration-underline border-0 poppins-light-18px">{t('BACK')}</span>
		</button>
	);
};


export default React.memo(Translation(BackToDashboardButton,['BACK']));;
