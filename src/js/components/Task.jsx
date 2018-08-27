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
      title: props.title,
      description: props.description,
    };

    this.onDelete = this.onDelete.bind(this);
    this.activeEditMode = this.activeEditMode.bind(this);
    this.deactiveEditMode = this.deactiveEditMode.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  onDelete() {
    const { id, deleteTask } = this.props;

    request.tasks
      .remove(id)
      .then(() => deleteTask(id))
      .catch(logger.error);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  activeEditMode() {
    this.setState({ editMode: true });
  }

  deactiveEditMode() {
    this.setState({ editMode: false });
  }

  updateTask() {
    const { id, updateTask } = this.props;
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
    const { id } = this.props;
    const { editMode, title } = this.state;

    if (!editMode) {
      return `${id}. ${title}`;
    }

    return (
      <input
        onChange={this.onTitleChange}
        className="task__title-edit"
        placeholder="Title"
        defaultValue={title}
      />
    );
  }

  renderDescription() {
    const { editMode, description } = this.state;

    if (!editMode) {
      return description;
    }

    return (
      <textarea
        onChange={(e) => { this.setState({ description: e.target.value }); }}
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
