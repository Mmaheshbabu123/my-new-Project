import React, { useState, useEffect } from 'react';
import TodosOverview from '../molecules/TodosOverview';
import { getMyTodos } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import customAlert from '@/atoms/customAlert';

const itemsPerPage = 6;

const TodosComponent = (props) => {
  const [state, setState] = useState({
    loaded: false,
    todos: [],
  })


  useEffect(() => { fetchData() }, [])
  /**
   * [fetchData data]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${getMyTodos}/${props.entityId}`, 'GET').then(response => {
      if (response.status === 200)
        setState({ ...state, loaded: true, todos: response.data });
      else
        customAlert('error', 'Something went wrong while fetching todo\'s', 2000);
    }).catch(error => {
      console.error(error);
      customAlert('error', 'Something went wrong while fetching todo\'s', 2000);
    })
  }

  return (
    <div>
      {state.loaded === true ? <TodosOverview props={state} /> : <p> Loading... </p>}
    </div>
  );
}

export default React.memo(TodosComponent);
