import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createSalaryBenefits, updateSalaryBenefits } from '@/Services/ApiEndPoints'
import { formatDate } from './SalaryBenefitsHelpers';
import RadioField from '@/atoms/RadioField';
import MultiSelectField from '@/atoms/MultiSelectField';
import { salaryBenefitOccurenceOptions } from '@/Constants';
import LabelField from '@/atoms/LabelField';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import ValidateMessage from '@/atoms/validationError';
let dateObj = new Date()
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear()-1;

const AddEditSalaryBenefits = (props) => {
  const router = useRouter();
  const inputRef = useRef({});
  const assignInitialValues = () => {
    if(props.id && props.rows.length) {
      let data = props.rows[0];
      return {
          name: data['name']
        , date: data['date']
        , value: data['value']
        , occurence: data['occurence']
        , valueType: data['value_type']
        , coefficientType: data['coefficient_type']
        , coefficientValue: data['coefficient_value']
        , granted: data['granted']
      }
    }
    else return { name: '', date: '', value: '', occurence: ''
    , valueType: 1
    , coefficientType: 2
    , coefficientValue: '1,15'
    , granted: '' }
  }

  const [state, setState] = useState({
      ...assignInitialValues()
    , editFlow: props.id ? true : false
    , rows    : props.rows
    , newItems: []
    , nameWarning: false
    , editIndex: 0
    , minDate: `${year}-${month < 10 ? '0' + month : month}-${day}`
    , maxDate: `${year + 2}-${month < 10 ? '0' + month : month}-${day - 1}`
    , regexp: /^[0-9,]*$/
    , valueWarning: false
    , coefficientValueWarning: false
    , valueDecimalWarning: false
    , coefficientValueDecimalWarning: false
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj) => {
      const { valueWarning, coefficientValueWarning, valueDecimalWarning, coefficientValueDecimalWarning } = state;
      if(valueWarning || coefficientValueWarning || valueDecimalWarning || coefficientValueDecimalWarning) {
        return;
      }
      let totalRows = stateObj['newItems'].length > 0 ?  stateObj['newItems'] : state.rows;
      if (stateObj['name'].replaceAll(' ', '').length) {
        let duplicates = totalRows.filter((val, index) => (index !== state.editIndex && val.name.toLowerCase().replaceAll(' ', '') === state.name.toLowerCase().replaceAll(' ', '')))
        if(duplicates.length) {
          stateObj['uniqueError'] = true;
          stateObj['duplicates'] = duplicates.map(obj => obj.name);
        } else {
          if(!checkDateFieldValid(state.date)) {
            state.editIndex =   state.editIndex === -1 ? 0 :state.editIndex;
            stateObj['newItems'][state.editIndex] = {
              name: state.name,
              date: state.date,
              value: state.value,
              occurence: state.occurence,
              value_type: state.valueType,
              coefficient_type: state.coefficientType,
              coefficient_value: state.coefficientType === 2 ? state.coefficientValue : '',
              granted: state.granted,
            };
            inputRef.current['date'].value = '';
            stateObj['name'] = '';
            stateObj['date'] = '';
            stateObj['value'] = '';
            stateObj['occurence'] = '';
            stateObj['valueType'] = 1;
            stateObj['coefficientType'] = 2;
            stateObj['coefficientValue'] = '1,15';
            stateObj['granted'] = '';
            stateObj['editIndex'] = stateObj['newItems'].length;
            stateObj['dateWarning'] = false;
        } else {
          stateObj['dateWarning'] = true;
        }
       }
      } else {
        stateObj['nameWarning'] = true;
        stateObj['uniqueError'] = false;
      }
      setState(stateObj);
    }

   const checkDateFieldValid = (value) => {
     return !value || (new Date(value).getTime() >= new Date(state.minDate).getTime() && new Date(value).getTime() <= new Date(state.maxDate).getTime()) ? false: true
   }
    /**
     * [handleSubmit: function to save and edit employee/coefficient types]
     * @return {[void]} [it wont return anything]
     */
    const handleSubmit = async () => {
      let newItemsList = inertNewItem();
      const { valueWarning, coefficientValueWarning, valueDecimalWarning, coefficientValueDecimalWarning } = state;
      if(!newItemsList || valueWarning || coefficientValueWarning || valueDecimalWarning || coefficientValueDecimalWarning) return;
      if ((state.editFlow && !state.name.length) || (!state.editFlow && !newItemsList.length)) {
        setState({ ...state, nameWarning: true });
        return;
      }else if(checkDateFieldValid(state.date)) {
        setState({ ...state, dateWarning: true });
        return;
      }
      let url = state.editFlow ? `${updateSalaryBenefits}/${props.id}` : `${createSalaryBenefits}`;
      await APICALL.service(url, 'POST', getPostData(newItemsList))
        .then((result) => {
          if(result.status === 200) {
            router.push(`/manage-salary-benefits?action=view`);
          } else if (result.status === 205) {
            setState({...state, uniqueError: true, nameWarning:false, duplicates: result['data']['duplicates'] });
          }
        })
        .catch((error) => console.error('Error occurred'));
    }

  const inertNewItem = () => {
    let newItemsList = [...state.newItems];
    const { valueWarning, coefficientValueWarning, valueDecimalWarning, coefficientValueDecimalWarning } = state;
    if(valueWarning || coefficientValueWarning || valueDecimalWarning || coefficientValueDecimalWarning) {
      return;
    }
    let duplicates = newItemsList.filter((val, index) => (index !== state.editIndex && val.name.toLowerCase() === state.name.toLowerCase()))
    if(duplicates.length) {
        let stateObj = {...state};
        stateObj['uniqueError'] = true;
        stateObj['duplicates'] = duplicates.map(obj => obj.name);
        setState(stateObj);
        return 0;
    } else {
      if(state.name.length) {
        newItemsList[state.editIndex] = {
            name: state.name
          , date: state.date
          , value: state.value
          , occurence: state.occurence
          , value_type: state.valueType
          , coefficient_type: state.coefficientType
          , coefficient_value: state.coefficientType === 2 ? state.coefficientValue : ''
          , granted: state.granted
        };
      }
    }
    return newItemsList;
  }

  useEffect(() => {
    setState({ ...state, initialRenderDone: true })
    let timer = setTimeout(() => inputRef.current['name'].focus(), 300);
    return () => clearTimeout(timer)
  }, [])


  const getPostData = (newItemsList = []) => {
    return {
        id: props.id,
        newItems: newItemsList,
    };
  }

  const getNeededActions = (item, index) => {
    return (
      <>
        <span className='actions-span' onClick={() => handleActionClick('edit', item, index)}> <MdEdit className=' color-skyblue '/> </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', item, index)}> <MdDelete className='color-skyblue '/> </span>
      </>
    )
  }

  const handleActionClick = (type, item, index) => {
    let stateObj = { ...state };
    if (type === 'edit') {
      stateObj['name']  = item.name;
      stateObj['date']  = item.date;
      stateObj['value'] = item.value;
      stateObj['occurence'] = item.occurence;
      stateObj['value_type'] = item.value_type;
      stateObj['coefficient_type'] = item.coefficient_type;
      stateObj['coefficient_value'] = item.coefficient_value;
      stateObj['granted'] = item.granted;
      stateObj['editIndex'] = index;
      inputRef.current['date'].value = item.date;
      inputRef.current['name'].focus();
    } else {
      stateObj['newItems'].splice(index, 1)
      stateObj['editIndex'] = stateObj['newItems'].length;
    }
    setState(stateObj);
  }

  const handleChange = (target) => {
    const { value, name } = target;
    let stateObj = {...state};
    if((name ==='value' || name === 'coefficientValue') && !value.match(state.regexp)){
      return;
    }
    if(name ==='value' || name === 'coefficientValue') {
      let numberValue = Number(value.replace(',', '.'));
      let decimals = value.split(',')[1];
      stateObj[`${name}DecimalWarning`] = value.length && decimals && decimals.length > 4 ? true : false;
      stateObj[`${name}Warning`] = value.length && (numberValue > (stateObj['valueType'] === 1 ? 999.999999 : 100) || numberValue < 0.00001) ? true : false;
    }
    stateObj[name] = value;
    stateObj['nameWarning'] = false;
    stateObj['uniqueError'] = false;
    stateObj['duplicates'] = [];
    setState(stateObj);
  }

  const handleRadioSelect = (key, value) => {
    let setObj = {...state}
    if(key === 'coefficientType')
      setObj['coefficientValue'] = value === 2 ? '1,15' : ''
    if(key === 'valueType')
      setObj['value'] = ''
    setObj[key] = value;
    setState(setObj);
  }

  const onSelect = (e) => {
    setState({...state, occurence: Number(e.value)})
  }

  const renderRadioButtons = (label, stateKey, value) => {
    return (
      <RadioField
        customStyle={{margin:'8px 0'}}
        checked = {state[stateKey] === value}
        handleChange = {(e) => handleRadioSelect(stateKey, value)}
        label= {label}
       />
    );
  }

  if (!state.initialRenderDone) {
    return <></>
  }
  const renderInputFields = () => {
    return (
      <div className='col-md-12 border-form-sec px-4'>
        <div className='col-md-6 pb-2 pt-4'>
        <div className="">
          <label className = "mb-2 poppins-regular-18px" htmlFor="name"> {`Salary benefit name`} <span style={{color:'red'}}> * </span></label>
          <input
            ref={ref => inputRef.current['name'] = ref}
            type="text"
            name="name"
            className="form-control col-md-6 width-100 poppins-regular-18px border-4C4D554D rounded-0 shadow-none border-color-addeditsalary-benefits mb-2"
            value={state.name}
            onChange={(e) => handleChange(e.target)}
            placeholder='Please add salary benefit'
          />
          {state.nameWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning error_text mx-0 ">
              Salary benefit name is required
            </small>}
          {state.uniqueError &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
            </small>}
        </div>
        </div>
       <div className='col-md-6 py-2'>
       <div className="col-md-12 row mx-0 px-0">
          <div className="col-md-12 mx-0 px-0">
              <label className = "mb-2 m-0 p-0 poppins-regular-18px" htmlFor="name"> {`Salary benefit value`} </label>
              <div>
                  {renderRadioButtons('value in €', 'valueType', 1)} <br />
                  {renderRadioButtons('value in %', 'valueType', 2)}
              </div>
              <div className="mx-0 px-0 position-relative">
              <input
                ref={ref => inputRef.current['value'] = ref}
                type="text"
                name='value'
                className="form-control col-md-12 poppins-regular-18px border-4C4D554D rounded-0 shadow-none border-color-addeditsalary-benefits"
                value={state.value}
                onChange={(e) => handleChange(e.target)}
                placeholder= 'Enter value'
              />
              <span className="position-absolute" style = {{right: '3%', bottom: '30px'}}> {state.valueType === 1 ? '€' : '%'} </span>
              {state['valueWarning'] && <ValidateMessage style={{margin:0}} text = {`Value should be greater than 0 and less then ${state.valueType === 1 ? 1000 : 100}`}/>} <br />
              {state['valueDecimalWarning'] && <ValidateMessage style={{margin:0}} text = {'Only four decimal places allowed.'}/>}
              </div>
            </div>
          <div className="col-md-12 mx-0 px-0 ">
            <LabelField title="Occurence" className="poppins-regular-18px px-0"/>
            <MultiSelectField
                options={salaryBenefitOccurenceOptions}
                standards={salaryBenefitOccurenceOptions.filter(val => val.value === state.occurence)}
                disabled={false}
                handleChange={onSelect}
                isMulti={false}
                className="col-md-12"
              />
          </div>
        </div>
       </div>
        <div className="col-md-12 row mx-0 px-0 py-2">
          <div className="col-md-6 mx-0 px-0">
            <LabelField title="Applicable coefficient" className="poppins-regular-18px px-0"/>
            {renderRadioButtons('Based on employee type in the cooperation agreement', 'coefficientType', 1)} <br />
            {renderRadioButtons('Other', 'coefficientType', 2)}
            {state.coefficientType === 2 && <input
              type="text"
              name='coefficientValue'
              className="form-control col-md-12 poppins-regular-18px border-4C4D554D rounded-0 shadow-none border-color-addeditsalary-benefits"
              value={state.coefficientValue}
              onChange={(e) => handleChange(e.target)}
              placeholder= 'Enter value'
            />}
            {state['coefficientValueWarning'] && <ValidateMessage style={{margin:0}} text = {`Value should be greater than 0 and less then ${state.valueType === 1 ? 1000 : 100}`}/>} <br />
            {state['coefficientValueDecimalWarning'] && <ValidateMessage style={{margin:0}} text = {'Only four decimal places allowed.'}/>}
          </div>
          <div className="col-md-12 mx-0 px-0">
            <LabelField title="Is the benefit granted in case of absence of the employee" className="poppins-regular-18px px-0"/>
            {renderRadioButtons('Yes', 'granted', 1)} <br />
            {renderRadioButtons('No', 'granted', 0)}
          </div>
        </div>
        <div className="pt-2 pb-4 col-md-6">
          <label className = "mb-3 poppins-regular-18px" htmlFor="name"> {`Start date`} </label>
          <input
            ref={ref => inputRef.current['date'] = ref}
            type="date"
            name='date'
            min={state.minDate}
            max={state.maxDate}
            value={state.date}
            className="form-control col-md-6 salary-date poppins-regular-18px border-4C4D554D rounded-0 shadow-none border-color-addeditsalary-benefits"
            onChange={(e) => handleChange(e.target)}
          />
          {state.dateWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              Date should be between {formatDate(state.minDate)} - {formatDate(state.maxDate)}
            </small>}
        </div>
      </div>
    )
  }

  return <>
    <div className='add-edit-types'>
      <div className="row m-0 p-0">
       <div className='py-4 position-sticky-pc px-0'>
       <h4 className="font-weight-bold  bitter-italic-normal-medium-24 px-0"> {`${state.editFlow ? 'Edit' : 'Add'} salary benefit`} </h4>
       </div>
       <div className='px-0'>
        <div className='col-md-12 float-end'>
        {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({...state})}
              type="button"
              style={{marginTop: '0'}}
              className="btn btn mb-3 skyblue-bg-color border-0  rounded-0 shadow-none float-end col-md-1">
              {`+ ADD`}
            </button>
          }
        </div>
      </div>
        <div className='row p-0 m-0'>
          {renderInputFields()}
        </div>
      </div>
      {state.newItems.length > 0 && !state.editFlow &&
        <div className='add-item-div m-0 w-100 mt-3'>
          <table className='table-hover col-md-11 m-auto my-3 add-item-table'>
          <thead style={{borderBottom: '1px solid', }}>
            <tr key={'header-row-tr'}>
              {props.headers.map((eachHeader, index) =>
                <th key={`tablecol${index}`} scope="col" className='poppins-medium-18px'> {eachHeader} </th>)}
            </tr>
          </thead>
          <tbody>
            {state.newItems.map((item, index) =>
              <tr key={index} id={index}>
                <td style={{ width: '25%' }} className='poppins-regular-18px'> {item.name} </td>
                <td style={{ width: '15%' }} className='poppins-regular-18px'> {item.value ? `${item.value} ${item.value_type === 1 ? '€' : '%'}` : ''} </td>
                <td style={{ width: '25%' }} className='poppins-regular-18px'> {item.occurence ? salaryBenefitOccurenceOptions.filter(val => val.value === item.occurence)[0]['label'] : ''} </td>
                <td style={{ width: '30%' }} className='poppins-regular-18px'> {formatDate(item.date) ? formatDate(item.date) : '--'} </td>
                <td style={{ width: '10%' }} className='poppins-regular-18px'> {getNeededActions(item, index)} </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>}
      <div className=' row m-0 p-0 my-4'>
        <div className='text-start col-md-6 p-0 align-self-center'>
        <button
          type="button"
          className="bg-white border-0 poppins-regular-18px text-decoration-underline px-0 shadow-none"
          onClick={() => router.back()} >
          BACK
        </button>
        </div>
        <div className='col-md-6 text-end p-0'>
        <div className='row justify-content-end'>
          {/* <div className='col-md-4'>
          <div className="">
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({...state})}
              type="button"
              style={{marginTop: '0'}}
              className="btn btn my-2 skyblue-bg-color border-0  px-5 rounded-0 shadow-none">
              {`+ ADD`}
            </button>
          }
          </div>
          </div> */}
          <div className='col-md-2 align-self-center'>
        <button
          type="button"
          className="btn rounded-0 btn-block float-end poppins-medium-18px-next-button shadow-none"
          onClick={handleSubmit} >
          SAVE
        </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  </>
}
export default React.memo(AddEditSalaryBenefits);
