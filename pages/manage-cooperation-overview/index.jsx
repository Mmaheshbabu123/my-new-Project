import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const AdminCooperationAgreementMain = dynamic(() => import('@/components/AbsAdminSv/organisms/AdminCooperationAgreementMain'), { suspense: true });
const EmployerCooperationAgreementMain = dynamic(() => import('@/components/EmployerSv/organisms/EmployerCooperationAgreementMain'), { suspense: true });
const AbsSalesAgenetCooperationAgreementMain = dynamic(() => import('@/components/AbsSalesAgentSv/organisms/AbsSalesAgenetCooperationAgreementMain'), { suspense: true });

const EMployerCooperationAgreement = (props) => {
  const router = useRouter();
  const { entitytype = 1, entityid = 0 } = router.query;
  if (entityid !== undefined) {
    localStorage.setItem("currentLoggedInUserId", entitytype == 1 ? -999 : entityid);
    return (
      <div>
        <Suspense fallback={`Loading...`}>
          {entitytype == 2 ?
            <EmployerCooperationAgreementMain employerid={entityid} /> :
           entitytype == 4 ? <AbsSalesAgenetCooperationAgreementMain agentId={entityid}/> :
            <AdminCooperationAgreementMain adminId={entityid} />
          }
        </Suspense>
      </div>
    )
  }
  else return (<>  </>);
}

export default EMployerCooperationAgreement;
