import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import LabelField from '@/atoms/LabelField';
import TimePicker from 'rc-time-picker';
import { APICALL } from '@/Services/ApiServices';
import 'rc-time-picker/assets/index.css';
import {postStopPlanningDetails} from '@/Services/ApiEndPoints';
import customAlert from '@/atoms/customAlert';

import moment from "moment";
const StopPlanning = (props) => {
  console.log(props)
  const router = useRouter();
  console.log(router);
const [state,setState] = useState({
  companyList:props.companyList,
  companyId:0,
  employeeeList:[],
  employeeListOption:props.employeeeList,
  employeeId:[],
  emloyeerId:props.employeerId,
  stopDate:'',
  hours: '00',
  minutes:'00',
  planningData:props.planningData,
  planningDate:moment().format('YYYY-MM-DD'),
  startTime:'',
  selectedPlanning:[],
  type:0,
  startTimeWarning:false,
  startStopDisable:false,

});
const onSelect = (e,type) => {
  if(type === 'company') {
    let empList = state.employeeListOption.filter(val => val.company_id === Number(e.value))
   setState({...state, companyId: Number(e.value),employeeeList:empList,employeeId:''})
 }else {
   console.log(state);
   let planntype = 0;
   let employeeId = Number(e.value);
   let planningObj = state.planningData.filter(val=>val.comp_id === Number(state.companyId) && val.employee_id === Number(employeeId));
   console.log(planningObj)
   const selectedPlanningObj= [];
   if(planningObj.length > 0 ) {
    [selectedPlanningObj] = planningObj;
   planntype = selectedPlanningObj.planning_worked_id !== null ? 2:1;
   console.log(planntype)
 }else {
     customAlert('error', 'No planning scheduled for this employee', 2500);
 }
  setState({...state, employeeId: Number(e.value),type:planntype,selectedPlanning:selectedPlanningObj})
 }
}
const handleChange = (target) => {
  const { value, name } = target;
}
const updatetime = (e) => {
  let timeObj = e != null ? moment(e.format('YYYY-MM-DD HH:mm:ss')) : '';
  console.log(moment(timeObj).format('HH:mm'))
 setState({...state, startTime:timeObj})
}
const handleSubmit = async (type) => {
  if(state.startTime === '') {
    setState({...state,startTimeWarning:true});
    return;
  }
  await APICALL.service(postStopPlanningDetails, 'POST', getPostData())
    .then((result) => {
      let bothSigned = result.data.bothSigned;
      console.log(bothSigned);
      if(bothSigned && result.status === 200) {

        setState({...state,startTimeWarning:false,startStopDisable:true});
        customAlert('success', 'successfully added', 2500);
        //router.reload();
      }else if(bothSigned  === 0 && result.status === 200){
        customAlert('error', 'We notice you have a werkpostfiche which is not signed.', 2500);

      }

      else if (result.status === 205) {
          customAlert('error', 'Error while saving record', 2500);

      }
    })
    .catch((error) => console.error('Error occurred'));

}

const getPostData = () => {
  return {
      type         : state.type,
      employeeId   : state.employeeId,
      employeerId  : state.emloyeerId,
      companyId    : state.companyId,
      date         : state.planningDate,
      time         : moment(state.startTime).format('HH:mm'),
      pefId        : state.selectedPlanning['pef_id'],
      paId         : state.selectedPlanning['planning_actual_id'],
      pwId         : state.selectedPlanning['planning_worked_id'],
      planngId     : state.selectedPlanning['planning_id'],
      pcId         : state.selectedPlanning['pc_id'],
      functionId   : state.selectedPlanning['function_id'],
  };
}
console.log(state);
return(
  <div className='add-edit-types'>
    <div className="row m-0 p-0">
     <div className='py-4  px-0 mb-3'>
     <h4 className="font-weight-bold  bitter-italic-normal-medium-24 px-0"> {`start/stop planning by employer`} </h4>
     <div className="col-md-12 row">
       <div className = 'col-md-6'>
           <div className="col-md-12 mx-0 px-0 ">
             <LabelField title="Company" className="custom_astrick poppins-regular-18px"/>
             <MultiSelectField
                 options={state.companyList}
                 standards={state.companyList.filter(val => val.value === state.companyId)}
                 disabled={false}
                 handleChange={(obj) => onSelect(obj,'company')}
                 isMulti={false}
                 className="col-md-12"
               />
           </div>
           <div className="col-md-12 mx-0 px-0 ">
             <LabelField title="Employee" className="custom_astrick poppins-regular-18px"/>
             <MultiSelectField
                 options={state.employeeeList}
                 standards={state.employeeeList.filter(val => val.value === state.employeeId)}

                 handleChange={(obj) => onSelect(obj,'employee')}
                 isMulti={false}
                 className="col-md-12"
               />
           </div>
           <button onClick={() => router.back()} type="button" className="bg-white border-0 poppins-regular-18px float-sm-right mt-3 mb-5 px-0 text-decoration-underline text-uppercase">
             {`Back`}
           </button>
        </div>
        <div className = 'col-md-6'>
            <div className="pt-2 pb-4 col-md-6">
              <label className = "mb-3 poppins-regular-18px" htmlFor="name"> {`Date`} </label>
              <input
                type="date"
                name='planningDate'
                disabled={true}
                value={state.planningDate}
                className="form-control col-md-6 salary-date poppins-regular-18px border-4C4D554D rounded-0 shadow-none border-color-addeditsalary-benefits"
                onChange={(e) => handleChange(e.target)}
              />
              </div>
              <div className="col-md-4  py-3">
              <div className='d-flex'>
              <div className="py-1 px-2  custom_astrick poppins-regular-20px">Time</div>
              <TimePicker
                placeholder="Select Time"
                use12Hours={false}
                showSecond={false}
                focusOnOpen={true}
                format="HH:mm"
                value={state.startTime?state.startTime:null}
                onChange={(e) => updatetime(e)}
              />

             </div>
             {state.startTimeWarning &&
               <small
                 className="form-text text-muted col-md-5 pcp_name_warning error_text mx-0 ">
                 Time is required
               </small>}
             </div>
             </div>
        </div>

     </div>

     <div className='row col-md-6'>
      <div className='col-md-12 '>
          {state.type === 1 && <button
            onClick={() => handleSubmit(1)}
            type="button"
            style={{marginTop: '0'}}
            disabled={state.startStopDisable}
            className="btn btn my-2 skyblue-bg-color border-0  px-5 rounded-0 shadow-none float-end">
            {` START`}
          </button>}
      </div>
      <div className='col-md-12 '>
        {state.type === 2 &&  <button
            onClick={() => handleSubmit(2)}
            type="button"
            disabled={state.startStopDisable}
            style={{marginTop: '0'}}
            className="btn btn my-2 skyblue-bg-color border-0  px-5 rounded-0 shadow-none float-end">
            {` STOP`}
          </button> }
      </div>

    </div>
  </div>
  </div>
)
}
export default React.memo(StopPlanning);
