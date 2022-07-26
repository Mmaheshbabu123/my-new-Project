import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SignatureField from '@/atoms/SignatureField';

const SignatureDetails = ({ state, setState, submitSignData }) => {
  const handleSave      = (e) => submitSignData(e);
  const handleClose     = ( ) => setState({...state, showPopup: false})
  const handleView      = ( ) => setState({...state, showPopup: true, disabled: true })
  const handleEdit      = ( ) => setState({...state, showPopup: true, disabled: false })
  return(
    <div>
        <Modal  show={state.showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{paddingLeft: '38%'}}>
            <Modal.Title> Signature </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <SignatureField
                    className = {"signatureCanvas"}
                    onSave={handleSave}
                    disabled={state.disabled}
                    dataUrl={state.sign}
                  />
          </Modal.Body>
        </Modal>
        <div className='border p-2 row'>
          {state.sign !== '' ? <>
          <span> Sign: </span>
          <div className='col-md-6'> <img src={state.sign} alt="no sign"/> </div>
          <div className='col-md-6'>
            <button className={`btn btn-light`} style={{width:'30%'}} onClick={handleView}> View </button>
            <button className={`btn btn-secondary mx-2`} style={{width:'30%'}} onClick={handleEdit}> Edit </button>
          </div>
          </> :
          <>
          <p style={{margin: '20px 0', textAlign: 'center'}}> {`We have notice that you haven't signed, please "Add your signature"`} </p>
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
