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
		<div className="app-container">
			<div className="row mt-2 border-top border-secondary ">
				<div className="col mt-2 p-3">
					<span className="mt-2">copyright © 2021 Absolute YOU</span>
				</div>
				<div className="col mt-2 p-1">
					<a href="" className="">
						Contact us
					</a>
					<button className=" btn ">
						{/* <Link href={'/privacy-policy'}> */}
						{/* <p className="p-2">Privacy policy</p> */}
						{/* </Link> */}Privacy policy
					</button>
					<a href="" className=" ">
						Disclaimer
					</a>
				</div>

				<div className="col  p-1 mt-3 ">
					<div className="d-flex float-end ms-2">
						<FaFacebookSquare className="" />
						<FaLinkedin className="" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Footer;
