import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RadioField from '@/atoms/RadioField';
import { saveSalesAgentSvData } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import styles from './AbsAdminSv.module.css';

const SalesAgentPopUpComponent = ( { state, setState } ) => {
  const router = useRouter();
  const { showPopup, salesAgentArray, warning,
    selectedSalesAgent,
    selectedCompanyId,
    selectedEmployerId
   } = state;

  const handleRequest = async () => {
    if(!selectedSalesAgent) {
      setState({...state, warning: true})
      return;
    }
    await APICALL.service(`${saveSalesAgentSvData}`, 'POST', getPostData())
    .then(response => {
      if(response.status === 200) {
        router.reload()
      }
    }).catch(error => console.error(error))
  }

  const getPostData = () => {
    return {
      company_id: selectedCompanyId,
      employer_id: selectedEmployerId,
      sales_agent_id: selectedSalesAgent
    };
  }

  const handleRadioSelect = (e, agent) => {
    setState({...state, selectedSalesAgent: Number(e.target.id), warning: false})
  }

  const handleClose = () => setState({...state, showPopup: false})

  return(
    <>
        <Modal size={'lg'} show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{paddingLeft: '30%'}}>
            <Modal.Title> Assign to sales agent </Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <div>
                <p style={{fontSize: 'larger'}}> Please select sales agent </p>
                <div style={{margin: '20px 0'}}>
                {salesAgentArray.map(agent => {
                  return(
                    <RadioField
                        id={agent.id}
                        key={agent.id}
                        checked={agent.id === selectedSalesAgent}
                        disabled={false}
                        handleChange={(e) => handleRadioSelect(e, agent)}
                        label={agent.name}
                        className="col-md-6"
                      />
                  );
                })}
                </div>
                {warning === true && <small style={{color:'red'}}> Select atleast one agent </small>}
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

export default React.memo(SalesAgentPopUpComponent);
