import React, { Component, useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import axios from 'axios';
import { useRouter } from 'next/router';
import ValidationService from '../../Services/ValidationService';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

function Login(props) {

    const [error_user_name, setError_user_name] = useState('');
    const [error_password, setError_password] = useState('');


    const [data, setData] = useState({
        id: '',
<<<<<<< HEAD
        username: '',
        password: '',
        
        //ADDED BY LOGUPRIYA (ahow/hide)
        showPassword: false,

=======
        email: '',
        password: ''
>>>>>>> ay_next_preeti_11102022_6

    });
    let validate = (res) => {
        var error1 = [];
        error1['email'] = ValidationService.emptyValidationMethod(res.email);
        error1['password'] = ValidationService.emptyValidationMethod(res.password);


        // error1['email'] =
        // error1['email'] == ''
        //     ? ValidationService.projectNameValidationMethod(res.email)
        //     : error1['email'];
        /**
         * seterror messages
         */
        setError_user_name(error1['email']);
        setError_password(error1['password']);

        // return false if there is an error else return true
        if (error1['email'] == '' && error1['password'] == '') {
            return true;
        } else {
            return false;
        }

    }


    const [token, setToken] = useState('');
    const router = useRouter();
    useEffect(() => {
        //if (localStorage.getItem('user')) {
        //  router.push('/pwa/dashboard');
        //}
        fetch(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}get-acrf-token`)
            .then(res => res.json())
            .then((result) => {
                setToken(result.token)
            })
    }, []);

    const submit = (e) => {
        e.preventDefault();
        var valid_res = validate(data);
        // console.log(valid_res);return;
        if (!valid_res) {

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
    }

    let passwordEyeIconStyle = {
        position: 'absolute',
        top: '34px',
        right: '10px',
      }
    

    return (
        <section className="container">
            <div className="row content d-flex justify-content-center p-2">
                <div className="col-md-5">
                    <div className=" p-4">
                        <p className="h4  px-0  bitter-italic-normal-medium-24 mb-4 text-center fs-1">Login</p>
                        <form className="mb-5" onSubmit={(e) => submit(e)}>
                            <div className="mb-3" onS>
                                <label className="form-label custom_astrick">Email address</label>
                                <input type="email" className="form-control rounded-0"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }));
                                    }} />
                            </div>
                            <p className="error mt-2">{error_user_name}</p>

                            <div className="mb-3  position-relative">
                                <label className="form-label custom_astrick">Password</label>
<<<<<<< HEAD
                                <input type={data.showPassword ? "text" : "password"} className="form-control rounded-0" 
                                value={data.password}
                                onChange={(e) => {
                                    setData((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }));
                                }} />
                               <span  style={passwordEyeIconStyle} className="span-action-icons" onClick={() => setData({...data, showPassword: !data.showPassword})}> {data.showPassword === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </span>
=======
                                <input type="password" className="form-control rounded-0"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            password: e.target.value
                                        }));
                                    }} />

>>>>>>> ay_next_preeti_11102022_6
                            </div>
                            <p className="error mt-2">{error_password}</p>
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
