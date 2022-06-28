import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';
import PcForWorkersServants from '../molecules/PcForWorkersServants';

const AbsoluteYouAgent = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);

  return(
    <div className="">
      <BasicDetails />
      <PcForWorkersServants />
    </div>
  );
}

export default React.memo(AbsoluteYouAgent);
