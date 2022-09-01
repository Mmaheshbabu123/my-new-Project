import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { getCompanyLocationByEmployerId } from '@/Services/ApiEndPoints';
import dynamic from 'next/dynamic'
const ManageQrComponent = dynamic(() => import('@/components/PrintQr/ManageQrComponent'), { suspense: true })

const MangeQrCodeIndex = (props) => {
  const router  = useRouter();
  const { entityid } = router.query;

  const [state, setState] = useState({
      loaded: false
    , id: undefined
    , rows: []
    , headers: ['Company', 'Location', 'Actions'],
  });

  useEffect(() => { loadData() }, [entityid])

  const loadData = async () => {
    if(!entityid) return;
      await APICALL.service(getCompanyLocationByEmployerId + `/${entityid}`, 'GET')
        .then((response) => {
          setState({...state,
            loaded: true,
            rows: response.status === 200 ? response.data : [],
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
                <ManageQrComponent {...state} />
              </Suspense> : <div>Loading...</div> }
        </div>
      </div>
    </>
  )
}

export default MangeQrCodeIndex;
