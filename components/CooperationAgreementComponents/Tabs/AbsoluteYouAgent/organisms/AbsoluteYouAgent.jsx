import React, { useContext, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';

const AbsoluteYouAgent = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  useEffect(() => {
  }, [])
  return(
    <div className="">
      <BasicDetails />
      <PcForWorkersServants />
    </div>
  );
}

export default React.memo(AbsoluteYouAgent);
