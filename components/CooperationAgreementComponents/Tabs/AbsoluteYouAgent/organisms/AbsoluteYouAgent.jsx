import React, { useContext, useEffect } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';
import CoefficientPage from '../molecules/CoefficientPage';

const AbsoluteYouAgent = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  useEffect(() => {
  }, [])
  console.log(state);
  return(
    <div className="">
      <BasicDetails />
      <PcForWorkersServants />
      <CoefficientPage />
    </div>
  );
}

export default React.memo(AbsoluteYouAgent);
