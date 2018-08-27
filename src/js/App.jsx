import React from 'react';
import { hot } from 'react-hot-loader';

import AddTask from './components/AddTask';
import TasksList from './components/TasksList';

const App = () => (
  <div>
    <TasksList />
    <AddTask />
  </div>
);

export default hot(module)(App);
