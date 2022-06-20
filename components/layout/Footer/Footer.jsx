import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { APICALL } from '/Services/ApiServices';
import { footer } from '/Services/ApiEndPoints';
import { BiCopyright } from 'react-icons/bi';
import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
function Footer() {
	return (
		<div className="app-container">
			<div className="row mt-2 border-top border-bottom  border-secondary ">
				<div className="col mt-2 p-3">
					<span className="mt-2">copyright © 2021 Absolute YOU</span>
				</div>
				<div className="col mt-2 p-3">
					<a href="" className="">
						Contact us
					</a>
					<a href="" className="p-2 ">
						Privacy policy
					</a>
					<a href="" className="p-2 ">
						Disclaimer
					</a>
				</div>

				<div className="col text-end mt-2 p-3">
					<select type="">
						<option>Select</option>
						<option>EN</option>
						<option>NL</option>
						<option>FR</option>
					</select>
					<div className="d-flex float-end ">
						<FaFacebookSquare />
						<FaLinkedin />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Footer;
