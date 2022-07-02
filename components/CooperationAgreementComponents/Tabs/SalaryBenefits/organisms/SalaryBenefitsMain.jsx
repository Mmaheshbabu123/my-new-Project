import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import SalaryDetailsPerPC from '../molecules/SalaryDetailsPerPC';

const SalaryBenefitsMain = (props) => {
  const { state } = useContext(CooperationAgreementContext);
  return (
    <div className="">
      <SalaryDetailsPerPC />
    </div>
  )
}

export default React.memo(SalaryBenefitsMain)
