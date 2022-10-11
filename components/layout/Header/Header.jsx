import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '/Services/ApiServices';
import { header } from '/Services/ApiEndPoints';
import { FaUserAlt, FaRegUserCircle } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Notification from '@/components/Notifications/organism/NotificationMain'
import Link from 'next/link';
function Header() {
	const server_url = process.env.NEXT_PUBLIC_APP_URL;
	// 	let dashboard_url = server_url.includes('test')?'https://test.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1':
	//    'http://uat.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1';
	return (
		<div className="custom-position-sticky">
			<div className="clip0" />
			<div className='container px-0'>
				{/* <div className='row'> */}
				<div className="custom-header border-bottom col-md-9 col-lg-11 m-auto border-2 pt-4 px-0">
				{/* <nav className="navbar"> */}
				{/* <div className = 'go_to_dashboard'>
	<Link href={dashboard_url}>
		<a> Back to dashboard </a>
		</Link>
	</div> */}
				<div className="pb-3 col-md-12 p-0">
					<div className="d-flex row">
						<div className="col-md-4">
							<a className="navbar-brand" href="">
								<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL}>
									<img style={{ width: '220px' }} src="/logo.svg" className="mt-2" />
								</Link>
							</a>
						</div>

						<div className="d-flex justify-content-end  col-md-8 p-0 align-items-center">
							<ul className="d-flex list-unstyled mb-0">
								<li className="list-unstyled mx-4 align-self-center d-flex purple-color2 poppins-regular-18px">
									<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL} className="">
										<a type="">DASHBOARD</a>
									</Link>
								</li>
								<li className="list-unstyled ms-4 me-3 align-self-center d-flex">
									<Notification /> {/*<img style={{ width: '25px', marginTop: '8px' }} src="/notifications.svg" /> */}
								</li>
								<li className="list-unstyled mx-4 align-self-center d-flex">
									<img style={{ width: '40px' }} src="/account.png" />
								</li>
								<li className="list-unstyled mx-4 align-self-center d-flex">
									<select
										type=""
										className="border-0 bg-white poppins-regular-18px p-1 lang-options"
									>
										<option className="lang">EN</option>
										<option className="lang">NL</option>
										<option className="lang">FR</option>
									</select>
								</li>
								<li className="list-unstyled mx-3 align-self-center d-flex poppins-regular-18px">
									<Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL} className="">
										<a type="">Logout</a>
									</Link>
								</li>
							</ul>
						</div>
						{/* <div className="col">
						<button type="button" className="btn  position-relative mt-1 p-2">
							<MdNotifications className="" />
							<span className="position-absolute  top-0 start-100 translate-middle badge border border-light rounded-circle bg-primary p-2">
								+1 <span className="visually-hidden">unread messages</span>
							</span>
						</button>
						<button type="button" className="btn  position-relative mt-2 p-2 ">
							<FaRegUserCircle className="" />
						</button>
						<select type="" className="border-0 bg-light p-1 mt-2">
							<option>EN</option>
							<option>NL</option>
							<option>FR</option>
						</select>
					</div> */}
					</div>
				{/* </div> */}

				{/* </nav> */}
			</div>
				</div>
			</div>

		</div>
	);
}

export default Header;
