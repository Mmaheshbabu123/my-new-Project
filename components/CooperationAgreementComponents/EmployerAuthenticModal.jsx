import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { APICALL } from '@/Services/ApiServices';
import { authenticateEmployer } from '@/Services/ApiEndPoints';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import customAlert from '@/atoms/customAlert';
import ValidateMessage from '@/atoms/validationError';

const EmployerAuthenticModal = ({props, close, allowEmployerSignature}) => {
  const [state, setState] = useState({
    password: '',
    showPassword: false,
    spinner: false,
    invalidUser: false,
  });

  const passwordChange = ({ target: { value } }) => {
    setState({...state, password: value})
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
    top: '34px',
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
     <Modal size={'lg'} show={props.authenticModal} onHide={handleClose} backdrop="static" keyboard={false} >
         <Modal.Header closeButton style={{paddingLeft: '30%'}}>
           <Modal.Title> Authenticate employer </Modal.Title>
         </Modal.Header>
       <Modal.Body>
         <form className=' col-md-9 m-auto'>
            <div className="mb-3">
               <label htmlFor="inputEmail" className="form-label">Email address</label>
               <input type="email" disabled value={props.employerMail} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 position-relative">
               <label htmlFor="inputPassword" className="form-label">Password</label>
               <input onChange={passwordChange} type={state.showPassword ? "text" : "password"} className="form-control" style={{paddingBottom: '5px' }} id="inputPassword" />
               <span  style={passwordEyeIconStyle} className="span-action-icons" onClick={() => setState({...state, showPassword: !state.showPassword})}> {state.showPassword === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </span>
               {state.invalidUser === true && <ValidateMessage style={{margin:0}} text = {'You have entered an invalid password'}/>}
            </div>

            <div className='text-end my-4'>
              <p className='popup-back-btn' onClick={handleClose}> Cancel </p>
              <button className="btn btn-secondary" type="submit" onClick={(e) => state.spinner === false ? handleAuthentic(e) : null}>
                <span className={state.spinner === true ? "spinner-border spinner-border-sm mx-2" : ''} role="status" aria-hidden="true"></span>
                {state.spinner === true ? 'Authenticating...' : 'Authenticate'}
              </button>
            </div>
         </form>
       </Modal.Body>
     </Modal>
   </div>
 )


}

export default React.memo(EmployerAuthenticModal)
