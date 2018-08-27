import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTask as addTaskAction } from '../actions/tasks';

import request from '../utils/request';

import Logger from '../utils/Logger';

const logger = new Logger({ namespace: 'AddTask' });

class AddTask extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      titleValue: '',
      descriptionValue: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { addTask } = this.props;
    const { titleValue, descriptionValue } = this.state;
    const title = titleValue.trim();
    const description = descriptionValue.trim();

    if (!title) {
      return;
    }

    request.tasks.create({ title, description })
      .then((task) => {
        addTask(task);

        this.setState({
          titleValue: '',
          descriptionValue: '',
        });
      })
      .catch(logger.error);
  }

  onTitleChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ descriptionValue: e.target.value });
  }

  render() {
    const { titleValue, descriptionValue } = this.state;

    return (
      <div className="task-create-form">
        <h2>Add task</h2>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="task-create-form__title"
            placeholder="Title"
            onChange={this.onTitleChange}
            value={titleValue}
          />
          <textarea
            className="task-create-form__description"
            placeholder="Description"
            onChange={this.onDescriptionChange}
            value={descriptionValue}
          />
          <button
            className="task-create-form__button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  addTask: addTaskAction,
};

export default connect(null, mapActionsToProps)(AddTask);
