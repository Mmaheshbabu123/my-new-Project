import React ,{useContext} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import BasicDetails from '../molecules/BasicDetails';

const OnlineDetails = (props) => {
    const { state, updateStateChanges } = useContext(CooperationAgreementContext);
    return(
      <div className="">
        <BasicDetails />
      </div>
    );

}

export default  React.memo(OnlineDetails);
