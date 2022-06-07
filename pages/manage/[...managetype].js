import React from 'react';
import { APICALL } from '../../Services/ApiServices';
import { fetchEmployeeTypes ,fecthCoefficientTypes} from '../../Services/ApiEndPoints';
import TableRenderer from '../../components/employeeTypeComponents/TableRenderer'
import AddEmployeeType from '../../components/employeeTypeComponents/AddEmployeeType'

const ManageType = (props) => {
  console.log(props)
  console.log(fecthCoefficientTypes)
  return props.norender ? <> Not developed yet :)</> :
    <>
      <div className='container'>
        <div className='mt-3 md-3'>
          {props.edit === true ?
            <AddEmployeeType {...props} />
            : <TableRenderer {...props} />
          }
        </div>
      </div>
    </>
}
export default React.memo(ManageType);

export async function getServerSideProps(context) {

  const { params, query,resolvedUrl } = context;
  const id = parseInt(query?.id ?? 0);
  const manageType = params.managetype[0];
  // if (manageType !== 'employee_types')
  //   return { props: { norender: true } }

  const edit = resolvedUrl.includes('edit') || resolvedUrl.includes('add');
  let response = {};
  const api_url = (manageType !== 'employee_types') ? fecthCoefficientTypes :fetchEmployeeTypes;
  await fetch(api_url + `${id ? '/' + id : ''}`)
    .then(re => re.json())
    .then((result) => response = result)
    .catch((error) => window.alert('Error occurred'));

  return {
    props: {
      rows: response.status === 200 ? response.data : [],
      headers: ['name', 'actions'], id, manageType, edit
    }
  }
}
