import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { fetchCompositions } from '@/Services/ApiEndPoints';
import AddEditCompositions from '@/components/CompositionCoefficients/AddEditCompositions';
import CompositionsOverview from '@/components/CompositionCoefficients/CompositionsOverview';

const CompositionsIndex = (props) => {
  const router  = useRouter();
  const {action, id = 0} = router.query;

  const [state, setState] = useState({
    editPage: false
    , loaded: false
    , id: undefined
    , rows: []
    , headers: ['Title', 'Inbegrepen', 'Niet inbegrepen', 'Opmerking', 'Actions'],
  });

  useEffect(() => {
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  const loadData = async () => {
    if(!action) return;
    if(action === 'edit' || action === 'view') {
      let editId = id ? parseInt(id) : 0;
      await APICALL.service(fetchCompositions + `${editId ? '/' + editId : ''}`, 'GET')
        .then((response) => {
          setState({...state,
            loaded: true,
            rows: response.status === 200 ? response.data : [],
            id: editId,
            editPage: editId ? true : false,
         })
       }).catch((error) => console.error('Error occurred'));
    } else {
      setState({...state, editPage: true, loaded: true})
    }
  }
  if(!state.loaded) return <> Loading... </>

  return (
    <>
      <div className='container-fluid'>
        <div className='mt-3 md-3'>
          {state.loaded === true ?
          <> {state.editPage === true ?
              <AddEditCompositions {...state} />
              : <CompositionsOverview {...state} />}
          </>: <div>Loading...</div>}
        </div>
      </div>
    </>
  )
}

export default CompositionsIndex;
