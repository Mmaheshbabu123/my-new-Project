import React from 'react';
import { APICALL } from '../../Services/ApiServices';
import Link from 'next/link';
import { Uniquekey } from '../../Services/GenetateUniqueKey';
import styles from '../../styles/Planning.module.css'
// import styles1 from '../../styles/fonts/OFL.txt'
import Translation from '@/Translation';
function Add_manage_planning(props) {
	const {t}=props;
	const unique_key = Uniquekey.generate_unique_key();
	let backToDashboard = () => {
		window.location.assign(
			process.env.NEXT_PUBLIC_APP_URL_DRUPAL + 'dashboard?access=employeer&check_logged_in=1'
		);
	};
	return (
		<div className="col-md-12">
			{/* <div className="row mt-5 text-center planning-height "> */}
			<div className='col-md-12 py-4 position-sticky-pc'>
					<h1 className="font-weight-bold bitter-italic-normal-medium-24">{t('My Planning')}</h1>
					</div>
			<div className={`${styles.planningheight} popup-btn col-md-12 row align-items-center justify-content-center m-0`}>
				<div className='row'>
					<div className='col-md-8 m-auto text-center'>
						<div className='row'>
						{/* <div className="col-md-6 d-flex justify-content-end px-5"> */}
						<div className="col-md-6 my-1"> 
				<Link href={'/planning/add/' + unique_key}>
					<button style={{background: '#4C4D550F', width: '200px', height: '200px'}} type="button " className="btn-lg border-0 rounded-0">
						
						<div ><img style={{width: '100px'}} src="/addplanning.png" className="mt-2 mb-3" />
						
							<p className= {`${styles.poppinsregular20px} `}>{t('Add planning')}</p>
						</div>
					</button>
					</Link>
				</div>
				{/* <div className="col-md-6 d-flex justify-content-start px-5"> */}
				<div className="col-md-6 my-1">
				<Link href={'/manage-planning/weekly'}>
					<button style={{background: '#4C4D550F', width: '200px', height: '200px'}} type="button" className="btn-lg border-0">
					<div><img style={{width: '100px'}} src="/manageplanning.png" className="mt-2 mb-3" />
							<p className= {`${styles.poppinsregular20px} `}> {t('Manage planning')}</p>
						
						</div>
					</button>
					</Link>
				</div>
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<button type="button" style={{background: 'none'}} className="btn  btn-block px-0 " onClick={() => backToDashboard()}>
					{/* <span className='bg-white  back-btn-text  back-btn-text  border-0 poppins-regular-18px'>BACK</span> */}
					<span className='bg-white text-decoration-underline border-0 poppins-light-18px'>{t('BACK')}</span>
				</button>
			</div>
		</div>
	);
}
export default React.memo(Translation(Add_manage_planning,['My Planning','Add planning','Manage planning','BACK']));
