import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createCompositions, updateCompositions } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import {MdEdit, MdDelete} from 'react-icons/md';
import CheckBoxField from '@/atoms/CheckBoxField';


const AddEditCompositions = (props) => {
  const router = useRouter();
  const assignInitialValues = () => {
    if(props.id && props.rows.length)
      return {
        name: props.rows[0]['name']
      , including: props.rows[0]['including']
      , remark: props.rows[0]['remark']
      }
    else return { name: '', date: '', remark: ''}
  }

  const [state, setState] = useState({
      ...assignInitialValues()
    , editFlow: props.id ? true : false
    , newItems: []
    , nameWarning: false
    , editIndex: 0
  })

    /**
     * [addItemAndUpdateIndex: used to create multiple index of emp/coeff types]
     * @param {Object} stateObj   [description]
     * @param {String} nameValue  [description]
     */
    const addItemAndUpdateIndex = (stateObj) => {
      if (stateObj['name'].replaceAll(' ', '').length) {
        let duplicates = stateObj['newItems'].filter((val, index) => (index !== state.editIndex && val.name.toLowerCase().replaceAll(' ', '') === state.name.toLowerCase().replaceAll(' ', '')))
        if(duplicates.length) {
            stateObj['uniqueError'] = true;
            stateObj['duplicates'] = duplicates.map(obj => obj.name);
        } else {
          stateObj['newItems'][state.editIndex] = {
            name: state.name || '',
            including: state.including || 0,
            remark: state.remark || ''
          };
            stateObj['name'] = '';
            stateObj['including'] = '';
            stateObj['remark'] = '';
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

      let url = state.editFlow ? `${updateCompositions}/${props.id}` : `${createCompositions}`;
      await APICALL.service(url, 'POST', getPostData(newItemsList))
        .then((result) => {
          if(result.status === 200) {
            router.push(`/composition-coefficient?action=view`);
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
          , including: state.including
          , remark: state.remark
        };
      }
    }
    return newItemsList;
  }

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
      stateObj['including']  = item.including;
      stateObj['remark'] = item.remark;
      stateObj['editIndex'] = index;
    } else {
      stateObj['newItems'].splice(index, 1)
      stateObj['editIndex'] = stateObj['newItems'].length;
    }
    setState(stateObj);
  }

  const handleChange = (target, type = 0) => {
    let stateObj = {...state};
    if(type === 0) {
      const { value, name } = target;
      stateObj[name] = value;
      stateObj['nameWarning'] = false;
      stateObj['uniqueError'] = false;
      stateObj['duplicates'] = [];
    } else {
      stateObj['including'] = target.checked ? 1 : 0;
    }
    setState(stateObj);
  }

  useEffect(() => {
    setState({ ...state, initialRenderDone: true })
  }, [])

  if (!state.initialRenderDone) {
    return <></>
  }
  const renderInputFields = () => {
    return (
      <div className='col-md-12 border-form-sec'>
        <div className="salary-input-fields">
          <label className = "mb-2 " htmlFor="name"> {`Title`} <span style={{color:'red'}}> * </span></label>
          <input
            type="text"
            name="name"
            className="form-control col-md-10 pcp_name poppins-regular-18px border-4C4D554D rounded-0"
            value={state.name}
            onChange={(e) => handleChange(e.target)}
            placeholder='Enter title'
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
          <label className = "mb-2 " htmlFor="name"> {`Opmerking`} </label>
          <input
            type="text"
            name='remark'
            className="form-control col-md-10 pcp_name poppins-regular-18px border-4C4D554D rounded-0"
            value={state.remark}
            onChange={(e) => handleChange(e.target)}
            placeholder= 'Enter value'
          />
        </div>
        <div className="salary-input-fields">
          <CheckBoxField
              id={'includeing'}
              tick={state.including}
              disabled={false}
              onCheck={(obj) => handleChange(obj.target, 1)}
              name={`Including`}
              customStyle={{margin: '2px 0', cursor:'pointer'}}
              className="col-md-5"
            />
        </div>
      </div>
    )
  }

  return <>
    <div className='add-edit-types'>
      <div className="row m-0 p-0">
        <h4 className="mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0"> {`${state.editFlow ? 'Edit' : 'Add'} Compositions coeffcient`} </h4>
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
        <div className='add-item-div w-100'>
          <table className='table-hover col-md-12 my-3 add-item-table'>
          <thead style={{borderBottom: '1px solid', margin: '15px 0'}}>
            <tr key={'header-row-tr'}>
              {props.headers.map((eachHeader, index) =>
                <th key={`tablecol${index}`} scope="col" className= 'px-3'> {eachHeader} </th>)}
            </tr>
          </thead>
          <tbody>
            {state.newItems.map((item, index) =>
              <tr key={index} id={index}>
                <td style={{ width: '30%' }} className= 'p-3'> {item.name} </td>
                <td style={{ width: '15%' }} className= 'p-3'> {item.including ? 'Yes' : '-'} </td>
                <td style={{ width: '15%' }} className= 'p-3'> {item.including ? '-' : 'No'} </td>
                <td style={{ width: '20%' }} className= 'p-3'> {item.remark ? item.remark : '--'} </td>
                <td style={{ width: '20%' }} className= 'p-3'> {getNeededActions(item, index)} </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>}
      <div className=' row m-0 p-0 my-4'>
        <div className='text-start col-md-6 p-0'>
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
export default React.memo(AddEditCompositions);
