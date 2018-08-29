import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchTasks as fetchTasksList,
  updateTask as updateOneTask,
  removeTask,
} from '../actions/tasks';

import Logger from '../utils/Logger';

import Task from './Task';

const logger = new Logger({ namespace: 'TaskList' });

class TasksList extends PureComponent {
  componentWillMount() {
    const { fetchTasks } = this.props;

    fetchTasks().catch(logger.error);
  }

  render() {
    const { tasks, updateTask, deleteTask } = this.props;

    return (
      <div className="tasks-container">
        {tasks.map(task => (
          <Task
            key={task.id}
            updateTask={updateTask}
            deleteTask={deleteTask}
            {...task}
          />
        ))}
      </div>
    );
  }
}

TasksList.defaultProp = {
  tasks: [],
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = ({ tasks }) => ({
  tasks,
});

const mapActionsToProps = {
  updateTask: updateOneTask,
  fetchTasks: fetchTasksList,
  deleteTask: removeTask,
};

export default connect(mapStateToProps, mapActionsToProps)(TasksList);
