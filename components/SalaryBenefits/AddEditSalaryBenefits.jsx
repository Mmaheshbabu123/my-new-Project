import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createSalaryBenefits, updateSalaryBenefits } from '@/Services/ApiEndPoints'
import { formatDate } from './SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
let dateObj = new Date()
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear()-1;

const AddEditSalaryBenefits = (props) => {
  const router = useRouter();
  const inputRef = useRef({});
  const assignInitialValues = () => {
    if(props.id && props.rows.length)
      return {
        name: props.rows[0]['name']
      , date: props.rows[0]['date']
      , value: props.rows[0]['value']
      }
    else return { name: '', date: '', value: ''}
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
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj) => {
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
              value: state.value
            };
            inputRef.current['date'].value = '';
            stateObj['name'] = '';
            stateObj['date'] = '';
            stateObj['value'] = '';
            stateObj['dateWarning'] = false;
            stateObj['editIndex'] = stateObj['newItems'].length;
        }else {
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
     return value === '' || (new Date(value).getTime() >= new Date(state.minDate).getTime() && new Date(value).getTime() <= new Date(state.maxDate).getTime()) ? false: true
   }
    /**
     * [handleSubmit: function to save and edit employee/coefficient types]
     * @return {[void]} [it wont return anything]
     */
    const handleSubmit = async () => {
      let newItemsList = inertNewItem();
      if(!newItemsList) return;

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
        <span className='actions-span' onClick={() => handleActionClick('edit', item, index)}> <MdEdit /> </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', item, index)}> <MdDelete /> </span>
      </>
    )
  }

  const handleActionClick = (type, item, index) => {
    let stateObj = { ...state };
    if (type === 'edit') {
      stateObj['name']  = item.name;
      stateObj['date']  = item.date;
      stateObj['value'] = item.value;
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
    if(name === 'name') {
        stateObj[name] = value;
        stateObj['nameWarning'] = false;
        stateObj['uniqueError'] = false;
        stateObj['duplicates'] = [];
    } else if (name === 'value') {
        stateObj[name] = value;
    } else {
        stateObj['dateWarning'] = false;
        stateObj[name] = value;
    }
    setState(stateObj);
  }


  if (!state.initialRenderDone) {
    return <></>
  }
  const renderInputFields = () => {
    return (
      <div className='col-md-12 border-form-sec'>
        <div className="salary-input-fields">
          <label className = "mb-2 " htmlFor="name"> {`Salary benefit name`} <span style={{color:'red'}}> * </span></label>
          <input
            ref={ref => inputRef.current['name'] = ref}
            type="text"
            name="name"
            className="form-control col-md-10 pcp_name poppins-regular-18px border-4C4D554D rounded-0"
            value={state.name}
            onChange={(e) => handleChange(e.target)}
            placeholder='Please add salary benefit'
          />
          {state.nameWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning ">
              This field is required.
            </small>}
          {state.uniqueError &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
            </small>}
        </div>
        <div className="salary-input-fields">
          <label className = "mb-2 " htmlFor="name"> {`Salary benefit value`} </label>
          <input
            ref={ref => inputRef.current['value'] = ref}
            type="text"
            name='value'
            className="form-control col-md-10 pcp_name poppins-regular-18px border-4C4D554D rounded-0"
            value={state.value}
            onChange={(e) => handleChange(e.target)}
            placeholder= 'Enter value'
          />
          {state.valueWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              {`It'll accept only numeric/decimal values`}
            </small>}
        </div>
        <div className="salary-input-fields">
          <label className = "mb-2 " htmlFor="name"> {`Date`} </label>
          <input
            ref={ref => inputRef.current['date'] = ref}
            type="date"
            name='date'
            min={state.minDate}
            max={state.maxDate}
            value={state.date}
            className="form-control col-md-10 salary-date pcp_name poppins-regular-18px border-4C4D554D rounded-0"
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
        <h4 className="mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0"> {`${state.editFlow ? 'Edit' : 'Add'} salary benefit`} </h4>
        <div className='row p-0 m-0'>

          <div className="col-md-12 d-flex justify-content-end p-0">
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({...state})}
              type="button"
              style={{marginTop: '0'}}
              className="btn  py-2 btn my-2 skyblue-bg-color border-0 poppins-regular-24px px-5 rounded-0">
              {`+ ADD`}
            </button>
          }
          </div>
          {renderInputFields()}
        </div>
      </div>
      {state.newItems.length > 0 && !state.editFlow &&
        <div className='add-item-div'>
          <table className='table-hover col-md-10 m-3 add-item-table'>
          <thead style={{borderBottom: '1px solid', margin: '15px 0'}}>
            <tr key={'header-row-tr'}>
              {props.headers.map((eachHeader, index) =>
                <th key={`tablecol${index}`} scope="col"> {eachHeader} </th>)}
            </tr>
          </thead>
          <tbody>
            {state.newItems.map((item, index) =>
              <tr key={index} id={index}>
                <td style={{ width: '30%' }}> {item.name} </td>
                <td style={{ width: '30%' }}> {formatDate(item.date) ? formatDate(item.date) : '--'} </td>
                <td style={{ width: '20%' }}> {item.value ? item.value : '--'} </td>
                <td style={{ width: '20%' }}> {getNeededActions(item, index)} </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>}
      <div className=' row m-0 p-0 my-4'>
        <div className='ext-start col-md-6 p-0'>
        <button
          type="button"
          className="bg-white  back-btn-text bg-white  back-btn-text  border-0 poppins-regular-20px"
          onClick={() => router.back()} >
          BACK
        </button>
        </div>
        <div className='col-md-6 text-end p-0'>
        <button
          type="button"
          className="btn btn-secondary rounded-0  custom-btn px-3  btn-block float-end"
          onClick={handleSubmit} >
          SAVE
        </button>
        </div>
      </div>
    </div>
  </>
}
export default React.memo(AddEditSalaryBenefits);
