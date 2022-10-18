import React, { useState } from 'react';
import { useQuery } from "react-query";
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { userService } from '@/Services/UserServices';
import Link from 'next/link';


const getAcrfToken = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}get-acrf-token`)
        .then(res => res.json())
        .then(result => result.token)
}

const Login = (props) => {
    const router = useRouter();
    const [state, setState] = useState({
        id: '',
        email: '',
        password: '',
        error_user_name: '',
        error_password: '',
    })
    const { data: token, isLoading } = useQuery("arcf_token", getAcrfToken);

    let validate = (res) => {
        var error1 = {};
        error1['email'] = ValidationService.emptyValidationMethod(res.email);
        error1['password'] = ValidationService.emptyValidationMethod(res.password);
        /**
		 * check if email is valid
		 */
		error1['email'] =
        error1['email'] == ''
            ? ValidationService.emailValidationMethod(res.email)
            : error1['email'];
        
        /**
		 * check if password is valid
		 */
		// error1['password'] =
        // error1['password'] == ''
        //     ? ValidationService.passwordValidationMethod(res.password)
        //     : error1['password'];
        
        setState({
            ...state,
            error_user_name: error1['email'],
            error_password: error1['password']
        });
        if (error1['email'] !== '' && error1['password'] !== '') {
            return true;
        }
        return false;
    }

    const submit = async (e) => {
        e.preventDefault();
        var validateFields = validate(state);
        if (!validateFields) {
            let { status,
                currentUserObj: { uid, role },
                message
            } = await userService.userLogin(state, token);

            //check status and redirect user.
            if (status === 200) {
                // get return url from query parameters or default to '/'
                const redirect = router.query.returnUrl || `/pwa/dashboard?entityid=${uid}&entityType=${role}`;
                window.open(redirect, '_self'); // It'll redirect by re-loading page
                // router.push(redirect); //it'll just navigate, without re-loading page
            } else {
                // alert(message); //NOSONAR
            }
        }
    }

    const handleOnChange = ({ target: { value = '', name = '' } }) => {
        setState({ ...state, [name]: value })
    }

    if (isLoading) {
        return <> Loading... </>
    } else {
        return (
            <section className="container">
                <div className="row content d-flex justify-content-center p-2">
                    <div className="col-md-5">
                        <div className=" p-4">
                            <p className="h4  px-0  bitter-italic-normal-medium-24 mb-4 text-center fs-1">Login</p>
                            <form className="mb-5" onSubmit={submit}>
                                <div className="mb-3" onS>
                                    <label className="form-label custom_astrick">Email address</label>
                                    <input type="text" className="form-control rounded-0"
                                        value={state.email}
                                        name='email'
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <p className="error mt-2">{state.error_user_name}</p>

                                <div className="mb-3  position-relative">
                                    <label className="form-label custom_astrick">Password</label>
                                    <input type="password" className="form-control rounded-0"
                                        value={state.password}
                                        name='password'
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <p className="error mt-2">{state.error_password}</p>
                                <div>
                                    <Link href='' className="m-2">
                                        <a type="" className="">
                                            <p className="px-0 float-end text-info">Forgot password?</p>
                                        </a>
                                    </Link>

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
}
export default React.memo(Login);
