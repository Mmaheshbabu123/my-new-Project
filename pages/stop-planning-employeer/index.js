import React, { Suspense ,useEffect,useState } from 'react';
import { useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import { APICALL } from '@/Services/ApiServices';
import {getStopPlanningDetails} from '@/Services/ApiEndPoints';
const StopPlanningComponent = dynamic(() => import('@/components/StopPlanning/ManageStopPlanningComponent'), { suspense: true });

const StopPlanningIndex = (props) => {
  const router = useRouter();
  const { entitytype, entityid } = router.query;
  console.log(router.query)


  const [state, setState] = useState({
    editPage: false
    , loaded: false
    , id: undefined
    , companyList: []
    , employeeeList:[]
    , planningData:[]
    , employeerId:0
  });
  useEffect(() => { if(entityid!== undefined) loadData() }, [entityid])
  const loadData = async () => {

      await APICALL.service(getStopPlanningDetails + `${entityid}`, 'GET')
        .then((response) => {
        if(response.status === 200) {
          setState({...state,
            loaded: true,
             companyList:response.data.companyData != undefined ? response.data.companyData:[],
             employeeeList:response.data.employeerData != undefined ? response.data.employeerData:[],
             planningData:response.data.PlanningData != undefined ? response.data.PlanningData :[],
             employeerId:entityid
         })
       }
       }).catch((error) => console.error('Error occurred'));

  }
  return (
    <div>
      <Suspense fallback={`Loading...`}>
          {state.loaded === true ?
            <StopPlanningComponent {...state} />:<div>Loading...</div>}

      </Suspense>
    </div>
  )
}
export default React.memo(StopPlanningIndex);
