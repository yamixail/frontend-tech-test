const app = require('express')();
const tasksContainer = require('./tasks.json');

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

/**
 * GET /tasks
 *
 * Return the list of tasks with status code 200.
 */
app.get('/tasks', (req, res) => res.status(200).json(tasksContainer));

/**
 * Get /task/:id
 *
 * id: Number
 *
 * Return the task for the given id.
 *
 * If found return status code 200 and the resource.
 * If not found return status code 404.
 * If id is not valid number return status code 400.
 */
app.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find(item => item.id === id);

    if (task !== null) {
      return res.status(200).json(task);
    }

    return res.status(404).json({
      message: 'Not found.',
    });
  }

  return res.status(400).json({
    message: 'Bad request.',
  });
});

/**
 * PUT /task/update/:id/:title/:description
 *
 * id: Number
 * title: string
 * description: string
 *
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.put('/task/update/:id/:title/:description', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find(item => item.id === id);

    if (task !== null) {
      task.title = req.params.title;
      task.description = req.params.description;

      return res.status(200).json(task);
    }

    return res.status(404).json({
      message: 'Not found',
    });
  }

  return res.status(400).json({
    message: 'Bad request',
  });
});

/**
 * POST /task/create/:title/:description
 *
 * title: string
 * description: string
 *
 * Add a new task to the array tasksContainer.tasks with the given title and
 * description.
 * Return status code 201.
 */
app.post('/task/create/:title/:description', (req, res) => {
  const { tasks } = tasksContainer;

  const task = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 0,
    title: req.params.title,
    description: req.params.description,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

/**
 * DELETE /task/delete/:id
 *
 * id: Number
 *
 * Delete the task linked to the given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete('/task/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const taskIndex = tasksContainer.tasks.findIndex(item => item.id === id);

    if (taskIndex !== -1) {
      tasksContainer.tasks.splice(taskIndex, 1);

      return res.status(200).json({
        message: 'Deleted successfully',
      });
    }

    return res.status(404).json({
      message: 'Not found',
    });
  }

  return res.status(400).json({
    message: 'Bad request',
  });
});

app.listen(9001, () => {
  process.stdout.write('the server is available on http://localhost:9001/\n');
});
