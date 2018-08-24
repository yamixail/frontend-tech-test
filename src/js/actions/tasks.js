export const addTask = payload => ({
  type: 'ADD_TASK',
  payload,
});

export const updateTask = payload => ({
  type: 'UPDATE_TASK',
  payload,
});

export const updateTasks = payload => ({
  type: 'UPDATE_TASKS_LIST',
  payload,
});

export const removeTask = payload => ({
  type: 'REMOVE_TASK',
  payload,
});
