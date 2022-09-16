import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { getCompanyLocationByEmployerId } from '@/Services/ApiEndPoints';
import dynamic from 'next/dynamic'
const ManageQrComponent = dynamic(() => import('@/components/PrintQr/ManageQrComponent'), { suspense: true })

let dateObj = new Date()
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();
var today = `${year}${month < 10 ? '0' + month : month}${day - 1}`
const MangeQrCodeIndex = (props) => {
  const router  = useRouter();
  const { entityid } = router.query;

  const [state, setState] = useState({
      loaded: false
    , id: undefined
    , rows: []
    , headers: ['Company', 'Location', 'Actions']
    , renderComp: 0
  });

  useEffect(() => { loadData() }, [entityid])

  const loadData = async (dateVal = today) => {
    if(!entityid) return;
      await APICALL.service(getCompanyLocationByEmployerId + `/${entityid}/${dateVal}`, 'GET')
        .then((response) => {
          setState({...state,
            loaded: true,
            rows: response.status === 200 ? response.data : [],
            renderComp: state.renderComp + 1
         })
       }).catch((error) => console.error('Error occurred'));
  }
  if(!state.loaded) return <> Loading... </>

  return (
    <>
      <div className='container-fluid'>
        <div className='mt-3 md-3'>
          {state.loaded === true ?
              <Suspense fallback={`Loading...`}>
                <ManageQrComponent props = {state} entityId={entityid} loadData={loadData}/>
              </Suspense> : <div>Loading...</div> }
        </div>
      </div>
    </>
  )
}

export default MangeQrCodeIndex;
