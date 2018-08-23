const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { id, title, description } = action.payload;

      return [...state, { id, title, description }];
    }

    case 'UPDATE_TASKS_LIST': {
      return action.payload.slice(0, 8);
    }

    default:
      return state;
  }
};

export default tasks;
