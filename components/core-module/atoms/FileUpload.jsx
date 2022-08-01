export default function FileUpload({
  name = '',
  accept = ['*'],
  multiple = true,
  className='',
  disabled = false,
  handleChange = () => console.log(),
  fileUploadText = 'Choose file'
})
{
  return (
    <div className={className}>
      <label className={'atom-input-field-default fileupload' + className}>
        <input
            type="file"
            className=""
            id={`_file_upload_input_tag_`}
            name={name}
            accept ={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            style={{display:'none'}}
        />
        {fileUploadText}
        <button style={{pointerEvents: "none"}} className="float-end"> Browse </button>
      </label>
      </div>
  );
}
