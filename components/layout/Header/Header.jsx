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
		<div className='custom-position-sticky'>
		<div className="clip0"></div>
		<div className='custom-header  col-md-10 m-auto border-bottom border-2 py-2'>
		
		{/* <nav className="navbar"> */}
		{/* <div className = 'go_to_dashboard'>
	<Link href={dashboard_url}>
		<a> Back to dashboard </a>
		</Link>
	</div> */} 
			<div className="container-fluid  col-md-12 p-0">
				<div className="d-flex row">

					<div className="col-md-4">
						<a className="navbar-brand" href="">
							<img style={{width: '250px'}} src="/logo.svg" className="mt-2" />
						</a>
					</div>

					<div className="d-flex justify-content-end  col-md-8 p-0">
                <ul className="d-flex list-unstyled mb-0">
				<li className='list-unstyled mx-3 align-self-center d-flex mt-2 purple-color2'>DASHBOARD</li>
                    <li className='list-unstyled mx-3 align-self-center d-flex'><img style={{width: '25px', marginTop: '8px'}} src="/notifications.svg"/></li>
                    <li className='list-unstyled mx-3 align-self-center d-flex'><img style={{width: '40px', marginTop: '7px'}} src="/account.png"/></li>
                    <li className='list-unstyled mx-3 align-self-center d-flex'><select type="" className="border-0 bg-white poppins-regular-16px p-1 mt-1 lang-options">
							<option className='lang'>EN</option>
							<option className='lang'>NL</option>
							<option className='lang'>FR</option>
						</select></li>
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
			</div>
			
		{/* </nav> */}
		
		</div>
		</div>
	);
}

export default Header;
