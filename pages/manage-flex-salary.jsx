import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { manageMaxFlexWorkerSalary } from '@/Services/ApiEndPoints';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import ValidateMessage from '@/atoms/validationError';

const ManageFlexWorkerMaxSalary = (props) => {
  const router = useRouter();
  const { entityid } = router.query;
  const [state, setState] = useState({
    data: {
      id: 0,
      max_salary: ''
    },
    warning: false,
  })

  useEffect(() => {
    const loadData = async () => {
      if(entityid) {
        await APICALL.service(`${manageMaxFlexWorkerSalary}`, 'POST', {type: 'show'}).then(response => {
          if(response.status === 200) {
            setState({...state, data:response.data || {id: 0, max_salary: ''} });
          }
        }).catch(error => console.error(error))
      }
    }
    loadData();
  }, [entityid])

  const handleSubmit = async () => {
    await APICALL.service(`${manageMaxFlexWorkerSalary}`, 'POST',
    {...state.data, type: state.data['id'] ? 'update' : 'create'}).then(response => {
      if(response.status === 200) {
        router.back();
      }
    }).catch(error => console.error(error))
  }

  const handleChange = ({ target: { value } } ) => {
    let stateObj = {...state}
    stateObj['warning'] = value.length ? false : true;
    stateObj['data']['max_salary'] = value;
    setState(stateObj);
  }

  if (entityid !== undefined)
    return (
      <div>
        <div className = {`col-md-12`}>
        <LabelField title="Max salary of flex worker" customStyle = {{display:''}} className={'poppins-regular-18px'}/>
        <InputField
          type = {'text'}
          className = {'col-md-11 poppins-regular-18px'}
          value={state.data['max_salary']}
          placeholder={'Enter max salary of flex worker'}
          handleChange={handleChange}
         />
         {state.warning && <ValidateMessage style={{margin: 0}} text = {'This field is required'}/>}
        </div>
        <div className='col-md-11 my-3 p-0 align-self-center'>
            <button
              type="button"
              className=" col-2 bg-white border-0 poppins-light-18px text-start  float-sm-right text-left p-0 md-5 text-decoration-underline shadow-none"
              onClick={() => router.back()} >
              BACK
            </button>
            <button
              type="button"
              className=" btn rounded-0 custom-btn px-3  btn-block float-end poppins-medium-18px-save-button shadow-none"
              onClick={handleSubmit} >
              SAVE
            </button>
        </div>
      </div>
    )
  else return (<> Loading... </>);
}

export default ManageFlexWorkerMaxSalary;
