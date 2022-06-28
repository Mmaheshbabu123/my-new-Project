import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const PcForWorkersServants = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  return(
    <div className=""> PcForWorkersServants </div>
  )
}

export default React.memo(PcForWorkersServants);
