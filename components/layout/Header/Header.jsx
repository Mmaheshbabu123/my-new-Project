import React, { useState, useEffect, useContext } from 'react';
import { APICALL } from '/Services/ApiServices';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { userService } from '@/Services/UserServices';
import Notification from '@/components/Notifications/organism/NotificationMain'
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Translation from '../../../Translation/Translation';
import Translation from '@/Translation';
function Header(props) {
	let router = useRouter();
	const { contextState: { isAuthenticated = 0, uid, roleType = 1 }, updateUserContext } = useContext(UserAuthContext);
	const { t } = props;
	const [state, setState] = useState({
		languages: [{code: 0, language: 'Select'}],
		lang: '',
		isAuthenticated: 0,
		profile: '',
	});

	// due to next.js hydration error, we added new state and new effect, dont merge this with above state and effect
	const [authenticated, setAuthentication] = useState(0);
	useEffect(() => setAuthentication(isAuthenticated))
	//------------------------------------------------------------//

	useEffect(() => {
		if(isAuthenticated) {
			async function fetchLanguages() {
				let url = process.env.NEXT_PUBLIC_APP_URL_DRUPAL + '/api/get_languages?entityid=' + uid;
				let setObj = {...state};
				setObj['isAuthenticated'] = isAuthenticated;
				await APICALL.service(url, 'GET').then((result) => {
					if (result && result['status'] == 200) {
						localStorage.setItem('lang', localStorage['lang'] !== undefined ? localStorage['lang'] : 'en');
						setObj['languages'] = result['data'];
						setObj['profile'] = result['userData'] ? result['userData']['profile_path'] : '';
						setObj['lang'] = localStorage['lang'] !== undefined ? localStorage['lang'] : 'en';

						updateUserContext({openTodosCount: result['userData'] ? result['userData']['openTodosCount'] : 0})
					} else { console.log('error while fetching header data') }
				}).catch(error => console.error(error))
				setState(setObj);
			}
			fetchLanguages();
		}
	}, [isAuthenticated]);

	const handleLangChange = (e) => {
		localStorage.setItem('lang', e.target.value);
		router.reload();
	}

	const handleLogout = () => {
		userService.userLogout(uid);
	}

	return (
		<div className="custom-position-sticky ">
			<div className="clip0 d-none d-md-block d-lg-block" />
			<div className='container'>
				<div className="custom-header border-bottom col-md-9 col-lg-11 m-auto border-2 custom-position-sticky px-0 border-hide" style={{paddingTop:'0.65rem'}}>
					<nav className="navbar navbar-expand-lg navbar-light" style={{paddingTop:'0.65rem'}}>
						<div className="container-fluid px-0 header-bar">
						<div className='border-bottom-mobile'>
						<button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<Link href={'/'}>
								<img style={{ width: '220px' }} src="/logo.svg" className="mt-2 navbar-brand" />
							</Link>
						</div>

								<div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">
								{authenticated === 1 && <ul className="d-flex list-unstyled mb-0 menu-links">
										<li className="list-unstyled px-3 align-self-center d-flex purple-color2 poppins-regular-18px">
											<Link href={'/'} className="">
												<a type="">{t('DASHBOARD')}</a>
											</Link>
										</li>
										<li className="list-unstyled px-3 align-self-center d-flex">
											<Notification /> {/*<img style={{ width: '25px', marginTop: '8px' }} src="/notifications.svg" /> */}
										</li>
										<li className="list-unstyled px-3 align-self-center d-flex">
											<a href={`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/${roleType === 3 ? 'employee_flow/form/profile' : 'profile'}`}> <img className='my-profile-icon' src={state.profile || "/Profile.svg"} /> </a>
										</li>
										<li className="list-unstyled px-3 align-self-center d-flex">
											<select
													id="lang-select"
												className="border-0 cursor-pointer bg-white poppins-regular-18px p-1 lang-options"
												value={state['lang']}
												onChange={handleLangChange}
											>
												{state.languages.map((lang, index) => <option className="lang" value={lang.code} key={index} >{lang.code!=''?lang.code.toUpperCase():lang.code} </option>)}
											</select>
										</li>
										<li className="list-unstyled ps-3 align-self-center d-flex poppins-regular-18px">
											<a onClick={handleLogout} className="cursor-pointer poppins-regular-18px">
												{t('Logout')}
											</a>
										</li>
								</ul>}
				
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Translation(Header,['DASHBOARD','Logout']));
