import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '/Services/ApiServices';
import { footer } from '/Services/ApiEndPoints';
import { BiCopyright } from 'react-icons/bi';
// import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

import { TiSocialFacebookCircular, TiSocialLinkedinCircular } from 'react-icons/ti';
function Footer() {
	return (
		<div className="app-container">
			<div className="row mt-2 border-top border-secondary ">
				<div className="col mt-2 p-3">
					<span className="mt-2">copyright © 2021 Absolute YOU</span>
				</div>
				<div className="col mt-2 p-3">
					<a href="" className="">
						Contact us
					</a>
					<button className=" btn btn-link">
						{/* <Link href={'/privacy-policy'}> */}
						<p className="p-2">Privacy policy</p>
						{/* </Link> */}
					</button>
					<a href="" className="p-2 ">
						Disclaimer
					</a>
				</div>

				<div className="col text-end mt-2 p-3">
					<div className="d-flex float-end w-25 h-100 ">
						<span className="">
							<TiSocialFacebookCircular className="" />
						</span>
						<TiSocialLinkedinCircular className="" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Footer;
