import React ,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import CompanyDetails from '../molecules/CompanyDetails';
import LegalAddress from  '../molecules/LegalAddress';

const CompanyInformation = (props) => {
    const { state, updateStateChanges } = useContext(CooperationAgreementContext);
    return(
      <div className="">
        <CompanyDetails />
        <LegalAddress />
      </div>
    );

}

export default  React.memo(CompanyInformation);
