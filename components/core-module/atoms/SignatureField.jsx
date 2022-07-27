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

  const saveClearBtnWidth = { width:parseInt(width)/2, margin: '5px 0' };

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
        <button disabled={disabled} className={`btn btn-light ${clearBtnClass}`} style={saveClearBtnWidth} onClick={clear}>Clear</button>
        <button disabled={disabled} className={`btn btn-secondary ${saveBtnClass}`} style={saveClearBtnWidth} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default React.memo(SignatureField);
