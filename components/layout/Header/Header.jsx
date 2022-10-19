import React, { useState, useEffect, useContext } from 'react';
import { APICALL } from '/Services/ApiServices';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import { userService } from '@/Services/UserServices';
import Notification from '@/components/Notifications/organism/NotificationMain'
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Translation from '../../../Translation/Translation';

function Header() {
	let router = useRouter();
	const { contextState: { isAuthenticated = 0, uid } } = useContext(UserAuthContext);

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
		userService.userLogout();
	}

	return (
		<div className="custom-position-sticky ">
			<div className="clip0 d-none d-md-block d-lg-block" />
			<div className='container px-0'>
				<div className="custom-header border-bottom col-md-9 col-lg-11 m-auto border-2 custom-position-sticky px-0 pt-3">
					<div className="pb-3 col-md-12 p-0">
						<div className="d-flex row">
							<div className="col-md-4">
								<a className="navbar-brand d-flex" href="">
									<Link href={'/'}>
										<img style={{ width: '220px' }} src="/logo.svg" className="mt-2" />
									</Link>
								</a>
							</div>
							<div className="d-flex justify-content-end  col-md-8 p-0 align-items-center">
								{authenticated === 1 && <ul className="d-flex list-unstyled mb-0">
									<li className="list-unstyled mx-4 align-self-center d-flex purple-color2 poppins-regular-18px">
										<Link href={'/'} className="">
											<a type="">DASHBOARD</a>
										</Link>
									</li>
									<li className="list-unstyled ms-4 me-3 align-self-center d-flex">
										<Notification /> {/*<img style={{ width: '25px', marginTop: '8px' }} src="/notifications.svg" /> */}
									</li>
									<li className="list-unstyled mx-4 align-self-center d-flex">
										<a href={`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}user/${uid}/edit`}> <img style={{ width: '40px' }} src={state.profile || "/account.png"} /> </a>
									</li>
									<li className="list-unstyled mx-4 align-self-center d-flex">
										<select
											className="border-0 cursor-pointer bg-white poppins-regular-18px p-1 lang-options"
											value={state['lang']}
											onChange={handleLangChange}
										>
											{state.languages.map((lang, index) => <option className="lang" value={lang.code} key={index} > {lang.language} </option>)}
										</select>
									</li>
									<li className="list-unstyled mx-3 align-self-center d-flex poppins-regular-18px">
										<a onClick={handleLogout} className="cursor-pointer">
											Logout
										</a>
									</li>
								</ul>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
