import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import LinkCoeffEmpStates from '../../Contexts/LinkCoeffEmp/LinkCoeffEmpStates';
import LinkCoeffEmpComponent from '@/components/LinkCoeffEmpComponents/LinkCoeffEmpComponent';

const LinkCoefficientEmployeetype = () => {
  const router = useRouter();
  const { pcid } = router.query;
  if (pcid !== undefined)
    return (
      <LinkCoeffEmpStates>
        <Suspense fallback={`Loading...`}>
          <LinkCoeffEmpComponent pcid={pcid} router={router} />
        </Suspense>
      </LinkCoeffEmpStates>
    )
  else return (<>  </>);
}

export default LinkCoefficientEmployeetype;
