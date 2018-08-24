import BaseService from './BaseService';

const jsonResponseHandler = (response) => {
  if (!response.ok) {
    const error = new Error(response.statusText);

    error.status = response.status;

    throw error;
  }

  return response.json();
};

class TaskService extends BaseService {
  all() {
    return this.get('/tasks').then(jsonResponseHandler);
  }

  create(task) {
    const title = encodeURIComponent(task.title);
    const description = encodeURIComponent(task.description);

    return this.post(`/task/create/${title}/${description}`).then(jsonResponseHandler);
  }

  remove(id) {
    return this.delete(`/task/delete/${id}`).then(jsonResponseHandler);
  }

  update(task) {
    const title = encodeURIComponent(task.title);
    const description = encodeURIComponent(task.description);

    return this.put(`/task/update/${task.id}/${title}/${description}`).then(jsonResponseHandler);
  }
}

export default TaskService;
