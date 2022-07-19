import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import { APICALL } from '@/Services/ApiServices';
import { fetchEmployeeTypes ,fecthCoefficientTypes} from '@/Services/ApiEndPoints';
import TableRenderer from '@/components/employeeTypeComponents/TableRenderer'
import AddEmployeeType from '@/components/employeeTypeComponents/AddEmployeeType'

const ManageType = (props) => {
  const router  = useRouter();
  const [ state, setState ] = useState({rows: [], headers: []})
  const { id, managetype } = router.query;
  const resolvedUrl = router.asPath;

  useEffect(() => { loadData() }, [managetype])
  const loadData = async () => {
    let editId = id ? parseInt(id) : 0;
    if(!managetype) return;
    const manageType = managetype[0];
    const edit = resolvedUrl.includes('edit') || resolvedUrl.includes('add');
    const api_url = manageType ? (manageType !== 'employee-types') ? fecthCoefficientTypes :fetchEmployeeTypes : null;
    if(!manageType) return;
    await APICALL.service(api_url + `${editId ? '/' + editId : ''}`, 'GET')
      .then((response) => {
        setState({...state,
          loaded: true,
          rows: response.status === 200 ? response.data : [],
          headers: [manageType === 'employee-types' ? 'Employee types' : 'Coefficient types', 'Actions'],
          id: editId,
          manageType,
          edit,
       })
     }).catch((error) => console.error('Error occurred'));
  }

  return (
    <>
      <div className='container'>
        <div className='mt-3 md-3'>
          {state.loaded === true ?
          <> {state.edit === true ?
              <AddEmployeeType {...state} />
              : <TableRenderer {...state} />}
          </>: <div>Loading...</div>}
        </div>
      </div>
    </>
  )
}
export default React.memo(ManageType);
