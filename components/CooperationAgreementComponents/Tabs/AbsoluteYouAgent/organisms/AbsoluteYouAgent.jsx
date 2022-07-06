import React from 'react';
// import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';
import CoefficientPage from '../molecules/CoefficientPage';

const AbsoluteYouAgent = (props) => {
  
  return(
    <div className="_absolute-you-agend_">
        <BasicDetails />
        <PcForWorkersServants />
        <CoefficientPage />
    </div>
  );
}

export default React.memo(AbsoluteYouAgent);
