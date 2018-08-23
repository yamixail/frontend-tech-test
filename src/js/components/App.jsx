import React from 'react';
import { hot } from 'react-hot-loader';

import AddTask from '../containers/AddTask';
import TasksList from './TasksList';

const App = () => (
  <div>
    <TasksList />
    <AddTask />
  </div>
);

export default hot(module)(App);
