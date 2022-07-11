
export default function validationError ( {text }) {
  return (
    <>
    <small
       id="pcp_name_warning"
       className="form-text text-muted col-md-5">
       {text}
     </small>
    </>
  )
}
