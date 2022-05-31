import React from "react";
const FileUploader = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
  };
  return (
    <>
      {/* <button onClick={handleClick}> */}
      <div className="path-container-46">
            {/* <img className="path" src="/img/path-27-1@1x.png" />
            <img className="path-28" src="/img/path-28-1@1x.png" />
            <img className="path-29" src={props.path29} />
            <img className="path" src="/img/path-27-1@1x.png" /> */}
            <img  alt="upload-image" style={{width: "30px"}} src="../../upload.svg"></img>
          </div>
      {/* </button> */}
      {/* <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}} 
      /> */}
    </>
  );
}
export default FileUploader;