import BaseService from './BaseService';

const jsonResponseHandler = (response) => {
  if (!response.ok) {
    throw response;
  }

  return response.json();
};

class TaskService extends BaseService {
  all() {
    return this.get('/tasks').then(jsonResponseHandler);
  }

  deleteOne(id) {
    return this.delete(`/task/delete/${id}`).then(jsonResponseHandler);
  }
}

export default TaskService;
