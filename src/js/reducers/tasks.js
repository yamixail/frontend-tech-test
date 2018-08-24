const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { id, title, description } = action.payload;

      return [...state, { id, title, description }];
    }

    case 'UPDATE_TASK': {
      const index = state.findIndex(({ id }) => id === action.payload.id);

      if (index === -1) {
        return state;
      }

      return state.slice(0, index).concat(action.payload, state.slice(index + 1));
    }

    case 'UPDATE_TASKS_LIST': {
      return action.payload;
    }

    case 'REMOVE_TASK': {
      const index = state.findIndex(({ id }) => id === action.payload);

      if (index === -1) {
        return state;
      }

      return state.slice(0, index).concat(state.slice(index + 1));
    }

    default:
      return state;
  }
};

export default tasks;
