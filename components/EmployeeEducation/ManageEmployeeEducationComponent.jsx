import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { APICALL } from '@/Services/ApiServices';
import { updateEmployeesubmitDetails } from '@/Services/ApiEndPoints';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import ValidateMessage from '@/atoms/validationError';

const ManageEmployeeEducationComponent = (props) => {
  console.log(props);
  const router = useRouter();
  const { webformId,submitId } = router.query;
  console.log({ webformId,submitId })
  const [state, setState] = useState({
    webformId          : props.webformId,
    submitId           : props.submitId,
    experience_aquired : '',
    education_aquired  : '',
    experience_warning_error:false,
    education_warning_error:false,
  })

  // useEffect(() => {
  //   const loadData = async () => {
  //     if(entityid) {
  //       await APICALL.service(`${manageMaxFlexWorkerSalary}`, 'POST', {type: 'show'}).then(response => {
  //         if(response.status === 200) {
  //           setState({...state, data:response.data || {id: 0, max_salary: ''} });
  //         }
  //       }).catch(error => console.error(error))
  //     }
  //   }
  //   loadData();
  // }, [entityid])

  const handleSubmit = async () => {
    const {experience_aquired,education_aquired} = state;
    if(experience_aquired == '' || education_aquired == '') {
      setState({...state,
        experience_warning_error:experience_aquired == '' ? true:false,
        education_warning_error:education_aquired == '' ? true:false,
      });
      return;
    }
    console.log(state);
        await APICALL.service(`${updateEmployeesubmitDetails}`, 'POST', state).then(response => {
          if(response.status === 200) {
            setState({...state, data:response.data || {id: 0, max_salary: ''} });
          }
        }).catch(error => console.error(error))

   }

  const handleChange = (e) => {
    let stateObj = {...state}
    const {value,name} = e.target;
    console.log({name,value})
    setState({
      ...state,
      [name]:value,
    })

  }


    return (
      <div>
        <div className = {`col-md-12`}>
        <LabelField title="Ervaring" customStyle = {{display:''}} className={'poppins-regular-18px'}/>
        <InputField
          type = {'text'}
          className = {'col-md-11 poppins-regular-18px'}
          value={state.experience_aquired}
          name='experience_aquired'
          placeholder={''}
          handleChange={(e)=>handleChange(e)}
         />
         {state.experience_warning_error && <ValidateMessage style={{margin: 0}} text = {'This field is required'}/>}
        </div>
        <div className = {`col-md-12`}>
        <LabelField title="Verworven opleiding" customStyle = {{display:''}} className={'poppins-regular-18px'}/>
        <InputField
          type = {'text'}
          className = {'col-md-11 poppins-regular-18px'}
          value={state.education_aquired}
          name='education_aquired'
          placeholder={''}
          handleChange={(e)=>handleChange(e)}
         />
         {state.education_warning_error && <ValidateMessage style={{margin: 0}} text = {'This field is required'}/>}
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

}

export default ManageEmployeeEducationComponent;
