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
    , newItems: []
    , nameWarning: false
    , editIndex: 0
    , minDate: `${year}-${month < 10 ? '0' + month : month}-${day}`
  })


    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj) => {
      if (stateObj['name'].length) {
        let duplicates = stateObj['newItems'].filter((val, index) => (index !== state.editIndex && val.name.toLowerCase() === state.name.toLowerCase()))
        if(duplicates.length) {
            stateObj['uniqueError'] = true;
            stateObj['duplicates'] = duplicates.map(obj => obj.name);
        } else {
          if(!checkDateFieldValid(state.date)) {
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
      }
      setState(stateObj);
    }

   const checkDateFieldValid = (value) => {
     let miDate = state.minDate;
     console.log({value, miDate});
     return (new Date(value).getTime() >= new Date(state.minDate).getTime() || value === '') ? false: true
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
            setState({...state, uniqueError: true, duplicates: result['data']['duplicates'] });
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
      // if(value.match(/^[a-zA-Z0-9 ]*$/) && value.length <= 50) {
        stateObj[name] = value;
        stateObj['nameWarning'] = false;
        stateObj['uniqueError'] = false;
        stateObj['duplicates'] = [];
      // } else {
        // stateObj['nameWarning'] = true;
     // }
    } else if (name === 'value') {
      // if(value.match(/^[0-9,.]*$/)) {
        stateObj[name] = value;


      // stateObj['valueWarning'] = false;
      // } else {
      // stateObj['valueWarning'] = true;
      // }
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
      <div className='col-md-9'>
        <div className="salary-input-fields">
          <label className = "mb-2 input-label-class" htmlFor="name"> {`Salary benefit name`} <span style={{color:'red'}}> * </span></label>
          <input
            ref={ref => inputRef.current['name'] = ref}
            type="text"
            name="name"
            className="form-control col-md-10 pcp_name"
            value={state.name}
            onChange={(e) => handleChange(e.target)}
            placeholder='Please add salary benefit'
          />
          {state.nameWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              This field is required.
            </small>}
          {state.uniqueError &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
            </small>}
        </div>
        <div className="salary-input-fields">
          <label className = "mb-2 input-label-class" htmlFor="name"> {`Salary benefit value`} </label>
          <input
            ref={ref => inputRef.current['value'] = ref}
            type="text"
            name='value'
            className="form-control col-md-10 pcp_name"
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
          <label className = "mb-2 input-label-class" htmlFor="name"> {`Date`} </label>
          <input
            ref={ref => inputRef.current['date'] = ref}
            type="date"
            name='date'
            min={state.minDate}
            value={state.date}
            className="form-control col-md-10 salary-date pcp_name"
            onChange={(e) => handleChange(e.target)}
          />
          {state.dateWarning &&
            <small
              className="form-text text-muted col-md-5 pcp_name_warning">
              Date should not be earlier than {formatDate(state.minDate)}
            </small>}
        </div>
      </div>
    )
  }

  return <>
    <div className='add-edit-types'>
      <div className="row m-3">
        <h4 className="mb-4"> {`${state.editFlow ? 'Edit' : 'Add'} salary benefit`} </h4>
        <div className='row'>
          {renderInputFields()}
          <div className="col-md-3">
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({...state})}
              type="button"
              style={{marginTop: '0'}}
              className="btn btn-dark pcp_btn">
              {`Add`}
            </button>
          }
          </div>
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
      <div className='managetype-save-btn'>
        <button
          type="button"
          className="btn btn-dark pcp_btn col-2"
          onClick={() => router.back()} >
          Back
        </button>
        <button
          type="button"
          className="btn btn-dark pcp_btn col-2"
          onClick={handleSubmit} >
          Save
        </button>
      </div>
    </div>
  </>
}
export default React.memo(AddEditSalaryBenefits);
