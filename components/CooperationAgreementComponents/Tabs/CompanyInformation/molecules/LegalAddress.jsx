import React, {useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const LegalAddress = (props) => {
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  return (
    <div className =''>
     LegalAddress
    </div>
  )
}

export default React.memo(LegalAddress);
