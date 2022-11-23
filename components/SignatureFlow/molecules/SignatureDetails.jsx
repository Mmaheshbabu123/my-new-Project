import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SignatureField from '@/atoms/SignatureField';
import { confirmAlert } from 'react-confirm-alert';

const SignatureDetails = ({ state, setState, submitSignData, eraseSignature, fromSvPreview = 0, noMinHeight = 0 }) => {
  const handleSave      = (e) => submitSignData(e);
  const handleClose     = ( ) => setState({...state, showPopup: false})
  const handleEdit      = ( ) => setState({...state, showPopup: true, disabled: false })

  const handleDelete = () => {  //NOSONAR not needed as of now
    confirmAlert({
      message: 'Do you want to delete signature?',
      buttons: [
        { label: 'No' },
        { label: 'Yes', onClick: () => eraseSignature() }
      ]
    });
  }

  return(
    <div className={`row ${noMinHeight === 1 ? '' : 'min-height-signature'}`}>
        <Modal size={'lg'} show={state.showPopup} onHide={handleClose} centered>
          <Modal.Header closeButton style={{paddingLeft: '43%'}}>
            <Modal.Title> <h3 className='font-weight-bold px-0  bitter-italic-normal-medium-24'> Signature </h3> </Modal.Title>
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
        {fromSvPreview === 0 && <div className='border p-2 col-md-9 col-lg-11 m-auto'>
          {state.sign !== '' ? <>
          <span className='poppins-regular-18px'> Signature: </span>
          <div className='row'>
          <div className='col-md-8'> <img src={state.sign} alt="no sign" width="100%"/> </div>
          <div className='col-md-4 align-self-end'>
            <button className={`btn btn-secondary mx-2 btn  btn-block border-0 rounded-0 poppins-medium-18px-next-button col-2 m-auto shadow-none float-end text-uppercase`} style={{width:'50%'}} onClick={handleEdit}> Add a new sign </button>
            {/*<button className={`btn btn-light`} style={{width:'30%'}} onClick={handleDelete}> Delete </button>*/}
          </div>
          </div>
          </> :
          <>
          <p className='poppins-light-18px'style={{margin: '20px 0', textAlign: 'center'}}> {`You haven't added a signature yet, please add your signature.`} </p>
             <div className='row'>
               <div className='col-md-12 text-center'>
               <button onClick={handleEdit} type="button" className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color col-2 m-auto shadow-none">
                {`Add signature`}
              </button>
               </div>
             </div>
         </>
        }
        </div>}
    </div>
  );
}

export default React.memo(SignatureDetails);
