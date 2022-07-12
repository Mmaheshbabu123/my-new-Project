import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const EmployerCooperationAgreementMain = dynamic(
  () =>
  import('@/components/EmployerSv/organisms/EmployerCooperationAgreementMain'),
  { suspense: true }
);

const EMployerCooperationAgreement = (props) => {
  const router = useRouter();
  const { employerid } = router.query;
  if (employerid !== undefined)
    return (
      <div>
        <Suspense fallback={`Loading...`}>
          <EmployerCooperationAgreementMain
              employerid={employerid}
         />
        </Suspense>
      </div>
    )
  else return (<>  </>);
}

export default EMployerCooperationAgreement;
