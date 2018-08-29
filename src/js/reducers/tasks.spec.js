import tasksReducer from './tasks';

describe('tasksReducer', () => {
  function getStateBefore() {
    return [
      {
        id: 3,
        title: 'Task 3',
        description: 'lorem ipsum',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'dolor sit amet',
      },
    ];
  }

  it('should add task', () => {
    const action = {
      type: 'ADD_TASK',
      payload: {
        id: 5,
        title: 'title',
        description: 'description',
      },
    };

    const actual = tasksReducer(getStateBefore(), action);
    const expected = [
      {
        id: 3,
        title: 'Task 3',
        description: 'lorem ipsum',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'dolor sit amet',
      },
      {
        id: 5,
        title: 'title',
        description: 'description',
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('should update single task', () => {
    const action1 = {
      type: 'UPDATE_TASK',
      payload: {
        id: 3,
        title: 'new Title',
        description: 'updated description',
      },
    };

    const actual1 = tasksReducer(getStateBefore(), action1);
    const expected = [
      {
        id: 3,
        title: 'new Title',
        description: 'updated description',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'dolor sit amet',
      },
    ];

    expect(actual1).toEqual(expected);

    const action2 = {
      type: 'UPDATE_TASK',
      payload: {
        id: 8888,
        title: 'new Title',
        description: 'updated description',
      },
    };

    const actual2 = tasksReducer(actual1, action2);

    expect(actual2).toEqual(expected);
  });

  it('should remove task by ID from list', () => {
    const action1 = {
      type: 'REMOVE_TASK',
      payload: 3,
    };

    const actual1 = tasksReducer(getStateBefore(), action1);
    const expected1 = [
      {
        id: 4,
        title: 'Task 4',
        description: 'dolor sit amet',
      },
    ];

    expect(actual1).toEqual(expected1);

    const action2 = {
      type: 'REMOVE_TASK',
      payload: 444,
    };

    const actual2 = tasksReducer(actual1, action2);

    expect(actual2).toEqual(expected1);

    const action3 = {
      type: 'REMOVE_TASK',
      payload: 4,
    };

    const actual3 = tasksReducer(actual2, action3);
    const expected3 = [];

    expect(actual3).toEqual(expected3);
  });

  it('should update tasks list', () => {
    const action1 = {
      type: 'UPDATE_TASKS_LIST',
      payload: [
        {
          id: 3,
          title: 'Task 3',
          description: 'lorem ipsum',
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'dolor sit amet',
        },
      ],
    };

    const actual1 = tasksReducer(getStateBefore(), action1);
    const expected1 = [
      {
        id: 3,
        title: 'Task 3',
        description: 'lorem ipsum',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'dolor sit amet',
      },
    ];

    expect(actual1).toEqual(expected1);

    const action2 = {
      type: 'UPDATE_TASKS_LIST',
      payload: [
        {
          id: 5,
          title: 'title',
          description: 'description',
        },
      ],
    };

    const actual2 = tasksReducer(actual1, action2);
    const expected2 = [
      {
        id: 5,
        title: 'title',
        description: 'description',
      },
    ];

    expect(actual2).toEqual(expected2);
  });
});
