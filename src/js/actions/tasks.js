import { createAction } from 'redux-actions';

import request from '../utils/request';

export const addTask = createAction('ADD_TASK');
export const updateTaskAction = createAction('UPDATE_TASK');
export const removeTaskAction = createAction('REMOVE_TASK');

export const updateTasks = createAction('UPDATE_TASKS_LIST');

export const updateTask = task => dispatch =>
  request.tasks.update(task).then(taskFromServer => {
    dispatch(updateTaskAction(taskFromServer));
  });

export const removeTask = id => dispatch =>
  request.tasks.remove(id).then(() => dispatch(removeTaskAction(id)));

export const fetchTasks = () => dispatch =>
  request.tasks.all().then(data => {
    dispatch(updateTasks(data.tasks));

    return data;
  });
