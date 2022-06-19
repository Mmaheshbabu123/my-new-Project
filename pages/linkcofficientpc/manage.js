import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import { APICALL } from '../../Services/ApiServices';
import { getCofficientPerPc} from '../../Services/ApiEndPoints';
import TableRenderer from '@/components/LinkingCofficientPc/TableRender';
const ManagePc = (props)=>{
  const router  = useRouter();
  const [ state, setState ] = useState({rows: [], headers: []})

  const resolvedUrl = router.asPath;

  useEffect(() => { loadData() }, [])
  const loadData = async () => {
    const api_url = getCofficientPerPc;
    await APICALL.service(api_url, 'GET')
      .then((response) => {
        setState({...state,
          rows: response.status === 200 ? response.data : [],
          headers: ['PC number','PC name' , 'Actions'],
       })
     }).catch((error) => console.error('Error occurred'));
  }
  return (
    <>
    <div className='container'>
      <div className='mt-3 md-3'>
       <TableRenderer {...state} />
      </div>
    </div>
    </>
  )
}

export default ManagePc;
