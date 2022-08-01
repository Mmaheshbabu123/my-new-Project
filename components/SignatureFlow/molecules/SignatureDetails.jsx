import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SignatureField from '@/atoms/SignatureField';
import { confirmAlert } from 'react-confirm-alert';

const SignatureDetails = ({ state, setState, submitSignData, eraseSignature }) => {
  const handleSave      = (e) => submitSignData(e);
  const handleClose     = ( ) => setState({...state, showPopup: false})
  const handleEdit      = ( ) => setState({...state, showPopup: true, disabled: false })

  const handleDelete = () => {
    confirmAlert({
      message: 'Do you want to delete signature?',
      buttons: [
        { label: 'No' },
        { label: 'Yes', onClick: () => eraseSignature() }
      ]
    });
  }

  return(
    <div>
        <Modal size={'lg'} show={state.showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{paddingLeft: '43%'}}>
            <Modal.Title> Signature </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <SignatureField
                    className = {"signatureCanvas"}
                    onSave={handleSave}
                    disabled={state.disabled}
                    dataUrl={state.sign}
                    width={'100%'}
                  />
          </Modal.Body>
        </Modal>
        <div className='border p-2 row'>
          {state.sign !== '' ? <>
          <span> Signature: </span>
          <div className='col-md-6'> <img src={state.sign} alt="no sign"/> </div>
          <div className='col-md-6'>
            <button className={`btn btn-secondary mx-2`} style={{width:'30%'}} onClick={handleEdit}> Edit </button>
            <button className={`btn btn-light`} style={{width:'30%'}} onClick={handleDelete}> Delete </button>
          </div>
          </> :
          <>
          <p style={{margin: '20px 0', textAlign: 'center'}}> {`You haven't added a signature yet, please add your signature.`} </p>
              <button onClick={handleEdit} type="button" className="btn btn-dark pcp_btn col-2 m-auto">
                {`Add signature`}
              </button>
         </>
        }
        </div>
    </div>
  );
}

export default React.memo(SignatureDetails);
