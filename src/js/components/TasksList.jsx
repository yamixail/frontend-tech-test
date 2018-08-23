import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  updateTasks as updateTasksAction,
  removeTask as removeTaskAction,
} from '../actions/tasks';

import request from '../utils/request';

import Task from './Task';

class TasksList extends PureComponent {
  componentWillMount() {
    const { updateTasks } = this.props;

    request.tasks
      .all()
      .then(({ tasks }) => updateTasks(tasks))
      .catch(console.error);
  }

  render() {
    const { tasks, removeTask } = this.props;

    return (
      <div className="tasks-container">
        {tasks.map(task => (
          <Task key={task.id} removeTask={removeTask} {...task} />
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
  updateTasks: updateTasksAction,
  removeTask: removeTaskAction,
};

export default connect(mapStateToProps, mapActionsToProps)(TasksList);
