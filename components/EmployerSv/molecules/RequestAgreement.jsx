import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CheckBoxField from '@/atoms/CheckBoxField';
import styles from './EmployerSv.module.css';
import { saveRequestedCompanies } from '@/Services/ApiEndPoints';
import customAlert from '@/atoms/customAlert';
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
        customAlert('success', 'Request sent successfully!', 2000); //no of milliseconds
        setTimeout(() => router.reload(), 2000);
      } else {
        customAlert('error', 'Error occured while requesting cooperation agreement', 2000); //no of milliseconds
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
            <Modal.Header closeButton style={{paddingLeft: '36%'}}>
              <Modal.Title> Request agreement </Modal.Title>
            </Modal.Header>
          <Modal.Body>
              <div>
               {companies && companies.length > 0 ? <>
                  <p style={{fontSize: 'larger'}}> Please select company </p>
                  <div style={{margin: '20px 0'}}>
                  {companies.map(company => {
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
                </> : <p className="text-center"> No companies found </p>}
              </div>
          </Modal.Body>
          {companies && companies.length > 0 && <Modal.Footer>
            <p className={`${styles['popup-back-btn']}`} onClick={handleClose}> Back </p>
            <Button variant="secondary" onClick={handleRequest}>
              Request agreement
            </Button>
          </Modal.Footer>}
        </Modal>
      </>
    );
  }

  return(
    <div className={`${styles['request-agreeemnt-comp-btn']}`}>
      {companyPopup()}
      <button onClick={triggerPopup} type="button" className="btn btn-dark buttuon_purple col-1 rounded-0">
        {`Request agreement`}
      </button>
    </div>
  );
}

export default React.memo(RequestAgreement)
