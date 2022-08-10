export default function FileUpload({
  name = '',
  accept = ['*'],
  multiple = true,
  className='',
  disabled = false,
  handleChange = () => console.log(),
  fileUploadText = 'Choose file',
  browseBtnText = 'Browse'
})
{
  return (
    <div className={className}>
      <label className={'atom-input-field-default fileupload' + className}>
        <input
            type="file"
            className={className || ''}
            id={`_file_upload_input_tag_`}
            name={name}
            accept ={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            onClick={(e) => e.target.value = null}
            style={{display:'none'}}
        />
        {fileUploadText}
        <button style={{pointerEvents: "none"}} className="float-end"> {browseBtnText} </button>
      </label>
      <div className="progress" id="file_upload_progress" style={{marginTop: '10px', height: '8px', display:'none'}}>
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{width: "100%"}}></div>
      </div>
      </div>
  );
}
