import React, { Component, useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import axios from 'axios';
import { useRouter } from 'next/router';

function Login(props) {

    const [data, setData] = useState({
      

    });
    const [ token, setToken ] = useState('');
    const router = useRouter();
    useEffect(() => {
	    fetch(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/get-acrf-token`)
	          .then(res => res.json())
		    .then((result) => {
			setToken(result.token)
		  })
    }, []);

	const submit = (e) => {
		e.preventDefault();
		const config = {
			headers:
				{
					'Content-Type': 'application/json',
				        'X-CSRF-Token': token
				}
		}
		let data =
	{
			"name": "maheshbabumanikanti.infanion@gmail.com",
			"pass": "AY_LM@test_22$"
		}
		axios.post(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}user/login?_format=json`, data, config).then((response) => {
			localStorage.setItem("user", JSON.stringify(response.data.current_user));
			router.push('/pwa/dashboard');
		   })
		 .catch((error) => {
		})
	}
    return (
        <section className="container">
            <div className="row content d-flex justify-content-center p-2">
                <div className="col-md-5">
                    <div className=" p-4">
                        <p className="h4  px-0  bitter-italic-normal-medium-24 mb-4 text-center fs-1">Login</p>
                        <form className="mb-5" onSubmit={submit}>
                            <div className="mb-3" onS>
                                <label className="form-label custom_astrick">Email address</label>
                                <input type="email" className="form-control rounded-0" />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label custom_astrick">Password</label>
                                <input type="password" className="form-control rounded-0" />
                            </div>
                            <div>   
                                <p className="px-0 float-end text-info">Forgot password?</p>
                            </div>
                            <div className="p-0">
								<button
									type="submit"
									// className="btn rounded-0 custom-btn px-3 btn-block float-end"
									className="btn rounded-0 px-3 poppins-medium-18px-next-button shadow-none w-100 mt-3 "
									
								>
									Login
								</button>
							</div>
                            {/* <div className="d-flex p-0">   
                                <p className="p-2 text-center">Not registered yet?</p>
                                <p className="p-2 text-info ">Register here</p>

                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}
export default Login;
