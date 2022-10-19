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
    , rows:props.rows
    , editFlow: props.id
    , editUrl:props.manageType == 'employee-types' ? editEmployeeType : editCofficientType
    , createUrl:props.manageType == 'employee-types' ? createEmployeeTypes:createCofficientType
    , newItems: []
    , nameWarning: false
    , editIndex: 0
    , typeName: `${props.manageType === 'employee-types' ? 'employee type' : 'coefficient'}`
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj, nameValue) => {
      let totalRows = stateObj['newItems'].length > 0 ?  stateObj['newItems'] : state.rows;
      if (nameValue.replaceAll(' ', '').length) {
        let duplicates = totalRows.filter((val, index) =>  (index !== state.editIndex && val.name.toLowerCase().replaceAll(' ', '') === state.name.toLowerCase().replaceAll(' ', '')))
        if(duplicates.length) {
            stateObj['uniqueError'] = true;
            stateObj['duplicates'] = duplicates.map(obj => obj.name);
        } else {
          state.editIndex =   state.editIndex === -1 ? 0 :state.editIndex;
          stateObj['newItems'][state.editIndex] = { name: nameValue };
          stateObj['name'] = '';
          stateObj['editIndex'] = stateObj['newItems'].length;
        }
      } else {
        stateObj['nameWarning'] = true;
        stateObj['uniqueError'] = false;
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
            setState({...state, uniqueError: true, nameWarning: false, duplicates: result['data']['duplicates'] });
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
        <span className='actions-span mx-0' onClick={() => handleActionClick('edit', item, index)}> <MdEdit  className="color-skyblue"/> </span>
        <span className='actions-span mx-0' onClick={() => handleActionClick('delete', item, index)}> <MdDelete  className="color-skyblue"/> </span>
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
    <div className='add-edit-types col-md-12'>
      <div className='min-height-AET'>
      <div className="row  p-0 m-0 position-sticky-pc">
       <div className='py-4  px-0'>
       <h4 className="font-weight-bold  bitter-italic-normal-medium-24 px-0"> {`${props.id ? 'Edit ' : 'Add '} ${state.typeName}`} </h4>
       </div>

          <div className='col-md-12 px-0'>
          <label className = "px-0 poppins-regular-18px" htmlFor="name"> {props.manageType === 'employee-types' ? 'Employee type' : 'Coefficient name'} <span style={{color:'red'}}> * </span></label>
        <div className='row m-0 p-0'>
          <div className='col-md-9 col-lg-11 ps-0 pe-4'>
          <input
            ref={inputRef}
            type="text"
            // className="form-control mt-2 mb-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 py-2"
            className="form-control mt-2 input-border-lightgray poppins-regular-18px mh-50 rounded-0 py-2 shadow-none"
            value={state.name}
            onChange={(e) => handleInputChange(e)}
            onKeyUp={(e) => handleAdd(e)}
            placeholder={props.manageType === 'employee-types' ? 'Employee type' : 'Coefficient name'}
          /></div>
          <div className='col-md-3 col-lg-1 pe-0'>
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({ ...state }, state.name)}
              type="button"
              // className="btn btn-block float-right mt-2 mb-2 border-0 rounded-0 float-right mt-2 mb-2 ms-2 skyblue-bg-color py-2 px-3 footer-content w-100 py-2"
              className="btn btn-block float-right mt-2  border-0 rounded-0 float-right mt-2 skyblue-bg-color py-2 px-3 w-100 py-2 shadow-none"
              >
              + {`ADD`}
            </button>
          }
          </div>
        </div>
          </div>

        {state.nameWarning &&
          <small
            className="m-0 p-0 form-text text-muted col-md-5 error_text error">
            {`This field is required.`}
          </small>}
        {state.uniqueError &&
          <small
            className="form-text text-muted col-md-5 error_text error p-0 mt-2">
            {`${state.duplicates.length > 1 ? state.duplicates.join(', ') : state.duplicates[0]} ${state.duplicates.length > 1 ? ' names' : ' name'} already exists`}
          </small>}
      </div>
      {state.newItems.length > 0 && !state.editFlow &&
        <div className='col-md-12 input-border-lightgray mt-3'>
          <table className='table table-hover col-md-12 mb-0 add_employee_table'>
            {state.newItems.map((item, index) =>
              // <tr className=' py-2 table-border-bottom row m-0 col-md-12' Key={index} id={index}>
              <tr className='py-2 row m-0 col-md-12 poppins-light-18px border-bottom' Key={index} id={index}>
                <td className='col-md-9 col-lg-11 align-items-center d-flex' style={{ width: '' }}> {item.name} </td>
                <td className='col-md-3 col-lg-1 text-center ' style={{ width: '' }}> {getNeededActions(item, index)} </td>
              </tr>
            )}
          </table>
        </div>}
        </div>
      <div className='col-md-12 row m-0 mt-4 mb-2'>
        <div className='col-md-6 p-0 align-self-center'>
        <button
          type="button"
          className=" col-2 bg-white border-0 poppins-light-18px text-start  float-sm-right text-left p-0 md-5 text-decoration-underline shadow-none"
          onClick={() => router.back()} >
          BACK
        </button>
        </div>
        <div className='col-md-6 text-end p-0'>
        <button
          type="button"
          className=" btn rounded-0 custom-btn px-3  btn-block float-end poppins-medium-18px-save-button shadow-none"
          onClick={handleSubmit} >
          SAVE
        </button>
        </div>
      </div>
    </div>
  </>
}
export default React.memo(AddEmployeeType);
