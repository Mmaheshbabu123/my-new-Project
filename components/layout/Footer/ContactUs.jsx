import { Line } from "node_modules/react-bootstrap-icons/dist/index";
import React from "react";
import Link from 'node_modules/next/link';
import { CgPhone } from 'react-icons/cg'
import { SlLocationPin } from 'react-icons/sl';
import { GoMail } from 'react-icons/go';
import { BsFacebook } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';
import { TiSocialLinkedinCircular } from 'react-icons/ti'
function ContactUs() {
    return (
        <div className="container-fluid p-0">
            <form>
                <div className="row py-4 ">
                    <div className="col-md-12 text-center">
                        <p className="px-0  h1 fw-bold" style={{ color: '#8a69d4' }}>Contact us</p>
                        <p className="m-1">Do you have any questions or comments? feel free to contact us.</p>
                        <p className="m-1">Absolute YOU will answer you as soon as possible.</p>
                    </div>
                </div>
                <div className="bg-light ">
                    <div className="row  ">
                        <div className="col m-3">
                            <label className="custom_astrick m-2  ">Family name</label>
                            <input type="text" className="form-control m-1 rounded-0" />
                        </div>
                        <div className="col m-3">
                            <label className="custom_astrick m-2">First Name</label>
                            <input type="text" className="form-control m-1 rounded-0" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m-3 ">
                            <label className="custom_astrick m-2">e-mail</label>
                            <input type="text" className="form-control rounded-0" />
                        </div>
                        <div className="col m-3">
                            <label className="m-2">phone</label>
                            <input type="text" className="form-control rounded-0" />
                        </div>
                    </div>
                    <div className="row  ">
                        <div className="col m-3">
                            <label className="m-2">message</label>s
                            <textarea type="text" className="form-control rounded-0" />
                        </div>
                    </div>
                    <div className="p-2 m-3">
                        <button
                            type="submit"
                            className="btn rounded-0 px-5 poppins-medium-18px-next-button shadow-none"
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="border border-4 w-75 mt-5 border-light">

                    <p className="px-0 h3 fw-bold m-1" style={{ color: '#8a69d4' }}>
                        more than online scheduling
                    </p>
                    <div className="w-50 ms-2 p-1">
                        <p className="">In addition to the online planning of your employees,
                            we also provide advice and guidance for your project.
                            You can also count on Absolute YOU when looking for good workers.</p>

                        <p className="text-center">
                            <Link href=''>
                                <a style={{ color: '#8a69d4' }}>Contact me</a>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="text-center m-3 p-3">
                    <p className="h1" style={{ color: '#8a69d4' }}>Absolute YOU</p>
                    <p><SlLocationPin className="m-3 "style={{ color: '#8a69d4' }}/>Onledebeekstraat 15 I B-8800 Roeselare</p>
                    <p><CgPhone className="m-3" style={{ color: '#8a69d4' }}/><Link href=''>051 40 31 50</Link></p>
                    <p><GoMail className="m-3" style={{ color: '#8a69d4' }}/><Link href=''>payroll@absoluteyou.be</Link></p>
                </div>
                <div className="text-center">
                    <BsFacebook className="m-3 display-6" style={{ color: '#8a69d4' }}/>
                    <FaInstagramSquare className="m-3 display-6" style={{ color: '#8a69d4' }}/>
                    <TiSocialLinkedinCircular className="m-3 display-6" style={{ color: '#8a69d4' }} />
                </div>
            </form>
        </div>

    );
}
export default ContactUs;