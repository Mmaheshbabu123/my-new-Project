import React, { useContext } from 'react';
import LabelField from '@/atoms/LabelField';
import DateField from '@/atoms/DateField';

import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';

const BasicDetails = (props) => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);

  const handleChange = (e) => {
    console.log(e.target.value);
  }

  return(
    <div className="">
      <div>
          <LabelField title="Start date of agreement" />
          <DateField
             isDisabled= {false}
             placeholder={'date'}
             handleChange={handleChange}
             name={'name'}
             className="col-md-6"
            />
      </div>

    </div>
  );
}

export default React.memo(BasicDetails);
