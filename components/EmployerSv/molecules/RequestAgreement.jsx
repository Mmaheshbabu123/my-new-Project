import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CheckBoxField from '@/atoms/CheckBoxField';
import styles from './EmployerSv.module.css';
import { saveRequestedCompanies } from '@/Services/ApiEndPoints';
import customAlert from '@/atoms/customAlert';
import { APICALL } from '@/Services/ApiServices';
import Translation from '@/Translation';

const RequestAgreement = (props) => {
  const { t } = props;
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
          <Modal size={'lg'} show={showPopup} onHide={handleClose} centered>
            <Modal.Header closeButton >
              <Modal.Title className='bitter-italic-normal-medium-22 text-center'> {t('Request agreement')} </Modal.Title>
            </Modal.Header>
          <Modal.Body>
              <div>
               {companies && companies.length > 0 ? <>
                  <p style={{fontSize: 'larger'}} className='poppins-medium-18px'> {t('Please select company')} </p>
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
                          className="col-md-6 poppins-light-18px d-flex align-items-center"

                        />
                    );
                  })}
                  </div>
                  {warning === true && <small style={{color:'red'}}> {t('Select atleast one company')} </small>}
                </> : <p className="text-center"> {t('No companies found')} </p>}
              </div>
          </Modal.Body>
          {companies && companies.length > 0 && <Modal.Footer className="pop_up_footer justify-content-between">
            <p className={`${styles['popup-back-btn']} pop_up_back_button poppins-light-18px text-uppercase text-decoration-underline`} onClick={handleClose}> {t('Back')} </p>
            <Button onClick={handleRequest} className="buttuon_purple rounded-0 border-0 shadow-none text-uppercase">
              {t('Request agreement')} 
            </Button>
          </Modal.Footer>}
        </Modal>
      </>
    );
  }

  return(
    <div className={`${styles['request-agreeemnt-comp-btn']} row `}>
     <div className='col-md-12'>
     {companyPopup()}
      <button onClick={triggerPopup} type="button" className="btn btn-dark buttuon_purple rounded-0 float-end shadow-none mb-3 text-uppercase px-3 py-2">
        {t(`Request agreement`)}
      </button>
     </div>
    </div>
  );
}

export default React.memo(Translation(RequestAgreement,['Request agreement','Please select company','Select atleast one company','No companies found','Back','Request agreement',`Request agreement`]));
