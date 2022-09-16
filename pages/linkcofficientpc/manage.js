import {useEffect,useState} from 'react';
import { APICALL } from '@/Services/ApiServices';
import { getCofficientPerPc} from '@/Services/ApiEndPoints';
import TableRenderer from '@/components/LinkingCofficientPc/TableRender';
const ManagePc = (props)=>{
  const [ state, setState ] = useState({rows: [], headers: [], loaded: false})

  useEffect(() => { loadData() }, [])
  const loadData = async () => {
    const api_url = getCofficientPerPc;
    await APICALL.service(api_url, 'GET')
      .then((response) => {
        setState({...state,
          rows: response.status === 200 ? response.data : [],
          loaded: true,
          headers: ['PC number','PC name' , 'Actions'],
       })
     }).catch((error) => console.error('Error occurred'));
  }
  return (
    <>
    <div className='container-fluid man px-0'>
      {/* <div className='mt-3 md-3'> */}
      <div className=' md-3'>
      {state.loaded === true ?
       <TableRenderer {...state} />
       : <div>Loading...</div>}
      </div>
    </div>
    </>
  )
}

export default ManagePc;
