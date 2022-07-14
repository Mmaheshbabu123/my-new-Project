import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CheckBoxField from '@/atoms/CheckBoxField';
import styles from './EmployerSv.module.css';
import { saveRequestedCompanies } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';


const RequestAgreement = (props) => {
  const router = useRouter();
  const { state: { companies = {} }, employer_id } =  props;
  const [compState, setCompState] = useState({
      showPopup: false
    , companies: companies
    , selectedCompanies: []
    , warning: false
  });


  const triggerPopup = () => {
    setCompState({...compState, showPopup: true });
  }
  const handleClose = () => setCompState({...compState, showPopup: false});

  /**
   * [handleChange description]
   * @param  {[Object]} target                 [description]
   * @param  {[Boolean]} checked                [description]
   * @param  {textfield/checkbox} [type=0]               [description]
   * @return {[void]}          [description]
   */
  const handleCheckBoxChange = ({ target: { value, checked }}) => {
    let valueId = Number(value);
    const { selectedCompanies } = compState;
    if(checked) {
      selectedCompanies.push(valueId);
    } else {
      selectedCompanies.indexOf(valueId) > -1 ?
        selectedCompanies.splice(selectedCompanies.indexOf(valueId), 1) : null;
    }
    setCompState({...compState, selectedCompanies, warning: false})
  }

  const handleRequest = async () => {
    if(!compState.selectedCompanies.length) {
      setCompState({...compState, warning: true})
      return;
    }
    await APICALL.service(`${saveRequestedCompanies}`, 'POST', getPostData())
    .then(response => {
      if(response.status === 200) {
        router.reload()
      }
    })
  }

  const getPostData = () => {
    return { selectedCompanies: compState.selectedCompanies, employerId: employer_id }
  }

  const companyPopup = () => {
    const { showPopup, companies, selectedCompanies, warning } = compState;
    return (
      <>
          <Modal size={'lg'} show={showPopup} onHide={handleClose}>
            <Modal.Header closeButton style={{paddingLeft: '30%'}}>
              <Modal.Title> Request agreement </Modal.Title>
            </Modal.Header>
          <Modal.Body>
              <div>
                  <p style={{fontSize: 'larger'}}> Please select company </p>
                  <div style={{margin: '20px 0'}}>
                  {Object.values(companies).map(company => {
                    return(
                      <CheckBoxField
                          key={company.id}
                          tick={selectedCompanies.includes(Number(company.id))}
                          value={company.id}
                          disabled={false}
                          onCheck={handleCheckBoxChange}
                          name={company.name}
                          customStyle={{ margin:'10px 0' }}
                          className="col-md-6"
                        />
                    );
                  })}
                  </div>
                  {warning === true && <small style={{color:'red'}}> Select atleast one company </small>}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <p className={`${styles['popup-back-btn']}`} onClick={handleClose}> Back </p>
            <Button variant="secondary" onClick={handleRequest}>
              Request agreement
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return(
    <div className={`${styles['request-agreeemnt-comp-btn']}`}>
      {companyPopup()}
      <button onClick={triggerPopup} type="button" className="btn btn-dark pcp_btn col-1">
        {`Request agreement`}
      </button>
    </div>
  );
}

export default React.memo(RequestAgreement)
