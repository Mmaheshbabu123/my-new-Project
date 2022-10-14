import React, { Suspense ,useEffect,useState } from 'react';
import { useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import { APICALL } from '@/Services/ApiServices';
import {getStopPlanningDetails} from '@/Services/ApiEndPoints';
const EmployeeEducationComponent = dynamic(() => import('@/components/EmployeeEducation/ManageEmployeeEducationComponent'), { suspense: true });

const EmployeeEducationIndex = (props) => {
  const router = useRouter();
  const { webformId,submitId } = router.query;
  console.log(router.query)


  const [state, setState] = useState({
    editPage: false
    , loaded: false
    , webformId:''
    , submitId:''
  });
  useEffect(() => { if(submitId!== undefined) loadData() }, [submitId,webformId])
  const loadData = async () => {
   console.log('jjjjjjjj')
    setState({
      webformId:webformId,
      submitId:submitId,
      loaded:true
    })


  }
  console.log(state)
  return (
    <div>
      <Suspense fallback={`Loading...`}>
      {state.loaded === true ?
        <EmployeeEducationComponent {...state} />:<div>Loading...</div>}


      </Suspense>
    </div>
  )
}
export default React.memo(EmployeeEducationIndex);
