import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import request from '../../utils/request';
import Logger from '../../utils/Logger';

import TaskEdit from './Edit';
import TaskView from './View';

const logger = new Logger({ namespace: 'Task' });

class Task extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.onDelete = this.onDelete.bind(this);
    this.activateEditMode = this.activateEditMode.bind(this);
    this.deactivateEditMode = this.deactivateEditMode.bind(this);
  }

  onDelete() {
    const { id, deleteTask } = this.props;

    request.tasks
      .remove(id)
      .then(() => deleteTask(id))
      .catch(logger.error);
  }

  activateEditMode() {
    this.setState({ editMode: true });
  }

  deactivateEditMode() {
    this.setState({ editMode: false });
  }

  render() {
    const {
      id, title, description, updateTask,
    } = this.props;
    const { editMode } = this.state;

    if (editMode) {
      return (
        <TaskEdit
          id={id}
          title={title}
          description={description}
          deactivateEditMode={this.deactivateEditMode}
          deleteTask={this.onDelete}
          updateTask={updateTask}
        />
      );
    }

    return (
      <TaskView
        id={id}
        title={title}
        description={description}
        activateEditMode={this.activateEditMode}
        deleteTask={this.onDelete}
      />
    );
  }
}

Task.defaultProps = {
  description: '',
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
