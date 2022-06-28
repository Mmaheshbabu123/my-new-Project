import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const BasicDetails = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  return(
    <div className=""> BasicDetails </div>
  );
}

export default React.memo(BasicDetails);
