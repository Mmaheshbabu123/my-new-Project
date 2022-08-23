import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const AdminCooperationAgreementMain = dynamic(() => import('@/components/AbsAdminSv/organisms/AdminCooperationAgreementMain'), { suspense: true });
const EmployerCooperationAgreementMain = dynamic(() => import('@/components/EmployerSv/organisms/EmployerCooperationAgreementMain'), { suspense: true });
const AbsSalesAgenetCooperationAgreementMain = dynamic(() => import('@/components/AbsSalesAgentSv/organisms/AbsSalesAgenetCooperationAgreementMain'), { suspense: true });

const EMployerCooperationAgreement = (props) => {
  const router = useRouter();
  const { type, id } = router.query;
  if (id !== undefined) {
    localStorage.setItem("currentLoggedInUserId", id);
    return (
      <div>
        <Suspense fallback={`Loading...`}>
          {type === 'employer' ?
            <EmployerCooperationAgreementMain employerid={id} /> :
           type === 'sales_agent' ? <AbsSalesAgenetCooperationAgreementMain agentId={id}/> :
            <AdminCooperationAgreementMain adminId={id} />
          }
        </Suspense>
      </div>
    )
  }
  else return (<>  </>);
}

export default EMployerCooperationAgreement;
