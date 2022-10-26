import React, { useState, useEffect } from 'react';
import TodosOverview from '../molecules/TodosOverview';
import { getMyTodos } from '@/Services/ApiEndPoints'
import { APICALL } from '@/Services/ApiServices';
import customAlert from '@/atoms/customAlert';
import Translation from '@/Translation';
const itemsPerPage = 6;

const TodosComponent = (props) => {
  const { t } = props;
  const [state, setState] = useState({
    loaded: false,
    todos: [],
    headers: [ 'Todo', 'Company', 'Employee', 'Status', 'Actions' ]
  })


  useEffect(() => { fetchData() }, [])
  /**
   * [fetchData data]
   * @return {Promise} [description]
   */
  const fetchData = async () => {
    await APICALL.service(`${getMyTodos}/${props.entityId}?entitytype=${props.entityType}`, 'GET').then(response => {
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
      {state.loaded === true ?
        <TodosOverview
          props={state}
          entityId = {Number(props.entityId) || 0}
          entityType = {Number(props.entityType) || 0}
          tabId={props.tabId}
        />
        :
        <p> {t('Loading...')} </p>}
    </div>
  );
}

export default React.memo(Translation(TodosComponent,['Loading...']));
