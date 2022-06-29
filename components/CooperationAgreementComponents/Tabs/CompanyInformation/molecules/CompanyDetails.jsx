import React, {useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';

const CompanyDetails = (props) => {
const {state,updateStateChanges} = useContext(CooperationAgreementContext);
const handleChange = (e) => {
  console.log(e.target.value);
}
return(
  <div className="col-md-12 row">
    <div className = "col-md-6">
      <LabelField title="Official legal company name" />
      <InputField
        type = {'text'}
        className = {'col-md-8'}
        value={''}
        isDisabled= {false}
        placeholder={'Enter...'}
        handleChange={handleChange}
        name={'tab_1_5'}
       />
       <LabelField title="Company client number" />
       <InputField
         type = {'text'}
         className = {'col-md-8'}
         value={''}
         isDisabled= {false}
         placeholder={'Enter...'}
         handleChange={handleChange}
         name={'tab_1_5'}
        />
     </div>
     <div className = "col-md-6">
     <LabelField title="Company call name" />
     <InputField
       type = {'text'}
       className = {'col-md-8'}
       value={''}
       isDisabled= {false}
       placeholder={'Enter...'}
       handleChange={handleChange}
       name={'tab_1_5'}
      />
      </div>
  </div>
);
}

export default React.memo(CompanyDetails);
