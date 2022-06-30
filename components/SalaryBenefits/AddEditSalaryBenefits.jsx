import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createSalaryBenefits, updateSalaryBenefits } from '@/Services/ApiEndPoints'
import { formatDate } from './SalaryBenefitsHelpers';
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
let dateObj = new Date()
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
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
        stateObj['newItems'][state.editIndex] = {
          name: state.name,
          date: state.date,
          value: state.value
        };
        inputRef.current['date'].value = '';
        stateObj['name'] = '';
        stateObj['date'] = '';
        stateObj['value'] = '';
        stateObj['editIndex'] = stateObj['newItems'].length;
      } else {
        stateObj['nameWarning'] = true;
      }
      setState(stateObj);
    }

    /**
     * [handleSubmit: function to save and edit employee/coefficient types]
     * @return {[void]} [it wont return anything]
     */
    const handleSubmit = async () => {
      let newItemsList = inertNewItem();
      if ((state.editFlow && !state.name.length) || (!state.editFlow && !newItemsList.length)) {
        setState({ ...state, nameWarning: true });
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
    if(state.name.length) {
      newItemsList[state.editIndex] = {
          name: state.name
        , date: state.date
        , value: state.value
      };
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
      if(new Date(value).getTime() > new Date(state.minDate).getTime()) {
        stateObj[name] = value;
        stateObj['dateWarning'] = false;
      } else {
        inputRef.current['date'].value = '';
        stateObj['dateWarning'] = value === '' ? false : true;
      }
      if(value === '') {
        stateObj[name] = value;
      }
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
          <label className = "mb-2 input-label-class" htmlFor="name"> {`Salary benefit name`} </label>
          <input
            ref={ref => inputRef.current['name'] = ref}
            type="text"
            name="name"
            className="form-control col-md-10"
            id="pcp_name"
            value={state.name}
            onChange={(e) => handleChange(e.target)}
            placeholder='Enter name'
          />
          {state.nameWarning &&
            <small
              id="pcp_name_warning"
              className="form-text text-muted col-md-5">
              Enter only alpha-numeric values with less than 50 characters
            </small>}
          {state.uniqueError &&
            <small
              id="pcp_name_warning"
              className="form-text text-muted col-md-5">
              {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
            </small>}
        </div>
        <div className="salary-input-fields">
          <label className = "mb-2 input-label-class" htmlFor="name"> {`Salary benefit value`} </label>
          <input
            ref={ref => inputRef.current['value'] = ref}
            type="text"
            name='value'
            className="form-control col-md-10"
            id="pcp_name"
            value={state.value}
            onChange={(e) => handleChange(e.target)}
            placeholder= 'Enter value'
          />
          {state.valueWarning &&
            <small
              id="pcp_name_warning"
              className="form-text text-muted col-md-5">
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
            className="form-control col-md-10 salary-date"
            id="pcp_name"
            onChange={(e) => handleChange(e.target)}
          />
          {state.dateWarning &&
            <small
              id="pcp_name_warning"
              className="form-text text-muted col-md-5">
              Date should not be before {state.minDate}
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
              style={{marginTop: '60px'}}
              className="btn btn-dark pcp_btn">
              {`+ Add another`}
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
                <td style={{ width: '30%' }}> {formatDate(item.date)} </td>
                <td style={{ width: '20%' }}> {item.value} </td>
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
