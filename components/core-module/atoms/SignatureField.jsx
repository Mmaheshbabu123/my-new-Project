import React, { useRef } from 'react';
import SignaturePad from "react-signature-canvas";

const SignatureField = ({
    onChange = (e) => console.info('sign in progress'),
    onSave = (e) => console.info('sign saved'),
    className,
    height = '300px',
    width = '450px',
    clearBtnClass = '',
    saveBtnClass = '',
    disabled = false,
    dataUrl = ''
  }) => {

  const signature = useRef({});
  const saveClearBtnWidth = { width:`${parseInt(width)/2}%`, margin: '5px 0' };

  /* a function that uses the canvas ref to clear the canvas
  via a method given by react-signature-canvas */
  const clear = () => {
    signature.current.clear();
    let signatureDataUrl = signature.current.toDataURL()
    onChange(signatureDataUrl);
  }

  /* a function that uses the canvas ref to trim the canvas
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const handleSave = () => {
    let empty = signature.current.isEmpty();
    if(!empty) {
      let signatureDataUrl = signature.current.toDataURL()
      onSave(signatureDataUrl);
    }
  }

  const onEnd = () => {
    let empty = signature.current.isEmpty();
    if(!empty) {
      let signatureDataUrl = signature.current.toDataURL();
      onChange(signatureDataUrl);
    }
  }

  return(
    <div>
    <div style={{height: height, width: width}}>
      {disabled === false ? <SignaturePad
        ref={signature}
        canvasProps={{ className: className }}
        onEnd={onEnd}
      /> :
      <div className='text-center'> <img style={{opacity: 0.7}} src={dataUrl} /> </div>
    }
      </div>
      <div style={{ width:width }}>
       <div className='row mt-3'>
         <div className='col-md-12'>
           <div className='row justify-content-between'>
             <div className='col-md-2 text-start'>
             <button disabled={disabled} className={`btn bg-white border-0 poppins-regular-18px text-decoration-underline w-100 text-start ps-0 shadow-none text-uppercase ${clearBtnClass}`} style={saveClearBtnWidth} onClick={clear}>Clear</button>
             </div>
             <div className='col-md-2'>
             <button disabled={disabled} className={`btn btn-block border-0 rounded-0 float-right skyblue-bg-color w-100 shadow-none  text-uppercase ${saveBtnClass}`} style={saveClearBtnWidth} onClick={handleSave}>Save</button>
             </div>
           </div>
         </div>
       </div>
      </div>
    </div>
  );
}

export default React.memo(SignatureField);
