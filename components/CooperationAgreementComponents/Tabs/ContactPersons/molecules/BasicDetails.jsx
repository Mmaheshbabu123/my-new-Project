import React,{useContext,useState} from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import LabelField from '@/atoms/LabelField';
import InputField from '@/atoms/InputTextfield';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import RequiredField from '@/atoms/RequiredSpanField';
import { requiredFields} from '../../../RequiredFields';
import ValidateMessage from '@/atoms/validationError';
import styles from '../Contactperson.module.css';
import DateField from '@/atoms/DateField';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import {locationArray,contactArray,contactPersonsRow1,contactPersonsRow2,defaultFileds} from '../ContactPersonsFields';
const BasicDetails= (props) => {
var Title_key = 25;
var Location_key = 36;
var Contack_key =  37;
  const {state,updateStateChanges} = useContext(CooperationAgreementContext);
  const TAB_ID = 3;
  const stateKey = 'tab_3';
  var { tab_3: {  contactSelectedDetails },contactPersonsDetails,filledTabs,selectedTabId,tab_3 } = state;
  const [ compState, setCompState ] = useState({
      expand: {},

  })
  console.log(tab_3)
  let defaultOptions = [];
   defaultOptions[Location_key] = state.defaultOptions['locationObj'] || [];
   defaultOptions[Contack_key]  =  [
     {value: '1', label: 'Contact1'},
     {value: '2', label: 'Contact2'},
   ];
  const handleChange = (personId,event) => {
    const { value, name } = event.target;
    tab_3['contactPersonsDetails'][personId][name] = value;
    //{...tab_3,[name]:value};
    updateStateChanges({ tab_3 });
  }
  const handleSelect = (obj,key,personId) => {
    tab_3['contactPersonsDetails'][personId][key]  = obj.value;
    updateStateChanges({ tab_3 });
  }
  const handleRadioSelect = (key,type,personId) => {

   tab_3['contactPersonsDetails'][personId][key] = type;
   updateStateChanges({tab_3});
  }
  const showContactDetailsOfEachPId = (val, index) => {
    const { expand } = compState;
    return(
    <div className='basic_details'>
        <div key = {val.pc_id} className={`${styles['expand-minimize-div']}`}>
        <div className='mb-3'>
          <span onClick={() => expandMinimizeDiv(val.person_id)} title={expand[val.person_id] === true ? 'Close' : 'Open'} className={`${styles['expand-minimize-span']} close_open_basic_details`} > {!expand[val.person_id] ? <FaRegMinusSquare />: <FaRegPlusSquare />} </span>
          <div  onClick={() => expandMinimizeDiv(val.person_id)} className={`${styles['expand-minimize-box']} poppins-medium-18px p-1 opacity-100-basic-details`}> <span> {val.person_name} </span> </div>
          <span onClick={() => props.onDelete(val.person_id, index)} title={'Delete'} className={`${styles['expand-minimize-span']} opacity-100-basic-details`}> <TiDelete /> </span>
        </div>
        {!expand[val.person_id] ? <div className={`${styles['salay-content-div']}`}>
              {showContactContent(val.person_id)}
        </div>:null}
      </div>
    </div>
    );
  }
  const showContactContent = (personId) => {
    //let salaryDataArray = salaryDataPerPc[pcId] || [];
    let tableHtmlContent = [];
    tableHtmlContent.push(
     <div className='row'>
        <div className="col-md-12 px-5 py-3">
      <div className = {`col-md-12 ${styles['add-div-margings']}`}>
          <LabelField title={'Title'} customStyle = {{display:''}} className={'poppins-regular-18px'}/>{requiredFields['tab_3'][Title_key] && <RequiredField />}
          <div className='poppins-regular-18px'>
           <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px `} onClick={() => handleRadioSelect(Title_key,1,personId)}> {Number(tab_3['contactPersonsDetails'][personId][Title_key]) === 1 ? <IoMdRadioButtonOn className="radio_button"/> : <IoMdRadioButtonOff />} {'Mr'}</label>
           <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px radio_button`} onClick={() => handleRadioSelect(Title_key,2,personId)}> {Number(tab_3['contactPersonsDetails'][personId][Title_key]) === 2 ? <IoMdRadioButtonOn className="radio_button" /> : <IoMdRadioButtonOff  />} {'Mrs'}</label>
        {/*  <RadioField   name = {Title_key} checked = {Number(tab_3['contactPersonsDetails'][personId][Title_key]) === 1} handleChange = {(e)=>handleRadioSelect(Title_key,1,personId)} label= {'Mr'} />
          <RadioField  name = {Title_key} checked = {Number(tab_3['contactPersonsDetails'][personId][Title_key]) === 2} handleChange = {(e)=>handleRadioSelect(Title_key,2,personId)} label= {'Mrs'} /> */}
          </div>
          {tab_3['contactPersonsDetails'][personId]['required'][Title_key] !== undefined && !tab_3['contactPersonsDetails'][personId]['required'][Title_key] &&
           <ValidateMessage text = {'This field is required'}/>
         }
      </div>
       <div className='row'>
       <div className = 'col-md-6'>

      {ConstructHtmlData(contactPersonsRow1,personId)}
      </div>
      <div className = 'col-md-6'>
      {ConstructHtmlData(contactPersonsRow2,personId)}

      </div>
       </div>
      </div>
     </div>
    );
      return tableHtmlContent;
  }
  const expandMinimizeDiv = (personId) => {
    let expand = {...compState.expand };
    expand[personId] = !expand[personId];
    setCompState({...compState, expand: expand})
  }
  const ConstructHtmlData = (ContactPersonRow,personId) => {
   let fieldData = [];
    ContactPersonRow.filter(data=>{
      if(data.type === 1) {
      fieldData.push(
        <div className = {`col-md-12 ${styles['add-div-margings']}`}>
        <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'}/> {requiredFields['tab_3'][data.id] && <RequiredField />}
        <InputField
        id = {data.id}
          type = {'text'}
          className = {'col-md-12 poppins-regular-18px'}
          value={tab_3['contactPersonsDetails'][personId][data.id] }
          isDisabled= {false}
          placeholder={''}
          handleChange={(e)=>handleChange(personId,e)}
          name={data.id}
          //{`tab_2_${data.id}`}
         />
         {tab_3['contactPersonsDetails'][personId]['validations'][data.id] && tab_3['contactPersonsDetails'][personId]['validations'][data.id]['validate'] &&
           <ValidateMessage text = {'This field is invalid'}/>
         }
         { tab_3['contactPersonsDetails'][personId]['required'][data.id] !== undefined && !tab_3['contactPersonsDetails'][personId]['required'][data.id] &&
          <ValidateMessage text = {'This field is required'}/>
        }
        </div>
      )
    }
    else if (data.type === 6) {
    fieldData.push(
      <div className = {`col-md-12 ${styles['add-div-margings']}`}>
          <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
          <div>
           <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleRadioSelect(data.id,1,personId)}> {Number(tab_3['contactPersonsDetails'][personId][data.id]) === 1 ? <IoMdRadioButtonOn className="radio_button"/> : <IoMdRadioButtonOff />} {data.option1}</label>
           <label className = {`${styles['salary-input-radio-label']} poppins-regular-18px`} onClick={() => handleRadioSelect(data.id,2,personId)}> {Number(tab_3['contactPersonsDetails'][personId][data.id]) === 2 ? <IoMdRadioButtonOn className="radio_button" /> : <IoMdRadioButtonOff />} {data.option2}</label>
          {/*<RadioField   name = {data.id} checked = {Number(tab_3['contactPersonsDetails'][personId][data.id]) === 1} handleChange = {(e)=>handleRadioSelect(data.id,1,personId)} label= {data.option1} />
          <RadioField  name = {data.id} checked = {Number(tab_3['contactPersonsDetails'][personId][data.id]) === 2} handleChange = {(e)=>handleRadioSelect(data.id,2,personId)} label= {data.option2} />*/}
          </div>
      </div>
    )
  } else if(data.type === 8) {
  fieldData.push(
    <div className='location_basic_details'>
    <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
    <MultiSelectField
        id={data.id}
        options={defaultOptions[data.id]}
        standards={defaultOptions[data.id].filter(val => val.value === Number(tab_3['contactPersonsDetails'][personId][data.id]))}
        disabled={false}
        handleChange={(obj) => handleSelect(obj, data.id,personId)}
        isMulti={false}
        className="col-md-12"
      />
      {tab_3['contactPersonsDetails'][personId]['required'][data.id] !== undefined && !tab_3['contactPersonsDetails'][personId]['required'][data.id] &&
       <ValidateMessage text = {'This field is required'}/>
     }
      </div>
    )
  }
  else if(data.type === 5) {
fieldData.push(
    <div className="">
          <LabelField title={data.key_name} customStyle = {{display:''}} className={'poppins-regular-18px'}/>{requiredFields['tab_3'][data.id] && <RequiredField />}
          <DateField
             id={data.id}
             isDisabled= {false}
             placeholder={'date'}
             handleChange={(e)=>handleChange(personId,e)}
             className="col-md-12 poppins-regular-18px"
             name = {data.id}
             value={tab_3['contactPersonsDetails'][personId][data.id] || ''}
            />
            { tab_3['contactPersonsDetails'][personId]['required'][data.id] !== undefined && !tab_3['contactPersonsDetails'][personId]['required'][data.id] &&
             <ValidateMessage text = {'This field is required'}/>
           }
      </div>
    )
  }
    })
    return fieldData;
  }

  return (
    <div className={''}>
      {contactSelectedDetails.map((val, index) => showContactDetailsOfEachPId(val, index))}
    </div>

  )
}

export default React.memo(BasicDetails);
