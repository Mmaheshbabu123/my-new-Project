
export default function validationError ( {text, style={} }) {
  return (
    <>
    <small
        style={style}
        className="form-text text-muted col-md-5 pcp_name_warning">
       {text}
     </small>
    </>
  )
}
