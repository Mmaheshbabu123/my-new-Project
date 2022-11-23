import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { APICALL } from '@/Services/ApiServices';
import { authenticateEmployer } from '@/Services/ApiEndPoints';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import customAlert from '@/atoms/customAlert';
import ValidateMessage from '@/atoms/validationError';
import Translation from '@/Translation';
const EmployerAuthenticModal = ({props, close, allowEmployerSignature, t}) => {
  const [state, setState] = useState({
    password: '',
    showPassword: false,
    spinner: false,
    invalidUser: false,
  });

  const passwordChange = ({ target: { value } }) => {
    setState({...state, password: value, passwordWarning: false, invalidUser: false })
  }

  const handleAuthentic = async (e) => {
    e.preventDefault();
    setState({...state, spinner: true })
    if(state.password.length) {
      await APICALL.service(`${authenticateEmployer}`, 'POST', getData())
      .then(response => {
        if(response.status === 200) {
          let data = response.data || {};
          if (data.authenticate === 1) {
            handleClose();
            allowEmployerSignature();
          } else if(data.authenticate === 0) {
            setState({...state, invalidUser: true, spinner: false })
          }
        } else {
          customAlert('error', `Error occurred while authenticating.`, 2000);
        }
      }).catch(error => {
        customAlert('error', `Error occurred while authenticating.`, 2000);
        setState({...state, spinner: false,})
      })
    } else {
      setState({...state, passwordWarning: true, spinner: false })
    }
  }

  const getData = () => {
    return {
      authenticateValue: btoa(state.password),
      authenticateEmail: props.employerMail,
      authenticateId: props.employerId,
      oldpass: props.oldpass,
    }
  }

  let passwordEyeIconStyle = {
    position: 'absolute',
    top: '43px',
    right: '10px',
  }

  const handleClose = () => {
    setState({...state, password: '',
    showPassword: false,
    spinner: false,
    invalidUser: false})
    close();
  }

 return(
   <div>
     <Modal size={'lg'} show={props.authenticModal} onHide={handleClose} backdrop="static" keyboard={false} centered>
         <Modal.Header closeButton >
           <Modal.Title className='bitter-italic-normal-medium-24'> {t('Authenticate employer')} </Modal.Title>
         </Modal.Header>
       <Modal.Body>
         <div className=' col-md-10 m-auto'>
            <div className="mb-3">
               <label htmlFor="inputEmail" className="form-label poppins-regular-18px">{t('Email address')}</label>
               <input type="email" disabled value={props.employerMail} className="form-control rounded-0 shadow-none" id="inputEmail" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 position-relative">
               <label htmlFor="inputPassword" className="form-label poppins-regular-18px">{t('Password')}</label>
               <input onChange={passwordChange} type={state.showPassword ? "text" : "password"} className="form-control rounded-0 shadow-none border" style={{paddingBottom: '5px' }} id="inputPassword" />
               <span  style={passwordEyeIconStyle} className="span-action-icons color-skyblue" onClick={() => setState({...state, showPassword: !state.showPassword})}> {state.showPassword === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </span>
               {state.invalidUser === true && <ValidateMessage style={{margin:0}} text = {'You have entered an invalid password'}/>}
               {state.passwordWarning === true && <ValidateMessage style={{margin:0}} text = {'Please enter password'}/>}
            </div>

            <div className='row my-4'>
              <div className='col-md-6 align-self-center'>
                <p className='poppins-regular-18px text-uppercase' onClick={handleClose}> {t('Cancel')} </p>
              </div>
              <div className='col-md-6'>
              <button className="btn poppins-medium-18px-next-button float-end shadow-none rounded-0 text-uppercase" type="submit" onClick={(e) => state.spinner === false ? handleAuthentic(e) : null}>
                <span className={state.spinner === true ? "spinner-border spinner-border-sm mx-2" : ''} role="status" aria-hidden="true"></span>
                {state.spinner === true ? 'Authenticating...' : 'Authenticate'}
              </button>
              </div>
            </div>
         </div>
       </Modal.Body>
     </Modal>
   </div>
 )


}

export default React.memo(Translation(EmployerAuthenticModal,['Authenticate employer','Email address','Password','Cancel']));
