import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '/Services/ApiServices';
import { header } from '/Services/ApiEndPoints';
import { FaUserAlt, FaRegUserCircle } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Link from 'next/link';
function Header() {
	const server_url = process.env.NEXT_PUBLIC_APP_URL;
	// 	let dashboard_url = server_url.includes('test')?'https://test.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1':
	//    'http://uat.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1';
	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="go_to_dashboard">
				{/* <Link href={dashboard_url}>
		<a> Back to dashboard </a>
	</Link> */}
			</div>
			<div classame="container-fluid ">
				<div className="d-flex row">
					<div className="col">
						<a className="navbar-brand" href="">
							<img src="/absoluteyou_logo.png" className="mt-2" />
						</a>
					</div>

					<div className="col">
						<button type="button" className="btn  position-relative mt-1 p-2">
							<MdNotifications className="" />
							<span className="position-absolute  top-0 start-100 translate-middle badge border border-light rounded-circle bg-primary p-2">
								+1 <span className="visually-hidden">unread messages</span>
							</span>
						</button>
						<button type="button" className="btn  position-relative mt-2 p-2 ">
							<FaRegUserCircle className="" />
						</button>
						{/* <select type="" className="border-0 bg-light p-1 mt-2">
							<option>EN</option>
							<option>NL</option>
							<option>FR</option>
						</select> */}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Header;
