import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
const LinkCoeffEmpStates = dynamic(() => import('../../Contexts/LinkCoeffEmp/LinkCoeffEmpStates'), { ssr: false });
const LinkCoeffEmpComponent = dynamic(() => import('../../components/LinkCoeffEmpComponents/LinkCoeffEmpComponent'), { ssr: false });


const LinkCoefficientEmployeetype = () => {
  const router = useRouter();
  const { pcid } = router.query;
  if (pcid !== undefined)
    return (
      <LinkCoeffEmpStates>
        <LinkCoeffEmpComponent pcid={pcid} router={router} />
      </LinkCoeffEmpStates>
    )
  else return (<>  </>);
}

export default LinkCoefficientEmployeetype;
