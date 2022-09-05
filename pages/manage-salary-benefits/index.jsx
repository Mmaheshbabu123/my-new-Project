import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { fetchSalaryBenefits } from '@/Services/ApiEndPoints';
import AddEditSalaryBenefits from '@/components/SalaryBenefits/AddEditSalaryBenefits';
import ShowTable from '@/components/SalaryBenefits/ShowTable';

const SalaryBenefits = (props) => {
  const router  = useRouter();
  const {action, id} = router.query;

  const [state, setState] = useState({
    editPage: false
    , loaded: false
    , id: undefined
    , rows: []
    , headers: ['Salary benefits', 'Value', 'Occurence', 'Start date', 'Actions'],
  });

  useEffect(() => { loadData() }, [action])

  const loadData = async () => {
    if(!action) return;
    if(action === 'edit' || action === 'view') {
      let editId = id ? parseInt(id) : 0;
      await APICALL.service(fetchSalaryBenefits + `${editId ? '/' + editId : ''}`, 'GET')
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
              <AddEditSalaryBenefits {...state} />
              : <ShowTable {...state} />}
          </>: <div>Loading...</div>}
        </div>
      </div>
    </>
  )
}

export default SalaryBenefits;
