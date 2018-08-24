import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import request from '../utils/request';
import Logger from '../utils/Logger';

const logger = new Logger({ namespace: 'Task' });

class Task extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.onDelete = this.onDelete.bind(this);
    this.activeEditMode = this.activeEditMode.bind(this);
    this.deactiveEditMode = this.deactiveEditMode.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  onDelete() {
    const { id, deleteTask } = this.props;

    request.tasks
      .remove(id)
      .then(() => deleteTask(id))
      .catch(logger.error);
  }

  activeEditMode() {
    this.setState({ editMode: true });
  }

  deactiveEditMode() {
    this.setState({ editMode: false });
  }

  updateTask() {
    const { id, updateTask } = this.props;
    const title = this.titleRef.value.trim();
    const description = this.descriptionRef.value.trim();

    if (!title) {
      return;
    }

    const task = {
      id,
      title,
      description,
    };

    this.setState(
      { editMode: false },
      () => request.tasks
        .update(task)
        .then((updatedTask) => {
          updateTask(updatedTask);
        })
        .catch(logger.error)
    );
  }

  renderEditButton() {
    const { editMode } = this.state;

    if (editMode) {
      return null;
    }

    return (
      <button type="button" title="edit task" className="task__edit" onClick={this.activeEditMode}>&#9998;</button>
    );
  }

  renderTitle() {
    const { id, title } = this.props;
    const { editMode } = this.state;

    if (!editMode) {
      return `${id}. ${title}`;
    }

    return (
      <input
        className="task__title-edit"
        ref={(el) => { this.titleRef = el; }}
        placeholder="Title"
        defaultValue={title}
      />
    );
  }

  renderDescription() {
    const { description } = this.props;
    const { editMode } = this.state;

    if (!editMode) {
      return description;
    }

    return (
      <textarea
        ref={(el) => { this.descriptionRef = el; }}
        className="task__description-edit"
        placeholder="Description"
        defaultValue={description}
      />
    );
  }

  renderEditControlButtons() {
    const { editMode } = this.state;

    if (!editMode) {
      return null;
    }

    return (
      <Fragment>
        <button type="button" className="task__edit-submit" onClick={this.updateTask}>Submit</button>
        <button type="button" className="task__edit-cancel" onClick={this.deactiveEditMode}>Cancel</button>
      </Fragment>
    );
  }

  render() {
    return (
      <div className="task">
        <div className="task__title">
          <button type="button" title="delete task" className="task__delete" onClick={this.onDelete}>&times;</button>
          {this.renderEditButton()}
          {this.renderTitle()}
        </div>
        <div className="task__description">
          {this.renderDescription()}
        </div>
        {this.renderEditControlButtons()}
      </div>
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
