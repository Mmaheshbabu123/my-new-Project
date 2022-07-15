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
		<div className='footer col-md-12 d-flex bg-secondary text-white py-4'>
        <div className='col-md-3'>
          <p className='text-white text-center mb-0 pt-2'>Copyright © 2022 Absolute YOU</p>
        </div>
        <div className='col-md-6 d-flex justify-content-center'>
           <ul className='text-white d-flex list-unstyled mb-0'>
               <li className='list-unstyled mx-3 align-self-center'>Contact Us</li>
               <li className='list-unstyled mx-3 align-self-center'>Privacy Policy</li>
               <li className='list-unstyled mx-3 align-self-center'>Disclaimer</li>
           </ul>
        </div>
        <div class="col-md-3 d-flex justify-content-center">
           <ul className='d-flex list-unstyled mb-0'>
           <li className='list-unstyled mx-2 align-self-center'><img className='rounded-circle' style={{width: '30px'}} src="/facebook.png"/></li>
           <li className='list-unstyled mx-2 mr-5 align-self-center'><img className='rounded-circle' style={{width: '30px'}} src="/linkedin.png"/></li>
           </ul>
        </div>
		<div class="clip1"></div>
        
   </div>
	);
}
export default Footer;
