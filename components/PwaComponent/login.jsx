import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { userService } from '@/Services/UserServices';
import Translation from '@/Translation';
import Link from 'next/link';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import customAlert from '@/atoms/customAlert';

const getAcrfToken = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/get-acrf-token`)
        .then(res => res.json())
        .then(result => result.token)
}

const Login = (props) => {
    const { t } = props;
    const router = useRouter(); //NEEDED NOSONAR
    const [state, setState] = useState({
        id: '',
        email: '',
        password: '',
        error_user_name: '',
        error_password: '',
        //show hide condition
        showPassword: false,
        unrecognized: false,
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
                currentUserObj: { uid },
                message
            } = await userService.userLogin(state, token);

            //check status and redirect user.
            if (status === 200) {
		            window.open(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/api/user/login?entityid=${uid}&destination_url=${btoa(window.location.href)}`, '_self');
                //redirectToApplication(uid);
                // window.open(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/api/user/login?entityid=${uid}&destination_url=${btoa(window.location.href)}`, '_self');
                // get return url from query parameters or default to '/'
                // window.open(redirect, '_self'); // It'll redirect by re-loading page
                // router.push(redirect); //it'll just navigate, without re-loading page
            } else {
                setState({...state, unrecognized: true });
                console.error(message);
            }
        }
    }

    const redirectToApplication = (loggedInUserId) => {
      let finalUrl = '';
      const returnUrl = router.query.returnUrl;
      let {url, redirectTo, uid} = returnUrl;
      if(redirectTo === 'drupal' && uid == loggedInUserId) {
        finalUrl = url;
      } else {
        finalUrl = returnUrl && returnUrl.length > 5 ? returnUrl : `/pwa/dashboard?entityid=${uid}&entityType=${role}`;
      }
      window.open(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/api/user/login?entityid=${uid}&destination_url=${btoa(finalUrl)}`, '_self');
    }

    const handleOnChange = ({ target: { value = '', name = '' } }) => {
        setState({ ...state, [name]: value })
    }

    let passwordEyeIconStyle = {
        position: 'absolute',
        bottom: '8px',
        right: '10px',
    }

    useEffect(() => {
      if(localStorage.getItem('type_register') && parseInt(localStorage.getItem('type_register'))) {
        customAlert('success', 'registration is successfull, please login', 2500)
        localStorage.removeItem('type_register');
      }
    })

    if (isLoading) {
        return <>  </>
    } else {
        return (
            <section className="container">
                <div className="row content d-flex justify-content-center">
                    <div className='col-md-12 position-sticky-login py-4'>
                        <p className="px-0 bitter-italic-normal-medium-24 text-center">{t('Login')}</p>
                    </div>
                    <div className="col-md-5 login-page-container">
                        <div className="">
                            <form className="mb-5" onSubmit={submit}>
                                <div className="mb-2" >
                                    <label className="form-label custom_astrick poppins-light-16px">{t('Email address')}</label>
                                    <input type="text" className="form-control rounded-0 shadow-none"
                                        value={state.email}
                                        name='email'
                                        onChange={handleOnChange}
                                    />
                                </div>
                                {state.unrecognized === true && <div className="form-item--error-message">
                                  <p>Unrecognized username or password.</p>
                                </div>}
                                <p className="error">{state.error_user_name}</p>
                                <div className="pt-4 position-relative">
                                    <label className="form-label custom_astrick poppins-light-16px">{t('Password')}</label>
                                    <input type={state.showPassword ? "text" : "password"} className="form-control rounded-0 shadow-none"
                                        value={state.password}
                                        name='password'
                                        onChange={handleOnChange}
                                    />
                                    <span
                                        style={passwordEyeIconStyle}
                                        className="login-hide-show-span"
                                        onClick={() => setState({ ...state, showPassword: !state.showPassword })}
                                    > {state.showPassword === true ? <BsFillEyeFill className="force-skyblue" /> : <BsFillEyeSlashFill className="force-skyblue" />}
                                    </span>
                                </div>
                                <div className='py-3'>
                                    {/* <p className="px-0 float-end text-info">{t('Forgot password?')}</p> */}
                                    <Link href={process.env.NEXT_PUBLIC_APP_URL_DRUPAL+'/user/password'} className="m-2">
                                        <a type="" className="">
                                            <p className="px-0 float-end forgot-password-link">{t('Forgot password?')}</p>
                                        </a>
                                    </Link>

                                </div>
                                <div className="p-0">
                                    <button
                                        type="submit"
                                        // className="btn rounded-0 custom-btn px-3 btn-block float-end"
                                        className="btn rounded-0 px-3 poppins-medium-18px-next-button shadow-none w-100 mt-3 "
                                    >
                                        {t('Login')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}
export default React.memo(Translation(Login, ['Loading...', 'Login', 'Email address', 'Password', 'Forgot password?', 'Login']));
