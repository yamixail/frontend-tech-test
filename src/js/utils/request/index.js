import TaskService from './TasksService';

const request = {
  tasks: new TaskService({ apiUrl: 'http://localhost:9001' }),
};

export default request;
