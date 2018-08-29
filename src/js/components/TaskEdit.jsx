import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logger from '../utils/Logger';

const logger = new Logger({ namespace: 'TaskEdit' });

class TaskEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  updateTask() {
    const { id, updateTask, deactivateEditMode } = this.props;
    const { title: titleRaw, description: descriptionRaw } = this.state;
    const title = titleRaw.trim();
    const description = descriptionRaw.trim();

    if (!title) {
      return;
    }

    const task = {
      id,
      title,
      description,
    };

    updateTask(task)
      .then(deactivateEditMode)
      .catch(logger.error);
  }

  render() {
    const { deactivateEditMode, deleteTask } = this.props;
    const { title, description } = this.state;

    return (
      <div className="task">
        <div className="task__title">
          <button
            type="button"
            title="delete task"
            className="task__delete"
            onClick={deleteTask}
          >
            &times;
          </button>

          <input
            onChange={this.onTitleChange}
            className="task__title-edit"
            placeholder="Title"
            value={title}
          />
        </div>
        <div className="task__description">
          <textarea
            onChange={this.onDescriptionChange}
            className="task__description-edit"
            placeholder="Description"
            value={description}
          />
        </div>
        <button
          type="button"
          className="task__edit-submit"
          onClick={this.updateTask}
        >
          Submit
        </button>
        <button
          type="button"
          className="task__edit-cancel"
          onClick={deactivateEditMode}
        >
          Cancel
        </button>
      </div>
    );
  }
}

TaskEdit.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  deactivateEditMode: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskEdit;
