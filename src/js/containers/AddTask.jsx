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

    this.getTitleRef = this.getTitleRef.bind(this);
    this.getDescriptionRef = this.getDescriptionRef.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { addTask } = this.props;
    const title = this.titleRef.value.trim();
    const description = this.descriptionRef.value.trim();

    if (!title) {
      return;
    }

    request.tasks.create({ title, description })
      .then((task) => {
        addTask(task);

        this.titleRef.value = '';
        this.descriptionRef.value = '';
      })
      .catch(logger.error);
  }

  getTitleRef(element) {
    this.titleRef = element;
  }

  getDescriptionRef(element) {
    this.descriptionRef = element;
  }

  render() {
    return (
      <div className="task-create-form">
        <h2>Add task</h2>
        <form onSubmit={this.onFormSubmit}>
          <input className="task-create-form__title" placeholder="Title" ref={this.getTitleRef} />
          <textarea className="task-create-form__description" placeholder="Description" ref={this.getDescriptionRef} />
          <button className="task-create-form__button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addTask: value => dispatch(addTaskAction(value)),
});

export default connect(null, mapDispatchToProps)(AddTask);
