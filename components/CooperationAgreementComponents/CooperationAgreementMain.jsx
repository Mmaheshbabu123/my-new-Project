import { useContext } from 'react';
import CooperationAgreementTabs from './CooperationAgreementTabs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import TabComponent from './Tabs/TabIndex';

const CooperationAgreementMain = (props) => {
  const { state: { selectedTabId } } = useContext(CooperationAgreementContext);
  return(
    <div className="">
        <CooperationAgreementTabs {...props}/>
        {selectedTabId ?  <TabComponent /> : <> Loading... </>}
    </div>
  );
}

export default CooperationAgreementMain;
