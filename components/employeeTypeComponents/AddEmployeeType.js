import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createEmployeeTypes, createCofficientType} from '../../Services/ApiEndPoints'
import { editEmployeeType ,editCofficientType} from '../../Services/ApiEndPoints'
import { APICALL } from '../../Services/ApiServices';


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
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj, nameValue) => {
      if (nameValue.length) {
        stateObj['newItems'][state.editIndex] = { name: nameValue };
        stateObj['name'] = '';
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
      let url = state.editFlow ? `${state.editUrl}/${props.id}` : `${state.createUrl}`;
      await APICALL.service(url, 'POST', getPostData(newItemsList))
        .then((result) => { console.log('Done'); router.push(`${props.manageType}`); })
        .catch((error) => console.error('Error occurred'));
    }

  const inertNewItem = () => {
    let newItemsList = [...state.newItems];
    if(state.name.length) {
      newItemsList[state.editIndex] = {name: state.name};
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
    setState({ ...state, name: value, nameWarning: false })
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
        <span className='actions-span' onClick={() => handleActionClick('edit', item, index)}> Edit </span>
        <span className='actions-span' onClick={() => handleActionClick('delete', item, index)}> Delete </span>
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
        <label className = "mb-3" htmlFor="name"> {`Add ${props.manageType === 'employee-types' ? 'employee' : 'coefficient'} type`} </label>
        <div className='row'>
          <input
            ref={inputRef}
            type="text"
            className="form-control col-7"
            id="pcp_name"
            value={state.name}
            onChange={(e) => handleInputChange(e)}
            onKeyUp={(e) => handleAdd(e)}
            placeholder={state.editFlow ? 'Enter name' : 'Press enter to add new one'}
          />
          {!state.editFlow &&
            <button
              onClick={() => addItemAndUpdateIndex({ ...state }, state.name)}
              type="button"
              className="btn btn-dark pcp_btn col-3">
              {`+ Add another`}
            </button>
          }
        </div>
        {state.nameWarning &&
          <small
            id="pcp_name_warning"
            className="form-text text-muted col-md-5">
            Please add type
          </small>}
      </div>
      {state.newItems.length > 0 && !state.editFlow &&
        <div className='add-item-div'>
          <table className='table-hover m-3 add-item-table'>
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
          className="btn btn-dark pcp_btn col-3"
          onClick={handleSubmit} >
          Save
        </button>
      </div>
    </div>
  </>
}
export default React.memo(AddEmployeeType);
