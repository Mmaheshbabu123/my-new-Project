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
  const { showPopup, salesAgentArray, warning, reassign, //NOSONAR
    selectedSalesAgent,
    selectedCompanyId,
    selectedEmployerId,
    savedAgentId
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
    let radioVal = Number(e.target.id);
    let reassign = savedAgentId!== 0 && (savedAgentId !== radioVal) ? true : false;
    setState({...state, reassign,
      selectedSalesAgent: radioVal,
      warning: false,
    })
  }

  const handleClose = () => setState({...state, showPopup: false, warning: false, reassign: false})

  return(
    <>
        <Modal size={'lg'} show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton style={{paddingLeft: '30%'}}>
            <Modal.Title>{savedAgentId ? 'Re-assign sales agent' : 'Assign to sales agent'}</Modal.Title>
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
                {/*reassign === true && <small style={{color:'red'}}> Do you want to change sales agent? </small>*/}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <p className={`${styles['popup-back-btn']}`} onClick={handleClose}> Back </p>
          <Button variant="secondary" onClick={handleRequest}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(SalesAgentPopUpComponent);
