import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import request from '../utils/request';

class Task extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.onDelete = this.onDelete.bind(this);
    this.activeEditMode = this.activeEditMode.bind(this);
    this.deactiveEditMode = this.deactiveEditMode.bind(this);
  }

  onDelete() {
    const { id, removeTask } = this.props;

    request.tasks
      .deleteOne(id)
      .then(removeTask);
  }

  activeEditMode() {
    this.setState({ editMode: true });
  }

  deactiveEditMode() {
    this.setState({ editMode: false });
  }

  render() {
    const { id, title, description } = this.props;
    const { editMode } = this.state;

    return (
      <div className="task">
        <div className="task__title">

          <button
            type="button"
            title="delete task"
            className="task__delete"
            onClick={this.onDelete}
          >
            &times;
          </button>

          {!editMode
            ? (
              <button
                type="button"
                title="edit task"
                className="task__edit"
                onClick={this.activeEditMode}
              >
                &#9998;
              </button>
            )
            : null
          }
          {editMode
            ? <input placeholder="Title" defaultValue={title} />
            : `${id}. ${title}`
          }
        </div>
        <div className="task__description">
          {
            editMode
              ? (
                <textarea
                  className="task__description-edit"
                  placeholder="Description"
                >
                  {description}
                </textarea>
              )
              : description
          }
        </div>
        {
          editMode
            ? (
              <Fragment>
                <button
                  type="button"
                  className="task__edit-submit"
                  onClick={this.deactiveEditMode}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="task__edit-cancel"
                  onClick={this.deactiveEditMode}
                >
                  Cancel
                </button>
              </Fragment>
            )
            : null
        }
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
  removeTask: PropTypes.func.isRequired,
};

export default Task;
