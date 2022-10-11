import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '/Services/ApiServices';
import { footer } from '/Services/ApiEndPoints';
import { BiCopyright } from 'react-icons/bi';
import { FaFacebookSquare, FaLinkedin, FaRegUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { TiSocialFacebookCircular, TiSocialLinkedinCircular } from 'react-icons/ti';

function Footer() {
	return (
		// <div className="app-container">
		// 	<div className="row mt-2 border-top border-secondary ">
		// 		<div className="col mt-2 p-3">
		// 			<span className="mt-2">copyright © 2021 Absolute YOU</span>
		// 		</div>
		// 		<div className="col mt-2 p-1">
		// 			<a href="" className="">
		// 				Contact us
		// 			</a>
		// 			<button className=" btn ">
		// 				{/* <Link href={'/privacy-policy'}> */}
		// 				{/* <p className="p-2">Privacy policy</p> */}
		// 				{/* </Link> */}Privacy policy
		// 			</button>
		// 			<a href="" className=" ">
		// 				Disclaimer
		// 			</a>
		// 		</div>

		// 		<div className="col  p-1 mt-3 ">
		// 			<div className="d-flex float-end ms-2">
		// 				<FaFacebookSquare className="" />
		// 				<FaLinkedin className="" />
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className='footer  footer-bg-color  text-white py-3 position-relative '>
		<div className='container'>
		<div className='row'>
			<div className='col-md-9 col-lg-11 m-auto'>
			<div className='row'>
			<div className='col-md-3 px-0'>
				<p className='text-white text-left mb-0 pt-2 footer-content'>Copyright © 2022 Absolute YOU</p>
				</div>
			<div className='col-md-6 d-flex justify-content-center'>
			<ul className='text-white d-flex list-unstyled mb-0'>
				<li className='list-unstyled mx-3 align-self-center footer-content'>Contact Us</li>
				<li className='list-unstyled mx-3 align-self-center footer-content'>Privacy Policy</li>
				<li className='list-unstyled mx-3 align-self-center footer-content'>Disclaimer</li>
			</ul>
			</div>
			<div className="col-md-3 d-flex justify-content-end px-0">
				<ul className='d-flex list-unstyled mb-0'>
				<li className='list-unstyled mx-3 align-self-center'><img className='rounded-circle' style={{width: '30px'}} src="/facebook.png"/></li>
				<li className='list-unstyled  mr-5 align-self-center'><img className='rounded-circle' style={{width: '30px'}} src="/linkedin.png"/></li>
				</ul>
			</div>
			</div>
			<div className="clip1 d-none d-md-block d-lg-block"></div>
			</div>
			</div>
		</div>
        
       </div>
	);
}
export default Footer;
