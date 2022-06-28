import { Suspense, useContext } from 'react';
import dynamic from 'next/dynamic';
import CooperationAgreementTabs from './CooperationAgreementTabs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const TabComponent = dynamic(
  () =>
  import('./Tabs/TabIndex'),
  { suspense: true }
);

const CooperationAgreementMain = (props) => {
  const { state: { selectedTabId } } = useContext(CooperationAgreementContext);
  return(
    <div className="">
        <CooperationAgreementTabs {...props}/>
        <Suspense fallback={`Loading...`}> {selectedTabId ?   <TabComponent /> : <> Loading... </>} </Suspense>
    </div>
  );
}

export default CooperationAgreementMain;
