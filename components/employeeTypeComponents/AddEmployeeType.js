import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createEmployeeTypes, createCofficientType} from '@/Services/ApiEndPoints'
import { editEmployeeType ,editCofficientType} from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';


const AddEmployeeType = (props) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [state, setState] = useState({
      name: props.id ? props.rows[0]['name'] : ''
    , editFlow: props.id
    , editUrl:props.manageType == 'employee-types' ? editEmployeeType : editCofficientType
    , createUrl:props.manageType == 'employee-types' ? createEmployeeTypes:createCofficientType
    , newItems: []
    , nameWarning: false
    , editIndex: 0
    , typeName: `${props.manageType === 'employee-types' ? 'employee type name' : 'coefficient name'}`
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj, nameValue) => {
      if (nameValue.length) {
        let duplicates = stateObj['newItems'].filter((val, index) => (index !== state.editIndex && val.name.toLowerCase() === state.name.toLowerCase()))
        if(duplicates.length) {
            stateObj['uniqueError'] = true;
            stateObj['duplicates'] = duplicates.map(obj => obj.name);
        } else {
          stateObj['newItems'][state.editIndex] = { name: nameValue };
          stateObj['name'] = '';
          stateObj['editIndex'] = stateObj['newItems'].length;
        }
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
      if(!newItemsList) return;
      if ((state.editFlow && !state.name.length) || (!state.editFlow && !newItemsList.length)) {
        setState({ ...state, nameWarning: true });
        return;
      }
      let url = state.editFlow ? `${state.editUrl}/${props.id}` : `${state.createUrl}`;
      await APICALL.service(url, 'POST', getPostData(newItemsList))
        .then((result) => {
          if(result.status === 200) {
            router.push(`${props.manageType}`);
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
        newItemsList[state.editIndex] = {name: state.name};
      }
    }
    return newItemsList;
  }

  useEffect(() => {
    setState({ ...state, initialRenderDone: true })
    let timer = setTimeout(() => inputRef.current.focus(), 150);
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { value } = e.target;
    setState({ ...state, name: value, nameWarning: false, uniqueError: false, duplicates: [] })
  }

  const handleAdd = ({ key, target: { value } }) => {
    let stateObj = { ...state }
    if (!state.editFlow) {
      if (key === 'Enter') {
        addItemAndUpdateIndex(stateObj, value)
        return;
      } else stateObj['name'] = value;
      setState(stateObj)
    }
  }

  const getPostData = (newItemsList = []) => {
    return {
        id: props.id,
        name: state.name,
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

  const handleActionClick = (type, item, index,) => {
    let stateObj = { ...state };
    if (type === 'edit') {
      stateObj['name'] = item.name;
      stateObj['editIndex'] = index;
      inputRef.current.focus();
    } else {
      stateObj['newItems'].splice(index, 1)
      stateObj['editIndex'] = stateObj['newItems'].length;
    }
    setState(stateObj);
  }
  if (!state.initialRenderDone) {
    return <></>
  }

  return <>
    <div className='add-edit-types'>
      <div className="row m-3">
        <h4 className="mb-4"> {`${props.id ? 'Edit ' : 'Add '} ${state.typeName}`} </h4>
        <label className = "mb-3" htmlFor="name"> {props.manageType === 'employee-types' ? 'Employee type' : 'Coefficient'} <span style={{color:'red'}}> * </span></label>
        <div className='row'>
          <input
            ref={inputRef}
            type="text"
            className="form-control col-7 pcp_name"
            value={state.name}
            onChange={(e) => handleInputChange(e)}
            onKeyUp={(e) => handleAdd(e)}
            placeholder={`Please enter ${state.typeName}`}
          />
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({ ...state }, state.name)}
              type="button"
              className="btn btn-dark pcp_btn col-3">
              {`Add`}
            </button>
          }
        </div>
        {state.nameWarning &&
          <small
            className="m-0 form-text text-muted col-md-5 pcp_name_warning">
            {`This field is required.`}
          </small>}
        {state.uniqueError &&
          <small
            className="form-text text-muted col-md-5 pcp_name_warning">
            {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
          </small>}
      </div>
      {state.newItems.length > 0 && !state.editFlow &&
        <div className='add-item-div'>
          <table className='table-hover col-md-10 m-3 add-item-table'>
            {state.newItems.map((item, index) =>
              <tr Key={index} id={index}>
                <td style={{ width: '80%' }}> {item.name} </td>
                <td style={{ width: '20%' }}> {getNeededActions(item, index)} </td>
              </tr>
            )}
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
export default React.memo(AddEmployeeType);
