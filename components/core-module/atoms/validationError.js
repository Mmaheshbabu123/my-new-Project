
export default function validationError ( {text, style={} }) {
  return (
    <>
    <small
        style={style}
        className="form-text text-danger poppins-regular-16px col-md-5">
       {text}
     </small>
    </>
  )
}
