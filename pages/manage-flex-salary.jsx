import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { manageMinFlexWorkerSalary } from '@/Services/ApiEndPoints';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import ValidateMessage from '@/atoms/validationError';

const ManageFlexWorkerMinSalary = (props) => {
  const router = useRouter();
  const { entityid } = router.query;
  const [state, setState] = useState({
    data: {
      id: 0,
      min_salary: '',
    },
    regexp: /^[0-9,.]*$/,
    warning: false,
    valueError: false,
  })

  useEffect(() => {
    const loadData = async () => {
      if(entityid) {
        await APICALL.service(`${manageMinFlexWorkerSalary}`, 'POST', {type: 'show'}).then(response => {
          if(response.status === 200) {
            let data = response.data ? {...response.data, min_salary: response.data['min_salary'] || '' } : {id: 0, min_salary: ''}
            setState({...state, data });
          }
        }).catch(error => console.error(error))
      }
    }
    loadData();
  }, [entityid])

  const handleSubmit = async () => {
    if(validateBeforeSave()) return;
    await APICALL.service(`${manageMinFlexWorkerSalary}`, 'POST',
    {...state.data, type: state.data['id'] ? 'update' : 'create'}).then(response => {
      if(response.status === 200) {
        router.back();
      }
    }).catch(error => console.error(error))
  }

  const validateBeforeSave = () => {
    let status = false;
    if(!state.data['min_salary'].trim().length) {
      status = true;
      setState({...state, warning: true })
    }
    if(state.warning || state.valueError)
      status = true;
    return status;
  }

  const handleChange = ({ target: { value } } ) => {
    let trimmedValue = value.trim();
    let stateObj = {...state}
    if(checkDecimalPointError(trimmedValue)) return ;
    let inputVal = Number(trimmedValue.replaceAll(',', '.'));
    stateObj['warning'] = !trimmedValue.length;
    if (trimmedValue.match(stateObj['regexp'])) {
      stateObj['data']['min_salary'] = trimmedValue;
      stateObj['valueError'] = trimmedValue.length ? (inputVal <= 100 && inputVal > 0) ? false : true : false;
    }
    setState(stateObj);
  }

  const checkDecimalPointError = (value) => {
    let status = false;
    if(value) {
      let inputVal = value.replace(',', '.');
      let decimals = inputVal.split('.')[1];
      status =  decimals && decimals.length > 2 ? true : false;
    }
    return status;
  }

  if (entityid !== undefined)
    return (
      <div>
        <div className='py-4 position-sticky-pc px-0'>
          <h4 className='font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`Add minimum salary of flex worker`} </h4>
        </div>
        <div className = {`col-md-12 flex-min-height`}>
        <LabelField title="Minimum salary of flex worker" mandotory={true} customStyle = {{display:''}} className={'poppins-regular-18px px-0'}/>
        <InputField
          type = {'text'}
          className = {'col-md-11 poppins-regular-18px'}
          value={state.data['min_salary']}
          placeholder={'Enter minimum salary of flex worker (0 - 100)'}
          handleChange={handleChange}
         />
         {state.warning && <ValidateMessage style={{margin: 0}} text = {'This field is required.'}/>}
         {state.valueError && <ValidateMessage style={{margin: 0}} text = {'Value should be greater than 0 and less than or equal to 100.'}/>}
        </div>
       <div className='row'>
       <div className='col-md-11 mt-3 p-0 align-self-center'>
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
      </div>
    )
  else return (<> Loading... </>);
}

export default ManageFlexWorkerMinSalary;
