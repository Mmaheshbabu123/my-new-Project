import React, { Component, useState } from 'react';
import { Timeregistration } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
import { MdQrCode } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';

function TimeRegistration(props) {
	return (
		<div className="container   ">
			<form className="">
				<div className="row d-flex text-center  align-items-center vh-100   ">
					<div className="">
						<p className="h2">Time Registration</p>
					</div>
					<div className=" col ">
						<span className="text-center  ">
							<MdQrCode className="w-25 h-20 m-auto  " />
						</span>
						<p className="h3 mt-3">QR code</p>
					</div>
					<div className="col ">
						<FaLaptopCode className="w-25 h-20 m-auto " />
						<p className="h3 mt-3">Pin code</p>
					</div>
					<div className="col">
						<BsPersonFill className="w-25 h-20 m-auto" />
						<p className="h3  mt-3">Pin code</p>
					</div>
				</div>
			</form>
		</div>
	);
}
export default TimeRegistration;
