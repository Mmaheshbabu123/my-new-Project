import { useContext } from 'react';
import dynamic from 'next/dynamic';
import CooperationAgreementTabs from './CooperationAgreementTabs';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
const TabComponent = dynamic(
  () =>
  import('@/components/CooperationAgreementComponents/CooperationAgreementMain'),
  { suspense: true }
);

const CooperationAgreementMain = (props) => {
  const { state: { selectedTabId } } = useContext(CooperationAgreementContext);
  return(
    <div className="">
        <CooperationAgreementTabs {...props}/>
        {selectedTabId ?
              <Suspense fallback={`Loading...`}>
                <TabComponent />
              </Suspense>
          : <> Loading... </>}
    </div>
  );
}

export default CooperationAgreementMain;
