import React from 'react';
import SalaryDetailsPerPC from '../molecules/SalaryDetailsPerPC';

const SalaryBenefitsMain = (props) => {
  return (
    <div className="">
      <SalaryDetailsPerPC />
    </div>
  )
}

export default React.memo(SalaryBenefitsMain)
